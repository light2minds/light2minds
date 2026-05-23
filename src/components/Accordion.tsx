'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  trigger: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  openFirst?: boolean
  variant?: 'default' | 'pale'
}

export default function Accordion({ items, openFirst = false, variant = 'default' }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null)

  const bg = variant === 'pale' ? 'bg-stone-50' : 'bg-white'

  return (
    <div className={`border border-stone-200/70 rounded-2xl overflow-hidden divide-y divide-stone-100`}>
      {items.map((item, i) => (
        <div key={i} className={bg}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-stone-50/80 transition-colors duration-150"
          >
            <span className="text-[14px] font-semibold text-navy-900">{item.trigger}</span>
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full border border-stone-200 flex items-center justify-center transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg className="w-2.5 h-2.5 text-navy-600" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M5 2v6M2 5h6" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-[13px] text-navy-800/60 leading-relaxed [&_ul]:space-y-2 [&_ul]:mt-2 [&_li]:text-[13px] [&_li]:text-navy-800/60 [&_strong]:text-navy-800/80 [&_strong]:font-semibold">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
