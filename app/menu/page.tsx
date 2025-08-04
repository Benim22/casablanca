"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Wine,
  Pizza,
  Utensils,
  Globe,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  preparationTime?: number
  isPopular?: boolean
  isVegetarian?: boolean
  isVegan?: boolean
  spicyLevel?: number
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

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
      backToHome: "Tillbaka till Hem",
    },
    menu: {
      title: "Vår Fullständiga Meny",
      subtitle: "Upptäck alla våra läckra rätter",
      alacarte: "À la Carte",
      alacarteDesc: "Exklusiva rätter tillagade med kärlek",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Färska pizzor från vår stenugn",
      appetizers: "Förrätter",
      appetizersDesc: "Perfekta för att börja måltiden",
      mains: "Huvudrätter",
      mainsDesc: "Våra specialiteter",
      desserts: "Efterrätter",
      dessertsDesc: "Söta avslutningar",
      drinks: "Drycker",
      drinksDesc: "Vin, öl och cocktails",
      addToCart: "Lägg i Varukorg",
      search: "Sök rätter...",
      filter: "Filtrera",
      all: "Alla",
      vegetarian: "Vegetarisk",
      vegan: "Vegansk",
      popular: "Populära",
      spicy: "Starkt",
      preparationTime: "Tillagningstid",
      minutes: "min",
      allergens: "Allergener",
      notAvailable: "Inte tillgänglig",
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
      backToHome: "Back to Home",
    },
    menu: {
      title: "Our Complete Menu",
      subtitle: "Discover all our delicious dishes",
      alacarte: "À la Carte",
      alacarteDesc: "Exclusive dishes prepared with love",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Fresh pizzas from our stone oven",
      appetizers: "Appetizers",
      appetizersDesc: "Perfect to start your meal",
      mains: "Main Courses",
      mainsDesc: "Our specialties",
      desserts: "Desserts",
      dessertsDesc: "Sweet endings",
      drinks: "Beverages",
      drinksDesc: "Wine, beer and cocktails",
      addToCart: "Add to Cart",
      search: "Search dishes...",
      filter: "Filter",
      all: "All",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      popular: "Popular",
      spicy: "Spicy",
      preparationTime: "Preparation time",
      minutes: "min",
      allergens: "Allergens",
      notAvailable: "Not available",
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
      backToHome: "Zurück zur Startseite",
    },
    menu: {
      title: "Unsere Vollständige Speisekarte",
      subtitle: "Entdecken Sie alle unsere köstlichen Gerichte",
      alacarte: "À la Carte",
      alacarteDesc: "Exklusive Gerichte mit Liebe zubereitet",
      gourmetPizza: "Gourmet Pizza",
      gourmetPizzaDesc: "Frische Pizzen aus unserem Steinofen",
      appetizers: "Vorspeisen",
      appetizersDesc: "Perfekt für den Beginn Ihrer Mahlzeit",
      mains: "Hauptgerichte",
      mainsDesc: "Unsere Spezialitäten",
      desserts: "Desserts",
      dessertsDesc: "Süße Abschlüsse",
      drinks: "Getränke",
      drinksDesc: "Wein, Bier und Cocktails",
      addToCart: "In den Warenkorb",
      search: "Gerichte suchen...",
      filter: "Filtern",
      all: "Alle",
      vegetarian: "Vegetarisch",
      vegan: "Vegan",
      popular: "Beliebt",
      spicy: "Scharf",
      preparationTime: "Zubereitungszeit",
      minutes: "min",
      allergens: "Allergene",
      notAvailable: "Nicht verfügbar",
    },
    cart: {
      title: "Warenkorb",
      empty: "Ihr Warenkorb ist leer",
      total: "Gesamt",
      checkout: "Zur Kasse",
    },
  },
}

