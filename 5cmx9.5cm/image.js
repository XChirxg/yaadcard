/**
 * Image Deck Studio Engine (5cm x 9.5cm • 27 Cards per Sheet)
 * Direct image printing for flashcards, art, and visuals.
 * Supports batch upload, drag-and-drop, individual slot replace, and horizontal rotation.
 * Fully supports global watermark font size scale and per-card font size & text editing.
 */

// Application State
const state = {
  slots: new Array(27).fill(null), // 27 card slots (each holds an image data URL or slot object or null)
  orientation: 'vertical',         // 'vertical' or 'horizontal'
  fit: 'cover',                    // 'cover' or 'contain'
  paperSize: '12x18',
  fontSize: '4.5pt',               // global watermark/brand font size
  previewMode: 'sheet',
  zoom: 50,
  activeUploadSlot: null           // index when a single slot is clicked
};

// DOM Elements
const dom = {
  batchFileInput: document.getElementById('batch-file-input'),
  singleFileInput: document.getElementById('single-file-input'),
  batchUploadBtn: document.getElementById('batch-upload-btn'),
  clearAllBtn: document.getElementById('clear-all-btn'),
  printBtn: document.getElementById('print-btn'),
  statImages: document.getElementById('stat-images'),
  statSheets: document.getElementById('stat-sheets'),
  statGrid: document.getElementById('stat-grid'),
  orientationToggle: document.getElementById('orientation-toggle'),
  fitToggle: document.getElementById('fit-toggle'),
  paperToggle: document.getElementById('paper-toggle'),
  fontSizeSelect: document.getElementById('font-size-select'),
  previewModeToggle: document.getElementById('preview-mode-toggle'),
  zoomSlider: document.getElementById('zoom-slider'),
  zoomVal: document.getElementById('zoom-val'),
  screenPreviewContent: document.getElementById('screen-preview-content'),
  printArea: document.getElementById('print-area'),
  urlModal: document.getElementById('url-modal'),
  importUrlsBtn: document.getElementById('import-urls-btn'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  urlInput: document.getElementById('url-input'),
  applyUrlsBtn: document.getElementById('apply-urls-btn'),
  loadSampleBtn: document.getElementById('load-sample-btn'),
  loadSample54Btn: document.getElementById('load-sample-54-btn'),
  addSheetBtn: document.getElementById('add-sheet-btn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initOrientationToggle();
  initFitToggle();
  initPaperToggle();
  initFontSizeControl();
  initPreviewControls();
  initUploadHandlers();
  initDragAndDrop();
  initUrlModal();
  initCardEditModal();
  initGlobalActions();

  // Check URL param for orientation & demo
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
    loadDemoCards(54);
  } else if (urlParams.get('demo') === '1') {
    loadDemoCards(27);
  } else {
    renderPreview();
    updatePrintArea();
    updateStats();
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

function initFitToggle() {
  if (!dom.fitToggle) return;
  dom.fitToggle.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dom.fitToggle.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.fit = btn.dataset.fit;
      document.documentElement.style.setProperty('--img-fit', state.fit);
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

function initFontSizeControl() {
  if (!dom.fontSizeSelect) return;
  dom.fontSizeSelect.addEventListener('change', (e) => {
    state.fontSize = e.target.value;
    document.documentElement.style.setProperty('--deck-watermark-fs', state.fontSize);
    renderPreview();
    updatePrintArea();
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

function initUploadHandlers() {
  // Batch upload button
  if (dom.batchUploadBtn && dom.batchFileInput) {
    dom.batchUploadBtn.addEventListener('click', () => {
      dom.batchFileInput.value = '';
      dom.batchFileInput.click();
    });

    dom.batchFileInput.addEventListener('change', (e) => {
      handleBatchFiles(Array.from(e.target.files));
    });
  }

  // Single file input
  if (dom.singleFileInput) {
    dom.singleFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        readImageFile(file, (dataUrl) => {
          if (activeEditSlotIndex !== null) {
            const urlInput = document.getElementById('card-edit-img-url');
            if (urlInput) urlInput.value = dataUrl;
          } else if (state.activeUploadSlot !== null) {
            state.slots[state.activeUploadSlot] = dataUrl;
            updateStats();
            renderPreview();
            updatePrintArea();
          }
        });
      }
    });
  }
}

function ensureSlotsCapacity(minCount) {
  const targetCapacity = Math.max(27, Math.ceil(minCount / 27) * 27);
  while (state.slots.length < targetCapacity) {
    state.slots.push(null);
  }
}

function addAnotherPage() {
  for (let i = 0; i < 27; i++) {
    state.slots.push(null);
  }
  updateStats();
  renderPreview();
  updatePrintArea();
}

function handleBatchFiles(files) {
  if (!files || files.length === 0) return;

  // Filter image files
  const imageFiles = files.filter(f => f.type.startsWith('image/'));
  if (imageFiles.length === 0) return;

  // Automatically expand capacity to fit all uploaded images in 27-card sheet multiples
  ensureSlotsCapacity(imageFiles.length);

  let loadedCount = 0;
  imageFiles.forEach((file, index) => {
    readImageFile(file, (dataUrl) => {
      state.slots[index] = dataUrl;
      loadedCount++;
      if (loadedCount === imageFiles.length) {
        updateStats();
        renderPreview();
        updatePrintArea();
      }
    });
  });
}

function readImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

function initDragAndDrop() {
  const workspace = document.body;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    workspace.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  workspace.addEventListener('drop', (e) => {
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      handleBatchFiles(files);
    }
  });
}

function initUrlModal() {
  if (dom.importUrlsBtn && dom.urlModal) {
    dom.importUrlsBtn.addEventListener('click', () => {
      dom.urlModal.classList.add('open');
    });
  }

  if (dom.modalCloseBtn && dom.urlModal) {
    dom.modalCloseBtn.addEventListener('click', () => {
      dom.urlModal.classList.remove('open');
    });
  }

  if (dom.applyUrlsBtn && dom.urlInput) {
    dom.applyUrlsBtn.addEventListener('click', () => {
      const text = dom.urlInput.value.trim();
      if (text) {
        let urls = [];
        try {
          // Check if JSON array
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            urls = parsed.map(item => (typeof item === 'string' ? item : (item.url || item.image || item.src || '')));
          }
        } catch (e) {
          // Line-separated URLs
          urls = text.split('\n').map(u => u.trim()).filter(u => u.startsWith('http') || u.startsWith('data:image'));
        }

        if (urls.length > 0) {
          ensureSlotsCapacity(urls.length);
          urls.forEach((url, i) => {
            if (url) state.slots[i] = url;
          });

          updateStats();
          renderPreview();
          updatePrintArea();
        }
      }
      dom.urlModal.classList.remove('open');
    });
  }
}

function initGlobalActions() {
  if (dom.addSheetBtn) {
    dom.addSheetBtn.addEventListener('click', () => {
      addAnotherPage();
    });
  }

  if (dom.clearAllBtn) {
    dom.clearAllBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to clear all image slots?")) {
        state.slots = new Array(27).fill(null);
        updateStats();
        renderPreview();
        updatePrintArea();
      }
    });
  }

  if (dom.loadSampleBtn) {
    dom.loadSampleBtn.addEventListener('click', () => {
      loadDemoCards(27);
    });
  }

  if (dom.loadSample54Btn) {
    dom.loadSample54Btn.addEventListener('click', () => {
      loadDemoCards(54);
    });
  }

  if (dom.printBtn) {
    dom.printBtn.addEventListener('click', () => {
      const filledCount = state.slots.filter(slot => {
        const d = getSlotData(slot);
        return d && d.url;
      }).length;
      if (filledCount === 0) {
        alert("Please add at least one image before printing.");
        return;
      }
      updatePrintArea();
      setTimeout(() => {
        window.print();
      }, 250);
    });
  }
}

