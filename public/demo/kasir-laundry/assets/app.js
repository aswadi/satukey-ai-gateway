const STORAGE_KEY = 'cleanwash_pos_pro_v48_db';
let selectedServiceId = 'SRV01';

function getDefaultDatabase() {
  return {
    settings: {
      storeName: 'CleanWash Laundry Kiloan, Express & Dry Clean',
      shortName: 'CleanWash Express',
      address: 'Jl. Kemang Pratama Raya No. 14, Bekasi Selatan',
      phone: '6281299008877',
      bankInfo: 'BCA 8820-4411-90 a.n CleanWash / QRIS CleanWash Official',
      receiptFooter: 'Pengambilan wajib membawa nota/WA. Klaim cucian maks 1x24 jam setelah diambil. Barang tidak diambil >30 hari di luar tanggung jawab kami.'
    },
    services: [
      { id: 'SRV01', name: 'Cuci Komplit Reguler', unit: 'Kg', price: 7500, estHours: 48, express: false },
      { id: 'SRV02', name: 'Express Kilat 6 Jam', unit: 'Kg', price: 14000, estHours: 6, express: true },
      { id: 'SRV03', name: 'One Day Service (24 Jam)', unit: 'Kg', price: 10500, estHours: 24, express: true },
      { id: 'SRV04', name: 'Setrika Uap Boiler Saja', unit: 'Kg', price: 5500, estHours: 24, express: false },
      { id: 'SRV05', name: 'Bedcover Besar / King', unit: 'Pcs', price: 35000, estHours: 36, express: false },
      { id: 'SRV06', name: 'Dry Clean Jas / Kebaya', unit: 'Stel', price: 45000, estHours: 48, express: false },
      { id: 'SRV07', name: 'Cuci Sepatu Sneakers', unit: 'Psg', price: 40000, estHours: 48, express: false },
      { id: 'SRV08', name: 'Cuci Karpet Tebal', unit: 'm²', price: 18000, estHours: 72, express: false }
    ],
    members: [
      { id: 'MBR-001', name: 'Ibu Clarissa Wijaya', phone: '6281288776611', address: 'Cluster Emerald Blok C2 No. 9', tier: 'Gold Deposit', balance: 485000, points: 140 },
      { id: 'MBR-002', name: 'Bpk. Hendra Gunawan', phone: '6281399001122', address: 'Jl. Anggrek Loka Blok A4 No. 12', tier: 'Paket Keluarga 50Kg', balance: 620000, points: 210 },
      { id: 'MBR-003', name: 'dr. Nadia Kusuma', phone: '6285712349876', address: 'Apartemen Grand Center Tower B-1804', tier: 'Gold Deposit', balance: 390000, points: 95 },
      { id: 'MBR-004', name: 'Keluarga Rizky Pratama', phone: '6282177665544', address: 'Perum Taman Galaxy Jl. Pulo Sirih 21', tier: 'Gold Deposit', balance: 750000, points: 260 },
      { id: 'MBR-005', name: 'Kak Dinda Kost Melati', phone: '6287866554433', address: 'Kost Graha Melati Kamar A-04', tier: 'Member Reguler', balance: 180000, points: 45 }
    ],
    orders: [
      { id: 'LDR-2611-009', createdAt: '2026-11-13 08:30', estFinish: '13 Nov 2026 14:30', custName: 'Ibu Clarissa Wijaya', custPhone: '6281288776611', memberId: 'MBR-001', serviceId: 'SRV02', serviceName: 'Express Kilat 6 Jam', unit: 'Kg', qty: 6.5, unitPrice: 14000, discount: 5000, total: 86000, perfume: 'Sakura Blossom', rack: 'Rak EX-01', stage: 'antrian', paid: true, payMethod: 'Deposit Member', express: true, notes: 'Pisah baju putih anak' },
      { id: 'LDR-2611-008', createdAt: '2026-11-13 08:05', estFinish: '15 Nov 2026 08:05', custName: 'Bpk. Dimas Saputra', custPhone: '6281988771122', memberId: '', serviceId: 'SRV05', serviceName: 'Bedcover Besar / King', unit: 'Pcs', qty: 2, unitPrice: 35000, discount: 0, total: 70000, perfume: 'Downy Mystique', rack: 'Rak B-04', stage: 'dicuci', paid: true, payMethod: 'QRIS', express: false, notes: 'Bedcover warna krem + sprei' },
      { id: 'LDR-2611-007', createdAt: '2026-11-13 07:40', estFinish: '14 Nov 2026 07:40', custName: 'dr. Nadia Kusuma', custPhone: '6285712349876', memberId: 'MBR-003', serviceId: 'SRV06', serviceName: 'Dry Clean Jas / Kebaya', unit: 'Stel', qty: 3, unitPrice: 45000, discount: 0, total: 135000, perfume: 'Snappy Luxury', rack: 'Rak G-03', stage: 'dicuci', paid: true, payMethod: 'Deposit Member', express: true, notes: 'Gantung pakai cover jas plastik' },
      { id: 'LDR-2611-006', createdAt: '2026-11-12 16:20', estFinish: '13 Nov 2026 16:20', custName: 'Bpk. Hendra Gunawan', custPhone: '6281399001122', memberId: 'MBR-002', serviceId: 'SRV03', serviceName: 'One Day Service (24 Jam)', unit: 'Kg', qty: 8.2, unitPrice: 10500, discount: 0, total: 86100, perfume: 'Ocean Breeze', rack: 'Rak EX-01', stage: 'disetrika', paid: true, payMethod: 'Deposit Member', express: true, notes: 'Kemeja kerja lipat rapi' },
      { id: 'LDR-2611-005', createdAt: '2026-11-12 14:10', estFinish: '14 Nov 2026 14:10', custName: 'Kak Dinda Kost Melati', custPhone: '6287866554433', memberId: 'MBR-005', serviceId: 'SRV01', serviceName: 'Cuci Komplit Reguler', unit: 'Kg', qty: 5.4, unitPrice: 7500, discount: 0, total: 40500, perfume: 'Sakura Blossom', rack: 'Rak A-01', stage: 'disetrika', paid: false, payMethod: 'Bayar Saat Ambil', express: false, notes: 'Jangan pakai pemutih' },
      { id: 'LDR-2611-004', createdAt: '2026-11-12 10:15', estFinish: '13 Nov 2026 10:15', custName: 'Ibu Sari Rahmawati', custPhone: '6281233445588', memberId: '', serviceId: 'SRV03', serviceName: 'One Day Service (24 Jam)', unit: 'Kg', qty: 7.0, unitPrice: 10500, discount: 0, total: 73500, perfume: 'Sakura Blossom', rack: 'Rak A-02', stage: 'siap_ambil', paid: false, payMethod: 'Bayar Saat Ambil', express: true, notes: 'Siap panggil WA' },
      { id: 'LDR-2611-003', createdAt: '2026-11-11 17:00', estFinish: '13 Nov 2026 09:00', custName: 'Keluarga Rizky Pratama', custPhone: '6282177665544', memberId: 'MBR-004', serviceId: 'SRV01', serviceName: 'Cuci Komplit Reguler', unit: 'Kg', qty: 11.2, unitPrice: 7500, discount: 4000, total: 80000, perfume: 'Lavender Baby', rack: 'Rak A-01', stage: 'siap_ambil', paid: true, payMethod: 'Deposit Member', express: false, notes: 'Pakaian bayi parfum Lavender' },
      { id: 'LDR-2611-002', createdAt: '2026-11-11 11:30', estFinish: '12 Nov 2026 11:30', custName: 'Bpk. Fajar Nugroho', custPhone: '6281877665544', memberId: '', serviceId: 'SRV07', serviceName: 'Cuci Sepatu Sneakers', unit: 'Psg', qty: 3, unitPrice: 40000, discount: 0, total: 120000, perfume: 'Ocean Breeze', rack: 'Rak G-03', stage: 'selesai', paid: true, payMethod: 'Tunai Kasir', express: false, notes: 'Sudah diambil pelanggan' },
      { id: 'LDR-2611-001', createdAt: '2026-11-11 09:00', estFinish: '12 Nov 2026 17:00', custName: 'Resto Nusantara Catering', custPhone: '6281199887744', memberId: '', serviceId: 'SRV08', serviceName: 'Cuci Karpet & Taplak Meja', unit: 'm²', qty: 18, unitPrice: 18000, discount: 10000, total: 314000, perfume: 'Snappy Luxury', rack: 'Rak B-04', stage: 'selesai', paid: true, payMethod: 'Transfer / QRIS', express: false, notes: 'Langganan katering mingguan' }
    ],
    expenses: [
      { id: 'EXP-01', date: '2026-11-03', category: 'Deterjen & Chemical', desc: 'Belanja 6 Jerigen Deterjen Liquid Matic 5L & Anti Noda', amount: 420000 },
      { id: 'EXP-02', date: '2026-11-05', category: 'Bibit Parfum Laundry', desc: 'Bibit Parfum Grade A Sakura Blossom & Snappy 5 Liter', amount: 365000 },
      { id: 'EXP-03', date: '2026-11-07', category: 'Gas LPG Setrika Uap', desc: 'Isi Ulang 4 Tabung Gas LPG 12 Kg Boiler Setrika Uap', amount: 840000 },
      { id: 'EXP-04', date: '2026-11-09', category: 'Listrik PLN & Air', desc: 'Token Listrik 4 Mesin Washer & Dryer Commercial', amount: 650000 },
      { id: 'EXP-05', date: '2026-11-11', category: 'Plastik Packing & Hanger', desc: 'Plastik PP Laundry Berbagai Ukuran, Hanger & Kertas Thermal', amount: 245000 }
    ],
    dailyChart: [
      { day: 'Jum', omset: 690000, biaya: 140000 },
      { day: 'Sab', omset: 1120000, biaya: 195000 },
      { day: 'Min', omset: 1285000, biaya: 210000 },
      { day: 'Sen', omset: 760000, biaya: 135000 },
      { day: 'Sel', omset: 830000, biaya: 160000 },
      { day: 'Rab', omset: 915000, biaya: 155000 }
    ],
    monthlyBaselinePaid: 13978900
  };
}

