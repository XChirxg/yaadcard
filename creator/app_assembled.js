// State Management
let currentCards = [];

// DOM Elements
const elements = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  loadSampleBtn: document.getElementById('load-sample-btn'),
  printBtn: document.getElementById('print-btn'),
  printArea: document.getElementById('print-area')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupPromptGenerator();
  setupJSONImporter();
  setupGlobalActions();
  
  // Load sample pack by default
  loadSamplePack('finance_pack');
  updateCostEstimation();
});

/* ==========================================================================
   AI Prompt Generator (Hardcoded A3 version - exactly 29 study cards)
   ========================================================================== */
function setupPromptGenerator() {
  const promptText = `Act as an expert educational content writer.
Create a high-yield study flashcard set about the topic: "Capital Structure".
Generate exactly 29 flashcards.

STRICT WRITING & DESIGN RULES:
1. FOCUS ON HIGH-YIELD INFORMATION: Target concepts, formulas, rules, or keywords that are traditionally hard to remember. The content must be highly specific, focusing on core keywords, formulas, and definitions from that topic, rather than generic overview details.
2. LATEX FORMULAS: Render all mathematical formulas, chemical equations, or quantitative expressions using beautiful LaTeX formatting. Wrap inline formulas in single dollar signs (e.g. $E=mc^2$) and display/block equations in double dollar signs (e.g. $$\\text{FV} = \\text{PV} \\times (1 + r)^n$$). Ensure you double-escape backslashes in JSON strings (use \\\\text and \\\\frac).
3. MNEMONICS: For concepts that are particularly difficult to memorize, search for and include a famous mnemonic or memory aid (if one exists) or design a simple one. Include it inside the 'key_points' array.
4. FRONT SIDE: Keep it super simple. ONLY output the main keyword/concept name (max 3 words / 20 characters) in 'front.title'. Absolutely no questions or other text.
5. BACK SIDE: Make it highly detailed but STRICTLY obey these character/word limits so it fits within Poker card boundaries without scrollbars:
   - Back Title ('back.title'): Max 4 words (max 25 characters).
   - Tagline ('back.tagline'): Max 10 words (max 60 characters).
   - Summary ('back.summary'): Max 30 words (max 180 characters).
   - Key Points ('back.key_points'): Max 2 points, each point max 12 words (max 60 characters).
   - Table ('back.table'): Max 2 columns and 3 rows. Table cells must be extremely brief (max 3 words per cell).
   - Diagram ('back.diagram'): Monospace ASCII diagram/reaction. Max 3 lines, max 25 characters per line.
6. Elements: Every card must contain a table OR key points, and optionally a diagram. Do not put all elements in a single card.
7. Themes: assign a theme ('cyan', 'orange', 'purple', 'emerald', 'gold') for visual grouping.

You MUST respond ONLY with a raw JSON array of card objects conforming to the schema below. Do not write any explanations before or after the JSON:

[
    <div class="print-page-footer">YAADCARD — print, cut, fold, and pack</div>
  `;
  elements.printArea.appendChild(p1El);

  // SHEET 1 - PAGE 2 (Card Backs + Tuck Box Inside - Mirrored)
  const p2El = document.createElement('div');
  p2El.className = 'print-page back-page';
  p2El.innerHTML = `
    <div class="print-page-header">YAADCARD PACKAGING & CARDS (SHEET 1 - BACK)</div>
    <div class="print-grid">
      <!-- Row 1: Cards 3, 2, 1 Backs -->
      ${renderCardBackOrEmpty(sheet1Cards[2])}
      ${renderCardBackOrEmpty(sheet1Cards[1])}
      ${renderCardBackOrEmpty(sheet1Cards[0])}
      
      <!-- Tuck Box Inside Net (spans 3 cols x 2 rows, positioned on Col 4, 5, 6) -->
      <div class="tuck-box-container" style="grid-column: span 3; grid-row: span 2; width: 7.5in; height: 7.0in; display: flex; justify-content: center; align-items: center; box-sizing: border-box; background: #ffffff;">
        <div class="tuck-box-net">
          <div class="tuck-dust-flap tuck-dust-flap-top-left-inside"></div>
          <div class="tuck-dust-flap tuck-dust-flap-top-right-inside"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-left-inside"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-right-inside"></div>
          
          <div class="tuck-top-flap-inside"></div>
          
          <div class="tuck-panel tuck-left-side-inside"></div>
          
          <div class="tuck-panel tuck-front-inside" style="border-left:none !important;"></div>
          
          <div class="tuck-panel tuck-right-side-inside" style="border-left:none !important;"></div>
          
          <div class="tuck-panel tuck-back-inside" style="border-left:none !important;"></div>
          
          <div class="tuck-panel tuck-glue-tab-inside" style="border-left:none !important;"></div>
          
          <div class="tuck-bottom-flap-inside"></div>
        </div>
      </div>
      
      <!-- Row 2: Cards 6, 5, 4 Backs -->
      ${renderCardBackOrEmpty(sheet1Cards[5])}
      ${renderCardBackOrEmpty(sheet1Cards[4])}
      ${renderCardBackOrEmpty(sheet1Cards[3])}
      
      <!-- Row 3: Cards 12, 11, 10, 9, 8, 7 Backs -->
      ${renderCardBackOrEmpty(sheet1Cards[11])}
      ${renderCardBackOrEmpty(sheet1Cards[10])}
      ${renderCardBackOrEmpty(sheet1Cards[9])}
      ${renderCardBackOrEmpty(sheet1Cards[8])}
      ${renderCardBackOrEmpty(sheet1Cards[7])}
      ${renderCardBackOrEmpty(sheet1Cards[6])}
    </div>
    <div class="print-page-footer">YAADCARD — print, cut, fold, and pack</div>
  `;
  elements.printArea.appendChild(p2El);

  // 3. Generate remaining sheets (Sheets 2+)
  const remainingCards = allPrintCards.slice(12);
  
  if (remainingCards.length > 0) {
    if (layout === 'foldable') {
      const capacity = 9; 
      
      for (let i = 0; i < remainingCards.length; i += capacity) {
        const pageCards = remainingCards.slice(i, i + capacity);
        const pageEl = document.createElement('div');
        pageEl.className = 'print-page';
        
        pageEl.innerHTML = `
          <div class="print-page-header">SUBJECT: ${deckSubject.toUpperCase()}</div>
          <div class="print-grid foldable-grid"></div>
          <div class="print-page-footer">YAADCARD — learn faster, remember longer</div>
        `;
        
        const gridEl = pageEl.querySelector('.print-grid');
        
        pageCards.forEach(card => {
          if (card) {
            const pairContainer = document.createElement('div');
            pairContainer.className = `print-foldable-pair`;
            
            const frontHtml = generateSinglePrintCardHtml(card, 'front', sizeClass);
            const backHtml = generateSinglePrintCardHtml(card, 'back', sizeClass);
            
            pairContainer.innerHTML = `
              ${frontHtml}
              <div class="print-foldable-divider"></div>
              ${backHtml}
            `;
            
            gridEl.appendChild(pairContainer);
          }
        });
        
        elements.printArea.appendChild(pageEl);
      }
    } else {
      const cardsPerPage = 18; 
      const cols = 6;
      
      for (let i = 0; i < remainingCards.length; i += cardsPerPage) {
          <!-- Front panel -->
          <div class="tuck-panel tuck-front" style="border-left:none !important;">
            <div class="card-frame" style="border-color: var(--theme-color) !important;">
              <div style="font-family:var(--font-mono); font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; color:var(--theme-color);">FLASH CARDS</div>
              
              <!-- Multi-colored card accent stripe lines -->
              <div class="tuck-color-stripe">
                <span class="stripe-bar cyan-bar"></span>
                <span class="stripe-bar orange-bar"></span>
                <span class="stripe-bar purple-bar"></span>
                <span class="stripe-bar emerald-bar"></span>
                <span class="stripe-bar gold-bar"></span>
              </div>
              
              <div style="font-family:var(--font-display); font-size:1.15rem; font-weight:900; text-transform:uppercase; text-align:center; color:#000000; margin: 6px 0;">${escapeHtml(deckSubject)}</div>
              <div style="font-family:var(--font-mono); font-size:0.55rem; font-weight:700; letter-spacing:0.15em; color:#555555; text-transform:lowercase; margin-top:auto;">yaadcard.in</div>
            </div>
          </div>
          
          <div class="tuck-panel tuck-right-side" style="border-left:none !important;">
            <span class="tuck-side-text" style="color:var(--theme-color) !important; font-weight:700;">YAADCARD • ${escapeHtml(deckSubject).toUpperCase()}</span>
          </div>
          
          <!-- Back panel -->
          <div class="tuck-panel tuck-back" style="border-left:none !important;">
            <div class="tuck-back-inset" style="border-color: var(--theme-color) !important;"></div>
            <div class="tuck-back-header" style="color:var(--theme-color) !important; border-bottom-color:var(--theme-color) !important;">PRODUCT DESCRIPTION</div>
            
            <!-- Multi-colored card accent stripe lines -->
            <div class="tuck-color-stripe" style="width: 100% !important; margin: 4px 0 !important;">
              <span class="stripe-bar cyan-bar"></span>
              <span class="stripe-bar orange-bar"></span>
              <span class="stripe-bar purple-bar"></span>
              <span class="stripe-bar emerald-bar"></span>
              <span class="stripe-bar gold-bar"></span>
            </div>
            
            <p class="tuck-back-paragraph" style="color:#000000 !important; font-weight:500;">
              Premium high-yield study deck engineered for quick revision and active recall. Contains concise cards covering major core concepts, visual diagrams, mathematical formulas, and memory mnemonics. Perfect for exam preparation, competitive tests, and classroom revision.
            </p>
            <div class="tuck-back-details" style="color:#000000 !important;">
              <div><strong>Pack Contents:</strong> Premium Flashcards & reference insert</div>
              <div><strong>Subject:</strong> ${escapeHtml(deckSubject)}</div>
              <div><strong>MRP:</strong> ₹250.00 <span class="tax-info" style="color:#555555;">(incl. of all taxes)</span></div>
              <div><strong>Support:</strong> support@yaadcard.in</div>
            </div>
            
            <div class="tuck-back-footer" style="border-top-color:#000000 !important;">
              <div class="tuck-legal-info" style="color:#000000 !important; font-weight:600;">
                YAADCARD Publications<br>
                Made in India • Recyclable
              </div>
              <div class="tuck-barcode"></div>
            </div>
          </div>
          
          <div class="tuck-panel tuck-glue-tab" style="border-left:none !important;"></div>
          
          <!-- Bottom flap -->
          <div class="tuck-bottom-flap"></div>
        </div>
      </div>
      
      <!-- Card Fronts (Row 1 Col 4-6, Row 2 Col 4-6, Row 3 Col 1-6) -->
      ${renderCardFrontOrEmpty(sheet1Cards[0])}
      ${renderCardFrontOrEmpty(sheet1Cards[1])}
      ${renderCardFrontOrEmpty(sheet1Cards[2])}
      
      ${renderCardFrontOrEmpty(sheet1Cards[3])}
      ${renderCardFrontOrEmpty(sheet1Cards[4])}
      ${renderCardFrontOrEmpty(sheet1Cards[5])}
      
      ${renderCardFrontOrEmpty(sheet1Cards[6])}
      ${renderCardFrontOrEmpty(sheet1Cards[7])}
      ${renderCardFrontOrEmpty(sheet1Cards[8])}
      ${renderCardFrontOrEmpty(sheet1Cards[9])}
      ${renderCardFrontOrEmpty(sheet1Cards[10])}
      ${renderCardFrontOrEmpty(sheet1Cards[11])}
    </div>
    <div class="print-page-footer">YAADCARD — print, cut, fold, and pack</div>

  // 1. Add Single Index Card to the printed card deck list automatically
  const allPrintCards = [];
  const halfCount = Math.ceil(currentCards.length / 2);
  const indexA = currentCards.slice(0, halfCount);
  const indexB = currentCards.slice(halfCount);
  
  const indexAList = indexA.map(c => `<li style="margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="font-family: var(--font-mono); font-weight: 700; color: var(--cyan-primary);">${String(c.id).padStart(2, '0')}:</span> ${escapeHtml(c.front.title)}</li>`).join('');
  const indexBList = indexB.map(c => `<li style="margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="font-family: var(--font-mono); font-weight: 700; color: var(--cyan-primary);">${String(c.id).padStart(2, '0')}:</span> ${escapeHtml(c.front.title)}</li>`).join('');
  
  const indexCard = {
    id: "IDX",
    theme: "cyan",
    front: {
      title: "DECK INDEX • PART 1",
      indexHtml: indexAList
    },
    back: {
      title: "DECK INDEX • PART 2",
      indexHtml: indexBList
    }
  };
  
  allPrintCards.push(indexCard, ...currentCards);

  // Helper renderers for cards in grid slots
  function renderCardFrontOrEmpty(card) {
    if (card) {
      return generateSinglePrintCardHtml(card, 'front', sizeClass);
    } else {
      return `<div class="print-card-wrapper ${sizeClass}" style="border:none !important;"></div>`;
    }
  }

  function renderCardBackOrEmpty(card) {
    if (card) {
      return generateSinglePrintCardHtml(card, 'back', sizeClass);
    } else {
      return `<div class="print-card-wrapper ${sizeClass}" style="border:none !important;"></div>`;
    }
  }

  // 2. Generate and Prepend Packaging Sheet (Sheet 1: duplex outside + inside)
  const sheet1Cards = allPrintCards.slice(0, 12);
  while (sheet1Cards.length < 12) {
    sheet1Cards.push(null);
  }

  // SHEET 1 - PAGE 1 (Fronts + Tuck Box Outside)
  const p1El = document.createElement('div');
  p1El.className = 'print-page';
  p1El.innerHTML = `
    <div class="print-page-header">YAADCARD PACKAGING & CARDS (SHEET 1 - FRONT)</div>
    <div class="print-grid">
      <!-- Tuck Box Outside Net (spans 3 cols x 2 rows) -->
      <div class="tuck-box-container" style="grid-column: span 3; grid-row: span 2; width: 7.5in; height: 7.0in; display: flex; justify-content: center; align-items: center; box-sizing: border-box; background: #ffffff; --theme-color: var(--${deckTheme}-primary); --theme-color-rgb: var(--${deckTheme}-rgb);">
        <div class="tuck-box-net">
          <!-- Dust wings -->
          <div class="tuck-dust-flap tuck-dust-flap-top-left"></div>
          <div class="tuck-dust-flap tuck-dust-flap-top-right"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-left"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-right"></div>
          
          <!-- Top flap -->
          <div class="tuck-top-flap"></div>
          
          <!-- Side panels -->
          <div class="tuck-panel tuck-left-side">
            <span class="tuck-side-text" style="color:var(--theme-color) !important; font-weight:700;">YAADCARD • ${escapeHtml(deckSubject).toUpperCase()}</span>
          </div>
          
          <!-- Front panel -->