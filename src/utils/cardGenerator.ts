import { ReferenceDrawing } from '../data/referenceImages';

interface PlayerCardInfo {
  name: string;
  avatar: string;
  score: number | null;
  drawingDataUrl: string | null;
  isWinner: boolean;
}

export async function generateMatchCard(
  reference: ReferenceDrawing,
  player1: PlayerCardInfo,
  player2: PlayerCardInfo | null,
  isTie: boolean
): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 750;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 1. Sleek Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(0.5, '#1e1b4b');
  bgGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative ambient glow circles
  ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
  ctx.beginPath();
  ctx.arc(200, 150, 180, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
  ctx.beginPath();
  ctx.arc(1000, 600, 220, 0, Math.PI * 2);
  ctx.fill();

  // 2. Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎨 DRAWING DUEL — COUPLES EDITION 💕', width / 2, 60);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px Inter, sans-serif';
  ctx.fillText(`Theme: ${reference.title} • Level: ${reference.difficulty.toUpperCase()} • ${new Date().toLocaleDateString()}`, width / 2, 95);

  // Helper to load image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      const isSvg = src.trim().startsWith('<svg');
      img.src = isSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(src)}` : src;
    });
  };

  const cardW = 320;
  const cardH = 450;
  const topY = 140;

  // Render Card 1: Reference
  const refX = 80;
  renderCardBox(ctx, refX, topY, cardW, cardH, 'REFERENCE ART', '🎯', '#38bdf8');
  const refImg = await loadImage(reference.svg);
  ctx.drawImage(refImg, refX + 20, topY + 60, cardW - 40, cardW - 40);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(reference.title, refX + cardW / 2, topY + cardH - 50);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '15px Inter, sans-serif';
  ctx.fillText(`Target to Match`, refX + cardW / 2, topY + cardH - 22);

  // Render Card 2: Player 1
  const p1X = 440;
  const p1BorderColor = player1.isWinner ? '#fbbf24' : '#ec4899';
  renderCardBox(ctx, p1X, topY, cardW, cardH, `${player1.name}'s Drawing`, player1.avatar, p1BorderColor);

  if (player1.drawingDataUrl) {
    const p1Img = await loadImage(player1.drawingDataUrl);
    ctx.drawImage(p1Img, p1X + 20, topY + 60, cardW - 40, cardW - 40);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${player1.score ?? 0}% MATCH`, p1X + cardW / 2, topY + cardH - 45);

  if (player1.isWinner) {
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText('👑 WINNER!', p1X + cardW / 2, topY + cardH - 20);
  }

  // Render Card 3: Player 2 (if present) or Solo
  const p2X = 800;
  if (player2) {
    const p2BorderColor = player2.isWinner ? '#fbbf24' : '#8b5cf6';
    renderCardBox(ctx, p2X, topY, cardW, cardH, `${player2.name}'s Drawing`, player2.avatar, p2BorderColor);

    if (player2.drawingDataUrl) {
      const p2Img = await loadImage(player2.drawingDataUrl);
      ctx.drawImage(p2Img, p2X + 20, topY + 60, cardW - 40, cardW - 40);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${player2.score ?? 0}% MATCH`, p2X + cardW / 2, topY + cardH - 45);

    if (player2.isWinner) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillText('👑 WINNER!', p2X + cardW / 2, topY + cardH - 20);
    }
  }

  // Footer Banner
  ctx.fillStyle = '#f472b6';
  ctx.font = '14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    isTie ? "🤝 Tied Match! Perfect Couple Energy! 💕" : '✨ Created with Drawing Duel — Couples & GF Only 💕',
    width / 2,
    height - 40
  );

  return canvas.toDataURL('image/png');
}

function renderCardBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  emoji: string,
  accentColor: string
) {
  // Card background
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 20);
  ctx.fill();
  ctx.stroke();

  // Canvas frame box
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 60, w - 40, w - 40, 12);
  ctx.fill();

  // Header Title
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${emoji} ${title}`, x + w / 2, y + 38);
}
