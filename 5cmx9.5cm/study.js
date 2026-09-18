/**
 * Study Flashcard Deck Engine (5cm x 9.5cm • 27 Cards per Sheet)
 * High-yield revision cards, KaTeX formulas, tables, mnemonics, and AI prompt generator.
 */

// Application State
const state = {
  currentCards: [],
  orientation: 'vertical', // 'vertical' or 'horizontal' (inside text rotation)
  fontSize: '10pt',
  paperSize: '12x18',
  previewMode: 'sheet',
  zoom: 50
};

// DOM Elements
const dom = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  topicInput: document.getElementById('prompt-topic-input'),
  copyPromptBtn: document.getElementById('copy-prompt-btn'),
  viewTemplateBtn: document.getElementById('view-template-btn'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
  loadStudyBtn: document.getElementById('load-study-btn'),
  loadStudy54Btn: document.getElementById('load-study-54-btn'),
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
  modalCopyPromptBtn: document.getElementById('modal-copy-prompt-btn'),
  modalCopyJsonBtn: document.getElementById('modal-copy-json-btn')
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
    loadStudyPack54();
  } else {
    loadDefaultStudyPack();
  }
});

// KaTeX rendering after load
window.addEventListener('load', () => {
  renderKaTeX(dom.screenPreviewContent);
  renderKaTeX(dom.printArea);
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
      const topic = dom.topicInput ? dom.topicInput.value.trim() : "Corporate Finance";
      if (dom.modalPromptText) {
        dom.modalPromptText.textContent = getStudyAiPrompt(topic);
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
      const topic = dom.topicInput ? dom.topicInput.value.trim() : "Corporate Finance";
      navigator.clipboard.writeText(getStudyAiPrompt(topic));
      alert(`AI Prompt for "${topic}" copied to clipboard!`);
    });
  }

  if (dom.modalCopyPromptBtn) {
    dom.modalCopyPromptBtn.addEventListener('click', () => {
      const topic = dom.topicInput ? dom.topicInput.value.trim() : "Corporate Finance";
      navigator.clipboard.writeText(getStudyAiPrompt(topic));
      alert("Full Prompt copied to clipboard!");
    });
  }

  if (dom.modalCopyJsonBtn) {
    dom.modalCopyJsonBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON_STUDY_SCHEMA);
      alert("JSON Schema copied to clipboard!");
    });
  }
}

function getStudyAiPrompt(topic) {
  return `Generate an exhaustive, high-yield 27-card study deck on the topic: "${topic}".
Each card must be sized for physical single-sided cards (5cm x 9.5cm portrait format).
Produce valid JSON containing an array of exactly 27 card objects.

JSON Structure for each card:
{
  "title": "Clear Concept Title",
  "category": "Sub-topic Name",
  "tagline": "Concise 1-line essence of concept",
  "summary": "1-2 sentence core definition/explanation",
  "theme": "cyan" | "orange" | "purple" | "emerald" | "gold" | "rose" | "blue",
  "key_points": [
    "Compounding: $\\\\text{FV} = \\\\text{PV} \\\\times (1 + r)^n$",
    "Discounting: $\\\\text{PV} = \\\\frac{\\\\text{FV}}{(1 + r)^n}$"
  ],
  "table": {
    "headers": ["Condition", "Action"],
    "rows": [
      ["IRR > Hurdle Rate", "Accept Project"],
      ["IRR < Hurdle Rate", "Reject Project"]
    ]
  },
  "diagram": "Optional ASCII flow diagram",
  "mnemonic": "Memory hook / exam trick"
}

Important formatting rules:
- Support KaTeX LaTeX math formulas using $formula$ for inline math. Double-escape backslashes in JSON (e.g. \\\\text{NPV}, \\\\frac{a}{b}).
- Include mnemonics, tables, or formulas where relevant to reinforce retention.
- Return ONLY the raw JSON array.`;
}

