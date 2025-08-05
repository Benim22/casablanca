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
  Facebook,
  Instagram,
  Twitter,
  Calendar,
  ChefHat,
  Beef,
  Fish,
  Sandwich,
  Salad,
  Baby,
  Coffee,
  Cookie,
  GlassWater,
  Martini,
  Zap,
  Flame,
  Droplets,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
      appetizers: "Förrätter",
      appetizersDesc: "Perfekta för att börja måltiden",
      meat: "Kötträtter",
      meatDesc: "Saftig kött tillagat till perfektion",
      pasta: "Pasta",
      pastaDesc: "Hemgjord pasta med läckra såser",
      fish: "Fiskrätter",
      fishDesc: "Färsk fisk från havet",
      burgers: "Hamburgare",
      burgersDesc: "Saftiga hamburgare med tillbehör",
      pizza: "Pizza",
      pizzaDesc: "Färska pizzor från vår stenugn",
      salads: "Sallader",
      saladsDesc: "Fräscha och nyttiga sallader",
      kids: "Barnmeny",
      kidsDesc: "Barnvänliga rätter",
      sides: "Tillbehör",
      sidesDesc: "Perfekta tillbehör till din rätt",
      desserts: "Efterrätter",
      dessertsDesc: "Söta avslutningar",
      whiteWines: "Vita Viner",
      whiteWinesDesc: "Fräscha och eleganta vita viner",
      redWines: "Röda Viner",
      redWinesDesc: "Kraftfulla och fylliga röda viner",
      rose: "Rosé",
      roseDesc: "Lätta och friska roséviner",
      sparkling: "Mousserande",
      sparklingDesc: "Bubbliga och festliga viner",
      draftBeer: "Öl på Fat",
      draftBeerDesc: "Färskt öl direkt från fatet",
      bottledBeer: "Öl på Flaska",
      bottledBeerDesc: "Klassiska öl på flaska",
      cider: "Cider",
      ciderDesc: "Fruktig och uppfriskande cider",
      softDrinks: "Läsk & Vatten",
      softDrinksDesc: "Alkoholfria drycker",
      hotDrinks: "Varma Drycker",
      hotDrinksDesc: "Kaffe, te och varm choklad",
      cocktails: "Drinkar",
      cocktailsDesc: "Klassiska och moderna cocktails",
      shots: "Shots & Snaps",
      shotsDesc: "Starka shots och snaps",
      whisky: "Whisky",
      whiskyDesc: "Premium whisky från hela världen",
      rum: "Rom",
      rumDesc: "Karibisk och sydamerikansk rom",
      cognac: "Cognac",
      cognacDesc: "Exklusiv fransk cognac",
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
      appetizers: "Appetizers",
      appetizersDesc: "Perfect to start your meal",
      meat: "Meat Dishes",
      meatDesc: "Juicy meat cooked to perfection",
      pasta: "Pasta",
      pastaDesc: "Homemade pasta with delicious sauces",
      fish: "Fish Dishes",
      fishDesc: "Fresh fish from the sea",
      burgers: "Burgers",
      burgersDesc: "Juicy burgers with sides",
      pizza: "Pizza",
      pizzaDesc: "Fresh pizzas from our stone oven",
      salads: "Salads",
      saladsDesc: "Fresh and healthy salads",
      kids: "Kids Menu",
      kidsDesc: "Kid-friendly dishes",
      sides: "Sides",
      sidesDesc: "Perfect sides for your meal",
      desserts: "Desserts",
      dessertsDesc: "Sweet endings",
      whiteWines: "White Wines",
      whiteWinesDesc: "Fresh and elegant white wines",
      redWines: "Red Wines",
      redWinesDesc: "Bold and full-bodied red wines",
      rose: "Rosé",
      roseDesc: "Light and fresh rosé wines",
      sparkling: "Sparkling",
      sparklingDesc: "Bubbly and festive wines",
      draftBeer: "Draft Beer",
      draftBeerDesc: "Fresh beer straight from the tap",
      bottledBeer: "Bottled Beer",
      bottledBeerDesc: "Classic bottled beers",
      cider: "Cider",
      ciderDesc: "Fruity and refreshing cider",
      softDrinks: "Soft Drinks & Water",
      softDrinksDesc: "Non-alcoholic beverages",
      hotDrinks: "Hot Drinks",
      hotDrinksDesc: "Coffee, tea and hot chocolate",
      cocktails: "Cocktails",
      cocktailsDesc: "Classic and modern cocktails",
      shots: "Shots & Schnapps",
      shotsDesc: "Strong shots and schnapps",
      whisky: "Whisky",
      whiskyDesc: "Premium whisky from around the world",
      rum: "Rum",
      rumDesc: "Caribbean and South American rum",
      cognac: "Cognac",
      cognacDesc: "Exclusive French cognac",
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
      appetizers: "Vorspeisen",
      appetizersDesc: "Perfekt für den Beginn Ihrer Mahlzeit",
      meat: "Fleischgerichte",
      meatDesc: "Saftiges Fleisch perfekt zubereitet",
      pasta: "Pasta",
      pastaDesc: "Hausgemachte Pasta mit köstlichen Saucen",
      fish: "Fischgerichte",
      fishDesc: "Frischer Fisch aus dem Meer",
      burgers: "Burger",
      burgersDesc: "Saftige Burger mit Beilagen",
      pizza: "Pizza",
      pizzaDesc: "Frische Pizzen aus unserem Steinofen",
      salads: "Salate",
      saladsDesc: "Frische und gesunde Salate",
      kids: "Kindermenü",
      kidsDesc: "Kinderfreundliche Gerichte",
      sides: "Beilagen",
      sidesDesc: "Perfekte Beilagen zu Ihrem Gericht",
      desserts: "Desserts",
      dessertsDesc: "Süße Abschlüsse",
      whiteWines: "Weißweine",
      whiteWinesDesc: "Frische und elegante Weißweine",
      redWines: "Rotweine",
      redWinesDesc: "Kräftige und vollmundige Rotweine",
      rose: "Rosé",
      roseDesc: "Leichte und frische Roséweine",
      sparkling: "Sekt",
      sparklingDesc: "Prickelnde und festliche Weine",
      draftBeer: "Bier vom Fass",
      draftBeerDesc: "Frisches Bier direkt vom Fass",
      bottledBeer: "Flaschenbier",
      bottledBeerDesc: "Klassische Flaschenbiere",
      cider: "Cidre",
      ciderDesc: "Fruchtiger und erfrischender Cidre",
      softDrinks: "Erfrischungsgetränke",
      softDrinksDesc: "Alkoholfreie Getränke",
      hotDrinks: "Heißgetränke",
      hotDrinksDesc: "Kaffee, Tee und heiße Schokolade",
      cocktails: "Cocktails",
      cocktailsDesc: "Klassische und moderne Cocktails",
      shots: "Shots & Schnaps",
      shotsDesc: "Starke Shots und Schnaps",
      whisky: "Whisky",
      whiskyDesc: "Premium Whisky aus aller Welt",
      rum: "Rum",
      rumDesc: "Karibischer und südamerikanischer Rum",
      cognac: "Cognac",
      cognacDesc: "Exklusiver französischer Cognac",
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
      name: { sv: "Stora scampi med hetta", en: "Large Scampi with Heat", de: "Große Scampi mit Schärfe" },
      description: {
        sv: "6 st sweetchilimarinerade scampiräkor, dagens färska grönsaker, hembakat bröd, persilja, citron",
        en: "6 sweet chili marinated scampi prawns, today's fresh vegetables, homemade bread, parsley, lemon",
        de: "6 süß-chili marinierte Scampi-Garnelen, frisches Tagesgemüse, hausgemachtes Brot, Petersilie, Zitrone",
      },
      price: 149,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      spicyLevel: 2,
      allergens: ["shellfish", "gluten"],
    },
    {
      id: 12,
      name: { sv: "Tapasbricka", en: "Tapas Board", de: "Tapas-Brett" },
      description: {
        sv: "Serranoskinka, salami, marinerade oliver, manchego ost, brieost, vindruvor, fikonmarmelad, hembakat bröd",
        en: "Serrano ham, salami, marinated olives, manchego cheese, brie cheese, grapes, fig marmalade, homemade bread",
        de: "Serrano-Schinken, Salami, marinierte Oliven, Manchego-Käse, Brie-Käse, Trauben, Feigenmarmelade, hausgemachtes Brot",
      },
      price: 269,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isPopular: true,
      allergens: ["dairy", "gluten"],
    },
    {
      id: 13,
      name: { sv: "Marinerade oliver", en: "Marinated Olives", de: "Marinierte Oliven" },
      description: {
        sv: "Halkidiki- och kalamataoliver, marinerade i olivolja och färska örter",
        en: "Halkidiki and kalamata olives, marinated in olive oil and fresh herbs",
        de: "Halkidiki- und Kalamata-Oliven, mariniert in Olivenöl und frischen Kräutern",
      },
      price: 99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isVegan: true,
      allergens: [],
    },
    {
      id: 14,
      name: { sv: "Husets egna vitlöksbröd", en: "House Special Garlic Bread", de: "Hausgemachtes Knoblauchbrot" },
      description: {
        sv: "Vitlöksbröd toppat med mozzarella och oregano, serveras med tzatziki eller aioli",
        en: "Garlic bread topped with mozzarella and oregano, served with tzatziki or aioli",
        de: "Knoblauchbrot mit Mozzarella und Oregano, serviert mit Tzatziki oder Aioli",
      },
      price: 89,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 10,
      isVegetarian: true,
      allergens: ["gluten", "dairy"],
    },
  ],
  meat: [
    {
      id: 20,
      name: { sv: "Filetto di Maiale", en: "Filetto di Maiale", de: "Filetto di Maiale" },
      description: {
        sv: "Grillad fläskfilé, Idaho potatis/duchesspotatis, hemmagjord bearnaisesås, örtolja, karamelliserade morötter",
        en: "Grilled pork fillet, Idaho potato/duchess potato, homemade bearnaise sauce, herb oil, caramelized carrots",
        de: "Gegrilltes Schweinefilet, Idaho-Kartoffel/Herzogin-Kartoffel, hausgemachte Bearnaise-Sauce, Kräuteröl, karamellisierte Karotten",
      },
      price: 279,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 21,
      name: { sv: "Teriyakimarinerad kycklingbröstfilé", en: "Teriyaki Marinated Chicken Breast", de: "Teriyaki-marinierte Hähnchenbrust" },
      description: {
        sv: "Teriyakimarinerad kyckling, karamelliserade morötter, ponzu glaze, hemmagjord bearnaisesås, Idaho potatis",
        en: "Teriyaki marinated chicken, caramelized carrots, ponzu glaze, homemade bearnaise sauce, Idaho potato",
        de: "Teriyaki-mariniertes Hähnchen, karamellisierte Karotten, Ponzu-Glasur, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel",
      },
      price: 259,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 22,
      allergens: ["eggs", "dairy", "soy"],
    },
    {
      id: 22,
      name: { sv: "Filetto di Agnello", en: "Filetto di Agnello", de: "Filetto di Agnello" },
      description: {
        sv: "Grillad lammfilé, Idaho potatis, karamelliserade morötter, örtolja, hemmagjord bearnaisesås",
        en: "Grilled lamb fillet, Idaho potato, caramelized carrots, herb oil, homemade bearnaise sauce",
        de: "Gegrilltes Lammfilet, Idaho-Kartoffel, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce",
      },
      price: 309,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      isPopular: true,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 23,
      name: { sv: "Balkantallrik", en: "Balkan Platter", de: "Balkan-Teller" },
      description: {
        sv: "Oxfilé, cevapcici, kebabspett, lammkorv, ajvar, tzatziki, fetaostsallad, vitlöksbröd, pommes",
        en: "Beef fillet, cevapcici, kebab skewer, lamb sausage, ajvar, tzatziki, feta cheese salad, garlic bread, fries",
        de: "Rinderfilet, Cevapcici, Kebab-Spieß, Lammwurst, Ajvar, Tzatziki, Fetakäse-Salat, Knoblauchbrot, Pommes",
      },
      price: 369,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 30,
      isPopular: true,
      allergens: ["dairy", "gluten"],
    },
    {
      id: 24,
      name: { sv: "Plankstek 130g", en: "Plank Steak 130g", de: "Planken-Steak 130g" },
      description: {
        sv: "Grillad oxfilé 130g, karamelliserade morötter, örtolja, hemmagjord bearnaisesås, Idaho potatis/duchesspotatis",
        en: "Grilled beef fillet 130g, caramelized carrots, herb oil, homemade bearnaise sauce, Idaho potato/duchess potato",
        de: "Gegrilltes Rinderfilet 130g, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel/Herzogin-Kartoffel",
      },
      price: 249,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 25,
      name: { sv: "Plankstek 220g", en: "Plank Steak 220g", de: "Planken-Steak 220g" },
      description: {
        sv: "Grillad oxfilé 220g, karamelliserade morötter, örtolja, hemmagjord bearnaisesås, Idaho potatis/duchesspotatis",
        en: "Grilled beef fillet 220g, caramelized carrots, herb oil, homemade bearnaise sauce, Idaho potato/duchess potato",
        de: "Gegrilltes Rinderfilet 220g, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel/Herzogin-Kartoffel",
      },
      price: 349,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 28,
      isPopular: true,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 26,
      name: { sv: "Entrecôte", en: "Entrecôte", de: "Entrecôte" },
      description: {
        sv: "Grillad svensk entrecôte 250g, karamelliserade morötter, örtolja, hemmagjord bearnaisesås, Idaho potatis",
        en: "Grilled Swedish entrecôte 250g, caramelized carrots, herb oil, homemade bearnaise sauce, Idaho potato",
        de: "Gegrilltes schwedisches Entrecôte 250g, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel",
      },
      price: 299,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 27,
      name: { sv: "T-benstek 250g", en: "T-bone Steak 250g", de: "T-Bone-Steak 250g" },
      description: {
        sv: "Grillad T-benstek 250g, karamelliserade morötter, örtolja, hemmagjord bearnaisesås, Idaho potatis. Såsval: bearnaisesås, rödvinssås eller pepparsås",
        en: "Grilled T-bone steak 250g, caramelized carrots, herb oil, homemade bearnaise sauce, Idaho potato. Sauce choice: bearnaise, red wine or pepper sauce",
        de: "Gegrilltes T-Bone-Steak 250g, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel. Saucenwahl: Bearnaise, Rotwein oder Pfeffersauce",
      },
      price: 299,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      allergens: ["eggs", "dairy"],
    },
    {
      id: 28,
      name: { sv: "T-benstek 350g", en: "T-bone Steak 350g", de: "T-Bone-Steak 350g" },
      description: {
        sv: "Grillad T-benstek 350g, karamelliserade morötter, örtolja, hemmagjord bearnaisesås, Idaho potatis. Såsval: bearnaisesås, rödvinssås eller pepparsås",
        en: "Grilled T-bone steak 350g, caramelized carrots, herb oil, homemade bearnaise sauce, Idaho potato. Sauce choice: bearnaise, red wine or pepper sauce",
        de: "Gegrilltes T-Bone-Steak 350g, karamellisierte Karotten, Kräuteröl, hausgemachte Bearnaise-Sauce, Idaho-Kartoffel. Saucenwahl: Bearnaise, Rotwein oder Pfeffersauce",
      },
      price: 399,
      category: "meat",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 30,
      isPopular: true,
      allergens: ["eggs", "dairy"],
    },
  ],
  pasta: [
    {
      id: 60,
      name: { sv: "Pasta Carbonara", en: "Pasta Carbonara", de: "Pasta Carbonara" },
      description: {
        sv: "Klassisk carbonara med ägg, bacon och parmesanost",
        en: "Classic carbonara with eggs, bacon and parmesan cheese",
        de: "Klassische Carbonara mit Eiern, Speck und Parmesankäse",
      },
      price: 185,
      category: "pasta",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy", "eggs"],
    },
    {
      id: 61,
      name: { sv: "Pasta Arrabbiata", en: "Pasta Arrabbiata", de: "Pasta Arrabbiata" },
      description: {
        sv: "Kryddig pasta med tomatsås, vitlök och chili",
        en: "Spicy pasta with tomato sauce, garlic and chili",
        de: "Scharfe Pasta mit Tomatensauce, Knoblauch und Chili",
      },
      price: 165,
      category: "pasta",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      spicyLevel: 2,
      isVegan: true,
      allergens: ["gluten"],
    },
  ],
  fish: [
    {
      id: 70,
      name: { sv: "Fish & Chips", en: "Fish & Chips", de: "Fish & Chips" },
      description: {
        sv: "200 g tempurabakad torskfilé, pommes, hemmagjord remouladsås, knaprig sallad",
        en: "200g tempura-baked cod fillet, fries, homemade remoulade sauce, crispy salad",
        de: "200g tempura-gebackenes Kabeljaufilet, Pommes, hausgemachte Remoulade-Sauce, knackiger Salat",
      },
      price: 199,
      category: "fish",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 18,
      isPopular: true,
      allergens: ["fish", "gluten", "eggs"],
    },
    {
      id: 71,
      name: { sv: "Lax och räkgratäng", en: "Salmon and Shrimp Gratin", de: "Lachs-Garnelen-Gratin" },
      description: {
        sv: "Laxfilé gratinerad med vitvinssås, duchesspotatis, sauterad spenat, toppad med räkor, citron, dill",
        en: "Salmon fillet gratinated with white wine sauce, duchess potato, sautéed spinach, topped with shrimp, lemon, dill",
        de: "Lachsfilet gratiniert mit Weißweinsauce, Herzogin-Kartoffel, sautierter Spinat, mit Garnelen, Zitrone, Dill",
      },
      price: 269,
      category: "fish",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 25,
      isPopular: true,
      allergens: ["fish", "shellfish", "dairy"],
    },
    {
      id: 72,
      name: { sv: "Blåmusslor", en: "Blue Mussels", de: "Miesmuscheln" },
      description: {
        sv: "1 kg blåmusslor i vitvinssås, toppad med örter. Serveras med pommes eller vitlöksbröd",
        en: "1kg blue mussels in white wine sauce, topped with herbs. Served with fries or garlic bread",
        de: "1kg Miesmuscheln in Weißweinsauce, mit Kräutern. Serviert mit Pommes oder Knoblauchbrot",
      },
      price: 299,
      category: "fish",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 20,
      allergens: ["shellfish", "dairy"],
    },
  ],
  burgers: [
    {
      id: 80,
      name: { sv: "CB's klassiska ostburgare", en: "CB's Classic Cheeseburger", de: "CB's klassischer Cheeseburger" },
      description: {
        sv: "Högrevsburgare med cheddarost",
        en: "Chuck beef burger with cheddar cheese",
        de: "Chuck-Rindfleisch-Burger mit Cheddar-Käse",
      },
      price: 149,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 81,
      name: { sv: "CB's ost- & baconburgare", en: "CB's Cheese & Bacon Burger", de: "CB's Käse- & Speck-Burger" },
      description: {
        sv: "Högrevsburgare med cheddarost och krispigt bacon",
        en: "Chuck beef burger with cheddar cheese and crispy bacon",
        de: "Chuck-Rindfleisch-Burger mit Cheddar-Käse und knusprigem Speck",
      },
      price: 159,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 82,
      name: { sv: "CB's ost- & baconburgare XL", en: "CB's Cheese & Bacon Burger XL", de: "CB's Käse- & Speck-Burger XL" },
      description: {
        sv: "Större portion av högrevsburgare med cheddarost och krispigt bacon",
        en: "Larger portion of chuck beef burger with cheddar cheese and crispy bacon",
        de: "Größere Portion Chuck-Rindfleisch-Burger mit Cheddar-Käse und knusprigem Speck",
      },
      price: 199,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 18,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 83,
      name: { sv: "Kycklingburgare", en: "Chicken Burger", de: "Hähnchen-Burger" },
      description: {
        sv: "Panerad kycklingfilé",
        en: "Breaded chicken fillet",
        de: "Paniertes Hähnchenfil et",
      },
      price: 159,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      allergens: ["gluten"],
    },
    {
      id: 84,
      name: { sv: "Halloumiburgare", en: "Halloumi Burger", de: "Halloumi-Burger" },
      description: {
        sv: "Grillad halloumi",
        en: "Grilled halloumi",
        de: "Gegrillter Halloumi",
      },
      price: 159,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isVegetarian: true,
      allergens: ["gluten", "dairy"],
    },
  ],
  pizza: [
    {
      id: 90,
      name: { sv: "Margarita", en: "Margarita", de: "Margarita" },
      description: {
        sv: "Tomatsås, ost",
        en: "Tomato sauce, cheese",
        de: "Tomatensauce, Käse",
      },
      price: 129,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isVegetarian: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 91,
      name: { sv: "Vesuvio", en: "Vesuvio", de: "Vesuvio" },
      description: {
        sv: "Tomatsås, ost, skinka, ev. dubbelvikt",
        en: "Tomato sauce, cheese, ham, possibly double folded",
        de: "Tomatensauce, Käse, Schinken, evtl. doppelt gefaltet",
      },
      price: 149,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 92,
      name: { sv: "Caruso", en: "Caruso", de: "Caruso" },
      description: {
        sv: "Tomatsås, ost, paprika, salami",
        en: "Tomato sauce, cheese, bell pepper, salami",
        de: "Tomatensauce, Käse, Paprika, Salami",
      },
      price: 149,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 93,
      name: { sv: "Capricciosa", en: "Capricciosa", de: "Capricciosa" },
      description: {
        sv: "Tomatsås, ost, skinka, champinjoner",
        en: "Tomato sauce, cheese, ham, mushrooms",
        de: "Tomatensauce, Käse, Schinken, Pilze",
      },
      price: 169,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isPopular: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 94,
      name: { sv: "Musketer", en: "Musketer", de: "Musketer" },
      description: {
        sv: "Tomatsås, ost, stark korv, lök, champinjoner",
        en: "Tomato sauce, cheese, spicy sausage, onion, mushrooms",
        de: "Tomatensauce, Käse, scharfe Wurst, Zwiebel, Pilze",
      },
      price: 169,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      spicyLevel: 2,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 95,
      name: { sv: "Capri", en: "Capri", de: "Capri" },
      description: {
        sv: "Tomatsås, ost, salami, champinjoner, paprika",
        en: "Tomato sauce, cheese, salami, mushrooms, bell pepper",
        de: "Tomatensauce, Käse, Salami, Pilze, Paprika",
      },
      price: 169,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 96,
      name: { sv: "Al Capone", en: "Al Capone", de: "Al Capone" },
      description: {
        sv: "Tomatsås, ost, skinka, bacon, stark korv",
        en: "Tomato sauce, cheese, ham, bacon, spicy sausage",
        de: "Tomatensauce, Käse, Schinken, Speck, scharfe Wurst",
      },
      price: 189,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      spicyLevel: 2,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 97,
      name: { sv: "Kebabpizza", en: "Kebab Pizza", de: "Kebab-Pizza" },
      description: {
        sv: "Tomatsås, ost, kebabkött, sallad, tomat, gurka, tzatziki",
        en: "Tomato sauce, cheese, kebab meat, lettuce, tomato, cucumber, tzatziki",
        de: "Tomatensauce, Käse, Kebabfleisch, Salat, Tomate, Gurke, Tzatziki",
      },
      price: 189,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 98,
      name: { sv: "Vegetale", en: "Vegetale", de: "Vegetale" },
      description: {
        sv: "Tomatsås, ost, lök, oliver, champinjoner, paprika, kapris",
        en: "Tomato sauce, cheese, onion, olives, mushrooms, bell pepper, capers",
        de: "Tomatensauce, Käse, Zwiebel, Oliven, Pilze, Paprika, Kapern",
      },
      price: 179,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isVegetarian: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 99,
      name: { sv: "Casablanca", en: "Casablanca", de: "Casablanca" },
      description: {
        sv: "Dubbelvikt, tomatsås, ost, skinka, stark korv, räkor, champinjoner, lök",
        en: "Double folded, tomato sauce, cheese, ham, spicy sausage, shrimp, mushrooms, onion",
        de: "Doppelt gefaltet, Tomatensauce, Käse, Schinken, scharfe Wurst, Garnelen, Pilze, Zwiebel",
      },
      price: 199,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 18,
      isPopular: true,
      spicyLevel: 2,
      allergens: ["gluten", "dairy", "shellfish"],
    },
    {
      id: 100,
      name: { sv: "Salina Cruz", en: "Salina Cruz", de: "Salina Cruz" },
      description: {
        sv: "Tomatsås, ost, oxfilé, jalapeño, chipotlesås",
        en: "Tomato sauce, cheese, beef fillet, jalapeño, chipotle sauce",
        de: "Tomatensauce, Käse, Rinderfilet, Jalapeño, Chipotle-Sauce",
      },
      price: 219,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      spicyLevel: 3,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 101,
      name: { sv: "Roma", en: "Roma", de: "Roma" },
      description: {
        sv: "Tomatsås, mozzarella, parmaskinka, parmesan, ruccola, tzatziki",
        en: "Tomato sauce, mozzarella, parma ham, parmesan, arugula, tzatziki",
        de: "Tomatensauce, Mozzarella, Parmaschinken, Parmesan, Rucola, Tzatziki",
      },
      price: 219,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 102,
      name: { sv: "Oxfilépizza", en: "Beef Fillet Pizza", de: "Rinderfilet-Pizza" },
      description: {
        sv: "Tomatsås, ost, oxfilé, champinjoner, bearnaisesås",
        en: "Tomato sauce, cheese, beef fillet, mushrooms, bearnaise sauce",
        de: "Tomatensauce, Käse, Rinderfilet, Pilze, Bearnaise-Sauce",
      },
      price: 219,
      category: "pizza",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      isPopular: true,
      allergens: ["gluten", "dairy", "eggs"],
    },
  ],
  salads: [
    {
      id: 110,
      name: { sv: "Caesarsallad", en: "Caesar Salad", de: "Caesar Salat" },
      description: {
        sv: "Romansallad, körsbärstomat, gurka, rödlök, krutonger, parmesan, caesardressing. Välj kyckling, scampi eller halloumi",
        en: "Romaine lettuce, cherry tomatoes, cucumber, red onion, croutons, parmesan, caesar dressing. Choose chicken, scampi or halloumi",
        de: "Römersalat, Kirschtomaten, Gurke, rote Zwiebel, Croutons, Parmesan, Caesar-Dressing. Wählen Sie Hähnchen, Scampi oder Halloumi",
      },
      price: 192,
      category: "salads",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 10,
      isPopular: true,
      allergens: ["gluten", "dairy", "eggs"],
    },
    {
      id: 111,
      name: { sv: "CB's mangosallad", en: "CB's Mango Salad", de: "CB's Mango-Salat" },
      description: {
        sv: "Mango, majs, romansallad, gurka, körsbärstomat, rödlök, rostade solrosfrön, lime-olivoljedressing",
        en: "Mango, corn, romaine lettuce, cucumber, cherry tomatoes, red onion, roasted sunflower seeds, lime-olive oil dressing",
        de: "Mango, Mais, Römersalat, Gurke, Kirschtomaten, rote Zwiebel, geröstete Sonnenblumenkerne, Limetten-Olivenöl-Dressing",
      },
      price: 179,
      category: "salads",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isVegan: true,
      allergens: [],
    },
  ],
  kids: [
    {
      id: 120,
      name: { sv: "Hamburgare", en: "Hamburger", de: "Hamburger" },
      description: {
        sv: "Med bröd, pommes, grönsaker, ketchup",
        en: "With bread, fries, vegetables, ketchup",
        de: "Mit Brot, Pommes, Gemüse, Ketchup",
      },
      price: 139,
      category: "kids",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 15,
      allergens: ["gluten", "dairy"],
    },
    {
      id: 121,
      name: { sv: "Chicken nuggets", en: "Chicken Nuggets", de: "Hähnchen-Nuggets" },
      description: {
        sv: "Med pommes, grönsaksstavar, ketchup",
        en: "With fries, vegetable sticks, ketchup",
        de: "Mit Pommes, Gemüsesticks, Ketchup",
      },
      price: 119,
      category: "kids",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      allergens: ["gluten"],
    },
    {
      id: 122,
      name: { sv: "Hemmagjorda köttbullar", en: "Homemade Meatballs", de: "Hausgemachte Fleischbällchen" },
      description: {
        sv: "Med pommes, grönsaker, ketchup",
        en: "With fries, vegetables, ketchup",
        de: "Mit Pommes, Gemüse, Ketchup",
      },
      price: 119,
      category: "kids",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 18,
      allergens: ["gluten", "dairy", "eggs"],
    },
  ],
  sides: [
    {
      id: 130,
      name: { sv: "Friterade lökringar (2 st)", en: "Fried Onion Rings (2 pcs)", de: "Frittierte Zwiebelringe (2 Stk)" },
      description: {
        sv: "Knapriga friterade lökringar",
        en: "Crispy fried onion rings",
        de: "Knusprige frittierte Zwiebelringe",
      },
      price: 15,
      category: "sides",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isVegetarian: true,
      allergens: ["gluten"],
    },
    {
      id: 131,
      name: { sv: "Idaho potatis", en: "Idaho Potato", de: "Idaho-Kartoffel" },
      description: {
        sv: "Bakad potatis med smör och örter",
        en: "Baked potato with butter and herbs",
        de: "Gebackene Kartoffel mit Butter und Kräutern",
      },
      price: 49,
      category: "sides",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isVegetarian: true,
      allergens: ["dairy"],
    },
    {
      id: 132,
      name: { sv: "Pommes frites", en: "French Fries", de: "Pommes Frites" },
      description: {
        sv: "Knapriga pommes frites",
        en: "Crispy french fries",
        de: "Knusprige Pommes Frites",
      },
      price: 49,
      category: "sides",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isVegan: true,
      allergens: [],
    },
    {
      id: 133,
      name: { sv: "Tzatziki", en: "Tzatziki", de: "Tzatziki" },
      description: {
        sv: "Krämig tzatziki med gurka och vitlök",
        en: "Creamy tzatziki with cucumber and garlic",
        de: "Cremiges Tzatziki mit Gurke und Knoblauch",
      },
      price: 15,
      category: "sides",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isVegetarian: true,
      allergens: ["dairy"],
    },
    {
      id: 134,
      name: { sv: "Vitlöksaioli / chiliaioli", en: "Garlic Aioli / Chili Aioli", de: "Knoblauch-Aioli / Chili-Aioli" },
      description: {
        sv: "Krämig aioli med vitlök eller chili",
        en: "Creamy aioli with garlic or chili",
        de: "Cremige Aioli mit Knoblauch oder Chili",
      },
      price: 15,
      category: "sides",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isVegetarian: true,
      allergens: ["eggs"],
    },
  ],
  desserts: [
    {
      id: 140,
      name: { sv: "Camembert fritto", en: "Fried Camembert", de: "Frittierter Camembert" },
      description: {
        sv: "Friterad camembertost, hjortronsylt, friterad persilja",
        en: "Fried camembert cheese, cloudberry jam, fried parsley",
        de: "Frittierter Camembert-Käse, Moltebeeren-Marmelade, frittierte Petersilie",
      },
      price: 129,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 8,
      isPopular: true,
      isVegetarian: true,
      allergens: ["dairy", "gluten", "eggs"],
    },
    {
      id: 141,
      name: { sv: "Njuta", en: "Njuta", de: "Njuta" },
      description: {
        sv: "Chokladfondant med glass, grädde, färska bär",
        en: "Chocolate fondant with ice cream, cream, fresh berries",
        de: "Schokoladen-Fondant mit Eis, Sahne, frischen Beeren",
      },
      price: 119,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 12,
      isPopular: true,
      isVegetarian: true,
      allergens: ["dairy", "eggs", "gluten"],
    },
    {
      id: 142,
      name: { sv: "Glader", en: "Glader", de: "Glader" },
      description: {
        sv: "Vaniljglass med chokladsås",
        en: "Vanilla ice cream with chocolate sauce",
        de: "Vanilleeis mit Schokoladensauce",
      },
      price: 59,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isVegetarian: true,
      allergens: ["dairy"],
    },
    {
      id: 143,
      name: { sv: "Äppelkaka", en: "Apple Cake", de: "Apfelkuchen" },
      description: {
        sv: "Serveras med vaniljsås och färska bär",
        en: "Served with vanilla sauce and fresh berries",
        de: "Serviert mit Vanillesauce und frischen Beeren",
      },
      price: 109,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isVegetarian: true,
      allergens: ["gluten", "dairy", "eggs"],
    },
    {
      id: 144,
      name: { sv: "Tiramisu", en: "Tiramisu", de: "Tiramisu" },
      description: {
        sv: "Mascarponekräm, espresso, kakao",
        en: "Mascarpone cream, espresso, cocoa",
        de: "Mascarpone-Creme, Espresso, Kakao",
      },
      price: 109,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isPopular: true,
      isVegetarian: true,
      allergens: ["dairy", "eggs"],
    },
  ],
  whiteWines: [
    {
      id: 200,
      name: { sv: "Husets vita vin", en: "House White Wine", de: "Hauswein Weiß" },
      description: {
        sv: "Glas 109 kr / Flaska 490 kr",
        en: "Glass 109 kr / Bottle 490 kr",
        de: "Glas 109 kr / Flasche 490 kr",
      },
      price: 109,
      category: "whiteWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 201,
      name: { sv: "Single Vineyard Riesling", en: "Single Vineyard Riesling", de: "Single Vineyard Riesling" },
      description: {
        sv: "Flaska 490 kr",
        en: "Bottle 490 kr",
        de: "Flasche 490 kr",
      },
      price: 490,
      category: "whiteWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
    {
      id: 202,
      name: { sv: "Frei Brother Sauvignon Blanc", en: "Frei Brother Sauvignon Blanc", de: "Frei Brother Sauvignon Blanc" },
      description: {
        sv: "Flaska 490 kr",
        en: "Bottle 490 kr",
        de: "Flasche 490 kr",
      },
      price: 490,
      category: "whiteWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
    {
      id: 203,
      name: { sv: "Laroche Petit Chablis", en: "Laroche Petit Chablis", de: "Laroche Petit Chablis" },
      description: {
        sv: "Flaska 549 kr",
        en: "Bottle 549 kr",
        de: "Flasche 549 kr",
      },
      price: 549,
      category: "whiteWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
  ],
  redWines: [
    {
      id: 210,
      name: { sv: "Husets röda vin", en: "House Red Wine", de: "Hauswein Rot" },
      description: {
        sv: "Glas 109 kr / Flaska 490 kr",
        en: "Glass 109 kr / Bottle 490 kr",
        de: "Glas 109 kr / Flasche 490 kr",
      },
      price: 109,
      category: "redWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 211,
      name: { sv: "Coto de Imaz Reserva Rioja", en: "Coto de Imaz Reserva Rioja", de: "Coto de Imaz Reserva Rioja" },
      description: {
        sv: "Flaska 599 kr",
        en: "Bottle 599 kr",
        de: "Flasche 599 kr",
      },
      price: 599,
      category: "redWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 212,
      name: { sv: "Valpantena Amarone Della Valpolicella", en: "Valpantena Amarone Della Valpolicella", de: "Valpantena Amarone Della Valpolicella" },
      description: {
        sv: "Flaska 1100 kr",
        en: "Bottle 1100 kr",
        de: "Flasche 1100 kr",
      },
      price: 1100,
      category: "redWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
    {
      id: 213,
      name: { sv: "Plan B! Shiraz", en: "Plan B! Shiraz", de: "Plan B! Shiraz" },
      description: {
        sv: "Flaska 690 kr",
        en: "Bottle 690 kr",
        de: "Flasche 690 kr",
      },
      price: 690,
      category: "redWines",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
  ],
  rose: [
    {
      id: 220,
      name: { sv: "Husets rosévin", en: "House Rosé Wine", de: "Hauswein Rosé" },
      description: {
        sv: "Glas 109 kr / Flaska 490 kr",
        en: "Glass 109 kr / Bottle 490 kr",
        de: "Glas 109 kr / Flasche 490 kr",
      },
      price: 109,
      category: "rose",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 221,
      name: { sv: "Sancerre Rosé", en: "Sancerre Rosé", de: "Sancerre Rosé" },
      description: {
        sv: "Flaska 559 kr",
        en: "Bottle 559 kr",
        de: "Flasche 559 kr",
      },
      price: 559,
      category: "rose",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
  ],
  sparkling: [
    {
      id: 230,
      name: { sv: "Husets Prosecco", en: "House Prosecco", de: "Hauswein Prosecco" },
      description: {
        sv: "Glas 109 kr / Flaska 499 kr",
        en: "Glass 109 kr / Bottle 499 kr",
        de: "Glas 109 kr / Flasche 499 kr",
      },
      price: 109,
      category: "sparkling",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 231,
      name: { sv: "Champagne de Saint-Marceaux", en: "Champagne de Saint-Marceaux", de: "Champagne de Saint-Marceaux" },
      description: {
        sv: "Flaska 990 kr",
        en: "Bottle 990 kr",
        de: "Flasche 990 kr",
      },
      price: 990,
      category: "sparkling",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 232,
      name: { sv: "Philipponnat Champagne", en: "Philipponnat Champagne", de: "Philipponnat Champagne" },
      description: {
        sv: "Flaska 1490 kr",
        en: "Bottle 1490 kr",
        de: "Flasche 1490 kr",
      },
      price: 1490,
      category: "sparkling",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
  ],
  draftBeer: [
    {
      id: 240,
      name: { sv: "Galopp", en: "Galopp", de: "Galopp" },
      description: {
        sv: "Ipa, Melleruds eller Krusovice, 33 cl",
        en: "IPA, Melleruds or Krusovice, 33 cl",
        de: "IPA, Melleruds oder Krusovice, 33 cl",
      },
      price: 79,
      category: "draftBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["gluten"],
    },
  ],
  bottledBeer: [
    {
      id: 250,
      name: { sv: "Ipa", en: "IPA", de: "IPA" },
      description: {
        sv: "Brutal Brewing, Sverige, 5,8 %, 50 cl",
        en: "Brutal Brewing, Sweden, 5.8%, 50 cl",
        de: "Brutal Brewing, Schweden, 5,8%, 50 cl",
      },
      price: 99,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["gluten"],
    },
    {
      id: 251,
      name: { sv: "Melleruds (EKO)", en: "Melleruds (Organic)", de: "Melleruds (Bio)" },
      description: {
        sv: "Sverige, 4,8 %, 50 cl",
        en: "Sweden, 4.8%, 50 cl",
        de: "Schweden, 4,8%, 50 cl",
      },
      price: 99,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 252,
      name: { sv: "Krusovice", en: "Krusovice", de: "Krusovice" },
      description: {
        sv: "Tjeckien, 5,0 %, 50 cl",
        en: "Czech Republic, 5.0%, 50 cl",
        de: "Tschechien, 5,0%, 50 cl",
      },
      price: 99,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 253,
      name: { sv: "CB Öl", en: "CB Beer", de: "CB Bier" },
      description: {
        sv: "Ljus lager, Sverige, 5,0 %, 50 cl",
        en: "Light lager, Sweden, 5.0%, 50 cl",
        de: "Helles Lager, Schweden, 5,0%, 50 cl",
      },
      price: 99,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["gluten"],
    },
    {
      id: 254,
      name: { sv: "Heineken", en: "Heineken", de: "Heineken" },
      description: {
        sv: "Ljus lager, Holland, 5,0 %, 33 cl",
        en: "Light lager, Netherlands, 5.0%, 33 cl",
        de: "Helles Lager, Niederlande, 5,0%, 33 cl",
      },
      price: 89,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 255,
      name: { sv: "Sol", en: "Sol", de: "Sol" },
      description: {
        sv: "Ljus lager, Mexico, 4,5 %, 33 cl",
        en: "Light lager, Mexico, 4.5%, 33 cl",
        de: "Helles Lager, Mexiko, 4,5%, 33 cl",
      },
      price: 89,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 256,
      name: { sv: "Mariestads Export", en: "Mariestads Export", de: "Mariestads Export" },
      description: {
        sv: "Ljus lager, Sverige, 5,3 %, 50 cl",
        en: "Light lager, Sweden, 5.3%, 50 cl",
        de: "Helles Lager, Schweden, 5,3%, 50 cl",
      },
      price: 99,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 257,
      name: { sv: "Birra Menabrea", en: "Birra Menabrea", de: "Birra Menabrea" },
      description: {
        sv: "Ljus lager, Italien, 4,6 %, 66 cl",
        en: "Light lager, Italy, 4.6%, 66 cl",
        de: "Helles Lager, Italien, 4,6%, 66 cl",
      },
      price: 129,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 258,
      name: { sv: "Sleepy Bulldog", en: "Sleepy Bulldog", de: "Sleepy Bulldog" },
      description: {
        sv: "Pale Ale, Sverige, 4,8 %, 33 cl",
        en: "Pale Ale, Sweden, 4.8%, 33 cl",
        de: "Pale Ale, Schweden, 4,8%, 33 cl",
      },
      price: 109,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 259,
      name: { sv: "Duvel", en: "Duvel", de: "Duvel" },
      description: {
        sv: "Ljus Ale, Belgien, 8,5 %, 33 cl",
        en: "Light Ale, Belgium, 8.5%, 33 cl",
        de: "Helles Ale, Belgien, 8,5%, 33 cl",
      },
      price: 139,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["gluten"],
    },
    {
      id: 260,
      name: { sv: "Paulaner", en: "Paulaner", de: "Paulaner" },
      description: {
        sv: "Hefe-Weissbier, Tyskland, 5,5 %, 50 cl",
        en: "Hefe-Weissbier, Germany, 5.5%, 50 cl",
        de: "Hefe-Weissbier, Deutschland, 5,5%, 50 cl",
      },
      price: 119,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 261,
      name: { sv: "Gränges (lättöl)", en: "Gränges (Light Beer)", de: "Gränges (Leichtbier)" },
      description: {
        sv: "Ljus lager, Sverige, 33 cl",
        en: "Light lager, Sweden, 33 cl",
        de: "Helles Lager, Schweden, 33 cl",
      },
      price: 69,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
    {
      id: 262,
      name: { sv: "Melleruds (alkoholfri)", en: "Melleruds (Alcohol-free)", de: "Melleruds (alkoholfrei)" },
      description: {
        sv: "Ljus lager, Sverige, 33 cl",
        en: "Light lager, Sweden, 33 cl",
        de: "Helles Lager, Schweden, 33 cl",
      },
      price: 59,
      category: "bottledBeer",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["gluten"],
    },
  ],
  cider: [
    {
      id: 270,
      name: { sv: "Briska Hallon Vinbär", en: "Briska Raspberry Blackcurrant", de: "Briska Himbeere Johannisbeere" },
      description: {
        sv: "33 cl",
        en: "33 cl",
        de: "33 cl",
      },
      price: 99,
      category: "cider",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
      allergens: ["sulfites"],
    },
    {
      id: 271,
      name: { sv: "Äppelcider", en: "Apple Cider", de: "Apfelcider" },
      description: {
        sv: "33 cl",
        en: "33 cl",
        de: "33 cl",
      },
      price: 99,
      category: "cider",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
    {
      id: 272,
      name: { sv: "Päroncider", en: "Pear Cider", de: "Birnencider" },
      description: {
        sv: "33 cl",
        en: "33 cl",
        de: "33 cl",
      },
      price: 99,
      category: "cider",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
    {
      id: 273,
      name: { sv: "Alkoholfri cider", en: "Alcohol-free Cider", de: "Alkoholfreier Cider" },
      description: {
        sv: "33 cl",
        en: "33 cl",
        de: "33 cl",
      },
      price: 69,
      category: "cider",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      allergens: ["sulfites"],
    },
  ],
  softDrinks: [
    {
      id: 280,
      name: { sv: "Läsk", en: "Soft Drinks", de: "Erfrischungsgetränke" },
      description: {
        sv: "Pepsi, Pepsi Max, 7up, Zingo",
        en: "Pepsi, Pepsi Max, 7up, Zingo",
        de: "Pepsi, Pepsi Max, 7up, Zingo",
      },
      price: 49,
      category: "softDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 281,
      name: { sv: "Loka Naturell / Citron", en: "Loka Natural / Lemon", de: "Loka Naturell / Zitrone" },
      description: {
        sv: "Naturell eller citronsmak",
        en: "Natural or lemon flavor",
        de: "Naturell oder Zitronengeschmack",
      },
      price: 49,
      category: "softDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
  ],
  hotDrinks: [
    {
      id: 290,
      name: { sv: "Lungo", en: "Lungo", de: "Lungo" },
      description: {
        sv: "Förlängd espresso",
        en: "Extended espresso",
        de: "Verlängerter Espresso",
      },
      price: 45,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
    },
    {
      id: 291,
      name: { sv: "Cappuccino", en: "Cappuccino", de: "Cappuccino" },
      description: {
        sv: "Espresso med ångad mjölk och mjölkskum",
        en: "Espresso with steamed milk and milk foam",
        de: "Espresso mit gedämpfter Milch und Milchschaum",
      },
      price: 55,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 292,
      name: { sv: "Kaffe Latte", en: "Caffe Latte", de: "Caffe Latte" },
      description: {
        sv: "Espresso med mycket ångad mjölk",
        en: "Espresso with lots of steamed milk",
        de: "Espresso mit viel gedämpfter Milch",
      },
      price: 55,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 293,
      name: { sv: "Dubbel Espresso", en: "Double Espresso", de: "Doppelter Espresso" },
      description: {
        sv: "Dubbel dos espresso",
        en: "Double shot espresso",
        de: "Doppelter Espresso-Shot",
      },
      price: 55,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
    },
    {
      id: 294,
      name: { sv: "Espresso", en: "Espresso", de: "Espresso" },
      description: {
        sv: "Klassisk italiensk espresso",
        en: "Classic Italian espresso",
        de: "Klassischer italienischer Espresso",
      },
      price: 49,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 2,
      isPopular: true,
    },
    {
      id: 295,
      name: { sv: "Varm choklad", en: "Hot Chocolate", de: "Heiße Schokolade" },
      description: {
        sv: "Krämig varm choklad",
        en: "Creamy hot chocolate",
        de: "Cremige heiße Schokolade",
      },
      price: 69,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 296,
      name: { sv: "Te", en: "Tea", de: "Tee" },
      description: {
        sv: "Urval av olika tesorter",
        en: "Selection of different tea varieties",
        de: "Auswahl verschiedener Teesorten",
      },
      price: 39,
      category: "hotDrinks",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
  ],
  cocktails: [
    {
      id: 300,
      name: { sv: "White Russian", en: "White Russian", de: "White Russian" },
      description: {
        sv: "149/209 kr - Vodka, Kahlúa, grädde",
        en: "149/209 kr - Vodka, Kahlúa, cream",
        de: "149/209 kr - Wodka, Kahlúa, Sahne",
      },
      price: 149,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
      allergens: ["dairy"],
    },
    {
      id: 301,
      name: { sv: "Espresso Martini", en: "Espresso Martini", de: "Espresso Martini" },
      description: {
        sv: "159/219 kr - Vodka, Kahlúa, espresso",
        en: "159/219 kr - Vodka, Kahlúa, espresso",
        de: "159/219 kr - Wodka, Kahlúa, Espresso",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
      isPopular: true,
    },
    {
      id: 302,
      name: { sv: "Margarita", en: "Margarita", de: "Margarita" },
      description: {
        sv: "169/229 kr - Tequila, Cointreau, limejuice",
        en: "169/229 kr - Tequila, Cointreau, lime juice",
        de: "169/229 kr - Tequila, Cointreau, Limettensaft",
      },
      price: 169,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 303,
      name: { sv: "Old Fashioned", en: "Old Fashioned", de: "Old Fashioned" },
      description: {
        sv: "159/219 kr - Bourbon whiskey, Angostura bitters, apelsinzest",
        en: "159/219 kr - Bourbon whiskey, Angostura bitters, orange zest",
        de: "159/219 kr - Bourbon Whiskey, Angostura Bitter, Orangenschale",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
      isPopular: true,
    },
    {
      id: 304,
      name: { sv: "Pornstar Martini", en: "Pornstar Martini", de: "Pornstar Martini" },
      description: {
        sv: "179/239 kr - Vaniljvodka, passionslikör, passionsfruktjuice, limejuice + shot mousserande",
        en: "179/239 kr - Vanilla vodka, passion liqueur, passion fruit juice, lime juice + sparkling shot",
        de: "179/239 kr - Vanille-Wodka, Passionslikör, Passionsfruchtsaft, Limettensaft + Sekt-Shot",
      },
      price: 179,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 5,
      isPopular: true,
    },
    {
      id: 305,
      name: { sv: "Long Island Iced Tea", en: "Long Island Iced Tea", de: "Long Island Iced Tea" },
      description: {
        sv: "189 kr - Vodka, gin, ljus rom, tequila, Cointreau, cola",
        en: "189 kr - Vodka, gin, light rum, tequila, Cointreau, cola",
        de: "189 kr - Wodka, Gin, heller Rum, Tequila, Cointreau, Cola",
      },
      price: 189,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
    },
    {
      id: 306,
      name: { sv: "Sunset Breeze", en: "Sunset Breeze", de: "Sunset Breeze" },
      description: {
        sv: "159/219 kr - Vodka, persikolikör, apelsinjuice, tranbärsjuice",
        en: "159/219 kr - Vodka, peach liqueur, orange juice, cranberry juice",
        de: "159/219 kr - Wodka, Pfirsichlikör, Orangensaft, Cranberry-Saft",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
    {
      id: 307,
      name: { sv: "Pink Lady", en: "Pink Lady", de: "Pink Lady" },
      description: {
        sv: "159/219 kr - Rosa gin, sprite, färska bär",
        en: "159/219 kr - Pink gin, sprite, fresh berries",
        de: "159/219 kr - Rosa Gin, Sprite, frische Beeren",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
    {
      id: 308,
      name: { sv: "P2", en: "P2", de: "P2" },
      description: {
        sv: "159/219 kr - Vaniljvodka, Sourz Apple, limejuice, sprite",
        en: "159/219 kr - Vanilla vodka, Sourz Apple, lime juice, sprite",
        de: "159/219 kr - Vanille-Wodka, Sourz Apple, Limettensaft, Sprite",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
    {
      id: 309,
      name: { sv: "Mojito / Hallonmojito", en: "Mojito / Raspberry Mojito", de: "Mojito / Himbeer-Mojito" },
      description: {
        sv: "169/229 kr - Ljus rom, mynta (+hallon), limejuice, sodavatten",
        en: "169/229 kr - Light rum, mint (+raspberry), lime juice, soda water",
        de: "169/229 kr - Heller Rum, Minze (+Himbeere), Limettensaft, Sodawasser",
      },
      price: 169,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
      isPopular: true,
    },
    {
      id: 310,
      name: { sv: "Den goda röda", en: "The Good Red", de: "Der gute Rote" },
      description: {
        sv: "149/209 kr - Sourz Äpple, Sourz Hallon, limejuice, sprite",
        en: "149/209 kr - Sourz Apple, Sourz Raspberry, lime juice, sprite",
        de: "149/209 kr - Sourz Apfel, Sourz Himbeere, Limettensaft, Sprite",
      },
      price: 149,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
    {
      id: 311,
      name: { sv: "Spritz (Aperol / Hugo / Limoncello)", en: "Spritz (Aperol / Hugo / Limoncello)", de: "Spritz (Aperol / Hugo / Limoncello)" },
      description: {
        sv: "169/229 kr - Aperol / fläderlikör / limoncello, prosecco, sodavatten",
        en: "169/229 kr - Aperol / elderflower liqueur / limoncello, prosecco, soda water",
        de: "169/229 kr - Aperol / Holunderlikör / Limoncello, Prosecco, Sodawasser",
      },
      price: 169,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      isPopular: true,
    },
    {
      id: 312,
      name: { sv: "Kaffe Karlsson", en: "Coffee Karlsson", de: "Kaffee Karlsson" },
      description: {
        sv: "159/219 kr - Baileys, Cointreau, kaffe, vispad grädde",
        en: "159/219 kr - Baileys, Cointreau, coffee, whipped cream",
        de: "159/219 kr - Baileys, Cointreau, Kaffee, Schlagsahne",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
      allergens: ["dairy"],
    },
    {
      id: 313,
      name: { sv: "Irish Coffee", en: "Irish Coffee", de: "Irish Coffee" },
      description: {
        sv: "159/219 kr - Irländsk whiskey, farinsocker, kaffe, vispad grädde",
        en: "159/219 kr - Irish whiskey, brown sugar, coffee, whipped cream",
        de: "159/219 kr - Irischer Whiskey, brauner Zucker, Kaffee, Schlagsahne",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 4,
      isPopular: true,
      allergens: ["dairy"],
    },
    {
      id: 314,
      name: { sv: "Baileys Iced Latte", en: "Baileys Iced Latte", de: "Baileys Iced Latte" },
      description: {
        sv: "159/219 kr - Baileys, espresso, mjölk, grädde",
        en: "159/219 kr - Baileys, espresso, milk, cream",
        de: "159/219 kr - Baileys, Espresso, Milch, Sahne",
      },
      price: 159,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
      allergens: ["dairy"],
    },
    {
      id: 315,
      name: { sv: "CB's alkoholfri drink", en: "CB's Alcohol-free Drink", de: "CB's alkoholfreier Drink" },
      description: {
        sv: "129 kr - Alkoholfri specialdrink",
        en: "129 kr - Alcohol-free specialty drink",
        de: "129 kr - Alkoholfreier Spezialdrink",
      },
      price: 129,
      category: "cocktails",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 3,
    },
  ],
  shots: [
    {
      id: 320,
      name: { sv: "Sambuca", en: "Sambuca", de: "Sambuca" },
      description: {
        sv: "Italiensk anislikör",
        en: "Italian anise liqueur",
        de: "Italienischer Anislikör",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 321,
      name: { sv: "Tequila", en: "Tequila", de: "Tequila" },
      description: {
        sv: "Mexikansk tequila",
        en: "Mexican tequila",
        de: "Mexikanischer Tequila",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 322,
      name: { sv: "Fireball", en: "Fireball", de: "Fireball" },
      description: {
        sv: "Kanelwhisky",
        en: "Cinnamon whisky",
        de: "Zimt-Whisky",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 323,
      name: { sv: "Sourz Äpple / Hallon", en: "Sourz Apple / Raspberry", de: "Sourz Apfel / Himbeere" },
      description: {
        sv: "Syrlig fruktlikör",
        en: "Sour fruit liqueur",
        de: "Saurer Fruchtlikör",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 324,
      name: { sv: "Mintu", en: "Mintu", de: "Mintu" },
      description: {
        sv: "Mintlikör",
        en: "Mint liqueur",
        de: "Minzlikör",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 325,
      name: { sv: "Likör 43", en: "Licor 43", de: "Licor 43" },
      description: {
        sv: "Spansk vaniljlikör",
        en: "Spanish vanilla liqueur",
        de: "Spanischer Vanillelikör",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 326,
      name: { sv: "Hot Shot", en: "Hot Shot", de: "Hot Shot" },
      description: {
        sv: "Het kryddshot",
        en: "Hot spiced shot",
        de: "Heißer Gewürz-Shot",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 327,
      name: { sv: "Skåne Akvavit", en: "Skåne Aquavit", de: "Skåne Aquavit" },
      description: {
        sv: "Svensk akvavit",
        en: "Swedish aquavit",
        de: "Schwedischer Aquavit",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 328,
      name: { sv: "O.P. Andersson", en: "O.P. Andersson", de: "O.P. Andersson" },
      description: {
        sv: "Svensk akvavit",
        en: "Swedish aquavit",
        de: "Schwedischer Aquavit",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 329,
      name: { sv: "Hallands Fläder", en: "Hallands Elder", de: "Hallands Holunder" },
      description: {
        sv: "Fläderlikör från Halland",
        en: "Elderflower liqueur from Halland",
        de: "Holunderlikör aus Halland",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 330,
      name: { sv: "Jägermeister", en: "Jägermeister", de: "Jägermeister" },
      description: {
        sv: "Tysk örtkrydda",
        en: "German herbal liqueur",
        de: "Deutscher Kräuterlikör",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 331,
      name: { sv: "Absolut Vodka", en: "Absolut Vodka", de: "Absolut Wodka" },
      description: {
        sv: "Svensk premium vodka",
        en: "Swedish premium vodka",
        de: "Schwedischer Premium-Wodka",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 332,
      name: { sv: "Gotlands Bittar", en: "Gotland Bitters", de: "Gotland Bitter" },
      description: {
        sv: "Gotländsk bitter",
        en: "Gotlandic bitters",
        de: "Gotländischer Bitter",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 333,
      name: { sv: "Gammeldansk", en: "Gammel Dansk", de: "Gammel Dansk" },
      description: {
        sv: "Dansk bitter",
        en: "Danish bitters",
        de: "Dänischer Bitter",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 334,
      name: { sv: "Rakija", en: "Rakija", de: "Rakija" },
      description: {
        sv: "Balkansprit",
        en: "Balkan brandy",
        de: "Balkan-Schnaps",
      },
      price: 0,
      category: "shots",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
  ],
  whisky: [
    {
      id: 340,
      name: { sv: "Grants", en: "Grants", de: "Grants" },
      description: {
        sv: "Skotsk blended whisky",
        en: "Scottish blended whisky",
        de: "Schottischer Blended Whisky",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 341,
      name: { sv: "Jim Beam", en: "Jim Beam", de: "Jim Beam" },
      description: {
        sv: "Amerikansk bourbon whiskey",
        en: "American bourbon whiskey",
        de: "Amerikanischer Bourbon Whiskey",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 342,
      name: { sv: "Maker's Mark", en: "Maker's Mark", de: "Maker's Mark" },
      description: {
        sv: "Premium bourbon whiskey",
        en: "Premium bourbon whiskey",
        de: "Premium Bourbon Whiskey",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 343,
      name: { sv: "The Famous Grouse", en: "The Famous Grouse", de: "The Famous Grouse" },
      description: {
        sv: "Skotsk blended whisky",
        en: "Scottish blended whisky",
        de: "Schottischer Blended Whisky",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 344,
      name: { sv: "Jameson", en: "Jameson", de: "Jameson" },
      description: {
        sv: "Irländsk whiskey",
        en: "Irish whiskey",
        de: "Irischer Whiskey",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 345,
      name: { sv: "Chivas Regal 18y", en: "Chivas Regal 18y", de: "Chivas Regal 18y" },
      description: {
        sv: "18 år gammal skotsk whisky",
        en: "18 year old Scottish whisky",
        de: "18 Jahre alter schottischer Whisky",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 346,
      name: { sv: "Ardbeg 10y", en: "Ardbeg 10y", de: "Ardbeg 10y" },
      description: {
        sv: "10 år gammal Islay single malt",
        en: "10 year old Islay single malt",
        de: "10 Jahre alter Islay Single Malt",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 347,
      name: { sv: "Highland Park 12y", en: "Highland Park 12y", de: "Highland Park 12y" },
      description: {
        sv: "12 år gammal skotsk single malt",
        en: "12 year old Scottish single malt",
        de: "12 Jahre alter schottischer Single Malt",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 348,
      name: { sv: "Lagavulin 16y", en: "Lagavulin 16y", de: "Lagavulin 16y" },
      description: {
        sv: "16 år gammal Islay single malt",
        en: "16 year old Islay single malt",
        de: "16 Jahre alter Islay Single Malt",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 349,
      name: { sv: "Laphroaig 10y", en: "Laphroaig 10y", de: "Laphroaig 10y" },
      description: {
        sv: "10 år gammal Islay single malt",
        en: "10 year old Islay single malt",
        de: "10 Jahre alter Islay Single Malt",
      },
      price: 0,
      category: "whisky",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
  ],
  rum: [
    {
      id: 350,
      name: { sv: "Havana Club Añejo Especial (ljus/mörk)", en: "Havana Club Añejo Especial (light/dark)", de: "Havana Club Añejo Especial (hell/dunkel)" },
      description: {
        sv: "Kubansk rom, ljus eller mörk",
        en: "Cuban rum, light or dark",
        de: "Kubanischer Rum, hell oder dunkel",
      },
      price: 0,
      category: "rum",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 351,
      name: { sv: "Plantation XO", en: "Plantation XO", de: "Plantation XO" },
      description: {
        sv: "Premium rom från Barbados",
        en: "Premium rum from Barbados",
        de: "Premium-Rum aus Barbados",
      },
      price: 0,
      category: "rum",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
    },
    {
      id: 352,
      name: { sv: "Captain Morgan", en: "Captain Morgan", de: "Captain Morgan" },
      description: {
        sv: "Kryddad rom",
        en: "Spiced rum",
        de: "Gewürzter Rum",
      },
      price: 0,
      category: "rum",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
  ],
  cognac: [
    {
      id: 360,
      name: { sv: "Pierre Ferrand", en: "Pierre Ferrand", de: "Pierre Ferrand" },
      description: {
        sv: "Pris per centiliter: 39 kr/cl",
        en: "Price per centiliter: 39 kr/cl",
        de: "Preis pro Zentiliter: 39 kr/cl",
      },
      price: 39,
      category: "cognac",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 361,
      name: { sv: "Hennessy", en: "Hennessy", de: "Hennessy" },
      description: {
        sv: "Pris per centiliter: 42 kr/cl",
        en: "Price per centiliter: 42 kr/cl",
        de: "Preis pro Zentiliter: 42 kr/cl",
      },
      price: 42,
      category: "cognac",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
      isPopular: true,
    },
    {
      id: 362,
      name: { sv: "Martell VS", en: "Martell VS", de: "Martell VS" },
      description: {
        sv: "Pris per centiliter: 26 kr/cl",
        en: "Price per centiliter: 26 kr/cl",
        de: "Preis pro Zentiliter: 26 kr/cl",
      },
      price: 26,
      category: "cognac",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
      preparationTime: 1,
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
  const [isFoodOpen, setIsFoodOpen] = useState(true)
  const [isDrinksOpen, setIsDrinksOpen] = useState(false)

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
              <Link href="/">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
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
                className="px-4 py-2 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg"
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
                  <Link href="/menu" className="block px-4 py-3 text-[#AB8476] bg-white/10 transition-all duration-300 cursor-pointer rounded-lg">
                    Meny
                  </Link>
                  <Link href="/lunch" className="block px-4 py-3 text-white hover:text-[#AB8476] transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/10">
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
                    Boka Bord
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
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
          <div className="space-y-4">
            {/* All Categories Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => setSelectedCategory("all")}
                className={
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-8"
                    : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-8"
                }
              >
                {t.menu.all}
              </Button>
            </div>
            
            {/* Collapsible Food Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <Button
                onClick={() => setIsFoodOpen(!isFoodOpen)}
                className="w-full bg-transparent hover:bg-white/10 text-white p-4 rounded-none border-none justify-between text-lg font-semibold cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="mr-3">🍽️</span>
                  Mat
                </div>
                {isFoodOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
              
              <AnimatePresence>
                {isFoodOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button
                          onClick={() => setSelectedCategory("appetizers")}
                          className={
                            selectedCategory === "appetizers"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <ChefHat className="h-3 w-3 mr-1" />
                          {t.menu.appetizers}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("meat")}
                          className={
                            selectedCategory === "meat"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Beef className="h-3 w-3 mr-1" />
                          {t.menu.meat}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("pasta")}
                          className={
                            selectedCategory === "pasta"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Utensils className="h-3 w-3 mr-1" />
                          {t.menu.pasta}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("fish")}
                          className={
                            selectedCategory === "fish"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Fish className="h-3 w-3 mr-1" />
                          {t.menu.fish}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("burgers")}
                          className={
                            selectedCategory === "burgers"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Sandwich className="h-3 w-3 mr-1" />
                          {t.menu.burgers}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("pizza")}
                          className={
                            selectedCategory === "pizza"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Pizza className="h-3 w-3 mr-1" />
                          {t.menu.pizza}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("salads")}
                          className={
                            selectedCategory === "salads"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Salad className="h-3 w-3 mr-1" />
                          {t.menu.salads}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("kids")}
                          className={
                            selectedCategory === "kids"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Baby className="h-3 w-3 mr-1" />
                          {t.menu.kids}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("sides")}
                          className={
                            selectedCategory === "sides"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Coffee className="h-3 w-3 mr-1" />
                          {t.menu.sides}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("desserts")}
                          className={
                            selectedCategory === "desserts"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Cookie className="h-3 w-3 mr-1" />
                          {t.menu.desserts}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Collapsible Drinks Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <Button
                onClick={() => setIsDrinksOpen(!isDrinksOpen)}
                className="w-full bg-transparent hover:bg-white/10 text-white p-4 rounded-none border-none justify-between text-lg font-semibold cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="mr-3">🍷</span>
                  Drycker
                </div>
                {isDrinksOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
              
              <AnimatePresence>
                {isDrinksOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button
                          onClick={() => setSelectedCategory("whiteWines")}
                          className={
                            selectedCategory === "whiteWines"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Wine className="h-3 w-3 mr-1" />
                          {t.menu.whiteWines}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("redWines")}
                          className={
                            selectedCategory === "redWines"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Wine className="h-3 w-3 mr-1" />
                          {t.menu.redWines}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("rose")}
                          className={
                            selectedCategory === "rose"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Droplets className="h-3 w-3 mr-1" />
                          {t.menu.rose}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("sparkling")}
                          className={
                            selectedCategory === "sparkling"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          {t.menu.sparkling}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("draftBeer")}
                          className={
                            selectedCategory === "draftBeer"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <GlassWater className="h-3 w-3 mr-1" />
                          {t.menu.draftBeer}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("bottledBeer")}
                          className={
                            selectedCategory === "bottledBeer"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <GlassWater className="h-3 w-3 mr-1" />
                          {t.menu.bottledBeer}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("cider")}
                          className={
                            selectedCategory === "cider"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Droplets className="h-3 w-3 mr-1" />
                          {t.menu.cider}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("softDrinks")}
                          className={
                            selectedCategory === "softDrinks"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <GlassWater className="h-3 w-3 mr-1" />
                          {t.menu.softDrinks}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("hotDrinks")}
                          className={
                            selectedCategory === "hotDrinks"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Coffee className="h-3 w-3 mr-1" />
                          {t.menu.hotDrinks}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("cocktails")}
                          className={
                            selectedCategory === "cocktails"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Martini className="h-3 w-3 mr-1" />
                          {t.menu.cocktails}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("shots")}
                          className={
                            selectedCategory === "shots"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          {t.menu.shots}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("whisky")}
                          className={
                            selectedCategory === "whisky"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <GlassWater className="h-3 w-3 mr-1" />
                          {t.menu.whisky}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("rum")}
                          className={
                            selectedCategory === "rum"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Flame className="h-3 w-3 mr-1" />
                          {t.menu.rum}
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("cognac")}
                          className={
                            selectedCategory === "cognac"
                              ? "bg-gradient-to-r from-[#AB8476] to-[#684756] hover:from-[#684756] hover:to-[#3D314A] text-white cursor-pointer rounded-full px-4 text-sm"
                              : "bg-gradient-to-r from-[#AB8476]/20 to-[#684756]/20 border-2 border-[#AB8476] text-white hover:bg-gradient-to-r hover:from-[#AB8476] hover:to-[#684756] cursor-pointer rounded-full px-4 text-sm"
                          }
                        >
                          <Wine className="h-3 w-3 mr-1" />
                          {t.menu.cognac}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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