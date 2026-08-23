export interface ScoreResult {
  total: number;
  shape: number;
  color: number;
  detail: number;
}

// Convert SVG or Image URL to Canvas ImageData at fixed dimension
export async function getImageDataFromSource(
  source: string, // SVG string or dataURL
  size = 200
): Promise<ImageData> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

  // Fill with clean white background for consistent comparison
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const img = new Image();
  const isSvg = source.trim().startsWith('<svg');
  const srcUrl = isSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(source)}` : source;

  return new Promise((resolve) => {
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      resolve(ctx.getImageData(0, 0, size, size));
    };
    img.onerror = () => {
      // Fallback empty white image data if load fails
      resolve(ctx.getImageData(0, 0, size, size));
    };
    img.src = srcUrl;
  });
}

// Grayscale luminance converter
function toGrayscale(data: ImageData): Float32Array {
  const gray = new Float32Array(data.width * data.height);
  const px = data.data;
  for (let i = 0, j = 0; i < px.length; i += 4, j++) {
    // Standard perceptual luminance: 0.299 R + 0.587 G + 0.114 B
    gray[j] = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
  }
  return gray;
}

// Sobel Edge Filter for contour/shape extraction
function computeSobelEdges(gray: Float32Array, width: number, height: number): Uint8Array {
  const edges = new Uint8Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      // Sobel horizontal gradient
      const gx =
        -1 * gray[idx - width - 1] + 1 * gray[idx - width + 1] +
        -2 * gray[idx - 1]         + 2 * gray[idx + 1] +
        -1 * gray[idx + width - 1] + 1 * gray[idx + width + 1];

      // Sobel vertical gradient
      const gy =
        -1 * gray[idx - width - 1] - 2 * gray[idx - width] - 1 * gray[idx - width + 1] +
         1 * gray[idx + width - 1] + 2 * gray[idx + width] + 1 * gray[idx + width + 1];

      const mag = Math.sqrt(gx * gx + gy * gy);
      edges[idx] = mag > 45 ? 255 : 0;
    }
  }
  return edges;
}

// Calculate Structural Similarity Index (SSIM)
function computeSSIM(gray1: Float32Array, gray2: Float32Array, width: number, height: number): number {
  const c1 = 6.5025; // (0.01 * 255)^2
  const c2 = 58.5225; // (0.03 * 255)^2

  let ssimSum = 0;
  let numBlocks = 0;
  const blockSize = 8;

  for (let y = 0; y <= height - blockSize; y += blockSize) {
    for (let x = 0; x <= width - blockSize; x += blockSize) {
      let sum1 = 0, sum2 = 0;
      let sumSq1 = 0, sumSq2 = 0, sumCross = 0;
      const count = blockSize * blockSize;

      for (let by = 0; by < blockSize; by++) {
        for (let bx = 0; bx < blockSize; bx++) {
          const idx = (y + by) * width + (x + bx);
          const v1 = gray1[idx];
          const v2 = gray2[idx];
          sum1 += v1;
          sum2 += v2;
          sumSq1 += v1 * v1;
          sumSq2 += v2 * v2;
          sumCross += v1 * v2;
        }
      }

      const mean1 = sum1 / count;
      const mean2 = sum2 / count;
      const var1 = sumSq1 / count - mean1 * mean1;
      const var2 = sumSq2 / count - mean2 * mean2;
      const covar = sumCross / count - mean1 * mean2;

      const ssim = ((2 * mean1 * mean2 + c1) * (2 * covar + c2)) /
                   ((mean1 * mean1 + mean2 * mean2 + c1) * (var1 + var2 + c2));

      ssimSum += Math.max(0, ssim);
      numBlocks++;
    }
  }

  return numBlocks > 0 ? ssimSum / numBlocks : 0;
}

// RGB to HSV color conversion for color analysis
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, v];
}

// Color histogram similarity (ignoring background plain white)
function computeColorSimilarity(data1: ImageData, data2: ImageData): number {
  const numBins = 16;
  const hist1 = new Float32Array(numBins);
  const hist2 = new Float32Array(numBins);
  let total1 = 0, total2 = 0;

  const px1 = data1.data;
  const px2 = data2.data;

  for (let i = 0; i < px1.length; i += 4) {
    // Only consider non-white pixels (foreground strokes)
    if (px1[i] < 240 || px1[i+1] < 240 || px1[i+2] < 240) {
      const [h, s, v] = rgbToHsv(px1[i], px1[i+1], px1[i+2]);
      if (s > 0.1 && v > 0.1) {
        const bin = Math.floor((h / 360) * numBins) % numBins;
        hist1[bin]++;
        total1++;
      }
    }

    if (px2[i] < 240 || px2[i+1] < 240 || px2[i+2] < 240) {
      const [h, s, v] = rgbToHsv(px2[i], px2[i+1], px2[i+2]);
      if (s > 0.1 && v > 0.1) {
        const bin = Math.floor((h / 360) * numBins) % numBins;
        hist2[bin]++;
        total2++;
      }
    }
  }

  if (total1 === 0 || total2 === 0) return 0.4; // Neutral fallback

  // Normalize histograms
  for (let i = 0; i < numBins; i++) {
    hist1[i] /= total1;
    hist2[i] /= total2;
  }

  // Intersection similarity
  let intersection = 0;
  for (let i = 0; i < numBins; i++) {
    intersection += Math.min(hist1[i], hist2[i]);
  }

  return Math.min(1, Math.max(0, intersection));
}

// Compare user drawing against reference image
export async function calculateDrawingScore(
  referenceSvgOrUrl: string,
  userDrawingDataUrl: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<ScoreResult> {
  const size = 200;
  const refData = await getImageDataFromSource(referenceSvgOrUrl, size);
  const userCanvasData = await getImageDataFromSource(userDrawingDataUrl, size);

  const refGray = toGrayscale(refData);
  const userGray = toGrayscale(userCanvasData);

  // 1. Edge & Contour Match (Sobel)
  const refEdges = computeSobelEdges(refGray, size, size);
  const userEdges = computeSobelEdges(userGray, size, size);

  let edgeMatches = 0;
  let totalRefEdges = 0;
  let totalUserEdges = 0;

  // Compare with 2px spatial dilation tolerance for natural hand drawing
  for (let y = 2; y < size - 2; y++) {
    for (let x = 2; x < size - 2; x++) {
      const idx = y * size + x;
      if (refEdges[idx] > 0) totalRefEdges++;
      if (userEdges[idx] > 0) totalUserEdges++;

      if (userEdges[idx] > 0) {
        let matched = false;
        // Check 5x5 neighbor window in reference
        for (let dy = -2; dy <= 2 && !matched; dy++) {
          for (let dx = -2; dx <= 2 && !matched; dx++) {
            if (refEdges[(y + dy) * size + (x + dx)] > 0) {
              matched = true;
            }
          }
        }
        if (matched) edgeMatches++;
      }
    }
  }

  const shapeOverlap = totalUserEdges > 0
    ? edgeMatches / Math.max(totalUserEdges, totalRefEdges * 0.7)
    : 0.1;

  // 2. SSIM Structural Match
  const ssimVal = computeSSIM(refGray, userGray, size, size);

  // 3. Color Palette Similarity
  const colorVal = computeColorSimilarity(refData, userCanvasData);

  // 4. Detail Density Factor (drawing coverage vs reference coverage)
  const densityRatio = totalUserEdges > 0 && totalRefEdges > 0
    ? Math.min(totalUserEdges / totalRefEdges, totalRefEdges / totalUserEdges)
    : 0.2;

  // Difficulty calibration curve
  const boost = difficulty === 'easy' ? 1.15 : difficulty === 'medium' ? 1.05 : 0.95;

  const shapeScore = Math.min(98, Math.max(18, Math.round((shapeOverlap * 0.6 + ssimVal * 0.4) * 100 * boost)));
  const colorScore = Math.min(99, Math.max(25, Math.round(colorVal * 100 * (boost * 0.98))));
  const detailScore = Math.min(96, Math.max(20, Math.round((densityRatio * 0.5 + ssimVal * 0.5) * 100 * boost)));

  // Weighted overall percentage
  const total = Math.min(99, Math.max(20, Math.round(shapeScore * 0.45 + colorScore * 0.30 + detailScore * 0.25)));

  return {
    total,
    shape: shapeScore,
    color: colorScore,
    detail: detailScore,
  };
}