const JSON_STUDY_SCHEMA = `[
  {
    "title": "Time Value of Money",
    "category": "Corporate Finance",
    "theme": "cyan",
    "tagline": "A rupee today is worth more than a rupee tomorrow.",
    "summary": "Fundamental principle that money's purchasing power changes over time.",
    "key_points": [
      "Formula: $\\\\text{FV} = \\\\text{PV} \\\\times (1 + r)^n$"
    ],
    "mnemonic": "PV + Rate = FV"
  }
]`;

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
    document.documentElement.style.setProperty('--study-base-fs', state.fontSize);
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

  if (dom.loadStudyBtn) {
    dom.loadStudyBtn.addEventListener('click', () => {
      loadDefaultStudyPack();
    });
  }

  if (dom.loadStudy54Btn) {
    dom.loadStudy54Btn.addEventListener('click', () => {
      loadStudyPack54();
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
        alert("Please load or paste cards before printing.");
        return;
      }
      updatePrintArea();
      setTimeout(() => {
        window.print();
      }, 250);
    });
  }
}

function loadDefaultStudyPack() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.finance_27) {
    const pack = SAMPLE_PACKS.finance_27;
    dom.jsonInput.value = JSON.stringify(pack.cards, null, 2);
    if (dom.topicInput) dom.topicInput.value = pack.name.replace(/\s*\(\d+\s*Cards\)/i, '');
    validateAndLoad(dom.jsonInput.value);
  }
}

function loadStudyPack54() {
  if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS.finance_54) {
    const pack = SAMPLE_PACKS.finance_54;
    dom.jsonInput.value = JSON.stringify(pack.cards, null, 2);
    if (dom.topicInput) dom.topicInput.value = pack.name.replace(/\s*\(\d+\s*Cards\)/i, '');
    validateAndLoad(dom.jsonInput.value);
  }
}