function loadDemoCards(count = 27) {
  state.slots = new Array(count).fill(null);
  const themes = [
    { name: "NEBULA", g1: "#4f46e5", g2: "#06b6d4" },
    { name: "SOLAR", g1: "#f59e0b", g2: "#ef4444" },
    { name: "EMERALD", g1: "#059669", g2: "#10b981" },
    { name: "COSMOS", g1: "#7c3aed", g2: "#ec4899" },
    { name: "CYBER", g1: "#0891b2", g2: "#8b5cf6" },
    { name: "SUNSET", g1: "#ea580c", g2: "#f43f5e" },
    { name: "OCEAN", g1: "#0284c7", g2: "#0d9488" },
    { name: "AURORA", g1: "#10b981", g2: "#6366f1" },
    { name: "ROYAL", g1: "#9333ea", g2: "#3b82f6" }
  ];

  for (let i = 0; i < count; i++) {
    const t = themes[i % themes.length];
    const num = i + 1;
    const sheetNum = Math.floor(i / 27) + 1;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 950" width="100%" height="100%">
        <defs>
          <linearGradient id="g_${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${t.g1}" />
            <stop offset="100%" stop-color="${t.g2}" />
          </linearGradient>
          <radialGradient id="r_${i}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="500" height="950" fill="url(#g_${i})" />
        <circle cx="250" cy="400" r="180" fill="url(#r_${i})" />
        <circle cx="250" cy="400" r="130" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="8 6"/>
        <rect x="70" y="70" width="360" height="810" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
        <text x="250" y="240" fill="#ffffff" fill-opacity="0.9" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="700" letter-spacing="4" text-anchor="middle">SHEET ${sheetNum}</text>
        <text x="250" y="440" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="96" font-weight="800" text-anchor="middle">${String(num).padStart(2, '0')}</text>
        <text x="250" y="520" fill="#ffffff" fill-opacity="0.85" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="600" letter-spacing="8" text-anchor="middle">${t.name}</text>
        <line x1="160" y1="560" x2="340" y2="560" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2"/>
        <text x="250" y="740" fill="#ffffff" fill-opacity="0.7" font-family="'Fira Code', monospace" font-size="16" letter-spacing="3" text-anchor="middle">50MM × 95MM • CARD</text>
      </svg>
    `.trim();
    state.slots[i] = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  updateStats();
  renderPreview();
  updatePrintArea();
}

function getSlotData(slot) {
  if (!slot) return null;
  if (typeof slot === 'string') {
    return { url: slot, watermark: 'YAADCARD', fontSize: '' };
  }
  return {
    url: slot.url || '',
    watermark: slot.watermark !== undefined ? slot.watermark : 'YAADCARD',
    fontSize: slot.fontSize || ''
  };
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

function updateStats() {
  const filledCount = state.slots.filter(slot => {
    const d = getSlotData(slot);
    return d && d.url;
  }).length;
  const totalSlots = state.slots.length;
  const sheets = Math.max(1, Math.ceil(totalSlots / 27));

  if (dom.statImages) dom.statImages.textContent = `${filledCount} / ${totalSlots} images`;
  if (dom.statSheets) dom.statSheets.textContent = `${sheets} Sheet${sheets > 1 ? 's' : ''} (${sheets * 27} Cards Total)`;
  if (dom.statGrid) dom.statGrid.textContent = `9 × 3 • ${sheets} Page${sheets > 1 ? 's' : ''} (27 / Sheet)`;
}

function renderPreview() {
  if (!dom.screenPreviewContent) return;
  dom.screenPreviewContent.innerHTML = '';

  if (state.previewMode === 'inspector') {
    dom.screenPreviewContent.style.transform = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'inspector-carousel';
    
    state.slots.forEach((slot, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'print-card-wrapper';
      cardEl.style.cssText = 'width: 60mm !important; height: 114mm !important; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
      cardEl.innerHTML = renderSlotHtml(slot, idx, state.orientation, false);
      attachSlotEvents(cardEl, idx);
      gallery.appendChild(cardEl);
    });

    dom.screenPreviewContent.appendChild(gallery);
  } else {
    dom.screenPreviewContent.style.transform = `scale(${state.zoom / 100})`;
    const sheets = generateSheetsHtml(state.slots, state.orientation, false);
    dom.screenPreviewContent.innerHTML = sheets;
    
    // Attach click & drop events to individual card slots across all sheets in preview
    dom.screenPreviewContent.querySelectorAll('.print-card-wrapper').forEach((wrapper, slotIndex) => {
      attachSlotEvents(wrapper, slotIndex);
    });
  }

  attachCardEditEvents(dom.screenPreviewContent);
}

function updatePrintArea() {
  if (!dom.printArea) return;
  dom.printArea.innerHTML = generateSheetsHtml(state.slots, state.orientation, true);
}

function generateSheetsHtml(slots, orientation, isPrint) {
  const cardsPerSheet = 27;
  const effectiveSlots = slots.length > 0 ? slots : new Array(27).fill(null);
  const totalSheets = Math.max(1, Math.ceil(effectiveSlots.length / cardsPerSheet));
  let html = '';

  for (let s = 0; s < totalSheets; s++) {
    const sheetCards = effectiveSlots.slice(s * cardsPerSheet, (s + 1) * cardsPerSheet);
    while (sheetCards.length < cardsPerSheet) {
      sheetCards.push(null);
    }

    html += `
      <div class="print-page">
        <div class="print-page-header">
          <span>YAADCARD • IMAGE DECK</span>
          <span>SHEET ${s + 1} OF ${totalSheets} • 27 CARDS (${(orientation || 'vertical').toUpperCase()} CONTENT)</span>
        </div>
        
        <div class="print-grid">
          ${sheetCards.map((slot, idx) => `
            <div class="print-card-wrapper">
              ${renderSlotHtml(slot, s * cardsPerSheet + idx, orientation, isPrint)}
            </div>
          `).join('')}
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

function renderSlotHtml(slot, index, orientation, isPrint) {
  const isHorizontal = orientation === 'horizontal';
  const data = getSlotData(slot);

  const editBtnHtml = !isPrint ? `
    <button class="card-edit-btn" title="Edit Card & Font Size" data-slot-index="${index}">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      <span>Edit</span>
    </button>
  ` : '';

  if (!data || !data.url) {
    if (isPrint) {
      // Clean empty slot on paper with cut guide
      return `<div class="image-card-slot" style="background: #ffffff !important;"></div>`;
    }
    return `
      ${editBtnHtml}
      <div class="image-card-slot" data-slot-index="${index}">
        <div class="image-slot-empty">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <span class="slot-label">Slot ${index + 1}</span>
          <span class="slot-hint">+ Click to add</span>
        </div>
      </div>
    `;
  }

  const fsStyle = data.fontSize ? `style="--card-watermark-fs: ${data.fontSize}; font-size: ${data.fontSize};"` : '';
  const watermarkText = data.watermark ? escapeHtml(data.watermark) : 'YAADCARD';

  // Filled Slot
  return `
    ${editBtnHtml}
    <div class="image-card-slot ${isHorizontal ? 'horizontal' : ''}" data-slot-index="${index}">
      ${!isPrint ? `<button class="slot-action-btn" title="Quick Remove" data-action="remove" data-slot-index="${index}">&times;</button>` : ''}
      <div class="card-img-wrapper">
        <img src="${data.url}" class="card-img" alt="Card ${index + 1}" />
      </div>
      <span class="image-brand-watermark" ${fsStyle}>${watermarkText}</span>
    </div>
  `;
}

function attachSlotEvents(wrapperEl, index) {
  const slotEl = wrapperEl.querySelector('.image-card-slot');
  if (!slotEl) return;

  // Click handler on slot
  slotEl.addEventListener('click', (e) => {
    // If remove button clicked
    if (e.target.closest('[data-action="remove"]')) {
      e.stopPropagation();
      state.slots[index] = null;
      updateStats();
      renderPreview();
      updatePrintArea();
      return;
    }

    // If edit button clicked, let card-edit-btn listener handle it
    if (e.target.closest('.card-edit-btn')) {
      return;
    }

    // Trigger single file upload for this slot
    state.activeUploadSlot = index;
    if (dom.singleFileInput) {
      dom.singleFileInput.value = '';
      dom.singleFileInput.click();
    }
  });

  // Drag over slot
  slotEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    slotEl.classList.add('drag-over');
  });

  slotEl.addEventListener('dragleave', () => {
    slotEl.classList.remove('drag-over');
  });

  slotEl.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    slotEl.classList.remove('drag-over');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      readImageFile(file, (dataUrl) => {
        state.slots[index] = dataUrl;
        updateStats();
        renderPreview();
        updatePrintArea();
      });
    }
  });
}

