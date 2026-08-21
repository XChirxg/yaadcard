// store.js - Premium E-Commerce Storefront Engine (boAt/Apple Inspired)

// Product Catalog (MRP=250, Cards=30, reviews/GSM removed)
const PRODUCTS = [
  {
    id: "47_laws_of_powers",
    name: "47 Laws of Powers",
    category: "SelfHelp Books",
    theme: "gold",
    image: "product-images/47_laws_of_powers.jpg",
    cardsCount: 30,
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
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
    price: 120,
    originalPrice: 250,
    badge: "GK SPECIAL",
    description: "Curated general knowledge deck covering the history, geography, economy, and culture of Himachal Pradesh."
  },
  // Placeholders for future categories (Games and Journey)
  {
    id: "truth_and_dare",
    name: "Truth & Dare Party Pack",
    category: "Games",
    theme: "purple",
    image: "product-images/truth_and_dare.jpg",
    cardsCount: 30,
    price: 120,
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
    price: 120,
    originalPrice: 250,
    badge: "COMING SOON",
    isComingSoon: true,
    description: "Essential travel phrasecards, packing checklists, emergency translations, and navigation guides."
  },
  // Custom Card Product
  {
    id: "custom_deck",
    name: "Custom YaadCard Deck",
    category: "Other",
    theme: "cyan",
    image: "product-images/custom_flashcards.jpg",
    cardsCount: "Custom",
    price: 120,
    originalPrice: 250,
    badge: "CUSTOM DESIGN",
    description: "Submit your own notes, syllabus, or topics! We'll format, design, and print a custom flashcard deck just for you."
  }
];

// Shopping Cart State
let CART = [];

// Filter States
let activeCategory = "all";
let searchQuery = "";
let searchLogTimeout = null;
let lastLoggedSearch = "";

// Slideshow Global Index Tracker
let currentSlideIndex = 0;

// DOM Links
const storeProductGrid = document.getElementById("store-product-grid");
const filterTabs = document.querySelector(".filter-tabs");
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

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupListeners();
  loadCartFromStorage();
  updateCartUI();
});

// Setup click and search events
function setupListeners() {
  // Category tabs click
  filterTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-tab")) {
      document.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
      e.target.classList.add("active");
      activeCategory = e.target.getAttribute("data-category");
      renderCatalog();
    }
  });

  // Search input typing filter
  navSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderCatalog();
    debounceSearchLog(searchQuery);
  });

  // Direct enter search logs
  navSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      logSearch(searchQuery);
    }
  });
}

