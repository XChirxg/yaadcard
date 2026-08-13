// State Management
let currentCards = [];

// DOM Elements
const elements = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
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
   AI Prompt Generator (A4 version - exactly 9 study cards)
   ========================================================================== */
function setupPromptGenerator() {
  const promptText = `Act as an expert educational content writer.
Create a high-yield study flashcard set about the topic: "Capital Structure".
Generate exactly 9 flashcards.

STRICT WRITING & DESIGN RULES:
1. FOCUS ON HIGH-YIELD INFORMATION: Target concepts, formulas, rules, or keywords that are traditionally hard to remember. The content must be highly specific, focusing on core keywords, formulas, and definitions from that topic, rather than generic overview details.
2. LATEX FORMULAS: Render all mathematical formulas, chemical equations, or quantitative expressions using beautiful LaTeX formatting. Wrap inline formulas in single dollar signs (e.g. $E=mc^2$) and display/block equations in double dollar signs (e.g. $$\\text{FV} = \\text{PV} \\times (1 + r)^n$$). Ensure you double-escape backslashes in JSON strings (use \\\\text and \\\\frac).
3. MNEMONICS: For concepts that are particularly difficult to memorize, include a famous mnemonic or memory aid (if one exists) or design a simple one. Include it inside the 'key_points' array.
4. FRONT SIDE: Keep it super simple. ONLY output the main keyword/concept name (max 3 words / 20 characters) in 'front.title'. Absolutely no questions or other text.
5. BACK SIDE: Make it highly detailed but STRICTLY obey these strict character/word limits so it fits within Poker card boundaries without scrollbars:
   - Back Title ('back.title'): Max 3 words (max 20 characters).
   - Tagline ('back.tagline'): Max 6 words (max 40 characters).
   - Summary ('back.summary'): Max 18 words (max 100 characters).
   - Key Points ('back.key_points'): Max 2 points, each point max 8 words (max 40 characters).
   - Table ('back.table'): Max 2 columns and 2 rows. Table cells must be extremely brief (max 2 words per cell).
   - Diagram ('back.diagram'): Monospace ASCII diagram. Max 2 lines, max 20 characters per line.
6. Elements: A card must contain EITHER a table OR key points. NEVER include both elements in the same card. Diagrams are optional but must be very small (max 2 lines).
7. Themes: Assign a theme ('cyan', 'orange', 'purple', 'emerald', 'gold') for visual grouping.

You MUST respond ONLY with a raw JSON array of card objects conforming to the schema below. Do not write any explanations before or after the JSON:

[
  {
    "id": 1,
    "category": "Capital Structure",
    "theme": "cyan",
    "front": {
      "title": "WACC"
    },
    "back": {
      "title": "Weighted Avg Cost of Capital",
      "tagline": "The average rate a business pays to finance its assets.",
      "summary": "Weighted average of the cost of equity and the cost of debt based on their respective proportions in the capital structure.",
      "table": {
        "headers": ["Source", "Cost"],
        "rows": [
          ["Equity", "12%"],
          ["Debt (post-tax)", "5%"]
        ]
      },
      "key_points": [
        "Formula: $WACC = (E/V \\times Re) + (D/V \\times Rd \\times (1 - Tc))$",
        "Used as the discount rate for capital budgeting projects."
      ],
      "diagram": "[Equity + Debt] ──> [WACC]"
    }
  }
]`;

  elements.copyPromptBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptText)
      .then(() => {
        const originalText = elements.copyPromptBtn.innerHTML;
        elements.copyPromptBtn.innerHTML = '📋 Prompt Copied!';
        elements.copyPromptBtn.style.background = '#10b981';
        setTimeout(() => {
          elements.copyPromptBtn.innerHTML = originalText;
          elements.copyPromptBtn.style.background = '';
        }, 2000);
      })
      .catch(err => {
        alert('Failed to copy text: ' + err);
      });
  });
}

/* ==========================================================================
   JSON Import & Validator
   ========================================================================== */