// --------------------------------------------------------------------------
// Card Edit Modal Actions
// --------------------------------------------------------------------------
let activeEditSlotIndex = null;

function initCardEditModal() {
  const modal = document.getElementById('card-edit-modal');
  const closeBtn = document.getElementById('card-edit-close-btn');
  const cancelBtn = document.getElementById('card-edit-cancel-btn');
  const saveBtn = document.getElementById('card-edit-save-btn');
  const uploadBtn = document.getElementById('card-edit-upload-btn');
  const removeBtn = document.getElementById('card-edit-remove-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeCardEditor);
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', closeCardEditor);
  }
  if (saveBtn) {
    saveBtn.addEventListener('click', saveCardEdit);
  }
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      if (dom.singleFileInput) {
        dom.singleFileInput.value = '';
        dom.singleFileInput.click();
      }
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      const urlInput = document.getElementById('card-edit-img-url');
      if (urlInput) urlInput.value = '';
    });
  }
}

function attachCardEditEvents(container) {
  if (!container) return;
  container.querySelectorAll('.card-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const idx = parseInt(btn.dataset.slotIndex, 10);
      openCardEditor(idx);
    });
  });
}

function openCardEditor(index) {
  activeEditSlotIndex = index;
  const modal = document.getElementById('card-edit-modal');
  const badge = document.getElementById('edit-card-badge');
  const fsSelect = document.getElementById('card-edit-fs');
  const watermarkInput = document.getElementById('card-edit-watermark');
  const urlInput = document.getElementById('card-edit-img-url');
  const fsHint = document.getElementById('current-fs-hint');

  const slotData = getSlotData(state.slots[index]);

  if (badge) badge.textContent = `Card #${index + 1}`;
  if (fsHint) fsHint.textContent = `Current: ${(slotData && slotData.fontSize) || state.fontSize}`;
  if (fsSelect) fsSelect.value = (slotData && slotData.fontSize) || '';
  if (watermarkInput) watermarkInput.value = (slotData && slotData.watermark) !== undefined ? slotData.watermark : 'YAADCARD';
  if (urlInput) urlInput.value = (slotData && slotData.url) || '';

  if (modal) modal.classList.add('open');
}

function closeCardEditor() {
  const modal = document.getElementById('card-edit-modal');
  if (modal) modal.classList.remove('open');
  activeEditSlotIndex = null;
}

function saveCardEdit() {
  if (activeEditSlotIndex === null) return;
  const index = activeEditSlotIndex;

  const fsSelect = document.getElementById('card-edit-fs');
  const watermarkInput = document.getElementById('card-edit-watermark');
  const urlInput = document.getElementById('card-edit-img-url');

  const url = urlInput ? urlInput.value.trim() : '';
  const watermark = watermarkInput ? watermarkInput.value.trim() : 'YAADCARD';
  const fontSize = fsSelect ? fsSelect.value : '';

  if (!url) {
    state.slots[index] = null;
  } else {
    state.slots[index] = {
      url: url,
      watermark: watermark,
      fontSize: fontSize
    };
  }

  updateStats();
  renderPreview();
  updatePrintArea();
  closeCardEditor();
}
