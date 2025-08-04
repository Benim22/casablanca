# Casa Blanca Restaurant Website

En modern och responsiv restaurangwebbplats byggd med Next.js, TypeScript, Tailwind CSS och Supabase.

## ✨ Funktioner

- **🎥 Hero-video bakgrund** - Engagerande videoupplevelse
- **📱 Responsiv design** - Fungerar perfekt på alla enheter
- **🌐 Flerspråksstöd** - Svenska, engelska och tyska
- **🍽️ Interaktiv meny** - Sök, filtrera och lägg till i varukorg
- **📅 Bordsbokningar** - Snygg modal för bordsbokningar
- **🛒 Kundvagn** - Fullständig e-handelsfunktionalitet
- **⭐ Recensioner** - Kundrecensioner och betyg
- **📧 Kontaktformulär** - Kontakta restaurangen direkt
- **🖼️ Bildgalleri** - Visa upp restaurangens atmosfär
- **🔐 Användarhantering** - Säker autentisering med Supabase
- **💾 Fullständig databas** - Komplett schema för alla funktioner

## 🚀 Snabbstart

### Förutsättningar

- Node.js 18+ 
- npm eller pnpm
- Supabase-konto

### Installation

1. **Klona repositoriet**
```bash
git clone <repository-url>
cd casablanca
```

2. **Installera dependencies**
```bash
npm install
# eller
pnpm install
```

3. **Konfigurera miljövariabler**
```bash
cp .env.example .env.local
```

Uppdatera `.env.local` med dina Supabase-uppgifter:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Sätt upp databasen**
   - Logga in på [Supabase Dashboard](https://supabase.com/dashboard)
   - Skapa ett nytt projekt
   - Gå till SQL Editor
   - Kör innehållet från `database-schema.sql`

5. **Starta utvecklingsservern**
```bash
npm run dev
# eller
pnpm dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## 📁 Projektstruktur

```
casablanca/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Globala stilar
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Startsida
│   └── menu/             # Meny-sida
│       └── page.tsx
├── components/           # React-komponenter
│   ├── ui/              # Återanvändbara UI-komponenter
│   └── theme-provider.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Verktyg och konfiguration
├── public/              # Statiska filer
│   ├── casa-blanca-hero.mp4  # Hero-video
│   └── images/          # Bilder
├── database-schema.sql  # Komplett databasschema
└── README.md           # Denna fil
```

## 🗄️ Databasschema

Projektet inkluderar ett komplett SQL-schema för Supabase med följande tabeller:

### Huvudtabeller
- **profiles** - Användarprofiler
- **menu_categories** - Menykategorier (flerspråk)
- **menu_items** - Menyrätter med detaljerad information
- **bookings** - Bordsbokningar
- **restaurant_tables** - Bordskonfiguration
- **orders** - Beställningar (dine-in, takeaway, leverans)
- **order_items** - Enskilda beställningsartiklar
- **cart_items** - Kundvagn
- **reviews** - Kundrecensioner och betyg

### Stödtabeller
- **contact_submissions** - Kontaktformulär
- **newsletter_subscriptions** - Nyhetsbrev
- **gallery_images** - Bildgalleri
- **restaurant_settings** - Inställningar
- **opening_hours** - Öppettider
- **events** - Evenemang och kampanjer
- **staff** - Personalhantering
- **inventory_items** - Lagerhantering

### Funktioner
- **Automatiska triggers** för uppdatering av tidsstämplar
- **Row Level Security (RLS)** för säkerhet
- **Automatisk beräkning** av ordertotaler
- **Ordernummergenerering**
- **Indexering** för optimal prestanda

## 🎨 UI/UX-funktioner

### Animationer
- Framer Motion för smidiga övergångar
- Hover-effekter på interaktiva element
- Scroll-animationer
- Modal-animationer

### Stilar
- Gradient-bakgrunder
- Glassmorfism-effekter
- Anpassade scrollbars
- Responsiv typografi
- Cursor-pointers på alla klickbara element

### Komponenter
- Snygg bokningsmodal med validering
- Interaktiv kundvagn
- Sök- och filterfunktioner
- Språkväljare
- Mobilanpassad navigation

## 🌐 Flerspråksstöd

Webbplatsen stöder tre språk:
- **Svenska (sv)** - Standardspråk
- **Engelska (en)**
- **Tyska (de)**

Alla texter och databasinnehåll har flerspråksstöd.

## 📱 Responsiv Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexibel layout** som anpassar sig till alla skärmstorlekar
- **Touch-vänlig** navigation och interaktion

## 🔐 Säkerhet

- **Supabase Authentication** för säker inloggning
- **Row Level Security (RLS)** på känslig data
- **Input-validering** på alla formulär
- **CSRF-skydd** genom Supabase
- **Secure headers** via Next.js

## 🚀 Deployment

### Vercel (Rekommenderat)

1. Pusha koden till GitHub
2. Anslut repositoriet till Vercel
3. Lägg till miljövariabler i Vercel Dashboard
4. Deploy automatiskt

### Andra plattformar

```bash
npm run build
npm start
```

## 🛠️ Utveckling

### Tillgängliga kommandon

```bash
npm run dev      # Starta utvecklingsserver
npm run build    # Bygg för produktion
npm run start    # Starta produktionsserver
npm run lint     # Kör ESLint
```

### Kodstil
- **TypeScript** för typsäkerhet
- **ESLint** för kodkvalitet
- **Prettier** för kodformatering (rekommenderat)

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## 🤝 Bidrag

1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/amazing-feature`)
3. Commit dina ändringar (`git commit -m 'Add amazing feature'`)
4. Push till branchen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

## 📄 Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE) filen för detaljer.

## 📞 Support

För support, kontakta:
- **Email**: info@casablanca-trelleborg.se
- **Telefon**: +46 410 123 456
- **Adress**: Corfitz-Beck-Friisgatan 11, Trelleborg

## 🙏 Tack

- [Next.js](https://nextjs.org/) för det fantastiska ramverket
- [Supabase](https://supabase.com/) för backend-as-a-service
- [Tailwind CSS](https://tailwindcss.com/) för utility-first CSS
- [Radix UI](https://www.radix-ui.com/) för tillgängliga komponenter
- [Framer Motion](https://www.framer.com/motion/) för animationer

---

**Casa Blanca Restaurant** - Upplev fantastisk mat, mysig atmosfär och vänlig service! 🍝🍕✨ 