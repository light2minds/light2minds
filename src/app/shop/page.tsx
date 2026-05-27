'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

// ─── Types ──────────────────────────────────────────────────────────────────

type Storefront = 'families' | 'montessori' | 'professionals'

type Product = {
  id: string
  name: string
  brand: string
  description: string
  price: string
  storefront: Storefront
  category: string
  href: string          // Amazon search or brand URL — replace with affiliate link on approval
  accent: string        // card accent colour
  topPick?: boolean
  badge?: string        // e.g. 'High Commission' | 'Subscription'
}

type Bundle = {
  id: string
  name: string
  description: string
  contents: string[]
  price: string
  margin: string
  accent: string
}

type Digital = {
  id: string
  name: string
  description: string
  price: string
  pages?: string
}

// ─── Storefront config ───────────────────────────────────────────────────────

const STOREFRONTS: { id: Storefront; label: string; labelEs: string; color: string }[] = [
  { id: 'families',      label: 'Families',     labelEs: 'Familias',      color: '#5BC4F8' },
  { id: 'montessori',    label: 'All Kids',      labelEs: 'Todos los Niños', color: '#2EBB50' },
  { id: 'professionals', label: 'Professionals', labelEs: 'Profesionales',  color: '#FFE030' },
]

const CATEGORIES: Record<Storefront, string[]> = {
  families: ['All', 'Sensory', 'Communication', 'Behavior', 'Motor', 'Books', 'Safety & GPS', 'Apparel'],
  montessori: ['All', 'Montessori', 'Open-Ended Play', 'STEM', 'Arts & Music', 'Books'],
  professionals: ['All', 'Data Sheets', 'Clinical Supplies', 'Reference Books', 'Career Tools'],
}

