import { useMemo, useState, useEffect } from "react";

const products = [
  {
    id: 1,
    title: "AeroFit Running Shoes",
    category: "Fashion",
    price: 89,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    tag: "Best Seller",
  },
  {
    id: 2,
    title: "Nordic Ceramic Mug Set",
    category: "Home",
    price: 42,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=80",
    tag: "New Arrival",
  },
  {
    id: 3,
    title: "Pulse Pro Smartwatch",
    category: "Electronics",
    price: 219,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80",
    tag: "Trending",
  },
  {
    id: 4,
    title: "Bamboo Desk Organizer",
    category: "Office",
    price: 31,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    tag: "Eco Pick",
  },
  {
    id: 5,
    title: "Linen Lounge Chair",
    category: "Home",
    price: 148,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=900&q=80",
    tag: "Limited Stock",
  },
  {
    id: 6,
    title: "Wireless Earbuds Max",
    category: "Electronics",
    price: 129,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=900&q=80",
    tag: "Top Rated",
  },
  {
    id: 7,
    title: "Everyday Tote Bag",
    category: "Fashion",
    price: 55,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    tag: "Editor Pick",
  },
  {
    id: 8,
    title: "ErgoLift Laptop Stand",
    category: "Office",
    price: 63,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80",
    tag: "Hot Deal",
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState({});
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('Install prompt detected!');
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed');
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      const result = await installPrompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
      setInstallPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    []
  );

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || product.category === activeCategory;
      const searchMatch = product.title
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchText]);

  const { cartCount, subtotal } = useMemo(() => {
    const lineItems = Object.values(cart);
    return lineItems.reduce(
      (accumulator, lineItem) => {
        accumulator.cartCount += lineItem.qty;
        accumulator.subtotal += lineItem.qty * lineItem.product.price;
        return accumulator;
      },
      { cartCount: 0, subtotal: 0 }
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const currentLine = current[product.id];
      return {
        ...current,
        [product.id]: {
          product,
          qty: currentLine ? currentLine.qty + 1 : 1,
        },
      };
    });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">SW</span>
          <div className="brand-copy">
            <strong>ShopWave</strong>
            <small>Everyday finds, elevated</small>
          </div>
        </div>

        <label className="search-wrap">
          <span>Search</span>
          <input
            type="search"
            placeholder="Find products..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>

        <button className="cart-pill" type="button" aria-label="Shopping cart">
          <span>{cartCount} items</span>
          <strong>{money.format(subtotal)}</strong>
        </button>

        {isInstallable && (
          <button 
            className="install-btn" 
            type="button" 
            onClick={handleInstallClick}
            aria-label="Install app"
          >
            Install App
          </button>
        )}

        {/* Debug button - remove this later */}
        <button 
          style={{background: 'red', color: 'white', padding: '5px 10px', fontSize: '12px'}}
          onClick={() => console.log('Installable:', isInstallable, 'Prompt:', !!installPrompt)}
        >
          Debug
        </button>
      </header>

      <main className="main-content">
        <section className="hero">
          <div>
            <p className="eyebrow">SPRING COLLECTION</p>
            <h1>Discover modern essentials for your style and home.</h1>
            <p className="hero-copy">
              Curated picks from trusted brands. Fast checkout, secure payments,
              and now installable as a mobile app.
            </p>
            <div className="hero-actions">
              <button type="button">Shop Featured</button>
              <span>Free shipping over $60</span>
            </div>
          </div>
          <div className="hero-panel">
            <p>Today only</p>
            <strong>25% OFF</strong>
            <small>on selected accessories</small>
          </div>
        </section>

        <section className="filter-row" aria-label="Categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? "chip active" : "chip"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="product-grid" aria-live="polite">
          {visibleProducts.length === 0 ? (
            <p className="empty-state">
              No products found for this search. Try another keyword.
            </p>
          ) : (
            visibleProducts.map((product, index) => (
              <article
                key={product.id}
                className="product-card"
                style={{ "--index": index }}
              >
                <div className="image-wrap">
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <span>{product.tag}</span>
                </div>
                <div className="card-body">
                  <p className="category">{product.category}</p>
                  <h2>{product.title}</h2>
                  <div className="card-footer">
                    <div>
                      <strong>{money.format(product.price)}</strong>
                      <small>{product.rating} rating</small>
                    </div>
                    <button type="button" onClick={() => addToCart(product)}>
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
