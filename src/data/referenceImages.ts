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
  // ================= EASY (10 CUTE CARTOON CHARACTERS) =================
  {
    id: 'easy-1',
    title: 'Smiling Flower',
    difficulty: 'easy',
    category: 'Nature',
    hint: 'Draw the round smiling center, 6 pink petals around it, green stem, and cute leaves!',
    palette: ['#facc15', '#ec4899', '#22c55e', '#f43f5e', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fdf4ff"/>
      <!-- Stem & Leaves -->
      <path d="M200 230 Q190 320 200 370" fill="none" stroke="#22c55e" stroke-width="12" stroke-linecap="round"/>
      <path d="M195 300 Q140 280 150 320 Q180 320 195 305" fill="#22c55e" stroke="#16a34a" stroke-width="3"/>
      <path d="M205 320 Q260 300 250 340 Q220 340 205 325" fill="#22c55e" stroke="#16a34a" stroke-width="3"/>
      <!-- 6 Outer Pink Petals -->
      <circle cx="200" cy="110" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <circle cx="265" cy="145" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <circle cx="265" cy="225" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <circle cx="200" cy="260" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <circle cx="135" cy="225" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <circle cx="135" cy="145" r="42" fill="#f472b6" stroke="#db2777" stroke-width="4"/>
      <!-- Yellow Center Face -->
      <circle cx="200" cy="185" r="55" fill="#fde047" stroke="#eab308" stroke-width="6"/>
      <!-- Eyes & Cheeks -->
      <circle cx="180" cy="175" r="7" fill="#1e293b"/>
      <circle cx="178" cy="172" r="2.5" fill="#ffffff"/>
      <circle cx="220" cy="175" r="7" fill="#1e293b"/>
      <circle cx="218" cy="172" r="2.5" fill="#ffffff"/>
      <circle cx="168" cy="190" r="8" fill="#f43f5e" opacity="0.6"/>
      <circle cx="232" cy="190" r="8" fill="#f43f5e" opacity="0.6"/>
      <!-- Happy Smile -->
      <path d="M190 192 Q200 206 210 192" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-2',
    title: 'Cute Cartoon Owl',
    difficulty: 'easy',
    category: 'Animals',
    hint: 'Chubby round body, giant yellow eyes, pointy ear tufts, orange beak, and branch!',
    palette: ['#8b5cf6', '#a855f7', '#facc15', '#f97316', '#1e1b4b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1e1b4b"/>
      <!-- Night Stars -->
      <circle cx="80" cy="70" r="3" fill="#fde047"/>
      <circle cx="320" cy="90" r="4" fill="#fde047"/>
      <circle cx="340" cy="280" r="3" fill="#ffffff"/>
      <!-- Tree Branch -->
      <path d="M50 320 Q200 300 350 320" fill="none" stroke="#78350f" stroke-width="18" stroke-linecap="round"/>
      <!-- Owl Body & Head -->
      <ellipse cx="200" cy="205" rx="90" ry="105" fill="#8b5cf6" stroke="#6d28d9" stroke-width="6"/>
      <!-- Ear Horns -->
      <polygon points="125,120 140,65 175,115" fill="#7c3aed"/>
      <polygon points="275,120 260,65 225,115" fill="#7c3aed"/>
      <!-- Light Belly Patch -->
      <ellipse cx="200" cy="240" rx="55" ry="60" fill="#ddd6fe"/>
      <!-- Belly Feather V-patterns -->
      <path d="M185 220 L195 230 L205 220" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <path d="M195 245 L205 255 L215 245" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <!-- Giant Eyes -->
      <circle cx="160" cy="165" r="32" fill="#ffffff" stroke="#6d28d9" stroke-width="4"/>
      <circle cx="160" cy="165" r="18" fill="#facc15"/>
      <circle cx="160" cy="165" r="10" fill="#1e1b4b"/>
      <circle cx="156" cy="160" r="4" fill="#ffffff"/>
      <circle cx="240" cy="165" r="32" fill="#ffffff" stroke="#6d28d9" stroke-width="4"/>
      <circle cx="240" cy="165" r="18" fill="#facc15"/>
      <circle cx="240" cy="165" r="10" fill="#1e1b4b"/>
      <circle cx="236" cy="160" r="4" fill="#ffffff"/>
      <!-- Orange Beak -->
      <polygon points="190,175 210,175 200,200" fill="#f97316"/>
      <!-- Claws / Feet -->
      <ellipse cx="180" cy="305" rx="10" ry="6" fill="#f97316"/>
      <ellipse cx="220" cy="305" rx="10" ry="6" fill="#f97316"/>
    </svg>`,
  },
  {
    id: 'easy-3',
    title: 'Mithu the Parrot',
    difficulty: 'easy',
    category: 'Animals',
    hint: 'Vibrant green cartoon parrot, big curved red beak, yellow ring collar, and tail feathers!',
    palette: ['#22c55e', '#ef4444', '#facc15', '#0ea5e9', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#ecfdf5"/>
      <!-- Wooden Perch -->
      <circle cx="200" cy="200" r="140" fill="none" stroke="#d97706" stroke-width="12"/>
      <!-- Tail Feathers -->
      <path d="M190 280 Q170 360 160 380 Q185 360 200 300" fill="#0ea5e9"/>
      <path d="M200 280 Q190 370 180 390 Q205 370 210 300" fill="#22c55e"/>
      <!-- Body & Head -->
      <ellipse cx="200" cy="180" rx="55" ry="80" fill="#22c55e" stroke="#15803d" stroke-width="5"/>
      <circle cx="200" cy="130" r="45" fill="#22c55e" stroke="#15803d" stroke-width="5"/>
      <!-- Red Neck Ring -->
      <path d="M165 155 Q200 170 235 155" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
      <!-- Curved Big Red Beak -->
      <path d="M230 115 C265 115 275 140 250 160 C240 145 230 140 220 135 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
      <!-- Eye -->
      <circle cx="195" cy="120" r="14" fill="#ffffff" stroke="#15803d" stroke-width="3"/>
      <circle cx="195" cy="120" r="6" fill="#1e293b"/>
      <circle cx="193" cy="117" r="2" fill="#ffffff"/>
      <!-- Wing -->
      <path d="M165 190 C150 230 180 270 205 250 C215 220 195 190 165 190 Z" fill="#16a34a" stroke="#15803d" stroke-width="4"/>
      <!-- Feet gripping perch -->
      <ellipse cx="190" cy="260" rx="8" ry="5" fill="#f59e0b"/>
      <ellipse cx="210" cy="260" rx="8" ry="5" fill="#f59e0b"/>
    </svg>`,
  },
  {
    id: 'easy-4',
    title: 'Cute Small Baby',
    difficulty: 'easy',
    category: 'People',
    hint: 'Chubby smiling baby face, big eyes, cute pink pacifier, and a curl of hair on top!',
    palette: ['#fbcfe8', '#38bdf8', '#fbbf24', '#f43f5e', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fdf2f8"/>
      <!-- Baby Bib / Onesie -->
      <path d="M130 280 C130 250 270 250 270 280 L280 370 L120 370 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="6"/>
      <path d="M160 255 Q200 285 240 255" fill="none" stroke="#f472b6" stroke-width="10" stroke-linecap="round"/>
      <!-- Cute Curl of Hair -->
      <path d="M200 90 Q215 60 200 50 Q185 60 200 75" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
      <!-- Round Head -->
      <circle cx="200" cy="180" r="95" fill="#fed7aa" stroke="#ea580c" stroke-width="6"/>
      <!-- Cute Ears -->
      <circle cx="105" cy="180" r="18" fill="#fed7aa" stroke="#ea580c" stroke-width="5"/>
      <circle cx="295" cy="180" r="18" fill="#fed7aa" stroke="#ea580c" stroke-width="5"/>
      <!-- Big Sparkling Eyes -->
      <ellipse cx="165" cy="165" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="160" cy="158" r="5" fill="#ffffff"/>
      <ellipse cx="235" cy="165" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="230" cy="158" r="5" fill="#ffffff"/>
      <!-- Rosy Blush Cheeks -->
      <circle cx="145" cy="195" r="14" fill="#f43f5e" opacity="0.6"/>
      <circle cx="255" cy="195" r="14" fill="#f43f5e" opacity="0.6"/>
      <!-- Cute Baby Pacifier / Dummy -->
      <circle cx="200" cy="215" r="24" fill="#ec4899" stroke="#be185d" stroke-width="4"/>
      <circle cx="200" cy="215" r="12" fill="#ffffff"/>
      <circle cx="200" cy="238" r="10" fill="none" stroke="#ec4899" stroke-width="5"/>
    </svg>`,
  },
  {
    id: 'easy-5',
    title: 'Peppa Pig',
    difficulty: 'easy',
    category: 'Cartoon',
    hint: 'Iconic pink whistle-shaped snout, red dress, two round eyes at top, and curly pink tail!',
    palette: ['#f472b6', '#ef4444', '#fbcfe8', '#1e293b', '#38bdf8'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#e0f2fe"/>
      <!-- Peppa Red Dress Body -->
      <path d="M150 240 Q200 230 250 240 L285 360 L115 360 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/>
      <!-- Thin Legs & Black Shoes -->
      <line x1="165" y1="360" x2="165" y2="385" stroke="#1e293b" stroke-width="6"/>
      <ellipse cx="155" cy="385" rx="15" ry="6" fill="#1e293b"/>
      <line x1="235" y1="360" x2="235" y2="385" stroke="#1e293b" stroke-width="6"/>
      <ellipse cx="225" cy="385" rx="15" ry="6" fill="#1e293b"/>
      <!-- Arms -->
      <path d="M135 270 L80 290" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/>
      <path d="M265 270 L320 290" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/>
      <!-- Pig Ears -->
      <ellipse cx="180" cy="75" rx="12" ry="24" fill="#fbcfe8" stroke="#f472b6" stroke-width="5" transform="rotate(-15 180 75)"/>
      <ellipse cx="225" cy="75" rx="12" ry="24" fill="#fbcfe8" stroke="#f472b6" stroke-width="5" transform="rotate(15 225 75)"/>
      <!-- Peppa Snout & Head -->
      <path d="M150 160 C130 120 180 90 230 90 C280 90 300 130 270 160 C280 165 310 160 320 170 C330 180 320 200 300 205 C270 215 220 240 170 220 C130 200 130 170 150 160 Z" fill="#fbcfe8" stroke="#f472b6" stroke-width="6"/>
      <!-- Snout Nostrils -->
      <circle cx="300" cy="180" r="4" fill="#f43f5e"/>
      <circle cx="312" cy="185" r="4" fill="#f43f5e"/>
      <!-- Eyes on Top of Head -->
      <circle cx="195" cy="115" r="14" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
      <circle cx="195" cy="115" r="5" fill="#1e293b"/>
      <circle cx="230" cy="120" r="14" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
      <circle cx="230" cy="120" r="5" fill="#1e293b"/>
      <!-- Pink Cheek & Smile -->
      <circle cx="170" cy="180" r="18" fill="#f472b6" opacity="0.8"/>
      <path d="M210 185 Q235 205 255 185" fill="none" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-6',
    title: 'Pikachu Face',
    difficulty: 'easy',
    category: 'Anime',
    hint: 'Yellow electric mouse face with long black-tipped ears, bright red cheeks, and cute W-mouth!',
    palette: ['#facc15', '#ef4444', '#78350f', '#1e293b', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fefce8"/>
      <!-- Pointy Ears with Black Tips -->
      <polygon points="120,150 60,40 150,110" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
      <polygon points="60,40 75,65 95,55" fill="#1e293b"/>
      <polygon points="280,150 340,40 250,110" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
      <polygon points="340,40 325,65 305,55" fill="#1e293b"/>
      <!-- Round Yellow Head -->
      <ellipse cx="200" cy="215" rx="110" ry="95" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <!-- Big Sparkling Eyes -->
      <circle cx="155" cy="190" r="18" fill="#1e293b"/>
      <circle cx="150" cy="184" r="7" fill="#ffffff"/>
      <circle cx="245" cy="190" r="18" fill="#1e293b"/>
      <circle cx="240" cy="184" r="7" fill="#ffffff"/>
      <!-- Tiny Nose -->
      <polygon points="196,210 204,210 200,216" fill="#1e293b"/>
      <!-- Bright Red Cheeks -->
      <circle cx="130" cy="235" r="22" fill="#ef4444"/>
      <circle cx="270" cy="235" r="22" fill="#ef4444"/>
      <!-- Cute Cat-like Smile -->
      <path d="M185 224 Q193 234 200 226 Q207 234 215 224" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-7',
    title: 'Hello Kitty',
    difficulty: 'easy',
    category: 'Cartoon',
    hint: 'Pure white cat head, triangle ears, big red bow on right ear, oval eyes, and yellow nose!',
    palette: ['#ef4444', '#facc15', '#1e293b', '#ffffff', '#fbcfe8'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fdf2f8"/>
      <!-- Ears -->
      <polygon points="105,150 115,75 170,120" fill="#ffffff" stroke="#1e293b" stroke-width="8" stroke-linejoin="round"/>
      <polygon points="295,150 285,75 230,120" fill="#ffffff" stroke="#1e293b" stroke-width="8" stroke-linejoin="round"/>
      <!-- Head Base -->
      <ellipse cx="200" cy="210" rx="125" ry="95" fill="#ffffff" stroke="#1e293b" stroke-width="8"/>
      <!-- Red Bow on Right Ear -->
      <circle cx="270" cy="120" r="16" fill="#ef4444" stroke="#1e293b" stroke-width="6"/>
      <polygon points="270,120 320,95 315,145" fill="#ef4444" stroke="#1e293b" stroke-width="6" stroke-linejoin="round"/>
      <polygon points="270,120 220,95 225,145" fill="#ef4444" stroke="#1e293b" stroke-width="6" stroke-linejoin="round"/>
      <!-- Oval Black Eyes -->
      <ellipse cx="150" cy="205" rx="8" ry="12" fill="#1e293b"/>
      <ellipse cx="250" cy="205" rx="8" ry="12" fill="#1e293b"/>
      <!-- Yellow Oval Nose -->
      <ellipse cx="200" cy="225" rx="12" ry="8" fill="#facc15" stroke="#1e293b" stroke-width="4"/>
      <!-- 3 Whiskers on Each Side -->
      <line x1="100" y1="195" x2="60" y2="185" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="95" y1="215" x2="55" y2="215" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="100" y1="235" x2="60" y2="245" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="300" y1="195" x2="340" y2="185" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="305" y1="215" x2="345" y2="215" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <line x1="300" y1="235" x2="340" y2="245" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-8',
    title: 'Winnie the Pooh',
    difficulty: 'easy',
    category: 'Cartoon',
    hint: 'Chubby honey-loving yellow bear with round ears, red crop shirt, and cute dark nose!',
    palette: ['#f59e0b', '#dc2626', '#1e293b', '#fef3c7', '#78350f'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fffbeb"/>
      <!-- Red Shirt Body -->
      <path d="M120 280 C120 240 280 240 280 280 L290 380 L110 380 Z" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
      <!-- Round Ears -->
      <circle cx="135" cy="115" r="28" fill="#f59e0b" stroke="#d97706" stroke-width="5"/>
      <circle cx="265" cy="115" r="28" fill="#f59e0b" stroke="#d97706" stroke-width="5"/>
      <!-- Head -->
      <circle cx="200" cy="180" r="85" fill="#f59e0b" stroke="#d97706" stroke-width="6"/>
      <!-- Pooh Snout / Muzzle -->
      <ellipse cx="200" cy="205" rx="42" ry="32" fill="#fbbf24"/>
      <!-- Eyes & Eyebrows -->
      <path d="M160 145 Q170 140 180 145" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <path d="M220 145 Q230 140 240 145" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="170" cy="165" rx="6" ry="8" fill="#1e293b"/>
      <ellipse cx="230" cy="165" rx="6" ry="8" fill="#1e293b"/>
      <!-- Dark Nose -->
      <ellipse cx="200" cy="195" rx="14" ry="9" fill="#1e293b"/>
      <!-- Sweet Smile -->
      <path d="M185 215 Q200 228 215 215" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'easy-9',
    title: 'Tweety Bird',
    difficulty: 'easy',
    category: 'Cartoon',
    hint: 'Giant round yellow head with 3 hairs on top, huge blue eyes, and orange curved beak!',
    palette: ['#facc15', '#38bdf8', '#f97316', '#1e293b', '#fef08a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0f9ff"/>
      <!-- 3 Hairs on Head -->
      <line x1="200" y1="75" x2="200" y2="45" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/>
      <line x1="190" y1="80" x2="180" y2="50" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/>
      <line x1="210" y1="80" x2="220" y2="50" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/>
      <!-- Small Body & Big Orange Feet -->
      <ellipse cx="200" cy="310" rx="35" ry="45" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
      <ellipse cx="160" cy="365" rx="32" ry="14" fill="#f97316" stroke="#ea580c" stroke-width="4"/>
      <ellipse cx="240" cy="365" rx="32" ry="14" fill="#f97316" stroke="#ea580c" stroke-width="4"/>
      <!-- Giant Yellow Head -->
      <ellipse cx="200" cy="175" rx="105" ry="105" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <!-- Chubby Cheeks -->
      <ellipse cx="120" cy="220" rx="25" ry="20" fill="#facc15"/>
      <ellipse cx="280" cy="220" rx="25" ry="20" fill="#facc15"/>
      <!-- Big Blue Cartoon Eyes -->
      <ellipse cx="160" cy="165" rx="28" ry="40" fill="#ffffff" stroke="#ca8a04" stroke-width="3"/>
      <ellipse cx="160" cy="165" rx="16" ry="25" fill="#38bdf8"/>
      <ellipse cx="160" cy="165" rx="8" ry="14" fill="#1e293b"/>
      <circle cx="156" cy="155" r="4" fill="#ffffff"/>
      <ellipse cx="240" cy="165" rx="28" ry="40" fill="#ffffff" stroke="#ca8a04" stroke-width="3"/>
      <ellipse cx="240" cy="165" rx="16" ry="25" fill="#38bdf8"/>
      <ellipse cx="240" cy="165" rx="8" ry="14" fill="#1e293b"/>
      <circle cx="236" cy="155" r="4" fill="#ffffff"/>
      <!-- Eyelashes -->
      <line x1="140" y1="130" x2="125" y2="115" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <line x1="260" y1="130" x2="275" y2="115" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <!-- Cute Orange Beak -->
      <path d="M185 205 Q200 230 215 205 Z" fill="#f97316" stroke="#ea580c" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'easy-10',
    title: 'Cute Baby Panda',
    difficulty: 'easy',
    category: 'Animals',
    hint: 'Round white panda face with big black eye patches, black round ears, and bamboo leaf!',
    palette: ['#1e293b', '#ffffff', '#22c55e', '#fbcfe8', '#cbd5e1'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0fdf4"/>
      <!-- Black Round Ears -->
      <circle cx="115" cy="105" r="35" fill="#1e293b"/>
      <circle cx="285" cy="105" r="35" fill="#1e293b"/>
      <!-- White Head -->
      <circle cx="200" cy="195" r="105" fill="#ffffff" stroke="#1e293b" stroke-width="7"/>
      <!-- Black Oval Eye Patches (Angled) -->
      <ellipse cx="150" cy="180" rx="26" ry="34" fill="#1e293b" transform="rotate(-20 150 180)"/>
      <circle cx="155" cy="178" r="6" fill="#ffffff"/>
      <ellipse cx="250" cy="180" rx="26" ry="34" fill="#1e293b" transform="rotate(20 250 180)"/>
      <circle cx="245" cy="178" r="6" fill="#ffffff"/>
      <!-- Pink Cheeks -->
      <circle cx="130" cy="225" r="14" fill="#fbcfe8"/>
      <circle cx="270" cy="225" r="14" fill="#fbcfe8"/>
      <!-- Nose & Mouth -->
      <ellipse cx="200" cy="210" rx="14" ry="9" fill="#1e293b"/>
      <path d="M200 219 L200 230" stroke="#1e293b" stroke-width="4"/>
      <path d="M185 230 Q200 242 215 230" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <!-- Green Bamboo Leaf -->
      <path d="M195 245 Q260 270 280 240 Q240 240 195 245" fill="#22c55e" stroke="#15803d" stroke-width="3"/>
    </svg>`,
  },

  // ================= MEDIUM (10 ICONIC POPULAR CARTOONS) =================
  {
    id: 'medium-1',
    title: 'Oggy the Cat',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Famous blue cat with giant round red clown nose, green eyes, white gloves, and funny whiskers!',
    palette: ['#38bdf8', '#0284c7', '#ef4444', '#22c55e', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Oggy Body -->
      <ellipse cx="200" cy="300" rx="90" ry="80" fill="#38bdf8" stroke="#0284c7" stroke-width="6"/>
      <ellipse cx="200" cy="315" rx="60" ry="55" fill="#ffffff"/>
      <!-- Pointy Blue Ears -->
      <polygon points="120,130 110,50 170,100" fill="#38bdf8" stroke="#0284c7" stroke-width="6"/>
      <polygon points="280,130 290,50 230,100" fill="#38bdf8" stroke="#0284c7" stroke-width="6"/>
      <!-- Oggy Head -->
      <ellipse cx="200" cy="165" rx="95" ry="75" fill="#38bdf8" stroke="#0284c7" stroke-width="6"/>
      <!-- Green Cartoon Eyes on top of head -->
      <ellipse cx="170" cy="115" rx="20" ry="28" fill="#22c55e" stroke="#0284c7" stroke-width="4"/>
      <circle cx="172" cy="115" r="7" fill="#1e293b"/>
      <circle cx="168" cy="110" r="3" fill="#ffffff"/>
      <ellipse cx="230" cy="115" rx="20" ry="28" fill="#22c55e" stroke="#0284c7" stroke-width="4"/>
      <circle cx="228" cy="115" r="7" fill="#1e293b"/>
      <circle cx="224" cy="110" r="3" fill="#ffffff"/>
      <!-- Giant Round Red Clown Nose -->
      <circle cx="200" cy="165" r="28" fill="#ef4444" stroke="#b91c1c" stroke-width="5"/>
      <circle cx="192" cy="156" r="6" fill="#ffffff"/>
      <!-- White Cheeks & Goofy Smile -->
      <path d="M140 185 Q200 230 260 185" fill="none" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="140" y1="170" x2="80" y2="160" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
      <line x1="140" y1="185" x2="75" y2="190" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
      <line x1="260" y1="170" x2="320" y2="160" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
      <line x1="260" y1="185" x2="325" y2="190" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'medium-2',
    title: 'Chhota Bheem',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Hero of Dholakpur with orange dhoti, red tilak, golden bracelets, and holding his favorite yellow laddoo!',
    palette: ['#f97316', '#ea580c', '#facc15', '#dc2626', '#78350f'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fff7ed"/>
      <!-- Orange Dhoti Body -->
      <path d="M140 250 L260 250 L270 360 L130 360 Z" fill="#ea580c" stroke="#c2410c" stroke-width="6"/>
      <line x1="200" y1="250" x2="200" y2="360" stroke="#c2410c" stroke-width="4"/>
      <!-- Muscular Chest -->
      <ellipse cx="200" cy="210" rx="65" ry="50" fill="#fed7aa" stroke="#ea580c" stroke-width="5"/>
      <!-- Golden Laddoo in Hand -->
      <circle cx="290" cy="240" r="22" fill="#facc15" stroke="#d97706" stroke-width="4"/>
      <circle cx="285" cy="235" r="3" fill="#ffffff"/>
      <!-- Round Head & Hair -->
      <circle cx="200" cy="120" r="55" fill="#fed7aa" stroke="#ea580c" stroke-width="5"/>
      <!-- Bheem Hair Tuft / Choti -->
      <path d="M145 110 C140 60 260 60 255 110 C240 70 160 70 145 110 Z" fill="#1e293b"/>
      <circle cx="200" cy="55" r="14" fill="#1e293b"/>
      <!-- Red Tilak on Forehead -->
      <line x1="200" y1="85" x2="200" y2="105" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>
      <circle cx="200" cy="110" r="3" fill="#facc15"/>
      <!-- Bold Eyes & Eyebrows -->
      <circle cx="180" cy="120" r="6" fill="#1e293b"/>
      <circle cx="220" cy="120" r="6" fill="#1e293b"/>
      <path d="M170 110 Q180 105 190 110" stroke="#1e293b" stroke-width="3" fill="none"/>
      <path d="M210 110 Q220 105 230 110" stroke="#1e293b" stroke-width="3" fill="none"/>
      <!-- Brave Smile -->
      <path d="M188 140 Q200 152 212 140" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <!-- Gold Wristbands -->
      <rect x="120" y="225" width="16" height="12" rx="3" fill="#facc15" stroke="#d97706" stroke-width="2"/>
      <rect x="264" y="225" width="16" height="12" rx="3" fill="#facc15" stroke="#d97706" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'medium-3',
    title: 'Doraemon',
    difficulty: 'medium',
    category: 'Anime',
    hint: 'Blue robotic cat with round white belly, red collar with golden bell, and 4D pocket!',
    palette: ['#0284c7', '#ef4444', '#facc15', '#ffffff', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0f9ff"/>
      <!-- Blue Body -->
      <ellipse cx="200" cy="270" rx="80" ry="85" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>
      <!-- White Belly & Pocket -->
      <circle cx="200" cy="285" r="55" fill="#ffffff" stroke="#0369a1" stroke-width="4"/>
      <path d="M165 285 Q200 330 235 285 Z" fill="#ffffff" stroke="#0369a1" stroke-width="4"/>
      <!-- Red Collar & Golden Bell -->
      <rect x="135" y="200" width="130" height="16" rx="8" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
      <circle cx="200" cy="225" r="16" fill="#facc15" stroke="#b45309" stroke-width="3"/>
      <line x1="184" y1="222" x2="216" y2="222" stroke="#b45309" stroke-width="2"/>
      <circle cx="200" cy="228" r="3" fill="#1e293b"/>
      <!-- Round Blue Head -->
      <circle cx="200" cy="130" r="85" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>
      <!-- White Face Mask -->
      <ellipse cx="200" cy="145" rx="68" ry="60" fill="#ffffff" stroke="#0369a1" stroke-width="4"/>
      <!-- Eyes Connected on Top -->
      <ellipse cx="182" cy="95" rx="16" ry="22" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <circle cx="186" cy="98" r="5" fill="#1e293b"/>
      <ellipse cx="218" cy="95" rx="16" ry="22" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <circle cx="214" cy="98" r="5" fill="#1e293b"/>
      <!-- Red Round Nose -->
      <circle cx="200" cy="122" r="12" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <circle cx="196" cy="118" r="3" fill="#ffffff"/>
      <!-- Nose line & Big Smile -->
      <line x1="200" y1="134" x2="200" y2="175" stroke="#1e293b" stroke-width="4"/>
      <path d="M150 160 Q200 205 250 160" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <!-- Whiskers (3 on each side) -->
      <line x1="145" y1="140" x2="110" y2="135" stroke="#1e293b" stroke-width="3"/>
      <line x1="140" y1="155" x2="105" y2="155" stroke="#1e293b" stroke-width="3"/>
      <line x1="145" y1="170" x2="110" y2="175" stroke="#1e293b" stroke-width="3"/>
      <line x1="255" y1="140" x2="290" y2="135" stroke="#1e293b" stroke-width="3"/>
      <line x1="260" y1="155" x2="295" y2="155" stroke="#1e293b" stroke-width="3"/>
      <line x1="255" y1="170" x2="290" y2="175" stroke="#1e293b" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'medium-4',
    title: 'Shin-chan',
    difficulty: 'medium',
    category: 'Anime',
    hint: 'Famous red t-shirt, yellow shorts, giant dark wavy eyebrows, and mischievous side-eye smile!',
    palette: ['#ef4444', '#facc15', '#fed7aa', '#1e293b', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Red Shirt & Yellow Shorts -->
      <rect x="135" y="240" width="130" height="70" rx="10" fill="#ef4444" stroke="#b91c1c" stroke-width="5"/>
      <rect x="145" y="300" width="110" height="40" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
      <!-- Chubby Head Silhouette -->
      <path d="M120 180 C110 110 170 80 230 80 C290 80 300 130 280 180 C300 200 280 240 230 240 C170 240 120 220 120 180 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="5"/>
      <!-- Shinchan Short Black Hair -->
      <path d="M130 140 C140 85 240 85 270 120 C250 95 160 100 130 140 Z" fill="#1e293b"/>
      <!-- Giant Iconic Thick Eyebrows -->
      <path d="M140 115 Q175 95 195 115" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round"/>
      <path d="M220 115 Q245 95 270 115" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round"/>
      <!-- Big Eyes -->
      <ellipse cx="170" cy="140" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="166" cy="135" r="5" fill="#ffffff"/>
      <ellipse cx="245" cy="140" rx="14" ry="18" fill="#1e293b"/>
      <circle cx="241" cy="135" r="5" fill="#ffffff"/>
      <!-- Rosy Cheeks -->
      <circle cx="135" cy="190" r="16" fill="#f43f5e" opacity="0.6"/>
      <circle cx="275" cy="190" r="16" fill="#f43f5e" opacity="0.6"/>
      <!-- Goofy Cheeky Smile -->
      <path d="M185 180 Q215 210 240 175" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'medium-5',
    title: 'SpongeBob SquarePants',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Yellow porous sea sponge with buck teeth, blue eyes, white collar with red tie, and brown square pants!',
    palette: ['#facc15', '#78350f', '#38bdf8', '#ef4444', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f0fdf4"/>
      <!-- Sponge Body -->
      <rect x="110" y="80" width="180" height="170" rx="15" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <!-- Sponge Pores / Holes -->
      <circle cx="130" cy="110" r="8" fill="#ca8a04" opacity="0.4"/>
      <circle cx="270" cy="100" r="10" fill="#ca8a04" opacity="0.4"/>
      <circle cx="130" cy="220" r="12" fill="#ca8a04" opacity="0.4"/>
      <circle cx="265" cy="215" r="8" fill="#ca8a04" opacity="0.4"/>
      <!-- White Shirt & Red Tie -->
      <rect x="110" y="250" width="180" height="35" fill="#ffffff" stroke="#1e293b" stroke-width="5"/>
      <polygon points="190,250 210,250 200,285" fill="#ef4444"/>
      <!-- Brown Square Pants -->
      <rect x="110" y="285" width="180" height="45" fill="#78350f" stroke="#451a03" stroke-width="5"/>
      <!-- Big Blue Eyes -->
      <circle cx="170" cy="140" r="28" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <circle cx="170" cy="140" r="14" fill="#38bdf8"/>
      <circle cx="170" cy="140" r="7" fill="#1e293b"/>
      <circle cx="230" cy="140" r="28" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <circle cx="230" cy="140" r="14" fill="#38bdf8"/>
      <circle cx="230" cy="140" r="7" fill="#1e293b"/>
      <!-- Long Nose -->
      <path d="M195 155 C190 135 210 135 205 155 Z" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <!-- Giant Buck-Tooth Smile -->
      <path d="M140 180 Q200 230 260 180" fill="none" stroke="#1e293b" stroke-width="5"/>
      <rect x="185" y="195" width="12" height="15" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
      <rect x="203" y="195" width="12" height="15" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'medium-6',
    title: 'Mickey Mouse',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Classic round black mouse ears, white face mask, black nose, and red shorts with two white buttons!',
    palette: ['#1e293b', '#ef4444', '#fed7aa', '#facc15', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Iconic Round Black Ears -->
      <circle cx="110" cy="100" r="55" fill="#1e293b"/>
      <circle cx="290" cy="100" r="55" fill="#1e293b"/>
      <!-- Head Base -->
      <circle cx="200" cy="180" r="85" fill="#1e293b"/>
      <!-- Cream Face Mask -->
      <path d="M150 160 C130 220 270 220 250 160 C260 130 220 130 200 150 C180 130 140 130 150 160 Z" fill="#fed7aa"/>
      <ellipse cx="200" cy="210" rx="55" ry="35" fill="#fed7aa"/>
      <!-- Eyes -->
      <ellipse cx="180" cy="165" rx="8" ry="18" fill="#1e293b"/>
      <circle cx="178" cy="160" r="3" fill="#ffffff"/>
      <ellipse cx="220" cy="165" rx="8" ry="18" fill="#1e293b"/>
      <circle cx="218" cy="160" r="3" fill="#ffffff"/>
      <!-- Black Nose -->
      <ellipse cx="200" cy="195" rx="16" ry="10" fill="#1e293b"/>
      <!-- Wide Smile -->
      <path d="M165 210 Q200 245 235 210" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
      <!-- Red Shorts Body with 2 White Buttons -->
      <path d="M140 280 C140 250 260 250 260 280 L275 360 L125 360 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="5"/>
      <ellipse cx="175" cy="315" rx="8" ry="14" fill="#ffffff"/>
      <ellipse cx="225" cy="315" rx="8" ry="14" fill="#ffffff"/>
    </svg>`,
  },
  {
    id: 'medium-7',
    title: 'Motu with Samosa',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Chubby Motu in red vest, bald head with side hair, moustache, holding a hot crispy golden samosa!',
    palette: ['#ef4444', '#f59e0b', '#fed7aa', '#1e293b', '#78350f'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fffbeb"/>
      <!-- Red Vest & Round Tummy -->
      <ellipse cx="200" cy="285" rx="85" ry="75" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/>
      <path d="M175 220 L175 350 L225 350 L225 220 Z" fill="#fed7aa"/>
      <!-- Crispy Golden Samosa in Hand -->
      <polygon points="280,240 330,240 305,200" fill="#f59e0b" stroke="#b45309" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="275" cy="245" r="14" fill="#fed7aa" stroke="#ea580c" stroke-width="3"/>
      <!-- Round Head & Mustache -->
      <circle cx="200" cy="140" r="65" fill="#fed7aa" stroke="#ea580c" stroke-width="6"/>
      <!-- Bald Head with Tiny Tuft -->
      <path d="M195 75 Q205 55 200 50" stroke="#1e293b" stroke-width="5" fill="none"/>
      <!-- Big Eyes -->
      <circle cx="175" cy="125" r="12" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
      <circle cx="178" cy="125" r="5" fill="#1e293b"/>
      <circle cx="225" cy="125" r="12" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
      <circle cx="222" cy="125" r="5" fill="#1e293b"/>
      <!-- Round Nose -->
      <circle cx="200" cy="140" r="10" fill="#ea580c"/>
      <!-- Iconic Curled Black Mustache -->
      <path d="M150 160 Q180 150 200 160 Q220 150 250 160 C240 175 220 170 200 165 C180 170 160 175 150 160 Z" fill="#1e293b"/>
      <!-- Happy Open Mouth for Samosa -->
      <path d="M185 175 Q200 200 215 175 Z" fill="#dc2626"/>
    </svg>`,
  },
  {
    id: 'medium-8',
    title: 'Yellow Minion',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Capsule-shaped yellow body, silver goggles with round eye, blue denim overalls, and big happy grin!',
    palette: ['#facc15', '#2563eb', '#64748b', '#1e293b', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#eff6ff"/>
      <!-- Yellow Capsule Body -->
      <path d="M120 160 C120 80 280 80 280 160 L280 280 C280 340 120 340 120 280 Z" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>
      <!-- Hair Strands -->
      <line x1="200" y1="80" x2="200" y2="55" stroke="#1e293b" stroke-width="4"/>
      <line x1="185" y1="85" x2="175" y2="60" stroke="#1e293b" stroke-width="4"/>
      <line x1="215" y1="85" x2="225" y2="60" stroke="#1e293b" stroke-width="4"/>
      <!-- Goggle Black Strap -->
      <rect x="120" y="140" width="160" height="16" fill="#1e293b"/>
      <!-- Big Silver Goggle Lens -->
      <circle cx="200" cy="148" r="40" fill="#94a3b8" stroke="#475569" stroke-width="6"/>
      <circle cx="200" cy="148" r="30" fill="#ffffff"/>
      <circle cx="200" cy="148" r="14" fill="#78350f"/>
      <circle cx="200" cy="148" r="7" fill="#1e293b"/>
      <circle cx="195" cy="142" r="3" fill="#ffffff"/>
      <!-- Big Minion Grin -->
      <path d="M165 205 Q200 235 235 205" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
      <!-- Blue Overalls -->
      <path d="M120 270 L280 270 L280 340 L120 340 Z" fill="#2563eb" stroke="#1d4ed8" stroke-width="5"/>
      <rect x="155" y="240" width="90" height="40" fill="#2563eb" stroke="#1d4ed8" stroke-width="4"/>
      <!-- Gru Logo on Pocket -->
      <circle cx="200" cy="275" r="12" fill="#1e293b"/>
      <polygon points="196,270 204,275 196,280" fill="#facc15"/>
    </svg>`,
  },
  {
    id: 'medium-9',
    title: 'Jerry the Mouse',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Brown clever little mouse with giant pink-lined round ears, holding a tasty yellow Swiss cheese triangle!',
    palette: ['#92400e', '#fbcfe8', '#facc15', '#1e293b', '#fef3c7'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fffbeb"/>
      <!-- Big Round Ears with Pink Inside -->
      <circle cx="120" cy="110" r="48" fill="#92400e" stroke="#78350f" stroke-width="5"/>
      <circle cx="120" cy="110" r="30" fill="#fbcfe8"/>
      <circle cx="280" cy="110" r="48" fill="#92400e" stroke="#78350f" stroke-width="5"/>
      <circle cx="280" cy="110" r="30" fill="#fbcfe8"/>
      <!-- Head & Cheeks -->
      <circle cx="200" cy="180" r="65" fill="#92400e" stroke="#78350f" stroke-width="5"/>
      <ellipse cx="200" cy="205" rx="45" ry="30" fill="#fed7aa"/>
      <!-- Big Eyes -->
      <ellipse cx="180" cy="155" rx="10" ry="18" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <circle cx="182" cy="158" r="6" fill="#1e293b"/>
      <ellipse cx="220" cy="155" rx="10" ry="18" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <circle cx="218" cy="158" r="6" fill="#1e293b"/>
      <!-- Tiny Black Nose -->
      <ellipse cx="200" cy="190" rx="8" ry="5" fill="#1e293b"/>
      <!-- Clever Smile -->
      <path d="M185 205 Q200 220 215 205" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="150" y1="200" x2="110" y2="195" stroke="#1e293b" stroke-width="3"/>
      <line x1="250" y1="200" x2="290" y2="195" stroke="#1e293b" stroke-width="3"/>
      <!-- Swiss Cheese Slice in Hands -->
      <polygon points="150,320 250,320 200,260" fill="#facc15" stroke="#d97706" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="185" cy="300" r="8" fill="#d97706" opacity="0.5"/>
      <circle cx="215" cy="295" r="6" fill="#d97706" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'medium-10',
    title: 'Tom the Cat',
    difficulty: 'medium',
    category: 'Cartoon',
    hint: 'Gray & white cartoon cat with sharp pointy ears, big yellow eyes, red mouth, and long whiskers!',
    palette: ['#64748b', '#facc15', '#ef4444', '#ffffff', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#f1f5f9"/>
      <!-- Pointy Gray Ears -->
      <polygon points="120,130 90,40 170,90" fill="#64748b" stroke="#334155" stroke-width="6"/>
      <polygon points="120,115 105,60 155,90" fill="#fbcfe8"/>
      <polygon points="280,130 310,40 230,90" fill="#64748b" stroke="#334155" stroke-width="6"/>
      <polygon points="280,115 295,60 245,90" fill="#fbcfe8"/>
      <!-- Gray Cat Head -->
      <ellipse cx="200" cy="180" rx="85" ry="75" fill="#64748b" stroke="#334155" stroke-width="6"/>
      <!-- White Muzzle -->
      <ellipse cx="200" cy="210" rx="60" ry="38" fill="#ffffff" stroke="#334155" stroke-width="4"/>
      <!-- Big Yellow Eyes -->
      <ellipse cx="170" cy="140" rx="18" ry="26" fill="#facc15" stroke="#334155" stroke-width="4"/>
      <ellipse cx="172" cy="140" rx="6" ry="18" fill="#1e293b"/>
      <ellipse cx="230" cy="140" rx="18" ry="26" fill="#facc15" stroke="#334155" stroke-width="4"/>
      <ellipse cx="228" cy="140" rx="6" ry="18" fill="#1e293b"/>
      <!-- Pink Nose -->
      <polygon points="190,185 210,185 200,200" fill="#f43f5e"/>
      <!-- Shocked / Scheming Cat Smile -->
      <path d="M165 215 Q200 245 235 215" fill="#ef4444" stroke="#334155" stroke-width="4"/>
      <!-- Whiskers -->
      <line x1="135" y1="205" x2="70" y2="195" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <line x1="135" y1="220" x2="65" y2="225" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <line x1="265" y1="205" x2="330" y2="195" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <line x1="265" y1="220" x2="335" y2="225" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },

  // ================= HARD (10 EPIC CARTOON SCENES & HEROES) =================
  {
    id: 'hard-1',
    title: 'Bheem at Dholakpur Palace',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Bheem holding a giant mountain of golden laddoos in front of the royal golden Dholakpur fort!',
    palette: ['#f59e0b', '#ea580c', '#facc15', '#dc2626', '#0284c7'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0284c7"/>
      <!-- Dholakpur Palace Walls & Domes -->
      <rect x="40" y="160" width="320" height="200" fill="#f59e0b" stroke="#b45309" stroke-width="5"/>
      <path d="M70 160 C70 90 130 90 130 160 Z" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <path d="M270 160 C270 90 330 90 330 160 Z" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <path d="M160 160 C160 70 240 70 240 160 Z" fill="#fbbf24" stroke="#d97706" stroke-width="5"/>
      <!-- Palace Flags -->
      <polygon points="200,60 230,70 200,80" fill="#ea580c"/>
      <!-- Giant Plate of Laddoos -->
      <ellipse cx="200" cy="240" rx="90" ry="25" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
      <circle cx="160" cy="230" r="16" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <circle cx="200" cy="225" r="18" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <circle cx="240" cy="230" r="16" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <circle cx="180" cy="200" r="16" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <circle cx="220" cy="200" r="16" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <circle cx="200" cy="175" r="18" fill="#facc15" stroke="#d97706" stroke-width="3"/>
      <!-- Chhota Bheem Silhouette with Dhoti & Tilak -->
      <circle cx="200" cy="310" r="30" fill="#fed7aa" stroke="#ea580c" stroke-width="4"/>
      <polygon points="175,340 225,340 235,400 165,400" fill="#ea580c"/>
      <line x1="200" y1="290" x2="200" y2="305" stroke="#dc2626" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 'hard-2',
    title: 'Oggy vs Cockroaches Chase',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Oggy swinging his giant pink flyswatter chasing the mischievous cockroach Joey in the kitchen!',
    palette: ['#38bdf8', '#ec4899', '#f43f5e', '#78350f', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fef2f2"/>
      <!-- Kitchen Tiled Floor -->
      <line x1="0" y1="320" x2="400" y2="320" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="80" y1="320" x2="60" y2="400" stroke="#cbd5e1" stroke-width="4"/>
      <line x1="200" y1="320" x2="190" y2="400" stroke="#cbd5e1" stroke-width="4"/>
      <line x1="320" y1="320" x2="330" y2="400" stroke="#cbd5e1" stroke-width="4"/>
      <!-- Giant Pink Flyswatter in Air -->
      <line x1="120" y1="180" x2="70" y2="90" stroke="#78350f" stroke-width="10" stroke-linecap="round"/>
      <rect x="30" y="40" width="70" height="70" rx="8" fill="#ec4899" stroke="#be185d" stroke-width="5" transform="rotate(-15 65 75)"/>
      <!-- Oggy Running Pose -->
      <ellipse cx="160" cy="240" rx="65" ry="50" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
      <circle cx="160" cy="180" r="40" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
      <circle cx="145" cy="180" r="16" fill="#ef4444"/>
      <!-- Cockroach Joey Running for his life! -->
      <ellipse cx="320" cy="290" rx="26" ry="16" fill="#78350f" stroke="#451a03" stroke-width="3"/>
      <circle cx="340" cy="285" r="12" fill="#dc2626"/>
      <!-- Cockroach Antennae -->
      <path d="M345 275 Q360 250 350 230" fill="none" stroke="#451a03" stroke-width="3"/>
      <path d="M345 280 Q370 260 375 240" fill="none" stroke="#451a03" stroke-width="3"/>
      <!-- Motion Speed Lines -->
      <line x1="260" y1="300" x2="290" y2="300" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <line x1="250" y1="310" x2="280" y2="310" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'hard-3',
    title: 'Doraemon & Nobita Sky Flight',
    difficulty: 'hard',
    category: 'Anime',
    hint: 'Doraemon and Nobita flying with bamboo copters above fluffy white clouds and golden sunset sun!',
    palette: ['#38bdf8', '#facc15', '#f43f5e', '#0284c7', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0284c7"/>
      <!-- Sunset Golden Sun -->
      <circle cx="200" cy="180" r="110" fill="#fde047" opacity="0.7"/>
      <!-- Fluffy White Clouds -->
      <circle cx="70" cy="330" r="50" fill="#ffffff"/>
      <circle cx="140" cy="340" r="60" fill="#ffffff"/>
      <circle cx="240" cy="330" r="70" fill="#ffffff"/>
      <circle cx="340" cy="340" r="55" fill="#ffffff"/>
      <!-- Doraemon Flying with Take-Copter -->
      <!-- Bamboo Copter Propeller -->
      <line x1="140" y1="120" x2="140" y2="90" stroke="#facc15" stroke-width="4"/>
      <ellipse cx="140" cy="90" rx="35" ry="6" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <!-- Doraemon Figure -->
      <circle cx="140" cy="160" r="40" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
      <circle cx="140" cy="168" r="28" fill="#ffffff"/>
      <circle cx="140" cy="155" r="7" fill="#ef4444"/>
      <!-- Nobita Flying Alongside -->
      <!-- Nobita Copter -->
      <line x1="270" y1="140" x2="270" y2="110" stroke="#facc15" stroke-width="4"/>
      <ellipse cx="270" cy="110" rx="35" ry="6" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <!-- Nobita Head & Glasses -->
      <circle cx="270" cy="170" r="32" fill="#fed7aa" stroke="#ea580c" stroke-width="3"/>
      <path d="M245 155 C255 135 285 135 295 155 Z" fill="#1e293b"/>
      <circle cx="260" cy="170" r="10" fill="none" stroke="#1e293b" stroke-width="3"/>
      <circle cx="280" cy="170" r="10" fill="none" stroke="#1e293b" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'hard-4',
    title: 'Baby Krishna Makhan Chor',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Cute blue baby Krishna with peacock feather in hair, sitting with a broken earthen butter pot!',
    palette: ['#38bdf8', '#0284c7', '#facc15', '#78350f', '#10b981'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#ecfdf5"/>
      <!-- Peacock Feather on Crown -->
      <path d="M190 70 Q160 30 180 15 Q205 30 195 70" fill="#10b981" stroke="#047857" stroke-width="3"/>
      <circle cx="182" cy="30" r="8" fill="#38bdf8"/>
      <circle cx="182" cy="30" r="4" fill="#1e1b4b"/>
      <!-- Cute Blue Baby Krishna Head -->
      <circle cx="190" cy="140" r="60" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
      <!-- Curly Dark Hair & Golden Crown Band -->
      <path d="M135 125 C140 75 240 75 245 125 Z" fill="#1e293b"/>
      <rect x="145" y="110" width="90" height="12" rx="4" fill="#facc15" stroke="#d97706" stroke-width="2"/>
      <!-- Big Sparkling Lotus Eyes -->
      <ellipse cx="170" cy="135" rx="12" ry="8" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <circle cx="172" cy="135" r="5" fill="#1e293b"/>
      <ellipse cx="210" cy="135" rx="12" ry="8" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <circle cx="208" cy="135" r="5" fill="#1e293b"/>
      <!-- Tilak & Smile with Butter Smear -->
      <line x1="190" y1="105" x2="190" y2="125" stroke="#ef4444" stroke-width="4"/>
      <path d="M180 155 Q190 165 200 155" fill="none" stroke="#1e293b" stroke-width="4"/>
      <ellipse cx="202" cy="158" rx="5" ry="3" fill="#ffffff"/>
      <!-- Earthen Clay Pot (Matka) Leaking White Butter -->
      <path d="M220 250 C180 250 170 340 240 350 C310 350 310 250 270 250 Z" fill="#b45309" stroke="#78350f" stroke-width="5"/>
      <!-- Melting White Butter (Makhan) -->
      <ellipse cx="245" cy="250" rx="35" ry="12" fill="#ffffff"/>
      <path d="M225 255 Q235 300 245 285 Q255 310 265 255" fill="#ffffff"/>
      <!-- Baby Krishna Crawling Body -->
      <ellipse cx="150" cy="260" rx="50" ry="40" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
      <!-- Golden Flute (Bansuri) -->
      <line x1="90" y1="280" x2="160" y2="210" stroke="#facc15" stroke-width="8" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'hard-5',
    title: 'Goku Super Saiyan Kamehameha',
    difficulty: 'hard',
    category: 'Anime',
    hint: 'Goku with spiky golden Super Saiyan hair, charging a glowing blue energy sphere with electric spark auras!',
    palette: ['#facc15', '#38bdf8', '#ea580c', '#2563eb', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0b1329"/>
      <!-- Super Saiyan Glowing Aura -->
      <circle cx="200" cy="200" r="160" fill="#fde047" opacity="0.25"/>
      <!-- Giant Spiky Golden Hair -->
      <polygon points="120,150 70,80 150,90" fill="#facc15" stroke="#eab308" stroke-width="4"/>
      <polygon points="140,90 130,20 180,60" fill="#facc15" stroke="#eab308" stroke-width="4"/>
      <polygon points="180,60 200,10 220,60" fill="#facc15" stroke="#eab308" stroke-width="4"/>
      <polygon points="220,60 270,20 260,90" fill="#facc15" stroke="#eab308" stroke-width="4"/>
      <polygon points="260,90 330,80 280,150" fill="#facc15" stroke="#eab308" stroke-width="4"/>
      <!-- Goku Face & Fierce Eyes -->
      <polygon points="150,140 250,140 200,210" fill="#fed7aa" stroke="#ea580c" stroke-width="4"/>
      <!-- Intense Turquoise Saiyan Eyes -->
      <polygon points="165,155 185,150 180,165" fill="#38bdf8" stroke="#1e293b" stroke-width="2"/>
      <polygon points="235,155 215,150 220,165" fill="#38bdf8" stroke="#1e293b" stroke-width="2"/>
      <!-- Orange Martial Arts Gi -->
      <polygon points="140,210 260,210 280,320 120,320" fill="#ea580c" stroke="#c2410c" stroke-width="6"/>
      <polygon points="180,210 220,210 200,280" fill="#2563eb"/>
      <!-- Glowing Blue Kamehameha Sphere in Hands -->
      <circle cx="200" cy="300" r="45" fill="#38bdf8" stroke="#bae6fd" stroke-width="6"/>
      <circle cx="200" cy="300" r="30" fill="#ffffff"/>
      <!-- Lightning Sparks -->
      <polyline points="150,280 170,290 160,310 180,320" fill="none" stroke="#67e8f9" stroke-width="4"/>
      <polyline points="250,280 230,290 240,310 220,320" fill="none" stroke="#67e8f9" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 'hard-6',
    title: 'Pikachu Thunderbolt & Ash',
    difficulty: 'hard',
    category: 'Anime',
    hint: 'Electric Pikachu leaping with blazing lightning bolts, accompanied by Ash Ketchum’s iconic red cap!',
    palette: ['#facc15', '#ef4444', '#38bdf8', '#1e293b', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#1e1b4b"/>
      <!-- Giant Thunderbolt Lightning FX -->
      <polygon points="200,20 220,120 180,130 250,250 160,220 240,380 140,260 180,240 120,140 170,130" fill="#facc15" stroke="#fef08a" stroke-width="4"/>
      <!-- Ash Ketchum Red Cap on Left -->
      <path d="M70 120 C70 80 140 80 140 120 Z" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
      <ellipse cx="140" cy="120" rx="35" ry="8" fill="#ffffff" stroke="#991b1b" stroke-width="3"/>
      <circle cx="105" cy="100" r="8" fill="#ffffff"/>
      <!-- Leaping Pikachu Body -->
      <ellipse cx="240" cy="220" rx="65" ry="50" fill="#facc15" stroke="#ca8a04" stroke-width="5" transform="rotate(-15 240 220)"/>
      <circle cx="270" cy="180" r="42" fill="#facc15" stroke="#ca8a04" stroke-width="5"/>
      <!-- Pikachu Ears -->
      <polygon points="280,150 340,90 300,160" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <polygon points="340,90 325,115 315,105" fill="#1e293b"/>
      <!-- Cheeks & Thunderbolt Tail -->
      <circle cx="295" cy="195" r="12" fill="#ef4444"/>
      <path d="M180 250 L150 230 L160 210 L130 190" fill="none" stroke="#facc15" stroke-width="14" stroke-linejoin="miter"/>
    </svg>`,
  },
  {
    id: 'hard-7',
    title: 'Spider-Man Web Sling',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Classic red & blue webbed superhero shooting a sticky web across high city skyscrapers!',
    palette: ['#ef4444', '#1d4ed8', '#1e293b', '#ffffff', '#0f172a'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Skyscraper Silhouettes with Lit Windows -->
      <rect x="30" y="180" width="70" height="220" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <rect x="300" y="140" width="80" height="260" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <line x1="45" y1="200" x2="85" y2="200" stroke="#facc15" stroke-dasharray="4,4" stroke-width="2"/>
      <line x1="315" y1="170" x2="365" y2="170" stroke="#facc15" stroke-dasharray="4,4" stroke-width="2"/>
      <!-- Web Line Across Sky -->
      <line x1="310" y1="140" x2="200" y2="210" stroke="#ffffff" stroke-width="5"/>
      <!-- Spider-Man Mid-Air Action Pose -->
      <ellipse cx="200" cy="220" rx="45" ry="32" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="4"/>
      <!-- Red Chest & Web Grid -->
      <polygon points="180,195 220,195 210,245 190,245" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
      <!-- Red Masked Head -->
      <ellipse cx="200" cy="160" rx="36" ry="44" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
      <!-- Web Mask Lines -->
      <line x1="200" y1="116" x2="200" y2="204" stroke="#1e293b" stroke-width="2"/>
      <line x1="164" y1="160" x2="236" y2="160" stroke="#1e293b" stroke-width="2"/>
      <!-- White Triangular Spider Eyes with Black Rim -->
      <polygon points="175,150 195,160 178,170" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <polygon points="225,150 205,160 222,170" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 'hard-8',
    title: 'Motu & Patlu Chai Stall',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Motu eating samosas while skinny Patlu gives brilliant ideas with a steaming hot kettle of cutting chai!',
    palette: ['#ef4444', '#f59e0b', '#facc15', '#22c55e', '#78350f'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#fffbeb"/>
      <!-- Tea Stall Wooden Canopy -->
      <polygon points="40,80 360,80 380,120 20,120" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
      <rect x="50" y="240" width="300" height="120" rx="8" fill="#78350f" stroke="#451a03" stroke-width="5"/>
      <!-- Steaming Chai Kettle -->
      <ellipse cx="200" cy="225" rx="35" ry="25" fill="#94a3b8" stroke="#475569" stroke-width="4"/>
      <path d="M190 200 Q200 170 195 150" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
      <!-- Motu on Left with Samosa -->
      <circle cx="120" cy="180" r="40" fill="#fed7aa" stroke="#ea580c" stroke-width="4"/>
      <polygon points="145,210 175,210 160,185" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <!-- Patlu on Right (Skinny Yellow Kurta + Glasses) -->
      <ellipse cx="280" cy="170" rx="28" ry="40" fill="#fed7aa" stroke="#ea580c" stroke-width="3"/>
      <rect x="255" y="210" width="50" height="80" rx="8" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <!-- Patlu Glasses -->
      <circle cx="270" cy="165" r="9" fill="none" stroke="#1e293b" stroke-width="3"/>
      <circle cx="290" cy="165" r="9" fill="none" stroke="#1e293b" stroke-width="3"/>
      <line x1="279" y1="165" x2="281" y2="165" stroke="#1e293b" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'hard-9',
    title: 'Simba on Pride Rock',
    difficulty: 'hard',
    category: 'Cartoon',
    hint: 'Baby lion cub Simba held high on Pride Rock with morning African savannah sunrise and acacia trees!',
    palette: ['#f59e0b', '#d97706', '#ef4444', '#facc15', '#1e293b'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#ea580c"/>
      <!-- Giant Morning Sun -->
      <circle cx="200" cy="240" r="130" fill="#fef08a"/>
      <!-- Pride Rock Silhouette Peak -->
      <polygon points="0,380 240,240 180,400 0,400" fill="#451a03"/>
      <!-- Baby Simba Cub Silhouette on Top -->
      <circle cx="230" cy="220" r="18" fill="#451a03"/>
      <ellipse cx="215" cy="235" rx="18" ry="12" fill="#451a03"/>
      <path d="M200 240 Q185 230 180 245" fill="none" stroke="#451a03" stroke-width="4"/>
      <!-- Distant Acacia Tree -->
      <polygon points="340,320 345,380 335,380" fill="#451a03"/>
      <ellipse cx="340" cy="315" rx="35" ry="12" fill="#451a03"/>
      <!-- Birds in Sky -->
      <path d="M120 100 Q130 90 140 100 Q150 90 160 100" fill="none" stroke="#78350f" stroke-width="3"/>
      <path d="M260 80 Q270 70 280 80 Q290 70 300 80" fill="none" stroke="#78350f" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'hard-10',
    title: 'Shinchan as Action Kamen',
    difficulty: 'hard',
    category: 'Anime',
    hint: 'Shinchan dressed in his favorite superhero Action Kamen green suit, helmet, and shooting Kamen laser beam!',
    palette: ['#10b981', '#f43f5e', '#fed7aa', '#facc15', '#ffffff'],
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#0f172a"/>
      <!-- Action Kamen Beam Rays -->
      <polygon points="260,200 400,100 400,300" fill="#38bdf8" opacity="0.3"/>
      <line x1="260" y1="200" x2="400" y2="200" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Green Superhero Suit Body -->
      <rect x="130" y="220" width="120" height="100" rx="15" fill="#10b981" stroke="#047857" stroke-width="5"/>
      <rect x="160" y="220" width="60" height="60" fill="#f43f5e"/>
      <!-- Action Kamen Masked Helmet -->
      <circle cx="190" cy="150" r="60" fill="#10b981" stroke="#047857" stroke-width="5"/>
      <!-- Gold Star on Forehead -->
      <polygon points="190,105 195,115 205,115 197,122 200,132 190,126 180,132 183,122 175,115 185,115" fill="#facc15"/>
      <!-- Shinchan Face through Mask -->
      <ellipse cx="190" cy="165" rx="38" ry="30" fill="#fed7aa"/>
      <ellipse cx="175" cy="155" rx="8" ry="12" fill="#1e293b"/>
      <ellipse cx="205" cy="155" rx="8" ry="12" fill="#1e293b"/>
      <!-- Wide Superhero Laugh -->
      <path d="M175 175 Q190 195 205 175 Z" fill="#dc2626"/>
      <!-- Hero Belt & Gloves -->
      <rect x="130" y="290" width="120" height="16" fill="#facc15" stroke="#d97706" stroke-width="2"/>
    </svg>`,
  },
];
