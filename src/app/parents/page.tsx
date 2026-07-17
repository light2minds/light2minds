'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '@/components/Accordion'
import { useLang, type Lang } from '@/lib/language'

const WARM_BG = '#F8F5EF'
const SKY = '#5BC4F8'
const GREEN = '#2EBB50'
const GOLD = '#FFE030'

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="#FFE030">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M2 5l5 5 5-5" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const getConditions = (lang: Lang) => [
  {
    color: SKY,
    title: lang === 'es' ? 'Trastorno del Espectro Autista' : 'Autism Spectrum Disorder',
    teaser: lang === 'es'
      ? 'Una condición del neurodesarrollo que afecta la comunicación social, el procesamiento sensorial y el comportamiento.'
      : 'A neurodevelopmental condition affecting social communication, sensory processing, and behavior.',
    body: lang === 'es'
      ? 'El TEA se presenta de manera diferente en cada niño — por eso se le llama espectro. La intervención temprana, incluyendo terapia ABA, terapia del habla y terapia ocupacional, produce los mejores resultados.'
      : 'ASD presents differently in every child — which is why it\'s called a spectrum. Early intervention including ABA therapy, speech therapy, and occupational therapy produces the strongest outcomes.',
    insight: lang === 'es'
      ? 'El autismo no es causado por la crianza. Es una diferencia neurológica que requiere comprensión, no corrección.'
      : 'Autism is not caused by parenting. It is a neurological difference that requires understanding, not fixing.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>),
  },
  {
    color: GREEN,
    title: lang === 'es' ? 'TDAH' : 'ADHD',
    teaser: lang === 'es'
      ? 'Afecta la concentración, el control de impulsos y la regulación de la actividad, junto con una creatividad y energía excepcionales.'
      : 'Affects focus, impulse control, and activity regulation alongside exceptional creativity and energy.',
    body: lang === 'es'
      ? 'El apoyo eficaz combina estrategias conductuales, adaptaciones escolares y, cuando es necesario, orientación médica. Los niños con TDAH suelen mostrar fortalezas excepcionales para resolver problemas.'
      : 'Effective support combines behavioral strategies, school accommodations, and — when needed — medical guidance. Children with ADHD often show exceptional problem-solving strengths.',
    insight: lang === 'es'
      ? 'El TDAH no es un problema de conducta. Es una diferencia neurológica en la forma en que el cerebro gestiona la atención y las funciones ejecutivas.'
      : 'ADHD is not a behavior problem. It is a neurological difference in how the brain manages attention and executive function.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
  },
  {
    color: GOLD,
    title: lang === 'es' ? 'Retrasos del Desarrollo' : 'Developmental Delays',
    teaser: lang === 'es'
      ? 'El niño alcanza hitos más tarde de lo esperado — caminar, hablar o habilidades sociales.'
      : 'Child reaching milestones later than expected — walking, talking, or social skills.',
    body: lang === 'es'
      ? 'Los retrasos pueden afectar una o varias áreas. Con apoyo temprano, muchos niños logran avances significativos. Los servicios de intervención temprana a través de programas públicos suelen estar disponibles sin costo.'
      : 'Delays may affect one area or several. With early support, many children make significant gains. Early intervention services through public programs are often available at no cost.',
    insight: lang === 'es'
      ? '"Esperar y ver" rara vez es el enfoque correcto. La intervención temprana produce sistemáticamente mejores resultados.'
      : '"Wait and see" is rarely the right approach. Early intervention consistently produces better outcomes.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 12 8 9 8 6a4 4 0 0 1 8 0c0 3-4 6-4 6z" /><path d="M8 14s-4 1-4 4h16c0-3-4-4-4-4" /></svg>),
  },
  {
    color: SKY,
    title: lang === 'es' ? 'Retrasos del Lenguaje' : 'Language Delays',
    teaser: lang === 'es'
      ? 'Afecta la capacidad del niño para entender o expresar el lenguaje — palabras habladas o la estructura de las oraciones.'
      : 'Affects a child\'s ability to understand or express language — spoken words or sentence structure.',
    body: lang === 'es'
      ? 'Un patólogo del habla y lenguaje (SLP) puede evaluar y guiar la terapia. Lo que los padres hacen en casa todos los días tiene un impacto enorme en el desarrollo del lenguaje.'
      : 'A speech-language pathologist (SLP) can evaluate and guide therapy. What parents do at home every day has an enormous impact on language development.',
    insight: lang === 'es'
      ? 'Las estrategias de comunicación diarias practicadas en casa están entre las intervenciones más poderosas disponibles. No necesitas una sala de terapia para marcar la diferencia.'
      : 'Daily communication strategies practiced at home are among the most powerful interventions available. You don\'t need a therapy room to make a difference.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
  },
  {
    color: GREEN,
    title: lang === 'es' ? 'Procesamiento Sensorial' : 'Sensory Processing',
    teaser: lang === 'es'
      ? 'Sensibilidad excesiva o insuficiente a sonidos, texturas, luces y movimiento que provoca crisis o evitación.'
      : 'Over- or under-sensitivity to sounds, textures, lights, and movement causing meltdowns or avoidance.',
    body: lang === 'es'
      ? 'Un terapeuta ocupacional puede evaluar las necesidades sensoriales y diseñar un plan sensorial personalizado adaptado al perfil de tu hijo y su entorno diario.'
      : 'An occupational therapist can assess sensory needs and design a personalized sensory plan tailored to your child\'s profile and daily environment.',
    insight: lang === 'es'
      ? 'Muchas conductas etiquetadas como "desafío" son respuestas sensoriales a un entorno abrumador. Entender el detonante lo cambia todo.'
      : 'Many behaviors labeled "defiance" are sensory responses to an overwhelming environment. Understanding the trigger changes everything.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" /></svg>),
  },
  {
    color: GOLD,
    title: lang === 'es' ? 'Desafíos de Comportamiento' : 'Behavioral Challenges',
    teaser: lang === 'es'
      ? 'La agresión, las rabietas o la negativa casi siempre son una forma de comunicación cuando las palabras no bastan.'
      : 'Aggression, tantrums, or refusal are almost always communication when words aren\'t enough.',
    body: lang === 'es'
      ? 'La terapia ABA identifica la función detrás del comportamiento y enseña formas de comunicación más efectivas y socialmente apropiadas. Todo comportamiento tiene un propósito.'
      : 'ABA therapy identifies the function behind behavior and teaches more effective, socially appropriate ways to communicate. All behavior serves a purpose.',
    insight: lang === 'es'
      ? 'Entender el "por qué" detrás de un comportamiento siempre es el primer paso — y el más importante — hacia un cambio significativo.'
      : 'Understanding the "why" behind a behavior is always the first — and most important — step toward meaningful change.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
  },
]

