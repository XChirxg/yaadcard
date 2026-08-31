// store.js - Premium E-Commerce Storefront Engine (boAt/Apple Inspired)

// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyC4cR2mvd_HviadFoVrOa5a2Iq_gpd_qs0",
  authDomain: "yaadcard.firebaseapp.com",
  projectId: "yaadcard",
  storageBucket: "yaadcard.firebasestorage.app",
  messagingSenderId: "554394840786",
  appId: "1:554394840786:web:2cd42d8d7b6b1b751a870b"
};

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
} else {
  console.warn("Firebase SDK not loaded. Store is running in offline local-only fallback mode.");
}

// Default seed catalog list (MRP=250, Cards=30)
const DEFAULT_PRODUCTS = [
  {
    id: "47_laws_of_powers",
    name: "47 Laws of Powers",
    category: "SelfHelp Books",
    theme: "gold",
    image: "product-images/47_laws_of_powers.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "BESTSELLER",
    description: "Master the rules of influence, strategy, and power based on historical insights. Curated into actionable prompts."
  },
  {
    id: "biology",
    name: "Biology",
    category: "Academics",
    theme: "emerald",
    image: "product-images/biology.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "HIGH YIELD",
    description: "High-yield visual flashcards for cellular biology, genetics, human anatomy, and physiological processes."
  },
  {
    id: "business_finance",
    name: "Business Finance",
    category: "Academics",
    theme: "cyan",
    image: "product-images/business_finance.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "ESSENTIAL",
    description: "Core corporate finance formulas, balance sheet terms, ratios, valuation, and capital structure principles."
  },
  {
    id: "economics",
    name: "Economics",
    category: "Academics",
    theme: "orange",
    image: "product-images/economics.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "CORE",
    description: "Visual summaries of microeconomics, macroeconomics, supply/demand shifts, and fiscal/monetary policies."
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    category: "Academics",
    theme: "purple",
    image: "product-images/pharmacology.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "POPULAR",
    description: "Quick revision for drug classifications, mechanisms of action, major side effects, and clinical indications."
  },
  {
    id: "philosophy",
    name: "Philosophy",
    category: "SelfHelp Books",
    theme: "gold",
    image: "product-images/philosophy.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "DEEP DIVE",
    description: "A summary of Stoicism, Existentialism, Rationalism, and major logical reasoning rules for everyday life."
  },
  {
    id: "physics_formulas",
    name: "Physics Formulas",
    category: "Academics",
    theme: "cyan",
    image: "product-images/physics_formulas.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "REVISION",
    description: "Fundamental formulas, constants, SI units, equations of motion, electrodynamics, and quantum mechanics."
  },
  {
    id: "indian_polity",
    name: "Indian Polity",
    category: "Exams",
    theme: "orange",
    image: "product-images/indian_polity.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "EXAM SPECIFIC",
    description: "Complete guide to the Indian Constitution, articles, amendments, fundamental rights, and governance structures."
  },
  {
    id: "psychology",
    name: "Psychology",
    category: "SelfHelp Books",
    theme: "purple",
    image: "product-images/psychology.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "INSIGHTFUL",
    description: "Explore core psychological experiments, human behavioral concepts, and cognitive biases."
  },
  {
    id: "statistics",
    name: "Statistics",
    category: "Academics",
    theme: "emerald",
    image: "product-images/statistics.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "ANALYTICS",
    description: "Probability distributions, central limit theorem, hypothesis tests, Z/T/Chi-Square tables, and regressions."
  },
  {
    id: "himachal_collections",
    name: "Himachal Collections",
    category: "Exams",
    theme: "gold",
    image: "product-images/himachal_collections.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "GK SPECIAL",
    description: "Curated general knowledge deck covering the history, geography, economy, and culture of Himachal Pradesh."
  },
  {
    id: "truth_and_dare",
    name: "Truth & Dare Party Pack",
    category: "Games",
    theme: "purple",
    image: "product-images/truth_and_dare.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "COMING SOON",
    isComingSoon: true,
    description: "The ultimate deck for ice-breakers, house parties, and family gatherings. Featuring clean and daring prompt modes."
  },
  {
    id: "wanderlust_phrasebook",
    name: "Wanderlust Travel Deck",
    category: "Journey",
    theme: "emerald",
    image: "product-images/wanderlust_phrasebook.jpg",
    cardsCount: 30,
    price: 200,
    originalPrice: 250,
    badge: "COMING SOON",
    isComingSoon: true,
    description: "Essential travel phrasecards, packing checklists, emergency translations, and navigation guides."
  },
  {
    id: "custom_deck",
    name: "Custom YaadCard Deck",
    category: "Other",
    theme: "cyan",
    image: "product-images/custom_flashcards.jpg",
    cardsCount: "Custom",
    price: 250, // Updated custom deck pricing (standard + 50)
    originalPrice: 250,
    badge: "CUSTOM DESIGN",
    description: "Submit your own notes, syllabus, or topics! We'll format, design, and print a custom flashcard deck just for you."
  }
];

