# 🎨 Drawing Duel — Real-Time Couple Drawing Game

A 2-player real-time web application where two people (e.g. couples/friends) join a room via a 6-character invite code or QR code, select a difficulty tier, choose one of 10 reference cartoon images, and race to recreate it on their canvas using drawing tools. Once both submit, an automated computer vision accuracy scoring engine evaluates both drawings and crowns the winner!

---

## ✨ Features

- **⚡ Real-Time Multiplayer Sync**: Powered by Express & Socket.IO. Sub-10ms event synchronization for lobby, difficulty selection, live drawing status, and instant round results.
- **📱 Instant Mobile Pairing**: Host displays a dynamic QR code (`http://<local-ip>:5173/?join=CODE`) and 1-tap invite link for quick joining from smartphones on the same Wi-Fi.
- **🖼️ 30 Built-in Cartoon Reference Artworks**:
  - **Easy (10 artworks)**: Cute Kitten, Boba Milk Tea, Happy Avocado, Retro Gamepad, Spooky Ghost, Coffee Mug, Pizza Slice, Space Rocket, Saturn Planet, Rubber Duck.
  - **Medium (10 artworks)**: Astro Corgi, Retro Boombox, Magic Potion Flask, Cozy Fox in Scarf, Game Boy Classic, Sakura Bonsai, Lighthouse, Whimsical Cupcake, Chameleon, Alien UFO.
  - **Hard (10 artworks)**: Cyberpunk Ramen Shop, Steampunk Owl, Wizard's Library, Koi Fish Pond, Neon Tokyo Skyline, Dragon & Crystal, Enchanted Tree, Coral Reef, Vintage Vespa in Paris, Futuristic Mech Suit.
- **🖌️ HTML5 Canvas Drawing Suite**:
  - Multi-touch & Stylus/Apple Pencil support with pressure sensitivity.
  - Quadratic Bézier curve smoothing for non-jagged strokes.
  - **5 Art Tools**: Pencil, Sketch Pen, Artist Brush, Highlighter, Eraser.
  - Curated color swatches + Reference artwork palette + Custom Hex/HSL color picker.
  - Brush size slider, opacity slider, unlimited Undo/Redo (`Ctrl+Z`, `Ctrl+Y`), and clear canvas with confirm.
- **🤖 Automated Multi-Factor Accuracy Scoring Engine**:
  - Sobel edge detection & contour coincidence filter.
  - Structural Similarity Index (SSIM).
  - HSV color histogram matching.
  - Stroke density & composition analyzer.
  - Outputs transparent scores: **Shape Accuracy %**, **Color Harmony %**, and **Detail Fidelity %**.
- **🏆 Post-Game Delight**:
  - Confetti cannons and procedural Web Audio victory fanfare.
  - **Synchronized Time-Lapse Replay**: Watch both players' drawings recreated stroke-by-stroke with speed control (1x, 2x, 4x).
  - **Save Match Postcard**: 1-click generation of branded high-res composite comparison cards.
- **💖 Floating Emoji Reactions**: Real-time floating reactions (`❤️`, `🔥`, `🎉`, `😂`, `👑`) between players.
- **📱 Fully Responsive Design**: Optimized for smartphones (portrait/landscape with picture-in-picture reference dock), tablets, and desktop computers.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti, QRCode
- **Canvas Engine**: HTML5 2D Context + Pointer Events API + Bézier Curve Interpolation
- **Backend & Networking**: Node.js, Express, Socket.IO
- **Audio Engine**: Web Audio API (procedural synthesizers)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/1rajkamal/Draw.git
cd Draw
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the application

**Run Backend Server (Socket.IO + Express on port 3001):**
```bash
npm run server
```

**Run Frontend Dev Server (Vite on port 5173):**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Play

1. **Host**: Enter your name on the Home screen and click **Start Duo Room**.
2. **Partner**: Enter your name and either scan the QR code or enter the 6-character room code.
3. **Lobby**: Host selects difficulty (Easy / Medium / Hard) and round timer (60s, 90s, 120s, or Untimed).
4. **Drawing Round**: Recreate the reference cartoon before the timer expires!
5. **Results**: See side-by-side drawings, AI match percentage, winner declaration, and stroke replay.

---

## 📄 License
MIT License
