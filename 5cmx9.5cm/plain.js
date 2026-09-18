/**
 * Plain / Blank Card Canvas Engine (5cm x 9.5cm • 27 Cards per Sheet)
 * Unopinionated renderer for raw text, images, or custom HTML without style collisions.
 */

// Application State
const state = {
  currentCards: [],
  orientation: 'vertical', // 'vertical' or 'horizontal' (inside text rotation)
  fontSize: '11pt',
  fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '4.5mm',
  paperSize: '12x18',
  previewMode: 'sheet',
  zoom: 50
};

// DOM Elements
const dom = {
  jsonInput: document.getElementById('json-input'),
  validationStatus: document.getElementById('validation-status'),
  pasteValidateBtn: document.getElementById('paste-validate-btn'),
  loadPlainBtn: document.getElementById('load-plain-btn'),
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
  screenPreviewContent: document.getElementById('screen-preview-content'),
  printArea: document.getElementById('print-area'),
  
  // Customization controls
  fontSizeSelect: document.getElementById('font-size-select'),
  fontFamilySelect: document.getElementById('font-family-select'),
  alignGroup: document.getElementById('align-group'),
  valignGroup: document.getElementById('valign-group')
};

// 27 Plain Sample Items (Principles of Clear Thinking)
const PLAIN_27_SAMPLE = [
  "1. First Principles Thinking\nBreak problems down to fundamental truths and reason up from there.",
  "2. Second-Order Thinking\nAlways ask: 'And then what?' Consider downstream consequences.",
  "3. Occam's Razor\nAmong competing hypotheses, the one with the fewest assumptions is often best.",
  "4. Pareto Principle (80/20)\n80% of consequences come from 20% of the causes.",
  "5. Inversion Principle\nAvoid stupidity rather than seeking brilliance. Turn problems upside down.",
  "6. Compounding Returns\nSmall incremental gains compounded over time produce exponential outcomes.",
  "7. Feedback Loops\nPositive loops amplify momentum; negative loops stabilize systems.",
  "8. Margin of Safety\nAlways leave room for error, unknown factors, and unexpected shocks.",
  "9. Opportunity Cost\nThe true cost of something is what you give up to get it.",
  "10. Sunk Cost Fallacy\nPast investments cannot be recovered; evaluate decisions only on future value.",
  "11. Antifragility\nSystems that thrive and grow when exposed to volatility, stress, and disorder.",
  "12. Circle of Competence\nKnow what you truly know, and be honest about the boundaries of your knowledge.",
  "13. Hanlon's Razor\nNever attribute to malice that which is adequately explained by carelessness.",
  "14. Map vs. Territory\nThe representation of reality is not reality itself. Models simplify.",
  "15. Critical Mass\nThe threshold required to trigger self-sustaining momentum.",
  "16. Law of Diminishing Returns\nBeyond a certain threshold, each additional unit of input yields less output.",
  "17. Confirmation Bias\nThe tendency to search for information that validates pre-existing beliefs.",
  "18. Regret Minimization\nFrame decisions around which choice you will least regret in old age.",
  "19. Parkinson's Law\nWork expands so as to fill the time available for its completion.",
  "20. Chesterton's Fence\nNever remove a fence or rule until you thoroughly understand why it was built.",
  "21. Velocity vs. Speed\nSpeed is distance over time. Velocity has direction. Direction matters most.",
  "22. Asymmetric Upside\nSeek bets where the downside is strictly capped and upside is limitless.",
  "23. Deep Work\nThe ability to focus without distraction on a cognitively demanding task.",
  "24. Signal vs. Noise\nFocus relentlessly on the high-fidelity signal; ignore the overwhelming chatter.",
  "25. Survivorship Bias\nAvoid judging situations solely on visible successes without examining failures.",
  "26. Thought Experiment\nSimulating hypotheses mentally to test logic without physical constraints.",
  "27. Consistency Beats Intensity\nDaily deliberate practice will always outperform sporadic bursts of brilliance."
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initOrientationToggle();
  initPaperToggle();
  initPreviewControls();
  initCardControls();
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

  // Load default plain deck
  loadPlainSample();
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

function initCardControls() {
  if (dom.fontSizeSelect) {
    dom.fontSizeSelect.addEventListener('change', (e) => {
      state.fontSize = e.target.value;
      document.documentElement.style.setProperty('--plain-font-size', state.fontSize);
      renderPreview();
      updatePrintArea();
    });
  }

  if (dom.fontFamilySelect) {
    dom.fontFamilySelect.addEventListener('change', (e) => {
      state.fontFamily = e.target.value;
      document.documentElement.style.setProperty('--plain-font-family', state.fontFamily);
      renderPreview();
      updatePrintArea();
    });
  }

  if (dom.alignGroup) {
    dom.alignGroup.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.alignGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.textAlign = btn.dataset.align;
        document.documentElement.style.setProperty('--plain-text-align', state.textAlign);
        renderPreview();
        updatePrintArea();
      });
    });
  }

  if (dom.valignGroup) {
    dom.valignGroup.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.valignGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.verticalAlign = btn.dataset.valign;
        document.documentElement.style.setProperty('--plain-justify', state.verticalAlign);
        renderPreview();
        updatePrintArea();
      });
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

