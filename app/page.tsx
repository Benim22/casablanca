"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ShoppingCart,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wine,
  Pizza,
  Utensils,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Calendar,
  Users,
  MessageSquare,
  CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { sv, enUS, de } from "date-fns/locale"
import Link from "next/link"
import Image from "next/image"

// Database interface types
interface MenuItem {
  id: number
  name: { [key: string]: string }
  description: { [key: string]: string }
  price: number
  category: string
  image: string
  available: boolean
  allergens?: string[]
}

interface Booking {
  id?: number
  name: string
  email: string
  phone: string
  date?: Date
  time: string
  guests: number
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

// Time slots for the restaurant
const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
]

// Language translations
const translations = {
  sv: {
    nav: {
      home: "Hem",
      menu: "Meny",
      lunch: "Lunch",
      about: "Om Oss",
      contact: "Kontakt",
      bookTable: "Boka Bord",
    },
    hero: {
      welcome: "Välkommen till Casa Blanca",
      tagline: "Upplev fantastisk mat, mysig atmosfär och vänlig service.",
      exploreMenu: "Utforska Menyn",
    },
    about: {
      title: "Om Casa Blanca",
      description:
        "Casa Blanca är mer än bara en restaurang - det är en upplevelse. Beläget i hjärtat av Trelleborg, erbjuder vi en unik kombination av traditionell svensk gästfrihet och internationella smaker. Vår inre gård, fullständiga bar och traditionella pizzaugn skapar den perfekta atmosfären för alla tillfällen.",
      passion:
        "Vår passion för mat och service syns i varje detalj, från våra noggrant utvalda ingredienser till vår varma och välkomnande personal.",
    },
    menu: {
      title: "Vår Meny",
      alacarte: "À la Carte",
      alacarteDesc: "Exklusiva rätter tillagade med kärlek",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Färska pizzor från vår stenugn",
      lunchBuffet: "Lunchbuffé",
      lunchBuffetDesc: "Daglig buffé 11:00-14:00",
      drinks: "Drycker",
      drinksDesc: "Vin, öl och cocktails",
      addToCart: "Lägg i Varukorg",
      viewFullMenu: "Se Hela Menyn",
    },
    booking: {
      title: "Boka Bord",
      subtitle: "Reservera ditt bord hos oss idag!",
      name: "Namn",
      email: "E-post",
      phone: "Telefon",
      date: "Datum",
      time: "Tid",
      guests: "Antal Gäster",
      message: "Meddelande (valfritt)",
      submit: "Skicka Bokningsförfrågan",
      success: "Tack! Vi kommer att kontakta dig inom kort.",
      close: "Stäng",
      selectDate: "Välj datum",
      selectTime: "Välj tid",
      pickDate: "Välj ett datum",
      pickTime: "Välj en tid",
    },
    lunch: {
      title: "Luncherbjudande",
      description:
        "Vår dagliga lunchbuffé serveras vardagar 11:00-14:00. Njut av ett varierat utbud av varma rätter, sallader och efterrätter.",
      takeaway: "Avhämtning och leverans tillgängligt i Trelleborg",
    },
    contact: {
      title: "Kontakta Oss",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      hours: "Öppettider",
      weekdays: "Mån-Fre: 11:00-22:00",
      weekends: "Lör-Sön: 12:00-23:00",
    },
    cart: {
      title: "Varukorg",
      empty: "Din varukorg är tom",
      total: "Totalt",
      checkout: "Gå till Kassan",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      lunch: "Lunch",
      about: "About Us",
      contact: "Contact",
      bookTable: "Book a Table",
    },
    hero: {
      welcome: "Welcome to Casa Blanca",
      tagline: "Experience great food, cozy atmosphere, and friendly service.",
      exploreMenu: "Explore Menu",
    },
    about: {
      title: "About Casa Blanca",
      description:
        "Casa Blanca is more than just a restaurant - it's an experience. Located in the heart of Trelleborg, we offer a unique combination of traditional Swedish hospitality and international flavors. Our inner courtyard, full bar, and traditional pizza oven create the perfect atmosphere for any occasion.",
      passion:
        "Our passion for food and service shows in every detail, from our carefully selected ingredients to our warm and welcoming staff.",
    },
    menu: {
      title: "Our Menu",
      alacarte: "À la Carte",
      alacarteDesc: "Exclusive dishes prepared with love",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Fresh pizzas from our stone oven",
      lunchBuffet: "Lunch Buffet",
      lunchBuffetDesc: "Daily buffet 11:00-14:00",
      drinks: "Beverages",
      drinksDesc: "Wine, beer and cocktails",
      addToCart: "Add to Cart",
      viewFullMenu: "View Full Menu",
    },
    booking: {
      title: "Book a Table",
      subtitle: "Reserve your table with us today!",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Date",
      time: "Time",
      guests: "Number of Guests",
      message: "Message (optional)",
      submit: "Send Booking Request",
      success: "Thank you! We will contact you shortly.",
      close: "Close",
      selectDate: "Select date",
      selectTime: "Select time",
      pickDate: "Pick a date",
      pickTime: "Pick a time",
    },
    lunch: {
      title: "Lunch Deal",
      description:
        "Our daily lunch buffet is served weekdays 11:00-14:00. Enjoy a varied selection of hot dishes, salads, and desserts.",
      takeaway: "Takeaway and delivery available in Trelleborg",
    },
    contact: {
      title: "Contact Us",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      hours: "Opening Hours",
      weekdays: "Mon-Fri: 11:00-22:00",
      weekends: "Sat-Sun: 12:00-23:00",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      menu: "Speisekarte",
      lunch: "Mittagessen",
      about: "Über Uns",
      contact: "Kontakt",
      bookTable: "Tisch Reservieren",
    },
    hero: {
      welcome: "Willkommen bei Casa Blanca",
      tagline: "Erleben Sie großartiges Essen, gemütliche Atmosphäre und freundlichen Service.",
      exploreMenu: "Speisekarte Erkunden",
    },
    about: {
      title: "Über Casa Blanca",
      description:
        "Casa Blanca ist mehr als nur ein Restaurant - es ist ein Erlebnis. Im Herzen von Trelleborg gelegen, bieten wir eine einzigartige Kombination aus traditioneller schwedischer Gastfreundschaft und internationalen Aromen. Unser Innenhof, die vollständige Bar und der traditionelle Pizzaofen schaffen die perfekte Atmosphäre für jeden Anlass.",
      passion:
        "Unsere Leidenschaft für Essen und Service zeigt sich in jedem Detail, von unseren sorgfältig ausgewählten Zutaten bis zu unserem warmen und einladenden Personal.",
    },
    menu: {
      title: "Unsere Speisekarte",
      alacarte: "À la Carte",
      alacarteDesc: "Exklusive Gerichte mit Liebe zubereitet",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Frische Pizzen aus unserem Steinofen",
      lunchBuffet: "Mittagsbuffet",
      lunchBuffetDesc: "Tägliches Buffet 11:00-14:00",
      drinks: "Getränke",
      drinksDesc: "Wein, Bier und Cocktails",
      addToCart: "In den Warenkorb",
      viewFullMenu: "Vollständige Speisekarte",
    },
    booking: {
      title: "Tisch Reservieren",
      subtitle: "Reservieren Sie heute Ihren Tisch bei uns!",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      date: "Datum",
      time: "Uhrzeit",
      guests: "Anzahl Gäste",
      message: "Nachricht (optional)",
      submit: "Reservierungsanfrage Senden",
      success: "Danke! Wir werden Sie in Kürze kontaktieren.",
      close: "Schließen",
      selectDate: "Datum wählen",
      selectTime: "Zeit wählen",
      pickDate: "Datum auswählen",
      pickTime: "Zeit auswählen",
    },
    lunch: {
      title: "Mittagsangebot",
      description:
        "Unser tägliches Mittagsbuffet wird wochentags von 11:00-14:00 serviert. Genießen Sie eine abwechslungsreiche Auswahl an warmen Gerichten, Salaten und Desserts.",
      takeaway: "Abholung und Lieferung in Trelleborg verfügbar",
    },
    contact: {
      title: "Kontaktieren Sie Uns",
      address: "Corfitz-Beck-Friisgatan 11, Trelleborg",
      hours: "Öffnungszeiten",
      weekdays: "Mo-Fr: 11:00-22:00",
      weekends: "Sa-So: 12:00-23:00",
    },
    cart: {
      title: "Warenkorb",
      empty: "Ihr Warenkorb ist leer",
      total: "Gesamt",
      checkout: "Zur Kasse",
    },
  },
}