// ─── Products ───────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  // ── FAMILIES · SENSORY ────────────────────────────────────────────────────
  {
    id: 'tt-8',
    name: 'Time Timer 8-inch',
    brand: 'Time Timer',
    description: 'The gold-standard visual timer for children with ADHD and autism. Shows time passing as a disappearing red disc — no numbers needed. Universally recommended by OTs, BCBAs, and teachers.',
    price: '$35–55',
    storefront: 'families',
    category: 'Behavior',
    href: 'https://www.timetimer.com/collections/all',
    accent: '#5BC4F8',
    topPick: true,
    badge: '10–15% commission',
  },
  {
    id: 'loop-quiet',
    name: 'Loop Earplugs Quiet',
    brand: 'Loop',
    description: 'Stylish, discreet noise-reduction earplugs designed for sensory sensitivities. Used in school, stores, and public spaces. One of the highest-converting products in this category.',
    price: '$25–35',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.loopearplugs.com',
    accent: '#5BC4F8',
    topPick: true,
    badge: 'High Commission',
  },
  {
    id: 'harkla-blanket',
    name: 'Weighted Blanket for Kids',
    brand: 'Harkla',
    description: 'Premium children\'s weighted blanket available in 5 lb, 7 lb, and 10 lb. Recommended by OTs for sensory regulation and sleep support. Direct brand affiliate at 10%.',
    price: '$80–130',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://harkla.co/collections/weighted-blankets',
    accent: '#5BC4F8',
    topPick: true,
    badge: '10% commission',
  },
  {
    id: 'ark-ychew',
    name: 'Y-Chew & P-Chew Combo',
    brand: 'ARK Therapeutic',
    description: 'OT-grade oral motor chew tools in multiple resistance levels. The most trusted brand in the field. Repeat-purchase product — families reorder when chews wear out.',
    price: '$10–25',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.arktherapeutic.com',
    accent: '#5BC4F8',
    topPick: true,
    badge: '~10% commission',
  },
  {
    id: 'crazy-aarons',
    name: 'Thinking Putty (assorted)',
    brand: 'Crazy Aaron\'s',
    description: 'The premium thinking putty used by OTs worldwide. High-quality, never dries out, comes in dozens of varieties. Impulse purchase and great gift item — high add-to-cart rate.',
    price: '$14–20',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=Crazy+Aarons+Thinking+Putty',
    accent: '#5BC4F8',
    topPick: true,
  },
  {
    id: 'harkla-swing',
    name: 'Compression Cuddle Swing',
    brand: 'Harkla',
    description: 'Indoor sensory swing providing deep-pressure proprioceptive input. Highly recommended for children who seek movement and calming input. Easy ceiling mount installation.',
    price: '$90–150',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://harkla.co/collections/swings',
    accent: '#5BC4F8',
  },
  {
    id: 'tangle-jr',
    name: 'Tangle Jr. Therapy (3-pack)',
    brand: 'Tangle',
    description: 'Classic fidget tool used in therapy clinics and classrooms worldwide. Quiet, durable, and non-distracting. Keep one at home, one in the backpack, one at school.',
    price: '$15–25',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=Tangle+Jr+Therapy+fidget',
    accent: '#5BC4F8',
  },
  {
    id: 'bouncyband-cushion',
    name: 'Wobble Seat Cushion',
    brand: 'Bouncyband',
    description: 'Inflatable balance disc that goes on any chair. Provides vestibular input for children who need movement to focus. Discreet enough for school use. Direct affiliate program available.',
    price: '$25–40',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=Bouncyband+wobble+cushion+chair',
    accent: '#5BC4F8',
    badge: 'Direct affiliate',
  },
  {
    id: 'dohm-white-noise',
    name: 'Dohm Classic White Noise Machine',
    brand: 'Yogasleep',
    description: 'The best-reviewed white noise machine for children with auditory sensitivities. Real fan-based sound — not digital. Trusted by pediatric sleep specialists for 50+ years.',
    price: '$50–70',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=Yogasleep+Dohm+Classic+white+noise',
    accent: '#5BC4F8',
  },
  {
    id: 'body-sox',
    name: 'Body Sox Sensory Body Sock',
    brand: 'FlagHouse',
    description: 'Full-body spandex sensory sock providing deep-pressure proprioceptive input. OT-recommended for body awareness, calming, and movement play. Great for home and clinic use.',
    price: '$30–50',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=body+sox+sensory+body+sock+children',
    accent: '#5BC4F8',
  },
  {
    id: 'liquid-timer',
    name: 'Liquid Motion Bubble Timer',
    brand: 'Various',
    description: 'Visual sensory timer — colored liquid cascades through chambers providing a calming, mesmerizing visual focus tool. Great for calm-down corners and transitions.',
    price: '$10–25',
    storefront: 'families',
    category: 'Sensory',
    href: 'https://www.amazon.com/s?k=liquid+motion+timer+sensory',
    accent: '#5BC4F8',
  },
  {
    id: 'calm-wear-shirt',
    name: 'Compression Shirt',
    brand: 'Calm Wear',
    description: 'Proprioceptive compression shirt for everyday wear. Provides calming deep-pressure input under regular clothing — invisible sensory support at school and home.',
    price: '$35–50',
    storefront: 'families',
    category: 'Apparel',
    href: 'https://www.calmwear.com',
    accent: '#5BC4F8',
    badge: 'Direct affiliate',
  },
  {
    id: 'smartknit-socks',
    name: 'SeamFree Socks',
    brand: 'SmartKnitKIDS',
    description: 'Completely seamless socks designed for children with tactile hypersensitivity. Loved by families of children who refuse to wear socks. One of the most frequent parent requests.',
    price: '$10–20',
    storefront: 'families',
    category: 'Apparel',
    href: 'https://www.amazon.com/s?k=SmartKnitKIDS+seamless+socks',
    accent: '#5BC4F8',
  },
  {
    id: 'tommy-adaptive',
    name: 'Tommy Adaptive Line',
    brand: 'Tommy Hilfiger',
    description: 'Adaptive clothing with magnetic closures, one-handed buttons, and sensory-friendly fabrics. Full line for kids and adults — the most accessible adaptive clothing brand available.',
    price: '$25–80',
    storefront: 'families',
    category: 'Apparel',
    href: 'https://www.amazon.com/s?k=Tommy+Hilfiger+Adaptive+kids',
    accent: '#5BC4F8',
    badge: 'CJ Affiliate',
  },

  // ── FAMILIES · COMMUNICATION ─────────────────────────────────────────────
  {
    id: 'visual-schedule-kit',
    name: 'Visual Schedule Velcro Kit',
    brand: 'Various',
    description: 'Velcro board with laminated picture schedule cards covering morning routine, school day, and evening routine. Helps children with autism and ADHD predict and navigate daily transitions.',
    price: '$25–50',
    storefront: 'families',
    category: 'Communication',
    href: 'https://www.amazon.com/s?k=visual+schedule+kit+autism+velcro',
    accent: '#5BC4F8',
  },
  {
    id: 'emotion-cards',
    name: 'Emotions & Feelings Card Set',
    brand: 'Learning Resources',
    description: 'Laminated emotion identification cards with photographs, illustrations, and feeling-word labels. Build emotional vocabulary and support self-regulation in children 3–10.',
    price: '$15–25',
    storefront: 'families',
    category: 'Communication',
    href: 'https://www.amazon.com/s?k=emotion+feelings+card+set+children',
    accent: '#5BC4F8',
  },
  {
    id: 'pecs-cards',
    name: 'PECS-Style Picture Card Set (200+)',
    brand: 'Various',
    description: 'Over 200 laminated picture communication cards organized by category. For families beginning AAC at home or supplementing a school PECS program.',
    price: '$20–40',
    storefront: 'families',
    category: 'Communication',
    href: 'https://www.amazon.com/s?k=picture+communication+cards+autism+PECS',
    accent: '#5BC4F8',
  },

  // ── FAMILIES · BEHAVIOR ──────────────────────────────────────────────────
  {
    id: 'hoberman-sphere',
    name: 'Hoberman Breathing Ball',
    brand: 'Hoberman',
    description: 'The classic expanding sphere used to teach belly breathing and calming techniques. Expand on the inhale, contract on the exhale. Universally used in pediatric therapy.',
    price: '$15–25',
    storefront: 'families',
    category: 'Behavior',
    href: 'https://www.amazon.com/s?k=Hoberman+sphere+breathing+ball+children',
    accent: '#5BC4F8',
  },
  {
    id: 'token-board-magnetic',
    name: 'Magnetic Token Board',
    brand: 'Various',
    description: 'Laminated magnetic token board with star and chip tokens. Core tool for implementing token economy reinforcement systems at home — easy to reset, durable, and motivating.',
    price: '$15–30',
    storefront: 'families',
    category: 'Behavior',
    href: 'https://www.amazon.com/s?k=magnetic+token+board+children+behavior',
    accent: '#5BC4F8',
  },
  {
    id: 'tt-mini',
    name: 'Time Timer Mini',
    brand: 'Time Timer',
    description: 'The pocket-sized version of the Time Timer. Perfect for backpacks, travel, and desk use. Same visual countdown disc in a portable form factor. Great for school transitions.',
    price: '$25–35',
    storefront: 'families',
    category: 'Behavior',
    href: 'https://www.timetimer.com/collections/all',
    accent: '#5BC4F8',
    badge: '10–15% commission',
  },

  // ── FAMILIES · MOTOR ─────────────────────────────────────────────────────
  {
    id: 'fine-motor-set',
    name: 'Helping Hands Fine Motor Tool Set',
    brand: 'Learning Resources',
    description: 'Set of tweezers, tongs, and scoops in four sizes for fine motor practice. Sorting and transferring activities build the hand strength needed for writing and self-care.',
    price: '$15–25',
    storefront: 'families',
    category: 'Motor',
    href: 'https://www.amazon.com/s?k=Learning+Resources+Helping+Hands+fine+motor',
    accent: '#5BC4F8',
  },
  {
    id: 'pencil-grip',
    name: 'The Pencil Grip Crossover',
    brand: 'The Pencil Grip',
    description: 'OT-recommended pencil grip that promotes proper finger placement for handwriting. Fits standard pencils and crayons. Used in occupational therapy clinics nationwide.',
    price: '$6–12',
    storefront: 'families',
    category: 'Motor',
    href: 'https://www.amazon.com/s?k=The+Pencil+Grip+crossover+writing',
    accent: '#5BC4F8',
  },
  {
    id: 'slant-board',
    name: 'Writing Slant Board',
    brand: 'Various',
    description: 'Adjustable angle clipboard that promotes proper wrist positioning for writing and reduces fatigue. Recommended by OTs for children with dysgraphia, low tone, and attention difficulties.',
    price: '$20–40',
    storefront: 'families',
    category: 'Motor',
    href: 'https://www.amazon.com/s?k=slant+board+writing+children+OT',
    accent: '#5BC4F8',
  },

  // ── FAMILIES · BOOKS ─────────────────────────────────────────────────────
  {
    id: 'explosive-child',
    name: 'The Explosive Child',
    brand: 'Ross W. Greene, PhD',
    description: 'The foundational text on collaborative problem-solving for challenging behavior. Changed how thousands of parents understand their children. Every parent should read this.',
    price: '$15–20',
    storefront: 'families',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=The+Explosive+Child+Greene',
    accent: '#5BC4F8',
    topPick: true,
    badge: '10% at Bookshop',
  },
  {
    id: 'beyond-behaviors',
    name: 'Beyond Behaviors',
    brand: 'Mona Delahooke, PhD',
    description: 'A neuroscience-based approach to understanding why children behave the way they do. Shifts parents from punishment to curiosity. Essential reading for autism and sensory families.',
    price: '$15–20',
    storefront: 'families',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=Beyond+Behaviors+Delahooke',
    accent: '#5BC4F8',
  },
  {
    id: 'whole-brain-child',
    name: 'The Whole-Brain Child',
    brand: 'Siegel & Bryson',
    description: '12 revolutionary strategies to nurture your child\'s developing mind. Blends neuroscience and parenting in a deeply accessible way. One of the best-selling parenting books of the past decade.',
    price: '$15–20',
    storefront: 'families',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=The+Whole+Brain+Child+Siegel+Bryson',
    accent: '#5BC4F8',
  },
  {
    id: 'uniquely-human',
    name: 'Uniquely Human',
    brand: 'Barry Prizant, PhD',
    description: 'A reframing of autism as a different way of experiencing the world — not a disorder to be fixed. Widely loved by autistic adults and families alike. A compassionate must-read.',
    price: '$16–20',
    storefront: 'families',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=Uniquely+Human+Prizant',
    accent: '#5BC4F8',
  },
  {
    id: 'ten-things-autism',
    name: 'Ten Things Every Child with Autism Wishes You Knew',
    brand: 'Ellen Notbohm',
    description: 'One of the most widely recommended books for newly-diagnosed families. Warm, practical, and written in a voice that families connect with immediately.',
    price: '$14–18',
    storefront: 'families',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=Ten+Things+Every+Child+Autism+Notbohm',
    accent: '#5BC4F8',
  },

  // ── FAMILIES · SAFETY ────────────────────────────────────────────────────
  {
    id: 'angelsense',
    name: 'AngelSense GPS Tracker',
    brand: 'AngelSense',
    description: 'GPS watch designed specifically for families of children with autism and wandering behavior. Real-time tracking, listen-in audio, and instant alerts. High-commitment subscription with significant recurring affiliate income.',
    price: '$199 + subscription',
    storefront: 'families',
    category: 'Safety & GPS',
    href: 'https://www.angelsense.com',
    accent: '#5BC4F8',
    topPick: true,
    badge: 'Subscription LTV',
  },
  {
    id: 'airtag-bundle',
    name: 'AirTag + Backpack Clip Case',
    brand: 'Apple / Various',
    description: 'Apple AirTag with a durable backpack clip case. Budget-friendly location tracking for school bags, jackets, and belt loops. Works with any iPhone in Find My.',
    price: '$30–50',
    storefront: 'families',
    category: 'Safety & GPS',
    href: 'https://www.amazon.com/s?k=apple+airtag+kids+backpack+case',
    accent: '#5BC4F8',
  },
  {
    id: 'door-alarm',
    name: 'Door & Window Alert System',
    brand: 'GE',
    description: 'Simple wireless door and window chime alarms for families with children who wander. Instant audio alert when doors or windows open. Essential for pool homes in Florida.',
    price: '$20–40',
    storefront: 'families',
    category: 'Safety & GPS',
    href: 'https://www.amazon.com/s?k=GE+door+window+alarm+chime+child+safety',
    accent: '#5BC4F8',
  },

  // ── ALL KIDS / MONTESSORI ─────────────────────────────────────────────────
  {
    id: 'magna-tiles',
    name: 'Magna-Tiles 32-Piece Starter Set',
    brand: 'Magna-Tiles',
    description: 'The original and best magnetic tile set. Open-ended building for ages 3–12. STEM, creativity, and spatial reasoning in one toy. One of the single highest-converting product recommendations in the educational toy space.',
    price: '$60–120',
    storefront: 'montessori',
    category: 'Open-Ended Play',
    href: 'https://www.amazon.com/s?k=Magna-Tiles+32+piece+starter+set',
    accent: '#2EBB50',
    topPick: true,
    badge: 'Via Impact',
  },
  {
    id: 'lovevery-kit',
    name: 'Lovevery Play Kit Subscription',
    brand: 'Lovevery',
    description: 'Stage-based Montessori play kits delivered every 2–3 months from birth through age 4. Expert-designed by child development specialists. ~$80–120/box, recurring subscription = highest-LTV affiliate in this category.',
    price: '$80–120/box',
    storefront: 'montessori',
    category: 'Montessori',
    href: 'https://lovevery.com/products/the-play-kits',
    accent: '#2EBB50',
    topPick: true,
    badge: '10%+ recurring',
  },
  {
    id: 'grapat-loose-parts',
    name: 'Grapat Loose Parts Set',
    brand: 'Grapat',
    description: 'Premium Spanish wooden loose parts — coins, rings, and caps in a rainbow of natural dyes. The gold standard for open-ended Montessori play and sorting. Beloved by Montessori families worldwide.',
    price: '$30–80',
    storefront: 'montessori',
    category: 'Open-Ended Play',
    href: 'https://www.amazon.com/s?k=Grapat+loose+parts+wooden',
    accent: '#2EBB50',
  },
  {
    id: 'grimms-rainbow',
    name: 'Rainbow Stacker',
    brand: 'Grimm\'s',
    description: 'Iconic German wooden rainbow stacker — open-ended building, stacking, sorting, and imaginative play. Made from sustainably sourced linden wood with non-toxic dyes. A Montessori classic.',
    price: '$60–120',
    storefront: 'montessori',
    category: 'Open-Ended Play',
    href: 'https://www.amazon.com/s?k=Grimms+rainbow+stacker+wooden',
    accent: '#2EBB50',
  },
  {
    id: 'object-permanence',
    name: 'Object Permanence Box',
    brand: 'Various / Etsy Makers',
    description: 'Classic Montessori infant material. A wooden ball drops into a box and reappears through a drawer — teaching object permanence at 8–12 months. First structured Montessori material.',
    price: '$25–50',
    storefront: 'montessori',
    category: 'Montessori',
    href: 'https://www.amazon.com/s?k=Montessori+object+permanence+box+wooden',
    accent: '#2EBB50',
  },
  {
    id: 'sandpaper-letters',
    name: 'Sandpaper Letters (Print)',
    brand: 'Various',
    description: 'Montessori sandpaper letter tiles — children trace each letter while saying its phonetic sound, linking tactile, auditory, and visual learning simultaneously. Ages 2.5–5.',
    price: '$30–80',
    storefront: 'montessori',
    category: 'Montessori',
    href: 'https://www.amazon.com/s?k=Montessori+sandpaper+letters+print',
    accent: '#2EBB50',
  },
  {
    id: 'pink-tower',
    name: 'Pink Tower',
    brand: 'Various',
    description: 'Ten wooden pink cubes graded from 1cm³ to 10cm³. Foundational Montessori sensorial material developing discrimination of size, order, and concentration. Ages 2.5–5.',
    price: '$30–60',
    storefront: 'montessori',
    category: 'Montessori',
    href: 'https://www.amazon.com/s?k=Montessori+pink+tower+wooden',
    accent: '#2EBB50',
  },
  {
    id: 'learning-tower',
    name: 'Learning Tower Kitchen Helper',
    brand: 'Little Partners',
    description: 'Adjustable toddler tower bringing children safely to counter height for real-life practical life activities — cooking, washing, setting the table. High AOV, direct brand program available.',
    price: '$130–250',
    storefront: 'montessori',
    category: 'Montessori',
    href: 'https://www.amazon.com/s?k=learning+tower+kitchen+helper+toddler',
    accent: '#2EBB50',
    badge: 'High AOV',
  },
  {
    id: 'cubetto',
    name: 'Cubetto Coding Robot (Screen-Free)',
    brand: 'Primo Toys',
    description: 'Award-winning screen-free coding toy for ages 3+. Children program a wooden robot by arranging physical blocks on a board. Teaches sequencing and logic without a screen.',
    price: '$200–300',
    storefront: 'montessori',
    category: 'STEM',
    href: 'https://www.primotoys.com',
    accent: '#2EBB50',
    badge: 'Direct program',
  },
  {
    id: 'snap-circuits',
    name: 'Snap Circuits Jr. (100 projects)',
    brand: 'Elenco',
    description: 'Electronics kit for ages 8+ — build real working circuits with snap-together components. No soldering required. One of the most award-winning STEM toys of the past 20 years.',
    price: '$30–80',
    storefront: 'montessori',
    category: 'STEM',
    href: 'https://www.amazon.com/s?k=Snap+Circuits+Jr+electronics+kit',
    accent: '#2EBB50',
  },
  {
    id: 'national-geo-kits',
    name: 'National Geographic Science Kits',
    brand: 'National Geographic',
    description: 'Crystal growing, gemstone dig, volcano, and slime kits. High engagement, curriculum-aligned, and great for reluctant learners. Multiple kits = multiple purchase opportunities.',
    price: '$20–50',
    storefront: 'montessori',
    category: 'STEM',
    href: 'https://www.amazon.com/s?k=National+Geographic+science+kit+kids',
    accent: '#2EBB50',
  },
  {
    id: 'stockmar-crayons',
    name: 'Beeswax Block Crayons',
    brand: 'Stockmar',
    description: 'Premium German beeswax crayons beloved by Waldorf and Montessori educators. Rich pigment, perfect grip for small hands, and completely non-toxic. Long-lasting with a beautiful translucent quality.',
    price: '$25–40',
    storefront: 'montessori',
    category: 'Arts & Music',
    href: 'https://www.amazon.com/s?k=Stockmar+beeswax+block+crayons',
    accent: '#2EBB50',
  },
  {
    id: 'kala-ukulele',
    name: 'Ukulele Starter Bundle',
    brand: 'Kala',
    description: 'Beginner ukulele designed for children from age 5. Includes online lessons, tuner, and carry bag. One of the most accessible instruments for building musical confidence.',
    price: '$50–80',
    storefront: 'montessori',
    category: 'Arts & Music',
    href: 'https://www.amazon.com/s?k=Kala+ukulele+kids+starter+bundle',
    accent: '#2EBB50',
  },
  {
    id: 'mo-willems-box',
    name: 'Mo Willems Collection (8 books)',
    brand: 'Mo Willems',
    description: 'The beloved Elephant & Piggie and Pigeon series — perfect for emerging readers and read-alouds. Builds social-emotional skills through humor and relatable characters.',
    price: '$25–40',
    storefront: 'montessori',
    category: 'Books',
    href: 'https://bookshop.org/search?keywords=Mo+Willems+Elephant+Piggie',
    accent: '#2EBB50',
    badge: '10% at Bookshop',
  },

  // ── PROFESSIONALS ─────────────────────────────────────────────────────────
  {
    id: 'cooper-aba-textbook',
    name: 'Applied Behavior Analysis (3rd Ed.)',
    brand: 'Cooper, Heron & Heward',
    description: 'The definitive ABA textbook — used in every BCBA training program. High AOV ($130–180) makes this one of the highest-earning affiliate clicks in the Professional storefront. Essential for every ABA professional\'s shelf.',
    price: '$130–180',
    storefront: 'professionals',
    category: 'Reference Books',
    href: 'https://www.amazon.com/s?k=Cooper+Heron+Heward+Applied+Behavior+Analysis+3rd',
    accent: '#C4A800',
    topPick: true,
    badge: 'High AOV',
  },
  {
    id: 'tt-professional',
    name: 'Time Timer Plus 20-min',
    brand: 'Time Timer',
    description: 'The professional-grade Time Timer designed for clinical use — 20-minute range, durable housing, and clean face ideal for session work. Recommend as a clinic staple alongside the standard 8-inch.',
    price: '$40–60',
    storefront: 'professionals',
    category: 'Clinical Supplies',
    href: 'https://www.timetimer.com',
    accent: '#C4A800',
    badge: '10–15% commission',
  },
  {
    id: 'bulk-fidgets',
    name: 'Reinforcer Starter Pack (50-piece)',
    brand: 'Various / Bulk',
    description: 'Mixed assortment of 50 small fidgets, pop tubes, and tactile toys for RBT reinforcement bins. Wholesale via Faire or Amazon bulk. High-margin L2M bundle opportunity when branded and curated.',
    price: '$30–60',
    storefront: 'professionals',
    category: 'Clinical Supplies',
    href: 'https://www.amazon.com/s?k=fidget+assortment+bulk+50+pieces+therapy',
    accent: '#C4A800',
  },
  {
    id: 'interval-timer',
    name: 'Interval Timer for Data Collection',
    brand: 'GymNext / Various',
    description: 'Programmable interval timer for partial-interval, whole-interval, and momentary time sampling data collection. Mount on a wall or set on a desk — silent vibration mode available.',
    price: '$20–40',
    storefront: 'professionals',
    category: 'Clinical Supplies',
    href: 'https://www.amazon.com/s?k=interval+timer+data+collection+vibrate+ABA',
    accent: '#C4A800',
  },
  {
    id: 'ethics-van-houten',
    name: 'Ethics for Behavior Analysts',
    brand: 'Van Houten & Bailey',
    description: 'Companion ethics text aligned with the BACB Professional and Ethical Compliance Code. Essential for BCBAs, BCaBAs, and supervision coursework. Pairs well with the Cooper ABA textbook.',
    price: '$50–80',
    storefront: 'professionals',
    category: 'Reference Books',
    href: 'https://bookshop.org/search?keywords=Ethics+for+Behavior+Analysts+Van+Houten',
    accent: '#C4A800',
  },
  {
    id: 'smart-scattered',
    name: 'Smart but Scattered',
    brand: 'Dawson & Guare',
    description: 'The definitive guide to executive function skills for parents and professionals. Practical strategies for children with ADHD, learning differences, and weak executive skills. Great for parent library and RBT reference.',
    price: '$15–20',
    storefront: 'professionals',
    category: 'Reference Books',
    href: 'https://bookshop.org/search?keywords=Smart+but+Scattered+Dawson+Guare',
    accent: '#C4A800',
  },
  {
    id: 'rbt-resume-template',
    name: 'RBT Resume & Interview Guide',
    brand: 'Light2Minds',
    description: 'Professionally designed resume template for RBT and BCBA roles + 30 common interview questions with coached answers. Printable and editable Word format.',
    price: '$15–25',
    storefront: 'professionals',
    category: 'Career Tools',
    href: '#coming-soon',
    accent: '#C4A800',
    badge: 'L2M Brand',
  },
  {
    id: 'career-pathway-map',
    name: 'ABA Career Pathway Map',
    brand: 'Light2Minds',
    description: 'Visual career progression guide from RBT → BCaBA → BCBA — including education, fieldwork, supervision, and exam requirements at each level. Printable poster format.',
    price: '$12',
    storefront: 'professionals',
    category: 'Career Tools',
    href: '#coming-soon',
    accent: '#C4A800',
    badge: 'L2M Brand',
  },
]

