# 🌱 HGreenQ – Premium Plant Nursery

A production-ready React + Vite plant nursery e-commerce website.

## Project Structure

```
HGreenQ/
├── index.html                    # Vite entry point (root level)
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx                  # React entry, wraps with AppProvider
    ├── App.jsx                   # Router + layout shell
    ├── index.css                 # Full design system & all styles
    ├── context/
    │   └── AppContext.jsx        # Global state: cart, wishlist, orders, user, navigation
    ├── data/
    │   └── constants.js          # Products, categories, hero slides, testimonials
    ├── hooks/
    │   └── useScroll.js          # useScrolled, useScrollTop
    ├── utils/
    │   └── toast.jsx             # Toast notification system
    ├── components/
    │   ├── Navbar.jsx            # Sticky nav + mobile drawer + announcement bar
    │   ├── HeroSlider.jsx        # Auto-playing hero carousel with offers
    │   ├── ProductCard.jsx       # Reusable product card with wishlist & add to cart
    │   ├── CartDrawer.jsx        # Slide-in cart drawer with order placement
    │   ├── ProfileDrawer.jsx     # Slide-in profile dashboard
    │   └── Footer.jsx            # Full site footer
    └── pages/
        ├── Home.jsx              # Landing: hero, categories, products, testimonials
        ├── Shop.jsx              # Full shop with filter sidebar, search & sort
        ├── ProductDetail.jsx     # Full product page with qty, actions, related
        ├── Cart.jsx              # Full cart page with coupon & order summary
        ├── Wishlist.jsx          # Saved plants grid
        ├── Orders.jsx            # Order history with tracking progress bar
        ├── About.jsx             # About page with team & values
        └── Contact.jsx           # Contact form + delivery cities
```

## Features

- 🎠 **Hero Slider** — 3 slides with offers, auto-play, arrows & dots
- 🛒 **Cart** — Drawer + full page, qty control, coupon (HGREEN10), free delivery threshold
- ❤️ **Wishlist** — Toggle from any product card or detail page
- 📦 **Orders** — History with visual tracking progress bar
- 👤 **Profile Dashboard** — Slide-in drawer with stats, orders, menu
- 📱 **Mobile Nav** — Slide-in drawer with profile strip and all links
- 🔍 **Shop Filters** — Category sidebar, price range, search, sort
- 🌿 **12 Products** across 7 categories with full details
- 🎯 **Toast Notifications** — Non-blocking feedback for all actions
- ✅ **Zero external dependencies** — pure React + Vite

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Try the Coupon Code
Use **HGREEN10** in the Cart page for 10% off!
