/**
 * 5cm x 9.5cm Single-Sided Sheet Editor Engine
 * Exactly 27 Cards per A3 / 12x18 Sheet
 */

// Application State
const state = {
  currentCards: [],
  orientation: 'vertical', // Content orientation: 'vertical' (quotes/shayari/portrait) or 'horizontal' (rotated)
  paperSize: '12x18',      // '12x18' (Digital A3) or 'iso-a3'
  previewMode: 'sheet',    // 'sheet' or 'inspector'
  zoom: 50                 // Percentage (30% to 100%)
};

// DOM Elements
const dom = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  topicInput: document.getElementById('prompt-topic-input'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  viewTemplateBtn: document.getElementById('view-template-btn'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
  loadShayariBtn: document.getElementById('load-shayari-btn'),
  loadSampleBtn: document.getElementById('load-sample-btn'),
  printBtn: document.getElementById('print-btn'),
  statCards: document.getElementById('stat-cards'),
  statSheets: document.getElementById('stat-sheets'),
  statGrid: document.getElementById('stat-grid'),
  orientationToggle: document.getElementById('orientation-toggle'),
  paperToggle: document.getElementById('paper-toggle'),
  previewModeToggle: document.getElementById('preview-mode-toggle'),
  zoomSlider: document.getElementById('zoom-slider'),
  zoomVal: document.getElementById('zoom-val'),
  screenPreviewContent: document.getElementById('screen-preview-content'),
  printArea: document.getElementById('print-area'),
  
  // Modal elements
  templateModal: document.getElementById('template-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalPromptText: document.getElementById('modal-prompt-text'),
  modalCopyPromptBtn: document.getElementById('modal-copy-prompt-btn'),
  modalCopyJsonBtn: document.getElementById('modal-copy-json-btn')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initDynamicPageStyle();
  initOrientationAndPaper();
  initPromptModal();
  initJSONImporter();
  initPreviewControls();
  initGlobalActions();

  // Load default 27-card Quotes & Shayari pack
  loadSamplePack('shayari_quotes_27');
});

// Re-render KaTeX when window and fonts finish loading completely
window.addEventListener('load', () => {
  renderKaTeX(dom.screenPreviewContent);
  renderKaTeX(dom.printArea);
});

// Keep print area fresh before printing
window.addEventListener('beforeprint', () => {
  updatePrintArea();
});

/* ==========================================================================
   Dynamic @page CSS Rules (Always Landscape Sheet for 27-Card Grid)
   ========================================================================== */

function initDynamicPageStyle() {
  updatePrintPageStyle();
}

function updatePrintPageStyle() {
  let styleEl = document.getElementById('dynamic-print-page-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-print-page-style';
    document.head.appendChild(styleEl);
  }

  // The sheet orientation is FIXED to landscape (18in x 12in or A3 Landscape)
  let sizeDesc = state.paperSize === 'iso-a3' ? 'A3 landscape' : '18in 12in landscape';

  styleEl.textContent = `
    @page {
      size: ${sizeDesc} !important;
      margin: 0 !important;
    }
  `;
}

/* ==========================================================================
   AI Prompt & JSON Template Generator (Tailored for 27 Cards on 5cm x 9.5cm)
   ========================================================================== */

function getAiPrompt(topic) {
  const chosenTopic = topic && topic.trim() ? topic.trim() : "Quotes & Shayari";
  const isQuoteTopic = /quote|shayari|poetry|sher|poem|wisdom|philosophy|literature|ghalib|iqbal/i.test(chosenTopic);

  if (isQuoteTopic) {
    return `Act as an expert literary curator and typographer.
Create a collection of 27 memorable, inspiring quotes or shayari about: "${chosenTopic}".
Generate EXACTLY 27 cards (fits perfectly on 1 single-sided A3 / 12x18 sheet without paper waste).

CARD DIMENSIONS & DESIGN RULES:
1. PHYSICAL CARD SIZE: 5cm × 9.5cm (Aspect Ratio 5:9.5).
2. SINGLE-SIDED: Large, beautiful typography for vertical reading.
3. CONCISE & MEMORABLE:
   - 'quote': The quote or shayari couplet (2-4 lines, max 30 words). Use \\n for line breaks between verses.
   - 'author': The poet, philosopher, or speaker name.
   - 'title': Short title or keyword (optional).
   - 'summary': (Optional) 1-line English translation or meaning.
   - 'category': Sub-category (e.g. "Urdu Shayari", "Philosophy", "Motivation").
   - 'theme': One of 'cyan', 'orange', 'purple', 'emerald', 'gold', 'rose', 'blue'.

Respond ONLY with a raw JSON array:
[
  {
    "id": 1,
    "category": "${chosenTopic}",
    "theme": "purple",
    "quote": "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\\nबहुत निकले मिरे अरमान लेकिन फिर भी कम निकले",
    "author": "मिर्ज़ा ग़ालिब",
    "summary": "Human desires are endless; no matter how many are fulfilled, countless more remain."
  }
]`;
  }

  return `Act as an expert educational content writer and high-yield flashcard designer.
Create a high-yield study flashcard set about the topic: "${chosenTopic}".
Generate EXACTLY 27 flashcards (fits perfectly on 1 single-sided A3 sheet without paper waste).

STRICT CARD DIMENSIONS & SINGLE-SIDED DESIGN:
1. PHYSICAL CARD SIZE: 5cm × 9.5cm (Aspect Ratio 5:9.5).
2. SINGLE-SIDED FORMAT: All high-yield content is on ONE single side. There is NO back side. Everything must fit comfortably within the 5cm × 9.5cm physical card boundary.
3. CONCISE HIGH-YIELD CONTENT: Focus on core formulas, exam keywords, rules, and memory aids. Obey these character & word limits strictly:
   - 'title': Max 4 words (max 25 chars). The key concept or keyword.
   - 'tagline': Max 8 words (max 45 chars). A punchy 1-line definition or hook.
   - 'summary': Max 20 words (max 110 chars). Clear, essential explanation.
   - 'key_points': Array of 1 or 2 bullet points. Each point max 12 words (max 65 chars).
   - 'table': (Optional) 2 columns, max 2-3 rows. Cells must be very concise (max 3 words per cell).
   - 'diagram': (Optional) Monospace ASCII diagram or flow (e.g. "[A] ──> [B]"). Max 2 lines.
   - 'mnemonic': (Optional) Short memorable memory tip (e.g. "Fast speed = Low pressure").
4. LATEX FORMULAS: Render all mathematical formulas, chemical equations, or quantitative expressions using beautiful LaTeX formatting. Wrap inline formulas in single dollar signs (e.g. $E=mc^2$) and display/block equations in double dollar signs (e.g. $$\\text{FV} = \\text{PV} \\times (1 + r)^n$$). Ensure you double-escape backslashes in JSON strings (use \\\\text and \\\\frac).
5. THEMES: Assign a theme ('cyan', 'orange', 'purple', 'emerald', 'gold', 'rose', 'blue') for visual grouping across subtopics.

You MUST respond ONLY with a raw JSON array of card objects conforming to the schema below. Do not write any markdown code fences or explanations before or after the JSON:

[
  {
    "id": 1,
    "category": "${chosenTopic}",
    "theme": "cyan",
    "title": "Time Value of Money",
    "tagline": "A rupee today is worth more than a rupee tomorrow.",
    "summary": "Fundamental principle that money's purchasing power changes over time due to earning capacity and inflation.",
    "key_points": [
      "Compounding: $\\\\text{FV} = \\\\text{PV} \\\\times (1 + r)^n$",
      "Discounting: $\\\\text{PV} = \\\\frac{\\\\text{FV}}{(1 + r)^n}$"
    ],
    "mnemonic": "P-V-F: Present + Velocity of interest = Future value"
  }
]`;
}

function getJsonSchemaExample() {
  return `// Quotes & Shayari Format:
[
  {
    "id": 1,
    "category": "Quotes & Shayari",
    "theme": "purple",
    "quote": "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\\nबहुत निकले मिरे अरमान लेकिन फिर भी कम निकले",
    "author": "मिर्ज़ा ग़ालिब",
    "summary": "Desires are endless; no matter how many are fulfilled, more remain."
  }
]

// Or Study Flashcards Format:
[
  {
    "id": 1,
    "category": "Subject Name",
    "theme": "cyan",
    "title": "Core Keyword",
    "tagline": "One-line definition or hook.",
    "summary": "Essential high-yield explanation of the concept.",
    "key_points": [
      "Key rule or formula: $E = mc^2$"
    ]
  }
]`;
}

/* ==========================================================================
   Prompt Modal & Copy Actions
   ========================================================================== */

function initPromptModal() {
  function updateModalContent() {
    dom.modalPromptText.textContent = getAiPrompt(dom.topicInput.value);
  }

  dom.viewTemplateBtn.addEventListener('click', () => {
    updateModalContent();
    dom.templateModal.classList.add('open');
  });

  dom.modalCloseBtn.addEventListener('click', () => {
    dom.templateModal.classList.remove('open');
  });

  dom.templateModal.addEventListener('click', (e) => {
    if (e.target === dom.templateModal) {
      dom.templateModal.classList.remove('open');
    }
  });

  dom.copyPromptBtn.addEventListener('click', () => {
    const text = getAiPrompt(dom.topicInput.value);
    copyTextToClipboard(text, dom.copyPromptBtn, '📋 27-Card Prompt Copied!');
  });

  dom.modalCopyPromptBtn.addEventListener('click', () => {
    const text = getAiPrompt(dom.topicInput.value);
    copyTextToClipboard(text, dom.modalCopyPromptBtn, '📋 Copied!');
  });

  dom.modalCopyJsonBtn.addEventListener('click', () => {
    const text = getJsonSchemaExample();
    copyTextToClipboard(text, dom.modalCopyJsonBtn, '📋 Schema Copied!');
  });
}

function copyTextToClipboard(text, buttonEl, successMsg) {
  navigator.clipboard.writeText(text)
    .then(() => {
      const origHtml = buttonEl.innerHTML;
      buttonEl.innerHTML = successMsg;
      buttonEl.style.background = '#10b981';
      setTimeout(() => {
        buttonEl.innerHTML = origHtml;
        buttonEl.style.background = '';
      }, 2000);
    })
    .catch(err => {
      alert('Could not copy to clipboard: ' + err);
    });
}

/* ==========================================================================
   JSON Import & Validator (Supports both Single-Sided and Legacy Front/Back)
   ========================================================================== */

function initJSONImporter() {
  dom.jsonInput.addEventListener('input', () => {
    performValidation(dom.jsonInput.value.trim());
  });

  dom.pasteValidateBtn.addEventListener('click', async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText.trim()) {
        dom.jsonInput.value = clipboardText.trim();
      }
    } catch (e) {
      // Permission fallback
    }
    performValidation(dom.jsonInput.value.trim());
  });
}

