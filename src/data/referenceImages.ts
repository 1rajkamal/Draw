export interface ReferenceDrawing {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hint: string;
  palette: string[];
  svg: string;
}

export const REFERENCE_IMAGES: ReferenceDrawing[] = [
  // ================= EASY (10 DRAWINGS) =================
  {
    id: 'easy-1',
    title: 'Cute Kitten',
    difficulty: 'easy',
    category: 'Animals',
    hint: 'Draw the round head, triangle ears, whiskers, and cute pink cheeks!',
    palette: ['#1e293b', '#f43f5e', '#fbbf24', '#f8fafc', '#ec4899'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Body & Ears -->
      <path d="M120 180 L140 100 L190 150 Z" fill="#fbcfe8" stroke="#1e293b" stroke-width="8" stroke-linejoin="round"/>
      <path d="M280 180 L260 100 L210 150 Z" fill="#fbcfe8" stroke="#1e293b" stroke-width="8" stroke-linejoin="round"/>
      <path d="M140 160 L150 115 L180 145 Z" fill="#f43f5e"/>
      <path d="M260 160 L250 115 L220 145 Z" fill="#f43f5e"/>
      <!-- Head -->
      <circle cx="200" cy="210" r="110" fill="#ffffff" stroke="#1e293b" stroke-width="8"/>
      <!-- Eyes -->
      <ellipse cx="160" cy="195" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="155" cy="188" r="5" fill="#ffffff"/>
      <ellipse cx="240" cy="195" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="235" cy="188" r="5" fill="#ffffff"/>
      <!-- Cheeks -->
      <circle cx="140" cy="225" r="16" fill="#fbcfe8"/>
      <circle cx="260" cy="225" r="16" fill="#fbcfe8"/>
      <!-- Nose & Mouth -->
      <polygon points="194,215 206,215 200,224" fill="#f43f5e"/>
      <path d="M200 224 Q185 242 170 232" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <path d="M200 224 Q215 242 230 232" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="130" y1="210" x2="80" y2="200" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="130" y1="225" x2="75" y2="230" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="270" y1="210" x2="320" y2="200" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="270" y1="225" x2="325" y2="230" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-2',
    title: 'Boba Milk Tea',
    difficulty: 'easy',
    category: 'Food',
    hint: 'Draw the angled cup, domed lid, giant straw, and round black pearls at the bottom!',
    palette: ['#d97706', '#92400e', '#fef3c7', '#3b82f6', '#18181b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fffbeb"/>
      <!-- Straw -->
      <rect x="185" y="40" width="30" height="260" rx="10" transform="rotate(12 200 170)" fill="#60a5fa" stroke="#1e293b" stroke-width="7"/>
      <!-- Cup Body -->
      <polygon points="120,130 280,130 255,340 145,340" fill="#fde68a" stroke="#1e293b" stroke-width="8" stroke-linejoin="round"/>
      <!-- Milk tea level -->
      <polygon points="124,155 276,155 253,336 147,336" fill="#f59e0b" opacity="0.85"/>
      <!-- Boba pearls -->
      <circle cx="170" cy="310" r="16" fill="#18181b"/>
      <circle cx="205" cy="315" r="16" fill="#18181b"/>
      <circle cx="230" cy="300" r="16" fill="#18181b"/>
      <circle cx="160" cy="275" r="15" fill="#18181b"/>
      <circle cx="195" cy="280" r="15" fill="#18181b"/>
      <circle cx="235" cy="265" r="15" fill="#18181b"/>
      <!-- Cup Lid -->
      <ellipse cx="200" cy="130" rx="85" ry="24" fill="#ffffff" stroke="#1e293b" stroke-width="8"/>
      <!-- Cute Face on Cup -->
      <circle cx="175" cy="210" r="6" fill="#1e293b"/>
      <circle cx="225" cy="210" r="6" fill="#1e293b"/>
      <circle cx="165" cy="222" r="8" fill="#f43f5e" opacity="0.6"/>
      <circle cx="235" cy="222" r="8" fill="#f43f5e" opacity="0.6"/>
      <path d="M192 218 Q200 228 208 218" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-3',
    title: 'Happy Avocado',
    difficulty: 'easy',
    category: 'Food',
    hint: 'Pear-shaped outer green skin, lighter green flesh, and a big round brown seed with a smiling face!',
    palette: ['#15803d', '#86efac', '#78350f', '#f43f5e', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0fdf4"/>
      <!-- Outer Shell -->
      <path d="M200 60 C250 60 270 120 290 180 C320 270 290 350 200 350 C110 350 80 270 110 180 C130 120 150 60 200 60 Z" fill="#166534" stroke="#14532d" stroke-width="8"/>
      <!-- Inner Flesh -->
      <path d="M200 80 C238 80 253 130 270 185 C295 260 270 330 200 330 C130 330 105 260 130 185 C147 130 162 80 200 80 Z" fill="#bbf7d0"/>
      <!-- Seed / Pit -->
      <circle cx="200" cy="235" r="58" fill="#78350f" stroke="#451a03" stroke-width="6"/>
      <ellipse cx="180" cy="210" rx="14" ry="8" fill="#92400e" opacity="0.6"/>
      <!-- Face on Seed -->
      <circle cx="180" cy="230" r="7" fill="#ffffff"/>
      <circle cx="180" cy="230" r="4" fill="#000000"/>
      <circle cx="220" cy="230" r="7" fill="#ffffff"/>
      <circle cx="220" cy="230" r="4" fill="#000000"/>
      <circle cx="168" cy="245" r="7" fill="#f43f5e" opacity="0.7"/>
      <circle cx="232" cy="245" r="7" fill="#f43f5e" opacity="0.7"/>
      <path d="M190 246 Q200 258 210 246" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-4',
    title: 'Retro Gamepad',
    difficulty: 'easy',
    category: 'Gaming',
    hint: 'Rounded controller body, D-pad on the left, colorful ABXY action buttons on the right!',
    palette: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#334155'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f8fafc"/>
      <!-- Wire -->
      <path d="M200 135 C200 70 240 60 270 80" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
      <!-- Controller Body -->
      <rect x="70" y="130" width="260" height="150" rx="45" fill="#e2e8f0" stroke="#1e293b" stroke-width="8"/>
      <!-- Grip Indents -->
      <path d="M80 205 Q120 280 150 280 L250 280 Q280 280 320 205" fill="#cbd5e1"/>
      <!-- D-Pad -->
      <rect x="110" y="180" width="60" height="22" rx="4" fill="#1e293b"/>
      <rect x="129" y="161" width="22" height="60" rx="4" fill="#1e293b"/>
      <circle cx="140" cy="191" r="5" fill="#475569"/>
      <!-- Action Buttons -->
      <circle cx="260" cy="170" r="12" fill="#ef4444" stroke="#1e293b" stroke-width="3"/>
      <circle cx="285" cy="195" r="12" fill="#3b82f6" stroke="#1e293b" stroke-width="3"/>
      <circle cx="235" cy="195" r="12" fill="#10b981" stroke="#1e293b" stroke-width="3"/>
      <circle cx="260" cy="220" r="12" fill="#f59e0b" stroke="#1e293b" stroke-width="3"/>
      <!-- Center Select / Start -->
      <rect x="180" y="225" width="16" height="6" rx="2" fill="#475569" transform="rotate(-25 188 228)"/>
      <rect x="204" y="225" width="16" height="6" rx="2" fill="#475569" transform="rotate(-25 212 228)"/>
    </svg>`,
  },
  {
    id: 'easy-5',
    title: 'Spooky Little Ghost',
    difficulty: 'easy',
    category: 'Magic',
    hint: 'Wavy sheet silhouette, cute floating arms, giant dark oval eyes with starry sparkles!',
    palette: ['#6366f1', '#a855f7', '#38bdf8', '#f43f5e', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1e1b4b"/>
      <!-- Stars in background -->
      <polygon points="90,90 95,105 110,110 95,115 90,130 85,115 70,110 85,105" fill="#fde047"/>
      <polygon points="310,70 314,80 325,85 314,90 310,100 306,90 295,85 306,80" fill="#fde047"/>
      <polygon points="320,290 323,298 332,302 323,306 320,314 317,306 308,302 317,298" fill="#fde047"/>
      <!-- Ghost Body -->
      <path d="M120 220 Q90 190 85 170 Q80 155 95 155 Q115 160 135 185 C135 100 170 70 200 70 C230 70 265 100 265 185 Q285 160 305 155 Q320 155 315 170 Q310 190 280 220 C280 270 285 320 270 330 Q250 310 230 330 Q200 310 170 330 Q150 310 130 330 C115 320 120 270 120 220 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="6"/>
      <!-- Ghost Eyes -->
      <ellipse cx="175" cy="165" rx="14" ry="20" fill="#1e1b4b"/>
      <circle cx="170" cy="155" r="5" fill="#ffffff"/>
      <ellipse cx="225" cy="165" rx="14" ry="20" fill="#1e1b4b"/>
      <circle cx="220" cy="155" r="5" fill="#ffffff"/>
      <!-- Blush & Smile -->
      <ellipse cx="150" cy="185" rx="12" ry="7" fill="#f43f5e" opacity="0.6"/>
      <ellipse cx="250" cy="185" rx="12" ry="7" fill="#f43f5e" opacity="0.6"/>
      <ellipse cx="200" cy="185" rx="8" ry="12" fill="#1e1b4b"/>
    </svg>`,
  },
  {
    id: 'easy-6',
    title: 'Warm Coffee Mug',
    difficulty: 'easy',
    category: 'Food',
    hint: 'Cylindrical mug with curved handle, rich brown coffee top, and wispy steam curls!',
    palette: ['#ef4444', '#b91c1c', '#78350f', '#f97316', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fff7ed"/>
      <!-- Steam -->
      <path d="M170 120 Q155 80 175 50" fill="none" stroke="#fdba74" stroke-width="6" stroke-linecap="round"/>
      <path d="M200 110 Q220 70 200 40" fill="none" stroke="#fb923c" stroke-width="7" stroke-linecap="round"/>
      <path d="M230 120 Q245 80 225 50" fill="none" stroke="#fdba74" stroke-width="6" stroke-linecap="round"/>
      <!-- Handle -->
      <path d="M260 170 C330 170 330 270 260 270" fill="none" stroke="#dc2626" stroke-width="26" stroke-linecap="round"/>
      <path d="M260 170 C315 170 315 270 260 270" fill="none" stroke="#fff7ed" stroke-width="12" stroke-linecap="round"/>
      <!-- Mug Body -->
      <path d="M120 150 L130 310 C130 330 270 330 270 310 L280 150 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/>
      <!-- Top Rim / Coffee surface -->
      <ellipse cx="200" cy="150" rx="80" ry="24" fill="#dc2626" stroke="#b91c1c" stroke-width="6"/>
      <ellipse cx="200" cy="150" rx="70" ry="18" fill="#582900"/>
      <!-- Heart Latte Art -->
      <path d="M200 152 C190 142 178 147 182 156 C186 163 200 168 200 168 C200 168 214 163 218 156 C222 147 210 142 200 152 Z" fill="#fef3c7"/>
      <!-- Cute Star on Mug -->
      <polygon points="200,215 206,230 222,230 210,240 214,255 200,246 186,255 190,240 178,230 194,230" fill="#fde047"/>
    </svg>`,
  },
  {
    id: 'easy-7',
    title: 'Yummy Pizza Slice',
    difficulty: 'easy',
    category: 'Food',
    hint: 'Triangular yellow cheese slice, bubbly crust at top, red pepperoni circles and melting cheese drips!',
    palette: ['#f59e0b', '#dc2626', '#d97706', '#15803d', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fefce8"/>
      <!-- Crust -->
      <path d="M90 100 Q200 60 310 100 Q290 135 200 120 Q110 135 90 100 Z" fill="#d97706" stroke="#b45309" stroke-width="6"/>
      <!-- Cheese Body -->
      <polygon points="100,110 300,110 200,340" fill="#fbbf24" stroke="#d97706" stroke-width="6" stroke-linejoin="round"/>
      <!-- Pepperoni -->
      <circle cx="160" cy="160" r="22" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <circle cx="230" cy="180" r="20" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <circle cx="190" cy="240" r="18" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <!-- Basil leaves -->
      <ellipse cx="205" cy="140" rx="10" ry="6" fill="#16a34a" transform="rotate(30 205 140)"/>
      <ellipse cx="150" cy="220" rx="12" ry="7" fill="#16a34a" transform="rotate(-40 150 220)"/>
      <!-- Face on Pizza -->
      <circle cx="185" cy="290" r="4" fill="#1e293b"/>
      <circle cx="215" cy="290" r="4" fill="#1e293b"/>
      <path d="M194 298 Q200 305 206 298" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-8',
    title: 'Space Rocket',
    difficulty: 'easy',
    category: 'Sci-Fi',
    hint: 'Pointy rocket cylinder, round blue portal window, side fins, and blazing fire trail!',
    palette: ['#3b82f6', '#ef4444', '#f97316', '#facc15', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Stars -->
      <circle cx="80" cy="80" r="3" fill="#ffffff"/>
      <circle cx="320" cy="120" r="4" fill="#ffffff"/>
      <circle cx="70" cy="260" r="3" fill="#ffffff"/>
      <!-- Exhaust Flame -->
      <polygon points="175,270 200,360 225,270" fill="#ef4444"/>
      <polygon points="183,270 200,330 217,270" fill="#f97316"/>
      <polygon points="190,270 200,305 210,270" fill="#facc15"/>
      <!-- Left & Right Fins -->
      <path d="M150 210 L105 270 L150 260 Z" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
      <path d="M250 210 L295 270 L250 260 Z" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
      <!-- Rocket Body -->
      <path d="M200 60 C230 110 245 190 245 270 L155 270 C155 190 170 110 200 60 Z" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
      <!-- Nose Cone -->
      <path d="M200 60 C218 90 228 120 230 130 L170 130 C172 120 182 90 200 60 Z" fill="#ef4444"/>
      <!-- Window Porthole -->
      <circle cx="200" cy="180" r="28" fill="#38bdf8" stroke="#1e293b" stroke-width="6"/>
      <circle cx="200" cy="180" r="20" fill="#0284c7"/>
      <ellipse cx="192" cy="172" rx="8" ry="4" fill="#ffffff" transform="rotate(-30 192 172)"/>
    </svg>`,
  },
  {
    id: 'easy-9',
    title: 'Ringed Planet Saturn',
    difficulty: 'easy',
    category: 'Sci-Fi',
    hint: 'Giant glowing violet planet orb intersected by a wide angled golden ring disk!',
    palette: ['#8b5cf6', '#6366f1', '#fbbf24', '#f472b6', '#38bdf8'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#09090b"/>
      <!-- Distant Stars -->
      <circle cx="100" cy="70" r="2" fill="#ffffff"/>
      <circle cx="300" cy="90" r="3" fill="#ffffff"/>
      <circle cx="340" cy="310" r="2" fill="#ffffff"/>
      <circle cx="70" cy="330" r="3" fill="#ffffff"/>
      <!-- Back of Ring -->
      <ellipse cx="200" cy="200" rx="160" ry="40" fill="none" stroke="#f59e0b" stroke-width="24" transform="rotate(-20 200 200)"/>
      <ellipse cx="200" cy="200" rx="145" ry="34" fill="none" stroke="#fef08a" stroke-width="8" transform="rotate(-20 200 200)"/>
      <!-- Planet Sphere -->
      <circle cx="200" cy="200" r="85" fill="#8b5cf6"/>
      <path d="M120 180 Q200 215 280 180" fill="none" stroke="#a855f7" stroke-width="12" opacity="0.6"/>
      <path d="M125 210 Q200 245 275 210" fill="none" stroke="#c084fc" stroke-width="16" opacity="0.7"/>
      <path d="M140 240 Q200 270 260 240" fill="none" stroke="#ec4899" stroke-width="10" opacity="0.5"/>
      <!-- Front of Ring (clipped) -->
      <path d="M50 236 C90 300 270 230 350 164" fill="none" stroke="#f59e0b" stroke-width="24"/>
      <path d="M60 234 C95 295 265 230 340 166" fill="none" stroke="#fef08a" stroke-width="8"/>
    </svg>`,
  },
  {
    id: 'easy-10',
    title: 'Rubber Ducky',
    difficulty: 'easy',
    category: 'Animals',
    hint: 'Bright yellow duck silhouette, big orange beak, round head, and wing curve on water ripples!',
    palette: ['#facc15', '#f97316', '#38bdf8', '#0284c7', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#e0f2fe"/>
      <!-- Water Waves -->
      <path d="M50 320 Q100 300 150 320 T250 320 T350 320" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
      <path d="M80 345 Q130 330 180 345 T280 345 T380 345" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
      <!-- Duck Body -->
      <path d="M130 200 C100 200 80 240 100 280 C120 310 250 320 280 280 C300 250 280 220 230 220" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <path d="M280 280 C310 260 325 235 320 220 C300 235 285 245 265 250" fill="#eab308"/>
      <!-- Duck Head -->
      <circle cx="160" cy="150" r="55" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <!-- Eye -->
      <circle cx="140" cy="135" r="8" fill="#1e293b"/>
      <circle cx="137" cy="132" r="3" fill="#ffffff"/>
      <!-- Beak -->
      <path d="M120 145 C90 140 70 155 75 165 C85 175 118 170 120 170 Z" fill="#f97316" stroke="#c2410c" stroke-width="4"/>
      <!-- Wing -->
      <path d="M180 235 Q225 210 250 250 Q210 275 180 235 Z" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
    </svg>`,
  },

  // ================= MEDIUM (10 DRAWINGS) =================
  {
    id: 'medium-1',
    title: 'Astro Corgi',
    difficulty: 'medium',
    category: 'Animals',
    hint: 'Cute dog in astronaut helmet with glowing visor, antenna, and starry backpack!',
    palette: ['#f59e0b', '#38bdf8', '#ef4444', '#f8fafc', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Helmet Antenna -->
      <line x1="200" y1="90" x2="200" y2="45" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
      <circle cx="200" cy="40" r="10" fill="#ef4444"/>
      <!-- Spacesuit Body -->
      <rect x="130" y="250" width="140" height="100" rx="40" fill="#e2e8f0" stroke="#475569" stroke-width="6"/>
      <circle cx="200" cy="290" r="16" fill="#38bdf8"/>
      <!-- Helmet Dome -->
      <circle cx="200" cy="170" r="95" fill="#f1f5f9" stroke="#64748b" stroke-width="8"/>
      <!-- Visor reflection -->
      <ellipse cx="200" cy="170" rx="80" ry="65" fill="#1e293b"/>
      <!-- Corgi Inside Visor -->
      <polygon points="140,135 155,90 175,125" fill="#f59e0b"/>
      <polygon points="260,135 245,90 225,125" fill="#f59e0b"/>
      <circle cx="200" cy="175" r="55" fill="#f59e0b"/>
      <path d="M185 155 C195 145 205 145 215 155 L200 205 Z" fill="#ffffff"/>
      <!-- Eyes & Nose -->
      <circle cx="178" cy="165" r="6" fill="#1e293b"/>
      <circle cx="222" cy="165" r="6" fill="#1e293b"/>
      <ellipse cx="200" cy="180" rx="7" ry="5" fill="#1e293b"/>
      <!-- Cute Tongue -->
      <path d="M196 188 Q200 200 204 188" fill="#f43f5e"/>
      <!-- Glass reflection glint -->
      <path d="M150 140 A 65 65 0 0 1 250 140" fill="none" stroke="#38bdf8" stroke-width="6" opacity="0.7" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'medium-2',
    title: 'Retro Boombox',
    difficulty: 'medium',
    category: 'Objects',
    hint: 'Classic 80s stereo box with handle, dual speaker cones, cassette deck, and neon equalizers!',
    palette: ['#ec4899', '#06b6d4', '#facc15', '#334155', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1e1b4b"/>
      <!-- Handle -->
      <path d="M120 120 L120 70 L280 70 L280 120" fill="none" stroke="#ec4899" stroke-width="14" stroke-linecap="round"/>
      <!-- Main Boombox Body -->
      <rect x="60" y="120" width="280" height="190" rx="20" fill="#334155" stroke="#0f172a" stroke-width="8"/>
      <!-- Accent stripes -->
      <rect x="68" y="130" width="264" height="12" fill="#ec4899"/>
      <!-- Left Speaker -->
      <circle cx="125" cy="220" r="45" fill="#0f172a" stroke="#06b6d4" stroke-width="6"/>
      <circle cx="125" cy="220" r="25" fill="#06b6d4"/>
      <circle cx="125" cy="220" r="10" fill="#facc15"/>
      <!-- Right Speaker -->
      <circle cx="275" cy="220" r="45" fill="#0f172a" stroke="#06b6d4" stroke-width="6"/>
      <circle cx="275" cy="220" r="25" fill="#06b6d4"/>
      <circle cx="275" cy="220" r="10" fill="#facc15"/>
      <!-- Center Cassette Window -->
      <rect x="180" y="195" width="40" height="50" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="3"/>
      <circle cx="190" cy="220" r="4" fill="#ffffff"/>
      <circle cx="210" cy="220" r="4" fill="#ffffff"/>
      <!-- Equalizer Bars -->
      <rect x="180" y="155" width="6" height="24" fill="#22c55e"/>
      <rect x="190" y="163" width="6" height="16" fill="#facc15"/>
      <rect x="200" y="150" width="6" height="29" fill="#ec4899"/>
      <rect x="210" y="167" width="6" height="12" fill="#06b6d4"/>
    </svg>`,
  },
  {
    id: 'medium-3',
    title: 'Magic Potion Flask',
    difficulty: 'medium',
    category: 'Magic',
    hint: 'Glass corked round flask filled with glowing magenta potion, bubbles, and floating stars!',
    palette: ['#d946ef', '#8b5cf6', '#38bdf8', '#facc15', '#f8fafc'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#090d16"/>
      <!-- Magical Aura -->
      <circle cx="200" cy="240" r="110" fill="#c026d3" opacity="0.25"/>
      <!-- Cork Stopper -->
      <polygon points="175,70 225,70 215,100 185,100" fill="#b45309" stroke="#78350f" stroke-width="4"/>
      <!-- Neck Rim -->
      <rect x="170" y="100" width="60" height="16" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
      <!-- Flask Body -->
      <path d="M185 116 L185 160 C130 180 100 230 100 270 C100 330 145 360 200 360 C255 360 300 330 300 270 C300 230 270 180 215 160 L215 116 Z" fill="#ffffff" fill-opacity="0.1" stroke="#e2e8f0" stroke-width="7"/>
      <!-- Liquid inside -->
      <path d="M115 260 Q160 280 200 260 T285 260 C290 320 250 350 200 350 C150 350 110 320 115 260 Z" fill="#d946ef"/>
      <!-- Bubbles -->
      <circle cx="170" cy="300" r="10" fill="#f472b6" opacity="0.8"/>
      <circle cx="230" cy="285" r="14" fill="#f472b6" opacity="0.8"/>
      <circle cx="205" cy="320" r="8" fill="#f472b6" opacity="0.8"/>
      <circle cx="195" cy="230" r="6" fill="#fde047"/>
      <!-- Sparkle Stars -->
      <polygon points="150,190 153,197 160,200 153,203 150,210 147,203 140,200 147,197" fill="#facc15"/>
      <polygon points="250,170 253,177 260,180 253,183 250,190 247,183 240,180 247,177" fill="#38bdf8"/>
    </svg>`,
  },
  {
    id: 'medium-4',
    title: 'Cozy Fox in Scarf',
    difficulty: 'medium',
    category: 'Animals',
    hint: 'Orange fox head with fluffy white cheeks, pointy ears, and a warm wrapped red knit scarf!',
    palette: ['#ea580c', '#ef4444', '#f8fafc', '#1e293b', '#fed7aa'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0fdf4"/>
      <!-- Ears -->
      <polygon points="120,170 110,80 180,130" fill="#ea580c" stroke="#1e293b" stroke-width="6"/>
      <polygon points="130,150 125,95 170,130" fill="#1e293b"/>
      <polygon points="280,170 290,80 220,130" fill="#ea580c" stroke="#1e293b" stroke-width="6"/>
      <polygon points="270,150 275,95 230,130" fill="#1e293b"/>
      <!-- Head Base -->
      <path d="M120 160 C120 110 280 110 280 160 C290 210 260 260 200 270 C140 260 110 210 120 160 Z" fill="#ea580c" stroke="#1e293b" stroke-width="6"/>
      <!-- White Cheeks & Muzzle -->
      <path d="M120 190 C150 190 170 230 200 265 C230 230 250 190 280 190 C270 240 240 270 200 270 C160 270 130 240 120 190 Z" fill="#ffffff"/>
      <!-- Eyes & Nose -->
      <ellipse cx="160" cy="180" rx="7" ry="9" fill="#1e293b"/>
      <ellipse cx="240" cy="180" rx="7" ry="9" fill="#1e293b"/>
      <ellipse cx="200" cy="245" rx="10" ry="7" fill="#1e293b"/>
      <!-- Red Knit Scarf -->
      <rect x="130" y="270" width="140" height="40" rx="20" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
      <line x1="160" y1="270" x2="160" y2="310" stroke="#fca5a5" stroke-width="4"/>
      <line x1="190" y1="270" x2="190" y2="310" stroke="#fca5a5" stroke-width="4"/>
      <line x1="220" y1="270" x2="220" y2="310" stroke="#fca5a5" stroke-width="4"/>
      <rect x="210" y="300" width="35" height="60" rx="8" fill="#dc2626" stroke="#991b1b" stroke-width="5"/>
      <line x1="222" y1="360" x2="222" y2="370" stroke="#fca5a5" stroke-width="4"/>
      <line x1="232" y1="360" x2="232" y2="370" stroke="#fca5a5" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 'medium-5',
    title: 'Game Boy Classic',
    difficulty: 'medium',
    category: 'Gaming',
    hint: 'Retro handheld console with greenish dot-matrix screen, D-pad, slanted buttons, and speaker slits!',
    palette: ['#94a3b8', '#84cc16', '#65a30d', '#dc2626', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f1f5f9"/>
      <!-- Shell Body -->
      <path d="M100 60 L300 60 L300 320 Q300 340 275 340 L125 340 Q100 340 100 320 Z" fill="#cbd5e1" stroke="#475569" stroke-width="7"/>
      <!-- Screen Bezel -->
      <path d="M120 85 L280 85 L280 200 Q280 210 270 210 L130 210 Q120 210 120 200 Z" fill="#64748b" stroke="#334155" stroke-width="4"/>
      <!-- Power LED -->
      <circle cx="135" cy="140" r="4" fill="#ef4444"/>
      <!-- Green LCD Screen -->
      <rect x="150" y="100" width="105" height="90" rx="4" fill="#84cc16" stroke="#4d7c0f" stroke-width="4"/>
      <!-- Pixel Heart on Screen -->
      <path d="M190 140 L202 128 L215 140 L202 154 Z" fill="#3f6212"/>
      <!-- D-Pad -->
      <rect x="130" y="240" width="45" height="15" rx="3" fill="#1e293b"/>
      <rect x="145" y="225" width="15" height="45" rx="3" fill="#1e293b"/>
      <!-- A & B Buttons (Slanted) -->
      <circle cx="265" cy="240" r="11" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
      <circle cx="240" cy="255" r="11" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
      <!-- Select & Start -->
      <rect x="175" y="300" width="18" height="6" rx="2" fill="#64748b" transform="rotate(-25 184 303)"/>
      <rect x="205" y="300" width="18" height="6" rx="2" fill="#64748b" transform="rotate(-25 214 303)"/>
      <!-- Speaker Slits -->
      <line x1="260" y1="315" x2="280" y2="295" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      <line x1="268" y1="320" x2="288" y2="300" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'medium-6',
    title: 'Sakura Bonsai Tree',
    difficulty: 'medium',
    category: 'Nature',
    hint: 'Ceramic pot, gnarled twisty brown trunk, and clusters of blooming pink cherry blossoms!',
    palette: ['#f472b6', '#ec4899', '#78350f', '#0284c7', '#fdf2f8'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fdf2f8"/>
      <!-- Bonsai Pot -->
      <polygon points="120,310 280,310 265,355 135,355" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>
      <rect x="145" y="355" width="20" height="12" rx="3" fill="#0369a1"/>
      <rect x="235" y="355" width="20" height="12" rx="3" fill="#0369a1"/>
      <!-- Trunk & Branches -->
      <path d="M200 310 C190 270 160 250 180 210 C195 180 150 160 140 130" fill="none" stroke="#78350f" stroke-width="22" stroke-linecap="round"/>
      <path d="M180 210 C220 190 260 170 270 140" fill="none" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <path d="M190 170 C200 140 210 120 200 90" fill="none" stroke="#78350f" stroke-width="10" stroke-linecap="round"/>
      <!-- Sakura Blossom Clouds -->
      <circle cx="130" cy="120" r="40" fill="#f472b6"/>
      <circle cx="160" cy="100" r="35" fill="#fbcfe8"/>
      <circle cx="200" cy="80" r="42" fill="#ec4899"/>
      <circle cx="240" cy="95" r="36" fill="#f472b6"/>
      <circle cx="275" cy="130" r="42" fill="#fbcfe8"/>
      <circle cx="250" cy="150" r="30" fill="#ec4899"/>
      <!-- Falling Petals -->
      <ellipse cx="120" cy="220" rx="8" ry="4" fill="#f472b6" transform="rotate(30 120 220)"/>
      <ellipse cx="260" cy="250" rx="7" ry="4" fill="#ec4899" transform="rotate(-20 260 250)"/>
      <ellipse cx="220" cy="280" rx="8" ry="4" fill="#fbcfe8" transform="rotate(45 220 280)"/>
    </svg>`,
  },
  {
    id: 'medium-7',
    title: 'Lighthouse at Dusk',
    difficulty: 'medium',
    category: 'Nature',
    hint: 'Rocky cliff, red & white striped lighthouse tower, golden beacon light beam, and evening stars!',
    palette: ['#dc2626', '#f8fafc', '#facc15', '#1e1b4b', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1e1b4b"/>
      <!-- Sunset gradient horizon -->
      <path d="M0 250 Q200 220 400 250 L400 400 L0 400 Z" fill="#312e81"/>
      <path d="M0 320 C100 310 250 330 400 315 L400 400 L0 400 Z" fill="#0f172a"/>
      <!-- Light Beam -->
      <polygon points="190,120 0,40 0,180" fill="#facc15" opacity="0.3"/>
      <polygon points="210,120 400,60 400,200" fill="#facc15" opacity="0.35"/>
      <!-- Cliff Base -->
      <polygon points="120,330 280,330 310,400 90,400" fill="#334155"/>
      <!-- Lighthouse Tower -->
      <polygon points="175,130 225,130 240,330 160,330" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
      <!-- Red Stripes -->
      <polygon points="170,170 230,170 234,220 166,220" fill="#dc2626"/>
      <polygon points="163,260 237,260 240,305 160,305" fill="#dc2626"/>
      <!-- Beacon Room & Roof -->
      <rect x="175" y="105" width="50" height="25" fill="#facc15" stroke="#0f172a" stroke-width="4"/>
      <polygon points="165,105 235,105 200,70" fill="#dc2626" stroke="#0f172a" stroke-width="4"/>
      <circle cx="200" cy="65" r="5" fill="#facc15"/>
    </svg>`,
  },
  {
    id: 'medium-8',
    title: 'Whimsical Cupcake',
    difficulty: 'medium',
    category: 'Food',
    hint: 'Pleated pastel wrapper, giant swirling strawberry frosting cloud, sprinkles, and a glossy cherry!',
    palette: ['#ec4899', '#f43f5e', '#a855f7', '#fde047', '#38bdf8'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fdf4ff"/>
      <!-- Cupcake Liner / Wrapper -->
      <polygon points="120,240 280,240 255,360 145,360" fill="#c084fc" stroke="#7e22ce" stroke-width="6"/>
      <line x1="150" y1="240" x2="165" y2="360" stroke="#7e22ce" stroke-width="4"/>
      <line x1="185" y1="240" x2="192" y2="360" stroke="#7e22ce" stroke-width="4"/>
      <line x1="215" y1="240" x2="208" y2="360" stroke="#7e22ce" stroke-width="4"/>
      <line x1="250" y1="240" x2="235" y2="360" stroke="#7e22ce" stroke-width="4"/>
      <!-- Frosting Swirl (Bottom Layer) -->
      <ellipse cx="200" cy="235" rx="95" ry="30" fill="#f472b6" stroke="#db2777" stroke-width="5"/>
      <!-- Frosting Swirl (Middle Layer) -->
      <ellipse cx="200" cy="195" rx="75" ry="25" fill="#f9a8d4" stroke="#db2777" stroke-width="5"/>
      <!-- Frosting Swirl (Top Peak) -->
      <ellipse cx="200" cy="155" rx="50" ry="20" fill="#fdf2f8" stroke="#db2777" stroke-width="5"/>
      <!-- Colorful Sprinkles -->
      <line x1="150" y1="220" x2="162" y2="228" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
      <line x1="230" y1="225" x2="245" y2="220" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <line x1="180" y1="185" x2="190" y2="195" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/>
      <line x1="220" y1="180" x2="230" y2="175" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
      <!-- Cherry on Top -->
      <circle cx="200" cy="115" r="22" fill="#e11d48" stroke="#9f1239" stroke-width="4"/>
      <path d="M200 95 Q230 65 240 50" fill="none" stroke="#15803d" stroke-width="5" stroke-linecap="round"/>
      <circle cx="192" cy="108" r="4" fill="#ffffff"/>
    </svg>`,
  },
  {
    id: 'medium-9',
    title: 'Chameleon on Branch',
    difficulty: 'medium',
    category: 'Animals',
    hint: 'Curled tail chameleon perched on a green branch, big turret eyes, and rainbow scales!',
    palette: ['#10b981', '#06b6d4', '#facc15', '#78350f', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#ecfdf5"/>
      <!-- Tree Branch -->
      <path d="M40 270 Q180 250 360 270" fill="none" stroke="#78350f" stroke-width="24" stroke-linecap="round"/>
      <!-- Chameleon Body & Curled Tail -->
      <path d="M120 250 C70 250 50 180 90 160 C120 145 130 200 110 210 C95 215 90 200 100 190" fill="none" stroke="#10b981" stroke-width="16" stroke-linecap="round"/>
      <path d="M120 250 C130 170 230 160 270 200 C290 220 280 250 250 255 Z" fill="#10b981" stroke="#047857" stroke-width="6"/>
      <!-- Color Crest Back Ridges -->
      <polygon points="160,180 170,165 180,180" fill="#06b6d4"/>
      <polygon points="185,175 195,160 205,175" fill="#facc15"/>
      <polygon points="210,175 220,160 230,175" fill="#f43f5e"/>
      <!-- Big Swiveling Eye -->
      <circle cx="245" cy="195" r="22" fill="#34d399" stroke="#047857" stroke-width="4"/>
      <circle cx="245" cy="195" r="10" fill="#1e293b"/>
      <circle cx="242" cy="192" r="3" fill="#ffffff"/>
      <!-- Tiny Feet Clasping Branch -->
      <ellipse cx="170" cy="255" rx="8" ry="12" fill="#059669"/>
      <ellipse cx="230" cy="255" rx="8" ry="12" fill="#059669"/>
    </svg>`,
  },
  {
    id: 'medium-10',
    title: 'Alien Flying Saucer',
    difficulty: 'medium',
    category: 'Sci-Fi',
    hint: 'Metallic flying saucer, transparent dome with a green alien waving, and a glowing tractor beam!',
    palette: ['#a855f7', '#22c55e', '#38bdf8', '#facc15', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0b0f19"/>
      <!-- Stars -->
      <circle cx="80" cy="60" r="3" fill="#facc15"/>
      <circle cx="320" cy="80" r="2" fill="#ffffff"/>
      <circle cx="350" cy="300" r="3" fill="#38bdf8"/>
      <!-- Tractor Abduction Beam -->
      <polygon points="170,220 230,220 310,380 90,380" fill="#38bdf8" opacity="0.25"/>
      <ellipse cx="200" cy="380" rx="110" ry="15" fill="#38bdf8" opacity="0.35"/>
      <!-- Glass Cockpit Dome -->
      <ellipse cx="200" cy="165" rx="65" ry="60" fill="#38bdf8" opacity="0.5" stroke="#93c5fd" stroke-width="4"/>
      <!-- Cute Green Alien -->
      <ellipse cx="200" cy="165" rx="26" ry="30" fill="#22c55e"/>
      <circle cx="190" cy="155" r="6" fill="#0f172a"/>
      <circle cx="210" cy="155" r="6" fill="#0f172a"/>
      <line x1="200" y1="135" x2="200" y2="115" stroke="#22c55e" stroke-width="4"/>
      <circle cx="200" cy="112" r="5" fill="#facc15"/>
      <!-- Metallic Saucer Disk -->
      <ellipse cx="200" cy="205" rx="130" ry="32" fill="#a855f7" stroke="#6b21a8" stroke-width="6"/>
      <ellipse cx="200" cy="215" rx="100" ry="20" fill="#7e22ce"/>
      <!-- Flashing Saucer Lights -->
      <circle cx="100" cy="208" r="7" fill="#facc15"/>
      <circle cx="140" cy="215" r="7" fill="#22c55e"/>
      <circle cx="200" cy="220" r="7" fill="#facc15"/>
      <circle cx="260" cy="215" r="7" fill="#22c55e"/>
      <circle cx="300" cy="208" r="7" fill="#facc15"/>
    </svg>`,
  },

  // ================= HARD (10 DRAWINGS) =================
  {
    id: 'hard-1',
    title: 'Cyberpunk Ramen Shop',
    difficulty: 'hard',
    category: 'Sci-Fi',
    hint: 'Neon-lit nighttime noodle stall with glowing signs, steaming bowl, lanterns, and rain reflections!',
    palette: ['#06b6d4', '#f43f5e', '#eab308', '#8b5cf6', '#090d16'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#090d16"/>
      <!-- Background Cyber Grid -->
      <line x1="0" y1="320" x2="400" y2="320" stroke="#06b6d4" stroke-width="3" opacity="0.6"/>
      <line x1="0" y1="360" x2="400" y2="360" stroke="#06b6d4" stroke-width="2" opacity="0.4"/>
      <!-- Shop Roof Awning -->
      <polygon points="60,110 340,110 360,150 40,150" fill="#f43f5e" stroke="#06b6d4" stroke-width="4"/>
      <line x1="100" y1="110" x2="90" y2="150" stroke="#881337" stroke-width="3"/>
      <line x1="200" y1="110" x2="200" y2="150" stroke="#881337" stroke-width="3"/>
      <line x1="300" y1="110" x2="310" y2="150" stroke="#881337" stroke-width="3"/>
      <!-- Neon Sign Box -->
      <rect x="130" y="45" width="140" height="50" rx="8" fill="#1e1b4b" stroke="#06b6d4" stroke-width="4"/>
      <text x="200" y="80" fill="#f43f5e" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="24" text-anchor="middle" letter-spacing="2">RAMEN 🍜</text>
      <!-- Counter & Stools -->
      <rect x="70" y="240" width="260" height="80" rx="6" fill="#1e293b" stroke="#334155" stroke-width="4"/>
      <rect x="100" y="290" width="40" height="30" rx="4" fill="#06b6d4"/>
      <rect x="260" y="290" width="40" height="30" rx="4" fill="#06b6d4"/>
      <!-- Giant Steaming Ramen Bowl -->
      <path d="M140 220 C140 270 260 270 260 220 Z" fill="#f43f5e" stroke="#fbbf24" stroke-width="5"/>
      <ellipse cx="200" cy="220" rx="60" ry="15" fill="#fef08a"/>
      <!-- Chopsticks & Egg -->
      <line x1="170" y1="170" x2="245" y2="215" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>
      <circle cx="180" cy="220" r="10" fill="#ffffff"/>
      <circle cx="180" cy="220" r="6" fill="#f97316"/>
      <!-- Steam Wisps -->
      <path d="M185 195 Q175 165 190 145" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
      <path d="M215 195 Q225 165 210 145" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'hard-2',
    title: 'Steampunk Owl',
    difficulty: 'hard',
    category: 'Objects',
    hint: 'Brass mechanical owl with rotating cog eyes, riveted wing plates, and steam pipe feathers!',
    palette: ['#d97706', '#b45309', '#eab308', '#78350f', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1c1917"/>
      <!-- Perch Pipe -->
      <rect x="40" y="320" width="320" height="24" rx="6" fill="#78350f" stroke="#451a03" stroke-width="4"/>
      <!-- Riveted Wings -->
      <path d="M80 180 C60 240 80 300 120 310 L140 200 Z" fill="#b45309" stroke="#78350f" stroke-width="5"/>
      <path d="M320 180 C340 240 320 300 280 310 L260 200 Z" fill="#b45309" stroke="#78350f" stroke-width="5"/>
      <!-- Main Brass Body -->
      <ellipse cx="200" cy="240" rx="75" ry="90" fill="#d97706" stroke="#78350f" stroke-width="6"/>
      <!-- Chest Pressure Gauge -->
      <circle cx="200" cy="260" r="22" fill="#fef3c7" stroke="#451a03" stroke-width="4"/>
      <line x1="200" y1="260" x2="212" y2="250" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
      <!-- Head -->
      <ellipse cx="200" cy="145" rx="70" ry="55" fill="#f59e0b" stroke="#78350f" stroke-width="6"/>
      <!-- Gear Eyes -->
      <circle cx="160" cy="140" r="30" fill="#451a03" stroke="#eab308" stroke-width="6"/>
      <circle cx="160" cy="140" r="16" fill="#38bdf8"/>
      <circle cx="160" cy="140" r="8" fill="#0f172a"/>
      <circle cx="240" cy="140" r="30" fill="#451a03" stroke="#eab308" stroke-width="6"/>
      <circle cx="240" cy="140" r="16" fill="#38bdf8"/>
      <circle cx="240" cy="140" r="8" fill="#0f172a"/>
      <!-- Copper Beak -->
      <polygon points="190,150 210,150 200,180" fill="#78350f"/>
      <!-- Ear Tuft Horns -->
      <polygon points="135,105 150,70 170,105" fill="#b45309"/>
      <polygon points="265,105 250,70 230,105" fill="#b45309"/>
    </svg>`,
  },
  {
    id: 'hard-3',
    title: "Wizard's Library",
    difficulty: 'hard',
    category: 'Magic',
    hint: 'Enchanted wooden bookshelf loaded with magical glowing spell books, floating crystal orb, and candles!',
    palette: ['#8b5cf6', '#eab308', '#9333ea', '#78350f', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Wooden Bookcase Frame -->
      <rect x="60" y="50" width="280" height="300" rx="10" fill="#451a03" stroke="#78350f" stroke-width="8"/>
      <line x1="60" y1="160" x2="340" y2="160" stroke="#78350f" stroke-width="8"/>
      <line x1="60" y1="260" x2="340" y2="260" stroke="#78350f" stroke-width="8"/>
      <!-- Top Shelf Books -->
      <rect x="80" y="80" width="22" height="80" rx="3" fill="#dc2626"/>
      <rect x="105" y="90" width="26" height="70" rx="3" fill="#8b5cf6"/>
      <rect x="135" y="70" width="30" height="90" rx="3" fill="#eab308"/>
      <rect x="170" y="85" width="24" height="75" rx="3" fill="#22c55e"/>
      <!-- Floating Crystal Orb -->
      <circle cx="260" cy="110" r="30" fill="#c084fc" opacity="0.8"/>
      <circle cx="260" cy="110" r="22" fill="#38bdf8"/>
      <circle cx="255" cy="102" r="6" fill="#ffffff"/>
      <!-- Middle Shelf Ancient Tomes -->
      <rect x="80" y="180" width="35" height="80" rx="4" fill="#9333ea"/>
      <rect x="120" y="195" width="28" height="65" rx="3" fill="#3b82f6"/>
      <polygon points="175,260 210,210 230,220 195,260" fill="#d97706"/>
      <!-- Magic Potion & Candle -->
      <circle cx="280" cy="235" r="18" fill="#10b981"/>
      <rect x="274" y="205" width="12" height="15" fill="#f1f5f9"/>
      <ellipse cx="280" cy="200" rx="4" ry="7" fill="#facc15"/>
      <!-- Bottom Shelf Pile -->
      <rect x="90" y="300" width="120" height="24" rx="3" fill="#b45309"/>
      <rect x="100" y="276" width="100" height="24" rx="3" fill="#dc2626"/>
      <rect x="110" y="262" width="80" height="14" rx="2" fill="#eab308"/>
      <circle cx="270" cy="300" r="25" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 'hard-4',
    title: 'Majestic Koi Pond',
    difficulty: 'hard',
    category: 'Nature',
    hint: 'Two graceful Yin-Yang swimming Japanese koi fish with spotted red/white scales and lily pads!',
    palette: ['#ef4444', '#f8fafc', '#0284c7', '#22c55e', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0284c7"/>
      <!-- Water Ripples -->
      <ellipse cx="200" cy="200" rx="160" ry="160" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.5"/>
      <ellipse cx="200" cy="200" rx="100" ry="100" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.6"/>
      <!-- Lily Pads -->
      <path d="M80 120 A 40 40 0 1 1 110 80 L80 120 Z" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
      <path d="M300 290 A 45 45 0 1 1 335 250 L300 290 Z" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
      <!-- Lotus Flower -->
      <circle cx="100" cy="100" r="10" fill="#f472b6"/>
      <!-- Koi 1 (Red & White) -->
      <path d="M160 280 C110 240 120 150 190 120 C210 110 220 140 190 180 C160 220 200 270 230 290" fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round"/>
      <circle cx="190" cy="120" r="14" fill="#ef4444"/>
      <!-- Koi 1 Fins -->
      <path d="M220 290 L250 330 L220 315 L190 330 Z" fill="#ffffff" opacity="0.8"/>
      <!-- Koi 2 (Dark & Orange) -->
      <path d="M240 120 C290 160 280 250 210 280 C190 290 180 260 210 220 C240 180 200 130 170 110" fill="none" stroke="#ea580c" stroke-width="26" stroke-linecap="round"/>
      <circle cx="210" cy="280" r="14" fill="#0f172a"/>
      <!-- Koi 2 Fins -->
      <path d="M170 110 L140 70 L170 85 L200 70 Z" fill="#ea580c" opacity="0.8"/>
    </svg>`,
  },
  {
    id: 'hard-5',
    title: 'Neon Tokyo Skyline',
    difficulty: 'hard',
    category: 'Sci-Fi',
    hint: 'Dramatic Mount Fuji silhouette, giant pink retro sun, neon skyscraper skyline, and laser grid!',
    palette: ['#ec4899', '#8b5cf6', '#06b6d4', '#facc15', '#090d16'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#090d16"/>
      <!-- Giant Retro Synthwave Sun -->
      <circle cx="200" cy="170" r="90" fill="#f43f5e"/>
      <line x1="110" y1="180" x2="290" y2="180" stroke="#090d16" stroke-width="4"/>
      <line x1="120" y1="200" x2="280" y2="200" stroke="#090d16" stroke-width="6"/>
      <line x1="140" y1="220" x2="260" y2="220" stroke="#090d16" stroke-width="8"/>
      <!-- Mount Fuji Silhouette -->
      <polygon points="70,250 200,120 330,250" fill="#312e81"/>
      <polygon points="175,145 200,120 225,145 210,155 200,148 190,155" fill="#f8fafc"/>
      <!-- Tokyo Skyscraper Silhouettes -->
      <rect x="40" y="200" width="45" height="120" fill="#1e1b4b" stroke="#06b6d4" stroke-width="2"/>
      <rect x="90" y="160" width="55" height="160" fill="#0f172a" stroke="#ec4899" stroke-width="2"/>
      <rect x="155" y="210" width="50" height="110" fill="#1e1b4b"/>
      <rect x="215" y="175" width="60" height="145" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
      <rect x="285" y="190" width="40" height="130" fill="#1e1b4b" stroke="#facc15" stroke-width="2"/>
      <rect x="330" y="220" width="40" height="100" fill="#0f172a"/>
      <!-- Glowing Window Matrix -->
      <line x1="100" y1="180" x2="135" y2="180" stroke="#facc15" stroke-dasharray="3,3" stroke-width="2"/>
      <line x1="100" y1="200" x2="135" y2="200" stroke="#06b6d4" stroke-dasharray="3,3" stroke-width="2"/>
      <line x1="225" y1="195" x2="265" y2="195" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="2"/>
      <!-- Cyber Highway Grid Ground -->
      <rect x="0" y="320" width="400" height="80" fill="#020617"/>
      <line x1="200" y1="320" x2="40" y2="400" stroke="#ec4899" stroke-width="3"/>
      <line x1="200" y1="320" x2="150" y2="400" stroke="#06b6d4" stroke-width="3"/>
      <line x1="200" y1="320" x2="250" y2="400" stroke="#06b6d4" stroke-width="3"/>
      <line x1="200" y1="320" x2="360" y2="400" stroke="#ec4899" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'hard-6',
    title: 'Dragon & Crystal',
    difficulty: 'hard',
    category: 'Magic',
    hint: 'Fierce winged green dragon coiled around a giant glowing blue magic crystal prism!',
    palette: ['#10b981', '#06b6d4', '#facc15', '#ef4444', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Glowing Magic Crystal -->
      <polygon points="200,60 250,160 200,340 150,160" fill="#38bdf8" stroke="#bae6fd" stroke-width="6"/>
      <polygon points="200,60 220,160 200,340" fill="#0284c7"/>
      <!-- Dragon Wings Spread -->
      <path d="M170 170 C100 110 50 140 40 170 C70 200 120 210 160 210 Z" fill="#059669" stroke="#047857" stroke-width="5"/>
      <path d="M230 170 C300 110 350 140 360 170 C330 200 280 210 240 210 Z" fill="#059669" stroke="#047857" stroke-width="5"/>
      <!-- Coiled Dragon Body -->
      <path d="M130 290 C120 220 280 220 270 290 C260 350 140 350 130 290 Z" fill="none" stroke="#10b981" stroke-width="24"/>
      <!-- Dragon Head -->
      <path d="M160 140 L110 110 L130 160 Z" fill="#10b981" stroke="#047857" stroke-width="4"/>
      <!-- Horns & Red Eye -->
      <polygon points="150,130 175,95 160,135" fill="#facc15"/>
      <circle cx="130" cy="130" r="5" fill="#ef4444"/>
      <!-- Fire Breath Sparkles -->
      <circle cx="95" cy="100" r="8" fill="#f97316"/>
      <circle cx="80" cy="85" r="5" fill="#facc15"/>
    </svg>`,
  },
  {
    id: 'hard-7',
    title: 'Enchanted Tree of Life',
    difficulty: 'hard',
    category: 'Nature',
    hint: 'Gigantic mystical spiral tree canopy brimming with bioluminescent glow, roots, and fireflies!',
    palette: ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6', '#020617'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#020617"/>
      <!-- Glowing Forest Mist -->
      <circle cx="200" cy="180" r="140" fill="#8b5cf6" opacity="0.2"/>
      <!-- Spiral Tree Canopy -->
      <circle cx="200" cy="140" r="75" fill="#a855f7" opacity="0.8"/>
      <circle cx="145" cy="160" r="55" fill="#06b6d4" opacity="0.75"/>
      <circle cx="255" cy="160" r="55" fill="#ec4899" opacity="0.75"/>
      <circle cx="200" cy="90" r="50" fill="#38bdf8" opacity="0.85"/>
      <!-- Entangled Trunk & Roots -->
      <path d="M190 350 C180 270 160 240 180 190 L220 190 C240 240 220 270 210 350 Z" fill="#475569" stroke="#94a3b8" stroke-width="4"/>
      <path d="M180 350 C150 370 110 380 80 375" fill="none" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
      <path d="M220 350 C250 370 290 380 320 375" fill="none" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
      <!-- Hanging Bioluminescent Lanterns / Fireflies -->
      <circle cx="130" cy="220" r="8" fill="#fde047"/>
      <line x1="130" y1="180" x2="130" y2="215" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="270" cy="220" r="8" fill="#fde047"/>
      <line x1="270" y1="180" x2="270" y2="215" stroke="#ec4899" stroke-width="2"/>
      <circle cx="200" cy="240" r="10" fill="#67e8f9"/>
      <line x1="200" y1="190" x2="200" y2="232" stroke="#67e8f9" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'hard-8',
    title: 'Tropical Coral Reef',
    difficulty: 'hard',
    category: 'Nature',
    hint: 'Underwater scene with brain coral, clownfish anemone, sea turtle, and sunbeam caustics!',
    palette: ['#06b6d4', '#f97316', '#ec4899', '#facc15', '#083344'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#083344"/>
      <!-- Sun Rays -->
      <polygon points="80,0 140,0 200,400 100,400" fill="#38bdf8" opacity="0.15"/>
      <polygon points="220,0 280,0 360,400 280,400" fill="#38bdf8" opacity="0.15"/>
      <!-- Corals -->
      <path d="M50 400 C50 320 120 310 110 400" fill="#ec4899" stroke="#be185d" stroke-width="6"/>
      <path d="M280 400 C300 290 380 300 360 400" fill="#f59e0b" stroke="#b45309" stroke-width="6"/>
      <path d="M120 400 C150 340 220 330 200 400" fill="#a855f7" stroke="#7e22ce" stroke-width="6"/>
      <!-- Sea Turtle Swimming -->
      <ellipse cx="220" cy="150" rx="40" ry="28" fill="#15803d" stroke="#166534" stroke-width="4"/>
      <circle cx="270" cy="140" r="14" fill="#22c55e"/>
      <path d="M210 130 Q240 90 260 100" fill="none" stroke="#22c55e" stroke-width="12" stroke-linecap="round"/>
      <path d="M210 170 Q240 210 260 200" fill="none" stroke="#22c55e" stroke-width="12" stroke-linecap="round"/>
      <!-- Clownfish (Nemo) -->
      <ellipse cx="140" cy="240" rx="24" ry="16" fill="#f97316"/>
      <polygon points="120,240 100,225 100,255" fill="#f97316"/>
      <rect x="135" y="225" width="6" height="30" fill="#ffffff"/>
      <circle cx="155" cy="235" r="3" fill="#000000"/>
    </svg>`,
  },
  {
    id: 'hard-9',
    title: 'Vintage Vespa in Paris',
    difficulty: 'hard',
    category: 'Objects',
    hint: 'Classic mint green Italian scooter parked with Eiffel Tower in pastel sunset background!',
    palette: ['#10b981', '#6ee7b7', '#f43f5e', '#fde047', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Eiffel Tower Backdrop -->
      <polygon points="180,260 220,260 205,50 195,50" fill="none" stroke="#fca5a5" stroke-width="6"/>
      <line x1="185" y1="180" x2="215" y2="180" stroke="#fca5a5" stroke-width="4"/>
      <line x1="175" y1="230" x2="225" y2="230" stroke="#fca5a5" stroke-width="4"/>
      <!-- Vespa Wheels -->
      <circle cx="120" cy="310" r="35" fill="#1e293b" stroke="#cbd5e1" stroke-width="10"/>
      <circle cx="280" cy="310" r="35" fill="#1e293b" stroke="#cbd5e1" stroke-width="10"/>
      <!-- Scooter Body & Apron -->
      <path d="M120 310 C140 250 200 260 260 260 L280 310 Z" fill="#6ee7b7" stroke="#059669" stroke-width="6"/>
      <path d="M240 260 L260 170 L230 170" fill="none" stroke="#059669" stroke-width="10" stroke-linecap="round"/>
      <!-- Handlebar & Headlamp -->
      <rect x="220" y="155" width="60" height="15" rx="7" fill="#6ee7b7" stroke="#059669" stroke-width="4"/>
      <circle cx="250" cy="162" r="12" fill="#fef08a" stroke="#d97706" stroke-width="3"/>
      <!-- Leather Seat -->
      <path d="M160 245 Q210 235 240 245" fill="none" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'hard-10',
    title: 'Futuristic Mech Suit',
    difficulty: 'hard',
    category: 'Sci-Fi',
    hint: 'Armored combat mecha with neon energy blade, chest reactor core, and laser visor!',
    palette: ['#3b82f6', '#1d4ed8', '#06b6d4', '#ef4444', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0b1329"/>
      <!-- Energy Blade -->
      <line x1="90" y1="80" x2="120" y2="280" stroke="#06b6d4" stroke-width="14" stroke-linecap="round"/>
      <line x1="90" y1="80" x2="120" y2="280" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      <!-- Armored Shoulders -->
      <polygon points="120,150 70,180 110,220 140,180" fill="#1d4ed8" stroke="#60a5fa" stroke-width="4"/>
      <polygon points="280,150 330,180 290,220 260,180" fill="#1d4ed8" stroke="#60a5fa" stroke-width="4"/>
      <!-- Chest Armor & Core -->
      <polygon points="140,150 260,150 240,270 160,270" fill="#3b82f6" stroke="#1d4ed8" stroke-width="6"/>
      <polygon points="200,185 225,225 175,225" fill="#06b6d4"/>
      <polygon points="200,195 215,220 185,220" fill="#ffffff"/>
      <!-- Mech Helmet -->
      <polygon points="170,140 230,140 220,80 180,80" fill="#1e293b" stroke="#60a5fa" stroke-width="4"/>
      <!-- Glowing Laser Visor -->
      <rect x="180" y="105" width="40" height="10" rx="3" fill="#ef4444"/>
      <!-- Leg Plating -->
      <polygon points="160,270 180,360 140,360 140,280" fill="#1d4ed8"/>
      <polygon points="240,270 220,360 260,360 260,280" fill="#1d4ed8"/>
    </svg>`,
  },
];