// ─── Bundles ─────────────────────────────────────────────────────────────────

const BUNDLES: Bundle[] = [
  {
    id: 'just-diagnosed',
    name: 'Just Diagnosed Sensory Starter Kit',
    description: 'Everything a newly-diagnosed family needs on day one — curated, explained, and ready to use.',
    contents: ['Weighted lap pad', 'Time Timer Mini', '5 fidget tools', 'Loop Quiet earplugs', 'Feelings chart', 'Calm-down jar kit', 'L2M family workbook'],
    price: '$89',
    margin: '~49% margin',
    accent: '#5BC4F8',
  },
  {
    id: 'calm-corner',
    name: 'Calm Corner Kit',
    description: 'Everything needed to set up a designated calm-down space at home or school.',
    contents: ['Floor cushion', 'Sensory bottle kit', 'Hoberman breathing ball', 'Fidget bundle', 'Visual coping cards', 'Setup guide'],
    price: '$129',
    margin: '~57% margin',
    accent: '#2EBB50',
  },
  {
    id: 'iep-prep',
    name: 'IEP Prep Kit',
    description: 'Everything a parent needs to walk into an IEP meeting prepared and confident.',
    contents: ['IEP binder', 'Prep packet (printed)', 'Worksheet pack', 'Pens + sticky tabs'],
    price: '$45',
    margin: '~73% margin',
    accent: '#FFE030',
  },
  {
    id: 'school-year',
    name: 'School Year Sensory Kit',
    description: 'School-appropriate sensory tools that go in a backpack and on a chair.',
    contents: ['Wobble cushion', 'School-discreet fidget set', 'Slant board', 'Pencil grips (3)', 'Visual transition cards'],
    price: '$75',
    margin: '~60% margin',
    accent: '#5BC4F8',
  },
  {
    id: 'sleep-reset',
    name: 'Sleep Reset Kit',
    description: 'A clinician-curated sleep support bundle for children with sensory and regulation challenges.',
    contents: ['Weighted blanket (size TBD at checkout)', 'Yogasleep Dohm white noise machine', 'Blackout curtain cover', 'Bedtime visual schedule printable'],
    price: '$95',
    margin: '~47% margin',
    accent: '#2EBB50',
  },
  {
    id: 'daily-living',
    name: 'Daily Living Skills Bundle',
    description: 'Practical tools for building independence in everyday self-care and household routines.',
    contents: ['Adaptive utensil set', 'Laminated routine charts (morning + evening)', 'Token board', 'Toileting visual sequence cards'],
    price: '$65',
    margin: '~66% margin',
    accent: '#FFE030',
  },
]

