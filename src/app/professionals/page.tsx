'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'
import FlashCard from '@/components/FlashCard'
import { useLang, type Lang } from '@/lib/language'

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const up = (delay = 0) => ({ ...fade, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const } })

// ── Data ─────────────────────────────────────────────────────────────────────
const getFlashcards = (lang: Lang) => [
  {
    section: lang === 'es' ? 'Sección B · Adquisición de Habilidades' : 'Section B · Skill Acquisition',
    term: 'Positive Reinforcement',
    definition: lang === 'es'
      ? 'La adición de un estímulo después de una conducta que aumenta la frecuencia futura de esa conducta. El estímulo añadido debe ser algo que el individuo considere valioso o placentero.'
      : 'The addition of a stimulus following a behavior that increases the future frequency of that behavior. The stimulus added must be something the individual finds valuable or pleasurable.',
  },
  {
    section: lang === 'es' ? 'Sección C · Reducción de Conducta' : 'Section C · Behavior Reduction',
    term: 'Extinction',
    definition: lang === 'es'
      ? 'Retener el reforzador que ha estado manteniendo una conducta, lo que resulta en una disminución de la frecuencia de esa conducta con el tiempo. A menudo produce inicialmente un "estallido de extinción".'
      : 'Withholding the reinforcer that has been maintaining a behavior, resulting in a decrease in the frequency of that behavior over time. Often produces an "extinction burst" initially.',
  },
  {
    section: lang === 'es' ? 'Sección A · Medición' : 'Section A · Measurement',
    term: 'ABC Data',
    definition: lang === 'es'
      ? 'Datos de Antecedente-Conducta-Consecuencia. Un método de recolección de datos descriptivo usado para identificar patrones y posibles funciones de la conducta, registrando lo que ocurre antes y después de que sucede una conducta.'
      : 'Antecedent-Behavior-Consequence data. A descriptive data collection method used to identify patterns and potential functions of behavior by recording what happens before and after a behavior occurs.',
  },
  {
    section: lang === 'es' ? 'Sección B · Adquisición de Habilidades' : 'Section B · Skill Acquisition',
    term: 'Discrete Trial Training (DTT)',
    definition: lang === 'es'
      ? 'Un método de enseñanza estructurado que involucra un estímulo discriminativo claro (SD), una ayuda si es necesaria, la respuesta del aprendiz, y una consecuencia (refuerzo o retroalimentación correctiva). Los ensayos se repiten sistemáticamente.'
      : 'A structured teaching method involving a clear discriminative stimulus (SD), a prompt if needed, the learner\'s response, and a consequence (reinforcement or corrective feedback). Trials are repeated systematically.',
  },
  {
    section: lang === 'es' ? 'Sección C · Reducción de Conducta' : 'Section C · Behavior Reduction',
    term: 'Four Functions of Behavior',
    definition: lang === 'es'
      ? 'Toda conducta cumple un propósito: (1) Acceso a tangibles, (2) Atención de otros, (3) Escape/Evitación de demandas o situaciones, (4) Refuerzo automático/sensorial. Identificar la función guía el tratamiento.'
      : 'All behavior serves a purpose: (1) Access to tangibles, (2) Attention from others, (3) Escape/Avoidance of demands or situations, (4) Automatic/Sensory reinforcement. Identifying the function guides treatment.',
  },
  {
    section: lang === 'es' ? 'Sección B · Adquisición de Habilidades' : 'Section B · Skill Acquisition',
    term: 'Prompting Hierarchy',
    definition: lang === 'es'
      ? 'Una forma sistemática de entregar ayudas de mayor a menor o de menor a mayor nivel de intrusión. Los tipos de ayuda incluyen: Física Total, Física Parcial, Modelado, Gestual y Verbal. El objetivo es desvanecer las ayudas y lograr respuestas independientes.'
      : 'A systematic way of delivering prompts from most-to-least or least-to-most intrusive. Prompt types include: Full Physical, Partial Physical, Modeling, Gestural, and Verbal. The goal is to fade prompts and achieve independent responding.',
  },
]

