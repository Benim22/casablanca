"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Utensils,
  Star,
  Globe,
  ShoppingCart,
  Truck,
  CheckCircle,
  Calendar,
  Users,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Language translations
const translations = {
  sv: {
    title: "Luncherbjudande",
    subtitle: "Njut av vår fantastiska lunchbuffé",
    description: "Vår dagliga lunchbuffé serveras vardagar 11:00-14:00. Njut av ett varierat utbud av varma rätter, sallader och efterrätter.",
    buffetTitle: "Lunchbuffé",
    buffetPrice: "185 SEK",
    buffetDescription: "All-you-can-eat buffé med dagliga specialiteter",
    features: {
      title: "Vad ingår",
      items: [
        "Varma huvudrätter",
        "Färska sallader",
        "Hemlagade soppor",
        "Bröd och pålägg",
        "Kaffe och te",
        "Efterrätter"
      ]
    },
    takeaway: {
      title: "Avhämtning & Leverans",
      description: "Beställ din lunch för avhämtning eller få den levererad",
      pickup: "Avhämtning",
      delivery: "Hemleverans",
      orderOnline: "Beställ Online"
    },
    todaysMenu: {
      title: "Dagens Meny",
      monday: "Måndag",
      tuesday: "Tisdag", 
      wednesday: "Onsdag",
      thursday: "Torsdag",
      friday: "Fredag"
    },
    contact: {
      title: "Kontakta Oss",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      phone: "+46 410 123 456",
      hours: "Lunchtider: Mån-Fre 11:00-14:00"
    },
    bookTable: "Boka Bord",
    backToHome: "Tillbaka till Startsidan"
  },
  en: {
    title: "Lunch Special",
    subtitle: "Enjoy our amazing lunch buffet",
    description: "Our daily lunch buffet is served weekdays 11:00-14:00. Enjoy a varied selection of hot dishes, salads, and desserts.",
    buffetTitle: "Lunch Buffet",
    buffetPrice: "185 SEK",
    buffetDescription: "All-you-can-eat buffet with daily specialties",
    features: {
      title: "What's included",
      items: [
        "Hot main dishes",
        "Fresh salads",
        "Homemade soups",
        "Bread and spreads",
        "Coffee and tea",
        "Desserts"
      ]
    },
    takeaway: {
      title: "Pickup & Delivery",
      description: "Order your lunch for pickup or get it delivered",
      pickup: "Pickup",
      delivery: "Home delivery",
      orderOnline: "Order Online"
    },
    todaysMenu: {
      title: "Today's Menu",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday", 
      thursday: "Thursday",
      friday: "Friday"
    },
    contact: {
      title: "Contact Us",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      phone: "+46 410 123 456",
      hours: "Lunch hours: Mon-Fri 11:00-14:00"
    },
    bookTable: "Book a Table",
    backToHome: "Back to Home"
  },
  de: {
    title: "Mittagsangebot",
    subtitle: "Genießen Sie unser fantastisches Mittagsbuffet",
    description: "Unser tägliches Mittagsbuffet wird wochentags von 11:00-14:00 serviert. Genießen Sie eine abwechslungsreiche Auswahl an warmen Gerichten, Salaten und Desserts.",
    buffetTitle: "Mittagsbuffet",
    buffetPrice: "185 SEK",
    buffetDescription: "All-you-can-eat Buffet mit täglichen Spezialitäten",
    features: {
      title: "Was ist enthalten",
      items: [
        "Warme Hauptgerichte",
        "Frische Salate",
        "Hausgemachte Suppen",
        "Brot und Aufstriche",
        "Kaffee und Tee",
        "Desserts"
      ]
    },
    takeaway: {
      title: "Abholung & Lieferung",
      description: "Bestellen Sie Ihr Mittagessen zur Abholung oder lassen Sie es liefern",
      pickup: "Abholung",
      delivery: "Lieferung nach Hause",
      orderOnline: "Online bestellen"
    },
    todaysMenu: {
      title: "Heutige Speisekarte",
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag", 
      friday: "Freitag"
    },
    contact: {
      title: "Kontaktieren Sie uns",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      phone: "+46 410 123 456",
      hours: "Mittagszeiten: Mo-Fr 11:00-14:00"
    },
    bookTable: "Tisch reservieren",
    backToHome: "Zurück zur Startseite"
  }
}