function performValidation(rawVal) {
  if (!rawVal) {
    dom.validationStatus.className = 'validation-badge';
    dom.validationStatus.style.display = 'none';
    state.currentCards = [];
    updateStats();
    renderScreenPreview();
    updatePrintArea();
    return;
  }

  try {
    let cleanJson = rawVal;
    // Strip markdown code block fences if present (e.g. ```json ... ```)
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```[a-z]*\s*/i, '').replace(/```\s*$/, '').trim();
    }

    const parsed = JSON.parse(cleanJson);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array of card objects (e.g. [ { ... }, { ... } ]).");
    }

    if (parsed.length === 0) {
      throw new Error("The array is empty. Please provide card objects.");
    }

    // Normalize cards: support both new single-sided format and older front/back format
    state.currentCards = parsed.map((c, index) => {
      // If legacy format with front & back
      if (c.front || c.back) {
        const frontTitle = (c.front && c.front.title) || "";
        const backTitle = (c.back && c.back.title) || "";
        const title = frontTitle || backTitle || `Card ${index + 1}`;
        const tagline = (c.back && c.back.tagline) || "";
        const summary = (c.back && c.back.summary) || "";
        const key_points = (c.back && c.back.key_points) || [];
        const table = (c.back && c.back.table) || null;
        const diagram = (c.back && c.back.diagram) || "";
        const mnemonic = (c.back && c.back.mnemonic) || "";

        return {
          id: c.id || (index + 1),
          category: c.category || "General",
          theme: c.theme || "cyan",
          title,
          tagline,
          summary,
          key_points,
          table,
          diagram,
          mnemonic
        };
      }

      // Standard card format (supporting quotes, shayari, poetry, and study flashcards)
      const quote = c.quote || c.shayari || c.verse || "";
      const author = c.author || c.poet || c.by || "";
      const meaning = c.meaning || c.translation || "";
      const title = c.title || (author ? author : (quote ? "Quote" : `Card ${index + 1}`));

      return {
        id: c.id || (index + 1),
        category: c.category || "General",
        theme: c.theme || "cyan",
        title,
        tagline: c.tagline || "",
        summary: c.summary || "",
        quote,
        author,
        meaning,
        key_points: Array.isArray(c.key_points) ? c.key_points : [],
        table: c.table || null,
        diagram: c.diagram || "",
        mnemonic: c.mnemonic || ""
      };
    });

    const cardCount = state.currentCards.length;
    const sheetsCount = Math.ceil(cardCount / 27);
    
    dom.validationStatus.className = 'validation-badge success';
    dom.validationStatus.innerHTML = `✓ Valid JSON! Loaded ${cardCount} card${cardCount !== 1 ? 's' : ''} (${sheetsCount} sheet${sheetsCount !== 1 ? 's' : ''}).`;
    dom.validationStatus.style.display = 'inline-flex';

    updateStats();
    renderScreenPreview();
    updatePrintArea();

  } catch (err) {
    dom.validationStatus.className = 'validation-badge error';
    dom.validationStatus.innerHTML = `✕ JSON Error: ${err.message}`;
    dom.validationStatus.style.display = 'inline-flex';
  }
}