const getTerminologyItems = (lang: Lang) => [
  {
    trigger: lang === 'es' ? 'Términos de Medición y Recolección de Datos' : 'Measurement & Data Collection Terms',
    content: (
      <ul>
        <li><strong>Frequency/Event Recording:</strong> {lang === 'es' ? 'Contar cuántas veces ocurre una conducta dentro de un período de observación.' : 'Counting how many times a behavior occurs within an observation period.'}</li>
        <li><strong>Duration Recording:</strong> {lang === 'es' ? 'Medir cuánto dura una conducta desde el inicio hasta el final.' : 'Measuring how long a behavior lasts from start to finish.'}</li>
        <li><strong>Latency Recording:</strong> {lang === 'es' ? 'Tiempo desde la presentación de un estímulo (SD) hasta el inicio de la conducta.' : 'Time from the presentation of a stimulus (SD) to the onset of the behavior.'}</li>
        <li><strong>Interval Recording (Whole/Partial):</strong> {lang === 'es' ? 'Dividir un período de observación en intervalos; anotar si la conducta ocurrió en cada intervalo.' : 'Dividing an observation period into intervals; noting if behavior occurred in each interval.'}</li>
        <li><strong>Momentary Time Sampling:</strong> {lang === 'es' ? 'Observar si la conducta está ocurriendo al final de cada intervalo — no durante todo el intervalo.' : 'Observing whether the behavior is occurring at the end of each interval — not throughout.'}</li>
        <li><strong>Permanent Product Recording:</strong> {lang === 'es' ? 'Medir el resultado tangible de una conducta en lugar de la conducta misma (por ejemplo, número de hojas de trabajo completadas).' : 'Measuring the tangible result of a behavior rather than the behavior itself (e.g., number of worksheets completed).'}</li>
      </ul>
    ),
  },
  {
    trigger: lang === 'es' ? 'Conceptos de Refuerzo' : 'Reinforcement Concepts',
    content: (
      <ul>
        <li><strong>Positive Reinforcement:</strong> {lang === 'es' ? 'Añadir un estímulo para aumentar la conducta.' : 'Adding a stimulus to increase behavior.'}</li>
        <li><strong>Negative Reinforcement:</strong> {lang === 'es' ? 'Remover un estímulo para aumentar la conducta (por ejemplo, quitar una etiqueta que pica cuando un niño se pone la camisa).' : 'Removing a stimulus to increase behavior (e.g., removing an itchy tag when a child puts on their shirt).'}</li>
        <li><strong>Unconditioned Reinforcer (UR):</strong> {lang === 'es' ? 'Reforzante de forma natural sin aprendizaje (comida, agua, calor).' : 'Naturally reinforcing without learning (food, water, warmth).'}</li>
        <li><strong>Conditioned Reinforcer (CR):</strong> {lang === 'es' ? 'Reforzador aprendido (elogios, fichas, dinero) mediante el emparejamiento con un UR.' : 'Learned reinforcer (praise, tokens, money) through pairing with a UR.'}</li>
        <li><strong>Schedules of Reinforcement:</strong> {lang === 'es' ? 'Reglas sobre cuándo se entrega el refuerzo — Razón Fija (FR), Razón Variable (VR), Intervalo Fijo (FI), Intervalo Variable (VI).' : 'Rules for when reinforcement is delivered — Fixed Ratio (FR), Variable Ratio (VR), Fixed Interval (FI), Variable Interval (VI).'}</li>
        <li><strong>Preference Assessment:</strong> {lang === 'es' ? 'Un proceso estructurado para identificar posibles reforzadores (MSWO, estímulos pareados, operante libre).' : 'A structured process to identify potential reinforcers (MSWO, paired stimulus, free operant).'}</li>
      </ul>
    ),
  },
  {
    trigger: lang === 'es' ? 'Términos de Reducción de Conducta' : 'Behavior Reduction Terms',
    content: (
      <ul>
        <li><strong>Antecedent:</strong> {lang === 'es' ? 'Lo que ocurre inmediatamente antes de una conducta (el detonante).' : 'What happens immediately before a behavior (the trigger).'}</li>
        <li><strong>Consequence:</strong> {lang === 'es' ? 'Lo que ocurre inmediatamente después de una conducta.' : 'What happens immediately after a behavior.'}</li>
        <li><strong>Punishment:</strong> {lang === 'es' ? 'Una consecuencia que disminuye la frecuencia futura de una conducta (positivo: añadir un aversivo; negativo: remover algo valorado).' : 'A consequence that decreases the future frequency of a behavior (positive: adding an aversive; negative: removing something valued).'}</li>
        <li><strong>Extinction Burst:</strong> {lang === 'es' ? 'Un aumento temporal de la conducta cuando se implementa la extinción por primera vez.' : 'A temporary increase in behavior when extinction is first implemented.'}</li>
        <li><strong>Functional Behavior Assessment (FBA):</strong> {lang === 'es' ? 'Un proceso para determinar la función (propósito) de una conducta desafiante — realizado por el BCBA, no por el RBT.' : 'A process to determine the function (purpose) of a challenging behavior — conducted by the BCBA, not the RBT.'}</li>
        <li><strong>Behavior Intervention Plan (BIP):</strong> {lang === 'es' ? 'Un plan escrito (desarrollado por el BCBA) basado en el FBA que describe estrategias para reducir la conducta desafiante.' : 'A written plan (developed by the BCBA) based on the FBA that outlines strategies to reduce challenging behavior.'}</li>
      </ul>
    ),
  },
  {
    trigger: lang === 'es' ? 'Procedimientos de Enseñanza' : 'Teaching Procedures',
    content: (
      <ul>
        <li><strong>Shaping:</strong> {lang === 'es' ? 'Reforzar aproximaciones sucesivas hacia una conducta objetivo.' : 'Reinforcing successive approximations toward a target behavior.'}</li>
        <li><strong>Chaining:</strong> {lang === 'es' ? 'Enseñar una habilidad uniendo los pasos de un análisis de tareas (encadenamiento hacia adelante, hacia atrás, o de tarea total).' : 'Teaching a skill by linking steps of a task analysis together (forward, backward, or total task).'}</li>
        <li><strong>Modeling:</strong> {lang === 'es' ? 'Demostrar una habilidad para que el aprendiz la imite.' : 'Demonstrating a skill for the learner to imitate.'}</li>
        <li><strong>Natural Environment Teaching (NET):</strong> {lang === 'es' ? 'Enseñar habilidades en el contexto natural usando los intereses y la motivación del aprendiz.' : <>Teaching skills in the natural context using the learner&apos;s interests and motivation.</>}</li>
        <li><strong>Generalization:</strong> {lang === 'es' ? 'La ocurrencia de una conducta en diferentes entornos, personas o materiales sin entrenamiento directo.' : 'The occurrence of a behavior across different settings, people, or materials without direct training.'}</li>
        <li><strong>Maintenance:</strong> {lang === 'es' ? 'Una habilidad previamente aprendida continúa ocurriendo después de que ha terminado la instrucción directa.' : 'A previously learned skill continues to occur after direct instruction has ended.'}</li>
      </ul>
    ),
  },
]

