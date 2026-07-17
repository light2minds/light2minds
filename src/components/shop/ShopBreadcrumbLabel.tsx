'use client'

import { useLang } from '@/lib/language'

export default function ShopBreadcrumbLabel() {
  const { lang } = useLang()
  return <>{lang === 'es' ? 'Tienda' : 'Shop'}</>
}
