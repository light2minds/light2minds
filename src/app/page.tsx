import Hero from '@/components/home/Hero'
import GoalsSection from '@/components/home/GoalsSection'
import FreeToolsSection from '@/components/home/FreeToolsSection'
import CredentialsSection from '@/components/home/CredentialsSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata = {
  title: 'Light2Minds — Behavioral & Neurodevelopmental Guidance · Florida',
  description:
    'Light2Minds supports Florida families of children with autism, ADHD, and developmental challenges, and prepares RBT professionals for rewarding careers in ABA therapy.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoalsSection />
      <FreeToolsSection />
      <CredentialsSection />
      <ContactSection />
    </>
  )
}