const getEthicsScenarios = (lang: Lang) => [
  {
    trigger: lang === 'es' ? 'Escenario 1: El padre/madre de un cliente te pide cambiar un programa' : "Scenario 1: Client's parent asks you to change a program",
    content: (
      <div className="space-y-3">
        <p><strong>{lang === 'es' ? 'Situación:' : 'Situation:'}</strong> {lang === 'es'
          ? 'Un padre te dice que ha leído que una estrategia de ayuda diferente funciona mejor y te pide que la uses en su lugar.'
          : <>A parent tells you they&apos;ve read that a different prompting strategy works better and asks you to use it instead.</>}</p>
        <p><strong>{lang === 'es' ? 'Respuesta Correcta:' : 'Correct Response:'}</strong> {lang === 'es'
          ? 'Agradece al padre por su aporte, explica que implementas los programas tal como los diseña el BCBA, y comprométete a transmitir esta retroalimentación a tu supervisor. No modifiques el programa sin la aprobación del BCBA.'
          : 'Thank the parent for their input, explain that you implement programs as designed by the BCBA, and commit to passing this feedback along to your supervisor. Do not modify the program without BCBA approval.'}</p>
      </div>
    ),
  },
  {
    trigger: lang === 'es' ? 'Escenario 2: Ves a otro terapeuta usando un procedimiento no aprobado' : 'Scenario 2: You see another therapist using an unapproved procedure',
    content: (
      <div className="space-y-3">
        <p><strong>{lang === 'es' ? 'Situación:' : 'Situation:'}</strong> {lang === 'es'
          ? 'Durante una sesión, observas a un colega usando una ayuda física que no está en el programa del cliente.'
          : <>During a session, you observe a colleague using a physical prompt that is not in the client&apos;s program.</>}</p>
        <p><strong>{lang === 'es' ? 'Respuesta Correcta:' : 'Correct Response:'}</strong> {lang === 'es'
          ? 'Reporta la observación a tu BCBA supervisor lo antes posible. No confrontes al colega directamente ni lo ignores. La seguridad del cliente y la práctica ética son la prioridad.'
          : 'Report the observation to your supervising BCBA as soon as possible. Do not confront the colleague directly or ignore it. Client safety and ethical practice are the priority.'}</p>
      </div>
    ),
  },
  {
    trigger: lang === 'es' ? 'Escenario 3: Un familiar pide las notas de progreso del cliente' : "Scenario 3: A family member asks for the client's progress notes",
    content: (
      <div className="space-y-3">
        <p><strong>{lang === 'es' ? 'Situación:' : 'Situation:'}</strong> {lang === 'es'
          ? 'Un abuelo de un cliente te llama directamente y te pide que le envíes por correo las últimas tres notas de progreso.'
          : 'A grandparent of a client calls you directly and asks you to email them the last three progress notes.'}</p>
        <p><strong>{lang === 'es' ? 'Respuesta Correcta:' : 'Correct Response:'}</strong> {lang === 'es'
          ? 'No compartas registros sin la autorización adecuada. Explica cortésmente que debes dirigirlos al BCBA o al director de la clínica para cualquier solicitud de registros, que pasa por un proceso formal bajo HIPAA.'
          : 'Do not share records without proper authorization. Politely explain that you need to direct them to the BCBA or clinic director for any record requests, which go through a formal process under HIPAA.'}</p>
      </div>
    ),
  },
]

const getRbtSteps = (lang: Lang) => [
  {
    num: '01',
    title: lang === 'es' ? 'Requisitos de Elegibilidad' : 'Eligibility Requirements',
    body: lang === 'es'
      ? 'Debes tener al menos 18 años, contar con un diploma de escuela secundaria o equivalente, y aprobar una verificación de antecedentes penales. No se requiere experiencia previa en ABA para aplicar.'
      : 'You must be at least 18 years old, hold a high school diploma or equivalent, and pass a criminal background check. No prior ABA experience is required to apply.',
  },
  {
    num: '02',
    title: lang === 'es' ? 'Capacitación de 40 Horas' : '40-Hour Training',
    body: lang === 'es'
      ? 'Completa 40 horas de capacitación que cubren el RBT Task List (3ra Ed.) — incluyendo medición, adquisición de habilidades, reducción de conducta, documentación y conducta profesional.'
      : 'Complete 40 hours of training covering the RBT Task List (3rd Ed.) — including measurement, skill acquisition, behavior reduction, documentation, and professional conduct.',
  },
  {
    num: '03',
    title: lang === 'es' ? 'Evaluación de Competencia' : 'Competency Assessment',
    body: lang === 'es'
      ? 'Un BCBA/BCaBA calificado debe evaluar tu capacidad para realizar cada habilidad del Task List. Esta demostración en vivo es un requisito obligatorio antes de poder presentar el examen.'
      : 'A qualified BCBA/BCaBA must assess your ability to perform each skill on the Task List. This live demonstration is a required gateway before you can sit for the exam.',
  },
  {
    num: '04',
    title: lang === 'es' ? 'Examen de Certificación' : 'Certification Exam',
    body: lang === 'es'
      ? 'Aprueba el examen RBT de la BACB de 85 preguntas que cubre las seis áreas de contenido. El examen se administra en los centros de evaluación Pearson VUE. Se requiere un puntaje aprobatorio para la certificación.'
      : 'Pass the 85-question BACB RBT exam covering all six content areas. The exam is administered at Pearson VUE test centers. A passing score is required for certification.',
  },
  {
    num: '05',
    title: lang === 'es' ? 'Iniciando tu Carrera' : 'Starting Your Career',
    body: lang === 'es'
      ? 'Una vez certificado, trabajarás bajo la supervisión de un BCBA/BCaBA, implementando programas de terapia individualizados, recolectando datos y apoyando a clientes con autismo y necesidades del desarrollo.'
      : "Once certified, you'll work under the supervision of a BCBA/BCaBA, implementing individualized therapy programs, collecting data, and supporting clients with autism and developmental needs.",
  },
]

const getBcbaSteps = (lang: Lang) => [
  {
    num: '01',
    title: lang === 'es' ? 'Requisitos Educativos' : 'Educational Requirements',
    body: lang === 'es'
      ? 'Debes tener como mínimo una licenciatura de una universidad acreditada para aplicar a BCaBA y una maestría para aplicar a BCBA. El título debe ser de una universidad acreditada.'
      : "You must hold a minimum of an accredited university Bachelor's degree to apply to BCaBA and a master's degree to apply to BCBA. The degree must be from an accredited university.",
  },
  {
    num: '02',
    title: lang === 'es' ? 'Cursos Aprobados en ABA' : 'ABA-Approved Coursework',
    body: lang === 'es'
      ? 'Completa una secuencia mínima de 1 año de cursos aprobados en ABA que cubran conceptos de análisis de conducta aplicado, ética, diseño experimental, y evaluación e intervención conductual.'
      : 'Complete a minimum 1 year ABA-Approved Coursework sequence covering applied behavior analysis concepts, ethics, experimental design, and behavior assessment and intervention.',
  },
  {
    num: '03',
    title: lang === 'es' ? 'Práctica Supervisada' : 'Supervised Fieldwork',
    body: lang === 'es'
      ? 'Acumula de 1,500 (BCaBA) a 2,000 (BCBA) horas de práctica supervisada bajo un supervisor aprobado. Un porcentaje mínimo de tus horas debe ser experiencia concentrada con clientes.'
      : 'Accumulate 1,500 (BCaBA)–2,000 (BCBA) hours of supervised fieldwork under an approved supervisor. A minimum percentage of your hours must be in concentrated experience with clients.',
  },
  {
    num: '04',
    title: lang === 'es' ? 'Requisitos de Supervisión' : 'Supervision Requirements',
    body: lang === 'es'
      ? 'La práctica supervisada requiere sesiones de supervisión estructuradas, observación directa y bitácoras documentadas. Tu supervisor debe ser un BCBA certificado con experiencia adecuada.'
      : 'Supervised fieldwork requires structured supervision sessions, direct observation, and documented logs. Your supervisor must be a credentialed BCBA with appropriate experience.',
  },
  {
    num: '05',
    title: lang === 'es' ? 'Examen de Certificación BCBA' : 'BCBA Certification Exam',
    body: lang === 'es'
      ? 'Aprueba el examen BCBA de la BACB — una evaluación rigurosa que cubre principios del análisis de conducta, estándares éticos y aplicación clínica en todas las áreas de contenido principales.'
      : 'Pass the BACB BCBA exam — a rigorous assessment covering behavior analytic principles, ethical standards, and clinical application across all major content areas.',
  },
  {
    num: '06',
    title: lang === 'es' ? 'Crecimiento Profesional y Liderazgo' : 'Career Growth & Leadership',
    body: lang === 'es'
      ? 'Los BCBAs pueden avanzar hacia roles de supervisión, abrir sus propias prácticas, contribuir a la investigación, o especializarse en áreas como gestión organizacional de la conducta, autismo o trastornos de la alimentación.'
      : 'BCBAs can move into supervisory roles, open their own practices, contribute to research, or specialize in areas such as organizational behavior management, autism, or feeding disorders.',
  },
]