let db = getDefaultDatabase();

function formatRupiah(n) {
  return 'Rp ' + Math.round(Number(n) || 0).toLocaleString('id-ID');
}

function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.orders)) db = parsed;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }
  } catch {
    db = getDefaultDatabase();
  }

  fetch('/api/db').then(r => r.ok ? r.json() : null).then(sDb => {
    if (sDb && Array.isArray(sDb.orders)) {
      db = sDb;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      refreshAllViews();
    }
  }).catch(() => {});
}

function saveDatabase() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  const el = document.getElementById('syncStatusText');
  if (el) {
    const t = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    el.textContent = `Tersimpan Otomatis (${t})`;
  }
  fetch('/api/db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(db)
  }).catch(() => {});
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.getElementById('tab-' + tabId)?.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });
  if (tabId === 'dashboard') {
    setTimeout(drawRevenueChart, 40);
  } else if (tabId === 'nota') {
    populateNotaSelect();
    renderThermalReceipt();
  }
}

function refreshAllViews() {
  document.getElementById('sidebarStoreName').textContent = db.settings.shortName || db.settings.storeName;
  document.getElementById('headerStoreTitle').textContent = db.settings.storeName;
  document.getElementById('headerStoreSub').textContent = `${db.settings.address} • Kasir Kiloan/Satuan, Tracking Cucian, Nota Thermal Bluetooth & Notif WA`;

  renderKpiCards();
  renderServiceCatalog();
  populateMemberDropdown();
  recalcOrderPreview();
  renderQuickReadyQueue();
  renderKanbanBoard();
  populateNotaSelect();
  renderThermalReceipt();
  renderMembersTable();
  renderExpensesAndReport();
  populateSettings();
  drawRevenueChart();
}

