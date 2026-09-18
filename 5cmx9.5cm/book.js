/**
 * Book Summaries & Self-Help Deck Engine (5cm x 9.5cm • 27 Cards per Sheet)
 * Point & Explanation cards for books like 48 Laws of Power, Atomic Habits, etc.
 */

// Application State
const state = {
  currentCards: [],
  orientation: 'vertical', // 'vertical' or 'horizontal' (inside text rotation)
  fontSize: '9.5pt',
  paperSize: '12x18',
  previewMode: 'sheet',
  zoom: 50
};

// 12 Vibrant Theme Colors for Card Borders
const BOOK_COLOR_PALETTE = ['cyan', 'orange', 'purple', 'emerald', 'gold', 'rose', 'blue', 'teal', 'coral', 'violet', 'indigo', 'amber'];

// DOM Elements
const dom = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  topicInput: document.getElementById('prompt-topic-input'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  viewTemplateBtn: document.getElementById('view-template-btn'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
  loadBookBtn: document.getElementById('load-book-btn'),
  loadBook54Btn: document.getElementById('load-book-54-btn'),
  addSheetBtn: document.getElementById('add-sheet-btn'),
  clearBtn: document.getElementById('clear-btn'),
  printBtn: document.getElementById('print-btn'),
  statCards: document.getElementById('stat-cards'),
  statSheets: document.getElementById('stat-sheets'),
  statGrid: document.getElementById('stat-grid'),
  orientationToggle: document.getElementById('orientation-toggle'),
  paperToggle: document.getElementById('paper-toggle'),
  previewModeToggle: document.getElementById('preview-mode-toggle'),
  zoomSlider: document.getElementById('zoom-slider'),
  zoomVal: document.getElementById('zoom-val'),
  fontSizeSelect: document.getElementById('font-size-select'),
  screenPreviewContent: document.getElementById('screen-preview-content'),
  printArea: document.getElementById('print-area'),

  // Modal
  templateModal: document.getElementById('template-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalPromptText: document.getElementById('modal-prompt-text'),
  modalCopyPromptBtn: document.getElementById('modal-copy-prompt-btn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initOrientationToggle();
  initPaperToggle();
  initPreviewControls();
  initPromptModal();
  initFontSizeControl();
  initJSONActions();
  initCardEditModal();
  initGlobalActions();

  // Check URL param for orientation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('orientation') === 'horizontal') {
    state.orientation = 'horizontal';
    if (dom.orientationToggle) {
      dom.orientationToggle.querySelectorAll('.pill-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.orientation === 'horizontal');
      });
    }
  }

  if (urlParams.get('demo') === '54') {
    loadBookPack54();
  } else {
    loadDefaultBookPack();
  }
});

function initOrientationToggle() {
  if (!dom.orientationToggle) return;
  dom.orientationToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.orientationToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.orientation = btn.dataset.orientation;
      renderPreview();
      updatePrintArea();
    });
  });
}

function initPaperToggle() {
  if (!dom.paperToggle) return;
  dom.paperToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.paperToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.paperSize = btn.dataset.paper;
      document.body.setAttribute('data-paper', state.paperSize);
      renderPreview();
      updatePrintArea();
    });
  });
}

function initPreviewControls() {
  if (dom.previewModeToggle) {
    dom.previewModeToggle.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.previewModeToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.previewMode = btn.dataset.mode;
        
        const zoomControl = document.getElementById('zoom-controls');
        if (state.previewMode === 'inspector') {
          if (zoomControl) zoomControl.style.display = 'none';
        } else {
          if (zoomControl) zoomControl.style.display = 'flex';
        }
        
        renderPreview();
      });
    });
  }

  if (dom.zoomSlider) {
    dom.zoomSlider.addEventListener('input', (e) => {
      state.zoom = e.target.value;
      if (dom.zoomVal) dom.zoomVal.textContent = `${state.zoom}%`;
      dom.screenPreviewContent.style.transform = `scale(${state.zoom / 100})`;
    });
  }
}

