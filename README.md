# Alamir Oasis

Build a modern, ultra-premium, interactive eCommerce web application for "عصائر الأمير (Alamir Juices)" — a luxury natural juice brand. The app must be 100% frontend-ready with mock data, modular components, clean architecture, Arabic RTL default support (with English switch toggle), and fluid 3D animations/interactions.



### 1. Brand Identity & Visual Aesthetic

- Brand Colors:

  - Primary Base: Warm Caramel / Sandy Ochre (#B58B57 / #9A7444).

  - Contrasts: Carbon Ink Black (#121212) and Crisp White (#FFFFFF / #FAFAFA).

  - Vibrant Fruit Accents: Fresh Mango Orange (#FF781F), Mint Lime (#28A745), and Berry Red (#E63946).

- Typography: Arabic font "Readex Pro" or "Cairo"; English accents in "Poppins" with subtle script accents for headings.

- 3D & Micro-interactions:

  - Integrate Three.js / React Three Fiber / Spline for an interactive 3D floating juice cup with dynamic liquid slosh & ambient fruit slices responding to mouse parallax in the Hero section.

  - Smooth micro-interactions using Framer Motion (hover tilts on product cards, animated splash ripples, fluid transitions).

  - Floating fruit particle effects in the background on scroll.



### 2. Pages & Layout Structure (Frontend)

1. **Header & Navigation:**

   - Sticky glassmorphic navbar featuring the "Alamir Juices" logo, language switcher (AR/EN), search bar, order tracker, wishlist, and slide-over mini-cart drawer.

2. **Hero Section:**

   - Interactive 3D element alongside the brand slogan: "استمتع بالمذاق الطبيعي" (Enjoy the Natural Taste).

   - Dynamic CTA buttons: "Order Now" with fruit splash click animations and "Explore Menu".

3. **Category Explorer:**

   - Animated 3D tilt cards for:

     - Classic Fresh Juices (العصائر الكلاسيكية)

     - Prince Signatures (خلطات وتواقيع الأمير)

     - Fruit Smoothies & Shakes (السموذي والزبادي المخفوق)

     - Detox & Wellness (مشروبات صحية وديتوكس)

     - Family & Party Packs (الأحجام العائلية والحفلات)

4. **Interactive Product Detail & Customizer Modal:**

   - Full drink builder allowing users to choose:

     - Cup size: Small, Medium, Large, 1L Jug (with dynamic 3D/animated cup resizing).

     - Sugar Level: 0%, 25%, 50%, 100%, or Natural Honey.

     - Add-ons: Fresh fruit slices, chia seeds, protein powder, boba, ice cream.

     - Real-time calculated price and nutrition facts (calories, carbs).

5. **Checkout & Location Mock:**

   - One-page responsive checkout with interactive delivery address picker (simulated pin on map), delivery time slot selector (Instant / Scheduled), and payment selection (Apple Pay, Card, Cash).

6. **About Us ("من نحن"):**

   - Interactive storytelling section displaying brand values: 100% Natural, Farm-to-Cup speed, Cold-chain delivery, and hygienic preparation.



### 3. Integrated Admin Dashboard (/admin route)

- Design a high-tech, responsive sidebar dashboard with Light/Dark mode:

  - **Live Analytics:** KPI cards (Daily Revenue, Active Orders, Average Prep Time) + interactive charts (Recharts) for sales trends.

  - **Kanban Order Board:** Real-time visual pipeline with drag-and-drop support (New, Preparing, Picked Up by Courier, Out for Delivery, Completed).

  - **Menu & Recipe Manager:** Dynamic table to add/edit drinks, toggle stock availability ("In Stock" / "Sold Out"), update prices, and edit recipe options.

  - **Branch & Delivery Dispatcher:** Mock map interface displaying imaginary delivery riders and delivery radiuses.



### 4. Technical Architecture

- Tech Stack: React, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Recharts, Zustand or React Context for local state management (cart, active filters, mock orders).

- Code Cleanliness: Highly modular components, mock RESTful API data structures with TypeScript interfaces for seamless backend integration (Supabase, or Node.js).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://alamir-splash.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ef645976-7dfc-4021-9f39-4fa227ebca64).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