function addAnotherPage() {
  const COLOR_PALETTE = ['cyan', 'orange', 'purple', 'emerald', 'gold', 'rose'];
  const currentCount = state.currentCards.length;
  const startNum = currentCount + 1;
  for (let i = 0; i < 27; i++) {
    const idx = currentCount + i;
    state.currentCards.push({
      category: "Flashcard",
      theme: COLOR_PALETTE[idx % COLOR_PALETTE.length],
      title: `Concept #${startNum + i}`,
      summary: "Concise explanation of this principle or concept.",
      key_points: ["Key takeaway or formula 1", "Key takeaway or formula 2"],
      mnemonic: "Memory hook or keyword"
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
const STUDY_COLOR_PALETTE = ['cyan', 'orange', 'purple', 'emerald', 'gold', 'rose', 'blue', 'teal', 'coral', 'violet', 'indigo', 'amber'];

    state.currentCards = parsed.map((item, idx) => {
      const paletteTheme = STUDY_COLOR_PALETTE[idx % STUDY_COLOR_PALETTE.length];
      return {
        title: item.title || item.concept || `Card ${idx + 1}`,
        tagline: item.tagline || "",
        summary: item.summary || item.definition || "",
        theme: item.theme || paletteTheme,
        key_points: Array.isArray(item.key_points) ? item.key_points : [],
        table: item.table || null,
        diagram: item.diagram || "",
        mnemonic: item.mnemonic || "",
        fontSize: item.fontSize || undefined
      };
    });

    const count = state.currentCards.length;
    const sheets = Math.ceil(count / 27);
    if (dom.validationStatus) {
      dom.validationStatus.className = 'validation-badge success';
      dom.validationStatus.innerHTML = `✓ Valid JSON! Loaded ${count} study card${count !== 1 ? 's' : ''} (${sheets} sheet${sheets !== 1 ? 's' : ''}).`;
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
        No study cards loaded. Click <strong>"Load 27 Study Cards (1 Sheet)"</strong> or <strong>"Load 54 Study Cards (2 Sheets)"</strong> or paste your JSON above.
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

  renderKaTeX(dom.screenPreviewContent);
  attachCardEditEvents(dom.screenPreviewContent);
}

function updatePrintArea() {
  if (!dom.printArea) return;
  if (state.currentCards.length === 0) {
    dom.printArea.innerHTML = '';
    return;
  }
  dom.printArea.innerHTML = generateSheetsHtml(state.currentCards, state.orientation, true);
  renderKaTeX(dom.printArea);
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
          <span>YAADCARD • STUDY FLASHCARDS</span>
          <span>SHEET ${s + 1} OF ${totalSheets} • 27 STUDY FLASHCARDS (${(orientation || 'vertical').toUpperCase()} CONTENT)</span>
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
        <button class="card-edit-btn" data-card-index="${index}" title="Add Concept Here">
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

  // Points list
  let pointsHtml = '';
  if (card.key_points && card.key_points.length > 0) {
    pointsHtml = `
      <ul class="study-points-list">
        ${card.key_points.map(pt => `<li class="study-point-item">${escapeHtml(pt)}</li>`).join('')}
      </ul>
    `;
  }

  // Summary Table
  let tableHtml = '';
  if (card.table && card.table.headers && card.table.rows) {
    tableHtml = `
      <table class="study-table">
        <thead>
          <tr>
            ${card.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${card.table.rows.map(row => `
            <tr>
              ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Diagram placeholder
  let diagramHtml = '';
  if (card.diagram) {
    diagramHtml = `<div class="study-diagram">${escapeHtml(card.diagram)}</div>`;
  }

  // Mnemonic Box
  let mnemonicHtml = '';
  if (card.mnemonic) {
    mnemonicHtml = `
      <div class="study-mnemonic-box">
        <div class="study-mnemonic-lbl">KEY TAKEAWAY / MNEMONIC</div>
        <div class="study-mnemonic-text">${escapeHtml(card.mnemonic)}</div>
      </div>
    `;
  }

  if (isHorizontal) {
    return `
      <div class="study-card-slot horizontal ${themeClass}" style="${fsStyle}">
        <div class="study-rotate-inner">
          <div>
            <div class="study-card-header">
              <span class="study-brand-pill">YAADCARD</span>
            </div>

            <div class="study-horizontal-grid">
              <div>
                <div class="study-title">${escapeHtml(card.title)}</div>
                ${card.tagline ? `<div class="study-tagline">${escapeHtml(card.tagline)}</div>` : ''}
                ${card.summary ? `<div class="study-summary">${escapeHtml(card.summary)}</div>` : ''}
                ${pointsHtml}
              </div>

              <div>
                ${tableHtml}
                ${diagramHtml}
                ${mnemonicHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Vertical (Portrait Reading Content)
  return `
    <div class="study-card-slot vertical ${themeClass}" style="${fsStyle}">
      <div>
        <div class="study-card-header">
          <span class="study-brand-pill">YAADCARD</span>
        </div>

        <div class="study-title">${escapeHtml(card.title)}</div>
        ${card.tagline ? `<div class="study-tagline">${escapeHtml(card.tagline)}</div>` : ''}
        ${card.summary ? `<div class="study-summary">${escapeHtml(card.summary)}</div>` : ''}

        ${pointsHtml}
        ${tableHtml}
        ${diagramHtml}
      </div>

      ${mnemonicHtml}
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
      category: "Flashcard",
      theme: "cyan",
      title: "",
      summary: "",
      key_points: [],
      mnemonic: ""
    };
    state.currentCards[index] = card;
  }

  activeEditCardIndex = index;
  const modal = document.getElementById('card-edit-modal');
  const badge = document.getElementById('edit-card-badge');
  const fsSelect = document.getElementById('card-edit-fs');
  const titleInput = document.getElementById('card-edit-title');
  const summaryInput = document.getElementById('card-edit-summary');
  const pointsInput = document.getElementById('card-edit-points');
  const mnemonicInput = document.getElementById('card-edit-mnemonic');
  const fsHint = document.getElementById('current-fs-hint');

  if (badge) badge.textContent = `Card #${index + 1}`;
  if (fsHint) fsHint.textContent = `Current: ${card.fontSize || state.fontSize}`;
  if (fsSelect) fsSelect.value = card.fontSize || '';
  if (titleInput) titleInput.value = card.title || '';
  if (summaryInput) summaryInput.value = card.summary || '';
  if (pointsInput) pointsInput.value = (card.key_points || []).join('\n');
  if (mnemonicInput) mnemonicInput.value = card.mnemonic || '';

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
  const titleInput = document.getElementById('card-edit-title');
  const summaryInput = document.getElementById('card-edit-summary');
  const pointsInput = document.getElementById('card-edit-points');
  const mnemonicInput = document.getElementById('card-edit-mnemonic');

  if (titleInput) card.title = titleInput.value;
  if (summaryInput) card.summary = summaryInput.value;
  if (pointsInput) {
    card.key_points = pointsInput.value
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);
  }
  if (mnemonicInput) card.mnemonic = mnemonicInput.value;

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

function renderKaTeX(container) {
  if (!container || typeof renderMathInElement !== 'function') return;
  try {
    renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  } catch (err) {
    console.warn("KaTeX render notice:", err);
  }
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