// Global catalog state loaded from Firestore
let PRODUCTS = [];

// Shopping Cart State
let CART = [];

// Filter States
let searchQuery = "";
let searchLogTimeout = null;
let lastLoggedSearch = "";

// Pagination State
let currentPage = 1;
const itemsPerPage = 10;

// Slideshow Global Index Tracker
let currentSlideIndex = 0;

// DOM Links
const storeProductGrid = document.getElementById("store-product-grid");
const navSearch = document.getElementById("nav-search");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartBadge = document.getElementById("cart-badge");
const cartItemsWrapper = document.getElementById("cart-items-wrapper");
const btnCheckoutTrigger = document.getElementById("btn-checkout-trigger");

// Cart calculation fields
const cartSubtotal = document.getElementById("cart-subtotal");
const cartSavings = document.getElementById("cart-savings");
const cartTotal = document.getElementById("cart-total");
const cartShipping = document.getElementById("cart-shipping");
const cartBundleTip = document.getElementById("cart-bundle-tip");

// Checkout Form fields
const drawerViewCart = document.getElementById("drawer-view-cart");
const drawerViewCheckout = document.getElementById("drawer-view-checkout");
const drawerViewSuccess = document.getElementById("drawer-view-success");
const checkoutDetailsForm = document.getElementById("checkout-details-form");
const customCheckoutDetails = document.getElementById("custom-checkout-details");
const customDeckSpecs = document.getElementById("custom-deck-specs");

// Section panels for navigation
const storeHero = document.getElementById("store-hero");
const storeValueProps = document.getElementById("store-value-props");
const storeMainCatalog = document.getElementById("store-main-catalog");
const productDetailView = document.getElementById("product-detail-view");

// Load products from Firestore, seed if empty
function loadProductsFromFirestore() {
  if (window.db) {
    return window.db.collection("products").get().then((snapshot) => {
      if (snapshot.empty) {
        console.log("Products catalog is empty in Firestore. Seeding default products...");
        const batch = window.db.batch();
        DEFAULT_PRODUCTS.forEach(p => {
          const docRef = window.db.collection("products").doc(p.id);
          batch.set(docRef, p);
        });
        return batch.commit().then(() => {
          console.log("Seeding complete.");
          PRODUCTS = DEFAULT_PRODUCTS;
          return PRODUCTS;
        });
      } else {
        PRODUCTS = [];
        snapshot.forEach(doc => {
          PRODUCTS.push(doc.data());
        });
        return PRODUCTS;
      }
    }).catch(error => {
      console.error("Error loading products from Firestore: ", error);
      PRODUCTS = DEFAULT_PRODUCTS; // Offline fallback
      return PRODUCTS;
    });
  } else {
    PRODUCTS = DEFAULT_PRODUCTS;
    return Promise.resolve(PRODUCTS);
  }
}

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  setupListeners();
  loadCartFromStorage();
  updateCartUI();

  // Load Firestore catalog
  loadProductsFromFirestore().then(() => {
    renderFeaturedDecks();
    renderCatalog();
    setupSearchDropdowns();
  });
});