const getAfterDiagnosisSteps = (lang: Lang) => [
  {
    num: '01', color: SKY,
    title: lang === 'es' ? 'Date Tiempo y Compasión' : 'Give Yourself Grace',
    body: lang === 'es'
      ? 'Es normal sentir duelo, alivio, miedo, o los tres a la vez. Un diagnóstico no cambia quién es tu hijo — le da a tu equipo una imagen más clara de cómo experimenta el mundo. Date tiempo antes de tomar decisiones importantes.'
      : "It's normal to feel grief, relief, fear, or all three at once. A diagnosis doesn't change who your child is — it gives your team a clearer picture of how they experience the world. Give yourself time before making any major decisions.",
  },
  {
    num: '02', color: GREEN,
    title: lang === 'es' ? 'Solicita el Informe Completo de Evaluación' : 'Request the Full Evaluation Report',
    body: lang === 'es'
      ? 'Obtén una copia escrita de cada evaluación. Este documento es la base del plan de apoyo de tu hijo — se requiere para servicios escolares, autorización del seguro y referencias de terapia. Pide que te lo expliquen en lenguaje sencillo si algo no queda claro.'
      : "Get a written copy of every evaluation. This document is the foundation of your child's support plan — required for school services, insurance authorization, and therapy referrals. Ask for it in plain language if anything is unclear.",
  },
  {
    num: '03', color: GOLD,
    title: lang === 'es' ? 'Conéctate con Intervención Temprana' : 'Connect with Early Intervention',
    body: lang === 'es'
      ? 'En Florida, los niños menores de 3 años pueden calificar para Early Steps. Los niños de 3 años o más tienen derecho a una educación pública gratuita y apropiada (FAPE) — incluyendo un IEP. Contacta al departamento de ESE de tu distrito escolar lo antes posible.'
      : "In Florida, children under 3 may qualify for Early Steps. Children 3+ are entitled to a free appropriate public education (FAPE) — including an IEP. Contact your school district's ESE department as soon as possible.",
  },
  {
    num: '04', color: SKY,
    title: lang === 'es' ? 'Explora las Opciones de Terapia' : 'Explore Therapy Options',
    body: lang === 'es'
      ? 'Según el diagnóstico, tu hijo puede beneficiarse de terapia ABA, terapia del habla y lenguaje, terapia ocupacional, o una combinación. Pide referencias a tu pediatra y verifica qué proveedores cubre tu seguro.'
      : "Depending on the diagnosis, your child may benefit from ABA therapy, speech-language therapy, occupational therapy, or a combination. Ask your pediatrician for referrals and verify which providers are covered by your insurance.",
  },
  {
    num: '05', color: GREEN,
    title: lang === 'es' ? 'Entiende la Cobertura de tu Seguro' : 'Understand Your Insurance Coverage',
    body: lang === 'es'
      ? 'La ley de Florida exige que la mayoría de los planes de seguro cubran el tratamiento del trastorno del espectro autista, incluyendo la terapia ABA. Contacta a tu aseguradora para confirmar beneficios, copagos y requisitos de autorización previa antes de programar citas.'
      : "Florida law requires most insurance plans to cover autism spectrum disorder treatment, including ABA therapy. Contact your insurer to confirm benefits, co-pays, and prior authorization requirements before scheduling.",
  },
  {
    num: '06', color: GOLD,
    title: lang === 'es' ? 'Construye tu Red de Apoyo' : 'Build Your Support Network',
    body: lang === 'es'
      ? "Conéctate con otras familias, únete a grupos de defensa de padres, y considera un defensor de padres si las reuniones del IEP se sienten abrumadoras. Aprendes más rápido de personas que han estado exactamente donde tú estás."
      : "Connect with other families, join parent advocacy groups, and consider a parent advocate if IEP meetings feel overwhelming. You learn fastest from people who've been exactly where you are.",
  },
]