function initPromptModal() {
  if (dom.viewTemplateBtn && dom.templateModal) {
    dom.viewTemplateBtn.addEventListener('click', () => {
      const book = dom.topicInput ? dom.topicInput.value.trim() : "The 48 Laws of Power";
      if (dom.modalPromptText) {
        dom.modalPromptText.textContent = getBookAiPrompt(book);
      }
      dom.templateModal.classList.add('open');
    });
  }

  if (dom.modalCloseBtn && dom.templateModal) {
    dom.modalCloseBtn.addEventListener('click', () => {
      dom.templateModal.classList.remove('open');
    });
  }

  if (dom.copyPromptBtn) {
    dom.copyPromptBtn.addEventListener('click', () => {
      const book = dom.topicInput ? dom.topicInput.value.trim() : "The 48 Laws of Power";
      navigator.clipboard.writeText(getBookAiPrompt(book));
      alert(`AI Prompt for "${book}" copied to clipboard!`);
    });
  }

  if (dom.modalCopyPromptBtn) {
    dom.modalCopyPromptBtn.addEventListener('click', () => {
      const book = dom.topicInput ? dom.topicInput.value.trim() : "The 48 Laws of Power";
      navigator.clipboard.writeText(getBookAiPrompt(book));
      alert("Full Prompt copied to clipboard!");
    });
  }
}

function getBookAiPrompt(book) {
  return `Generate an actionable 27-card summary deck for the book: "${book}".
Format each card with the core principle/law and its clear explanation underneath so readers can easily remember what was in the book.
Produce valid JSON containing an array of exactly 27 card objects.

JSON Structure for each card:
{
  "number": "LAW 01" (or "RULE 01", "HABIT 01", etc.),
  "title": "Clear Principle / Law Title",
  "explanation": "2-3 clear sentences explaining the underlying psychological principle and how it works in real life.",
  "takeaway": "1-sentence memorable rule of thumb or action step."
}

Important:
- Make the explanations clear, insightful, and memorable.
- Return ONLY the raw JSON array of 27 objects.`;
}

function initJSONActions() {
  if (dom.jsonInput) {
    dom.jsonInput.addEventListener('input', () => {
      validateAndLoad(dom.jsonInput.value);
    });
  }

  if (dom.pasteValidateBtn) {
    dom.pasteValidateBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          dom.jsonInput.value = text;
          validateAndLoad(text);
        }
      } catch (err) {
        validateAndLoad(dom.jsonInput.value);
      }
    });
  }
}

function initFontSizeControl() {
  if (!dom.fontSizeSelect) return;
  dom.fontSizeSelect.addEventListener('change', (e) => {
    state.fontSize = e.target.value;
    document.documentElement.style.setProperty('--book-base-fs', state.fontSize);
    renderPreview();
    updatePrintArea();
  });
}

function initGlobalActions() {
  if (dom.addSheetBtn) {
    dom.addSheetBtn.addEventListener('click', () => {
      addAnotherPage();
    });
  }

  if (dom.loadBookBtn) {
    dom.loadBookBtn.addEventListener('click', () => {
      loadDefaultBookPack();
    });
  }

  if (dom.loadBook54Btn) {
    dom.loadBook54Btn.addEventListener('click', () => {
      loadBookPack54();
    });
  }

  if (dom.clearBtn) {
    dom.clearBtn.addEventListener('click', () => {
      dom.jsonInput.value = '';
      state.currentCards = [];
      updateStats();
      renderPreview();
      updatePrintArea();
      if (dom.validationStatus) dom.validationStatus.style.display = 'none';
    });
  }

  if (dom.printBtn) {
    dom.printBtn.addEventListener('click', () => {
      if (state.currentCards.length === 0) {
        alert("Please load or paste book summary cards before printing.");
        return;
      }
      updatePrintArea();
      setTimeout(() => {
        window.print();
      }, 250);
    });
  }
}

function loadDefaultBookPack() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.laws_of_power_27) {
    const pack = SAMPLE_PACKS.laws_of_power_27;
    dom.jsonInput.value = JSON.stringify(pack.cards, null, 2);
    if (dom.topicInput) dom.topicInput.value = pack.book;
    validateAndLoad(dom.jsonInput.value);
  }
}