function performValidation(rawVal) {
  if (!rawVal) {
    elements.validationStatus.className = 'validation-badge';
    elements.validationStatus.style.display = 'none';
    return;
  }

  try {
    const parsed = JSON.parse(rawVal);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be a top-level array of cards.");
    }

    if (parsed.length === 0) {
      throw new Error("The array is empty.");
    }

    const item = parsed[0];
    if (!item.front || !item.back || !item.category) {
      throw new Error("Cards must contain 'category', 'front', and 'back' objects.");
    }

    elements.validationStatus.className = 'validation-badge success';
    elements.validationStatus.innerHTML = `✓ Valid! Loaded ${parsed.length} cards.`;
    elements.validationStatus.style.display = 'flex';
    
    currentCards = parsed.map((c, index) => ({
      id: c.id || (index + 1),
      category: c.category || "General",
      theme: c.theme || "cyan",
      front: c.front || { title: "" },
      back: c.back || { title: "", tagline: "", summary: "", key_points: [] }
    }));
    
    updateCostEstimation();
    
  } catch (err) {
    elements.validationStatus.className = 'validation-badge error';
    elements.validationStatus.innerHTML = `✕ Error: ${err.message}`;
    elements.validationStatus.style.display = 'flex';
  }
}

function setupJSONImporter() {
  elements.jsonInput.addEventListener('input', () => {
    performValidation(elements.jsonInput.value.trim());
  });

  elements.pasteValidateBtn.addEventListener('click', async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText.trim()) {
        elements.jsonInput.value = clipboardText;
      }
    } catch (e) {
      // Fallback if clipboard permissions are denied
    }
    performValidation(elements.jsonInput.value.trim());
  });
}

// Utility to shrink text until it fits container heights perfectly in printed sheets
function fitTextToBox(container) {
  let size = 11.5; // Start size in pixels (matches 0.72rem)
  container.style.fontSize = `${size}px`;
  
  const tables = container.querySelectorAll('.card-table');
  const diagrams = container.querySelectorAll('.card-diagram-block');

  while (container.scrollHeight > container.clientHeight && size > 7.0) {
    size -= 0.5;
    container.style.fontSize = `${size}px`;
    tables.forEach(t => t.style.fontSize = `${size * 0.85}px`);
    diagrams.forEach(d => d.style.fontSize = `${size * 0.78}px`);
  }
}

// Calculates and renders dynamic sheet count
function updateCostEstimation() {
  const count = currentCards.length;
  const capacity = 8; // Fixed duplex capacity per A4 landscape sheet
  
  // Total cards including 1 index card generated for Sheet 1
  const totalPrintableCards = count > 0 ? count + 1 : 0;
  
  // Sheet 1 always prints 2 cards + the tuck box.
  // Remaining cards are distributed across standard Sheets 2+ (depending on capacity).
  const remainingCount = Math.max(0, totalPrintableCards - 2);
  const sheets = totalPrintableCards > 0 
    ? 1 + Math.ceil(remainingCount / capacity) 
    : 0;
    
  const sheetsEl = document.getElementById('est-sheets');
  if (sheetsEl) {
    sheetsEl.textContent = `${sheets} sheet${sheets !== 1 ? 's' : ''}`;
  }
}

/* ==========================================================================
   Global Controller Actions
   ========================================================================== */
function setupGlobalActions() {
  elements.loadSampleBtn.addEventListener('click', () => {
    loadSamplePack('finance_pack');
  });

  elements.printBtn.addEventListener('click', () => {
    generatePrintSheet();
    if (window.renderMathInElement) {
      window.renderMathInElement(elements.printArea, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError: false
      });
    }
    // Wrap print inside a brief timeout to let browser update the print area rendering tree
    setTimeout(() => {
      window.print();
    }, 250);
  });
}

function loadSamplePack(packId) {
  if (SAMPLE_PACKS[packId]) {
    currentCards = JSON.parse(JSON.stringify(SAMPLE_PACKS[packId].cards));
    
    // Filter fronts to keep just the titles (keywords)
    currentCards.forEach(card => {
      card.front = { title: card.front.title };
    });

    elements.jsonInput.value = JSON.stringify(currentCards, null, 2);
    elements.jsonInput.dispatchEvent(new Event('input'));
  }
}

/* ==========================================================================
   A4 Print Document Generator Engine (4x2 Grid = 8 Cards per Landscape page)
   ========================================================================== */
