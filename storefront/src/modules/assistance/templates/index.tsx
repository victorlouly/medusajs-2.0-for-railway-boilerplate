import { Metadata } from "next"
import AssistanceHero from "../components/assistance-hero"
import ServicesSection from "../components/services-section"
import ContactForm from "../components/contact-form"

export const metadata: Metadata = {
  title: "Assistência Técnica Apple | Reparo de iPhone e MacBook",
  description: "Especialistas em manutenção e reparo de produtos Apple. Serviços especializados para iPhone e MacBook com garantia e qualidade.",
}

export default function AssistancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AssistanceHero />
      <ServicesSection />
      <ContactForm />
    </div>
  )
}