function renderKpiCards() {
  const paidOrdersSum = db.orders.filter(o => o.paid).reduce((s, o) => s + Number(o.total || 0), 0);
  const monthlyOmset = Number(db.monthlyBaselinePaid || 0) + paidOrdersSum;
  const processing = db.orders.filter(o => ['antrian', 'dicuci', 'disetrika'].includes(o.stage));
  const expressCount = processing.filter(o => o.express).length;
  const readyPickup = db.orders.filter(o => o.stage === 'siap_ambil');
  const activeCount = processing.length + readyPickup.length;
  const totalExpenses = db.expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalMemberDeposit = db.members.reduce((s, m) => s + Number(m.balance || 0), 0);
  const netProfit = monthlyOmset - totalExpenses;

  document.getElementById('badgeActiveOrders').textContent = String(activeCount);
  document.getElementById('kpiOmset').textContent = formatRupiah(monthlyOmset);
  document.getElementById('kpiOmsetSub').textContent = `Order Aktif Tercatat: ${formatRupiah(paidOrdersSum)} (${db.orders.length} Nota)`;

  document.getElementById('kpiProcessing').textContent = `${processing.length} Cucian`;
  document.getElementById('kpiProcessingSub').textContent = `${expressCount} Paket Express Prioritas`;

  document.getElementById('kpiReadyPickup').textContent = `${readyPickup.length} Cucian`;
  document.getElementById('kpiReadyPickupSub').textContent = readyPickup.length > 0 ? 'Siap Kirim Notif WA ke Pelanggan!' : 'Semua Rak Bersih Terambil';

  document.getElementById('kpiNetProfit').textContent = formatRupiah(netProfit);
  document.getElementById('kpiNetProfitSub').textContent = `Saldo Deposit Member: ${formatRupiah(totalMemberDeposit)}`;
}

function renderServiceCatalog() {
  const grid = document.getElementById('serviceCatalogGrid');
  if (!grid) return;
  if (!db.services.some(s => s.id === selectedServiceId) && db.services[0]) {
    selectedServiceId = db.services[0].id;
  }
  grid.innerHTML = db.services.map(s => `
    <div class="srv-card ${s.id === selectedServiceId ? 'selected' : ''}" onclick="selectService('${s.id}')">
      <div>
        <div class="srv-name">${s.express ? '⚡ ' : ''}${s.name}</div>
        <div class="srv-meta">Selesai ±${s.estHours} Jam • Satuan: ${s.unit}</div>
      </div>
      <div class="srv-price">${formatRupiah(s.price)}/${s.unit}</div>
    </div>
  `).join('');
}

function selectService(id) {
  selectedServiceId = id;
  renderServiceCatalog();
  recalcOrderPreview();
}

function populateMemberDropdown() {
  const sel = document.getElementById('ordMemberSelect');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = `<option value="">-- Pelanggan Umum / Baru --</option>` +
    db.members.map(m => `<option value="${m.id}">${m.name} (${m.tier} — Saldo ${formatRupiah(m.balance)})</option>`).join('');
  if (cur) sel.value = cur;
}

function applyMemberToOrderForm() {
  const mid = document.getElementById('ordMemberSelect').value;
  const m = db.members.find(x => x.id === mid);
  if (!m) return;
  document.getElementById('ordCustName').value = m.name;
  document.getElementById('ordCustPhone').value = m.phone;
  document.getElementById('ordPaymentStatus').value = 'paid_deposit';
  recalcOrderPreview();
}