// Render the product cards grid
function renderCatalog() {
  storeProductGrid.innerHTML = "";

  const filtered = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                          product.category.toLowerCase().includes(searchQuery) ||
                          product.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    storeProductGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 24px; color: var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.3; margin-bottom: 16px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p style="font-size: 1.1rem; font-weight: 600;">No decks found matching "${searchQuery}"</p>
        <p style="font-size: 0.85rem; margin-top: 8px;">Try searching for Academics, Exams, or contact us for a Custom Deck request!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Clicking on card opens product page (except buttons)
    card.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("a")) return;
      openProductDetail(product.id);
    });

    card.innerHTML = `
      <div class="card-image-box">
        ${product.badge ? `<span class="card-badge ${product.isComingSoon ? 'soon' : (product.id === 'custom_deck' ? 'custom' : '')}">${product.badge}</span>` : ""}
        <span class="card-badge-category">${product.category}</span>
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

    storeProductGrid.appendChild(card);
  });
}

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

// Open Product Detail Screen (SPA Navigation)
window.openProductDetail = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Hide lists
  storeHero.style.display = "none";
  storeValueProps.style.display = "none";
  storeMainCatalog.style.display = "none";

  // Show product detail view
  productDetailView.innerHTML = "";
  productDetailView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  currentSlideIndex = 0;

  // Build slide content (simulates cover + card front mock + card back mock)
  const productTitle = product.name;
  const themeColor = product.theme;

  productDetailView.innerHTML = `
    <button class="btn-back-catalog" onclick="closeProductDetail()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>Back to shop</span>
    </button>
    
    <div class="product-details-container">
      
      <!-- Slideable gallery container (Left side) -->
      <div>
        <div class="slideshow-container">
          <button class="slideshow-arrow arrow-left" onclick="shiftSlide(-1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="slideshow-arrow arrow-right" onclick="shiftSlide(1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          
          <div class="slides-wrapper" id="detail-slides-wrapper">
            <!-- Slide 1: Main Case Cover -->
            <div class="slide-item">
              <img src="${product.image}" alt="${product.name}" onerror="handleDetailImageFallback(this, '${product.name}', '${product.theme}')">
            </div>
            
            <!-- Slide 2: CSS Styled Card Front Mockup -->
            <div class="slide-item" style="background-color: #1e293b; padding: 24px;">
              <div style="border: 2px solid var(--${themeColor}-primary, #ef4444); border-radius: 8px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 20px; box-shadow: inset 0 0 20px rgba(0,0,0,0.4);">
                <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--${themeColor}-primary, #ef4444); font-weight: 700;">yaadcard</div>
                <div style="font-family: var(--font-display); font-size: 1.6rem; text-align: center; color: var(--text-main); font-weight: 700; line-height: 1.2;">
                  ${productTitle}
                </div>
                <div style="font-size: 0.65rem; color: var(--text-muted); text-align: center;">Tuck Case Cards Pack</div>
              </div>
            </div>
            
            <!-- Slide 3: CSS Styled Card Back Mockup -->
            <div class="slide-item" style="background-color: #0f172a; padding: 24px;">
              <div style="border: 1px solid var(--border-color); border-radius: 8px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 16px;">
                <div style="font-size: 0.7rem; color: var(--${themeColor}-primary, #ef4444); font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Key Recall Prompt</div>
                <div style="font-size: 0.8rem; color: #e2e8f0; line-height: 1.4; overflow-y: auto; flex: 1; padding: 6px 0;">
                  <strong>Review Concept</strong><br>
                  • Highlights core active recall principles.<br>
                  • Visual tables, summaries, and key formulations.
                </div>
                <div style="font-size: 0.6rem; color: var(--text-muted); text-align: right;">Card #01 / Back</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Thumbnails index dots -->
        <div class="thumbnails-container">
          <div class="thumbnail-dot active" onclick="jumpToSlide(0)" id="thumb-dot-0">
            <img src="${product.image}" onerror="this.style.display='none'; this.parentElement.style.background='var(--bg-secondary)';">
          </div>
          <div class="thumbnail-dot" onclick="jumpToSlide(1)" id="thumb-dot-1">
            <div style="width:100%; height:100%; background: #1e293b; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:var(--text-muted);">FRONT</div>
          </div>
          <div class="thumbnail-dot" onclick="jumpToSlide(2)" id="thumb-dot-2">
            <div style="width:100%; height:100%; background: #0f172a; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:var(--text-muted);">BACK</div>
          </div>
        </div>
      </div>
      
      <!-- Right metadata content -->
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
  `;
};

// Return from detail view to main gallery catalog
window.closeProductDetail = function() {
  productDetailView.style.display = "none";
  
  storeHero.style.display = "block";
  storeValueProps.style.display = "block";
  storeMainCatalog.style.display = "block";
  
  // Refilter catalog if search typed
  renderCatalog();
};

// Slideshow mechanics
window.shiftSlide = function(offset) {
  currentSlideIndex = (currentSlideIndex + offset + 3) % 3;
  updateSlideshowPosition();
};

window.jumpToSlide = function(index) {
  currentSlideIndex = index;
  updateSlideshowPosition();
};

function updateSlideshowPosition() {
  const wrapper = document.getElementById("detail-slides-wrapper");
  if (wrapper) {
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update thumbnail highlights
    document.querySelectorAll(".thumbnail-dot").forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
}

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

  // Populate checkout summaries
  const totals = calculateCartTotals();
  document.getElementById("checkout-total-qty").textContent = `${totals.qty} deck${totals.qty === 1 ? '' : 's'}`;
  document.getElementById("checkout-total-price").textContent = `₹${totals.total}`;

  // Check if Custom Flashcard is in the cart to show custom textarea
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
  
  // Slide open the cart drawer to show item added
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

// Calculate pricing logic: single ₹120, group of 5 ₹500 (no shipping)
function calculateCartTotals() {
  let qty = CART.reduce((sum, item) => sum + item.qty, 0);
  
  const bundles = Math.floor(qty / 5);
  const singles = qty % 5;
  
  const subtotal = qty * 120;
  const savings = bundles * 100; // Bundle price is 500, instead of 600, saving 100 per bundle
  const total = subtotal - savings;
  const shipping = 0;

  return { qty, subtotal, savings, shipping, total };
}

// Update DOM elements in cart drawer
function updateCartUI() {
  const totals = calculateCartTotals();
  
  // Badge count
  cartBadge.textContent = totals.qty;

  // Empty state vs listings rendering
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
    
    // Set pricing summaries
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
          <span class="cart-item-category">${item.product.category}</span>
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

  // Set subtotal calculations
  cartSubtotal.textContent = `₹${totals.subtotal}`;
  cartSavings.textContent = `-₹${totals.savings}`;
  if (cartShipping) cartShipping.textContent = `₹${totals.shipping}`;
  cartTotal.textContent = `₹${totals.total}`;

  // Interactive dynamic bundle promotion helper in cart
  const singlesLeft = totals.qty % 5;
  if (totals.savings > 0) {
    if (singlesLeft === 0) {
      cartBundleTip.innerHTML = `🎉 <strong>Bundle applied!</strong> You saved ₹${totals.savings} on your pack of ${totals.qty}!`;
      cartBundleTip.style.color = "#10b981";
      cartBundleTip.style.background = "rgba(16, 185, 129, 0.06)";
      cartBundleTip.style.borderColor = "rgba(16, 185, 129, 0.2)";
    } else {
      const needed = 5 - singlesLeft;
      cartBundleTip.innerHTML = `💡 Add <strong>${needed}</strong> more deck${needed > 1 ? 's' : ''} to save another <strong>₹100</strong>!`;
      cartBundleTip.style.color = "#f59e0b";
      cartBundleTip.style.background = "rgba(245, 158, 11, 0.06)";
      cartBundleTip.style.borderColor = "rgba(245, 158, 11, 0.2)";
    }
    cartBundleTip.style.display = "block";
  } else {
    const needed = 5 - totals.qty;
    cartBundleTip.innerHTML = `💡 Add <strong>${needed}</strong> more deck${needed > 1 ? 's' : ''} to get the <strong>5-deck bundle for ₹500</strong>!`;
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

// Local storage storage
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
      const product = PRODUCTS.find(p => p.id === item.productId);
      if (product) {
        CART.push({
          product: product,
          qty: item.qty
        });
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

  // Create detailed order items summary
  const itemsText = CART.map(item => `${item.qty}x ${item.product.name}`).join(", ");

  const preorder = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
    product: itemsText, // Stores item list here for backwards compatibility with admin log layout
    quantity: totals.qty,
    customDetails: CART.some(item => item.product.id === "custom_deck") ? specs : "",
    address: address,
    totalCost: totals.total,
    date: new Date().toISOString(),
    status: "Pending"
  };

  // Save to preorders list
  const preorders = JSON.parse(localStorage.getItem("yaadcard_preorders") || "[]");
  preorders.push(preorder);
  localStorage.setItem("yaadcard_preorders", JSON.stringify(preorders));

  // Show Success Panel
  document.getElementById("success-client-name").textContent = name;
  document.getElementById("success-total-bill").textContent = `₹${totals.total}`;
  document.getElementById("success-client-phone").textContent = phone;

  drawerViewCheckout.classList.remove("active");
  drawerViewSuccess.classList.add("active");

  // Empty cart
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
           product.category.toLowerCase().includes(query) ||
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
}

// Layout helper anchors scroll
window.scrollToProducts = function() {
  document.getElementById("collections-catalog").scrollIntoView({ behavior: "smooth" });
};

window.openCustomRequest = function() {
  // Add custom deck to cart directly and launch checkout
  addItemToCart("custom_deck");
  switchToCheckoutView();
};