const getMentorshipFeatures = (lang: Lang) => lang === 'es' ? [
  'Estrategia de preparación para el examen RBT y planificación de estudio',
  'Currículum, preparación para entrevistas y apoyo en la búsqueda de empleo',
  'Preparación para el examen BCaBA / BCBA y repaso del task list',
  'Orientación para la planificación de práctica y supervisión',
  'Mapeo de trayectoria profesional de RBT a BCBA',
  'Consultoría clínica y apoyo para el crecimiento de tu práctica',
] : [
  'RBT exam preparation strategy & study planning',
  'Resume, interview prep, and job search support',
  'BCaBA / BCBA exam preparation & task list review',
  'Fieldwork and supervision planning guidance',
  'Career trajectory mapping from RBT to BCBA',
  'Clinical consultation and practice growth support',
]

const getMentorshipStages = (lang: Lang) => [
  {
    label: lang === 'es' ? 'RBTs Aspirantes y Actuales' : 'Aspiring & Current RBTs',
    color: '#5BC4F8',
    desc: lang === 'es'
      ? 'Preparación para el examen, preparación para la evaluación de competencia, primer empleo y dirección profesional.'
      : 'Exam prep, competency readiness, first job, and career direction.',
  },
  {
    label: lang === 'es' ? 'Candidatos a BCaBA / BCBA' : 'BCaBA / BCBA Candidates',
    color: '#8B5CF6',
    desc: lang === 'es'
      ? 'Horas de supervisión, estrategia de examen y transición hacia el liderazgo.'
      : 'Supervision hours, exam strategy, and transition into leadership.',
  },
  {
    label: lang === 'es' ? 'BCBAs y Clínicos en Ejercicio' : 'Practicing BCBAs & Clinicians',
    color: '#2EBB50',
    desc: lang === 'es'
      ? 'Consultoría clínica, desarrollo de equipos y crecimiento de la práctica.'
      : 'Clinical consultation, team development, and practice growth.',
  },
]

const CHECKOUT = 'https://light-2-minds.myshopify.com/cart'

const getStudyGuides = (lang: Lang) => [
  {
    id: 'rbt-guide',
    title: 'RBT Exam Study Guide (3rd Ed)',
    credential: 'Registered Behavior Technician',
    description: lang === 'es'
      ? 'Una guía de estudio integral, alineada al task list, que cubre las seis áreas de contenido del examen RBT. Incluye definiciones, ejemplos, trucos mnemotécnicos y preguntas de práctica.'
      : 'A comprehensive, task list–aligned study guide covering all six content areas of the RBT exam. Includes definitions, examples, memory tips, and practice questions.',
    benefits: lang === 'es' ? [
      'Alineada al RBT Task List 3ra Edición',
      'Desglose sección por sección (A–F)',
      'Preguntas de práctica con justificación',
      'Módulo de ética y conducta profesional',
    ] : [
      'Aligned to the RBT Task List 3rd Edition',
      'Section-by-section breakdown (A–F)',
      'Practice questions with rationale',
      'Ethics and professional conduct module',
    ],
    accent: '#5BC4F8',
    dark: '#1A7AC0',
    checkout: `${CHECKOUT}/47184621600939:1`,
  },
  {
    id: 'rbt-guide-es',
    title: 'RBT Exam Study Guide (Español)',
    credential: 'Registered Behavior Technician · En Español',
    description: 'Guía de estudio completa en español alineada al Task List del RBT. Cubre las seis áreas de contenido del examen RBT con definiciones, ejemplos y preguntas de práctica.',
    benefits: ['Alineada al RBT Task List 3rd Edition', 'Desglose sección por sección (A–F)', 'Preguntas de práctica con justificación', 'Módulo de ética y conducta profesional'],
    accent: '#FFE030',
    dark: '#C4A800',
    checkout: `${CHECKOUT}/47208775942315:1`,
  },
  {
    id: 'bcba-guide',
    title: 'BCBA/BCaBA Exam Study Guide (6th Ed)',
    credential: 'Board Certified Behavior Analyst · BCaBA',
    description: lang === 'es'
      ? 'Preparación avanzada para los exámenes BCBA y BCaBA — cubriendo medición de conducta, evaluación, procedimientos de cambio de conducta, ética y responsabilidades de supervisión.'
      : 'Advanced preparation for the BCBA and BCaBA exams — covering behavior measurement, assessment, behavior change procedures, ethics, and supervisory responsibilities.',
    benefits: lang === 'es' ? [
      'Cobertura completa del task list de la 6ta Edición',
      'Escenarios de práctica aplicados basados en casos',
      'Análisis profundo de supervisión y ética',
      'Repaso de análisis de datos y graficación',
    ] : [
      'Full 6th Edition task list coverage',
      'Applied case-based practice scenarios',
      'Supervision and ethics deep-dive',
      'Data analysis and graphing review',
    ],
    accent: '#2EBB50',
    dark: '#1E8E3E',
    checkout: `${CHECKOUT}/47184628809899:1`,
  },
]

