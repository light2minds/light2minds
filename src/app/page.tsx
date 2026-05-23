import Hero from '@/components/home/Hero'
import Pathways from '@/components/home/Pathways'
import FamilyJourney from '@/components/home/FamilyJourney'
import ProfessionalEcosystem from '@/components/home/ProfessionalEcosystem'
import ResourcesSection from '@/components/home/ResourcesSection'

export const metadata = {
  title: 'Light2minds — Behavioral & Neurodevelopmental Guidance',
  description:
    'Resources and tools for families navigating autism, ADHD, and developmental differences — and for ABA professionals building their careers.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pathways />
      <FamilyJourney />
      <ProfessionalEcosystem />
      <ResourcesSection />
    </>
  )
}