// Setup click and search events
function setupListeners() {
  // Search input typing filter
  if (navSearch) {
    navSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      currentPage = 1; // Reset to page 1 on search
      renderCatalog();
      debounceSearchLog(searchQuery);
    });

    navSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        logSearch(searchQuery);
      }
    });
  }
}

// Helper to create product card DOM
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  
  card.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;
    openProductDetail(product.id);
  });

  card.innerHTML = `
    <div class="card-image-box">
      ${product.badge ? `<span class="card-badge ${product.isComingSoon ? 'soon' : (product.id === 'custom_deck' ? 'custom' : '')}">${product.badge}</span>` : ""}
      <span class="card-badge-category">${product.category || 'Deck'}</span>
      <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this, '${product.name}', '${product.theme}')">
    </div>
    <div class="card-details">
      <h3 class="card-product-title">${product.name}</h3>
      <p class="card-product-desc">${product.description}</p>
      
      <div class="card-product-meta">
        <div class="meta-spec">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          <span>${product.cardsCount} cards</span>
        </div>
        <div>Case Pack</div>
      </div>

      <div class="card-product-pricing">
        <span class="price-regular">₹${product.originalPrice}</span>
        <span class="price-sale">₹${product.price}</span>
      </div>

      ${product.isComingSoon ? 
        `<button class="btn-primary-store" disabled>Coming Soon</button>` : 
        `<button class="btn-primary-store" onclick="event.stopPropagation(); addItemToCart('${product.id}')">Add to Cart</button>`
      }
    </div>
  `;
  return card;
}

// Render the Featured Decks section
function renderFeaturedDecks() {
  const featuredGrid = document.getElementById("featured-product-grid");
  const featuredSection = document.getElementById("featured-decks-section");
  if (!featuredGrid || !featuredSection) return;

  const featuredProducts = PRODUCTS.filter(p => p.featured === true).slice(0, 4);

  if (featuredProducts.length === 0) {
    featuredSection.style.display = "none";
    return;
  }

  featuredSection.style.display = "block";
  featuredGrid.innerHTML = "";

  featuredProducts.forEach(product => {
    featuredGrid.appendChild(createProductCard(product));
  });
}

// Render the product cards grid with pagination
function renderCatalog() {
  if (!storeProductGrid) return;
  storeProductGrid.innerHTML = "";

  const filtered = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                          (product.category && product.category.toLowerCase().includes(searchQuery)) ||
                          product.description.toLowerCase().includes(searchQuery);
    return matchesSearch;
  });

  if (filtered.length === 0) {
    storeProductGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.3;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <div>
          <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-main);">No decks found matching "${searchQuery}"</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">We couldn't find a standard deck for this topic.</p>
        </div>
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 24px; border-radius: 12px; max-width: 460px; width: 100%; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
          <h4 style="color: var(--text-main); font-size: 0.95rem; font-weight: 700; margin-bottom: 6px;">💡 Order a Custom YaadCard Deck!</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 12px;">Describe your topic or syllabus. We'll design, format, and print a custom deck specifically for you for just **₹250** (only ₹50 extra!).</p>
          <button class="btn-primary-store" onclick="openCustomRequestWithSearch('${searchQuery.replace(/'/g, "\\'")}')" style="width: 100%; background: linear-gradient(135deg, #06b6d4, #0891b2); color: white;">
            Order Custom "${searchQuery}" Deck
          </button>
        </div>
      </div>
    `;
    renderPaginationControls(0);
    return;
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageItems = filtered.slice(startIndex, endIndex);

  pageItems.forEach(product => {
    storeProductGrid.appendChild(createProductCard(product));
  });

  renderPaginationControls(totalItems);
}

// Render pagination buttons
function renderPaginationControls(totalItems) {
  const controls = document.getElementById("pagination-controls");
  if (!controls) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) {
    controls.innerHTML = "";
    return;
  }

  controls.innerHTML = `
    <button class="btn-pagination" id="btn-prev-page" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      <span>Previous</span>
    </button>
    <span class="page-indicator">Page ${currentPage} of ${totalPages}</span>
    <button class="btn-pagination" id="btn-next-page" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">
      <span>Next</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `;
}

window.changePage = function(delta) {
  currentPage += delta;
  renderCatalog();
  document.getElementById("store-main-catalog").scrollIntoView({ behavior: "smooth" });
};

window.openCustomRequestWithSearch = function(query) {
  const customSpecs = document.getElementById("desktop-custom-specs");
  const modalSpecs = document.getElementById("custom-deck-specs");
  
  if (customSpecs) customSpecs.value = `Custom deck requirements: ${query}`;
  if (modalSpecs) modalSpecs.value = `Custom deck requirements: ${query}`;
  
  addItemToCart("custom_deck");
  switchToCheckoutView();
};

// Fallback for catalog images
window.handleImageError = function(imgElement, productName, themeColor) {
  const container = imgElement.parentElement;
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; color: var(--text-muted); height: 100%; width: 100%; position: relative;">
      <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.01), rgba(0,0,0,0.5)); pointer-events: none;"></div>
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--${themeColor}-primary, #ef4444)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px; opacity: 0.6;">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="m14.5 9.5-5 5"/>
        <path d="m9.5 9.5 5 5"/>
      </svg>
      <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; color: var(--text-main); position: relative; z-index: 2; line-height: 1.2;">
        ${productName}
      </div>
      <div style="font-size: 0.65rem; color: var(--text-muted); position: relative; z-index: 2; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">
        yaadcard collection
      </div>
    </div>
  `;
};

