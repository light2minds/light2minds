'use client'

import { useState } from 'react'

interface FlashCardProps {
  section: string
  term: string
  definition: string
}

export default function FlashCard({ section, term, definition }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="group relative w-full text-left border border-stone-200/70 rounded-2xl p-6 min-h-[160px] bg-white hover:shadow-sm hover:shadow-stone-200/80 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
      aria-label={`Flashcard: ${term}. Click to ${flipped ? 'show term' : 'reveal definition'}`}
    >
      {!flipped ? (
        <div className="flex flex-col justify-between h-full min-h-[112px]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-forest-600/70 mb-3">{section}</p>
            <p className="text-[15px] font-semibold text-navy-900">{term}</p>
          </div>
          <p className="text-[11px] text-navy-800/30 mt-4">Tap to reveal definition</p>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full min-h-[112px]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-navy-700/35 mb-3">Definition</p>
            <p className="text-[13px] text-navy-800/70 leading-relaxed">{definition}</p>
          </div>
          <p className="text-[11px] text-navy-800/30 mt-4">Tap to see term</p>
        </div>
      )}
    </button>
  )
}