const getWhyItems = (lang: Lang) => [
  {
    title: lang === 'es' ? 'Creado por Profesionales de la Conducta' : 'Created by Behavioral Professionals',
    body: lang === 'es'
      ? 'Todo el contenido es desarrollado y revisado por Profesionales de la Conducta con experiencia clínica y de supervisión directa en el campo.'
      : 'All content is developed and reviewed by Behavioral Professionals with direct clinical and supervisory experience in the field.',
    accent: '#5BC4F8',
  },
  {
    title: lang === 'es' ? 'Prácticas de ABA Basadas en Evidencia' : 'Evidence-Based ABA Practices',
    body: lang === 'es'
      ? 'Cada recurso está fundamentado en la ciencia del análisis de conducta aplicado y alineado con los estándares y la ética de la BACB.'
      : 'Every resource is grounded in the science of applied behavior analysis and aligned with BACB standards and ethics.',
    accent: '#2EBB50',
  },
  {
    title: lang === 'es' ? 'Apoyo en Cada Etapa Profesional' : 'Support at Every Career Stage',
    body: lang === 'es'
      ? 'Desde tus primeros pasos como RBT aspirante hasta BCBAs en ejercicio y dueños de práctica — apoyamos a profesionales en todos los niveles.'
      : 'From your first steps as an aspiring RBT to practicing BCBAs and practice owners — we support professionals at every level.',
    accent: '#8B5CF6',
  },
  {
    title: lang === 'es' ? 'Mentoría del Mundo Real' : 'Real-World Mentorship',
    body: lang === 'es'
      ? 'Sesiones individuales enfocadas en lo que realmente sucede en la clínica — orientación práctica, no solo teoría.'
      : 'One-on-one sessions focused on what actually happens in the clinic — practical guidance, not just theory.',
    accent: '#C4A800',
  },
  {
    title: lang === 'es' ? 'Materiales de Estudio Listos para el Examen' : 'Exam-Ready Study Materials',
    body: lang === 'es'
      ? 'Las guías de estudio están escritas para coincidir con el lenguaje exacto y las expectativas del task list de la BACB, para que te prepares con el contenido correcto.'
      : 'Study guides are written to match the exact language and task list expectations of the BACB, so you prepare with the right content.',
    accent: '#5BC4F8',
  },
]

