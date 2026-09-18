/**
 * Quotes & Shayari Deck Engine (5cm x 9.5cm • 27 Cards per Sheet)
 * Beautiful typography, large font sizes, vertical/horizontal content orientation.
 */

// Application State
const state = {
  currentCards: [],
  orientation: 'vertical', // 'vertical' or 'horizontal' (inside text rotation)
  fontSize: '13.5pt',
  paperSize: '12x18',
  previewMode: 'sheet',
  zoom: 50
};

// DOM Elements
const dom = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
  loadShayariBtn: document.getElementById('load-shayari-btn'),
  loadShayari54Btn: document.getElementById('load-shayari-54-btn'),
  addSheetBtn: document.getElementById('add-sheet-btn'),
  clearBtn: document.getElementById('clear-btn'),
  printBtn: document.getElementById('print-btn'),
  statCards: document.getElementById('stat-cards'),
  statSheets: document.getElementById('stat-sheets'),
  statGrid: document.getElementById('stat-grid'),
  paperToggle: document.getElementById('paper-toggle'),
  orientationToggle: document.getElementById('orientation-toggle'),
  fontSizeSelect: document.getElementById('font-size-select'),
  previewModeToggle: document.getElementById('preview-mode-toggle'),
  zoomSlider: document.getElementById('zoom-slider'),
  zoomVal: document.getElementById('zoom-val'),
  screenPreviewContent: document.getElementById('screen-preview-content'),
  printArea: document.getElementById('print-area'),

  // Template Modal
  viewTemplateBtn: document.getElementById('view-template-btn'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  templateModal: document.getElementById('template-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalPromptText: document.getElementById('modal-prompt-text'),
  modalCopyPromptBtn: document.getElementById('modal-copy-prompt-btn')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initOrientationToggle();
  initPaperToggle();
  initPreviewControls();
  initCardControls();
  initJSONActions();
  initModalActions();
  initCardEditModal();
  initGlobalActions();

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
    loadShayari54();
  } else {
    loadDefaultShayari();
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

function initCardControls() {
  if (dom.fontSizeSelect) {
    dom.fontSizeSelect.addEventListener('change', (e) => {
      state.fontSize = e.target.value;
      document.documentElement.style.setProperty('--quote-font-size', state.fontSize);
      renderPreview();
      updatePrintArea();
    });
  }
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

function initModalActions() {
  const promptText = `Generate a 27-card Quotes & Shayari deck formatted as a JSON array of objects.
Each card must be an object with:
- "quote": The poetry verses, shayari sher, or quote (use \\n for line breaks)
- "author": The poet or author name (e.g. "मिर्ज़ा ग़ालिब", "Marcus Aurelius")
- "category": Topic/theme (e.g. "शायरी", "Wisdom", "Courage", "Love", "Motivation")
- "meaning": (Optional) Brief 1-line English explanation or context
- "theme": One of "rose", "cyan", "orange", "purple", "emerald", "gold", "blue"

Example format:
[
  {
    "quote": "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\\nबहुत निकले मिरे अरमान लेकिन फिर भी कम निकले",
    "author": "मिर्ज़ा ग़ालिब",
    "category": "उर्दू शायरी",
    "theme": "rose"
  }
]`;

  if (dom.modalPromptText) {
    dom.modalPromptText.textContent = promptText;
  }

  if (dom.viewTemplateBtn && dom.templateModal) {
    dom.viewTemplateBtn.addEventListener('click', () => {
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
      navigator.clipboard.writeText(promptText);
      alert("27-Quote AI Prompt copied to clipboard!");
    });
  }

  if (dom.modalCopyPromptBtn) {
    dom.modalCopyPromptBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(promptText);
      alert("Full Prompt copied to clipboard!");
    });
  }
}

function initGlobalActions() {
  if (dom.addSheetBtn) {
    dom.addSheetBtn.addEventListener('click', () => {
      addAnotherPage();
    });
  }

  if (dom.loadShayariBtn) {
    dom.loadShayariBtn.addEventListener('click', () => {
      loadDefaultShayari();
    });
  }

  if (dom.loadShayari54Btn) {
    dom.loadShayari54Btn.addEventListener('click', () => {
      loadShayari54();
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
        alert("Please load or paste quotes before printing.");
        return;
      }
      updatePrintArea();
      setTimeout(() => {
        window.print();
      }, 200);
    });
  }
}

function loadDefaultShayari() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.shayari_quotes_27) {
    const cards = SAMPLE_PACKS.shayari_quotes_27.cards;
    dom.jsonInput.value = JSON.stringify(cards, null, 2);
    validateAndLoad(dom.jsonInput.value);
  }
}

function loadShayari54() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.shayari_quotes_54) {
    const cards = SAMPLE_PACKS.shayari_quotes_54.cards;
    dom.jsonInput.value = JSON.stringify(cards, null, 2);
    validateAndLoad(dom.jsonInput.value);
  }
}

