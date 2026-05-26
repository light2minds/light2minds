import Hero from '@/components/home/Hero'
import GoalsSection from '@/components/home/GoalsSection'
import CredentialsSection from '@/components/home/CredentialsSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata = {
  title: 'Light2minds — Behavioral & Neurodevelopmental Guidance · Florida',
  description:
    'Light2minds supports Florida families of children with autism, ADHD, and developmental challenges, and prepares RBT professionals for rewarding careers in ABA therapy.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoalsSection />
      <CredentialsSection />
      <ContactSection />
    </>
  )
}