// Render product detail screen DOM
function showProductDetailUI(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Hide list blocks
  if (storeHero) storeHero.style.display = "none";
  if (storeValueProps) storeValueProps.style.display = "none";
  if (storeMainCatalog) storeMainCatalog.style.display = "none";
  
  const videoSection = document.getElementById("store-videos");
  if (videoSection) videoSection.style.display = "none";
  
  const featuredSection = document.getElementById("featured-decks-section");
  if (featuredSection) featuredSection.style.display = "none";

  productDetailView.innerHTML = "";
  productDetailView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  const productTitle = product.name;
  const themeColor = product.theme;

  // Find related products (excluding current one, and not coming soon)
  const relatedProducts = PRODUCTS.filter(p => p.id !== productId && !p.isComingSoon).slice(0, 4);
  let relatedHtml = "";
  if (relatedProducts.length > 0) {
    relatedHtml = `
      <div style="margin-top: 64px; border-top: 1px solid var(--border-color); padding-top: 48px;">
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: var(--text-main); margin-bottom: 24px; text-align: left;">You May Also Like</h3>
        <div class="product-grid" id="related-product-grid"></div>
      </div>
    `;
  }

  productDetailView.innerHTML = `
    <button class="btn-back-catalog" onclick="closeProductDetail()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>Back to shop</span>
    </button>
    
    <div class="product-details-container">
      <div>
        <div class="product-image-detail-wrapper" style="width: 100%; border-radius: 12px; overflow: hidden; background: #0b0f19; border: 1px solid var(--border-color); aspect-ratio: 5 / 6; display: flex; align-items: center; justify-content: center;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleDetailImageFallback(this, '${product.name}', '${product.theme}')">
        </div>
      </div>
      
      <div class="details-info-box">
        <span class="details-category">${product.category}</span>
        <h2 class="details-title">${product.name}</h2>
        
        <div class="details-price-row">
          <span class="details-price-mrp">MRP ₹${product.originalPrice}</span>
          <span class="details-price-sale">₹${product.price}</span>
        </div>
        
        <div class="details-desc">${product.description}</div>
        
        <table class="details-specs-table">
          <tr class="details-spec-row">
            <span>Total Cards</span>
            <span>${product.cardsCount} cards</span>
          </tr>
          <tr class="details-spec-row">
            <span>Card Size</span>
            <span>Poker Deck (2.5" x 3.5")</span>
          </tr>
          <tr class="details-spec-row">
            <span>Packaging</span>
            <span>Durable printed tuck-box case</span>
          </tr>
        </table>
        
        <div style="margin-top: 10px;">
          ${product.isComingSoon ? 
            `<button class="btn-primary-store" style="padding: 14px; font-size: 0.95rem;" disabled>Coming Soon</button>` : 
            `<button class="btn-primary-store" onclick="addItemToCart('${product.id}')" style="padding: 14px; font-size: 0.95rem;">Add to Cart</button>`
          }
        </div>
      </div>
    </div>
    
    ${relatedHtml}
  `;

  // Render related products cards into grid slot
  const relatedGrid = document.getElementById("related-product-grid");
  if (relatedGrid) {
    relatedProducts.forEach(rp => {
      relatedGrid.appendChild(createProductCard(rp));
    });
  }
}

