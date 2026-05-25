'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'es'
interface LangCtx { lang: Lang; setLang: (l: Lang) => void }

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} })
export const useLang = () => useContext(Ctx)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('l2m-lang') as Lang | null
    if (saved === 'en' || saved === 'es') setLang(saved)
  }, [])

  const update = (l: Lang) => {
    setLang(l)
    localStorage.setItem('l2m-lang', l)
  }

  return <Ctx.Provider value={{ lang, setLang: update }}>{children}</Ctx.Provider>
}
