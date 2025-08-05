"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Send,
  User,
  MessageSquare,
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Language translations
const translations = {
  sv: {
    title: "Kontakta Oss",
    subtitle: "Vi ser fram emot att höra från dig",
    contact: {
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se",
      hours: "Mån-Fre: 11:00-22:00, Lör-Sön: 12:00-23:00"
    },
    form: {
      title: "Skicka ett meddelande",
      name: "Namn",
      email: "E-post",
      phone: "Telefon (valfritt)",
      subject: "Ämne",
      message: "Meddelande",
      send: "Skicka meddelande",
      success: "Tack för ditt meddelande! Vi återkommer inom kort.",
      subjects: {
        general: "Allmän förfrågan",
        booking: "Bordsbokningar",
        events: "Evenemang & Fester",
        catering: "Catering",
        feedback: "Feedback",
        other: "Övrigt"
      }
    },
    info: {
      address: {
        title: "Besök oss",
        description: "Centralt beläget i Trelleborg"
      },
      phone: {
        title: "Ring oss",
        description: "Vardagar 11:00-22:00"
      },
      email: {
        title: "Maila oss",
        description: "Svarar inom 24 timmar"
      },
      hours: {
        title: "Öppettider",
        description: "Se våra aktuella öppettider"
      }
    },
    directions: {
      title: "Hitta hit",
      description: "Vi ligger mitt i Trelleborgs centrum, nära alla större kollektivtrafikförbindelser.",
      parking: "Parkering finns på Stortorget och närliggande gator.",
      bus: "Busshållplats 'Trelleborg C' ligger 2 minuter bort."
    },
    social: {
      title: "Följ oss",
      description: "Håll dig uppdaterad med våra senaste nyheter och erbjudanden"
    },
    bookTable: "Boka Bord",
    backToHome: "Tillbaka till Startsidan"
  },
  en: {
    title: "Contact Us",
    subtitle: "We look forward to hearing from you",
    contact: {
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se",
      hours: "Mon-Fri: 11:00-22:00, Sat-Sun: 12:00-23:00"
    },
    form: {
      title: "Send a message",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      success: "Thank you for your message! We'll get back to you shortly.",
      subjects: {
        general: "General inquiry",
        booking: "Table reservations",
        events: "Events & Parties",
        catering: "Catering",
        feedback: "Feedback",
        other: "Other"
      }
    },
    info: {
      address: {
        title: "Visit us",
        description: "Centrally located in Trelleborg"
      },
      phone: {
        title: "Call us",
        description: "Weekdays 11:00-22:00"
      },
      email: {
        title: "Email us",
        description: "We respond within 24 hours"
      },
      hours: {
        title: "Opening hours",
        description: "See our current opening hours"
      }
    },
    directions: {
      title: "Find us",
      description: "We are located in the center of Trelleborg, close to all major public transport connections.",
      parking: "Parking is available at Stortorget and nearby streets.",
      bus: "Bus stop 'Trelleborg C' is 2 minutes away."
    },
    social: {
      title: "Follow us",
      description: "Stay updated with our latest news and offers"
    },
    bookTable: "Book a Table",
    backToHome: "Back to Home"
  },
  de: {
    title: "Kontaktieren Sie uns",
    subtitle: "Wir freuen uns, von Ihnen zu hören",
    contact: {
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se",
      hours: "Mo-Fr: 11:00-22:00, Sa-So: 12:00-23:00"
    },
    form: {
      title: "Nachricht senden",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon (optional)",
      subject: "Betreff",
      message: "Nachricht",
      send: "Nachricht senden",
      success: "Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.",
      subjects: {
        general: "Allgemeine Anfrage",
        booking: "Tischreservierungen",
        events: "Veranstaltungen & Feiern",
        catering: "Catering",
        feedback: "Feedback",
        other: "Sonstiges"
      }
    },
    info: {
      address: {
        title: "Besuchen Sie uns",
        description: "Zentral gelegen in Trelleborg"
      },
      phone: {
        title: "Rufen Sie uns an",
        description: "Wochentags 11:00-22:00"
      },
      email: {
        title: "Schreiben Sie uns",
        description: "Wir antworten innerhalb von 24 Stunden"
      },
      hours: {
        title: "Öffnungszeiten",
        description: "Sehen Sie unsere aktuellen Öffnungszeiten"
      }
    },
    directions: {
      title: "Finden Sie uns",
      description: "Wir befinden uns im Zentrum von Trelleborg, in der Nähe aller wichtigen öffentlichen Verkehrsverbindungen.",
      parking: "Parkplätze sind am Stortorget und in den umliegenden Straßen verfügbar.",
      bus: "Die Bushaltestelle 'Trelleborg C' ist 2 Minuten entfernt."
    },
    social: {
      title: "Folgen Sie uns",
      description: "Bleiben Sie über unsere neuesten Nachrichten und Angebote auf dem Laufenden"
    },
    bookTable: "Tisch reservieren",
    backToHome: "Zurück zur Startseite"
  }
}

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [language, setLanguage] = useState<"sv" | "en" | "de">("sv")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the form to your backend
    console.log("Contact form submitted:", form)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1423] via-[#3D314A] to-[#684756]">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back button and Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 cursor-pointer rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <div className="w-10 h-10">
                  <Image
                    src="/casa-blanca-logo-fill-r1_1.svg"
                    alt="Casa Blanca Logo"
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                <div className="text-xl font-bold text-white">Casa Blanca</div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 mr-8">
              <Link 
                href="/" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                Hem
              </Link>
              <Link 
                href="/menu" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                Meny
              </Link>
              <Link 
                href="/lunch" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                Lunch
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                Om Oss
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg"
              >
                Kontakt
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <Select value={language} onValueChange={(value: "sv" | "en" | "de") => setLanguage(value)}>
                <SelectTrigger className="w-16 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <Globe className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sv" className="cursor-pointer">SV</SelectItem>
                  <SelectItem value="en" className="cursor-pointer">EN</SelectItem>
                  <SelectItem value="de" className="cursor-pointer">DE</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Menu */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
                         </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-black/40 backdrop-blur-md border-t border-white/10 mt-4 rounded-lg"
              >
                <nav className="px-4 py-4 space-y-2">
                  <Link href="/" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Hem
                  </Link>
                  <Link href="/menu" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Meny
                  </Link>
                  <Link href="/lunch" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Lunch
                  </Link>
                  <Link href="/about" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Om Oss
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg">
                    Kontakt
                  </Link>
                  <Button 
                    className="w-full mt-2 bg-gradient-to-r from-[#AB8476] to-[#8B6B5C] hover:from-[#8B6B5C] hover:to-[#6B4F42] text-white cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {t.bookTable}
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-[#AB8476] to-white bg-clip-text text-transparent"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#AB8476]">{t.info.address.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 text-sm mb-2">{t.contact.address}</p>
                  <p className="text-white/60 text-xs">{t.info.address.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#AB8476]">{t.info.phone.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 text-sm mb-2 hover:text-[#AB8476] transition-colors cursor-pointer">{t.contact.phone}</p>
                  <p className="text-white/60 text-xs">{t.info.phone.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#AB8476]">{t.info.email.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 text-sm mb-2 hover:text-[#AB8476] transition-colors cursor-pointer">{t.contact.email}</p>
                  <p className="text-white/60 text-xs">{t.info.email.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#AB8476]">{t.info.hours.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 text-sm mb-2">{t.contact.hours}</p>
                  <p className="text-white/60 text-xs">{t.info.hours.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-[#AB8476]" />
                    {t.form.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Tack!</h3>
                      <p className="text-white/80">{t.form.success}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-white">
                            {t.form.name}
                          </Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">
                            {t.form.email}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-white">
                            {t.form.phone}
                          </Label>
                          <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <Label className="text-white">
                            {t.form.subject}
                          </Label>
                          <Select value={form.subject} onValueChange={(value) => setForm({...form, subject: value})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                              <SelectValue placeholder="Välj ämne..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general" className="cursor-pointer">{t.form.subjects.general}</SelectItem>
                              <SelectItem value="booking" className="cursor-pointer">{t.form.subjects.booking}</SelectItem>
                              <SelectItem value="events" className="cursor-pointer">{t.form.subjects.events}</SelectItem>
                              <SelectItem value="catering" className="cursor-pointer">{t.form.subjects.catering}</SelectItem>
                              <SelectItem value="feedback" className="cursor-pointer">{t.form.subjects.feedback}</SelectItem>
                              <SelectItem value="other" className="cursor-pointer">{t.form.subjects.other}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-white">
                          {t.form.message}
                        </Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => setForm({...form, message: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          rows={5}
                          placeholder="Skriv ditt meddelande här..."
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        disabled={!form.name || !form.email || !form.message || !form.subject}
                      >
                        <Send className="h-5 w-5 mr-2" />
                        {t.form.send}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Directions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Google Maps */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden">
                <div className="w-full h-80 relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Corfitz-beck-friisgatan+11,+231+43+Trelleborg,+Sweden&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
              </Card>

              {/* Directions */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.directions.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/80">{t.directions.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#AB8476] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <p className="text-white/80 text-sm">{t.directions.parking}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#AB8476] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                      <p className="text-white/80 text-sm">{t.directions.bus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.social.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">{t.social.description}</p>
                  <div className="flex space-x-4">
                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full transition-all duration-300"
                    >
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full transition-all duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full transition-all duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Snabba åtgärder</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Calendar className="h-5 w-5 mr-2" />
                {t.bookTable}
              </Button>
              <Button className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Phone className="h-5 w-5 mr-2" />
                Ring Direkt
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <div className="w-8 h-8">
                  <Image
                    src="/casa-blanca-logo-fill-r1_1.svg"
                    alt="Casa Blanca Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#AB8476]">Casa Blanca</h3>
              </Link>
              <p className="text-white/80">
                Upplev fantastisk mat, mysig atmosfär och vänlig service i hjärtat av Trelleborg.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Snabblänkar</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  Hem
                </Link>
                <Link href="/menu" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  Meny
                </Link>
                <Link href="/lunch" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  Lunch
                </Link>
                <Link href="/about" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  Om Oss
                </Link>
                <Link href="/contact" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  Kontakt
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-white/80">
                <p>Corfitz-Beck-Friisgatan 11</p>
                <p>Trelleborg</p>
                <p className="cursor-pointer hover:text-[#AB8476] transition-colors">+46 410 199 66</p>
                <p className="cursor-pointer hover:text-[#AB8476] transition-colors">boka@casa-blanca.se</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Följ Oss</h4>
              <div className="flex space-x-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer rounded-full"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer rounded-full"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer rounded-full"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60">© 2024 Casa Blanca Trelleborg. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 