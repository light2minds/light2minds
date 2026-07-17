'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

export default function CheckoutSuccessPage() {
  const { lang } = useLang()

  const steps = lang === 'es' ? [
    { icon: '📧', step: 'Revisa tu correo electrónico', desc: 'Se ha enviado un correo de confirmación con tus enlaces de descarga a tu bandeja de entrada.' },
    { icon: '⬇️', step: 'Descarga tus recursos', desc: 'Haz clic en los enlaces de tu correo para acceder y descargar tus archivos de inmediato.' },
    { icon: '🖨️', step: 'Imprime y usa', desc: 'Imprime tus recursos o guárdalos en tu dispositivo — son tuyos para siempre.' },
  ] : [
    { icon: '📧', step: 'Check your email', desc: 'A confirmation email with your download links has been sent to your inbox.' },
    { icon: '⬇️', step: 'Download your resources', desc: 'Click the links in your email to access and download your files immediately.' },
    { icon: '🖨️', step: 'Print & use', desc: "Print your resources or save them to your device — they're yours to keep." },
  ]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: WARM_BG }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg text-center"
      >
        {/* Check icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
        >
          <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <path d="M8 20L16 28L32 12" stroke="#2EBB50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-[1.8rem] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
          {lang === 'es' ? 'Tu pedido está confirmado.' : 'Your order is confirmed.'}
        </h1>
        <p className="text-[15px] text-navy-800/55 leading-relaxed mb-8">
          {lang === 'es'
            ? 'Gracias por tu compra. Tus recursos están listos para descargar — revisa tu correo electrónico para los enlaces de descarga y tu recibo.'
            : 'Thank you for your purchase. Your resources are ready to download — check your email for the download links and your receipt.'}
        </p>

        {/* Download box */}
        <div className="bg-white rounded-2xl border border-stone-200/70 p-7 mb-8 text-left">
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-navy-800/40 mb-4">{lang === 'es' ? 'Qué sigue' : 'What happens next'}</p>
          <div className="space-y-4">
            {steps.map(s => (
              <div key={s.step} className="flex gap-4">
                <span className="text-[20px] flex-shrink-0">{s.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-navy-900 mb-0.5">{s.step}</p>
                  <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/parents"
            className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-navy-900 px-6 py-3 rounded-full border border-navy-900/20 hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            {lang === 'es' ? 'Recursos para Padres' : 'Parent Resources'}
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all"
            style={{ backgroundColor: '#FFE030', boxShadow: '0 3px 0 #C4A800' }}
          >
            {lang === 'es' ? 'Volver a la Tienda' : 'Back to Shop'}
          </Link>
        </div>

        <p className="text-[12px] text-navy-800/30 mt-6">
          {lang === 'es' ? '¿Preguntas? Escríbenos a' : 'Questions? Email us at'}{' '}
          <a href="mailto:info@light2minds.com" className="underline underline-offset-2 hover:text-navy-600 transition-colors">
            info@light2minds.com
          </a>
        </p>
      </motion.div>
    </main>
  )
}