function generatePrintSheet() {
  elements.printArea.innerHTML = '';
  
  if (currentCards.length === 0) return;

  const layout = 'duplex';
  const sizeClass = 'poker-size-wrapper';
  const deckSubject = currentCards[0] ? currentCards[0].category : "General";
  const deckTheme = currentCards[0] ? currentCards[0].theme : "cyan";

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
  function renderCardFrontOrEmpty(card, gridStyle = '') {
    if (card) {
      return generateSinglePrintCardHtml(card, 'front', sizeClass, gridStyle);
    } else {
      return `<div class="print-card-wrapper ${sizeClass}" style="border:none !important; ${gridStyle}"></div>`;
    }
  }

  function renderCardBackOrEmpty(card, gridStyle = '') {
    if (card) {
      return generateSinglePrintCardHtml(card, 'back', sizeClass, gridStyle);
    } else {
      return `<div class="print-card-wrapper ${sizeClass}" style="border:none !important; ${gridStyle}"></div>`;
    }
  }

  // 2. Generate and Prepend Packaging Sheet (Sheet 1: duplex outside + inside)
  const sheet1Cards = allPrintCards.slice(0, 2);
  while (sheet1Cards.length < 2) {
    sheet1Cards.push(null);
  }

  // SHEET 1 - PAGE 1 (Fronts + Tuck Box Outside)
  const p1El = document.createElement('div');
  p1El.className = 'print-page';
  p1El.innerHTML = `
    <div class="print-page-header">YAADCARD PACKAGING & CARDS (SHEET 1 - FRONT)</div>
    <div class="print-grid">
      <!-- Tuck Box Outside Net (spans 3 cols x 2 rows) -->
      <div class="tuck-box-container" style="grid-column: 1 / span 3; grid-row: 1 / span 2; width: 7.5in; height: 7.0in; display: flex; justify-content: center; align-items: center; box-sizing: border-box; background: #ffffff; --theme-color: var(--${deckTheme}-primary); --theme-color-rgb: var(--${deckTheme}-rgb);">
        <div class="tuck-box-net">
          <!-- Dust wings -->
          <div class="tuck-dust-flap tuck-dust-flap-top-left"></div>
          <div class="tuck-dust-flap tuck-dust-flap-top-right"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-left"></div>
          <div class="tuck-dust-flap tuck-dust-flap-bottom-right"></div>
          
          <!-- Top flap -->
          <div class="tuck-top-flap">
            <div style="font-family:var(--font-mono); font-size:0.4rem; font-weight:700; color:#888; transform: rotate(180deg); opacity:0.8;">▲ FOLD TUCK ▲</div>
          </div>
          
          <!-- Side panels -->
          <div class="tuck-panel tuck-left-side" style="display: flex !important; justify-content: center !important; align-items: center !important; padding: 20px 0 !important;">
            <span class="tuck-side-text" style="text-align: center;"><span style="color: #666666 !important; font-size: 0.38rem; font-weight: 700; letter-spacing: 0.15em;">YAADCARD</span> <span style="color: #888888 !important; font-size: 0.44rem; font-weight: 800; margin: 8px 0; display: inline-block;">•</span> <span style="color: var(--theme-color) !important; font-size: 0.55rem; font-weight: 900; letter-spacing: 0.05em;">${escapeHtml(deckSubject).toUpperCase()}</span></span>
          </div>
          
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
          
          <div class="tuck-panel tuck-right-side" style="border-left:none !important; display: flex !important; justify-content: center !important; align-items: center !important; padding: 20px 0 !important;">
            <span class="tuck-side-text" style="text-align: center;"><span style="color: #666666 !important; font-size: 0.38rem; font-weight: 700; letter-spacing: 0.15em;">YAADCARD</span> <span style="color: #888888 !important; font-size: 0.44rem; font-weight: 800; margin: 8px 0; display: inline-block;">•</span> <span style="color: var(--theme-color) !important; font-size: 0.55rem; font-weight: 900; letter-spacing: 0.05em;">${escapeHtml(deckSubject).toUpperCase()}</span></span>
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
          <div class="tuck-bottom-flap">
            <div style="font-family:var(--font-mono); font-size:0.4rem; font-weight:700; color:#888; opacity:0.8;">▼ FOLD BOTTOM ▼</div>
          </div>
        </div>
      </div>
      
      <!-- Card Fronts (Col 3 of Row 1 & 2) -->
      ${renderCardFrontOrEmpty(sheet1Cards[0], 'grid-column: 4; grid-row: 1;')}
      ${renderCardFrontOrEmpty(sheet1Cards[1], 'grid-column: 4; grid-row: 2;')}
    </div>
    <div class="print-page-footer">YAADCARD — print, cut, fold, and pack</div>
  `;
  elements.printArea.appendChild(p1El);

  // SHEET 1 - PAGE 2 (Card Backs + Tuck Box Inside - Blank Area)
  const p2El = document.createElement('div');
  p2El.className = 'print-page back-page';
  p2El.innerHTML = `
    <div class="print-page-header">YAADCARD PACKAGING & CARDS (SHEET 1 - BACK)</div>
    <div class="print-grid">
      <!-- Col 0 Row 1 & 2: Card Backs -->
      ${renderCardBackOrEmpty(sheet1Cards[0], 'grid-column: 1; grid-row: 1;')}
      ${renderCardBackOrEmpty(sheet1Cards[1], 'grid-column: 1; grid-row: 2;')}
      
      <!-- Empty space where tuck box back would align (leaves inside of pack blank) -->
      <div class="tuck-box-container" style="grid-column: 2 / span 3; grid-row: 1 / span 2; width: 7.5in; height: 7.0in; border: none !important; background: transparent !important;"></div>
    </div>
    <div class="print-page-footer">YAADCARD — print, cut, fold, and pack</div>
  `;
  elements.printArea.appendChild(p2El);

  // 3. Generate remaining sheets (Sheets 2+)
  const remainingCards = allPrintCards.slice(2);
  
  if (remainingCards.length > 0) {
    const cardsPerPage = 8; 
    const cols = 4;
    
    for (let i = 0; i < remainingCards.length; i += cardsPerPage) {
      const pageCards = remainingCards.slice(i, i + cardsPerPage);
      
      while (pageCards.length < cardsPerPage) {
        pageCards.push(null);
      }
      
      // Page Fronts
      const frontsPageEl = document.createElement('div');
      frontsPageEl.className = 'print-page';
      
      frontsPageEl.innerHTML = `
        <div class="print-page-header">SUBJECT: ${deckSubject.toUpperCase()} (FRONTS)</div>
        <div class="print-grid"></div>
        <div class="print-page-footer">YAADCARD — learn faster, remember longer</div>
      `;
      
      const frontsGridEl = frontsPageEl.querySelector('.print-grid');
      
      pageCards.forEach(card => {
        if (card) {
          frontsGridEl.innerHTML += generateSinglePrintCardHtml(card, 'front', sizeClass);
        } else {
          frontsGridEl.innerHTML += `<div class="print-card-wrapper ${sizeClass}" style="border:none !important;"></div>`;
        }
      });
      
      elements.printArea.appendChild(frontsPageEl);
      
      // Page Backs (mirrored)
      const backsPageEl = document.createElement('div');
      backsPageEl.className = 'print-page back-page';
      backsPageEl.innerHTML = `
        <div class="print-page-header">SUBJECT: ${deckSubject.toUpperCase()} (BACKS)</div>
        <div class="print-grid"></div>
        <div class="print-page-footer">YAADCARD — learn faster, remember longer</div>
      `;
      
      const backsGridEl = backsPageEl.querySelector('.print-grid');
      
      const rowsCount = cardsPerPage / cols; 
      const mirroredPageCards = [];
      
      for (let r = 0; r < rowsCount; r++) {
        const rowStartIndex = r * cols;
        const rowCards = pageCards.slice(rowStartIndex, rowStartIndex + cols);
        rowCards.reverse();
        mirroredPageCards.push(...rowCards);
      }
      
      mirroredPageCards.forEach(card => {
        if (card) {
          backsGridEl.innerHTML += generateSinglePrintCardHtml(card, 'back', sizeClass);
        } else {
          backsGridEl.innerHTML += `<div class="print-card-wrapper ${sizeClass}" style="border:none !important;"></div>`;
        }
      });
      
      elements.printArea.appendChild(backsPageEl);
    }
  }

  // After print elements are injected, check and shrink text on each print card back
  document.querySelectorAll('#print-area .card-back-content').forEach(container => {
    fitTextToBox(container);
  });
}