function loadBookPack54() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.laws_of_power_54) {
    const pack = SAMPLE_PACKS.laws_of_power_54;
    dom.jsonInput.value = JSON.stringify(pack.cards, null, 2);
    if (dom.topicInput) dom.topicInput.value = pack.book;
    validateAndLoad(dom.jsonInput.value);
  }
}

function addAnotherPage() {
  const currentCount = state.currentCards.length;
  const startNum = currentCount + 1;
  for (let i = 0; i < 27; i++) {
    const num = startNum + i;
    state.currentCards.push({
      number: `LAW ${String(num).padStart(2, '0')}`,
      title: `Principle / Rule ${num}`,
      explanation: "Detailed breakdown of the psychological insight and practical implementation.",
      takeaway: "1-sentence memorable rule of thumb."
    });
  }
  if (dom.jsonInput) {
    dom.jsonInput.value = JSON.stringify(state.currentCards, null, 2);
  }
  updateStats();
  renderPreview();
  updatePrintArea();
}

function validateAndLoad(rawText) {
  const text = rawText.trim();
  if (!text) {
    state.currentCards = [];
    updateStats();
    renderPreview();
    updatePrintArea();
    if (dom.validationStatus) dom.validationStatus.style.display = 'none';
    return;
  }

  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("Input JSON must be an array of card objects.");
    }

    state.currentCards = parsed.map((item, idx) => {
      const paletteTheme = BOOK_COLOR_PALETTE[idx % BOOK_COLOR_PALETTE.length];
      const defaultNumber = `POINT ${String(idx + 1).padStart(2, '0')}`;

      return {
        number: item.number || defaultNumber,
        title: item.title || item.law || item.rule || item.point || `Card ${idx + 1}`,
        explanation: item.explanation || item.summary || item.text || "",
        takeaway: item.takeaway || item.action || item.lesson || "",
        theme: item.theme || paletteTheme,
        fontSize: item.fontSize || undefined
      };
    });

    const count = state.currentCards.length;
    const sheets = Math.ceil(count / 27);
    if (dom.validationStatus) {
      dom.validationStatus.className = 'validation-badge success';
      dom.validationStatus.innerHTML = `✓ Valid JSON! Loaded ${count} book card${count !== 1 ? 's' : ''} (${sheets} sheet${sheets !== 1 ? 's' : ''}).`;
      dom.validationStatus.style.display = 'inline-flex';
    }

    updateStats();
    renderPreview();
    updatePrintArea();

  } catch (err) {
    if (dom.validationStatus) {
      dom.validationStatus.className = 'validation-badge error';
      dom.validationStatus.innerHTML = `✕ JSON Error: ${err.message}`;
      dom.validationStatus.style.display = 'inline-flex';
    }
  }
}

function updateStats() {
  const count = state.currentCards.length;
  const sheets = count > 0 ? Math.ceil(count / 27) : 0;

  if (dom.statCards) dom.statCards.textContent = `${count} card${count !== 1 ? 's' : ''}`;
  if (dom.statSheets) dom.statSheets.textContent = sheets === 1 ? '1 Sheet (Exact 27 Fit)' : `${sheets} Sheets (${sheets * 27} Cards Total)`;
  if (dom.statGrid) dom.statGrid.textContent = `9 × 3 • ${sheets} Page${sheets > 1 ? 's' : ''} (27 / Sheet)`;
}