function updateStats() {
  const count = state.currentCards.length;
  const sheets = count > 0 ? Math.ceil(count / 27) : 0;

  dom.statCards.textContent = `${count} card${count !== 1 ? 's' : ''}`;
  dom.statSheets.textContent = sheets === 1 ? '1 Sheet (Exact 27 Fit)' : `${sheets} sheet${sheets !== 1 ? 's' : ''}`;

  dom.statGrid.textContent = '9 × 3 (27 Cards per Sheet)';
}

/* ==========================================================================
   Content Orientation & Paper Size Switchers
   ========================================================================== */

function initOrientationAndPaper() {
  // Content orientation pills (Vertical / Quotes vs Horizontal)
  dom.orientationToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.orientationToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.orientation = btn.dataset.orientation;
      document.body.setAttribute('data-orientation', state.orientation);
      document.body.setAttribute('data-content-orientation', state.orientation);
      // Page and card dimensions NEVER change orientation
      updateStats();
      renderScreenPreview();
      updatePrintArea();
    });
  });

  // Paper size pills
  dom.paperToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.paperToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.paperSize = btn.dataset.paper;
      document.body.setAttribute('data-paper', state.paperSize);
      updatePrintPageStyle();
      renderScreenPreview();
      updatePrintArea();
    });
  });
}

