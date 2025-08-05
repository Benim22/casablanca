"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Users,
  Award,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  ChefHat,
  Utensils,
  Wine,
  Pizza,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Calendar,
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
    title: "Om Casa Blanca",
    subtitle: "Vår historia, passion och vision",
    story: {
      title: "Vår Historia",
      description: "Casa Blanca grundades 2018 med en vision att skapa en plats där människor kan samlas över fantastisk mat och skapa minnen för livet. Beläget i hjärtat av Trelleborg, har vi blivit en älskad del av lokalsamhället.",
      mission: "Vår mission är att erbjuda en autentisk matupplevelse som kombinerar traditionella recept med moderna tekniker, allt serverat i en varm och välkomnande atmosfär."
    },
    values: {
      title: "Våra Värderingar",
      quality: {
        title: "Kvalitet",
        description: "Vi använder endast de bästa ingredienserna från lokala leverantörer"
      },
      service: {
        title: "Service",
        description: "Vänlig och professionell service är kärnan i vår verksamhet"
      },
      tradition: {
        title: "Tradition",
        description: "Vi respekterar kulinariska traditioner medan vi skapar nya smaker"
      },
      community: {
        title: "Gemenskap",
        description: "Vi är stolta över att vara en del av Trelleborgs community"
      }
    },
    team: {
      title: "Vårt Team",
      chef: {
        name: "Marco Rossi",
        title: "Kökschef",
        description: "Med över 15 års erfarenhet från Italien och Sverige"
      },
      manager: {
        name: "Anna Svensson",
        title: "Restaurangchef", 
        description: "Ansvarig för service och gästupplevelse"
      },
      sommelier: {
        name: "Erik Johansson",
        title: "Sommelier",
        description: "Expert på vin och dryckesparning"
      }
    },
    facilities: {
      title: "Våra Lokaler",
      restaurant: {
        title: "Restaurang",
        description: "80 sittplatser i elegant miljö"
      },
      courtyard: {
        title: "Innergård",
        description: "Utomhusservering under sommarmånaderna"
      },
      bar: {
        title: "Bar",
        description: "Fullständig bar med cocktails och vin"
      },
      oven: {
        title: "Pizzaugn",
        description: "Traditionell stenugn för autentiska pizzor"
      }
    },
    awards: {
      title: "Utmärkelser",
      items: [
        "Bästa Restaurang Trelleborg 2023",
        "TripAdvisor Certificate of Excellence",
        "Miljöcertifierad Restaurang",
        "Lokala Leverantörer Award"
      ]
    },
    contact: {
      title: "Kontakta Oss",
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se",
      hours: "Mån-Fre: 11:00-22:00, Lör-Sön: 12:00-23:00"
    },
    bookTable: "Boka Bord",
    backToHome: "Tillbaka till Startsidan"
  },
  en: {
    title: "About Casa Blanca",
    subtitle: "Our story, passion and vision",
    story: {
      title: "Our Story",
      description: "Casa Blanca was founded in 2018 with a vision to create a place where people can gather over fantastic food and create memories for life. Located in the heart of Trelleborg, we have become a beloved part of the local community.",
      mission: "Our mission is to offer an authentic dining experience that combines traditional recipes with modern techniques, all served in a warm and welcoming atmosphere."
    },
    values: {
      title: "Our Values",
      quality: {
        title: "Quality",
        description: "We use only the finest ingredients from local suppliers"
      },
      service: {
        title: "Service", 
        description: "Friendly and professional service is at the core of our business"
      },
      tradition: {
        title: "Tradition",
        description: "We respect culinary traditions while creating new flavors"
      },
      community: {
        title: "Community",
        description: "We are proud to be part of the Trelleborg community"
      }
    },
    team: {
      title: "Our Team",
      chef: {
        name: "Marco Rossi",
        title: "Head Chef",
        description: "With over 15 years of experience from Italy and Sweden"
      },
      manager: {
        name: "Anna Svensson", 
        title: "Restaurant Manager",
        description: "Responsible for service and guest experience"
      },
      sommelier: {
        name: "Erik Johansson",
        title: "Sommelier",
        description: "Expert in wine and beverage pairing"
      }
    },
    facilities: {
      title: "Our Facilities",
      restaurant: {
        title: "Restaurant",
        description: "80 seats in elegant environment"
      },
      courtyard: {
        title: "Courtyard",
        description: "Outdoor dining during summer months"
      },
      bar: {
        title: "Bar",
        description: "Full bar with cocktails and wine"
      },
      oven: {
        title: "Pizza Oven",
        description: "Traditional stone oven for authentic pizzas"
      }
    },
    awards: {
      title: "Awards",
      items: [
        "Best Restaurant Trelleborg 2023",
        "TripAdvisor Certificate of Excellence", 
        "Environmentally Certified Restaurant",
        "Local Suppliers Award"
      ]
    },
    contact: {
      title: "Contact Us",
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se",
      hours: "Mon-Fri: 11:00-22:00, Sat-Sun: 12:00-23:00"
    },
    bookTable: "Book a Table",
    backToHome: "Back to Home"
  },
  de: {
    title: "Über Casa Blanca",
    subtitle: "Unsere Geschichte, Leidenschaft und Vision",
    story: {
      title: "Unsere Geschichte",
      description: "Casa Blanca wurde 2018 mit der Vision gegründet, einen Ort zu schaffen, an dem Menschen bei fantastischem Essen zusammenkommen und Erinnerungen fürs Leben schaffen können. Im Herzen von Trelleborg gelegen, sind wir zu einem geliebten Teil der Gemeinde geworden.",
      mission: "Unsere Mission ist es, ein authentisches kulinarisches Erlebnis zu bieten, das traditionelle Rezepte mit modernen Techniken kombiniert, alles serviert in einer warmen und einladenden Atmosphäre."
    },
    values: {
      title: "Unsere Werte",
      quality: {
        title: "Qualität", 
        description: "Wir verwenden nur die besten Zutaten von lokalen Lieferanten"
      },
      service: {
        title: "Service",
        description: "Freundlicher und professioneller Service ist das Herzstück unseres Geschäfts"
      },
      tradition: {
        title: "Tradition",
        description: "Wir respektieren kulinarische Traditionen und schaffen gleichzeitig neue Geschmäcker"
      },
      community: {
        title: "Gemeinschaft",
        description: "Wir sind stolz darauf, Teil der Trelleborg-Gemeinschaft zu sein"
      }
    },
    team: {
      title: "Unser Team",
      chef: {
        name: "Marco Rossi",
        title: "Chefkoch",
        description: "Mit über 15 Jahren Erfahrung aus Italien und Schweden"
      },
      manager: {
        name: "Anna Svensson",
        title: "Restaurantleiterin",
        description: "Verantwortlich für Service und Gästeerlebnis"
      },
      sommelier: {
        name: "Erik Johansson", 
        title: "Sommelier",
        description: "Experte für Wein und Getränkepairing"
      }
    },
    facilities: {
      title: "Unsere Einrichtungen",
      restaurant: {
        title: "Restaurant",
        description: "80 Sitzplätze in eleganter Umgebung"
      },
      courtyard: {
        title: "Innenhof",
        description: "Außengastronomie in den Sommermonaten"
      },
      bar: {
        title: "Bar",
        description: "Vollständige Bar mit Cocktails und Wein"
      },
      oven: {
        title: "Pizzaofen",
        description: "Traditioneller Steinofen für authentische Pizzas"
      }
    },
    awards: {
      title: "Auszeichnungen",
      items: [
        "Bestes Restaurant Trelleborg 2023",
        "TripAdvisor Certificate of Excellence",
        "Umweltzertifiziertes Restaurant", 
        "Lokale Lieferanten Award"
      ]
    },
    contact: {
      title: "Kontaktieren Sie uns",
      address: "Corfitz-beck-friisgatan 11, 231 43 Trelleborg",
      phone: "+46 410 199 66",
      email: "boka@casa-blanca.se", 
      hours: "Mo-Fr: 11:00-22:00, Sa-So: 12:00-23:00"
    },
    bookTable: "Tisch reservieren",
    backToHome: "Zurück zur Startseite"
  }
}