function addAnotherPage() {
  const COLOR_PALETTE = ['rose', 'cyan', 'purple', 'emerald', 'orange', 'gold', 'blue', 'teal', 'coral', 'violet', 'indigo', 'amber'];
  const currentCount = state.currentCards.length;
  const startNum = currentCount + 1;
  for (let i = 0; i < 27; i++) {
    const idx = currentCount + i;
    state.currentCards.push({
      quote: `Quote #${startNum + i}: Enter your quote or shayari here...`,
      author: "",
      meaning: "",
      theme: COLOR_PALETTE[idx % COLOR_PALETTE.length]
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

// 12 Vibrant Theme Colors for Card Borders
const COLOR_PALETTE = ['rose', 'cyan', 'purple', 'emerald', 'orange', 'gold', 'blue', 'teal', 'coral', 'violet', 'indigo', 'amber'];

    state.currentCards = parsed.map((item, idx) => {
      const paletteTheme = COLOR_PALETTE[idx % COLOR_PALETTE.length];
      if (typeof item === 'string') {
        return {
          quote: item,
          author: "",
          theme: paletteTheme
        };
      }

      return {
        quote: item.quote || item.shayari || item.text || item.verse || "",
        author: item.author || item.poet || item.by || "",
        meaning: item.meaning || item.translation || item.summary || "",
        theme: item.theme || paletteTheme,
        fontSize: item.fontSize || undefined
      };
    });

    const count = state.currentCards.length;
    const sheets = Math.ceil(count / 27);
    if (dom.validationStatus) {
      dom.validationStatus.className = 'validation-badge success';
      dom.validationStatus.innerHTML = `✓ Valid JSON! Loaded ${count} quote${count !== 1 ? 's' : ''} (${sheets} sheet${sheets !== 1 ? 's' : ''}).`;
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

  if (dom.statCards) dom.statCards.textContent = `${count} quote${count !== 1 ? 's' : ''}`;
  if (dom.statSheets) dom.statSheets.textContent = sheets === 1 ? '1 Sheet (Exact 27 Fit)' : `${sheets} Sheets (${sheets * 27} Cards Total)`;
  if (dom.statGrid) dom.statGrid.textContent = `9 × 3 • ${sheets} Page${sheets > 1 ? 's' : ''} (27 / Sheet)`;
}

function renderPreview() {
  if (!dom.screenPreviewContent) return;
  dom.screenPreviewContent.innerHTML = '';

  if (state.currentCards.length === 0) {
    dom.screenPreviewContent.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 40px;">
        No quotes loaded. Click <strong>"Load 27 Quotes (1 Sheet)"</strong> or <strong>"Load 54 Quotes (2 Sheets)"</strong> or paste your JSON above.
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
    
    // Pad to 27 cards if needed
    while (sheetCards.length < cardsPerSheet) {
      sheetCards.push(null);
    }

    html += `
      <div class="print-page">
        <div class="print-page-header">
          <span>YAADCARD • QUOTES &amp; SHAYARI</span>
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
        <button class="card-edit-btn" data-card-index="${index}" title="Add Quote Here">
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
  const themeClass = `theme-${card.theme || 'rose'}`;
  const isHorizontal = orientation === 'horizontal';
  const authorDisplay = card.author ? (card.author.startsWith('—') ? card.author : `— ${card.author}`) : '';
  const fsStyle = card.fontSize ? `--card-fs: ${card.fontSize};` : '';

  if (isHorizontal) {
    // Rotated 90° content inside the 50mm x 95mm card
    return `
      <div class="quote-card-slot horizontal ${themeClass}" style="${fsStyle}">
        <div class="quote-rotate-inner">
          <div class="quote-header-row">
            <span class="quote-brand">YAADCARD</span>
            <span class="quote-mark-top">“</span>
          </div>

          <div class="quote-body">
            <div class="quote-text">${escapeHtml(card.quote)}</div>
            ${card.meaning ? `<div class="quote-meaning">${escapeHtml(card.meaning)}</div>` : ''}
          </div>

          <div class="quote-footer-row">
            ${authorDisplay ? `<div class="quote-author">${escapeHtml(authorDisplay)}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Vertical (Portrait Reading Content)
  return `
    <div class="quote-card-slot vertical ${themeClass}" style="${fsStyle}">
      <div>
        <div class="quote-header-row">
          <span class="quote-brand">YAADCARD</span>
          <span class="quote-mark-top">“</span>
        </div>
      </div>

      <div class="quote-body">
        <div class="quote-text">${escapeHtml(card.quote)}</div>
        ${card.meaning ? `<div class="quote-meaning">${escapeHtml(card.meaning)}</div>` : ''}
      </div>

      <div class="quote-footer-row">
        ${authorDisplay ? `<div class="quote-author">${escapeHtml(authorDisplay)}</div>` : ''}
      </div>
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
      quote: "",
      author: "",
      meaning: "",
      theme: "rose"
    };
    state.currentCards[index] = card;
  }

  activeEditCardIndex = index;
  const modal = document.getElementById('card-edit-modal');
  const badge = document.getElementById('edit-card-badge');
  const fsSelect = document.getElementById('card-edit-fs');
  const textInput = document.getElementById('card-edit-text');
  const authorInput = document.getElementById('card-edit-author');
  const meaningInput = document.getElementById('card-edit-meaning');
  const fsHint = document.getElementById('current-fs-hint');

  if (badge) badge.textContent = `Card #${index + 1}`;
  if (fsHint) fsHint.textContent = `Current: ${card.fontSize || state.fontSize}`;
  if (fsSelect) fsSelect.value = card.fontSize || '';
  if (textInput) textInput.value = card.quote || '';
  if (authorInput) authorInput.value = card.author || '';
  if (meaningInput) meaningInput.value = card.meaning || '';

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
  const textInput = document.getElementById('card-edit-text');
  const authorInput = document.getElementById('card-edit-author');
  const meaningInput = document.getElementById('card-edit-meaning');

  if (textInput) card.quote = textInput.value;
  if (authorInput) card.author = authorInput.value;
  if (meaningInput) card.meaning = meaningInput.value;

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
