'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Shield, FileText, Video, Heart, Users, Star } from "lucide-react"

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4E3] text-[#2C3E50]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="#">
          <Heart className="h-6 w-6 text-[#7C9885]" />
          <span className="ml-2 text-2xl font-bold text-[#7C9885]">CareSchedule</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-[#F8F4E3]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#7C9885]">
                  Streamline Your Care Practice
                </h1>
                <p className="mx-auto max-w-[700px] text-[#2C3E50] md:text-xl">
                  Effortlessly manage appointments, clients, and sessions. Designed specifically for therapists, counselors, and wellness professionals.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]" size="lg">Start Free Trial</Button>
                <Button variant="outline" className="text-[#7C9885] border-[#7C9885] hover:bg-[#7C9885] hover:text-white" size="lg">Book a Demo</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-[#7C9885]">
              Features Tailored for Care Professionals
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Calendar, title: "Smart Scheduling", description: "Easily manage appointments with customizable session durations and buffer times between clients." },
                { icon: Shield, title: "Client Confidentiality", description: "Ensure client privacy with secure data storage and HIPAA-compliant communication tools." },
                { icon: FileText, title: "Session Notes", description: "Easily create, store, and access encrypted session notes for each client interaction." },
                { icon: Video, title: "Telehealth Integration", description: "Seamlessly integrate with popular telehealth platforms for virtual sessions and consultations." },
                { icon: Users, title: "Client Management", description: "Keep track of client information, treatment plans, and progress all in one secure place." },
                { icon: Heart, title: "Care Continuity", description: "Set reminders for follow-ups and maintain consistent care with automated appointment series." }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                  <feature.icon className="h-12 w-12 mb-4 text-[#7C9885]" />
                  <h3 className="text-xl font-bold mb-2 text-[#2C3E50]">{feature.title}</h3>
                  <p className="text-[#2C3E50]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#A4C3D2]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              Trusted by Care Professionals
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "CareSchedule has transformed how I manage my therapy practice. It's intuitive and designed with mental health professionals in mind.",
                  author: "Dr. Emily Chen",
                  title: "Licensed Psychologist"
                },
                {
                  quote: "The client confidentiality features give me peace of mind, and the integrated notes system has streamlined my workflow immensely.",
                  author: "Mark Johnson",
                  title: "Counselor, LMHC"
                },
                {
                  quote: "As a wellness coach, I love how CareSchedule helps me stay organized and focused on my clients' well-being journey.",
                  author: "Sarah Thompson",
                  title: "Holistic Wellness Coach"
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                  <Star className="h-12 w-12 mb-4 text-[#D68C45]" />
                  <p className="text-[#2C3E50] mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-bold text-[#2C3E50]">{testimonial.author}</p>
                  <p className="text-sm text-[#2C3E50]">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-[#7C9885]">
              Pricing Plans for Every Practice
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Solo Practitioner",
                  price: "$29/month",
                  features: [
                    "Up to 100 appointments/month",
                    "Basic client management",
                    "Session notes",
                    "Email support"
                  ]
                },
                {
                  name: "Growing Practice",
                  price: "$79/month",
                  features: [
                    "Unlimited appointments",
                    "Advanced client management",
                    "Customizable intake forms",
                    "Telehealth integration",
                    "Priority support"
                  ]
                },
                {
                  name: "Multi-Provider Clinic",
                  price: "Custom",
                  features: [
                    "All Growing Practice features",
                    "Multiple provider accounts",
                    "Advanced analytics and reporting",
                    "Custom integrations",
                    "Dedicated account manager"
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-[#2C3E50]">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 text-[#7C9885]">{plan.price}</p>
                  <ul className="mb-6 space-y-2 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#D68C45]" />
                        <span className="text-[#2C3E50]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-[#7C9885] text-white hover:bg-[#6A8A73]">Choose Plan</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#7C9885] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Care Practice?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Start your 30-day free trial today. No credit card required.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-[#2C3E50]"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-[#D68C45] text-white hover:bg-[#C47E3D]">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#F8F4E3]">
        <p className="text-xs text-[#2C3E50]">
          © 2024 CareSchedule. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-[#2C3E50]" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-[#2C3E50]" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-[#2C3E50]" href="#">
            HIPAA Compliance
          </Link>
        </nav>
      </footer>
    </div>
  )
}