const getIepItems = (lang: Lang) => [
  {
    trigger: lang === 'es' ? 'Tus Derechos como Padre/Madre' : 'Your Rights as a Parent',
    content: (
      <ul className="space-y-2">
        {(lang === 'es' ? [
          'Eres un miembro pleno e igualitario del equipo del IEP de tu hijo.',
          'Tienes derecho a solicitar una evaluación — sin costo — si crees que tu hijo tiene una discapacidad.',
          'Debes recibir notificación por escrito antes de cualquier cambio en la ubicación o los servicios de tu hijo.',
          'Puedes solicitar una Evaluación Educativa Independiente (IEE) si no estás de acuerdo con la evaluación de la escuela.',
          'Puedes llevar a una persona de apoyo o defensor a cualquier reunión del IEP.',
          'Tienes derecho a una copia de todos los registros educativos — sin costo.',
        ] : [
          'You are a full and equal member of your child\'s IEP team.',
          'You have the right to request an evaluation — at no cost — if you believe your child has a disability.',
          'You must receive written notice before any change to your child\'s placement or services.',
          'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s assessment.',
          'You can bring a support person or advocate to any IEP meeting.',
          'You are entitled to a copy of all educational records — at no cost.',
        ]).map(item => <li key={item} className="text-[13px] text-navy-800/65 leading-relaxed pl-3 border-l-2 border-sky-200">{item}</li>)}
      </ul>
    ),
  },
  {
    trigger: lang === 'es' ? 'Qué Debe Incluir un IEP' : 'What an IEP Must Include',
    content: (
      <ul className="space-y-2">
        {(lang === 'es' ? [
          'Niveles actuales de rendimiento académico y funcional',
          'Metas anuales medibles — académicas y funcionales',
          'Educación especial y servicios relacionados (habla, terapia ocupacional, ABA)',
          'Lista de adaptaciones y modificaciones',
          'Declaración del ambiente menos restrictivo (LRE)',
          'Plan de transición (requerido a los 16 años en Florida)',
        ] : [
          'Present levels of academic achievement and functional performance',
          'Annual measurable goals — academic and functional',
          'Special education and related services (speech, OT, ABA)',
          'Accommodation and modification list',
          'Least restrictive environment (LRE) statement',
          'Transition plan (required at age 16 in Florida)',
        ]).map(item => <li key={item} className="text-[13px] text-navy-800/65 leading-relaxed pl-3 border-l-2 border-green-200">{item}</li>)}
      </ul>
    ),
  },
  {
    trigger: lang === 'es' ? 'Familias de Florida — Servicios ESE' : 'Florida Families — ESE Services',
    content: <p className="text-[13px] text-navy-800/65 leading-relaxed">
      {lang === 'es'
        ? <>El término de Florida para educación especial es Educación para Estudiantes Excepcionales (ESE). Contacta a la oficina de ESE de tu distrito escolar — están legalmente obligados a responder a tu solicitud de evaluación dentro de 60 días y a proporcionar servicios sin costo.</>
        : <>Florida&apos;s term for special education is Exceptional Student Education (ESE). Contact your school district&apos;s ESE office — they are legally required to respond to your evaluation request within 60 days and to provide services at no cost.</>}
    </p>,
  },
]