function renderPreview() {
  if (!dom.screenPreviewContent) return;
  dom.screenPreviewContent.innerHTML = '';

  if (state.currentCards.length === 0) {
    dom.screenPreviewContent.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 40px;">
        No book cards loaded. Click <strong>"Load 27 Laws (1 Sheet)"</strong> or <strong>"Load All 48 Laws (54 Cards)"</strong> or paste your JSON above.
      </div>
    `;
    return;
  }

  if (state.previewMode === 'inspector') {
    dom.screenPreviewContent.style.transform = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'inspector-carousel';
    
    state.currentCards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'print-card-wrapper';
      cardEl.style.cssText = 'width: 60mm !important; height: 114mm !important; box-shadow: 0 4px 12px rgba(0,0,0,0.15); position: relative;';
      cardEl.innerHTML = `
        <button class="card-edit-btn" data-card-index="${idx}" title="Edit Card Text & Font Size">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          <span>Edit</span>
        </button>
        ${renderCardContent(card, state.orientation)}
      `;
      gallery.appendChild(cardEl);
    });

    dom.screenPreviewContent.appendChild(gallery);
  } else {
    dom.screenPreviewContent.style.transform = `scale(${state.zoom / 100})`;
    const sheets = generateSheetsHtml(state.currentCards, state.orientation, false);
    dom.screenPreviewContent.innerHTML = sheets;
  }

  attachCardEditEvents(dom.screenPreviewContent);
}

function updatePrintArea() {
  if (!dom.printArea) return;
  if (state.currentCards.length === 0) {
    dom.printArea.innerHTML = '';
    return;
  }
  dom.printArea.innerHTML = generateSheetsHtml(state.currentCards, state.orientation, true);
}

function generateSheetsHtml(cards, orientation, isPrint) {
  const cardsPerSheet = 27;
  const totalSheets = Math.ceil(cards.length / cardsPerSheet);
  let html = '';

  for (let s = 0; s < totalSheets; s++) {
    const sheetCards = cards.slice(s * cardsPerSheet, (s + 1) * cardsPerSheet);
    
    while (sheetCards.length < cardsPerSheet) {
      sheetCards.push(null);
    }

    html += `
      <div class="print-page">
        <div class="print-page-header">
          <span>YAADCARD • BOOK SUMMARIES</span>
          <span>SHEET ${s + 1} OF ${totalSheets} • 27 CARDS (${(orientation || 'vertical').toUpperCase()} CONTENT)</span>
        </div>
        
        <div class="print-grid">
          ${sheetCards.map((c, idx) => renderCardSlot(c, orientation, isPrint, s * cardsPerSheet + idx)).join('')}
        </div>

        <div class="print-page-footer">
          <span>Single-Sided Print • Cut along border lines</span>
          <span>50mm × 95mm Cards • 27 Cards per Sheet</span>
        </div>
      </div>
    `;
  }

  return html;
}

function renderCardSlot(card, orientation, isPrint, index) {
  if (!card) {
    if (isPrint) {
      return `<div class="print-card-wrapper" style="border-right: 0.5px dashed #cbd5e1 !important; border-bottom: 0.5px dashed #cbd5e1 !important; background: #ffffff !important;"></div>`;
    }
    return `
      <div class="print-card-wrapper" style="border-right: 0.5px dashed #cbd5e1 !important; border-bottom: 0.5px dashed #cbd5e1 !important; background: #ffffff !important; display: flex; align-items: center; justify-content: center;">
        <button class="card-edit-btn" data-card-index="${index}" title="Add Point Here">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>+ Add</span>
        </button>
        <span style="font-size: 5pt; color: #94a3b8; font-family: var(--font-mono); text-transform: uppercase;">Slot ${index + 1}</span>
      </div>
    `;
  }

  const editBtnHtml = !isPrint ? `
    <button class="card-edit-btn" data-card-index="${index}" title="Edit Card Text & Font Size">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
      <span>Edit</span>
    </button>
  ` : '';

  return `
    <div class="print-card-wrapper">
      ${editBtnHtml}
      ${renderCardContent(card, orientation)}
    </div>
  `;
}

function renderCardContent(card, orientation) {
  const themeClass = `theme-${card.theme || 'cyan'}`;
  const isHorizontal = orientation === 'horizontal';
  const fsStyle = card.fontSize ? `--card-custom-fs: ${card.fontSize};` : '';

  // Takeaway block
  let takeawayHtml = '';
  if (card.takeaway) {
    takeawayHtml = `
      <div class="book-takeaway-box">
        <div class="book-takeaway-lbl">CORE TAKEAWAY</div>
        <div class="book-takeaway-text">${escapeHtml(card.takeaway)}</div>
      </div>
    `;
  }

  if (isHorizontal) {
    return `
      <div class="book-card-slot horizontal ${themeClass}" style="${fsStyle}">
        <div class="book-rotate-inner">
          <div class="book-header-row">
            <span class="book-brand">YAADCARD</span>
            <span class="book-law-badge">${escapeHtml(card.number)}</span>
          </div>

          <div class="book-horizontal-grid">
            <div>
              <div class="book-title">${escapeHtml(card.title)}</div>
              <div class="book-explanation">${escapeHtml(card.explanation)}</div>
            </div>

            <div>
              ${takeawayHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Vertical (Portrait Reading Content)
  return `
    <div class="book-card-slot vertical ${themeClass}" style="${fsStyle}">
      <div>
        <div class="book-header-row">
          <span class="book-brand">YAADCARD</span>
          <span class="book-law-badge">${escapeHtml(card.number)}</span>
        </div>

        <div class="book-title">${escapeHtml(card.title)}</div>
        <div class="book-explanation">${escapeHtml(card.explanation)}</div>
      </div>

      ${takeawayHtml}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Card Edit Modal Actions
// --------------------------------------------------------------------------
let activeEditCardIndex = null;

function initCardEditModal() {
  const modal = document.getElementById('card-edit-modal');
  const closeBtn = document.getElementById('card-edit-close-btn');
  const cancelBtn = document.getElementById('card-edit-cancel-btn');
  const saveBtn = document.getElementById('card-edit-save-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeCardEditor);
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', closeCardEditor);
  }
  if (saveBtn) {
    saveBtn.addEventListener('click', saveCardEdit);
  }
}

function attachCardEditEvents(container) {
  if (!container) return;
  container.querySelectorAll('.card-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.cardIndex, 10);
      openCardEditor(idx);
    });
  });
}

function openCardEditor(index) {
  let card = state.currentCards[index];
  if (!card) {
    card = {
      number: `LAW ${String(index + 1).padStart(2, '0')}`,
      title: "",
      explanation: "",
      takeaway: ""
    };
    state.currentCards[index] = card;
  }

  activeEditCardIndex = index;
  const modal = document.getElementById('card-edit-modal');
  const badge = document.getElementById('edit-card-badge');
  const fsSelect = document.getElementById('card-edit-fs');
  const numInput = document.getElementById('card-edit-number');
  const titleInput = document.getElementById('card-edit-title');
  const expInput = document.getElementById('card-edit-explanation');
  const takeawayInput = document.getElementById('card-edit-takeaway');
  const fsHint = document.getElementById('current-fs-hint');

  if (badge) badge.textContent = `Card #${index + 1}`;
  if (fsHint) fsHint.textContent = `Current: ${card.fontSize || state.fontSize}`;
  if (fsSelect) fsSelect.value = card.fontSize || '';
  if (numInput) numInput.value = card.number || '';
  if (titleInput) titleInput.value = card.title || '';
  if (expInput) expInput.value = card.explanation || '';
  if (takeawayInput) takeawayInput.value = card.takeaway || '';

  if (modal) modal.classList.add('open');
}

function closeCardEditor() {
  const modal = document.getElementById('card-edit-modal');
  if (modal) modal.classList.remove('open');
  activeEditCardIndex = null;
}

function saveCardEdit() {
  if (activeEditCardIndex === null) return;
  const card = state.currentCards[activeEditCardIndex];
  if (!card) return;

  const fsSelect = document.getElementById('card-edit-fs');
  const numInput = document.getElementById('card-edit-number');
  const titleInput = document.getElementById('card-edit-title');
  const expInput = document.getElementById('card-edit-explanation');
  const takeawayInput = document.getElementById('card-edit-takeaway');

  if (numInput) card.number = numInput.value;
  if (titleInput) card.title = titleInput.value;
  if (expInput) card.explanation = expInput.value;
  if (takeawayInput) card.takeaway = takeawayInput.value;

  if (fsSelect && fsSelect.value) {
    card.fontSize = fsSelect.value;
  } else {
    delete card.fontSize;
  }

  // Synchronize JSON textarea so user can export
  if (dom.jsonInput) {
    dom.jsonInput.value = JSON.stringify(state.currentCards, null, 2);
  }

  renderPreview();
  updatePrintArea();
  updateStats();
  closeCardEditor();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