// Show Catalog UI
function showCatalogUI() {
  if (productDetailView) productDetailView.style.display = "none";
  
  if (storeHero) storeHero.style.display = "block";
  if (storeValueProps) storeValueProps.style.display = "block";
  if (storeMainCatalog) storeMainCatalog.style.display = "block";
  
  const videoSection = document.getElementById("store-videos");
  if (videoSection) videoSection.style.display = "block";
  
  renderFeaturedDecks();
  renderCatalog();
}

// Open Product Detail Screen (SPA Navigation with history state push)
window.openProductDetail = function(productId) {
  // Push state to browser history stack to prevent hard back closes
  history.pushState({ view: "product", productId: productId }, "", "#product-" + productId);
  showProductDetailUI(productId);
};

// Return from detail view to main gallery catalog
window.closeProductDetail = function() {
  if (location.hash.startsWith("#product-")) {
    history.back(); // Triggers popstate listener, which calls showCatalogUI
  } else {
    showCatalogUI();
  }
};

// Intercept popstate transitions (hardware back / browser back buttons)
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.view === "product") {
    showProductDetailUI(event.state.productId);
  } else {
    showCatalogUI();
  }
});

// Custom detail image fallback logic
window.handleDetailImageFallback = function(imgElement, productName, themeColor) {
  imgElement.style.display = 'none';
  const parent = imgElement.parentElement;
  parent.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; color: var(--text-muted); height: 100%; width: 100%; background-color:#090d16;">
      <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.01), rgba(0,0,0,0.6)); pointer-events: none;"></div>
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--${themeColor}-primary, #ef4444)" stroke-width="1.2" style="margin-bottom: 12px; opacity: 0.65;">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="m14.5 9.5-5 5"/>
        <path d="m9.5 9.5 5 5"/>
      </svg>
      <div style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-main); position: relative; z-index: 2;">
        ${productName}
      </div>
      <div style="font-size: 0.7rem; color: var(--text-muted); position: relative; z-index: 2; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">
        Tuck Case Cover
      </div>
    </div>
  `;
};

// Open/Close Cart Drawer
window.toggleCart = function() {
  cartOverlay.classList.toggle("active");
  if (cartOverlay.classList.contains("active")) {
    switchToCartView();
  }
};

window.closeCart = function() {
  cartOverlay.classList.remove("active");
};

// Switch screens inside the drawer
window.switchToCartView = function() {
  drawerViewCart.style.display = "flex";
  drawerViewCheckout.classList.remove("active");
  drawerViewSuccess.classList.remove("active");
};

window.switchToCheckoutView = function() {
  drawerViewCart.style.display = "none";
  drawerViewCheckout.classList.add("active");
  drawerViewSuccess.classList.remove("active");

  const totals = calculateCartTotals();
  document.getElementById("checkout-total-qty").textContent = `${totals.qty} deck${totals.qty === 1 ? '' : 's'}`;
  document.getElementById("checkout-total-price").textContent = `₹${totals.total}`;

  const hasCustom = CART.some(item => item.product.id === "custom_deck");
  if (hasCustom) {
    customCheckoutDetails.style.display = "flex";
    customDeckSpecs.setAttribute("required", "true");
  } else {
    customCheckoutDetails.style.display = "none";
    customDeckSpecs.removeAttribute("required");
  }
};

// E-commerce Cart Operations
window.addItemToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = CART.find(item => item.product.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    CART.push({
      product: product,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  
  cartOverlay.classList.add("active");
  switchToCartView();
};

window.removeCartItem = function(productId) {
  CART = CART.filter(item => item.product.id !== productId);
  saveCartToStorage();
  updateCartUI();
};

window.adjustCartQty = function(productId, delta) {
  const item = CART.find(item => item.product.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeCartItem(productId);
  } else {
    saveCartToStorage();
    updateCartUI();
  }
};

// Calculate pricing logic: standard cards 200, custom cards 250, Buy 5 Get 1 Free
function calculateCartTotals() {
  let qty = CART.reduce((sum, item) => sum + item.qty, 0);
  
  // Buy 5 Get 1 Free: For every 6 decks in cart, 1 deck is free (saving 200)
  const freeDecks = Math.floor(qty / 6);
  
  let subtotal = 0;
  CART.forEach(item => {
    subtotal += item.product.price * item.qty;
  });

  const savings = freeDecks * 200;
  const total = Math.max(0, subtotal - savings);
  const shipping = 0;

  return { qty, subtotal, savings, shipping, total };
}

// Update DOM elements in cart drawer
function updateCartUI() {
  const totals = calculateCartTotals();
  cartBadge.textContent = totals.qty;

  if (CART.length === 0) {
    cartItemsWrapper.innerHTML = `
      <div class="cart-empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p style="font-weight: 600; font-size: 1.05rem;">Your Cart is Empty</p>
        <p style="font-size: 0.8rem; margin-top: 6px;">Add some premium decks to get started!</p>
      </div>
    `;
    btnCheckoutTrigger.disabled = true;
    cartBundleTip.style.display = "none";
    
    cartSubtotal.textContent = "₹0";
    cartSavings.textContent = "-₹0";
    if (cartShipping) cartShipping.textContent = "₹0";
    cartTotal.textContent = "₹0";
    return;
  }

  btnCheckoutTrigger.disabled = false;
  cartItemsWrapper.innerHTML = "";

  CART.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}" onerror="handleCartImageError(this, '${item.product.theme}')">
      </div>
      <div class="cart-item-details">
        <div>
          <div class="cart-item-title">${item.product.name}</div>
          <span class="cart-item-category">${item.product.category || 'Deck'}</span>
        </div>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button class="qty-btn" onclick="adjustCartQty('${item.product.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="adjustCartQty('${item.product.id}', 1)">+</button>
          </div>
          <span class="cart-item-price">₹${item.product.price * item.qty}</span>
        </div>
        <button class="btn-remove-item" onclick="removeCartItem('${item.product.id}')" style="position: absolute; top: 12px; right: 12px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
    cartItemsWrapper.appendChild(itemEl);
  });

  cartSubtotal.textContent = `₹${totals.subtotal}`;
  cartSavings.textContent = `-₹${totals.savings}`;
  if (cartShipping) cartShipping.textContent = `₹${totals.shipping}`;
  cartTotal.textContent = `₹${totals.total}`;

  // Interactive dynamic bundle promotion helper in cart: Buy 5 Get 1 Free (group of 6)
  const singlesLeft = totals.qty % 6;
  if (totals.savings > 0) {
    if (singlesLeft === 0) {
      cartBundleTip.innerHTML = `🎉 <strong>Offer applied!</strong> You got ${Math.floor(totals.qty / 6)} free deck(s) on your pack of ${totals.qty}!`;
      cartBundleTip.style.color = "#10b981";
      cartBundleTip.style.background = "rgba(16, 185, 129, 0.06)";
      cartBundleTip.style.borderColor = "rgba(16, 185, 129, 0.2)";
    } else {
      const needed = 6 - singlesLeft;
      cartBundleTip.innerHTML = `💡 Add <strong>${needed}</strong> more deck${needed > 1 ? 's' : ''} to get **1 FREE deck**!`;
      cartBundleTip.style.color = "#f59e0b";
      cartBundleTip.style.background = "rgba(245, 158, 11, 0.06)";
      cartBundleTip.style.borderColor = "rgba(245, 158, 11, 0.2)";
    }
    cartBundleTip.style.display = "block";
  } else {
    const needed = 6 - totals.qty;
    cartBundleTip.innerHTML = `💡 Add <strong>${needed}</strong> more deck${needed > 1 ? 's' : ''} to get **1 FREE deck** (Buy 5 Get 1 Free)!`;
    cartBundleTip.style.color = "#f59e0b";
    cartBundleTip.style.background = "rgba(245, 158, 11, 0.06)";
    cartBundleTip.style.borderColor = "rgba(245, 158, 11, 0.2)";
    cartBundleTip.style.display = "block";
  }
}

// Fallback for cart images
window.handleCartImageError = function(img, themeColor) {
  img.parentElement.innerHTML = `
    <div style="background: var(--bg-primary); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--${themeColor}-primary, #ef4444)" stroke-width="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      </svg>
    </div>
  `;
};

// Local storage helpers
function saveCartToStorage() {
  const serializable = CART.map(item => ({ productId: item.product.id, qty: item.qty }));
  localStorage.setItem("yaadcard_cart", JSON.stringify(serializable));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("yaadcard_cart");
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    CART = [];
    parsed.forEach(item => {
      const product = DEFAULT_PRODUCTS.find(p => p.id === item.productId);
      if (product) {
        CART.push({ product, qty: item.qty });
      }
    });
  } catch (e) {
    console.error("Failed to load cart from storage", e);
  }
}

// Handle Order Checkout Submission
window.processOrderCheckout = function(e) {
  e.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("shipping-address").value.trim();
  const specs = customDeckSpecs.value.trim();

  const totals = calculateCartTotals();
  const itemsText = CART.map(item => `${item.qty}x ${item.product.name}`).join(", ");

  const preorder = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
    product: itemsText,
    quantity: totals.qty,
    customDetails: CART.some(item => item.product.id === "custom_deck") ? specs : "",
    address: address,
    totalCost: totals.total,
    date: new Date().toISOString(),
    status: "Pending"
  };

  const preorders = JSON.parse(localStorage.getItem("yaadcard_preorders") || "[]");
  preorders.push(preorder);
  localStorage.setItem("yaadcard_preorders", JSON.stringify(preorders));

  if (window.db) {
    window.db.collection("preorders").doc(preorder.id.toString()).set(preorder)
      .then(() => {
        console.log("Pre-order saved to Firestore successfully.");
      })
      .catch((error) => {
        console.error("Error saving pre-order to Firestore: ", error);
      });
  }

  document.getElementById("success-client-name").textContent = name;
  document.getElementById("success-total-bill").textContent = `₹${totals.total}`;
  document.getElementById("success-client-phone").textContent = phone;

  drawerViewCheckout.classList.remove("active");
  drawerViewSuccess.classList.add("active");

  CART = [];
  saveCartToStorage();
  updateCartUI();
};

// Search Debounce & Recording
function debounceSearchLog(query) {
  clearTimeout(searchLogTimeout);
  if (!query || query.length < 2) return;
  searchLogTimeout = setTimeout(() => {
    logSearch(query);
  }, 1500);
}

function logSearch(query) {
  if (!query || query.length < 2 || query === lastLoggedSearch) return;
  lastLoggedSearch = query;

  const resultsCount = PRODUCTS.filter(product => {
    return product.name.toLowerCase().includes(query) ||
           (product.category && product.category.toLowerCase().includes(query)) ||
           product.description.toLowerCase().includes(query);
  }).length;

  const searches = JSON.parse(localStorage.getItem("yaadcard_searches") || "[]");
  const existingIdx = searches.findIndex(s => s.query.toLowerCase() === query.toLowerCase());

  if (existingIdx > -1) {
    searches[existingIdx].count += 1;
    searches[existingIdx].timestamp = new Date().toISOString();
    searches[existingIdx].resultsCount = resultsCount;
  } else {
    searches.push({
      query: query,
      timestamp: new Date().toISOString(),
      count: 1,
      resultsCount: resultsCount
    });
  }

  localStorage.setItem("yaadcard_searches", JSON.stringify(searches));

  if (window.db) {
    const searchDocRef = window.db.collection("searches").doc(query.toLowerCase());
    window.db.runTransaction((transaction) => {
      return transaction.get(searchDocRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          transaction.set(searchDocRef, {
            query: query,
            timestamp: new Date().toISOString(),
            count: 1,
            resultsCount: resultsCount
          });
        } else {
          const newCount = (sfDoc.data().count || 0) + 1;
          transaction.update(searchDocRef, {
            count: newCount,
            timestamp: new Date().toISOString(),
            resultsCount: resultsCount
          });
        }
      });
    }).then(() => {
      console.log("Search statistics synced to Firestore.");
    }).catch((err) => {
      console.error("Search sync transaction failed: ", err);
    });
  }
}

// Layout helper anchors scroll
window.scrollToProducts = function() {
  document.getElementById("store-main-catalog").scrollIntoView({ behavior: "smooth" });
};

window.openCustomRequest = function() {
  addItemToCart("custom_deck");
  switchToCheckoutView();
};

// Search Dropdown setup
function setupSearchDropdowns() {
  const navInput = document.getElementById("nav-search");
  const navDropdown = document.getElementById("nav-search-dropdown");
  const desktopInput = document.getElementById("desktop-catalog-search");
  const desktopDropdown = document.getElementById("desktop-search-dropdown");

  function handleSearchInput(input, dropdown) {
    const value = input.value.trim().toLowerCase();
    if (!value || value.length < 2) {
      dropdown.classList.remove("active");
      dropdown.innerHTML = "";
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(value) || 
      (p.category && p.category.toLowerCase().includes(value)) ||
      p.description.toLowerCase().includes(value)
    );

    dropdown.classList.add("active");
    dropdown.innerHTML = "";

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="search-dropdown-empty">
          No matching decks.<br>
          <button class="search-dropdown-empty-btn" onclick="openCustomRequestWithSearch('${value.replace(/'/g, "\\'")}')">
            Create Custom "${value}" Deck (₹250)
          </button>
        </div>
      `;
      return;
    }

    matches.slice(0, 5).forEach(product => {
      const item = document.createElement("div");
      item.className = "search-dropdown-item";
      item.innerHTML = `
        <div class="search-item-img">
          <img src="${product.image}" onerror="handleCartImageError(this, '${product.theme}')">
        </div>
        <div class="search-item-info">
          <div class="search-item-name">${product.name}</div>
          <div class="search-item-meta">${product.cardsCount} cards • ${product.category || 'Deck'}</div>
        </div>
        <div class="search-item-price">₹${product.price}</div>
      `;
      item.addEventListener("click", () => {
        dropdown.classList.remove("active");
        input.value = "";
        openProductDetail(product.id);
      });
      dropdown.appendChild(item);
    });
  }

  if (navInput && navDropdown) {
    navInput.addEventListener("input", () => handleSearchInput(navInput, navDropdown));
    document.addEventListener("click", (e) => {
      if (!navInput.contains(e.target) && !navDropdown.contains(e.target)) {
        navDropdown.classList.remove("active");
      }
    });
  }

  if (desktopInput && desktopDropdown) {
    desktopInput.addEventListener("input", () => handleSearchInput(desktopInput, desktopDropdown));
    document.addEventListener("click", (e) => {
      if (!desktopInput.contains(e.target) && !desktopDropdown.contains(e.target)) {
        desktopDropdown.classList.remove("active");
      }
    });
  }
}

window.handleDesktopSearch = function(value) {
  const topSearch = document.getElementById("nav-search");
  if (topSearch) {
    topSearch.value = value;
    searchQuery = value.trim().toLowerCase();
    currentPage = 1;
    renderCatalog();
    debounceSearchLog(searchQuery);
  }
};

window.createCustomDeckFromInput = function() {
  const specsText = document.getElementById("desktop-custom-specs").value.trim();
  if (!specsText) {
    alert("Please enter your custom deck requirements.");
    return;
  }
  const modalSpecs = document.getElementById("custom-deck-specs");
  if (modalSpecs) {
    modalSpecs.value = specsText;
  }
  addItemToCart("custom_deck");
  switchToCheckoutView();
};