const getStrategyItems = (lang: Lang) => [
  {
    trigger: lang === 'es' ? '1 — Crea una Rutina Predecible' : '1 — Build a Predictable Routine',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Usa horarios visuales para mostrar lo que viene después. Avisa a tu hijo antes de las transiciones (&ldquo;En 5 minutos nos vamos&rdquo;). La previsibilidad reduce significativamente la ansiedad y los comportamientos desafiantes.</>
        : <>Use visual schedules to show what&apos;s coming next. Warn your child before transitions (&ldquo;In 5 minutes we&apos;re leaving&rdquo;). Predictability reduces anxiety and challenging behavior significantly.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '2 — Sigue la Iniciativa de tu Hijo' : '2 — Follow Your Child\'s Lead',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Durante el juego, únete a lo que tu hijo ya está haciendo. Ponte a su nivel, imita sus acciones y comenta lo que ves. El juego dirigido por el niño desarrolla la atención conjunta, el lenguaje y la conexión social.</>
        : <>During play, join what your child is already doing. Get on the floor, imitate their actions, and comment on what you see. Child-led play builds joint attention, language, and social connection.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '3 — Usa un Lenguaje Claro y Simple' : '3 — Use Clear, Simple Language',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Mantén las instrucciones cortas y específicas. En lugar de &ldquo;para ya&rdquo;, di &ldquo;manos abajo&rdquo;. Para niños con lenguaje limitado, usa su nivel más una palabra: &ldquo;¡Pelota!&rdquo; → &ldquo;¡Rueda la pelota!&rdquo;</>
        : <>Keep instructions short and specific. Instead of &ldquo;stop it,&rdquo; say &ldquo;hands down.&rdquo; For children with limited language, use their level plus one word: &ldquo;Ball!&rdquo; → &ldquo;Roll ball!&rdquo;</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '4 — Reconoce lo Positivo' : '4 — Catch the Positives',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Por cada corrección, procura dar de 4 a 5 comentarios positivos específicos. &ldquo;Me encanta cómo te pusiste los zapatos tú solo&rdquo; enseña mucho más que un genérico &ldquo;¡Buen trabajo!&rdquo;</>
        : <>For every correction, aim for 4–5 specific positive comments. &ldquo;I love how you put your shoes on by yourself&rdquo; teaches far more than a generic &ldquo;Good job!&rdquo;</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '5 — Entiende la Función del Comportamiento' : '5 — Understand the Function of Behavior',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Antes de reaccionar, pregúntate: ¿qué está tratando de conseguir o evitar mi hijo? La mayoría de los comportamientos cumplen una de cuatro funciones: atención, acceso, escape o estimulación sensorial.</>
        : <>Before reacting, ask: what is my child trying to get or avoid? Most behavior serves one of four functions: attention, access, escape, or sensory stimulation.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '6 — Crea un Hogar Sensorialmente Amigable' : '6 — Create a Sensory-Friendly Home',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>Reduce los estímulos abrumadores — atenúa las luces fuertes, minimiza el ruido de fondo, crea un espacio tranquilo. Ofrece la estimulación sensorial que tu hijo busca: un columpio, juguetes con textura o pausas de movimiento.</>
        : <>Reduce overwhelming stimuli — dim harsh lights, minimize background noise, create a quiet space. Offer sensory input your child seeks: a swing, textured toys, or movement breaks.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '7 — Cuídate También' : '7 — Take Care of Yourself Too',
    content: <p className="text-[13px] text-navy-800/60 leading-relaxed">
      {lang === 'es'
        ? <>El agotamiento del cuidador afecta directamente el bienestar de tu hijo. Conéctate con un grupo de apoyo para padres, pide cuidado de relevo. No puedes darle a tu hijo lo que tú no tienes.</>
        : <>Caregiver burnout directly affects your child&apos;s wellbeing. Connect with a parent support group, ask for respite care. You cannot give your child what you don&apos;t have.</>}
    </p>,
  },
]

