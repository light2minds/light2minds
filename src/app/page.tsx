import Hero from '@/components/home/Hero'
import DisclaimerBanner from '@/components/home/DisclaimerBanner'
import Pathways from '@/components/home/Pathways'
import ServicesGrid from '@/components/home/ServicesGrid'
import { FeatureFamilies, FeatureProfessionals } from '@/components/home/FeatureRows'
import StatsStrip from '@/components/home/StatsStrip'
import WhySection from '@/components/home/WhySection'
import ConditionsSection from '@/components/home/ConditionsSection'
import ResourcesSection from '@/components/home/ResourcesSection'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata = {
  title: 'Light2minds — Behavioral & Neurodevelopmental Guidance · Florida',
  description:
    'Light2minds supports Florida families of children with autism, ADHD, and developmental challenges, and prepares RBT professionals for rewarding careers in ABA therapy.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DisclaimerBanner />
      <Pathways />
      <ServicesGrid />
      <FeatureFamilies />
      <FeatureProfessionals />
      <StatsStrip />
      <WhySection />
      <ConditionsSection />
      <ResourcesSection />
      <CtaBanner />
    </>
  )
}