function computeEstimatedFinish(hours) {
  const d = new Date(Date.now() + Number(hours || 24) * 3600 * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function recalcOrderPreview() {
  const srv = db.services.find(s => s.id === selectedServiceId) || db.services[0];
  if (!srv) return;
  document.getElementById('ordQtyLabel').textContent = `Berat / Jumlah (${srv.unit}) — ${formatRupiah(srv.price)}/${srv.unit}`;
  const qty = Math.max(0.1, Number(document.getElementById('ordQty').value) || 0);
  const disc = Math.max(0, Number(document.getElementById('ordDiscount').value) || 0);
  const total = Math.max(0, Math.round(qty * srv.price - disc));
  document.getElementById('ordEstFinishText').textContent = `Layanan: ${srv.name} • Estimasi Selesai: ${computeEstimatedFinish(srv.estHours)}`;
  document.getElementById('ordTotalPreview').textContent = formatRupiah(total);
}

function submitNewLaundryOrder(goNota = true, openWa = false) {
  const srv = db.services.find(s => s.id === selectedServiceId) || db.services[0];
  const custName = document.getElementById('ordCustName').value.trim();
  const custPhone = document.getElementById('ordCustPhone').value.trim() || '6281200000000';
  if (!custName) {
    alert('Masukkan Nama Pelanggan terlebih dahulu!');
    document.getElementById('ordCustName').focus();
    return;
  }
  const qty = Math.max(0.1, Number(document.getElementById('ordQty').value) || 1);
  const discount = Math.max(0, Number(document.getElementById('ordDiscount').value) || 0);
  const total = Math.max(0, Math.round(qty * srv.price - discount));
  const payVal = document.getElementById('ordPaymentStatus').value;
  const memberId = document.getElementById('ordMemberSelect').value;

  let paid = payVal !== 'unpaid';
  let payMethod = 'Bayar Saat Ambil';
  if (payVal === 'paid_tunai') payMethod = 'Tunai Kasir';
  if (payVal === 'paid_qris') payMethod = 'Transfer / QRIS';
  if (payVal === 'paid_deposit') {
    const mbr = db.members.find(m => m.id === memberId);
    if (!mbr) return alert('Pilih Pelanggan Member terlebih dahulu untuk potong Saldo Deposit!');
    if (mbr.balance < total) return alert(`Saldo Deposit ${mbr.name} (${formatRupiah(mbr.balance)}) tidak mencukupi! Silakan Top-Up dulu.`);
    mbr.balance -= total;
    mbr.points = (Number(mbr.points) || 0) + Math.floor(total / 10000);
    payMethod = 'Deposit Member';
  }

  const now = new Date();
  const orderId = `LDR-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}-${String(db.orders.length + 1).padStart(3, '0')}`;
  const newOrder = {
    id: orderId,
    createdAt: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
    estFinish: computeEstimatedFinish(srv.estHours),
    custName,
    custPhone,
    memberId,
    serviceId: srv.id,
    serviceName: srv.name,
    unit: srv.unit,
    qty,
    unitPrice: srv.price,
    discount,
    total,
    perfume: document.getElementById('ordPerfume').value,
    rack: document.getElementById('ordRack').value,
    stage: 'antrian',
    paid,
    payMethod,
    express: Boolean(srv.express),
    notes: document.getElementById('ordNotes').value.trim() || '-'
  };

  db.orders.unshift(newOrder);
  document.getElementById('ordCustName').value = '';
  document.getElementById('ordNotes').value = '';
  document.getElementById('ordMemberSelect').value = '';
  saveDatabase();
  refreshAllViews();

  if (openWa) {
    openWaModal(newOrder.id, 'order');
  } else if (goNota) {
    jumpToNota(newOrder.id);
  }
}

function renderQuickReadyQueue() {
  const box = document.getElementById('quickReadyList');
  if (!box) return;
  const list = db.orders.filter(o => o.stage === 'siap_ambil' || o.express).slice(0, 4);
  box.innerHTML = list.map(o => `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 11px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;">
      <div>
        <div style="font-weight:800;font-size:12.8px;color:#fff;">
          ${o.id} — ${o.custName}
          ${o.stage === 'siap_ambil' ? '<span class="status-badge badge-paid" style="margin-left:6px;">SIAP AMBIL</span>' : '<span class="status-badge badge-express" style="margin-left:6px;">EXPRESS</span>'}
        </div>
        <div style="font-size:11.5px;color:#94a3b8;">${o.serviceName} (${o.qty} ${o.unit}) • ${o.rack} • ${formatRupiah(o.total)}</div>
      </div>
      <div style="display:flex;gap:6px;">
        <button class="btn btn-wa btn-sm" onclick="openWaModal('${o.id}', '${o.stage === 'siap_ambil' ? 'ready' : 'order'}')">📲 WA</button>
        <button class="btn btn-cyan btn-sm" onclick="jumpToNota('${o.id}')">🧾 Struk</button>
      </div>
    </div>
  `).join('');
}

/* KANBAN TRACKING CUCIAN */
const STAGES = [
  { key: 'antrian', title: '1. Antrian Masuk', color: '#38bdf8', next: 'dicuci', nextLabel: 'Cuci →' },
  { key: 'dicuci', title: '2. Sedang Dicuci', color: '#8b5cf6', next: 'disetrika', nextLabel: 'Setrika →' },
  { key: 'disetrika', title: '3. Setrika & Packing', color: '#f59e0b', next: 'siap_ambil', nextLabel: 'Siap Ambil →' },
  { key: 'siap_ambil', title: '4. Siap Ambil (Rak)', color: '#10b981', next: 'selesai', nextLabel: 'Serahkan ✓' },
  { key: 'selesai', title: '5. Selesai Diambil', color: '#64748b', next: '', nextLabel: '' }
];

function renderKanbanBoard() {
  const board = document.getElementById('kanbanBoardContainer');
  if (!board) return;
  const q = (document.getElementById('kanbanSearchInput')?.value || '').toLowerCase();

  board.innerHTML = STAGES.map(st => {
    const items = db.orders.filter(o =>
      o.stage === st.key &&
      (!q || o.id.toLowerCase().includes(q) || o.custName.toLowerCase().includes(q) || o.rack.toLowerCase().includes(q))
    );
    return `
      <div class="kanban-col">
        <div class="kanban-col-head">
          <span style="color:${st.color};">${st.title}</span>
          <span class="status-badge badge-info">${items.length}</span>
        </div>
        ${items.map(o => `
          <div class="kanban-card ${o.express ? 'express' : ''}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-family:monospace;font-weight:800;font-size:12px;color:#7dd3fc;">${o.id}</span>
              <span class="status-badge ${o.paid ? 'badge-paid' : 'badge-unpaid'}">${o.paid ? 'LUNAS' : 'BELUM BAYAR'}</span>
            </div>
            <div style="font-weight:800;font-size:13px;color:#fff;">${o.custName}</div>
            <div style="font-size:11.5px;color:#cbd5e1;">${o.serviceName} • <strong>${o.qty} ${o.unit}</strong></div>
            <div style="font-size:11px;color:#94a3b8;">🌸 ${o.perfume} • 📦 ${o.rack}</div>
            <div style="font-size:12.5px;font-weight:800;color:#34d399;">${formatRupiah(o.total)}</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:3px;">
              ${st.next ? `<button class="btn btn-emerald btn-sm" onclick="advanceOrderStage('${o.id}', '${st.next}')">${st.nextLabel}</button>` : ''}
              ${!o.paid ? `<button class="btn btn-amber btn-sm" onclick="markOrderPaid('${o.id}')">Lunasi</button>` : ''}
              <button class="btn btn-wa btn-sm" onclick="openWaModal('${o.id}', '${o.stage === 'siap_ambil' ? 'ready' : 'order'}')">📲 WA</button>
              <button class="btn btn-outline btn-sm" onclick="jumpToNota('${o.id}')">🧾</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

function advanceOrderStage(orderId, nextStage) {
  const ord = db.orders.find(o => o.id === orderId);
  if (!ord) return;
  ord.stage = nextStage;
  if (nextStage === 'selesai' && !ord.paid) {
    ord.paid = true;
    ord.payMethod = 'Tunai Saat Ambil';
  }
  saveDatabase();
  refreshAllViews();
  if (nextStage === 'siap_ambil') {
    openWaModal(ord.id, 'ready');
  }
}

function markOrderPaid(orderId) {
  const ord = db.orders.find(o => o.id === orderId);
  if (!ord) return;
  ord.paid = true;
  ord.payMethod = 'Tunai / QRIS';
  saveDatabase();
  refreshAllViews();
}

/* THERMAL NOTA 58MM / 80MM / A4 & WHATSAPP */
function populateNotaSelect() {
  const sel = document.getElementById('notaSelectOrder');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = db.orders.map(o =>
    `<option value="${o.id}">${o.id} — ${o.custName} (${o.qty} ${o.unit} • ${formatRupiah(o.total)})</option>`
  ).join('');
  if (prev && db.orders.some(o => o.id === prev)) sel.value = prev;
}

function jumpToNota(orderId) {
  switchTab('nota');
  const sel = document.getElementById('notaSelectOrder');
  if (sel) {
    sel.value = orderId;
    renderThermalReceipt();
  }
}

function renderThermalReceipt() {
  const sel = document.getElementById('notaSelectOrder');
  const widthCls = document.getElementById('notaPaperWidth')?.value || 'w58';
  const box = document.getElementById('thermalPreviewContainer');
  if (!box) return;
  const o = db.orders.find(x => x.id === (sel ? sel.value : '')) || db.orders[0];
  if (!o) {
    box.innerHTML = `<div class="panel">Belum ada data nota order.</div>`;
    return;
  }

  const stageLabel = (STAGES.find(s => s.key === o.stage)?.title || o.stage).replace(/^\d+\.\s*/, '');

  box.innerHTML = `
    <div class="thermal-paper ${widthCls}">
      <div style="text-align:center;border-bottom:2px dashed #0f172a;padding-bottom:10px;margin-bottom:10px;">
        <div style="font-weight:900;font-size:16px;letter-spacing:0.02em;">${db.settings.shortName || db.settings.storeName}</div>
        <div style="font-size:11px;margin-top:2px;">${db.settings.address}</div>
        <div style="font-size:11px;font-weight:700;">WA: ${db.settings.phone}</div>
      </div>

      <div style="line-height:1.6;">
        <div style="display:flex;justify-content:space-between;"><span>No. Nota</span><strong>${o.id}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Masuk</span><span>${o.createdAt}</span></div>
        <div style="display:flex;justify-content:space-between;"><span>Est. Selesai</span><strong>${o.estFinish}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Pelanggan</span><strong>${o.custName}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Parfum</span><span>${o.perfume}</span></div>
        <div style="display:flex;justify-content:space-between;"><span>Lokasi Rak</span><strong>${o.rack} (${stageLabel})</strong></div>
      </div>

      <div style="border-top:1px dashed #0f172a;border-bottom:1px dashed #0f172a;margin:10px 0;padding:8px 0;">
        <div style="font-weight:800;margin-bottom:4px;">${o.serviceName}</div>
        <div style="display:flex;justify-content:space-between;">
          <span>${o.qty} ${o.unit} x ${formatRupiah(o.unitPrice)}</span>
          <strong>${formatRupiah(Math.round(o.qty * o.unitPrice))}</strong>
        </div>
        ${o.discount > 0 ? `<div style="display:flex;justify-content:space-between;"><span>Diskon Promo</span><span>-${formatRupiah(o.discount)}</span></div>` : ''}
        <div style="display:flex;justify-content:space-between;font-weight:900;font-size:14.5px;margin-top:7px;padding-top:6px;border-top:1px solid #cbd5e1;">
          <span>TOTAL BAYAR</span>
          <span>${formatRupiah(o.total)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:4px;font-weight:800;">
          <span>STATUS</span>
          <span>${o.paid ? 'LUNAS (' + o.payMethod + ')' : 'BELUM LUNAS (BAYAR SAAT AMBIL)'}</span>
        </div>
      </div>

      ${o.notes && o.notes !== '-' ? `<div style="font-size:11px;margin-bottom:8px;"><strong>Catatan:</strong> ${o.notes}</div>` : ''}

      <div style="text-align:center;margin-top:8px;">
        <div class="barcode-bars"></div>
        <div style="font-size:10.5px;letter-spacing:0.18em;font-weight:700;">*${o.id}*</div>
        <div style="font-size:10.5px;margin-top:8px;color:#334155;">${db.settings.bankInfo}</div>
        <div style="font-size:10px;margin-top:6px;color:#475569;line-height:1.4;">${db.settings.receiptFooter}</div>
      </div>
    </div>
  `;
}

function buildLaundryWaText(o, mode = 'order') {
  if (mode === 'ready') {
    return (
      `Halo Kak *${o.custName}* 👋,\n\n` +
      `Kabar gembira dari *${db.settings.storeName}*! Cucian Kakak sudah *SELESAI, WANGI & RAPI* serta siap diambil / diantar:\n\n` +
      `🧺 *DETAIL NOTA (${o.id}):*\n` +
      `• Layanan: ${o.serviceName} (${o.qty} ${o.unit})\n` +
      `• Parfum: ${o.perfume}\n` +
      `• Posisi Simpan: *${o.rack}*\n` +
      `• Total Tagihan: *${formatRupiah(o.total)}*\n` +
      `• Status Bayar: *${o.paid ? 'SUDAH LUNAS (' + o.payMethod + ')' : 'BELUM LUNAS — ' + formatRupiah(o.total)}*\n\n` +
      (!o.paid ? `💳 Pembayaran bisa Tunai atau Transfer/QRIS:\n${db.settings.bankInfo}\n\n` : '') +
      `Silakan tunjukkan pesan WhatsApp ini saat pengambilan ya Kak. Terima kasih sudah mempercayakan pakaian Anda di *${db.settings.shortName}*! 🙏✨`
    );
  }

  return (
    `Halo Kak *${o.custName}* 👋,\n\n` +
    `Terima kasih! Berikut *Nota Elektronik Resmi* cucian Kakak di *${db.settings.storeName}*:\n\n` +
    `🧾 *NO. NOTA: ${o.id}*\n` +
    `• Masuk: ${o.createdAt}\n` +
    `• Estimasi Selesai: *${o.estFinish}*\n` +
    `• Layanan: ${o.serviceName} (${o.qty} ${o.unit} x ${formatRupiah(o.unitPrice)})\n` +
    `• Aroma Parfum: ${o.perfume}\n` +
    (o.discount > 0 ? `• Diskon: -${formatRupiah(o.discount)}\n` : '') +
    `• *TOTAL: ${formatRupiah(o.total)}*\n` +
    `• Status: *${o.paid ? 'LUNAS (' + o.payMethod + ')' : 'BAYAR SAAT AMBIL'}*\n\n` +
    `Kami akan mengirimkan notifikasi WhatsApp otomatis segera setelah cucian selesai dan siap diambil. Terima kasih Kak 🙏`
  );
}

function openWaModal(orderId, mode = 'order') {
  const o = db.orders.find(x => x.id === orderId);
  if (!o) return;
  document.getElementById('waPhoneInput').value = String(o.custPhone || '').replace(/[^0-9]/g, '').replace(/^0/, '62');
  document.getElementById('waTextInput').value = buildLaundryWaText(o, mode);
  document.getElementById('waModal').classList.add('open');
}

function openWaForSelectedNota(mode) {
  const id = document.getElementById('notaSelectOrder')?.value;
  if (id) openWaModal(id, mode);
}

function copyWaText() {
  navigator.clipboard.writeText(document.getElementById('waTextInput').value).then(() => alert('Pesan nota WhatsApp berhasil disalin!'));
}

function sendWaNow() {
  const ph = document.getElementById('waPhoneInput').value.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const txt = document.getElementById('waTextInput').value;
  window.open(`https://wa.me/${ph}?text=${encodeURIComponent(txt)}`, '_blank');
}

/* CHART OMSET HARIAN */
function drawRevenueChart() {
  const canvas = document.getElementById('laundryChartCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const W = Math.max(rect.width, 420);
  const H = 220;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const todayPaid = db.orders.filter(o => o.paid).reduce((s, o) => s + Number(o.total || 0), 0);
  const series = [
    ...(db.dailyChart || []),
    { day: 'Hari Ini', omset: todayPaid, biaya: 165000 }
  ];
  const maxVal = Math.max(...series.map(d => d.omset), 500000) * 1.18;
  const padL = 56, padR = 16, padT = 24, padB = 32;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.font = '600 10.5px Segoe UI, sans-serif';
  ctx.fillStyle = '#94a3b8';
  for (let i = 0; i <= 4; i++) {
    const y = padT + (plotH * i) / 4;
    const v = maxVal * (1 - i / 4);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillText(Math.round(v / 1000) + 'rb', 8, y + 4);
  }

  const gW = plotW / series.length;
  const bW = Math.min(22, gW * 0.32);
  const pts = [];

  series.forEach((d, i) => {
    const cx = padL + gW * i + gW / 2;
    const hOmset = (d.omset / maxVal) * plotH;
    const hBiaya = (d.biaya / maxVal) * plotH;
    const laba = Math.max(0, d.omset - d.biaya);
    pts.push({ x: cx, y: padT + plotH - (laba / maxVal) * plotH });

    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.roundRect(cx - bW - 2, padT + plotH - hOmset, bW, hOmset, [5, 5, 0, 0]); ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.roundRect(cx + 2, padT + plotH - hBiaya, bW, hBiaya, [5, 5, 0, 0]); ctx.fill();

    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.fillText(d.day, cx, H - 10);
  });

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#10b981'; ctx.fillRect(padL, 4, 9, 9);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Omset Masuk', padL + 13, 12);
  ctx.fillStyle = '#f43f5e'; ctx.fillRect(padL + 105, 4, 9, 9);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Biaya Bahan', padL + 118, 12);
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(padL + 204, 4, 9, 9);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Laba Bersih', padL + 217, 12);
}

/* MEMBERS DEPOSIT */
function renderMembersTable() {
  const tbody = document.getElementById('membersTableBody');
  if (!tbody) return;
  tbody.innerHTML = db.members.map(m => `
    <tr>
      <td style="font-family:monospace;font-weight:800;color:#7dd3fc;">${m.id}</td>
      <td><strong>${m.name}</strong></td>
      <td><a href="https://wa.me/${m.phone.replace(/^0/, '62')}" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:700;">📲 ${m.phone}</a></td>
      <td style="color:#cbd5e1;">${m.address}</td>
      <td><span class="status-badge badge-express">${m.tier}</span></td>
      <td style="font-weight:800;color:#34d399;font-size:13.5px;">${formatRupiah(m.balance)}</td>
      <td><strong>${m.points || 0} Poin</strong></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-emerald btn-sm" onclick="topUpMemberQuick('${m.id}')">+ Top-Up</button>
          <button class="btn btn-outline btn-sm" onclick="openMemberModal('${m.id}')">Edit</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openMemberModal(id = '') {
  const m = db.members.find(x => x.id === id);
  document.getElementById('memEditId').value = m ? m.id : '';
  document.getElementById('memName').value = m ? m.name : '';
  document.getElementById('memPhone').value = m ? m.phone : '';
  document.getElementById('memAddress').value = m ? m.address : '';
  document.getElementById('memTier').value = m ? m.tier : 'Gold Deposit';
  document.getElementById('memBalance').value = m ? m.balance : 250000;
  document.getElementById('memberModal').classList.add('open');
}

function saveMemberModal() {
  const editId = document.getElementById('memEditId').value;
  const name = document.getElementById('memName').value.trim();
  if (!name) return alert('Nama member wajib diisi!');
  const payload = {
    id: editId || `MBR-${String(db.members.length + 1).padStart(3, '0')}`,
    name,
    phone: document.getElementById('memPhone').value.trim() || '6281200000000',
    address: document.getElementById('memAddress').value.trim() || '-',
    tier: document.getElementById('memTier').value,
    balance: Number(document.getElementById('memBalance').value) || 0,
    points: 50
  };
  if (editId) {
    const idx = db.members.findIndex(x => x.id === editId);
    if (idx >= 0) {
      payload.points = db.members[idx].points;
      db.members[idx] = payload;
    }
  } else {
    db.members.unshift(payload);
  }
  saveDatabase();
  closeModal('memberModal');
  refreshAllViews();
}

function topUpMemberQuick(id) {
  const m = db.members.find(x => x.id === id);
  if (!m) return;
  const nominal = Number(prompt(`Masukkan nominal Top-Up Deposit untuk ${m.name} (Rp):`, '200000'));
  if (!nominal || nominal <= 0) return;
  m.balance += nominal;
  m.points = (Number(m.points) || 0) + Math.floor(nominal / 10000);
  saveDatabase();
  refreshAllViews();
}

/* EXPENSES & REPORT */
function renderExpensesAndReport() {
  const tbody = document.getElementById('expensesTableBody');
  if (tbody) {
    tbody.innerHTML = db.expenses.map(e => `
      <tr>
        <td>${e.date}</td>
        <td><span class="status-badge badge-info">${e.category}</span></td>
        <td>${e.desc}</td>
        <td style="font-weight:800;color:#fda4af;">${formatRupiah(e.amount)}</td>
        <td><button class="btn btn-rose btn-sm" onclick="deleteExpense('${e.id}')">Hapus</button></td>
      </tr>
    `).join('');
  }

  const paidOrders = db.orders.filter(o => o.paid).reduce((s, o) => s + Number(o.total || 0), 0);
  const unpaidOrders = db.orders.filter(o => !o.paid).reduce((s, o) => s + Number(o.total || 0), 0);
  const monthlyGross = Number(db.monthlyBaselinePaid || 0) + paidOrders;
  const totalExp = db.expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const net = monthlyGross - totalExp;

  const rep = document.getElementById('laundryReportSummary');
  if (rep) {
    rep.innerHTML = `
      <div style="background:#07101e;border:1px solid var(--border);border-radius:12px;padding:15px;font-size:13px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
          <span style="color:#94a3b8;">Total Omset Lunas Bulan Ini</span>
          <strong style="color:#34d399;">+ ${formatRupiah(monthlyGross)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
          <span style="color:#94a3b8;">Tagihan Bayar Saat Ambil (Piutang)</span>
          <strong style="color:#fcd34d;">${formatRupiah(unpaidOrders)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
          <span style="color:#94a3b8;">Total Belanja Operasional Laundry</span>
          <strong style="color:#fda4af;">- ${formatRupiah(totalExp)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:12px 0 4px;font-size:15.5px;">
          <strong>PROFIT BERSIH LAUNDRY</strong>
          <strong style="color:#4ade80;font-size:18px;">${formatRupiah(net)}</strong>
        </div>
      </div>
    `;
  }
}

function openExpenseModal() {
  document.getElementById('expDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('expDesc').value = '';
  document.getElementById('expAmount').value = '';
  document.getElementById('expenseModal').classList.add('open');
}

function saveExpenseModal() {
  const desc = document.getElementById('expDesc').value.trim();
  const amount = Number(document.getElementById('expAmount').value) || 0;
  if (!desc || amount <= 0) return alert('Lengkapi keterangan dan nominal biaya!');
  db.expenses.unshift({
    id: 'EXP-' + Date.now(),
    date: document.getElementById('expDate').value,
    category: document.getElementById('expCategory').value,
    desc,
    amount
  });
  saveDatabase();
  closeModal('expenseModal');
  refreshAllViews();
}

function deleteExpense(id) {
  db.expenses = db.expenses.filter(e => e.id !== id);
  saveDatabase();
  refreshAllViews();
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

/* SETTINGS, CSV & BACKUP */
function populateSettings() {
  document.getElementById('setStoreName').value = db.settings.storeName || '';
  document.getElementById('setStoreAddress').value = db.settings.address || '';
  document.getElementById('setStorePhone').value = db.settings.phone || '';
  document.getElementById('setBankInfo').value = db.settings.bankInfo || '';
  document.getElementById('setReceiptFooter').value = db.settings.receiptFooter || '';
}

function saveSettings() {
  db.settings.storeName = document.getElementById('setStoreName').value.trim();
  db.settings.shortName = db.settings.storeName.slice(0, 22);
  db.settings.address = document.getElementById('setStoreAddress').value.trim();
  db.settings.phone = document.getElementById('setStorePhone').value.trim();
  db.settings.bankInfo = document.getElementById('setBankInfo').value.trim();
  db.settings.receiptFooter = document.getElementById('setReceiptFooter').value.trim();
  saveDatabase();
  refreshAllViews();
  alert('Profil Outlet Laundry berhasil disimpan!');
}

function exportOrdersCsv() {
  const head = ['No_Nota', 'Tanggal_Masuk', 'Estimasi_Selesai', 'Pelanggan', 'WhatsApp', 'Layanan', 'Qty', 'Satuan', 'Parfum', 'Rak', 'Tahap_Cucian', 'Total_Rp', 'Status_Bayar'];
  const rows = [head.join(',')];
  db.orders.forEach(o => {
    rows.push([
      o.id,
      `"${o.createdAt}"`,
      `"${o.estFinish}"`,
      `"${(o.custName || '').replace(/"/g, '""')}"`,
      o.custPhone,
      `"${o.serviceName}"`,
      o.qty,
      o.unit,
      `"${o.perfume}"`,
      `"${o.rack}"`,
      o.stage,
      o.total,
      o.paid ? 'LUNAS' : 'BELUM_BAYAR'
    ].join(','));
  });
  const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Laporan_Kasir_Laundry_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

function downloadBackupJson() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Backup_CleanWash_Laundry_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

function restoreBackupJson(ev) {
  const f = ev.target.files?.[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const parsed = JSON.parse(String(r.result || '{}'));
      if (!Array.isArray(parsed.orders)) throw new Error('Invalid');
      db = parsed;
      saveDatabase();
      refreshAllViews();
      alert('Database Laundry berhasil dipulihkan!');
    } catch {
      alert('File JSON backup tidak valid.');
    }
  };
  r.readAsText(f);
}

function resetSampleData() {
  if (!confirm('Muat ulang data contoh realistis CleanWash Laundry?')) return;
  db = getDefaultDatabase();
  saveDatabase();
  refreshAllViews();
}

function resetEmptyData() {
  if (!confirm('Kosongkan transaksi contoh untuk mulai usaha laundry Anda sendiri dari nol?')) return;
  db.orders = [];
  db.members = [];
  db.expenses = [];
  db.dailyChart = [];
  db.monthlyBaselinePaid = 0;
  saveDatabase();
  refreshAllViews();
}

window.addEventListener('resize', () => {
  if (document.getElementById('tab-dashboard')?.classList.contains('active')) {
    drawRevenueChart();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadDatabase();
  refreshAllViews();
});
