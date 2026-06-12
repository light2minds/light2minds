import Hero from '@/components/home/Hero'
import MissionSection from '@/components/home/MissionSection'
import StatsStrip from '@/components/home/StatsStrip'
import GoalsSection from '@/components/home/GoalsSection'
import FamilyJourney from '@/components/home/FamilyJourney'
import FamilyBundlesSection from '@/components/home/FamilyBundlesSection'
import ProfessionalEcosystem from '@/components/home/ProfessionalEcosystem'
import FreeToolsSection from '@/components/home/FreeToolsSection'
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
      <MissionSection />
      <StatsStrip />
      <GoalsSection />
      <FamilyJourney />
      <FamilyBundlesSection />
      <ProfessionalEcosystem />
      <FreeToolsSection />
      <ContactSection />
    </>
  )
}
