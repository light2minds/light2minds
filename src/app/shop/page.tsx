'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

// ── Constants ──────────────────────────────────────────────────────────────────
const CREAM = '#F8F5EF'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// ── Types ──────────────────────────────────────────────────────────────────────
type Storefront = 'families' | 'montessori' | 'professionals'

type Product = {
  id: string; name: string; brand: string; description: string
  price: string; storefront: Storefront; category: string
  href: string; accent: string; topPick?: boolean; ot?: boolean; bcba?: boolean
}

type Bundle = {
  id: string; name: string; tagline: string; description: string
  contents: string[]; price: string; accent: string; need: string
}

type Digital = {
  id: string; name: string; description: string; price: string; pages?: string
}

// ── Storefronts ────────────────────────────────────────────────────────────────
const STOREFRONTS: { id: Storefront; en: string; es: string; color: string }[] = [
  { id: 'families',      en: 'For Families',      es: 'Para Familias',       color: '#5BC4F8' },
  { id: 'montessori',    en: 'Learning & Play',   es: 'Aprendizaje y Juego', color: '#2EBB50' },
  { id: 'professionals', en: 'For Professionals', es: 'Para Profesionales',  color: '#C4A800' },
]

// ── Shop by Need ───────────────────────────────────────────────────────────────
const NEEDS = [
  { id: 'sensory',  en: 'Sensory',         es: 'Sensorial',      icon: 'sensory',  color: '#3FB5F5', bg: '#EFF9FF', sf: 'families' as Storefront, cat: 'Sensory' },
  { id: 'comm',     en: 'Communication',   es: 'Comunicación',   icon: 'speech',   color: '#2EBB50', bg: '#EDFAF1', sf: 'families' as Storefront, cat: 'Communication' },
  { id: 'behavior', en: 'Behavior',        es: 'Conducta',       icon: 'timer',    color: '#8B5CF6', bg: '#EDE9FE', sf: 'families' as Storefront, cat: 'Behavior' },
  { id: 'motor',    en: 'Motor Skills',    es: 'Habilidades',    icon: 'hand',     color: '#F97316', bg: '#FFF7ED', sf: 'families' as Storefront, cat: 'Motor' },
  { id: 'books',    en: 'Parent Reads',    es: 'Libros',         icon: 'book',     color: '#D97706', bg: '#FFFBEB', sf: 'families' as Storefront, cat: 'Books' },
  { id: 'safety',   en: 'Safety & GPS',    es: 'Seguridad',      icon: 'shield',   color: '#EF4444', bg: '#FEF2F2', sf: 'families' as Storefront, cat: 'Safety & GPS' },
  { id: 'apparel',  en: 'Sensory Apparel', es: 'Ropa Sensorial', icon: 'shirt',    color: '#EC4899', bg: '#FDF2F8', sf: 'families' as Storefront, cat: 'Apparel' },
  { id: 'play',     en: 'Play & Learning', es: 'Juego',          icon: 'blocks',   color: '#2EBB50', bg: '#EDFAF1', sf: 'montessori' as Storefront, cat: 'All' },
]

// ── Category visual bg ─────────────────────────────────────────────────────────
const CAT_BG: Record<string, string> = {
  'Sensory': '#DDF4FE', 'Communication': '#DBF5E3', 'Behavior': '#EDE9FE',
  'Motor': '#FFEDD5', 'Books': '#FEF3C7', 'Safety & GPS': '#FEE2E2',
  'Apparel': '#FCE7F3', 'Montessori': '#D1FAE5', 'Open-Ended Play': '#FEF9C3',
  'STEM': '#DBEAFE', 'Arts & Music': '#FCE7F3', 'Data Sheets': '#F0FDF4',
  'Clinical Supplies': '#EFF9FF', 'Reference Books': '#FEF3C7', 'Career Tools': '#EDE9FE',
}

const CATS: Record<Storefront, string[]> = {
  families:      ['All', 'Sensory', 'Communication', 'Behavior', 'Motor', 'Books', 'Safety & GPS', 'Apparel'],
  montessori:    ['All', 'Montessori', 'Open-Ended Play', 'STEM', 'Arts & Music', 'Books'],
  professionals: ['All', 'Reference Books', 'Clinical Supplies', 'Career Tools', 'Data Sheets'],
}

