# Week 6 Capstone: SSR E-Commerce Site — MAISON

A full-stack Next.js 14 e-commerce application demonstrating Server-Side Rendering (SSR), SEO, Cart management, and Checkout flow.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Rendering**: SSR + SSG hybrid

---

cd ecommerce

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
  layout.tsx              # Root layout (SSR: metadata, CartProvider)
  page.tsx                # Home page (SSR: category filter via searchParams)
  globals.css
  product/[id]/
    page.tsx              # Product detail (SSG + dynamic metadata)
  cart/
    page.tsx              # Cart wrapper (SSR metadata)
    CartPageClient.tsx    # Cart UI (Client Component)
  checkout/
    page.tsx              # Checkout wrapper
    CheckoutClient.tsx    # Multi-step checkout form (Client Component)
  order-confirmation/
    page.tsx              # Confirmation (SSR: fresh order number)
  api/
    products/route.ts     # GET /api/products?category=X&limit=N
    products/[id]/route.ts # GET /api/products/:id

components/
  Navbar.tsx              # Client: sticky nav, cart count
  Footer.tsx              # Server component
  ProductCard.tsx         # Client: add-to-cart
  AddToCartButton.tsx     # Client: animated add button

lib/
  products.ts             # Product data + helpers
  cart.ts                 # Cart types + pure helpers
  CartContext.tsx         # Client: React Context + localStorage
```

---

## Rendering Strategies

| Page | Strategy | Why |
|------|----------|-----|
| `/` | **SSR** | Category filter from URL searchParams |
| `/product/[id]` | **SSG** (generateStaticParams) | Pre-built at compile time, fast |
| `/cart` | **Client** | localStorage, interactive |
| `/checkout` | **Client** | Form state, user interaction |
| `/order-confirmation` | **SSR** | Fresh order number each request |
| `/api/products` | **API Route** | JSON data endpoint |

---

## Hydration Error Fix — KEY LESSON

**Problem**: Server renders HTML with cart count = 0. Client loads localStorage and sees count = 3. React detects mismatch → Hydration error.

**Solution**: `mounted` state pattern in Navbar + CartContext.

```tsx
// ❌ WRONG — Causes hydration mismatch
function Navbar() {
  const { count } = useCart();
  return <span>{count}</span>; // Server: 0, Client: localStorage value → ERROR
}

// ✅ CORRECT — Only render dynamic content after client mount
function Navbar() {
  const { count } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && count > 0 ? <span>{count}</span> : null;
}
```

**Why this works**: `useEffect` only runs on the client. By waiting for `mounted = true`, we guarantee the server and client render the same initial HTML (no badge), then the client updates after hydration is complete.

---

## SEO Implementation

1. **Static metadata** in `layout.tsx` (site-wide)
2. **Dynamic metadata** with `generateMetadata()` in product pages:
   ```ts
   export async function generateMetadata({ params }) {
     const product = getProductById(params.id);
     return {
       title: product.name,
       description: product.description,
       openGraph: { images: [product.image] }
     };
   }
   ```
3. **Server-rendered HTML** — search engines receive full product content
4. **Semantic HTML** — `<header>`, `<main>`, `<nav>`, `<footer>`
5. **Image alt text** on all `<Image>` components

---

## API Routes

```bash
# All products
GET /api/products

# Filter by category, limit results
GET /api/products?category=Home&limit=4

# Single product
GET /api/products/1
```

---

## Cart Architecture

```
CartContext (Client, 'use client')
    │
    ├── useReducer (ADD | REMOVE | UPDATE | CLEAR | LOAD)
    ├── useEffect (load from localStorage on mount)
    ├── useEffect (save to localStorage on change)
    └── mounted flag (prevents hydration mismatch)
```

---

## Common Next.js Pitfalls Addressed

| Problem | Fix in this project |
|---------|---------------------|
| Hydration mismatch (localStorage vs SSR) | `mounted` state + useEffect |
| `useCart` in Server Component | All cart UI is Client Components |
| Missing `'use client'` directive | Added to all interactive components |
| Image optimization | `next/image` with `sizes` prop |
| SEO for dynamic pages | `generateMetadata` per product |