// Sample menu items with database structure
const menuItems: { [key: string]: MenuItem[] } = {
  alacarte: [
    {
      id: 1,
      name: { sv: "Grillad Lax", en: "Grilled Salmon", de: "Gegrillter Lachs" },
      description: {
        sv: "Färsk lax med citronsmör och säsongsrotfrukter",
        en: "Fresh salmon with lemon butter and seasonal root vegetables",
        de: "Frischer Lachs mit Zitronenbutter und saisonalem Wurzelgemüse",
      },
      price: 285,
      category: "alacarte",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      allergens: ["fish"],
    },
    {
      id: 2,
      name: { sv: "Oxfilé", en: "Beef Tenderloin", de: "Rinderfilet" },
      description: {
        sv: "Perfekt grillad oxfilé med rödvinssås och potatisgratäng",
        en: "Perfectly grilled beef tenderloin with red wine sauce and potato gratin",
        de: "Perfekt gegrilltes Rinderfilet mit Rotweinsauce und Kartoffelgratin",
      },
      price: 395,
      category: "alacarte",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
    },
  ],
  pizza: [
    {
      id: 3,
      name: { sv: "Casa Blanca Special", en: "Casa Blanca Special", de: "Casa Blanca Spezial" },
      description: {
        sv: "Prosciutto, mozzarella, rucola och parmesanost",
        en: "Prosciutto, mozzarella, arugula and parmesan cheese",
        de: "Prosciutto, Mozzarella, Rucola und Parmesankäse",
      },
      price: 185,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 4,
      name: { sv: "Quattro Stagioni", en: "Quattro Stagioni", de: "Quattro Stagioni" },
      description: {
        sv: "Skinka, champinjoner, kronärtskocka och oliver",
        en: "Ham, mushrooms, artichokes and olives",
        de: "Schinken, Pilze, Artischocken und Oliven",
      },
      price: 165,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      allergens: ["gluten", "dairy"],
    },
  ],
  drinks: [
    {
      id: 5,
      name: { sv: "Husets Rödvin", en: "House Red Wine", de: "Hauswein Rot" },
      description: {
        sv: "Italienskt rödvin, glas",
        en: "Italian red wine, glass",
        de: "Italienischer Rotwein, Glas",
      },
      price: 85,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
    },
  ],
}