/* ==========================================================================
   Interactive Screen Preview & Zoom Controls
   ========================================================================== */

function initPreviewControls() {
  // Preview Mode: Sheet vs Inspector
  dom.previewModeToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.previewModeToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.previewMode = btn.dataset.mode;
      
      const zoomControl = document.getElementById('zoom-controls');
      if (state.previewMode === 'inspector') {
        zoomControl.style.display = 'none';
      } else {
        zoomControl.style.display = 'flex';
      }
      
      renderScreenPreview();
    });
  });

  // Zoom slider
  dom.zoomSlider.addEventListener('input', (e) => {
    state.zoom = e.target.value;
    dom.zoomVal.textContent = `${state.zoom}%`;
    dom.screenPreviewContent.style.transform = `scale(${state.zoom / 100})`;
  });
}

function renderScreenPreview() {
  dom.screenPreviewContent.innerHTML = '';
  if (state.currentCards.length === 0) {
    dom.screenPreviewContent.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 40px;">
        No cards loaded. Click <strong>"Load 27-Card Sample"</strong> or paste your JSON above.
      </div>
    `;
    return;
  }

  if (state.previewMode === 'inspector') {
    // Gallery / Inspector mode: show larger readable cards
    dom.screenPreviewContent.style.transform = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'inspector-carousel';
    
    state.currentCards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.innerHTML = renderSingleCardHtml(card, state.orientation, true);
      gallery.appendChild(cardEl.firstElementChild);
    });

    dom.screenPreviewContent.appendChild(gallery);
  } else {
    // Sheet Grid mode: show actual 27-card printable sheet representation
    dom.screenPreviewContent.style.transform = `scale(${state.zoom / 100})`;
    const sheets = generateSheetsHtml(state.currentCards, state.orientation, false);
    dom.screenPreviewContent.innerHTML = sheets;
  }

  // Auto-fit text & trigger KaTeX rendering
  fitAllCardText(dom.screenPreviewContent);
  renderKaTeX(dom.screenPreviewContent);
}

/* ==========================================================================
   Print Engine & Document Generation
   ========================================================================== */

function initGlobalActions() {
  if (dom.loadShayariBtn) {
    dom.loadShayariBtn.addEventListener('click', () => {
      loadSamplePack('shayari_quotes_27');
    });
  }

  dom.loadSampleBtn.addEventListener('click', () => {
    loadSamplePack('finance_27');
  });

  dom.printBtn.addEventListener('click', () => {
    triggerPrint();
  });
}

function loadSamplePack(packId) {
  if (SAMPLE_PACKS[packId]) {
    const pack = SAMPLE_PACKS[packId];
    dom.jsonInput.value = JSON.stringify(pack.cards, null, 2);
    dom.topicInput.value = pack.name.replace(/\s*\(\d+\s*Cards\)/i, '');
    performValidation(dom.jsonInput.value.trim());
  }
}

function updatePrintArea() {
  if (state.currentCards.length === 0) {
    dom.printArea.innerHTML = '';
    return;
  }

  dom.printArea.innerHTML = generateSheetsHtml(state.currentCards, state.orientation, true);
  fitAllCardText(dom.printArea);
  renderKaTeX(dom.printArea);
}

function triggerPrint() {
  if (state.currentCards.length === 0) {
    alert("Please paste or load cards before printing.");
    return;
  }

  updatePrintArea();

  // Allow browser layout engine a brief moment to update rendering tree
  setTimeout(() => {
    window.print();
  }, 250);
}

/**
 * Generates HTML for complete sheets (27 cards per sheet)
 */
function generateSheetsHtml(cards, orientation, isPrintArea) {
  const cardsPerSheet = 27;
  const totalSheets = Math.ceil(cards.length / cardsPerSheet);
  let html = '';

  for (let s = 0; s < totalSheets; s++) {
    const sheetCards = cards.slice(s * cardsPerSheet, (s + 1) * cardsPerSheet);
    
    // Pad to 27 cards if needed so the grid stays locked in place
    while (sheetCards.length < cardsPerSheet) {
      sheetCards.push(null);
    }

    const sheetCategory = (cards[s * cardsPerSheet] && cards[s * cardsPerSheet].category) 
      ? cards[s * cardsPerSheet].category.toUpperCase() 
      : "DECK";

    html += `
      <div class="print-page">
        <div class="print-page-header">
          <span>${escapeHtml(sheetCategory)}</span>
          <span>SHEET ${s + 1} OF ${totalSheets} • 27 CARDS (${orientation === 'vertical' ? 'VERTICAL TEXT' : 'HORIZONTAL TEXT'})</span>
        </div>
        
        <div class="print-grid">
          ${sheetCards.map(c => renderCardSlot(c, orientation)).join('')}
        </div>

        <div class="print-page-footer">
          <span>Single-Sided Print • Cut along border lines</span>
          <span>27 Cards • 5cm × 9.5cm Format</span>
        </div>
      </div>
    `;
  }

  return html;
}

function renderCardSlot(card, orientation) {
  if (!card) {
    // Empty placeholder slot with cutting borders preserved
    return `<div class="print-card-wrapper ${orientation === 'horizontal' ? 'card-horizontal' : ''}" style="border-right: 0.5px dashed #cbd5e1 !important; border-bottom: 0.5px dashed #cbd5e1 !important; background: #ffffff !important;"></div>`;
  }
  return renderSingleCardHtml(card, orientation, false);
}

/**
 * Renders HTML for 1 Single-Sided Card (5cm x 9.5cm with Vertical or Rotated Horizontal Content)
 */
function renderSingleCardHtml(card, orientation, isInspector) {
  const theme = card.theme || 'cyan';
  const themeColor = `var(--${theme}-primary)`;
  const themeRgb = `var(--${theme}-rgb)`;
  const isHorizontal = orientation === 'horizontal';
  const wrapperClass = isHorizontal ? 'print-card-wrapper card-horizontal' : 'print-card-wrapper';
  const inspectorStyle = isInspector ? (isHorizontal ? 'width: 140mm !important; height: 75mm !important;' : 'width: 75mm !important; height: 140mm !important;') : '';

  // Quotes / Shayari Content Detection
  const quoteText = card.quote || card.shayari || card.verse || '';
  const authorText = card.author || card.poet || card.by || (quoteText ? card.tagline : '');
  const meaningText = card.meaning || card.translation || '';

  // Optional Elements: Table
  let tableHtml = '';
  if (card.table && card.table.headers && card.table.rows && card.table.rows.length > 0) {
    const ths = card.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('');
    const trs = card.table.rows.map(row => {
      const tds = row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    tableHtml = `
      <div class="card-table-wrapper">
        <table class="card-table">
          <thead><tr>${ths}</tr></thead>
          <tbody>${trs}</tbody>
        </table>
      </div>
    `;
  }

  // Optional Elements: Key Points
  let pointsHtml = '';
  if (card.key_points && card.key_points.length > 0) {
    const lis = card.key_points.map(p => `<li>${escapeHtml(p)}</li>`).join('');
    pointsHtml = `<ul class="card-keypoints">${lis}</ul>`;
  }

  // Optional Elements: Diagram
  let diagramHtml = '';
  if (card.diagram && card.diagram.trim()) {
    diagramHtml = `<pre class="card-diagram-block">${escapeHtml(card.diagram)}</pre>`;
  }

  // Optional Elements: Mnemonic
  let mnemonicHtml = '';
  if (card.mnemonic && card.mnemonic.trim()) {
    mnemonicHtml = `<div class="card-mnemonic-box">💡 <strong>Tip:</strong> ${escapeHtml(card.mnemonic)}</div>`;
  }

  const categoryText = escapeHtml(card.category || "General");
  const titleText = escapeHtml(card.title || "");
  const taglineText = escapeHtml(card.tagline || "");
  const summaryText = escapeHtml(card.summary || "");

  // Content body for quotes vs standard card
  let bodyHtml = '';
  if (quoteText) {
    bodyHtml = `
      <div class="card-quote-layout">
        <div class="card-quote-mark">“</div>
        <p class="card-quote-text">${escapeHtml(quoteText)}</p>
        ${authorText ? `<div class="card-quote-author">— ${escapeHtml(authorText)}</div>` : ''}
        ${meaningText ? `<div class="card-quote-meaning">${escapeHtml(meaningText)}</div>` : ''}
      </div>
    `;
  } else {
    bodyHtml = `
      <div class="card-body-content">
        ${summaryText ? `<p class="card-summary">${summaryText}</p>` : ''}
        ${tableHtml}
        ${pointsHtml}
        ${diagramHtml}
        ${mnemonicHtml}
      </div>
    `;
  }

  // VERTICAL CONTENT CARD LAYOUT (Upright portrait reading)
  if (!isHorizontal) {
    return `
      <div class="${wrapperClass}" style="--theme-color: ${themeColor}; --theme-color-rgb: ${themeRgb}; ${inspectorStyle}">
        <div class="print-card">
          <div class="card-frame">
            <!-- Top Bar without # numbering -->
            <div class="card-top-bar">
              <span class="card-category-badge">${categoryText}</span>
            </div>

            <!-- Title & Tagline (Hidden if pure quote card without title) -->
            ${!quoteText && titleText ? `
              <div class="card-title-block">
                <h4 class="card-main-title">${titleText}</h4>
                ${taglineText ? `<div class="card-tagline">${taglineText}</div>` : ''}
              </div>
            ` : ''}

            <!-- Core Content (Quotes, Shayari, or Study Data) -->
            ${bodyHtml}
          </div>
        </div>
      </div>
    `;
  }

  // HORIZONTAL CONTENT CARD LAYOUT (Rotated for landscape reading)
  if (quoteText) {
    return `
      <div class="${wrapperClass}" style="--theme-color: ${themeColor}; --theme-color-rgb: ${themeRgb}; ${inspectorStyle}">
        <div class="print-card">
          <div class="card-frame">
            <!-- Top Bar without # numbering -->
            <div class="card-top-bar">
              <span class="card-category-badge">${categoryText}</span>
            </div>

            <div class="card-quote-layout" style="padding: 0;">
              <div class="card-quote-mark" style="font-size: 1.2rem; line-height: 0.6;">“</div>
              <p class="card-quote-text" style="font-size: 0.85rem; line-height: 1.35;">${escapeHtml(quoteText)}</p>
              ${authorText ? `<div class="card-quote-author" style="margin-top: 0.4mm;">— ${escapeHtml(authorText)}</div>` : ''}
              ${meaningText ? `<div class="card-quote-meaning" style="font-size: 0.54rem;">${escapeHtml(meaningText)}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="${wrapperClass}" style="--theme-color: ${themeColor}; --theme-color-rgb: ${themeRgb}; ${inspectorStyle}">
      <div class="print-card">
        <div class="card-frame">
          <!-- Top Bar without # numbering -->
          <div class="card-top-bar">
            <span class="card-category-badge">${categoryText}</span>
          </div>

          <!-- 2-Column Split for Horizontal Format -->
          <div class="card-horizontal-split">
            <div class="card-col-left">
              <h4 class="card-main-title">${titleText}</h4>
              ${taglineText ? `<div class="card-tagline">${taglineText}</div>` : ''}
              ${summaryText ? `<p class="card-summary">${summaryText}</p>` : ''}
              ${mnemonicHtml}
            </div>
            
            <div class="card-col-right">
              ${tableHtml}
              ${pointsHtml}
              ${diagramHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   Text Fitting & KaTeX Rendering Helpers
   ========================================================================= */

/**
 * Dynamically adjusts font size if card content exceeds physical card height
 */
function fitAllCardText(rootEl) {
  rootEl.querySelectorAll('.card-frame').forEach(frame => {
    let attempts = 0;
    let title = frame.querySelector('.card-main-title');
    let quote = frame.querySelector('.card-quote-text');
    let summary = frame.querySelector('.card-summary');
    let content = frame.querySelector('.card-body-content') || frame.querySelector('.card-horizontal-split') || frame.querySelector('.card-quote-layout');

    while (frame.scrollHeight > frame.clientHeight && attempts < 10) {
      attempts++;
      if (title) {
        const curSize = parseFloat(window.getComputedStyle(title).fontSize);
        if (curSize > 11) title.style.fontSize = `${curSize - 0.4}px`;
      }
      if (quote) {
        const curSize = parseFloat(window.getComputedStyle(quote).fontSize);
        if (curSize > 10) quote.style.fontSize = `${curSize - 0.3}px`;
      }
      if (summary) {
        const curSize = parseFloat(window.getComputedStyle(summary).fontSize);
        if (curSize > 9.5) summary.style.fontSize = `${curSize - 0.25}px`;
      }
      if (content) {
        const curSize = parseFloat(window.getComputedStyle(content).fontSize);
        if (curSize > 9.0) content.style.fontSize = `${curSize - 0.25}px`;
      }
    }
  });
}

function renderKaTeX(containerEl) {
  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(containerEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn("KaTeX rendering warning:", e);
    }
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
