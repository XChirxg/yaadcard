/**
 * DirectImage - A3 Print Sheet Studio Application Engine
 * Minimalist, touch-friendly, high-precision physical A3 print placement studio
 */

(() => {
  'use strict';

  // --- Layout Preset Configurations ---
  const LAYOUT_CONFIGS = {
    '18cards': {
      id: '18cards',
      name: '18 Cards Sheet',
      slotCount: 18,
      gridClass: 'layout-18cards',
      defaultRatio: 'card' // 2.5in × 3.5in
    },
    '4packaging': {
      id: '4packaging',
      name: '4 Packaging Sheet',
      slotCount: 4,
      gridClass: 'layout-4packaging',
      defaultRatio: 'packaging' // 7.075in × 5.5in (179.7mm × 139.7mm)
    },
    'combo': {
      id: 'combo',
      name: 'Combo Sheet',
      slotCount: 13, // 12 cards + 1 packaging box (cccccc / cccppp / cccppp)
      gridClass: 'layout-combo',
      defaultRatio: 'combo'
    }
  };

  // --- Default Card State Creator ---
  const createDefaultCardState = (id, isPackaging = false, isComboBox = false) => ({
    id,
    imageSrc: null,
    fileName: '',
    scale: 100, // percentage (10 to 300)
    posX: 0,    // pixels offset
    posY: 0,    // pixels offset
    rotation: 0,// degrees (0, 90, 180, 270)
    flipH: false,
    flipV: false,
    fitMode: 'contain', // 'contain' | 'cover' | 'stretch' | 'custom'
    bgColor: '#ffffff',
    isPackaging: !!isPackaging,
    isComboBox: !!isComboBox
  });

  // --- Global App State ---
  const state = {
    currentLayout: '18cards',
    cards: {}, // Map of slot index -> card state
    
    // Viewport Pan & Zoom (Mouse & Touch)
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
      isPanning: false,
      startX: 0,
      startY: 0,
      initialPinchDist: 0,
      initialZoom: 1
    },

    // Modal Editor State
    editor: {
      activeSlotId: null,
      cardState: null,
      isDraggingPreview: false,
      dragStartX: 0,
      dragStartY: 0,
      initialPosX: 0,
      initialPosY: 0
    }
  };

  // --- DOM Element References ---
  const dom = {
    // Toolbar buttons & dropdown
    btnLayoutDropdown: document.getElementById('btn-layout-dropdown'),
    layoutMenu: document.getElementById('layout-menu'),
    dropdownItems: document.querySelectorAll('.dropdown-item[data-layout]'),
    btnRecenter: document.getElementById('btn-recenter'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomOut: document.getElementById('btn-zoom-out'),
    zoomDisplay: document.getElementById('zoom-display'),
    btnClearAll: document.getElementById('btn-clear-all'),
    btnPrint: document.getElementById('btn-print'),
    batchFileInput: document.getElementById('batch-file-input'),
    singleFileInput: document.getElementById('single-file-input'),

    // Canvas
    workspace: document.getElementById('infinite-workspace'),
    transformer: document.getElementById('canvas-transformer'),
    sheet: document.getElementById('a3-sheet'),
    slotsContainer: document.getElementById('sheet-slots-container'),

    // Floating Edit Modal
    modal: document.getElementById('edit-modal'),
    modalCloseBtn: document.getElementById('modal-btn-close'),
    modalCancelBtn: document.getElementById('modal-btn-cancel'),
    modalApplyBtn: document.getElementById('modal-btn-apply'),
    modalResetBtn: document.getElementById('modal-btn-reset'),
    editorCardTitle: document.getElementById('editor-card-title'),

    // Modal Preview Stage
    previewCard: document.getElementById('editor-preview-card'),
    previewContent: document.getElementById('editor-preview-content'),
    previewImg: document.getElementById('editor-preview-img'),
    metricFit: document.getElementById('editor-metric-fit'),
    metricScale: document.getElementById('editor-metric-scale'),
    metricPos: document.getElementById('editor-metric-pos'),

    // Modal Controls
    fitButtons: document.querySelectorAll('.segment-btn[data-fit]'),
    inputScale: document.getElementById('input-scale'),
    valScale: document.getElementById('val-scale'),
    btnScaleReset: document.getElementById('btn-scale-reset'),
    inputPosX: document.getElementById('input-pos-x'),
    valPosX: document.getElementById('val-pos-x'),
    inputPosY: document.getElementById('input-pos-y'),
    valPosY: document.getElementById('val-pos-y'),
    btnPosCenter: document.getElementById('btn-pos-center'),
    btnRot0: document.getElementById('btn-rot-0'),
    btnRot90: document.getElementById('btn-rot-90'),
    btnRot180: document.getElementById('btn-rot-180'),
    btnRot270: document.getElementById('btn-rot-270'),
    btnFlipH: document.getElementById('btn-flip-h'),
    btnFlipV: document.getElementById('btn-flip-v'),
    valRot: document.getElementById('val-rot'),
    inputBgColor: document.getElementById('input-bg-color'),
    inputBgHex: document.getElementById('input-bg-hex'),
    swatchPreview: document.getElementById('swatch-preview'),
    valBgHex: document.getElementById('val-bg-hex'),
    btnEyedropper: document.getElementById('btn-eyedropper'),
    swatchButtons: document.querySelectorAll('.swatch-btn')
  };

  let targetUploadSlotId = null;

  // ==========================================================================
  // Initialization
  // ==========================================================================
  function init() {
    initCardsData(state.currentLayout);
    renderSheet();
    bindEvents();
    
    // Fit sheet cleanly on initial view
    requestAnimationFrame(() => {
      recenterView();
    });
  }

  // Initialize card state data for layout
  function initCardsData(layoutId) {
    const config = LAYOUT_CONFIGS[layoutId];
    state.cards = {};
    for (let i = 0; i < config.slotCount; i++) {
      const isPackaging = (layoutId === '4packaging');
      const isComboBox = (layoutId === 'combo' && i === 12);
      state.cards[i] = createDefaultCardState(i, isPackaging, isComboBox);
    }
  }

  // ==========================================================================
  // Render Sheet Slots
  // ==========================================================================
  function renderSheet() {
    const config = LAYOUT_CONFIGS[state.currentLayout];
    
    dom.slotsContainer.className = `sheet-grid ${config.gridClass}`;
    dom.slotsContainer.innerHTML = '';

    for (let i = 0; i < config.slotCount; i++) {
      const card = state.cards[i] || createDefaultCardState(i);
      const isPackagingSlot = (state.currentLayout === '4packaging');
      const isComboBox = (state.currentLayout === 'combo' && i === 12);
      
      const slotEl = document.createElement('div');
      slotEl.className = `card-slot ${card.imageSrc ? 'is-filled' : 'is-empty'} ${isComboBox ? 'combo-packaging-slot' : ''}`;
      slotEl.dataset.slotId = i;

      // Explicit grid positioning for combo layout: cccccc / cccppp / cccppp
      if (state.currentLayout === 'combo') {
        if (i < 6) {
          // Row 1: Cards 0..5 occupy Cols 1..6
          slotEl.style.gridRow = '1';
          slotEl.style.gridColumn = `${i + 1}`;
        } else if (i >= 6 && i <= 8) {
          // Row 2: Cards 6..8 occupy Cols 1..3
          slotEl.style.gridRow = '2';
          slotEl.style.gridColumn = `${i - 5}`;
        } else if (i >= 9 && i <= 11) {
          // Row 3: Cards 9..11 occupy Cols 1..3
          slotEl.style.gridRow = '3';
          slotEl.style.gridColumn = `${i - 8}`;
        } else if (i === 12) {
          // Packaging Box: occupies Cols 4..6 across Rows 2 and 3
          slotEl.style.gridRow = '2 / span 2';
          slotEl.style.gridColumn = '4 / span 3';
        }
      }

      if (card.imageSrc) {
        slotEl.style.backgroundColor = card.bgColor || '#ffffff';

        const contentLayer = document.createElement('div');
        contentLayer.className = 'card-content-layer';

        const imgEl = document.createElement('img');
        imgEl.src = card.imageSrc;
        imgEl.alt = card.fileName || `Card ${i + 1}`;
        
        applyImageTransforms(imgEl, card);
        contentLayer.appendChild(imgEl);
        slotEl.appendChild(contentLayer);

        // Action Overlay
        const overlay = document.createElement('div');
        overlay.className = 'card-action-overlay';
        overlay.innerHTML = `
          <button class="card-action-btn edit-btn" title="Edit Placement & Color" data-action="edit" data-slot-id="${i}">
            <svg class="svg-icon-xs"><use href="#icon-edit"></use></svg>
          </button>
          <button class="card-action-btn replace-btn" title="Replace Image" data-action="replace" data-slot-id="${i}">
            <svg class="svg-icon-xs"><use href="#icon-upload"></use></svg>
          </button>
          <button class="card-action-btn delete-btn" title="Remove Image" data-action="delete" data-slot-id="${i}">
            <svg class="svg-icon-xs"><use href="#icon-trash"></use></svg>
          </button>
        `;
        slotEl.appendChild(overlay);

      } else {
        // Empty State
        const emptyTarget = document.createElement('div');
        emptyTarget.className = 'empty-drop-target';
        emptyTarget.dataset.slotId = i;
        
        let slotLabel = `Card #${i + 1}`;
        if (isPackagingSlot) slotLabel = `Packaging Box #${i + 1}`;
        if (isComboBox) slotLabel = `Packaging Net`;

        emptyTarget.innerHTML = `
          <span class="slot-index-badge">${slotLabel}</span>
          <div class="upload-icon-circle">
            <svg class="svg-icon-sm"><use href="#icon-upload"></use></svg>
          </div>
          <span class="upload-label-text">Upload</span>
        `;
        slotEl.appendChild(emptyTarget);
      }

      setupSlotDropZone(slotEl, i);
      dom.slotsContainer.appendChild(slotEl);
    }
  }

  // Calculate and apply image transforms
  function applyImageTransforms(imgEl, card) {
    const scaleFactor = (card.scale || 100) / 100;
    const posX = card.posX || 0;
    const posY = card.posY || 0;
    const rot = card.rotation || 0;
    const scaleX = card.flipH ? -1 : 1;
    const scaleY = card.flipV ? -1 : 1;

    if (card.fitMode === 'cover') {
      imgEl.style.width = '100%';
      imgEl.style.height = '100%';
      imgEl.style.objectFit = 'cover';
    } else if (card.fitMode === 'contain') {
      imgEl.style.width = '100%';
      imgEl.style.height = '100%';
      imgEl.style.objectFit = 'contain';
    } else if (card.fitMode === 'stretch') {
      imgEl.style.width = '100%';
      imgEl.style.height = '100%';
      imgEl.style.objectFit = 'fill';
    } else {
      imgEl.style.width = 'auto';
      imgEl.style.height = 'auto';
      imgEl.style.maxWidth = '100%';
      imgEl.style.maxHeight = '100%';
      imgEl.style.objectFit = 'contain';
    }

    imgEl.style.transform = `translate(${posX}px, ${posY}px) scale(${scaleFactor}) rotate(${rot}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
  }

  // ==========================================================================
  // Viewport Pan & Zoom Engine (Mouse & Touch)
  // ==========================================================================
  function updateViewportTransform() {
    dom.transformer.style.transform = `translate(${state.viewport.x}px, ${state.viewport.y}px) scale(${state.viewport.zoom})`;
    dom.zoomDisplay.textContent = `${Math.round(state.viewport.zoom * 100)}%`;
  }

  function recenterView() {
    const wsRect = dom.workspace.getBoundingClientRect();
    const sheetWidth = dom.sheet.offsetWidth;
    const sheetHeight = dom.sheet.offsetHeight;

    if (!sheetWidth || !sheetHeight) return;

    const isMobile = window.innerWidth <= 768;
    const padding = isMobile ? 25 : 50;
    const availWidth = wsRect.width - padding * 2;
    const availHeight = wsRect.height - padding * 2;

    const scaleX = availWidth / sheetWidth;
    const scaleY = availHeight / sheetHeight;
    let targetZoom = Math.min(scaleX, scaleY);
    
    targetZoom = Math.max(0.15, Math.min(targetZoom, 1.2));

    const targetX = (wsRect.width - sheetWidth * targetZoom) / 2;
    const targetY = (wsRect.height - sheetHeight * targetZoom) / 2;

    state.viewport.zoom = targetZoom;
    state.viewport.x = targetX;
    state.viewport.y = targetY;

    updateViewportTransform();
  }

  function zoomAtPoint(zoomDelta, clientX, clientY) {
    const wsRect = dom.workspace.getBoundingClientRect();
    const mouseX = clientX - wsRect.left;
    const mouseY = clientY - wsRect.top;

    const prevZoom = state.viewport.zoom;
    let newZoom = prevZoom * zoomDelta;
    newZoom = Math.max(0.15, Math.min(newZoom, 4.0));

    if (newZoom === prevZoom) return;

    const scaleChange = newZoom / prevZoom;
    state.viewport.x = mouseX - (mouseX - state.viewport.x) * scaleChange;
    state.viewport.y = mouseY - (mouseY - state.viewport.y) * scaleChange;
    state.viewport.zoom = newZoom;

    updateViewportTransform();
  }

  // ==========================================================================
  // Image Upload Handling
  // ==========================================================================
  function handleImageFile(file, slotId) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const card = state.cards[slotId] || createDefaultCardState(slotId);
      
      card.imageSrc = dataUrl;
      card.fileName = file.name;
      card.scale = 100;
      card.posX = 0;
      card.posY = 0;
      card.rotation = 0;
      card.flipH = false;
      card.flipV = false;
      card.fitMode = 'contain';

      state.cards[slotId] = card;
      renderSheet();
    };
    reader.readAsDataURL(file);
  }

  function handleBatchFiles(fileList) {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;

    const config = LAYOUT_CONFIGS[state.currentLayout];
    
    let emptySlots = [];
    for (let i = 0; i < config.slotCount; i++) {
      if (!state.cards[i] || !state.cards[i].imageSrc) {
        emptySlots.push(i);
      }
    }

    if (!emptySlots.length) {
      for (let i = 0; i < config.slotCount; i++) emptySlots.push(i);
    }

    files.forEach((file, index) => {
      if (index < emptySlots.length) {
        const slotId = emptySlots[index];
        handleImageFile(file, slotId);
      }
    });
  }

  function setupSlotDropZone(slotEl, slotId) {
    slotEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      slotEl.classList.add('drag-over');
    });

    slotEl.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      slotEl.classList.remove('drag-over');
    });

    slotEl.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      slotEl.classList.remove('drag-over');

      const files = e.dataTransfer.files;
      if (files.length === 1) {
        handleImageFile(files[0], slotId);
      } else if (files.length > 1) {
        handleBatchFiles(files);
      }
    });
  }

  // ==========================================================================
  // Floating Card Customizer / Placement Editor Modal
  // ==========================================================================
  function openEditorModal(slotId) {
    const card = state.cards[slotId];
    if (!card || !card.imageSrc) return;

    state.editor.activeSlotId = slotId;
    state.editor.cardState = JSON.parse(JSON.stringify(card));

    const isPackaging = state.editor.cardState.isPackaging;
    const isComboBox = state.editor.cardState.isComboBox;

    if (isPackaging) {
      dom.editorCardTitle.textContent = `Edit Packaging Box (Slot #${slotId + 1})`;
      dom.previewCard.className = 'editor-preview-card packaging-ratio';
    } else if (isComboBox) {
      dom.editorCardTitle.textContent = `Edit Packaging Net Box`;
      dom.previewCard.className = 'editor-preview-card combo-box-ratio';
    } else {
      dom.editorCardTitle.textContent = `Edit Card (Slot #${slotId + 1})`;
      dom.previewCard.className = 'editor-preview-card';
    }

    dom.previewImg.src = state.editor.cardState.imageSrc;

    syncModalControlsWithState();
    updateModalPreview();

    dom.modal.style.display = 'flex';
  }

  function closeEditorModal() {
    dom.modal.style.display = 'none';
    state.editor.activeSlotId = null;
    state.editor.cardState = null;
  }

  function applyEditorChanges() {
    if (state.editor.activeSlotId !== null && state.editor.cardState) {
      state.cards[state.editor.activeSlotId] = JSON.parse(JSON.stringify(state.editor.cardState));
      renderSheet();
    }
    closeEditorModal();
  }

  function resetEditorCard() {
    if (!state.editor.cardState) return;
    state.editor.cardState.scale = 100;
    state.editor.cardState.posX = 0;
    state.editor.cardState.posY = 0;
    state.editor.cardState.rotation = 0;
    state.editor.cardState.flipH = false;
    state.editor.cardState.flipV = false;
    state.editor.cardState.fitMode = 'contain';
    state.editor.cardState.bgColor = '#ffffff';

    syncModalControlsWithState();
    updateModalPreview();
  }

  function syncModalControlsWithState() {
    const cs = state.editor.cardState;
    if (!cs) return;

    dom.fitButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.fit === cs.fitMode);
    });

    dom.inputScale.value = cs.scale;
    dom.valScale.textContent = `${cs.scale}%`;

    dom.inputPosX.value = cs.posX;
    dom.valPosX.textContent = `${cs.posX}px`;
    dom.inputPosY.value = cs.posY;
    dom.valPosY.textContent = `${cs.posY}px`;

    dom.valRot.textContent = `${cs.rotation}°`;

    const isTrans = cs.bgColor === 'transparent';
    dom.inputBgColor.value = isTrans ? '#ffffff' : cs.bgColor;
    dom.inputBgHex.value = isTrans ? 'TRANSPARENT' : cs.bgColor.toUpperCase();
    dom.valBgHex.textContent = isTrans ? 'TRANSPARENT' : cs.bgColor.toUpperCase();
    dom.swatchPreview.style.backgroundColor = cs.bgColor;
  }

  function updateModalPreview() {
    const cs = state.editor.cardState;
    if (!cs) return;

    dom.previewCard.style.backgroundColor = cs.bgColor;
    applyImageTransforms(dom.previewImg, cs);

    dom.metricFit.textContent = `Fit: ${cs.fitMode.toUpperCase()}`;
    dom.metricScale.textContent = `Scale: ${cs.scale}%`;
    dom.metricPos.textContent = `Pos: (${cs.posX}px, ${cs.posY}px)`;
  }

  // ==========================================================================
  // Event Bindings
  // ==========================================================================
  function bindEvents() {

    // --- Layout Dropdown Popover ---
    dom.btnLayoutDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.layoutMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        dom.layoutMenu.classList.remove('show');
      }
    });

    dom.dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const layoutId = item.dataset.layout;
        if (state.currentLayout === layoutId) {
          dom.layoutMenu.classList.remove('show');
          return;
        }

        dom.dropdownItems.forEach(i => i.classList.toggle('active', i.dataset.layout === layoutId));
        dom.layoutMenu.classList.remove('show');

        state.currentLayout = layoutId;
        initCardsData(layoutId);
        renderSheet();
        recenterView();
      });
    });

    // --- Viewport Navigation Controls ---
    dom.btnRecenter.addEventListener('click', recenterView);

    dom.btnZoomIn.addEventListener('click', () => {
      const wsRect = dom.workspace.getBoundingClientRect();
      zoomAtPoint(1.2, wsRect.left + wsRect.width / 2, wsRect.top + wsRect.height / 2);
    });

    dom.btnZoomOut.addEventListener('click', () => {
      const wsRect = dom.workspace.getBoundingClientRect();
      zoomAtPoint(0.8, wsRect.left + wsRect.width / 2, wsRect.top + wsRect.height / 2);
    });

    // Clear All
    dom.btnClearAll.addEventListener('click', () => {
      if (confirm('Clear all cards on sheet?')) {
        initCardsData(state.currentLayout);
        renderSheet();
      }
    });

    // Print A3 Sheet
    dom.btnPrint.addEventListener('click', () => {
      window.print();
    });

    // --- Batch & Single Upload File Inputs ---
    dom.batchFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length) {
        handleBatchFiles(e.target.files);
        e.target.value = '';
      }
    });

    dom.singleFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length && targetUploadSlotId !== null) {
        handleImageFile(e.target.files[0], targetUploadSlotId);
        targetUploadSlotId = null;
        e.target.value = '';
      }
    });

    // --- Slot Action Clicks (Event Delegation on Sheet) ---
    dom.slotsContainer.addEventListener('click', (e) => {
      const emptyTarget = e.target.closest('.empty-drop-target');
      if (emptyTarget) {
        const slotId = parseInt(emptyTarget.dataset.slotId, 10);
        targetUploadSlotId = slotId;
        dom.singleFileInput.click();
        return;
      }

      const actionBtn = e.target.closest('.card-action-btn');
      if (actionBtn) {
        const action = actionBtn.dataset.action;
        const slotId = parseInt(actionBtn.dataset.slotId, 10);

        if (action === 'edit') {
          openEditorModal(slotId);
        } else if (action === 'replace') {
          targetUploadSlotId = slotId;
          dom.singleFileInput.click();
        } else if (action === 'delete') {
          state.cards[slotId] = createDefaultCardState(
            slotId, 
            state.cards[slotId].isPackaging, 
            state.cards[slotId].isComboBox
          );
          renderSheet();
        }
        return;
      }

      const cardSlot = e.target.closest('.card-slot.is-filled');
      if (cardSlot) {
        document.querySelectorAll('.card-slot.is-touched').forEach(el => {
          if (el !== cardSlot) el.classList.remove('is-touched');
        });
        cardSlot.classList.toggle('is-touched');
      }
    });

    // --- Infinite Canvas Pan (Mouse Drag) ---
    dom.workspace.addEventListener('mousedown', (e) => {
      if (e.target.closest('.floating-toolbar') || e.target.closest('.modal-backdrop')) return;
      if (e.button === 0 || e.button === 1) {
        state.viewport.isPanning = true;
        state.viewport.startX = e.clientX - state.viewport.x;
        state.viewport.startY = e.clientY - state.viewport.y;
        dom.workspace.classList.add('panning');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (state.viewport.isPanning) {
        state.viewport.x = e.clientX - state.viewport.startX;
        state.viewport.y = e.clientY - state.viewport.startY;
        updateViewportTransform();
      }
    });

    window.addEventListener('mouseup', () => {
      if (state.viewport.isPanning) {
        state.viewport.isPanning = false;
        dom.workspace.classList.remove('panning');
      }
    });

    // Mouse Wheel Zooming
    dom.workspace.addEventListener('wheel', (e) => {
      if (e.target.closest('.modal-backdrop')) return;
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      zoomAtPoint(zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // --- Touch Support for Mobile & Tablets (Pan & Pinch-to-Zoom) ---
    let touchStartDist = 0;

    dom.workspace.addEventListener('touchstart', (e) => {
      if (e.target.closest('.floating-toolbar') || e.target.closest('.modal-backdrop')) return;

      if (e.touches.length === 1) {
        state.viewport.isPanning = true;
        state.viewport.startX = e.touches[0].clientX - state.viewport.x;
        state.viewport.startY = e.touches[0].clientY - state.viewport.y;
      } else if (e.touches.length === 2) {
        state.viewport.isPanning = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
        state.viewport.initialZoom = state.viewport.zoom;
      }
    }, { passive: true });

    dom.workspace.addEventListener('touchmove', (e) => {
      if (e.target.closest('.floating-toolbar') || e.target.closest('.modal-backdrop')) return;

      if (e.touches.length === 1 && state.viewport.isPanning) {
        state.viewport.x = e.touches[0].clientX - state.viewport.startX;
        state.viewport.y = e.touches[0].clientY - state.viewport.startY;
        updateViewportTransform();
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = dist / touchStartDist;
        
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        
        let newZoom = Math.max(0.15, Math.min(state.viewport.initialZoom * factor, 4.0));
        zoomAtPoint(newZoom / state.viewport.zoom, midX, midY);
      }
    }, { passive: true });

    dom.workspace.addEventListener('touchend', () => {
      state.viewport.isPanning = false;
      touchStartDist = 0;
    }, { passive: true });

    // Drag & Drop to workspace
    dom.workspace.addEventListener('dragover', (e) => e.preventDefault());
    dom.workspace.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!e.target.closest('.card-slot') && e.dataTransfer.files.length) {
        handleBatchFiles(e.dataTransfer.files);
      }
    });

    // --- Modal Editor Controls Events ---
    dom.modalCloseBtn.addEventListener('click', closeEditorModal);
    dom.modalCancelBtn.addEventListener('click', closeEditorModal);
    dom.modalApplyBtn.addEventListener('click', applyEditorChanges);
    dom.modalResetBtn.addEventListener('click', resetEditorCard);

    dom.modal.addEventListener('click', (e) => {
      if (e.target === dom.modal) closeEditorModal();
    });

    // Fit Mode
    dom.fitButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!state.editor.cardState) return;
        state.editor.cardState.fitMode = btn.dataset.fit;
        syncModalControlsWithState();
        updateModalPreview();
      });
    });

    // Scale
    dom.inputScale.addEventListener('input', (e) => {
      if (!state.editor.cardState) return;
      state.editor.cardState.scale = parseInt(e.target.value, 10);
      dom.valScale.textContent = `${state.editor.cardState.scale}%`;
      updateModalPreview();
    });

    dom.btnScaleReset.addEventListener('click', () => {
      if (!state.editor.cardState) return;
      state.editor.cardState.scale = 100;
      dom.inputScale.value = 100;
      dom.valScale.textContent = '100%';
      updateModalPreview();
    });

    // Position
    dom.inputPosX.addEventListener('input', (e) => {
      if (!state.editor.cardState) return;
      state.editor.cardState.posX = parseInt(e.target.value, 10);
      dom.valPosX.textContent = `${state.editor.cardState.posX}px`;
      updateModalPreview();
    });

    dom.inputPosY.addEventListener('input', (e) => {
      if (!state.editor.cardState) return;
      state.editor.cardState.posY = parseInt(e.target.value, 10);
      dom.valPosY.textContent = `${state.editor.cardState.posY}px`;
      updateModalPreview();
    });

    dom.btnPosCenter.addEventListener('click', () => {
      if (!state.editor.cardState) return;
      state.editor.cardState.posX = 0;
      state.editor.cardState.posY = 0;
      dom.inputPosX.value = 0;
      dom.inputPosY.value = 0;
      dom.valPosX.textContent = '0px';
      dom.valPosY.textContent = '0px';
      updateModalPreview();
    });

    // Direct Drag on Preview Stage Card (Mouse & Touch)
    const handleDragStart = (clientX, clientY) => {
      if (!state.editor.cardState) return;
      state.editor.isDraggingPreview = true;
      state.editor.dragStartX = clientX;
      state.editor.dragStartY = clientY;
      state.editor.initialPosX = state.editor.cardState.posX || 0;
      state.editor.initialPosY = state.editor.cardState.posY || 0;
      dom.previewCard.style.cursor = 'grabbing';
    };

    const handleDragMove = (clientX, clientY) => {
      if (state.editor.isDraggingPreview && state.editor.cardState) {
        const deltaX = clientX - state.editor.dragStartX;
        const deltaY = clientY - state.editor.dragStartY;
        
        let newX = Math.round(state.editor.initialPosX + deltaX);
        let newY = Math.round(state.editor.initialPosY + deltaY);

        newX = Math.max(-180, Math.min(180, newX));
        newY = Math.max(-180, Math.min(180, newY));

        state.editor.cardState.posX = newX;
        state.editor.cardState.posY = newY;

        dom.inputPosX.value = newX;
        dom.inputPosY.value = newY;
        dom.valPosX.textContent = `${newX}px`;
        dom.valPosY.textContent = `${newY}px`;

        updateModalPreview();
      }
    };

    const handleDragEnd = () => {
      if (state.editor.isDraggingPreview) {
        state.editor.isDraggingPreview = false;
        dom.previewCard.style.cursor = 'move';
      }
    };

    dom.previewCard.addEventListener('mousedown', (e) => handleDragStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => handleDragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleDragEnd);

    dom.previewCard.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (state.editor.isDraggingPreview && e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', handleDragEnd);

    // Rotation
    const setRot = (deg) => {
      if (!state.editor.cardState) return;
      state.editor.cardState.rotation = deg;
      dom.valRot.textContent = `${deg}°`;
      updateModalPreview();
    };

    dom.btnRot0.addEventListener('click', () => setRot(0));
    dom.btnRot90.addEventListener('click', () => setRot(90));
    dom.btnRot180.addEventListener('click', () => setRot(180));
    dom.btnRot270.addEventListener('click', () => setRot(270));

    // Flip
    dom.btnFlipH.addEventListener('click', () => {
      if (!state.editor.cardState) return;
      state.editor.cardState.flipH = !state.editor.cardState.flipH;
      dom.btnFlipH.classList.toggle('active', state.editor.cardState.flipH);
      updateModalPreview();
    });

    dom.btnFlipV.addEventListener('click', () => {
      if (!state.editor.cardState) return;
      state.editor.cardState.flipV = !state.editor.cardState.flipV;
      dom.btnFlipV.classList.toggle('active', state.editor.cardState.flipV);
      updateModalPreview();
    });

    // Color Pickers
    function applyBgColor(color) {
      if (!state.editor.cardState) return;
      state.editor.cardState.bgColor = color;
      syncModalControlsWithState();
      updateModalPreview();
    }

    dom.inputBgColor.addEventListener('input', (e) => applyBgColor(e.target.value));

    dom.inputBgHex.addEventListener('change', (e) => {
      let val = e.target.value.trim();
      if (val.toLowerCase() === 'transparent') {
        applyBgColor('transparent');
      } else {
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
          applyBgColor(val);
        }
      }
    });

    dom.swatchButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const col = btn.dataset.color;
        applyBgColor(col);
      });
    });

    if (window.EyeDropper) {
      dom.btnEyedropper.addEventListener('click', async () => {
        try {
          const eyeDropper = new EyeDropper();
          const result = await eyeDropper.open();
          if (result && result.sRGBHex) {
            applyBgColor(result.sRGBHex);
          }
        } catch (err) {
          // Cancelled
        }
      });
    } else {
      dom.btnEyedropper.style.display = 'none';
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dom.modal.style.display === 'flex') {
          closeEditorModal();
        } else if (dom.layoutMenu.classList.contains('show')) {
          dom.layoutMenu.classList.remove('show');
        }
      } else if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        recenterView();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