// Extended menu items with more categories and details
const menuItems: { [key: string]: MenuItem[] } = {
  appetizers: [
    {
      id: 11,
      name: { sv: "Bruschetta Classica", en: "Classic Bruschetta", de: "Klassische Bruschetta" },
      description: {
        sv: "Rostade bröd med färska tomater, basilika och mozzarella",
        en: "Toasted bread with fresh tomatoes, basil and mozzarella",
        de: "Geröstetes Brot mit frischen Tomaten, Basilikum und Mozzarella",
      },
      price: 95,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 10,
      isVegetarian: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 12,
      name: { sv: "Antipasto Misto", en: "Mixed Antipasto", de: "Gemischte Antipasti" },
      description: {
        sv: "Italiensk charkbricka med ost, oliver och inlagda grönsaker",
        en: "Italian charcuterie board with cheese, olives and pickled vegetables",
        de: "Italienische Wurstplatte mit Käse, Oliven und eingelegtem Gemüse",
      },
      price: 145,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isPopular: true,
      allergens: ["dairy"],
    },
  ],
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
      preparationTime: 20,
      isPopular: true,
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
      preparationTime: 25,
      isPopular: true,
    },
    {
      id: 13,
      name: { sv: "Vegetarisk Risotto", en: "Vegetarian Risotto", de: "Vegetarisches Risotto" },
      description: {
        sv: "Krämig risotto med säsongssvamp och parmesanost",
        en: "Creamy risotto with seasonal mushrooms and parmesan cheese",
        de: "Cremiges Risotto mit saisonalen Pilzen und Parmesankäse",
      },
      price: 225,
      category: "alacarte",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 18,
      isVegetarian: true,
      allergens: ["dairy"],
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
      preparationTime: 15,
      isPopular: true,
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
      preparationTime: 12,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 14,
      name: { sv: "Vegansk Margherita", en: "Vegan Margherita", de: "Vegane Margherita" },
      description: {
        sv: "Tomatbas, vegansk ost och färsk basilika",
        en: "Tomato base, vegan cheese and fresh basil",
        de: "Tomatenbasis, veganer Käse und frisches Basilikum",
      },
      price: 155,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isVegan: true,
      allergens: ["gluten"],
    },
    {
      id: 15,
      name: { sv: "Diavola", en: "Diavola", de: "Diavola" },
      description: {
        sv: "Stark salami, mozzarella, tomatsås och chili",
        en: "Spicy salami, mozzarella, tomato sauce and chili",
        de: "Scharfe Salami, Mozzarella, Tomatensauce und Chili",
      },
      price: 175,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      spicyLevel: 3,
      allergens: ["gluten", "dairy"],
    },
  ],
  desserts: [
    {
      id: 16,
      name: { sv: "Tiramisu", en: "Tiramisu", de: "Tiramisu" },
      description: {
        sv: "Klassisk italiensk dessert med mascarpone och kaffe",
        en: "Classic Italian dessert with mascarpone and coffee",
        de: "Klassisches italienisches Dessert mit Mascarpone und Kaffee",
      },
      price: 85,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isPopular: true,
      isVegetarian: true,
      allergens: ["dairy", "eggs", "gluten"],
    },
    {
      id: 17,
      name: { sv: "Panna Cotta", en: "Panna Cotta", de: "Panna Cotta" },
      description: {
        sv: "Krämig vaniljdessert med bärcoulis",
        en: "Creamy vanilla dessert with berry coulis",
        de: "Cremiges Vanilledessert mit Beerencoulis",
      },
      price: 75,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isVegetarian: true,
      allergens: ["dairy"],
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
      preparationTime: 2,
    },
    {
      id: 18,
      name: { sv: "Aperol Spritz", en: "Aperol Spritz", de: "Aperol Spritz" },
      description: {
        sv: "Italiensk aperitif med prosecco och sodavatten",
        en: "Italian aperitif with prosecco and soda water",
        de: "Italienischer Aperitif mit Prosecco und Sodawasser",
      },
      price: 95,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 19,
      name: { sv: "Espresso", en: "Espresso", de: "Espresso" },
      description: {
        sv: "Stark italiensk kaffe",
        en: "Strong Italian coffee",
        de: "Starker italienischer Kaffee",
      },
      price: 35,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
    },
  ],
}