const getAbaFaqItems = (lang: Lang) => [
  {
    trigger: lang === 'es' ? '¿Qué es el refuerzo positivo y por qué importa?' : 'What is positive reinforcement and why does it matter?',
    content: <p>
      {lang === 'es'
        ? <>El refuerzo positivo significa añadir algo agradable después de un comportamiento, haciendo que sea más probable que vuelva a ocurrir. Los terapeutas identifican qué motiva a tu hijo y lo usan estratégicamente para desarrollar habilidades. Esto no es soborno — es enseñanza, de la misma forma en que todos aprendemos.</>
        : <>Positive reinforcement means adding something enjoyable after a behavior, making it more likely to happen again. Therapists identify what motivates your child and use it strategically to build skills. This is not bribery — it&apos;s teaching, the same way we all learn.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '¿Cuántas horas por semana necesita mi hijo?' : 'How many hours per week does my child need?',
    content: <p>
      {lang === 'es'
        ? <>La intensidad varía según la edad, las necesidades y los objetivos — típicamente de 10 a 40 horas por semana. El BCBA realiza una evaluación integral y recomienda un nivel apropiado. Medicaid y muchas aseguradoras privadas en Florida cubren ABA intensivo.</>
        : <>Intensity varies based on age, needs, and goals — typically 10 to 40 hours per week. The BCBA conducts a comprehensive assessment and recommends an appropriate level. Medicaid and many private insurers in Florida cover intensive ABA.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '¿Cómo sé si mi hijo está progresando?' : 'How do I know if my child is making progress?',
    content: <p>
      {lang === 'es'
        ? <>El progreso se basa en datos. Tu BCBA hace seguimiento de la adquisición de habilidades y el comportamiento desafiante con datos diarios. Deberías recibir informes de progreso regulares y reuniones de equipo para revisar las metas. Eres una parte fundamental del equipo, no solo un observador.</>
        : <>Progress is data-driven. Your BCBA tracks skill acquisition and challenging behavior with daily data. You should receive regular progress reports and team meetings to review goals. You are a critical part of the team, not just an observer.</>}
    </p>,
  },
  {
    trigger: lang === 'es' ? '¿El ABA es solo para el autismo?' : 'Is ABA only for autism?',
    content: <p>
      {lang === 'es'
        ? <>No. Aunque el ABA es más conocido por el autismo, sus principios aplican a cualquier niño que se beneficie del desarrollo de habilidades o apoyo conductual — incluyendo TDAH, retrasos del desarrollo y discapacidades intelectuales.</>
        : <>No. While ABA is most widely known for autism, the principles apply to any child who would benefit from skill-building or behavior support — including ADHD, developmental delays, and intellectual disabilities.</>}
    </p>,
  },
]

const getDownloads = (lang: Lang) => [
  { color: SKY,   title: lang === 'es' ? 'Lista de Preparación para la Reunión del IEP' : 'IEP Meeting Preparation Checklist', body: lang === 'es' ? 'Qué llevar, qué preguntar y qué esperar — en lenguaje sencillo.' : 'What to bring, ask, and expect — in plain language.' },
  { color: GREEN, title: lang === 'es' ? 'Registro de Observación de Comportamiento' : 'Behavior Observation Log',           body: lang === 'es' ? 'Registra comportamientos en casa para compartir con tu equipo de terapia.' : 'Track behaviors at home to share with your therapy team.' },
  { color: GOLD,  title: lang === 'es' ? 'Plantilla de Horario Visual Diario' : 'Visual Daily Schedule Template',     body: lang === 'es' ? 'Horario visual imprimible — ideal para niños que se benefician de rutinas.' : 'Printable visual schedule — great for routine-based kids.' },
  { color: SKY,   title: lang === 'es' ? 'Cuestionario de Perfil Sensorial' : 'Sensory Profile Questionnaire',      body: lang === 'es' ? 'Identifica sensibilidades sensoriales para compartir con tu terapeuta ocupacional.' : 'Identify sensory sensitivities to share with your OT.' },
  { color: GREEN, title: lang === 'es' ? 'Glosario de Términos ABA para Padres' : 'ABA Terms for Parents Glossary',     body: lang === 'es' ? 'Guía en lenguaje sencillo de los términos de terapia que usa tu equipo.' : 'Plain-language guide to therapy terms your team uses.' },
  { color: GOLD,  title: lang === 'es' ? 'Guía de Preguntas para Entrevistar Proveedores' : 'Provider Interview Question Guide',  body: lang === 'es' ? '25 preguntas para hacer antes de elegir cualquier proveedor.' : '25 questions to ask before choosing any provider.' },
]

// ── Expandable condition card ─────────────────────────────────────────────────

function ConditionCard({ cond }: { cond: ReturnType<typeof getConditions>[0] }) {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const textColor = cond.color === GOLD ? '#8A6A00' : cond.color === SKY ? '#1A6B96' : '#1A7A3C'

  return (
    <button
      onClick={() => setOpen(o => !o)}
      className="w-full text-left border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none"
      style={{ backgroundColor: cond.color + '06' }}
    >
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: cond.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cond.color + '14', color: textColor }}
            >
              <span className="w-4 h-4">{cond.icon}</span>
            </span>
            <h3 className="text-[13.5px] font-semibold text-navy-900 leading-snug">{cond.title}</h3>
          </div>
          <ChevronDown open={open} />
        </div>
        <p className="text-[12px] text-navy-800/45 leading-relaxed" style={{ color: open ? 'transparent' : undefined, maxHeight: open ? 0 : undefined, overflow: 'hidden' }}>
          {!open && cond.teaser}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <p className="text-[12.5px] text-navy-800/55 leading-relaxed mb-3">{cond.body}</p>
              <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: cond.color + '0E', borderLeft: `3px solid ${cond.color}` }}>
                <p className="text-[11.5px] leading-relaxed" style={{ color: textColor }}>
                  <span className="font-semibold">{lang === 'es' ? 'Idea clave: ' : 'Key insight: '}</span>{cond.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ParentsPage() {
  const { lang } = useLang()
  const conditions = getConditions(lang)
  const afterDiagnosisSteps = getAfterDiagnosisSteps(lang)
  const iepItems = getIepItems(lang)
  const strategyItems = getStrategyItems(lang)
  const abaFaqItems = getAbaFaqItems(lang)
  const downloads = getDownloads(lang)

  return (
    <main>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: WARM_BG }} className="pt-28 pb-10 lg:pt-32 lg:pb-12 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-5 h-px" style={{ backgroundColor: SKY }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">{lang === 'es' ? 'Para Familias' : 'For Families'}</p>
            </div>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.08] mb-4">
              {lang === 'es' ? <>Navega el diagnóstico<br />de tu hijo con confianza.</> : <>Navigate your child&apos;s<br />diagnosis with confidence.</>}
            </h1>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-7 max-w-lg">
              {lang === 'es'
                ? 'Orientación basada en evidencia, herramientas prácticas y apoyo personalizado — para cada etapa del camino de tu familia.'
                : "Evidence-based guidance, practical tools, and personalized support — for every stage of your family's journey."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://light-2-minds.myshopify.com/products/book-a-family-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
              >
                {lang === 'es' ? 'Reservar Consulta Familiar' : 'Book Family Consultation'}
                <ArrowRight />
              </a>
              <a
                href="#downloads"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-navy-900 px-6 py-3 rounded-full border border-navy-900/15 hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                {lang === 'es' ? 'Herramientas Gratis' : 'Free Tools'}
                <ArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Understanding Diagnosis — expandable cards ── */}
      <section className="bg-white py-10 lg:py-14" id="diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Entendiendo a tu Hijo' : 'Understanding Your Child'}</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? 'Qué significa el diagnóstico de tu hijo — y qué no significa' : "What your child's diagnosis means — and what it doesn't"}
            </h2>
            <p className="text-[13px] text-navy-800/40 mt-1">{lang === 'es' ? 'Toca cualquier tarjeta para saber más.' : 'Tap any card to learn more.'}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conditions.map((cond, i) => (
              <motion.div key={cond.title} {...fade} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <ConditionCard cond={cond} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── After Diagnosis ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-12 lg:py-18 border-t border-stone-200/60" id="after-diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">{lang === 'es' ? 'Qué Sigue' : "What's Next"}</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              {lang === 'es' ? 'Qué esperar después del diagnóstico.' : 'What to expect after diagnosis.'}
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-xl">
              {lang === 'es'
                ? 'El período justo después de un diagnóstico puede sentirse abrumador. Aquí tienes una hoja de ruta clara para que sepas qué hacer.'
                : "The period right after a diagnosis can feel overwhelming. Here's a clear roadmap, so you know what to do."}
            </p>
          </motion.div>

          {/* Steps grid — fully visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {afterDiagnosisSteps.map((step, i) => {
              const numColor = step.color === GOLD ? '#8A6A00' : step.color === SKY ? '#1A6B96' : '#1A7A3C'
              return (
                <motion.div
                  key={step.num}
                  {...fade}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="relative rounded-2xl overflow-hidden border border-stone-200/60 p-6 flex flex-col"
                  style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)', backgroundColor: step.color + '06' }}
                >
                  {/* Colored left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: step.color }} />

                  {/* Number watermark */}
                  <span
                    className="absolute top-3 right-4 text-[4rem] font-black leading-none select-none pointer-events-none"
                    style={{ color: step.color + '12' }}
                  >
                    {step.num}
                  </span>

                  {/* Badge */}
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[12px] font-bold mb-4 flex-shrink-0"
                    style={{ backgroundColor: step.color + '18', color: numColor }}
                  >
                    {step.num}
                  </span>

                  <h3 className="text-[14.5px] font-bold text-navy-900 leading-snug mb-2">{step.title}</h3>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed flex-1">{step.body}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Family Consultation (merged) ── */}
      <section style={{ backgroundColor: '#0D1B2E' }} className="py-12 lg:py-16 border-t border-navy-900" id="sessions">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — copy + CTA */}
            <motion.div {...fade} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: 'rgba(255,224,48,0.7)' }}>
                {lang === 'es' ? 'Consulta Familiar' : 'Family Consultation'}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold text-white tracking-[-0.025em] leading-[1.12] mb-4">
                {lang === 'es' ? <>La situación de cada familia es diferente.<br />Hablemos de la tuya.</> : <>Every family&apos;s situation is different.<br />Let&apos;s talk about yours.</>}
              </h2>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
                {lang === 'es'
                  ? 'Una sesión individual con un especialista en salud conductual — tiempo dedicado a entender el diagnóstico de tu hijo, responder cada pregunta, y salir con un plan claro y personalizado.'
                  : "A 1-on-1 session with a behavioral health specialist — dedicated time to understand your child's diagnosis, answer every question, and leave with a clear, personalized plan."}
              </p>
              <ul className="space-y-3 mb-8">
                {(lang === 'es' ? [
                  'Entender el diagnóstico y el perfil de desarrollo de tu hijo',
                  'Revisar informes de evaluación y recomendaciones de terapia',
                  'Prepararte para las reuniones del IEP y abogar eficazmente',
                  'Construir una estrategia de apoyo en el hogar adaptada a tu familia',
                  'Orientación para seleccionar y evaluar terapeutas y proveedores',
                ] : [
                  'Understanding your child\'s diagnosis and developmental profile',
                  'Reviewing evaluation reports and therapy recommendations',
                  'Preparing for IEP meetings and advocating effectively',
                  'Building a home support strategy tailored to your family',
                  'Guidance on selecting and evaluating therapists and providers',
                ]).map(item => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(46,187,80,0.18)' }}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://light-2-minds.myshopify.com/products/book-a-family-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                  style={{ backgroundColor: GOLD, boxShadow: '0 5px 0 #C4A800, 0 8px 20px rgba(0,0,0,0.3)' }}
                >
                  {lang === 'es' ? 'Reservar Consulta Familiar' : 'Book Family Consultation'}
                  <ArrowRight />
                </a>
                <a
                  href="https://wa.me/15613772473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium px-2 py-3.5 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.40)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.40)')}
                >
                  {lang === 'es' ? 'Escríbenos por WhatsApp' : 'Message on WhatsApp'}
                  <span className="w-4 h-px bg-current ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Right — testimonials */}
            <motion.div {...fade} transition={{ duration: 0.5, delay: 0.12 }}>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  {lang === 'es' ? 'Lo que dicen los padres' : 'What parents say'}
                </p>
                <div className="space-y-6">
                  <blockquote>
                    <Stars />
                    <p className="text-[13.5px] italic leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {lang === 'es'
                        ? <>&ldquo;Después de nuestra sesión finalmente entendí el informe de evaluación de mi hija. Fui a la reunión del IEP preparada, y por primera vez realmente abogué por lo que ella necesitaba.&rdquo;</>
                        : <>&ldquo;After our session I finally understood my daughter&apos;s evaluation report. I went to the IEP meeting prepared, and for the first time I actually advocated for what she needed.&rdquo;</>}
                    </p>
                    <cite className="text-[11px] font-semibold not-italic tracking-[0.06em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{lang === 'es' ? '— Madre/Padre de Florida' : '— Florida Parent'}</cite>
                  </blockquote>
                  <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <blockquote>
                      <Stars />
                      <p className="text-[13.5px] italic leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {lang === 'es'
                          ? <>&ldquo;La sesión me dio una hoja de ruta que no sabía que necesitaba — y la confianza para usarla.&rdquo;</>
                          : <>&ldquo;The session gave me a roadmap I didn&apos;t know I needed — and the confidence to use it.&rdquo;</>}
                      </p>
                      <cite className="text-[11px] font-semibold not-italic tracking-[0.06em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{lang === 'es' ? '— Madre/Padre de Florida' : '— Florida Parent'}</cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── ABA Therapy ── */}
      <section className="bg-white py-10 lg:py-14 border-t border-stone-200/60" id="aba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Terapia ABA' : 'ABA Therapy'}</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? 'Lo que todo padre debe entender sobre el ABA' : 'What every parent should understand about ABA'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {(lang === 'es' ? [
              { color: SKY, title: '¿Qué es el ABA?', body: 'El ABA aplica nuestra comprensión de cómo funciona el comportamiento a situaciones de la vida real — y luego usa ese conocimiento para enseñar habilidades y mejorar la calidad de vida.' },
              { color: GREEN, title: '¿Quién Forma Parte del Equipo?', body: 'Un BCBA diseña y supervisa el programa. Los Técnicos de Conducta Registrados (RBTs) lo implementan directamente con tu hijo.' },
              { color: GOLD, title: '¿Cómo es una Sesión?', body: 'Las sesiones usan juego naturalista, ejercicios de desarrollo de habilidades y refuerzo positivo — en casa, en la escuela o en una clínica.' },
            ] : [
              { color: SKY, title: 'What Is ABA?', body: 'ABA applies our understanding of how behavior works to real-life situations — then uses that knowledge to teach skills and improve quality of life.' },
              { color: GREEN, title: 'Who Is on the Team?', body: 'A BCBA designs and supervises the program. Registered Behavior Technicians (RBTs) implement it directly with your child.' },
              { color: GOLD, title: 'What Does a Session Look Like?', body: 'Sessions use naturalistic play, skill-building exercises, and positive reinforcement — at home, school, or a clinic.' },
            ]).map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: card.color + '30', backgroundColor: card.color + '08' }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: card.color }} />
                <div className="p-5">
                  <h3 className="text-[13.5px] font-semibold text-navy-900 mb-2">{card.title}</h3>
                  <p className="text-[12.5px] text-navy-800/55 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-2xl">
            <Accordion items={abaFaqItems} openFirst />
          </motion.div>
        </div>
      </section>

      {/* ── IEP & School ── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-t border-stone-200/60" id="iep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-8 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Escuela e IEP' : 'School & IEP'}</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1] mb-3">
              {lang === 'es' ? 'Tu hijo tiene derechos legales en la escuela.' : 'Your child has legal rights at school.'}
            </h2>
            <p className="text-[13.5px] text-navy-800/50 leading-relaxed">
              {lang === 'es'
                ? 'Bajo IDEA, todo niño elegible tiene derecho a una Educación Pública Gratuita y Apropiada. Esto es lo que eso significa en la práctica.'
                : "Under IDEA, every eligible child is entitled to a Free Appropriate Public Education. Here's what that means in practice."}
            </p>
          </motion.div>

          {/* Two main panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            {/* Rights */}
            <motion.div {...fade} transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl overflow-hidden border border-sky-100"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', backgroundColor: 'rgba(91,196,248,0.05)' }}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: SKY }} />
              <div className="p-6">
                <h3 className="text-[13.5px] font-bold mb-4" style={{ color: '#1A6B96' }}>{lang === 'es' ? 'Tus Derechos como Padre/Madre' : 'Your Rights as a Parent'}</h3>
                <ul className="space-y-2.5">
                  {(lang === 'es' ? [
                    'Eres un miembro pleno e igualitario del equipo del IEP de tu hijo.',
                    'Puedes solicitar una evaluación sin costo si crees que tu hijo tiene una discapacidad.',
                    'Debes recibir notificación por escrito antes de cualquier cambio en la ubicación o los servicios.',
                    'Puedes solicitar una Evaluación Educativa Independiente (IEE) si no estás de acuerdo con la evaluación de la escuela.',
                    'Puedes llevar a una persona de apoyo o defensor a cualquier reunión del IEP.',
                    'Tienes derecho a una copia de todos los registros educativos — sin costo.',
                  ] : [
                    'You are a full and equal member of your child\'s IEP team.',
                    'You can request an evaluation at no cost if you believe your child has a disability.',
                    'You must receive written notice before any change to placement or services.',
                    'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s assessment.',
                    'You can bring a support person or advocate to any IEP meeting.',
                    'You are entitled to a copy of all educational records — at no cost.',
                  ]).map(item => (
                    <li key={item} className="flex items-start gap-3 text-[12.5px] text-navy-800/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: SKY }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* IEP components */}
            <motion.div {...fade} transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-green-100"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', backgroundColor: 'rgba(46,187,80,0.05)' }}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: GREEN }} />
              <div className="p-6">
                <h3 className="text-[13.5px] font-bold mb-4" style={{ color: '#1A7A3C' }}>{lang === 'es' ? 'Qué Debe Incluir un IEP' : 'What an IEP Must Include'}</h3>
                <ul className="space-y-2.5">
                  {(lang === 'es' ? [
                    'Niveles actuales de rendimiento académico y funcional',
                    'Metas anuales medibles — académicas y funcionales',
                    'Educación especial y servicios relacionados (habla, terapia ocupacional, ABA)',
                    'Lista de adaptaciones y modificaciones',
                    'Declaración del ambiente menos restrictivo (LRE)',
                    'Plan de transición (requerido a los 16 años en Florida)',
                  ] : [
                    'Present levels of academic achievement and functional performance',
                    'Annual measurable goals — academic and functional',
                    'Special education and related services (speech, OT, ABA)',
                    'Accommodation and modification list',
                    'Least restrictive environment (LRE) statement',
                    'Transition plan (required at age 16 in Florida)',
                  ]).map(item => (
                    <li key={item} className="flex items-start gap-3 text-[12.5px] text-navy-800/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: GREEN }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>

          {/* Florida ESE callout */}
          <motion.div {...fade} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl px-6 py-5 mb-6 border"
            style={{ backgroundColor: GOLD + '12', borderColor: GOLD + '50' }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: '#8A6A00' }}>{lang === 'es' ? 'Familias de Florida — Servicios ESE' : 'Florida Families — ESE Services'}</p>
            <p className="text-[13px] text-navy-800/60 leading-relaxed">
              {lang === 'es'
                ? <>El término de Florida para educación especial es <strong className="text-navy-900/70">Educación para Estudiantes Excepcionales (ESE)</strong>. Contacta a la oficina de ESE de tu distrito escolar — están legalmente obligados a responder a tu solicitud de evaluación dentro de 60 días y a proporcionar servicios sin costo.</>
                : <>Florida&apos;s term for special education is <strong className="text-navy-900/70">Exceptional Student Education (ESE)</strong>. Contact your school district&apos;s ESE office — they are legally required to respond to your evaluation request within 60 days and provide services at no cost.</>}
            </p>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.4, delay: 0.18 }}>
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/15 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
              {lang === 'es' ? 'Lista de Preparación para el IEP' : 'IEP Prep Checklist'}
              <ArrowRight />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── Home Strategies ── */}
      <section className="bg-white py-10 lg:py-14 border-t border-stone-200/60" id="strategies">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Vida en el Hogar' : 'Home Life'}</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? '7 estrategias que funcionan — incluso en los días más difíciles.' : '7 strategies that work — even on the hardest days.'}
            </h2>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.08 }} className="max-w-2xl">
            <Accordion items={strategyItems} />
          </motion.div>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section className="bg-stone-50 py-7 lg:py-10 border-t border-stone-200/60" id="downloads">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-1">{lang === 'es' ? 'Recursos Gratuitos' : 'Free Resources'}</p>
              <h2 className="text-[clamp(1.1rem,2.2vw,1.5rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
                {lang === 'es' ? 'Tu kit de herramientas para padres — gratis.' : 'Your parent toolkit — free.'}
              </h2>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-navy-900 border border-navy-900/15 px-4 py-2 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 flex-shrink-0">
              {lang === 'es' ? 'Ver todas las herramientas' : 'View all tools'} <ArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
            {downloads.map((d, i) => (
              <motion.div key={d.title} {...fade} transition={{ duration: 0.3, delay: i * 0.04 }}
                className="border border-stone-200/60 rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: d.color + '06' }}>
                <div className="h-[3px] w-full" style={{ backgroundColor: d.color }} />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[12.5px] font-semibold text-navy-900 mb-1 leading-snug">{d.title}</h3>
                  <p className="text-[11.5px] text-navy-800/45 leading-relaxed flex-1 mb-3">{d.body}</p>
                  <button
                    className="inline-flex items-center gap-1.5 text-[11.5px] font-bold self-start px-3 py-1.5 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                    style={{ backgroundColor: d.color + '15', color: d.color === GOLD ? '#B8900E' : d.color }}
                  >
                    {lang === 'es' ? 'Descargar Gratis' : 'Download Free'}
                    <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" /></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: '#0D1B2E' }} className="py-12 lg:py-16 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? 'No estás navegando esto solo.' : "You're not navigating this alone."}
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                {lang === 'es'
                  ? 'Nuestros Paquetes de Recursos Familiares te dan todo en un solo lugar — guías curadas, listas de verificación y herramientas diseñadas para padres que buscan apoyo práctico. Deja de buscar. Obtén lo que realmente funciona.'
                  : 'Our Family Resource Bundles give you everything in one place — curated guides, checklists, and tools designed for parents who want practical support. Skip the searching. Get what actually works.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/shop#families"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800' }}
              >
                {lang === 'es' ? 'Recursos para Familias' : 'Family Resources'} <ArrowRight />
              </Link>
              <a href="mailto:info@light2minds.com"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-white px-6 py-3 rounded-full border transition-all duration-200 hover:bg-white hover:text-navy-900"
                style={{ borderColor: 'rgba(255,255,255,0.20)' }}
              >
                {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