// ── Products ───────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // FAMILIES · SENSORY
  { id: 'tt-8', name: 'Time Timer 8-inch', brand: 'Time Timer', description: 'The gold-standard visual timer for ADHD and autism. Shows time passing as a disappearing red disc — no numbers needed. Universally recommended by OTs, BCBAs, and teachers worldwide.', price: '$35–55', storefront: 'families', category: 'Sensory', href: 'https://www.timetimer.com/collections/all', accent: '#5BC4F8', topPick: true, ot: true, bcba: true },
  { id: 'loop-quiet', name: 'Loop Earplugs Quiet', brand: 'Loop', description: 'Stylish, discreet noise-reduction earplugs for sensory sensitivities. Used in school, stores, and public spaces. Loved by families with auditory-sensitive children.', price: '$25–35', storefront: 'families', category: 'Sensory', href: 'https://www.loopearplugs.com', accent: '#5BC4F8', topPick: true, ot: true },
  { id: 'harkla-blanket', name: 'Weighted Blanket for Kids', brand: 'Harkla', description: 'Premium children\'s weighted blanket in 5, 7, and 10 lb options. OT-recommended for sensory regulation and sleep support.', price: '$80–130', storefront: 'families', category: 'Sensory', href: 'https://harkla.co/collections/weighted-blankets', accent: '#5BC4F8', topPick: true, ot: true },
  { id: 'ark-ychew', name: 'Y-Chew & P-Chew Combo', brand: 'ARK Therapeutic', description: 'OT-grade oral motor chew tools in multiple resistance levels. The most trusted brand in the field — repeat-purchase staple for sensory families.', price: '$10–25', storefront: 'families', category: 'Sensory', href: 'https://www.arktherapeutic.com', accent: '#5BC4F8', ot: true },
  { id: 'crazy-aarons', name: 'Thinking Putty (assorted)', brand: "Crazy Aaron's", description: 'The premium thinking putty used by OTs worldwide. High-quality, never dries out, comes in dozens of varieties. A sensory staple.', price: '$14–20', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=Crazy+Aarons+Thinking+Putty', accent: '#5BC4F8', ot: true },
  { id: 'harkla-swing', name: 'Compression Cuddle Swing', brand: 'Harkla', description: 'Indoor sensory swing providing deep-pressure proprioceptive input. Highly recommended for children who seek movement and calming input.', price: '$90–150', storefront: 'families', category: 'Sensory', href: 'https://harkla.co/collections/swings', accent: '#5BC4F8', ot: true },
  { id: 'tangle-jr', name: 'Tangle Jr. Therapy 3-pack', brand: 'Tangle', description: 'Classic fidget tool used in therapy clinics worldwide. Quiet, durable, and non-distracting — perfect for school and home.', price: '$15–25', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=Tangle+Jr+Therapy+fidget', accent: '#5BC4F8' },
  { id: 'bouncyband-cushion', name: 'Wobble Seat Cushion', brand: 'Bouncyband', description: 'Inflatable balance disc for any chair. Provides vestibular input for children who need movement to focus. Discreet enough for school use.', price: '$25–40', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=Bouncyband+wobble+cushion+chair', accent: '#5BC4F8', ot: true },
  { id: 'dohm-white-noise', name: 'Dohm Classic White Noise Machine', brand: 'Yogasleep', description: 'Best-reviewed white noise machine for auditory sensitivities. Real fan-based sound — not digital. Trusted by pediatric sleep specialists for 50+ years.', price: '$50–70', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=Yogasleep+Dohm+Classic+white+noise', accent: '#5BC4F8' },
  { id: 'body-sox', name: 'Body Sox Sensory Body Sock', brand: 'FlagHouse', description: 'Full-body spandex sock providing deep-pressure proprioceptive input. OT-recommended for body awareness, calming, and movement play.', price: '$30–50', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=body+sox+sensory+body+sock+children', accent: '#5BC4F8', ot: true },
  { id: 'liquid-timer', name: 'Liquid Motion Bubble Timer', brand: 'Various', description: 'Calming visual timer — colored liquid cascades through chambers providing a mesmerizing focus tool for calm-down corners and transitions.', price: '$10–25', storefront: 'families', category: 'Sensory', href: 'https://www.amazon.com/s?k=liquid+motion+timer+sensory', accent: '#5BC4F8' },
  // FAMILIES · COMMUNICATION
  { id: 'visual-schedule-kit', name: 'Visual Schedule Velcro Kit', brand: 'Various', description: 'Velcro board with laminated picture cards for morning, school day, and evening routines. Helps children predict and navigate daily transitions.', price: '$25–50', storefront: 'families', category: 'Communication', href: 'https://www.amazon.com/s?k=visual+schedule+kit+autism+velcro', accent: '#5BC4F8', bcba: true },
  { id: 'emotion-cards', name: 'Emotions & Feelings Card Set', brand: 'Learning Resources', description: 'Laminated emotion cards with photographs and feeling-word labels. Build emotional vocabulary and support self-regulation in children ages 3–10.', price: '$15–25', storefront: 'families', category: 'Communication', href: 'https://www.amazon.com/s?k=emotion+feelings+card+set+children', accent: '#5BC4F8', bcba: true },
  { id: 'pecs-cards', name: 'PECS-Style Picture Card Set 200+', brand: 'Various', description: 'Over 200 laminated picture communication cards by category. For families beginning AAC at home or supplementing a school PECS program.', price: '$20–40', storefront: 'families', category: 'Communication', href: 'https://www.amazon.com/s?k=picture+communication+cards+autism+PECS', accent: '#5BC4F8', bcba: true },
  // FAMILIES · BEHAVIOR
  { id: 'hoberman-sphere', name: 'Hoberman Breathing Ball', brand: 'Hoberman', description: 'The classic expanding sphere used to teach belly breathing and calming techniques. Universally used in pediatric therapy for emotional regulation.', price: '$15–25', storefront: 'families', category: 'Behavior', href: 'https://www.amazon.com/s?k=Hoberman+sphere+breathing+ball+children', accent: '#5BC4F8', bcba: true },
  { id: 'token-board-magnetic', name: 'Magnetic Token Board', brand: 'Various', description: 'Laminated magnetic token board with tokens. Core tool for implementing token economy reinforcement systems at home — easy to reset and motivating.', price: '$15–30', storefront: 'families', category: 'Behavior', href: 'https://www.amazon.com/s?k=magnetic+token+board+children+behavior', accent: '#5BC4F8', bcba: true },
  { id: 'tt-mini', name: 'Time Timer Mini', brand: 'Time Timer', description: 'Pocket-sized Time Timer. Perfect for backpacks, travel, and desk use. Same visual countdown disc in a portable form factor for school transitions.', price: '$25–35', storefront: 'families', category: 'Behavior', href: 'https://www.timetimer.com/collections/all', accent: '#5BC4F8', ot: true, bcba: true },
  // FAMILIES · MOTOR
  { id: 'fine-motor-set', name: 'Helping Hands Fine Motor Tool Set', brand: 'Learning Resources', description: 'Tweezers, tongs, and scoops in four sizes for fine motor practice. Sorting and transferring activities build hand strength for writing and self-care.', price: '$15–25', storefront: 'families', category: 'Motor', href: 'https://www.amazon.com/s?k=Learning+Resources+Helping+Hands+fine+motor', accent: '#5BC4F8', ot: true },
  { id: 'pencil-grip', name: 'The Pencil Grip Crossover', brand: 'The Pencil Grip', description: 'OT-recommended pencil grip that promotes proper finger placement for handwriting. Fits standard pencils and crayons.', price: '$6–12', storefront: 'families', category: 'Motor', href: 'https://www.amazon.com/s?k=The+Pencil+Grip+crossover+writing', accent: '#5BC4F8', ot: true },
  { id: 'slant-board', name: 'Writing Slant Board', brand: 'Various', description: 'Adjustable angle clipboard promoting proper wrist positioning for writing. Recommended by OTs for dysgraphia, low tone, and attention difficulties.', price: '$20–40', storefront: 'families', category: 'Motor', href: 'https://www.amazon.com/s?k=slant+board+writing+children+OT', accent: '#5BC4F8', ot: true },
  // FAMILIES · BOOKS
  { id: 'explosive-child', name: 'The Explosive Child', brand: 'Ross W. Greene, PhD', description: 'Foundational text on collaborative problem-solving for challenging behavior. Changed how thousands of parents understand their children. A must-read.', price: '$15–20', storefront: 'families', category: 'Books', href: 'https://bookshop.org/search?keywords=The+Explosive+Child+Greene', accent: '#5BC4F8', topPick: true },
  { id: 'beyond-behaviors', name: 'Beyond Behaviors', brand: 'Mona Delahooke, PhD', description: 'A neuroscience-based approach to understanding why children behave the way they do. Shifts parents from punishment to curiosity.', price: '$15–20', storefront: 'families', category: 'Books', href: 'https://bookshop.org/search?keywords=Beyond+Behaviors+Delahooke', accent: '#5BC4F8' },
  { id: 'whole-brain-child', name: 'The Whole-Brain Child', brand: 'Siegel & Bryson', description: '12 revolutionary strategies to nurture your child\'s developing mind. Blends neuroscience and parenting in an accessible, practical way.', price: '$15–20', storefront: 'families', category: 'Books', href: 'https://bookshop.org/search?keywords=The+Whole+Brain+Child+Siegel+Bryson', accent: '#5BC4F8' },
  { id: 'uniquely-human', name: 'Uniquely Human', brand: 'Barry Prizant, PhD', description: 'A compassionate reframing of autism as a different way of experiencing the world — not a disorder to fix. Loved by families and autistic adults alike.', price: '$16–20', storefront: 'families', category: 'Books', href: 'https://bookshop.org/search?keywords=Uniquely+Human+Prizant', accent: '#5BC4F8' },
  { id: 'ten-things-autism', name: 'Ten Things Every Child with Autism Wishes You Knew', brand: 'Ellen Notbohm', description: 'One of the most widely recommended books for newly-diagnosed families. Warm, practical, and immediately relatable.', price: '$14–18', storefront: 'families', category: 'Books', href: 'https://bookshop.org/search?keywords=Ten+Things+Every+Child+Autism+Notbohm', accent: '#5BC4F8' },
  // FAMILIES · SAFETY
  { id: 'angelsense', name: 'AngelSense GPS Tracker', brand: 'AngelSense', description: 'GPS watch designed specifically for families of children with autism and wandering risk. Real-time tracking, listen-in audio, and instant alerts.', price: '$199 + plan', storefront: 'families', category: 'Safety & GPS', href: 'https://www.angelsense.com', accent: '#5BC4F8', topPick: true },
  { id: 'airtag-bundle', name: 'AirTag + Backpack Clip Case', brand: 'Apple / Various', description: 'Apple AirTag with a durable backpack clip case. Budget-friendly location tracking for school bags, jackets, and belt loops.', price: '$30–50', storefront: 'families', category: 'Safety & GPS', href: 'https://www.amazon.com/s?k=apple+airtag+kids+backpack+case', accent: '#5BC4F8' },
  { id: 'door-alarm', name: 'Door & Window Alert System', brand: 'GE', description: 'Simple wireless door and window chime alarms for families with children who wander. Instant audio alert when any door or window opens.', price: '$20–40', storefront: 'families', category: 'Safety & GPS', href: 'https://www.amazon.com/s?k=GE+door+window+alarm+chime+child+safety', accent: '#5BC4F8' },
  // FAMILIES · APPAREL
  { id: 'calm-wear-shirt', name: 'Compression Shirt', brand: 'Calm Wear', description: 'Proprioceptive compression shirt for everyday wear. Calming deep-pressure input under regular clothing — invisible sensory support at school and home.', price: '$35–50', storefront: 'families', category: 'Apparel', href: 'https://www.calmwear.com', accent: '#5BC4F8', ot: true },
  { id: 'smartknit-socks', name: 'SeamFree Socks', brand: 'SmartKnitKIDS', description: 'Completely seamless socks for children with tactile hypersensitivity. One of the most-requested items by families of sensory-sensitive children.', price: '$10–20', storefront: 'families', category: 'Apparel', href: 'https://www.amazon.com/s?k=SmartKnitKIDS+seamless+socks', accent: '#5BC4F8' },
  { id: 'tommy-adaptive', name: 'Tommy Adaptive Line', brand: 'Tommy Hilfiger', description: 'Adaptive clothing with magnetic closures, one-handed buttons, and sensory-friendly fabrics. Full line for kids and adults.', price: '$25–80', storefront: 'families', category: 'Apparel', href: 'https://www.amazon.com/s?k=Tommy+Hilfiger+Adaptive+kids', accent: '#5BC4F8' },
  // LEARNING & PLAY
  { id: 'magna-tiles', name: 'Magna-Tiles 32-Piece Starter Set', brand: 'Magna-Tiles', description: 'The original magnetic tile set. Open-ended building for ages 3–12. STEM, creativity, and spatial reasoning in one beloved toy.', price: '$60–120', storefront: 'montessori', category: 'Open-Ended Play', href: 'https://www.amazon.com/s?k=Magna-Tiles+32+piece+starter+set', accent: '#2EBB50', topPick: true },
  { id: 'lovevery-kit', name: 'Lovevery Play Kit Subscription', brand: 'Lovevery', description: 'Stage-based developmental play kits delivered every 2–3 months from birth through age 4. Expert-designed by child development specialists.', price: '$80–120/box', storefront: 'montessori', category: 'Montessori', href: 'https://lovevery.com/products/the-play-kits', accent: '#2EBB50', topPick: true },
  { id: 'grapat-loose-parts', name: 'Grapat Loose Parts Set', brand: 'Grapat', description: 'Premium Spanish wooden loose parts in natural dyes. Gold standard for open-ended Montessori play and sorting. Beloved worldwide.', price: '$30–80', storefront: 'montessori', category: 'Open-Ended Play', href: 'https://www.amazon.com/s?k=Grapat+loose+parts+wooden', accent: '#2EBB50' },
  { id: 'grimms-rainbow', name: 'Rainbow Stacker', brand: "Grimm's", description: 'Iconic German wooden rainbow stacker — open-ended building, stacking, and imaginative play. Sustainably sourced linden wood, non-toxic dyes.', price: '$60–120', storefront: 'montessori', category: 'Open-Ended Play', href: 'https://www.amazon.com/s?k=Grimms+rainbow+stacker+wooden', accent: '#2EBB50' },
  { id: 'object-permanence', name: 'Object Permanence Box', brand: 'Various / Etsy Makers', description: 'Classic Montessori infant material. A wooden ball drops into a box and reappears through a drawer — teaching object permanence at 8–12 months.', price: '$25–50', storefront: 'montessori', category: 'Montessori', href: 'https://www.amazon.com/s?k=Montessori+object+permanence+box+wooden', accent: '#2EBB50' },
  { id: 'sandpaper-letters', name: 'Sandpaper Letters (Print)', brand: 'Various', description: 'Montessori sandpaper letter tiles — children trace each letter while saying its phonetic sound, linking tactile, auditory, and visual learning.', price: '$30–80', storefront: 'montessori', category: 'Montessori', href: 'https://www.amazon.com/s?k=Montessori+sandpaper+letters+print', accent: '#2EBB50' },
  { id: 'pink-tower', name: 'Pink Tower', brand: 'Various', description: 'Ten wooden pink cubes graded in size. Foundational Montessori sensorial material developing discrimination of size, order, and concentration.', price: '$30–60', storefront: 'montessori', category: 'Montessori', href: 'https://www.amazon.com/s?k=Montessori+pink+tower+wooden', accent: '#2EBB50' },
  { id: 'learning-tower', name: 'Learning Tower Kitchen Helper', brand: 'Little Partners', description: 'Adjustable toddler tower bringing children safely to counter height for practical life activities — cooking, washing, setting the table.', price: '$130–250', storefront: 'montessori', category: 'Montessori', href: 'https://www.amazon.com/s?k=learning+tower+kitchen+helper+toddler', accent: '#2EBB50' },
  { id: 'cubetto', name: 'Cubetto Coding Robot (Screen-Free)', brand: 'Primo Toys', description: 'Award-winning screen-free coding toy for ages 3+. Children program a wooden robot by arranging physical blocks on a board.', price: '$200–300', storefront: 'montessori', category: 'STEM', href: 'https://www.primotoys.com', accent: '#2EBB50' },
  { id: 'snap-circuits', name: 'Snap Circuits Jr. (100 projects)', brand: 'Elenco', description: 'Electronics kit for ages 8+ — build real working circuits with snap-together components. No soldering required. 20 years of awards.', price: '$30–80', storefront: 'montessori', category: 'STEM', href: 'https://www.amazon.com/s?k=Snap+Circuits+Jr+electronics+kit', accent: '#2EBB50' },
  { id: 'national-geo-kits', name: 'National Geographic Science Kits', brand: 'National Geographic', description: 'Crystal growing, gemstone dig, volcano, and slime kits. High engagement, curriculum-aligned, great for reluctant learners.', price: '$20–50', storefront: 'montessori', category: 'STEM', href: 'https://www.amazon.com/s?k=National+Geographic+science+kit+kids', accent: '#2EBB50' },
  { id: 'stockmar-crayons', name: 'Beeswax Block Crayons', brand: 'Stockmar', description: 'Premium German beeswax crayons beloved by educators. Rich pigment, perfect grip for small hands, completely non-toxic.', price: '$25–40', storefront: 'montessori', category: 'Arts & Music', href: 'https://www.amazon.com/s?k=Stockmar+beeswax+block+crayons', accent: '#2EBB50' },
  { id: 'kala-ukulele', name: 'Ukulele Starter Bundle', brand: 'Kala', description: 'Beginner ukulele for children from age 5. Includes online lessons, tuner, and carry bag. Builds musical confidence from the first day.', price: '$50–80', storefront: 'montessori', category: 'Arts & Music', href: 'https://www.amazon.com/s?k=Kala+ukulele+kids+starter+bundle', accent: '#2EBB50' },
  { id: 'mo-willems-box', name: 'Mo Willems Collection (8 books)', brand: 'Mo Willems', description: 'The beloved Elephant & Piggie and Pigeon series — perfect for emerging readers. Builds social-emotional skills through humor and relatable characters.', price: '$25–40', storefront: 'montessori', category: 'Books', href: 'https://bookshop.org/search?keywords=Mo+Willems+Elephant+Piggie', accent: '#2EBB50' },
  // PROFESSIONALS
  { id: 'cooper-aba-textbook', name: 'Applied Behavior Analysis (3rd Ed.)', brand: 'Cooper, Heron & Heward', description: 'The definitive ABA textbook — used in every BCBA training program. Essential for every ABA professional\'s shelf.', price: '$130–180', storefront: 'professionals', category: 'Reference Books', href: 'https://www.amazon.com/s?k=Cooper+Heron+Heward+Applied+Behavior+Analysis+3rd', accent: '#C4A800', topPick: true, bcba: true },
  { id: 'tt-professional', name: 'Time Timer Plus 20-min', brand: 'Time Timer', description: 'Professional-grade Time Timer for clinical use — 20-minute range, durable housing, clean face ideal for session work.', price: '$40–60', storefront: 'professionals', category: 'Clinical Supplies', href: 'https://www.timetimer.com', accent: '#C4A800' },
  { id: 'bulk-fidgets', name: 'Reinforcer Starter Pack (50-piece)', brand: 'Various / Bulk', description: 'Mixed assortment of 50 small fidgets, pop tubes, and tactile toys for RBT reinforcement bins. Ready to use on day one.', price: '$30–60', storefront: 'professionals', category: 'Clinical Supplies', href: 'https://www.amazon.com/s?k=fidget+assortment+bulk+50+pieces+therapy', accent: '#C4A800' },
  { id: 'interval-timer', name: 'Interval Timer for Data Collection', brand: 'GymNext / Various', description: 'Programmable interval timer for partial-interval, whole-interval, and momentary time sampling. Silent vibration mode available.', price: '$20–40', storefront: 'professionals', category: 'Clinical Supplies', href: 'https://www.amazon.com/s?k=interval+timer+data+collection+vibrate+ABA', accent: '#C4A800', bcba: true },
  { id: 'ethics-van-houten', name: 'Ethics for Behavior Analysts', brand: 'Van Houten & Bailey', description: 'Companion ethics text aligned with the BACB Professional and Ethical Compliance Code. Essential for BCBAs and supervision coursework.', price: '$50–80', storefront: 'professionals', category: 'Reference Books', href: 'https://bookshop.org/search?keywords=Ethics+for+Behavior+Analysts+Van+Houten', accent: '#C4A800', bcba: true },
  { id: 'smart-scattered', name: 'Smart but Scattered', brand: 'Dawson & Guare', description: 'The definitive guide to executive function skills. Practical strategies for ADHD and weak executive skills — great for parent library and RBT reference.', price: '$15–20', storefront: 'professionals', category: 'Reference Books', href: 'https://bookshop.org/search?keywords=Smart+but+Scattered+Dawson+Guare', accent: '#C4A800' },
  { id: 'rbt-resume', name: 'RBT Resume & Interview Guide', brand: 'Light2Minds', description: 'Professionally designed resume template for RBT and BCBA roles + 30 common interview questions with coached answers.', price: '$15–25', storefront: 'professionals', category: 'Career Tools', href: '#coming-soon', accent: '#C4A800' },
  { id: 'career-map', name: 'ABA Career Pathway Map', brand: 'Light2Minds', description: 'Visual career progression guide from RBT → BCaBA → BCBA — education, fieldwork, supervision, and exam requirements at each level.', price: '$12', storefront: 'professionals', category: 'Career Tools', href: '#coming-soon', accent: '#C4A800' },
]

// ── Bundles ─────────────────────────────────────────────────────────────────────
const BUNDLES: Bundle[] = [
  { id: 'just-diagnosed', name: 'Just Diagnosed Starter Kit', tagline: 'Everything you need on day one.', description: 'A carefully assembled first-response kit for newly diagnosed families — curated by BCBAs and OTs, with a guidance booklet included.', contents: ['Weighted lap pad', 'Time Timer Mini', '5 fidget tools', 'Loop Quiet earplugs', 'Feelings chart', 'Calm-down jar kit', 'L2M family guide'], price: '$89', accent: '#5BC4F8', need: 'Sensory' },
  { id: 'calm-corner', name: 'Calm Corner Kit', tagline: 'A designated space to reset.', description: 'Everything needed to create a dedicated calm-down space at home or school, designed for children who need sensory breaks.', contents: ['Floor cushion', 'Sensory bottle kit', 'Hoberman breathing ball', 'Fidget bundle', 'Visual coping cards', 'Setup guide'], price: '$129', accent: '#2EBB50', need: 'Behavior' },
  { id: 'iep-prep', name: 'IEP Prep Kit', tagline: 'Walk in prepared and confident.', description: 'Everything a parent needs to navigate their child\'s IEP meeting — organized, printed, and ready to use.', contents: ['IEP binder', 'Meeting prep packet', 'Rights checklist', 'Goal tracker worksheet', 'Pens + sticky tabs'], price: '$45', accent: '#FFE030', need: 'Communication' },
  { id: 'school-year', name: 'School Year Sensory Kit', tagline: 'Sensory support that fits in a backpack.', description: 'School-appropriate sensory tools that go to class and come home — discreet, effective, and classroom-ready.', contents: ['Wobble cushion', 'School-discreet fidget set', 'Slant board', 'Pencil grips (3)', 'Visual transition cards'], price: '$75', accent: '#5BC4F8', need: 'Motor' },
  { id: 'sleep-reset', name: 'Sleep Reset Kit', tagline: 'Calmer nights for the whole family.', description: 'A clinician-curated sleep support bundle for children with sensory and regulation challenges.', contents: ['Weighted blanket (size at checkout)', 'Yogasleep Dohm white noise machine', 'Blackout curtain cover', 'Bedtime visual schedule printable'], price: '$95', accent: '#2EBB50', need: 'Sensory' },
  { id: 'daily-living', name: 'Daily Living Skills Bundle', tagline: 'Building independence, one routine at a time.', description: 'Practical tools for building independence in everyday self-care and household routines.', contents: ['Adaptive utensil set', 'Laminated routine charts (AM + PM)', 'Token board', 'Toileting visual sequence cards'], price: '$65', accent: '#FFE030', need: 'Behavior' },
]

// ── Digital Products ────────────────────────────────────────────────────────────
const DIGITALS: Digital[] = [
  { id: 'dp-visual-schedule', name: 'Visual Schedule Printable Pack', description: 'Morning, school, and evening visual schedule cards in 4 themes — print, laminate, and use the same day.', price: '$12', pages: '28 pages' },
  { id: 'dp-iep-organizer', name: 'IEP Organizer (40+ pages)', description: 'Complete printable IEP binder system — meeting tracker, rights checklist, goal log, provider contact sheet, and more.', price: '$19', pages: '42 pages' },
  { id: 'dp-behavior-charts', name: 'Behavior Chart & Token Board Bundle', description: 'Ten editable behavior charts + 6 token board designs for home and classroom use. Edit in Canva or print as-is.', price: '$12', pages: '16 designs' },
  { id: 'dp-funding-guide', name: 'Family Funding Guide', description: 'Premium guide to financial resources and funding programs for families — with step-by-step application instructions.', price: '$19', pages: '20 pages' },
  { id: 'dp-communication', name: 'Communication Card Starter Pack', description: '120 PECS-style picture communication cards covering daily routines, food, emotions, and requests. Print and laminate.', price: '$15', pages: '120 cards' },
  { id: 'dp-calm-corner', name: 'Calm Corner Printables Set', description: 'Visual coping strategies, breathing cards, feelings thermometer, and calming menu — ready to print and post.', price: '$9', pages: '12 pages' },
  { id: 'dp-reinforcer', name: 'Preference Assessment & Reinforcer Menu', description: 'BCBA-designed preference assessment forms + reinforcer menu templates for home and clinic use.', price: '$12', pages: '10 forms' },
  { id: 'dp-full-bundle', name: 'Full Digital Family Bundle', description: 'Every printable in the digital library — all 7 products at one bundled price. Best value for families who want it all.', price: '$79' },
]

// ── Icon helpers ─────────────────────────────────────────────────────────────────
function NeedIcon({ type, size = 22, color }: { type: string; size?: number; color: string }) {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (type) {
    case 'sensory':  return <svg {...s}><path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M8 12a4 4 0 0 0 8 0"/><path d="M12 16v4"/><path d="M9 20h6"/></svg>
    case 'speech':   return <svg {...s}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>
    case 'timer':    return <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    case 'hand':     return <svg {...s}><path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
    case 'book':     return <svg {...s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    case 'shield':   return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
    case 'shirt':    return <svg {...s}><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>
    case 'blocks':   return <svg {...s}><rect x="2" y="3" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="8" rx="1"/><rect x="2" y="13" width="8" height="8" rx="1"/><rect x="14" y="13" width="8" height="8" rx="1"/></svg>
    default:         return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>
  }
}

function CatIcon({ cat, size = 38 }: { cat: string; size?: number }) {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (cat) {
    case 'Sensory': case 'Clinical Supplies': return <svg {...s}><path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M8 12a4 4 0 0 0 8 0"/><path d="M12 16v4"/><path d="M9 20h6"/></svg>
    case 'Communication': return <svg {...s}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    case 'Behavior': return <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    case 'Motor': return <svg {...s}><path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
    case 'Books': case 'Reference Books': return <svg {...s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    case 'Safety & GPS': return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'Apparel': return <svg {...s}><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>
    case 'Montessori': case 'Open-Ended Play': return <svg {...s}><rect x="2" y="3" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="8" rx="1"/><rect x="2" y="13" width="8" height="8" rx="1"/><rect x="14" y="13" width="8" height="8" rx="1"/></svg>
    case 'STEM': return <svg {...s}><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
    case 'Arts & Music': return <svg {...s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    case 'Data Sheets': return <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    case 'Career Tools': return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
    default: return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>
  }
}

// ── Accent color helpers ──────────────────────────────────────────────────────
const accentText = (a: string) => a === '#C4A800' ? '#A37F00' : a === '#FFE030' ? '#9A7A00' : a

// ── Main component ─────────────────────────────────────────────────────────────
export default function ShopPage() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  const [storefront, setStorefront] = useState<Storefront>('families')
  const [category,   setCategory]   = useState('All')
  const [search,     setSearch]     = useState('')

  const activeSF = STOREFRONTS.find(s => s.id === storefront)!

  const handleStorefront = (sf: Storefront) => { setStorefront(sf); setCategory('All'); setSearch('') }
  const handleNeed = (n: typeof NEEDS[0]) => { setStorefront(n.sf); setCategory(n.cat); setSearch(''); document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' }) }

  const filtered = useMemo(() => {
    let pool = PRODUCTS.filter(p => p.storefront === storefront)
    if (category !== 'All') pool = pool.filter(p => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      pool = pool.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return [...pool].sort((a, b) => (b.topPick ? 1 : 0) - (a.topPick ? 1 : 0))
  }, [storefront, category, search])

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="pt-28 pb-0 lg:pt-36 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-12 lg:pb-16">

            {/* Left */}
            <motion.div {...up()}>
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-navy-700/45 mb-5">
                <span className="block w-5 h-px bg-current" />
                {tx('The Light2Minds Shop', 'La Tienda Light2Minds')}
              </p>
              <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-navy-900 leading-[1.04] tracking-[-0.03em] mb-5">
                {tx('Every product here was chosen for your child.', 'Cada producto fue elegido pensando en tu hijo.')}
              </h1>
              <p className="text-[16px] text-navy-800/55 leading-relaxed mb-8 max-w-lg">
                {tx(
                  'Clinically reviewed by BCBAs and occupational therapists. Parent-tested. Curated for autism, ADHD, sensory needs, communication challenges, and developmental support.',
                  'Revisado clínicamente por BCBAs y terapeutas ocupacionales. Probado por familias. Curado para autismo, TDAH, necesidades sensoriales y apoyo al desarrollo.'
                )}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { label: tx('BCBA Reviewed', 'Revisado por BCBA'), color: '#5BC4F8' },
                  { label: tx('OT Approved', 'Aprobado por TO'), color: '#2EBB50' },
                  { label: tx('No Filler', 'Sin Relleno'), color: '#C4A800' },
                  { label: tx('Clinician Curated', 'Curado por Clínicos'), color: '#8B5CF6' },
                ].map(b => (
                  <span key={b.label}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: b.color + '18', color: b.color === '#C4A800' ? '#A37F00' : b.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: b.color === '#C4A800' ? '#A37F00' : b.color }} />
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Affiliate note */}
              <div className="inline-flex items-start gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 max-w-md">
                <svg className="w-3.5 h-3.5 flex-shrink-0 mt-[1px] text-navy-800/30" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="6"/><path d="M7 5v4M7 4v.5"/></svg>
                <p className="text-[11.5px] text-navy-800/50 leading-snug">
                  {tx('We may earn a commission on purchases at no extra cost to you. This supports the free operation of Light2Minds.', 'Podemos ganar una comisión en compras sin costo adicional para ti. Esto apoya la operación gratuita de Light2Minds.')}
                </p>
              </div>
            </motion.div>

            {/* Right — Featured Kit spotlight */}
            <motion.div {...up(0.12)}>
              <div className="relative rounded-3xl overflow-hidden border border-sky-200/60 bg-white shadow-xl shadow-sky-100/40">
                {/* Top color band */}
                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #5BC4F8, #2EBB50)' }} />
                <div className="p-7 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#5BC4F8' }}>
                      {tx('Featured Kit', 'Kit Destacado')}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-navy-800/35">
                      {tx('Curated by BCBAs & OTs', 'Curado por BCBAs y TOs')}
                    </span>
                  </div>
                  <h2 className="text-[20px] font-bold text-navy-900 leading-tight mb-2">
                    {tx('Just Diagnosed Starter Kit', 'Kit de Inicio Para Familias con Diagnóstico Reciente')}
                  </h2>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed mb-5">
                    {tx('A carefully assembled first-response kit for newly diagnosed families — curated by clinicians, with a family guidance booklet included.', 'Un kit de primera respuesta cuidadosamente ensamblado para familias recién diagnosticadas — curado por clínicos con una guía familiar incluida.')}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Weighted lap pad', 'Time Timer Mini', '5 fidget tools', 'Loop Quiet earplugs', 'Feelings chart', 'L2M family guide'].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-navy-800/60">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5BC4F8' + '20' }}>
                          <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none" stroke="#5BC4F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4L3.5 6.5L9 1"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                    <div>
                      <p className="text-[11px] text-navy-800/35 mb-0.5">{tx('Kit price', 'Precio del kit')}</p>
                      <p className="text-[24px] font-bold text-navy-900 leading-none">$89</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-6 py-3 rounded-full opacity-70 cursor-not-allowed">
                      {tx('Coming Soon', 'Próximamente')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY NEED ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-7">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-1">
              {tx('Shop by Need', 'Comprar por Necesidad')}
            </p>
            <h2 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-navy-900 tracking-[-0.02em]">
              {tx("What does your child need most right now?", "¿Qué necesita tu hijo más ahora?")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {NEEDS.map((n, i) => (
              <motion.button
                key={n.id}
                {...up(i * 0.04)}
                onClick={() => handleNeed(n)}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-stone-100 bg-white hover:border-transparent hover:shadow-md transition-all duration-200 text-center"
                style={{ '--hover-bg': n.bg } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = n.bg)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: n.bg }}>
                  <NeedIcon type={n.icon} size={20} color={n.color} />
                </span>
                <span className="text-[11.5px] font-semibold text-navy-800/70 leading-tight group-hover:text-navy-900">
                  {lang === 'es' ? n.es : n.en}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY STOREFRONT TABS ────────────────────────────────────────────── */}
      <div className="sticky top-[66px] z-30 bg-white border-b border-stone-200 shadow-sm shadow-stone-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex">
            {STOREFRONTS.map(sf => {
              const active = storefront === sf.id
              return (
                <button
                  key={sf.id}
                  onClick={() => handleStorefront(sf.id)}
                  className="flex-1 relative py-4 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-200"
                  style={{ color: active ? sf.color === '#FFE030' ? '#9A7A00' : sf.color : '' }}
                >
                  <span className={active ? '' : 'text-navy-500/50 hover:text-navy-800'}>
                    {lang === 'es' ? sf.es : sf.en}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="sf-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: sf.color === '#FFE030' ? '#C4A800' : sf.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER + SEARCH ──────────────────────────────────────────── */}
      <div style={{ backgroundColor: CREAM }} className="border-b border-stone-200/50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-0.5 flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
            {CATS[storefront].map(cat => {
              const active = category === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="flex-shrink-0 text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150 border"
                  style={active
                    ? { backgroundColor: activeSF.color === '#FFE030' ? '#C4A800' : activeSF.color, color: '#fff', borderColor: 'transparent' }
                    : { backgroundColor: '#fff', color: '#4a5568', borderColor: '#e2e8f0' }
                  }
                >
                  {cat}
                </button>
              )
            })}
          </div>
          <div className="relative flex-shrink-0 sm:w-60">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-navy-800/30" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="4.5"/><path d="M10 10l2.5 2.5"/></svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={tx('Search products…', 'Buscar productos…')}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-[13px] bg-white placeholder-navy-800/25 outline-none focus:border-navy-300 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────────────────────────────── */}
      <section id="product-grid" className="bg-white py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Result count */}
          {search && (
            <p className="text-[13px] text-navy-800/40 mb-6">
              {filtered.length} {tx('products found', 'productos encontrados')}
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[15px] text-navy-800/35">{tx('No products found.', 'No se encontraron productos.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => {
                const catBg = CAT_BG[p.category] || '#F0F4F8'
                const isComingSoon = p.href.startsWith('#')
                const textColor = accentText(p.accent)

                return (
                  <motion.div key={p.id} {...up(Math.min(i, 5) * 0.06)}>
                    <a
                      href={isComingSoon ? undefined : p.href}
                      target={isComingSoon ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      onClick={isComingSoon ? e => e.preventDefault() : undefined}
                      className={[
                        'group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-100 transition-all duration-200',
                        isComingSoon ? 'cursor-default' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/50 hover:border-stone-200',
                      ].join(' ')}
                    >
                      {/* Visual zone */}
                      <div className="relative h-40 flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ backgroundColor: catBg }}>
                        {/* Decorative circle */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <div className="w-48 h-48 rounded-full" style={{ backgroundColor: p.accent }} />
                        </div>
                        {/* Icon */}
                        <div className="relative z-10 opacity-50" style={{ color: p.accent === '#C4A800' ? '#A37F00' : p.accent }}>
                          <CatIcon cat={p.category} size={44} />
                        </div>
                        {/* Brand badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold text-navy-800/40 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            {p.brand}
                          </span>
                        </div>
                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                          {p.topPick && (
                            <span className="text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: p.accent === '#C4A800' ? '#A37F00' : p.accent }}>
                              {tx('Top Pick', 'Top Pick')}
                            </span>
                          )}
                          {p.bcba && (
                            <span className="text-[9px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full bg-white/80 text-navy-800/55">
                              BCBA ✓
                            </span>
                          )}
                          {p.ot && !p.bcba && (
                            <span className="text-[9px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full bg-white/80 text-navy-800/55">
                              OT ✓
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Category tag */}
                        <span className="inline-block text-[10px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: textColor }}>
                          {p.category}
                        </span>
                        <h3 className="text-[15px] font-bold text-navy-900 leading-snug mb-3">
                          {p.name}
                        </h3>
                        <p className="text-[12.5px] text-navy-800/50 leading-relaxed flex-1 mb-5">
                          {p.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                          <span className="text-[15px] font-bold text-navy-900">{p.price}</span>
                          {isComingSoon ? (
                            <span className="text-[11px] font-semibold text-navy-800/30 px-3 py-1.5 rounded-full bg-stone-100">
                              {tx('Coming Soon', 'Próximamente')}
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-150 group-hover:opacity-100 opacity-80"
                              style={{ backgroundColor: (p.accent === '#C4A800' ? '#A37F00' : p.accent) + '18', color: textColor }}
                            >
                              {tx('Shop Now', 'Ver')}
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M5 2h5v5"/></svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── SIGNATURE KITS ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="py-16 lg:py-24 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
              <span className="w-5 h-px bg-current" />
              {tx('Light2Minds Signature Kits', 'Kits Light2Minds')}
            </p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {tx('Clinician-curated kits. Ready to use.', 'Kits curados por clínicos. Listos para usar.')}
            </h2>
            <p className="text-[15px] text-navy-800/45 mt-3 max-w-xl">
              {tx(
                'Every kit is assembled by our clinical team — more value than buying individually, with guidance included.',
                'Cada kit es ensamblado por nuestro equipo clínico — más valor que comprar por separado, con orientación incluida.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUNDLES.map((b, i) => (
              <motion.div key={b.id} {...up(i * 0.07)}>
                <div className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-0.5 transition-all duration-200">
                  {/* Colored top band */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: b.accent === '#FFE030' ? '#C4A800' : b.accent }} />
                  <div className="flex flex-col flex-1 p-7">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-[15px] font-bold text-navy-900 leading-snug flex-1">{b.name}</h3>
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: (b.accent === '#FFE030' ? '#C4A800' : b.accent) + '18' }}
                      >
                        <span style={{ color: b.accent === '#FFE030' ? '#9A7A00' : b.accent, fontSize: 13 }}>✦</span>
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold mb-3" style={{ color: b.accent === '#FFE030' ? '#9A7A00' : b.accent }}>
                      {b.tagline}
                    </p>
                    <p className="text-[13px] text-navy-800/50 leading-relaxed mb-5">{b.description}</p>
                    <div className="mb-6 flex-1">
                      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-navy-800/30 mb-2.5">{tx("What's included", 'Qué incluye')}</p>
                      <ul className="space-y-1.5">
                        {b.contents.map(item => (
                          <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-navy-800/55">
                            <span className="w-1 h-1 rounded-full flex-shrink-0 mt-[6px]" style={{ backgroundColor: b.accent === '#FFE030' ? '#C4A800' : b.accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                      <div>
                        <p className="text-[10px] text-navy-800/30 mb-0.5">{tx('Kit price', 'Precio')}</p>
                        <span className="text-[20px] font-bold text-navy-900">{b.price}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-navy-800/35 px-4 py-2 rounded-full border border-stone-200 cursor-not-allowed">
                        {tx('Coming Soon', 'Próximamente')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIGITAL DOWNLOADS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
              <span className="w-5 h-px" style={{ backgroundColor: '#2EBB50' }} />
              {tx('Instant Downloads', 'Descargas Instantáneas')}
            </p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {tx('Printable tools. Ready in seconds.', 'Herramientas imprimibles. Listas en segundos.')}
            </h2>
            <p className="text-[15px] text-navy-800/45 mt-3 max-w-lg">
              {tx('Download, print, and use the same day. Designed by our clinical team for families and educators.', 'Descarga, imprime y usa el mismo día. Diseñado por nuestro equipo clínico.')}
            </p>
          </motion.div>

          {/* Free AAC Board — featured */}
          <motion.div {...up()} className="mb-8">
            <div className="rounded-3xl overflow-hidden border border-forest-200/60 bg-forest-50/40 flex flex-col sm:flex-row">
              <div className="sm:w-52 lg:w-64 flex-shrink-0 bg-white border-b sm:border-b-0 sm:border-r border-forest-100 flex items-center justify-center p-5">
                <Image
                  src="/aac-communication-board.jpg"
                  alt="AAC Core Vocabulary Communication Board"
                  width={280} height={210}
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-forest-100 text-forest-700">AAC</span>
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>
                      {tx('FREE', 'GRATIS')}
                    </span>
                    <span className="text-[10px] font-semibold text-navy-800/35">{tx('No account required', 'Sin cuenta requerida')}</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-navy-900 leading-snug mb-2">
                    {tx('AAC Core Vocabulary Communication Board', 'Tablero de Comunicación AAC — Vocabulario Central')}
                  </h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed max-w-lg">
                    {tx(
                      'Full-color, print-ready board with 80+ high-frequency words and visual symbols. For verbal and non-verbal learners — use at home, school, or in therapy.',
                      'Tablero a color listo para imprimir con más de 80 palabras de alta frecuencia con símbolos visuales.'
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <a
                    href="/aac-communication-board.jpg"
                    download="AAC-Core-Vocabulary-Board-Light2Minds.jpg"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-[1px]"
                    style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}
                  >
                    {tx('Download Free', 'Descargar Gratis')}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1v8M4 6l3 3 3-3M2 11h10"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Digital grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIGITALS.map((d, i) => (
              <motion.div key={d.id} {...up(i * 0.05)}>
                <div
                  className={[
                    'group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-200',
                    d.id === 'dp-full-bundle'
                      ? 'border-forest-200 sm:col-span-2 lg:col-span-2'
                      : 'border-stone-100 hover:shadow-lg hover:shadow-stone-200/40 hover:-translate-y-0.5',
                  ].join(' ')}
                  style={{ backgroundColor: d.id === 'dp-full-bundle' ? '#EDFAF1' : CREAM }}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: d.id === 'dp-full-bundle' ? '#2EBB50' : 'rgba(46,187,80,0.3)' }} />
                  <div className="flex flex-col flex-1 p-5">
                    {/* Download icon */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ backgroundColor: d.id === 'dp-full-bundle' ? '#2EBB50' : 'rgba(46,187,80,0.12)' }}>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke={d.id === 'dp-full-bundle' ? '#fff' : '#2EBB50'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 1v9M5 7l3 3 3-3M2 12h12"/>
                      </svg>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-[13.5px] font-bold text-navy-900 leading-snug flex-1">{d.name}</h3>
                      {d.pages && (
                        <span className="flex-shrink-0 text-[9px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full bg-forest-100 text-forest-700 mt-0.5">
                          {d.pages}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-navy-800/50 leading-relaxed flex-1 mb-4">{d.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-200/60">
                      <span className="text-[15px] font-bold text-navy-900">{d.price}</span>
                      <span className="text-[11px] font-semibold text-navy-800/30 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200">
                        {tx('Coming Soon', 'Próximamente')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERT CTA ────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="py-16 lg:py-24 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="bg-navy-900 rounded-3xl px-8 py-12 lg:px-16 lg:py-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-4">
                {tx('Not sure where to start?', '¿No sabes por dónde empezar?')}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
                {tx('Tell us about your child. We\'ll point you in the right direction.', 'Cuéntanos sobre tu hijo. Te orientamos hacia los recursos correctos.')}
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-lg">
                {tx(
                  'Our team includes BCBAs and occupational therapists who genuinely love helping families find the right tools. Reach out — no sales pitch, just guidance.',
                  'Nuestro equipo incluye BCBAs y terapeutas ocupacionales que aman ayudar a las familias. Escríbenos — solo orientación, sin ventas.'
                )}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <a
                href="mailto:info@light2minds.com"
                className="inline-flex items-center justify-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-7 py-3.5 rounded-full hover:bg-gold-300 transition-colors duration-200"
              >
                {tx('Email Us', 'Escríbenos')}
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3l6 4 6-4"/><rect x="1" y="3" width="12" height="8" rx="1"/></svg>
              </a>
              <p className="text-[11px] text-white/30 text-center lg:text-center">
                info@light2minds.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DISCLOSURE ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-8 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] text-navy-800/35 leading-relaxed max-w-3xl">
            <span className="font-semibold text-navy-800/45">Affiliate Disclosure:</span>{' '}
            Light2Minds participates in affiliate advertising programs. Links marked &ldquo;Shop Now&rdquo; may earn us a small commission at no additional cost to you. We only recommend products that have been reviewed or used by behavioral health professionals. Product recommendations are not clinical endorsements and do not constitute medical advice.
          </p>
        </div>
      </section>

    </main>
  )
}