// ─── Digital Products ────────────────────────────────────────────────────────

const DIGITALS: Digital[] = [
  { id: 'dp-visual-schedule', name: 'Visual Schedule Printable Pack', description: 'Morning, school, and evening visual schedule cards in 4 themes — print, laminate, and use the same day.', price: '$12', pages: '28 pages' },
  { id: 'dp-iep-organizer', name: 'IEP Organizer (40+ pages)', description: 'Complete printable IEP binder system — meeting tracker, rights checklist, goal log, provider contact sheet, and more.', price: '$19', pages: '42 pages' },
  { id: 'dp-behavior-charts', name: 'Behavior Chart & Token Board Bundle', description: 'Ten editable behavior charts + 6 token board designs for home and classroom use. Edit in Canva or print as-is.', price: '$12', pages: '16 designs' },
  { id: 'dp-money-map', name: 'Florida Family Money Map', description: 'Premium 20-page guide to every Florida funding program (FES-UA, CDE, iBudget, Medicaid) with step-by-step application instructions.', price: '$19', pages: '20 pages' },
  { id: 'dp-communication', name: 'Communication Card Starter Pack', description: '120 PECS-style picture communication cards covering daily routines, food, emotions, and requests. Print and laminate.', price: '$15', pages: '120 cards' },
  { id: 'dp-calm-corner', name: 'Calm Corner Printables Set', description: 'Visual coping strategies, breathing technique cards, feelings thermometer, and calming menu — ready to print and post.', price: '$9', pages: '12 pages' },
  { id: 'dp-reinforcer', name: 'Preference Assessment & Reinforcer Menu', description: 'BCBA-designed preference assessment forms + reinforcer menu templates for home and clinic use. ABA-aligned.', price: '$12', pages: '10 forms' },
  { id: 'dp-full-bundle', name: 'Full Light2Minds Family Bundle', description: 'Every printable in the digital library — all 7 products above — at one bundled price. The best value for families who want everything.', price: '$89' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function ExternalIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10L10 2M5 2h5v5" />
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ShopPage() {
  const { lang } = useLang()
  const [storefront, setStorefront]   = useState<Storefront>('families')
  const [category,   setCategory]     = useState('All')
  const [search,     setSearch]       = useState('')

  // reset category when storefront changes
  const handleStorefront = (sf: Storefront) => {
    setStorefront(sf)
    setCategory('All')
    setSearch('')
  }

  const filtered = useMemo(() => {
    let pool = PRODUCTS.filter((p) => p.storefront === storefront)
    if (category !== 'All') pool = pool.filter((p) => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      pool = pool.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }
    // top picks first
    return [...pool].sort((a, b) => (b.topPick ? 1 : 0) - (a.topPick ? 1 : 0))
  }, [storefront, category, search])

  const activeSF = STOREFRONTS.find((s) => s.id === storefront)!
  const cats     = CATEGORIES[storefront]

  return (
    <main className="min-h-screen">

      {/* ── Shop hero ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-28 pb-14 lg:pt-36 lg:pb-20 border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {lang === 'es' ? 'La Tienda Light2Minds' : 'The Light2Minds Shop'}
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-navy-900 leading-[1.06] tracking-[-0.03em] mb-5">
              {lang === 'es'
                ? 'Herramientas que realmente funcionan.'
                : 'Tools that actually work.'}
            </h1>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-6">
              {lang === 'es'
                ? 'Cada producto recomendado aquí ha sido revisado clínicamente o utilizado directamente por profesionales de ABA, terapeutas ocupacionales y familias. Sin relleno.'
                : 'Every product recommended here has been clinically reviewed or used directly by ABA professionals, occupational therapists, and families. No filler.'}
            </p>
            {/* Affiliate disclosure */}
            <div className="inline-flex items-start gap-2 bg-gold-50 border border-gold-200 rounded-xl px-4 py-2.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-[2px]" viewBox="0 0 14 14" fill="none" stroke="#B8900E" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="7" cy="7" r="6"/><path d="M7 5v4M7 4v.5"/>
              </svg>
              <p className="text-[11.5px] text-navy-800/60 leading-snug">
                {lang === 'es'
                  ? 'Podemos ganar una comisión en compras a través de los enlaces de esta página sin costo adicional para usted. Esto apoya el funcionamiento gratuito de Light2Minds.'
                  : 'We may earn a commission on purchases made through links on this page at no extra cost to you. This supports the free operation of Light2Minds.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Storefront tabs ── */}
      <div className="sticky top-[68px] z-30 bg-white border-b border-stone-100 shadow-sm shadow-stone-100/80">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex">
            {STOREFRONTS.map((sf) => (
              <button
                key={sf.id}
                onClick={() => handleStorefront(sf.id)}
                className={[
                  'flex-1 py-4 text-[13px] font-semibold tracking-[0.02em] transition-all duration-200 border-b-2',
                  storefront === sf.id
                    ? 'text-navy-900 border-current'
                    : 'text-navy-500/60 border-transparent hover:text-navy-800 hover:border-stone-200',
                ].join(' ')}
                style={storefront === sf.id ? { color: sf.color === '#FFE030' ? '#B8900E' : sf.color, borderColor: sf.color === '#FFE030' ? '#B8900E' : sf.color } : {}}
              >
                {lang === 'es' ? sf.labelEs : sf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters + Search ── */}
      <div style={{ backgroundColor: WARM_BG }} className="border-b border-stone-200/50 py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

          {/* Category pills — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide flex-shrink-0">
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={[
                  'flex-shrink-0 text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150',
                  category === cat
                    ? 'text-white'
                    : 'bg-white/80 text-navy-700/60 border border-stone-200 hover:text-navy-900',
                ].join(' ')}
                style={category === cat ? { backgroundColor: activeSF.color === '#FFE030' ? '#B8900E' : activeSF.color } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 sm:w-56">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-navy-800/30" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="6" cy="6" r="4.5"/><path d="M10 10l2.5 2.5"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar productos…' : 'Search products…'}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-[13px] bg-white/90 placeholder-navy-800/25 outline-none focus:border-navy-300 transition-colors"
            />
          </div>

        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[15px] text-navy-800/40">
                {lang === 'es' ? 'No se encontraron productos.' : 'No products found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <motion.div key={p.id} {...fade(Math.min(i, 5) * 0.06)}>
                  <a
                    href={p.href.startsWith('#') ? undefined : p.href}
                    target={p.href.startsWith('#') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={p.href.startsWith('#') ? (e) => e.preventDefault() : undefined}
                    className={[
                      'group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-100 transition-all duration-200',
                      p.href.startsWith('#') ? 'cursor-default' : 'hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/60 hover:border-stone-200',
                    ].join(' ')}
                  >
                    {/* Top accent bar */}
                    <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: p.accent }} />

                    <div className="flex flex-col flex-1 p-6">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <p
                            className="text-[10px] font-bold tracking-[0.1em] uppercase mb-1"
                            style={{ color: p.accent === '#C4A800' ? '#B8900E' : p.accent }}
                          >
                            {p.brand}
                          </p>
                          <h3 className="text-[14.5px] font-semibold text-navy-900 leading-snug">
                            {p.name}
                          </h3>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {p.topPick && (
                            <span
                              className="text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: p.accent }}
                            >
                              Top Pick
                            </span>
                          )}
                          {p.badge && !p.topPick && (
                            <span
                              className="text-[9px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: p.accent + '22',
                                color: p.accent === '#C4A800' ? '#B8900E' : p.accent,
                              }}
                            >
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[12.5px] text-navy-800/50 leading-relaxed flex-1 mb-5">
                        {p.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-navy-900">{p.price}</span>
                        {p.href.startsWith('#') ? (
                          <span className="text-[11px] font-semibold text-navy-800/30 px-3 py-1.5 rounded-full bg-stone-100">
                            {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-all duration-150 group-hover:opacity-100 opacity-80"
                            style={{
                              backgroundColor: p.accent + '18',
                              color: p.accent === '#C4A800' ? '#B8900E' : p.accent,
                            }}
                          >
                            {lang === 'es' ? 'Ver producto' : 'Shop now'}
                            <ExternalIcon />
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bundles ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-16 lg:py-24 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px flex-shrink-0 bg-navy-900/20" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/45">
                {lang === 'es' ? 'Kits Light2Minds — Alta Rentabilidad' : 'Light2Minds Signature Kits — High Margin'}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es' ? 'Kits curados, listos para usar.' : 'Curated kits, ready to use.'}
            </h2>
            <p className="text-[14px] text-navy-800/45 mt-3 max-w-lg">
              {lang === 'es'
                ? 'Ensamblados por Light2Minds — más valor que comprar por separado, con orientación incluida.'
                : 'Assembled by Light2Minds — more value than buying individually, with guidance included.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUNDLES.map((b, i) => (
              <motion.div key={b.id} {...fade(i * 0.07)}>
                <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md hover:shadow-stone-200/60 transition-all duration-200">
                  <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: b.accent }} />
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-[14.5px] font-semibold text-navy-900 leading-snug flex-1">{b.name}</h3>
                      <span
                        className="flex-shrink-0 text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: b.accent + '22', color: b.accent === '#FFE030' ? '#B8900E' : b.accent }}
                      >
                        {b.margin}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed mb-4">{b.description}</p>
                    <ul className="space-y-1 mb-5 flex-1">
                      {b.contents.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-navy-800/55">
                          <span className="flex-shrink-0 w-1 h-1 rounded-full mt-[6px]" style={{ backgroundColor: b.accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold text-navy-900">{b.price}</span>
                      <span className="text-[11.5px] font-semibold text-navy-800/35 px-3 py-1.5 rounded-full bg-stone-100">
                        {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Digital Products ── */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/45">
                {lang === 'es' ? 'Productos Digitales — 95%+ Margen' : 'Digital Downloads — 95%+ Margin'}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es' ? 'Diseñado una vez. Descargado infinitas veces.' : 'Designed once. Downloaded infinitely.'}
            </h2>
            <p className="text-[14px] text-navy-800/45 mt-3 max-w-lg">
              {lang === 'es'
                ? 'Entrega instantánea. Sin inventario. Sin envíos. Los márgenes más altos de toda la tienda.'
                : 'Instant delivery. No inventory. No shipping. The highest margins in the entire shop.'}
            </p>
          </motion.div>

          {/* AAC Board — free featured download */}
          <motion.div {...fade(0)} className="mb-6">
            <div className="rounded-2xl overflow-hidden border border-[#5BC4F8]/35 flex flex-col sm:flex-row bg-white">
              <div className="sm:w-56 flex-shrink-0 bg-stone-50 border-b sm:border-b-0 sm:border-r border-stone-100 flex items-center justify-center p-4">
                <Image
                  src="/aac-communication-board.jpg"
                  alt="AAC Core Vocabulary Communication Board"
                  width={280}
                  height={210}
                  className="rounded-xl w-full h-auto object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#5BC4F8]/15 text-[#3A9ECE]">
                      {lang === 'es' ? 'Para Familias' : 'For Families'}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#2EBB50]/12 text-[#1E8E3E]">AAC</span>
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>
                      {lang === 'es' ? 'GRATIS' : 'FREE'}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-navy-900 leading-snug mb-2">
                    {lang === 'es' ? 'Tablero de Comunicación AAC — Vocabulario Central' : 'AAC Core Vocabulary Communication Board'}
                  </h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">
                    {lang === 'es'
                      ? 'Tablero a color listo para imprimir con más de 80 palabras de alta frecuencia con símbolos visuales. Para niños verbales y no verbales en casa, escuela y terapia.'
                      : 'Full-color, print-ready board with 80+ high-frequency words and visual symbols. For verbal and non-verbal learners — use at home, school, or in therapy.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <a
                    href="/aac-communication-board.jpg"
                    download="AAC-Core-Vocabulary-Board-Light2Minds.jpg"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-[1px]"
                    style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}
                  >
                    {lang === 'es' ? 'Descargar Gratis' : 'Download Free'}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                    </svg>
                  </a>
                  <span className="text-[12px] text-navy-800/35">
                    {lang === 'es' ? 'JPG · Sin cuenta requerida' : 'JPG · No account required'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIGITALS.map((d, i) => (
              <motion.div key={d.id} {...fade(i * 0.05)}>
                <div
                  className={[
                    'flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-200',
                    d.id === 'dp-full-bundle'
                      ? 'border-forest-200 sm:col-span-2 lg:col-span-2'
                      : 'border-stone-100 hover:shadow-md hover:shadow-stone-200/50',
                  ].join(' ')}
                  style={{ backgroundColor: d.id === 'dp-full-bundle' ? '#EDFAF1' : WARM_BG }}
                >
                  <div
                    className="h-1 w-full flex-shrink-0"
                    style={{ backgroundColor: d.id === 'dp-full-bundle' ? '#2EBB50' : 'rgba(46,187,80,0.35)' }}
                  />
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[13.5px] font-semibold text-navy-900 leading-snug flex-1">{d.name}</h3>
                      {d.pages && (
                        <span className="flex-shrink-0 text-[9px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full bg-forest-100 text-forest-700">
                          {d.pages}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-navy-800/50 leading-relaxed flex-1 mb-4">{d.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-navy-900">{d.price}</span>
                      <span className="text-[11px] font-semibold text-navy-800/35 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200">
                        {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom disclosure ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-10 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11.5px] text-navy-800/40 leading-relaxed max-w-3xl">
            <span className="font-semibold text-navy-800/55">Affiliate Disclosure:</span>{' '}
            Light2Minds participates in affiliate advertising programs. Links marked &ldquo;Shop now&rdquo; may earn us a small commission at no additional cost to you. We only recommend products that have been reviewed or used by behavioral health professionals. Product recommendations are not clinical endorsements and do not constitute medical advice. Age recommendations and safety warnings noted in each product listing.
          </p>
        </div>
      </section>

    </main>
  )
}