// Weekly menu data
const weeklyMenu = {
  sv: {
    monday: {
      main: "Köttbullar med potatismos och gräddsås",
      soup: "Tomatsoppa",
      salad: "Grekisk sallad"
    },
    tuesday: {
      main: "Grillad lax med rostad potatis",
      soup: "Kycklingssoppa",
      salad: "Caesarsallad"
    },
    wednesday: {
      main: "Pasta carbonara",
      soup: "Linssoppa",
      salad: "Blandad grön sallad"
    },
    thursday: {
      main: "Grillad kyckling med ris",
      soup: "Champinjonsoppa",
      salad: "Mozzarellasallad"
    },
    friday: {
      main: "Fish & chips",
      soup: "Fisksoppa",
      salad: "Räksallad"
    }
  },
  en: {
    monday: {
      main: "Meatballs with mashed potatoes and cream sauce",
      soup: "Tomato soup", 
      salad: "Greek salad"
    },
    tuesday: {
      main: "Grilled salmon with roasted potatoes",
      soup: "Chicken soup",
      salad: "Caesar salad"
    },
    wednesday: {
      main: "Pasta carbonara",
      soup: "Lentil soup",
      salad: "Mixed green salad"
    },
    thursday: {
      main: "Grilled chicken with rice",
      soup: "Mushroom soup", 
      salad: "Mozzarella salad"
    },
    friday: {
      main: "Fish & chips",
      soup: "Fish soup",
      salad: "Shrimp salad"
    }
  },
  de: {
    monday: {
      main: "Fleischbällchen mit Kartoffelpüree und Sahnesauce",
      soup: "Tomatensuppe",
      salad: "Griechischer Salat"
    },
    tuesday: {
      main: "Gegrillter Lachs mit Röstkartoffeln",
      soup: "Hühnersuppe",
      salad: "Caesar Salat"
    },
    wednesday: {
      main: "Pasta Carbonara",
      soup: "Linsensuppe",
      salad: "Gemischter grüner Salat"
    },
    thursday: {
      main: "Gegrilltes Hähnchen mit Reis",
      soup: "Pilzsuppe",
      salad: "Mozzarella Salat"
    },
    friday: {
      main: "Fish & Chips",
      soup: "Fischsuppe", 
      salad: "Garnelensalat"
    }
  }
}

export default function LunchPage() {
  const [language, setLanguage] = useState<"sv" | "en" | "de">("sv")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const t = translations[language]
  const menu = weeklyMenu[language]

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const today = new Date().getDay()
    return days[today]
  }

  const dayNames = {
    monday: t.todaysMenu.monday,
    tuesday: t.todaysMenu.tuesday, 
    wednesday: t.todaysMenu.wednesday,
    thursday: t.todaysMenu.thursday,
    friday: t.todaysMenu.friday
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
                className="px-4 py-2 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg"
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
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
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
                  <Link href="/lunch" className="block px-4 py-3 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg">
                    Lunch
                  </Link>
                  <Link href="/about" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Om Oss
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-0" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-[#AB8476] to-white bg-clip-text text-transparent"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-white/80 mb-8 max-w-2xl"
            >
              {t.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Calendar className="h-5 w-5 mr-2" />
                {t.bookTable}
              </Button>
              <Button className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Phone className="h-5 w-5 mr-2" />
                Ring & Beställ
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Buffet Info Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.buffetTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden hover:bg-white/15 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-[#AB8476]">{t.buffetPrice}</CardTitle>
                  <CardDescription className="text-white/80 text-lg">{t.buffetDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">{t.features.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {t.features.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-2xl p-8 text-white">
                <div className="flex items-center justify-center mb-6">
                  <Clock className="h-12 w-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">11:00 - 14:00</h3>
                    <p className="text-white/90">Måndag - Fredag</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <Truck className="h-8 w-8 text-[#AB8476] mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">{t.takeaway.pickup}</h4>
                    <p className="text-white/70 text-sm">15 min</p>
                  </div>
                </Card>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <ShoppingCart className="h-8 w-8 text-[#AB8476] mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">{t.takeaway.delivery}</h4>
                    <p className="text-white/70 text-sm">30-45 min</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekly Menu Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.todaysMenu.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(menu).map(([day, dishes], index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className={`bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 ${getCurrentDay() === day ? 'ring-2 ring-[#AB8476]' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#AB8476] flex items-center justify-between">
                      {dayNames[day as keyof typeof dayNames]}
                      {getCurrentDay() === day && (
                        <Badge className="bg-[#AB8476] text-white">Idag</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-white mb-1">Huvudrätt</h4>
                      <p className="text-white/80 text-sm">{dishes.main}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Soppa</h4>
                      <p className="text-white/80 text-sm">{dishes.soup}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Sallad</h4>
                      <p className="text-white/80 text-sm">{dishes.salad}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.contact.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Adress</h3>
              <p className="text-white/80">{t.contact.address}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Telefon</h3>
              <p className="text-white/80 cursor-pointer hover:text-[#AB8476] transition-colors">{t.contact.phone}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Öppettider</h3>
              <p className="text-white/80">{t.contact.hours}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5 mr-2" />
              {t.takeaway.orderOnline}
            </Button>
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
                <p className="cursor-pointer hover:text-[#AB8476] transition-colors">+46 410 123 456</p>
                <p className="cursor-pointer hover:text-[#AB8476] transition-colors">info@casablanca-trelleborg.se</p>
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