function initGlobalActions() {
  if (dom.loadPlainBtn) {
    dom.loadPlainBtn.addEventListener('click', () => {
      loadPlainSample();
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
        alert("Please load or paste card content before printing.");
        return;
      }
      updatePrintArea();
      setTimeout(() => {
        window.print();
      }, 200);
    });
  }
}

function loadPlainSample() {
  dom.jsonInput.value = JSON.stringify(PLAIN_27_SAMPLE, null, 2);
  validateAndLoad(dom.jsonInput.value);
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
      throw new Error("Input JSON must be an array of cards (e.g. ['Card 1', 'Card 2'] or [{'text':'...'}])");
    }

    state.currentCards = parsed.map((item, idx) => {
      if (typeof item === 'string') {
        return { text: item, type: 'text' };
      }
      if (typeof item === 'number') {
        return { text: String(item), type: 'text' };
      }
      if (typeof item === 'object' && item !== null) {
        if (item.image || item.img) {
          return { image: item.image || item.img, type: 'image', text: item.text || '', fontSize: item.fontSize || undefined };
        }
        if (item.html) {
          return { html: item.html, type: 'html', fontSize: item.fontSize || undefined };
        }
        // Fallback text
        return {
          text: item.text || item.content || item.quote || item.title || JSON.stringify(item),
          type: 'text',
          fontSize: item.fontSize || undefined
        };
      }
      return { text: String(item), type: 'text' };
    });

    const count = state.currentCards.length;
    const sheets = Math.ceil(count / 27);
    if (dom.validationStatus) {
      dom.validationStatus.className = 'validation-badge success';
      dom.validationStatus.innerHTML = `✓ Valid JSON! Loaded ${count} card${count !== 1 ? 's' : ''} (${sheets} sheet${sheets !== 1 ? 's' : ''}).`;
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
  if (dom.statSheets) dom.statSheets.textContent = sheets === 1 ? '1 Sheet (Exact 27 Fit)' : `${sheets} sheet${sheets !== 1 ? 's' : ''}`;
  if (dom.statGrid) dom.statGrid.textContent = '9 × 3 (27 Cards per Sheet)';
}

function renderPreview() {
  if (!dom.screenPreviewContent) return;
  dom.screenPreviewContent.innerHTML = '';

  if (state.currentCards.length === 0) {
    dom.screenPreviewContent.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 40px;">
        No cards loaded. Click <strong>"Load 27 Plain Cards"</strong> or paste your JSON above.
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
    
    // Pad to 27 cards if needed so the grid stays locked in place
    while (sheetCards.length < cardsPerSheet) {
      sheetCards.push(null);
    }

    html += `
      <div class="print-page">
        <div class="print-page-header">
          <span>PLAIN CARD CANVAS</span>
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
    return `<div class="print-card-wrapper" style="border-right: 0.5px dashed #cbd5e1 !important; border-bottom: 0.5px dashed #cbd5e1 !important; background: #ffffff !important;"></div>`;
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
  const isHorizontal = orientation === 'horizontal';
  const fsStyle = card.fontSize ? `--card-custom-fs: ${card.fontSize};` : '';
  let innerHtml = '';

  if (card.type === 'image') {
    innerHtml = `
      <div class="plain-img-container">
        <img src="${escapeHtml(card.image)}" class="plain-img" alt="Card Image" />
      </div>
      ${card.text ? `<div class="plain-text" style="margin-top: 4px; font-size: 0.85em;">${escapeHtml(card.text)}</div>` : ''}
    `;
  } else if (card.type === 'html') {
    innerHtml = `
      <div class="plain-card-body">
        <div class="plain-html">${card.html}</div>
      </div>
    `;
  } else {
    // Standard Text
    innerHtml = `
      <div class="plain-card-body">
        <div class="plain-text">${escapeHtml(card.text)}</div>
      </div>
    `;
  }

  if (isHorizontal) {
    return `
      <div class="plain-card-slot horizontal" style="${fsStyle}">
        <div class="plain-rotate-inner">
          ${innerHtml}
        </div>
      </div>
    `;
  }

  return `
    <div class="plain-card-slot vertical" style="${fsStyle}">
      ${innerHtml}
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
  const card = state.currentCards[index];
  if (!card) return;

  activeEditCardIndex = index;
  const modal = document.getElementById('card-edit-modal');
  const badge = document.getElementById('edit-card-badge');
  const fsSelect = document.getElementById('card-edit-fs');
  const textInput = document.getElementById('card-edit-text');
  const fsHint = document.getElementById('current-fs-hint');

  if (badge) badge.textContent = `Card #${index + 1}`;
  if (fsHint) fsHint.textContent = `Current: ${card.fontSize || state.fontSize}`;
  if (fsSelect) fsSelect.value = card.fontSize || '';
  if (textInput) {
    textInput.value = card.html || card.text || '';
  }

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

  if (textInput) {
    if (card.type === 'html') {
      card.html = textInput.value;
    } else {
      card.text = textInput.value;
    }
  }

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