// ── Check icon ─────────────────────────────────────────────────────────────────
function Check({ color = '#2EBB50' }: { color?: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color + '20'} />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
const COMPETENCY_COLORS = ['#5BC4F8', '#2EBB50', '#FFE030', '#8B5CF6', '#64AF92']

export default function ProfessionalsPage() {
  const { lang } = useLang()
  const flashcards = getFlashcards(lang)
  const terminologyItems = getTerminologyItems(lang)
  const ethicsScenarios = getEthicsScenarios(lang)
  const RBT_STEPS = getRbtSteps(lang)
  const BCBA_STEPS = getBcbaSteps(lang)
  const MENTORSHIP_FEATURES = getMentorshipFeatures(lang)
  const MENTORSHIP_STAGES = getMentorshipStages(lang)
  const STUDY_GUIDES = getStudyGuides(lang)
  const WHY_ITEMS = getWhyItems(lang)

  const JUMP_LINKS = lang === 'es' ? [
    { label: 'Ruta RBT', href: '#become-rbt' },
    { label: 'Camino BCBA', href: '#become-bcba' },
    { label: 'Mentoría y Coaching', href: '#mentorship' },
    { label: 'Guías de Estudio', href: '#study-guides' },
    { label: 'Recursos Gratuitos', href: '#resources' },
  ] : [
    { label: 'RBT Roadmap', href: '#become-rbt' },
    { label: 'BCBA Pathway', href: '#become-bcba' },
    { label: 'Mentorship & Coaching', href: '#mentorship' },
    { label: 'Study Guides', href: '#study-guides' },
    { label: 'Free Resources', href: '#resources' },
  ]

  const COMPETENCY_STEPS = lang === 'es' ? [
    { num: '1', title: 'Medición', body: 'Registro de eventos, registro de intervalos, duración y graficación — demostrado en un juego de roles u observación en vivo.' },
    { num: '2', title: 'Adquisición de Habilidades', body: 'Presentar un SD, usar las ayudas correctamente, registrar respuestas y reforzar la conducta según el programa.' },
    { num: '3', title: 'Reducción de Conducta', body: 'Demostrar modificaciones de antecedentes, extinción y estrategias basadas en refuerzo según el BIP.' },
    { num: '4', title: 'Documentación', body: 'Completar una nota de sesión de forma precisa y objetiva después de una sesión simulada.' },
    { num: '5', title: 'Comunicación', body: 'Simular el reporte de eventos conductuales, preocupaciones de seguridad y anomalías en los datos a tu supervisor.' },
  ] : [
    { num: '1', title: 'Measurement', body: 'Event recording, interval recording, duration, and graphing — demonstrated in a role-play or live observation.' },
    { num: '2', title: 'Skill Acquisition', body: 'Deliver an SD, use prompts correctly, record responses, and reinforce behavior per the program.' },
    { num: '3', title: 'Behavior Reduction', body: 'Demonstrate antecedent modifications, extinction, and reinforcement-based strategies per the BIP.' },
    { num: '4', title: 'Documentation', body: 'Complete a session note accurately and objectively following a simulated session.' },
    { num: '5', title: 'Communication', body: 'Role-play reporting behavioral events, safety concerns, and data anomalies to your supervisor.' },
  ]

  const ETHICAL_RESPONSIBILITIES = lang === 'es' ? [
    'Mantener la confidencialidad de toda la información del cliente (HIPAA)',
    'Ejercer solo dentro de tu alcance — implementar los programas diseñados por el BCBA',
    'Reportar de inmediato a tu supervisor cualquier preocupación sobre la seguridad o el bienestar del cliente',
    'Evitar relaciones duales con los clientes y sus familias',
    'Cumplir con los requisitos de supervisión del RBT y documentar las sesiones con precisión',
    'Usar los procedimientos menos restrictivos y más efectivos',
    'Representar tus credenciales con honestidad',
  ] : [
    'Maintain confidentiality for all client information (HIPAA)',
    'Practice only within your scope — implement programs designed by the BCBA',
    'Report any concerns about client safety or welfare to your supervisor immediately',
    'Avoid dual relationships with clients and their families',
    'Complete RBT supervision requirements and document sessions accurately',
    'Use the least restrictive, most effective procedures',
    'Represent your credentials honestly',
  ]

  return (
    <main>

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 pt-28 pb-8 lg:pt-32 lg:pb-10 relative overflow-hidden border-b border-stone-200/60">
        <span className="absolute bottom-0 right-6 text-[8rem] font-bold leading-none text-navy-900/[0.025] select-none pointer-events-none" aria-hidden="true">ABA</span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...up()} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-navy-700/30" />
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40">{lang === 'es' ? 'Para Profesionales de la Salud Conductual' : 'For Behavioral Health Professionals'}</p>
            </div>
            <h1 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.08] mb-3">
              {lang === 'es' ? 'Recursos Profesionales y Desarrollo de Carrera' : 'Professional Resources & Career Development'}
            </h1>
            <p className="text-[14px] font-light text-navy-800/55 leading-relaxed max-w-2xl mb-5">
              {lang === 'es'
                ? 'Recursos, mentoría, preparación para exámenes y herramientas profesionales para RBTs, BCaBAs y BCBAs — aspirantes y en ejercicio.'
                : 'Resources, mentorship, exam preparation, and professional tools for aspiring and practicing RBTs, BCaBAs, and BCBAs.'}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link href="/shop#professionals"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-7 py-3.5 rounded-full hover:bg-gold-300 transition-colors duration-200"
                style={{ boxShadow: '0 4px 0 #C4A800' }}>
                {lang === 'es' ? 'Ver Guías de Estudio' : 'Shop Study Guides'}
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
              <a href={`${CHECKOUT}/47209074819243:1`}
                className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-navy-900 bg-white border border-stone-200 px-7 py-3.5 rounded-full hover:border-navy-900/30 transition-all duration-200">
                {lang === 'es' ? 'Reservar Mentoría' : 'Book Mentorship'}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-navy-700/35">{lang === 'es' ? 'Ir a' : 'Jump to'}</span>
              {JUMP_LINKS.map(link => (
                <a key={link.href} href={link.href}
                  className="text-[12px] font-semibold text-navy-800/50 hover:text-navy-900 underline underline-offset-4 decoration-navy-900/20 hover:decoration-navy-900/50 transition-all duration-150">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. BECOME AN RBT ─────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-b border-stone-200/60" id="become-rbt">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <motion.div {...up()}>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> {lang === 'es' ? 'Ruta de Certificación RBT' : 'RBT Certification Roadmap'}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? 'Conviértete en Técnico de Conducta Registrado.' : 'Become a Registered Behavior Technician.'}
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-6">
                {lang === 'es'
                  ? 'La credencial RBT es tu primer paso hacia el campo del análisis de conducta aplicado. Esto es exactamente lo que necesitas hacer — desde la elegibilidad hasta tu primer día de trabajo.'
                  : "The RBT credential is your first step into the field of applied behavior analysis. Here's exactly what you need to do — from eligibility to your first day on the job."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop#professionals"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-5 py-2.5 rounded-full hover:bg-gold-300 transition-colors">
                  {lang === 'es' ? 'Ver Guías de Estudio' : 'Shop Study Guides'}
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-stone-300 px-5 py-2.5 rounded-full hover:border-navy-900/50 transition-all">
                  {lang === 'es' ? 'Reservar Mentoría' : 'Book Mentorship'}
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#2EBB50' }}>
                  {lang === 'es' ? 'Reservar Evaluación de Competencia' : 'Book Competency Assessment'}
                </Link>
              </div>
            </motion.div>

            <div className="space-y-3">
              {RBT_STEPS.map((step, i) => (
                <motion.div key={step.num} {...up(i * 0.06)}
                  className="flex gap-5 border border-stone-200/70 rounded-2xl p-5" style={{ backgroundColor: 'rgba(91,196,248,0.05)' }}>
                  <div className="w-9 h-9 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#1A7AC0' }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BECOME A BCaBA / BCBA ─────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-200/60" id="become-bcba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="space-y-3 lg:order-2">
              {BCBA_STEPS.map((step, i) => (
                <motion.div key={step.num} {...up(i * 0.06)}
                  className="flex gap-5 border border-stone-200/70 rounded-2xl p-5" style={{ backgroundColor: 'rgba(139,92,246,0.06)' }}>
                  <div className="w-9 h-9 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#8B5CF6' }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...up()} className="lg:order-1">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> {lang === 'es' ? 'Camino BCaBA / BCBA' : 'BCaBA / BCBA Pathway'}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? 'Avanza hacia BCaBA o BCBA.' : 'Advance to BCaBA or BCBA.'}
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-6">
                {lang === 'es'
                  ? 'Convertirte en Analista de Conducta Certificado por la Junta es uno de los caminos profesionales más gratificantes en la salud conductual. Esta es la ruta completa — desde los cursos hasta la certificación.'
                  : "Becoming a Board Certified Behavior Analyst is one of the most rewarding professional paths in behavioral health. Here's the full roadmap — from coursework to certification."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop#professionals"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-5 py-2.5 rounded-full hover:bg-gold-300 transition-colors">
                  {lang === 'es' ? 'Ver Guías de Estudio' : 'Shop Study Guides'}
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-stone-300 px-5 py-2.5 rounded-full hover:border-navy-900/50 transition-all">
                  {lang === 'es' ? 'Reservar Mentoría' : 'Book Mentorship'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. PROFESSIONAL MENTORSHIP ────────────────────────────────────────── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-b border-stone-200/60" id="mentorship">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — value proposition + features + CTA */}
            <motion.div {...up()}>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> {lang === 'es' ? 'Servicios Premium' : 'Premium Services'}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? 'Mentoría y Coaching Profesional.' : 'Professional Mentorship & Coaching.'}
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-7">
                {lang === 'es'
                  ? 'Sesiones individuales dirigidas por un profesional conductual, adaptadas a tu etapa profesional. Ya sea que te estés preparando para tu primer examen, avanzando hacia la supervisión, o haciendo crecer una práctica — somos tu aliado profesional dedicado.'
                  : "Behavioral professional-led, one-on-one sessions tailored to your career stage. Whether you're preparing for your first exam, moving into supervision, or growing a practice — we're your dedicated career partner."}
              </p>
              <ul className="space-y-3 mb-8">
                {MENTORSHIP_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[13px] text-navy-800/65 leading-relaxed">
                    <Check color="#2EBB50" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/shop#services"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold text-white px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}>
                {lang === 'es' ? 'Reservar una Sesión de Mentoría' : 'Book a Mentorship Session'}
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
              </Link>
            </motion.div>

            {/* Right — who is this for */}
            <motion.div {...up(0.1)}>
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden">
                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #5BC4F8, #8B5CF6, #2EBB50)' }} />
                <div className="p-7">
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-navy-700/40 mb-5">{lang === 'es' ? '¿Para quién es esto?' : 'Who is this for?'}</p>
                  <div className="space-y-4">
                    {MENTORSHIP_STAGES.map(stage => (
                      <div key={stage.label} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: stage.color }} />
                        <div>
                          <p className="text-[13.5px] font-semibold text-navy-900 mb-0.5">{stage.label}</p>
                          <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 pt-6 border-t border-stone-100">
                    <p className="text-[12px] text-navy-800/40 leading-relaxed">
                      {lang === 'es'
                        ? 'Las sesiones se realizan virtualmente con un Profesional de la Conducta. Disponible en inglés y español.'
                        : 'Sessions are conducted virtually by a Behavior Professional. Available in English and Spanish.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Competency Assessment deep-dive */}
          <motion.div {...up()} id="competency">
            <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2EBB50, #5BC4F8)' }} />
              <div className="p-5 lg:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div className="max-w-xl">
                    <span className="inline-block text-[10px] font-bold tracking-[0.12em] uppercase text-forest-700 bg-forest-100 px-2.5 py-1 rounded-full mb-2">{lang === 'es' ? 'Preparación para la Competencia' : 'Competency Preparation'}</span>
                    <h3 className="text-[15px] font-bold text-navy-900 mb-2">{lang === 'es' ? 'Evaluación de Competencia RBT — Qué Esperar.' : 'RBT Competency Assessment — What to Expect.'}</h3>
                    <p className="text-[13px] text-navy-800/50 leading-relaxed">
                      {lang === 'es'
                        ? 'Antes de recibir tu certificación RBT, un BCBA/BCaBA debe evaluar tu capacidad para realizar las habilidades del Task List. Esta es una demostración en vivo obligatoria — no un examen escrito.'
                        : 'Before receiving your RBT certification, a BCBA/BCaBA must assess your ability to perform the skills on the Task List. This is a required live demonstration — not a written test.'}
                    </p>
                  </div>
                  <Link href="/shop#services"
                    className="flex-shrink-0 inline-flex items-center gap-2 text-[12.5px] font-bold text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity self-start"
                    style={{ backgroundColor: '#2EBB50', boxShadow: '0 3px 0 #1E8E3E' }}>
                    {lang === 'es' ? 'Reservar Evaluación' : 'Book Assessment'}
                    <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {COMPETENCY_STEPS.map((step, i) => (
                    <div key={step.num} className="flex gap-3 rounded-xl p-4 border border-stone-100" style={{ backgroundColor: COMPETENCY_COLORS[i % COMPETENCY_COLORS.length] + '0A' }}>
                      <div className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COMPETENCY_COLORS[i % COMPETENCY_COLORS.length] }}>{step.num}</div>
                      <div>
                        <h4 className="text-[12.5px] font-semibold text-navy-900 mb-0.5 leading-snug">{step.title}</h4>
                        <p className="text-[11.5px] text-navy-800/45 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col justify-between bg-forest-50 border border-forest-100 rounded-xl p-4">
                    <p className="text-[12.5px] font-semibold text-navy-900 mb-3">{lang === 'es' ? '¿Listo para agendar?' : 'Ready to schedule?'}</p>
                    <Link href="/shop#services"
                      className="text-[12px] font-bold flex items-center gap-1.5 transition-colors hover:opacity-80"
                      style={{ color: '#2EBB50' }}>
                      {lang === 'es' ? 'Reservar Ahora' : 'Book Now'} <span className="w-3 h-px bg-current" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FEATURED STUDY GUIDES ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 border-b border-navy-800" id="study-guides" style={{ backgroundColor: '#0D1B2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" /> {lang === 'es' ? 'Materiales de Estudio Premium' : 'Premium Study Materials'}
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1]">
                {lang === 'es' ? 'Guías de Estudio para Cada Credencial.' : 'Study Guides for Every Credential.'}
              </h2>
              <p className="text-[13.5px] text-white/50 leading-relaxed mt-3 max-w-xl">
                {lang === 'es'
                  ? 'Guías de estudio clínicamente precisas y alineadas al examen, escritas por un Profesional de la Conducta. Todo lo que necesitas para aprobar — en un solo recurso.'
                  : 'Clinically accurate, exam-aligned study guides written by a Behavioral Professional. Everything you need to pass — in one resource.'}
              </p>
            </div>
            <Link href="/shop#professionals"
              className="flex-shrink-0 inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-8 py-3.5 rounded-full hover:bg-gold-300 transition-colors self-start lg:self-auto"
              style={{ boxShadow: '0 4px 0 #C4A800' }}>
              {lang === 'es' ? 'Visitar la Tienda' : 'Visit the Shop'}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STUDY_GUIDES.map((g, i) => (
              <motion.div key={g.id} {...up(i * 0.08)}
                className="flex flex-col rounded-3xl overflow-hidden border"
                style={{ borderColor: g.accent + '30', backgroundColor: g.accent + '0A' }}>
                <div className="h-1.5 w-full" style={{ backgroundColor: g.accent }} />
                <div className="flex flex-col flex-1 p-7">
                  <div className="mb-5">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2" style={{ color: g.accent }}>{g.credential}</p>
                    <h3 className="text-[20px] font-bold text-white leading-tight mb-3">{g.title}</h3>
                    <p className="text-[13px] text-white/50 leading-relaxed">{g.description}</p>
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {g.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-[12.5px] text-white/60">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" fill={g.accent + '25'} />
                          <path d="M5 8l2 2 4-4" stroke={g.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/shop#professionals"
                    className="inline-flex items-center justify-center gap-2 text-[13px] font-bold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: g.accent, color: g.accent === '#FFE030' ? '#0D1B2E' : '#fff', boxShadow: `0 3px 0 ${g.dark}` }}>
                    {lang === 'es' ? 'Ver en la Tienda' : 'View in Shop'}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FREE ABA RESOURCE CENTER ──────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-200/60" id="resources">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white bg-forest-500">{lang === 'es' ? 'GRATIS' : 'FREE'}</span>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40">{lang === 'es' ? 'Centro de Recursos ABA' : 'ABA Resource Center'}</p>
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? 'Herramientas gratuitas para construir tu base.' : 'Free tools to build your foundation.'}
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed max-w-xl">
                {lang === 'es'
                  ? 'Todos los recursos a continuación son completamente gratuitos. Úsalos para estudiar, practicar y prepararte. Para la biblioteca completa, visita la página de Herramientas.'
                  : 'All resources below are completely free. Use them to study, practice, and prepare. For the full library, visit the Tools page.'}
              </p>
            </div>
            <Link href="/tools"
              className="flex-shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto">
              {lang === 'es' ? 'Ver Todos los Recursos Gratuitos' : 'View All Free Resources'}
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </Link>
          </motion.div>

          {/* A. Interactive Flashcards */}
          <div className="mb-8" id="materials">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">{lang === 'es' ? 'GRATIS' : 'FREE'}</span>
                <h3 className="text-[15px] font-bold text-navy-900">{lang === 'es' ? 'Aprendizaje Interactivo — Tarjetas ABA' : 'Interactive Learning — ABA Flashcards'}</h3>
              </div>
              <p className="text-[12px] text-navy-800/35 hidden sm:block">{lang === 'es' ? 'Haz clic en una tarjeta para voltearla' : 'Click a card to flip'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {flashcards.map((card, i) => (
                <motion.div key={card.term} {...up(i * 0.04)}>
                  <FlashCard section={card.section} term={card.term} definition={card.definition} />
                </motion.div>
              ))}
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              {lang === 'es' ? 'Ver todos los mazos de tarjetas en la página de Herramientas' : 'See all flashcard decks on the Tools page'} <span className="w-3 h-px bg-current" />
            </Link>
          </div>

          {/* B. ABA Terminology */}
          <div className="mb-8" id="terminology">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">{lang === 'es' ? 'GRATIS' : 'FREE'}</span>
              <h3 className="text-[15px] font-bold text-navy-900">{lang === 'es' ? 'Terminología ABA — Conceptos Esenciales' : 'ABA Terminology — Essential Concepts'}</h3>
            </div>
            <div className="max-w-3xl mb-4">
              <Accordion items={terminologyItems} openFirst />
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              {lang === 'es' ? 'Descarga el glosario completo en la página de Herramientas' : 'Download full glossary on the Tools page'} <span className="w-3 h-px bg-current" />
            </Link>
          </div>

          {/* C. Professional Conduct */}
          <div className="mb-8" id="ethics">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">{lang === 'es' ? 'GRATIS' : 'FREE'}</span>
              <h3 className="text-[15px] font-bold text-navy-900">{lang === 'es' ? 'Conducta Profesional y Ética' : 'Professional Conduct & Ethics'}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <div className="bg-navy-50 border border-navy-100 rounded-2xl p-7">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-4">{lang === 'es' ? 'Responsabilidades Éticas Fundamentales del RBT' : 'Core RBT Ethical Responsibilities'}</h4>
                <ul className="space-y-2.5">
                  {ETHICAL_RESPONSIBILITIES.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-navy-800/60">
                      <Check color="#5BC4F8" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-navy-900 mb-4">{lang === 'es' ? 'Escenarios de Ética — Práctica para el Examen' : 'Ethics Scenarios — Exam Practice'}</h4>
                <Accordion items={ethicsScenarios} />
              </div>
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              {lang === 'es' ? 'Descarga la hoja de referencia rápida de ética en la página de Herramientas' : 'Download ethics quick-reference on the Tools page'} <span className="w-3 h-px bg-current" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 8. WHY LIGHT2MINDS ───────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-10 lg:py-12 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Por Qué Light2Minds' : 'Why Light2Minds'}</p>
            <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es' ? 'Construido por clínicos. Diseñado para ti.' : 'Built by clinicians. Designed for you.'}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_ITEMS.map((item, i) => (
              <motion.div key={item.title} {...up(i * 0.06)}
                className="flex items-start gap-3 border border-stone-200/60 rounded-xl p-4" style={{ backgroundColor: item.accent + '08' }}>
                <Check color={item.accent} />
                <div>
                  <p className="text-[13px] font-semibold text-navy-900 leading-snug mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-navy-800/45 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()}
            className="bg-navy-900 rounded-3xl px-8 py-10 lg:px-16 lg:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-3">{lang === 'es' ? 'Da el Siguiente Paso' : 'Take the Next Step'}</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-3">
                {lang === 'es' ? '¿Listo para Avanzar tu Carrera en Salud Conductual?' : 'Ready to Advance Your Behavioral Health Career?'}
              </h2>
              <p className="text-[13.5px] text-white/50 leading-relaxed">
                {lang === 'es'
                  ? 'Ya sea que te estés preparando para tu primer examen o creciendo hacia un rol clínico senior — Light2Minds es tu aliado dedicado en cada etapa.'
                  : "Whether you're preparing for your first exam or growing into a senior clinical role — Light2Minds is your dedicated partner at every stage."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link href="/shop#professionals"
                className="inline-flex items-center justify-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-8 py-3.5 rounded-full hover:bg-gold-300 transition-colors"
                style={{ boxShadow: '0 4px 0 #C4A800' }}>
                {lang === 'es' ? 'Ver Guías de Estudio' : 'Shop Study Guides'}
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
              <a href={`${CHECKOUT}/47209074819243:1`}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white border border-white/20 px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
                {lang === 'es' ? 'Reservar Mentoría' : 'Book Mentorship'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
