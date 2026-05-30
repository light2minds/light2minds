'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function ContactSection() {
  const { lang } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder — replace with real form submission (e.g. Formspree, EmailJS)
    setSubmitted(true)
  }

  return (
    <section className="bg-white py-24 lg:py-36 border-t border-stone-200/40" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 lg:gap-24">

          {/* Left — info */}
          <motion.div {...fade()}>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#FFE030' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
              </span>
            </div>
            <h2 className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-6">
              {lang === 'es'
                ? <>Hablemos.<br />Estamos aquí para ayudar.</>
                : <>Let&apos;s talk.<br />We&apos;re here to help.</>
              }
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-10 max-w-md">
              {lang === 'es'
                ? 'Ya sea que seas una familia buscando orientación, un profesional con preguntas, o alguien interesado en colaborar — nos encantaría saber de ti.'
                : "Whether you're a family seeking guidance, a professional with questions, or someone interested in collaborating — we'd love to hear from you."}
            </p>

            <div className="space-y-4">
              <a
                href="mailto:info@light2minds.com"
                className="flex items-center gap-3 text-[14px] text-navy-900 font-medium group"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,224,48,0.15)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#B8900E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="14" height="10" rx="1.5" />
                    <path d="M1 5l7 5 7-5" />
                  </svg>
                </span>
                <span className="group-hover:text-navy-600 transition-colors">info@light2minds.com</span>
              </a>

              <div className="flex items-center gap-3 text-[14px] text-navy-800/50">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(91,196,248,0.12)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#5BC4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" />
                    <circle cx="8" cy="6" r="1.5" />
                  </svg>
                </span>
                Florida, USA
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...fade(0.12)}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#2EBB50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[1.1rem] font-bold text-navy-900 mb-2">
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p className="text-[14px] text-navy-800/50">
                  {lang === 'es' ? 'Te responderemos pronto.' : "We'll get back to you soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5 tracking-[0.04em]">
                    {lang === 'es' ? 'Tu nombre' : 'Your name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors duration-150 bg-stone-50/60"
                    placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5 tracking-[0.04em]">
                    {lang === 'es' ? 'Correo electrónico' : 'Email address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors duration-150 bg-stone-50/60"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5 tracking-[0.04em]">
                    {lang === 'es' ? 'Mensaje' : 'Message'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors duration-150 resize-none bg-stone-50/60"
                    placeholder={lang === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-[14px] font-bold text-navy-900 transition-all duration-150 hover:translate-y-[-1px] active:translate-y-[1px]"
                  style={{
                    backgroundColor: '#FFE030',
                    boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)',
                  }}
                >
                  {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
                </button>
                <p className="text-[11px] text-navy-800/30 text-center">
                  {lang === 'es'
                    ? 'Respondemos en 1–2 días hábiles.'
                    : 'We respond within 1–2 business days.'}
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