function generateSinglePrintCardHtml(card, side, sizeClass, gridStyle = '') {
  const accentColor = `var(--${card.theme || 'cyan'}-primary)`;
  const accentColorRgb = `var(--${card.theme || 'cyan'}-rgb)`;
  
  if (card.id === 'IDX') {
    const title = side === 'front' ? 'DECK INDEX • PART 1' : 'DECK INDEX • PART 2';
    const listHtml = side === 'front' ? card.front.indexHtml : card.back.indexHtml;
    return `
      <div class="print-card-wrapper ${sizeClass}" style="--theme-color: var(--cyan-primary); --theme-color-rgb: var(--cyan-rgb); ${gridStyle}">
        <div class="print-card">
          <div class="card-frame" style="justify-content: flex-start; align-items: stretch; padding: 12px;">
            <div class="index-card-header" style="font-family: var(--font-mono); font-size: 0.58rem; font-weight: 700; border-bottom: 1.5px solid var(--cyan-primary); text-align: center; text-transform: uppercase; padding-bottom: 3px; margin-bottom: 6px;">${title}</div>
            <ul class="index-card-list" style="list-style: none; padding: 0; margin: 0; font-family: var(--font-card); font-size: 0.52rem; line-height: 1.3; color: #000000;">
              ${listHtml}
            </ul>
            <div class="card-front-watermark" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 0.45rem; opacity: 0.3;">yaadcard.in</div>
          </div>
        </div>
      </div>
    `;
  }
  
  if (side === 'front') {
    return `
      <div class="print-card-wrapper ${sizeClass}" style="--theme-color: ${accentColor}; --theme-color-rgb: ${accentColorRgb}; ${gridStyle}">
        <div class="print-card">
          <div class="card-frame" style="justify-content: center; align-items: center;">
            <h3 class="card-front-keyword" style="${getFrontFontSizeStyle(card.front.title)}">${escapeHtml(card.front.title).replace(/\s+/g, '<br>')}</h3>
            <div class="card-front-watermark">yaadcard.in</div>
          </div>
        </div>
      </div>
    `;
  } else {
    let tableHtml = '';
    if (card.back.table && card.back.table.headers && card.back.table.rows) {
      const headers = card.back.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('');
      const rows = card.back.table.rows.map(row => {
        const cells = row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      tableHtml = `
        <div class="card-table-wrapper">
          <table class="card-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    let pointsHtml = '';
    if (card.back.key_points && card.back.key_points.length > 0) {
      const points = card.back.key_points.map(p => `<li>${escapeHtml(p)}</li>`).join('');
      pointsHtml = `<ul class="card-points">${points}</ul>`;
    }

    let diagramHtml = '';
    if (card.back.diagram) {
      diagramHtml = `<pre class="card-diagram-block">${escapeHtml(card.back.diagram)}</pre>`;
    }

    return `
      <div class="print-card-wrapper ${sizeClass}" style="--theme-color: ${accentColor}; --theme-color-rgb: ${accentColorRgb}; ${gridStyle}">
        <div class="print-card">
          <div class="card-frame">
            <h4 class="card-back-title" style="font-size:0.9rem;">${escapeHtml(card.back.title || card.front.title)}</h4>
            <div class="card-tagline" style="font-size:0.6rem; height:2.4em;">${escapeHtml(card.back.tagline || "")}</div>
            
            <div class="card-back-content" style="height:1.75in; overflow:hidden;">
              <p class="card-summary">${escapeHtml(card.back.summary || "")}</p>
              ${tableHtml}
              ${pointsHtml}
              ${diagramHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Utility to dynamically calculate font sizes for front card titles based on word lengths to prevent wrapping
function getFrontFontSizeStyle(title) {
  if (!title) return '';
  const words = title.split(/\s+/);
  let maxWordLength = 0;
  for (const w of words) {
    if (w.length > maxWordLength) {
      maxWordLength = w.length;
    }
  }
  
  // Base font size in rem
  let size = 1.45;
  if (maxWordLength > 16) {
    size = 0.8;
  } else if (maxWordLength > 12) {
    size = 0.95;
  } else if (maxWordLength > 10) {
    size = 1.1;
  } else if (maxWordLength > 8) {
    size = 1.25;
  }
  
  // Downscale further if total length is long to ensure no wrapping
  const totalLength = title.length;
  if (totalLength > 24) {
    size = Math.min(size, 0.85);
  } else if (totalLength > 18) {
    size = Math.min(size, 1.05);
  } else if (totalLength > 12) {
    size = Math.min(size, 1.25);
  }
  
  return `font-size: ${size}rem !important; white-space: nowrap !important;`;
}