export default function CasaBlancaRestaurant() {
  const [language, setLanguage] = useState<"sv" | "en" | "de">("sv")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<"alacarte" | "pizza" | "drinks">("alacarte")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState<Booking>({
    name: "",
    email: "",
    phone: "",
    date: undefined,
    time: "",
    guests: 2,
    message: "",
    status: "pending",
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const t = translations[language]

  // Get the appropriate locale for date formatting
  const getLocale = () => {
    switch (language) {
      case 'sv': return sv
      case 'de': return de
      default: return enUS
    }
  }

  const addToCart = (item: MenuItem) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name[language],
      price: item.price,
      quantity: 1,
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, cartItem]
    })
  }

  const updateCartQuantity = (id: number, change: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the booking to your database
    console.log("Booking submitted:", bookingForm)
    setBookingSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setBookingSubmitted(false)
      setIsBookingModalOpen(false)
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        date: undefined,
        time: "",
        guests: 2,
        message: "",
        status: "pending",
      })
    }, 3000)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

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
            {/* Logo and Brand */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/casa-blanca-logo-fill-r1_1.svg"
                  alt="Casa Blanca Logo"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">
                Casa Blanca
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <a 
                href="#home" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                {t.nav.home}
              </a>
              <Link 
                href="/menu" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                {t.nav.menu}
              </Link>
              <Link 
                href="/lunch" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                {t.nav.lunch}
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                {t.nav.about}
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10"
              >
                {t.nav.contact}
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

              {/* Cart */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    className="relative bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] transition-all duration-300 cursor-pointer rounded-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold shadow-lg animate-pulse">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gradient-to-br from-[#1A1423] via-[#3D314A] to-[#684756] border-l border-white/20 text-white w-full sm:max-w-lg">
                  <SheetHeader className="border-b border-white/10 pb-4">
                    <SheetTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <ShoppingCart className="h-6 w-6 text-[#AB8476]" />
                      {t.cart.title}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
                          <ShoppingCart className="h-12 w-12 text-white/40" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Tom varukorg</h3>
                        <p className="text-white/60 mb-6">{t.cart.empty}</p>
                        <Button 
                          onClick={() => setIsCartOpen(false)}
                          className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-6 py-2 rounded-full cursor-pointer"
                        >
                          Fortsätt handla
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                          {cart.map((item) => (
                            <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                                  <p className="text-[#AB8476] font-bold text-lg">{item.price} SEK</p>
                                  <p className="text-white/60 text-sm">Styck: {item.price} SEK</p>
                                </div>
                                <div className="flex items-center space-x-3 ml-4">
                                  <Button 
                                    size="icon" 
                                    onClick={() => updateCartQuantity(item.id, -1)} 
                                    className="h-8 w-8 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer rounded-full transition-all duration-200"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center font-bold text-white text-lg">{item.quantity}</span>
                                  <Button 
                                    size="icon" 
                                    onClick={() => updateCartQuantity(item.id, 1)} 
                                    className="h-8 w-8 bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white cursor-pointer rounded-full transition-all duration-200"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80">Subtotal:</span>
                                  <span className="font-bold text-[#AB8476] text-lg">{item.price * item.quantity} SEK</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-white/20 pt-6 mt-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="space-y-3">
                            <div className="flex justify-between text-white/80">
                              <span>Antal artiklar:</span>
                              <span>{cartItemCount} st</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>Subtotal:</span>
                              <span>{cartTotal} SEK</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>Moms (25%):</span>
                              <span>{Math.round(cartTotal * 0.2)} SEK</span>
                            </div>
                            <div className="border-t border-white/20 pt-3">
                              <div className="flex justify-between font-bold text-xl">
                                <span className="text-white">{t.cart.total}:</span>
                                <span className="text-[#AB8476]">{cartTotal} SEK</span>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full mt-6 bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white py-3 text-lg font-semibold rounded-full cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {t.cart.checkout}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Book Table Modal */}
              <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
                <DialogTrigger asChild>
                  <Button className="hidden md:inline-flex bg-gradient-to-r from-[#AB8476] to-[#8B6B5C] hover:from-[#8B6B5C] hover:to-[#6B4F42] text-white px-6 py-2 rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t.nav.bookTable}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#1A1423] via-[#3D314A] to-[#684756] border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white text-center">{t.booking.title}</DialogTitle>
                    <DialogDescription className="text-white/80 text-center">
                      {t.booking.subtitle}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {bookingSubmitted ? (
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
                      <p className="text-white/80">{t.booking.success}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="booking-name" className="text-white">
                            {t.booking.name}
                          </Label>
                          <Input
                            id="booking-name"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="booking-email" className="text-white">
                            {t.booking.email}
                          </Label>
                          <Input
                            id="booking-email"
                            type="email"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="booking-phone" className="text-white">
                            {t.booking.phone}
                          </Label>
                          <Input
                            id="booking-phone"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="booking-guests" className="text-white">
                            {t.booking.guests}
                          </Label>
                          <Select value={bookingForm.guests.toString()} onValueChange={(value) => setBookingForm({...bookingForm, guests: parseInt(value)})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white cursor-pointer">
                              <Users className="h-4 w-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <SelectItem key={num} value={num.toString()} className="cursor-pointer">
                                  {num} {num === 1 ? 'gäst' : 'gäster'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">
                            {t.booking.date}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer",
                                  !bookingForm.date && "text-white/50"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingForm.date ? (
                                  format(bookingForm.date, "PPP", { locale: getLocale() })
                                ) : (
                                  <span>{t.booking.pickDate}</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={bookingForm.date}
                                onSelect={(date) => setBookingForm({...bookingForm, date})}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                locale={getLocale()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label className="text-white">
                            {t.booking.time}
                          </Label>
                          <Select value={bookingForm.time} onValueChange={(value) => setBookingForm({...bookingForm, time: value})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                              <Clock className="h-4 w-4 mr-2" />
                              <SelectValue placeholder={t.booking.pickTime} />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time} className="cursor-pointer">
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="booking-message" className="text-white">
                          {t.booking.message}
                        </Label>
                        <Textarea
                          id="booking-message"
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          rows={3}
                          placeholder="Särskilda önskemål, allergier, etc..."
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer"
                        disabled={!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date || !bookingForm.time}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {t.booking.submit}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

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
                  <a href="#home" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    {t.nav.home}
                  </a>
                  <Link href="/menu" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    {t.nav.menu}
                  </Link>
                  <Link href="/lunch" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    {t.nav.lunch}
                  </Link>
                  <Link href="/about" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    {t.nav.about}
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
                    {t.nav.contact}
                  </Link>
                  <Button 
                    className="w-full mt-2 bg-gradient-to-r from-[#AB8476] to-[#8B6B5C] hover:from-[#8B6B5C] hover:to-[#6B4F42] text-white cursor-pointer"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {t.nav.bookTable}
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/placeholder.jpg"
          >
            <source src="/casa-hero.mp4" type="video/mp4" />
            <source src="/casa-blanca-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-[#AB8476] to-white bg-clip-text text-transparent"
          >
            {t.hero.welcome}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Utensils className="h-5 w-5 mr-2" />
                {t.hero.exploreMenu}
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {t.nav.bookTable}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.about.title}</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">{t.about.description}</p>
              <p className="text-white/80 text-lg leading-relaxed">{t.about.passion}</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Casa Blanca Interior"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.menu.title}</h2>
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-[#AB8476] to-[#8B6B5C] hover:from-[#8B6B5C] hover:to-[#6B4F42] text-white px-6 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Utensils className="h-4 w-4 mr-2" />
                {t.menu.viewFullMenu}
              </Button>
            </Link>
          </motion.div>

          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => setSelectedMenuCategory("alacarte")}
              className={
                selectedMenuCategory === "alacarte"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Utensils className="h-4 w-4 mr-2" />
              {t.menu.alacarte}
            </Button>
            <Button
              onClick={() => setSelectedMenuCategory("pizza")}
              className={
                selectedMenuCategory === "pizza"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Pizza className="h-4 w-4 mr-2" />
              {t.menu.gourmetPizza}
            </Button>
            <Button
              onClick={() => setSelectedMenuCategory("drinks")}
              className={
                selectedMenuCategory === "drinks"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Wine className="h-4 w-4 mr-2" />
              {t.menu.drinks}
            </Button>
          </div>

          {/* Menu Items Preview */}
          <motion.div
            key={selectedMenuCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {menuItems[selectedMenuCategory].slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden group hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name[language]}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#AB8476]">{item.name[language]}</CardTitle>
                    <CardDescription className="text-white/80">{item.description[language]}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#AB8476]">{item.price} SEK</span>
                      <Button onClick={() => addToCart(item)} className="bg-[#AB8476] hover:bg-[#684756] text-white cursor-pointer rounded-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {t.menu.addToCart}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Galleri</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
              >
                <img
                  src={`/placeholder.svg?height=300&width=300&query=restaurant food and interior ${i}`}
                  alt={`Gallery ${i}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lunch Section */}
      <section id="lunch" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.lunch.title}</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">{t.lunch.description}</p>
            <div className="bg-gradient-to-r from-[#AB8476] to-[#684756] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 mr-3" />
                <span className="text-2xl font-bold">11:00 - 14:00</span>
              </div>
              <p className="text-lg">{t.lunch.takeaway}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.contact.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-[#AB8476] mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Adress</h3>
                  <p className="text-white/80">{t.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-[#AB8476] mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Telefon</h3>
                  <p className="text-white/80 cursor-pointer hover:text-[#AB8476] transition-colors">+46 410 123 456</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-[#AB8476] mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">E-post</h3>
                  <p className="text-white/80 cursor-pointer hover:text-[#AB8476] transition-colors">info@casablanca-trelleborg.se</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-[#AB8476] mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{t.contact.hours}</h3>
                  <p className="text-white/80">{t.contact.weekdays}</p>
                  <p className="text-white/80">{t.contact.weekends}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-2"
            >
              <div className="w-full h-96 bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors">
                <p className="text-gray-600">Google Maps Integration</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
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
              </div>
              <p className="text-white/80">
                Upplev fantastisk mat, mysig atmosfär och vänlig service i hjärtat av Trelleborg.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Snabblänkar</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  {t.nav.home}
                </a>
                <Link href="/menu" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  {t.nav.menu}
                </Link>
                <Link href="/lunch" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  {t.nav.lunch}
                </Link>
                <Link href="/about" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  {t.nav.about}
                </Link>
                <Link href="/contact" className="block text-white/80 hover:text-[#AB8476] transition-colors cursor-pointer">
                  {t.nav.contact}
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