export default function MenuPage() {
  const [language, setLanguage] = useState<"sv" | "en" | "de">("sv")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const t = translations[language]

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

  // Get all menu items
  const allMenuItems = Object.values(menuItems).flat()

  // Filter items based on search, category, and filter type
  const filteredItems = allMenuItems.filter((item) => {
    const matchesSearch = item.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description[language].toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    
    let matchesFilter = true
    if (filterType === "vegetarian") matchesFilter = item.isVegetarian === true
    else if (filterType === "vegan") matchesFilter = item.isVegan === true
    else if (filterType === "popular") matchesFilter = item.isPopular === true
    else if (filterType === "spicy") matchesFilter = (item.spicyLevel && item.spicyLevel > 0) === true
    
    return matchesSearch && matchesCategory && matchesFilter
  })

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
            {/* Logo, Back Button and Brand */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#AB8476] hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
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
            </div>

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

              {/* Mobile Menu */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.menu.title}</h1>
          <p className="text-xl text-white/80">{t.menu.subtitle}</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder={t.menu.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full"
              />
            </div>

            {/* Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">{t.menu.all}</SelectItem>
                <SelectItem value="popular" className="cursor-pointer">{t.menu.popular}</SelectItem>
                <SelectItem value="vegetarian" className="cursor-pointer">{t.menu.vegetarian}</SelectItem>
                <SelectItem value="vegan" className="cursor-pointer">{t.menu.vegan}</SelectItem>
                <SelectItem value="spicy" className="cursor-pointer">{t.menu.spicy}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              {t.menu.all}
            </Button>
            <Button
              onClick={() => setSelectedCategory("appetizers")}
              className={
                selectedCategory === "appetizers"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Utensils className="h-4 w-4 mr-2" />
              {t.menu.appetizers}
            </Button>
            <Button
              onClick={() => setSelectedCategory("alacarte")}
              className={
                selectedCategory === "alacarte"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Utensils className="h-4 w-4 mr-2" />
              {t.menu.alacarte}
            </Button>
            <Button
              onClick={() => setSelectedCategory("pizza")}
              className={
                selectedCategory === "pizza"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Pizza className="h-4 w-4 mr-2" />
              {t.menu.gourmetPizza}
            </Button>
            <Button
              onClick={() => setSelectedCategory("desserts")}
              className={
                selectedCategory === "desserts"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Utensils className="h-4 w-4 mr-2" />
              {t.menu.desserts}
            </Button>
            <Button
              onClick={() => setSelectedCategory("drinks")}
              className={
                selectedCategory === "drinks"
                  ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-6"
                  : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-6"
              }
            >
              <Wine className="h-4 w-4 mr-2" />
              {t.menu.drinks}
            </Button>
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden group hover:bg-white/15 transition-all duration-300 cursor-pointer h-full rounded-2xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name[language]}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {item.isPopular && (
                        <Badge className="bg-yellow-500 text-black rounded-full">
                          <Star className="h-3 w-3 mr-1" />
                          {t.menu.popular}
                        </Badge>
                      )}
                      {item.isVegetarian && (
                        <Badge className="bg-green-500 rounded-full">V</Badge>
                      )}
                      {item.isVegan && (
                        <Badge className="bg-green-600 rounded-full">VG</Badge>
                      )}
                      {item.spicyLevel && item.spicyLevel > 0 && (
                        <Badge className="bg-red-500 rounded-full">🌶️</Badge>
                      )}
                    </div>

                    {!item.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive" className="rounded-full">{t.menu.notAvailable}</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#AB8476] text-lg">{item.name[language]}</CardTitle>
                    <CardDescription className="text-white/80 text-sm line-clamp-2">
                      {item.description[language]}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Preparation time and allergens */}
                      <div className="flex items-center justify-between text-xs text-white/60">
                        {item.preparationTime && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.preparationTime} {t.menu.minutes}
                          </div>
                        )}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="text-right">
                            <span className="text-white/40">{t.menu.allergens}: </span>
                            {item.allergens.join(", ")}
                          </div>
                        )}
                      </div>
                      
                      {/* Price and Add to Cart */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#AB8476]">{item.price} SEK</span>
                        <Button
                          onClick={() => addToCart(item)}
                          disabled={!item.available}
                          className="bg-gradient-to-r from-[#AB8476] to-[#8B6B5C] hover:from-[#8B6B5C] hover:to-[#6B4F42] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {t.menu.addToCart}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60 text-lg">Inga rätter hittades med dina sökkriterier.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 