export default function AboutPage() {
  const [language, setLanguage] = useState<"sv" | "en" | "de">("sv")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const t = translations[language]

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
                className="px-4 py-2 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg"
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
                  <Link href="/lunch" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    Lunch
                  </Link>
                  <Link href="/about" className="block px-4 py-3 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg">
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

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.story.title}</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">{t.story.description}</p>
              <p className="text-white/80 text-lg leading-relaxed">{t.story.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/placeholder.svg?height=500&width=600&query=elegant restaurant interior"
                  alt="Casa Blanca Interior"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.values.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.values.quality.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.values.quality.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.values.service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.values.service.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.values.tradition.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.values.tradition.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#AB8476]">{t.values.community.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.values.community.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.team.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ChefHat className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{t.team.chef.name}</CardTitle>
                  <CardDescription className="text-[#AB8476] font-semibold">{t.team.chef.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.team.chef.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{t.team.manager.name}</CardTitle>
                  <CardDescription className="text-[#AB8476] font-semibold">{t.team.manager.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.team.manager.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Wine className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{t.team.sommelier.name}</CardTitle>
                  <CardDescription className="text-[#AB8476] font-semibold">{t.team.sommelier.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{t.team.sommelier.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.facilities.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <Utensils className="h-12 w-12 text-[#AB8476] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg font-bold text-white">{t.facilities.restaurant.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center text-sm">{t.facilities.restaurant.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <MapPin className="h-12 w-12 text-[#AB8476] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg font-bold text-white">{t.facilities.courtyard.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center text-sm">{t.facilities.courtyard.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <Wine className="h-12 w-12 text-[#AB8476] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg font-bold text-white">{t.facilities.bar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center text-sm">{t.facilities.bar.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <Pizza className="h-12 w-12 text-[#AB8476] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg font-bold text-white">{t.facilities.oven.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center text-sm">{t.facilities.oven.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.awards.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.awards.items.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mr-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-white font-semibold">{award}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.contact.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Adress</h3>
              <p className="text-white/80 text-sm">{t.contact.address}</p>
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
              <h3 className="text-lg font-semibold text-white mb-2">Telefon</h3>
              <p className="text-white/80 text-sm cursor-pointer hover:text-[#AB8476] transition-colors">{t.contact.phone}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">E-post</h3>
              <p className="text-white/80 text-sm cursor-pointer hover:text-[#AB8476] transition-colors">{t.contact.email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Öppettider</h3>
              <p className="text-white/80 text-sm">{t.contact.hours}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-8 py-3 text-lg rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5 mr-2" />
              {t.bookTable}
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