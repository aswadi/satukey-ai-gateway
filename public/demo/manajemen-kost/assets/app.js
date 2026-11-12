const STORAGE_KEY = 'kostpintar_pro_v45_db';
let activeRoomFilter = 'all';
let uploadedKtpDataUrl = '';

function getDefaultDatabase() {
  return {
    settings: {
      kostName: 'Kost & Kontrakan Graha Emerald Residence',
      shortName: 'Kost Graha Emerald',
      address: 'Jl. Melati Raya No. 28, Setiabudi, Jakarta Selatan',
      ownerName: 'H. Budi Santoso, S.E.',
      ownerPhone: '6281299887766',
      bankInfo: 'BCA 7410-8899-21 a.n Budi Santoso / Mandiri 124-00-9876543-2 / QRIS Kost Graha Emerald',
      kwhRate: 1700,
      dailyFine: 25000
    },
    rooms: [
      { id: 'R01', code: 'A-01', floor: 'Lantai 1', type: 'VIP AC + KM Dalam + Water Heater', price: 2150000, status: 'terisi', lastKwh: 1420 },
      { id: 'R02', code: 'A-02', floor: 'Lantai 1', type: 'VIP AC + KM Dalam + Water Heater', price: 2150000, status: 'terisi', lastKwh: 1385 },
      { id: 'R03', code: 'A-03', floor: 'Lantai 1', type: 'Standar AC + KM Dalam + WiFi', price: 1750000, status: 'jatuh_tempo', lastKwh: 1190 },
      { id: 'R04', code: 'A-04', floor: 'Lantai 1', type: 'Standar AC + KM Dalam + WiFi', price: 1750000, status: 'terisi', lastKwh: 1260 },
      { id: 'R05', code: 'A-05', floor: 'Lantai 1', type: 'Standar AC + KM Dalam + WiFi', price: 1750000, status: 'kosong', lastKwh: 980 },
      { id: 'R06', code: 'A-06', floor: 'Lantai 1', type: 'Standar AC + KM Dalam + WiFi', price: 1750000, status: 'terisi', lastKwh: 1510 },
      { id: 'R07', code: 'B-07', floor: 'Lantai 2', type: 'Reguler AC + Balkon + WiFi', price: 1550000, status: 'terisi', lastKwh: 1095 },
      { id: 'R08', code: 'B-08', floor: 'Lantai 2', type: 'Reguler AC + Balkon + WiFi', price: 1550000, status: 'jatuh_tempo', lastKwh: 1140 },
      { id: 'R09', code: 'B-09', floor: 'Lantai 2', type: 'Reguler Non-AC + WiFi Cepat', price: 1150000, status: 'terisi', lastKwh: 740 },
      { id: 'R10', code: 'B-10', floor: 'Lantai 2', type: 'Reguler Non-AC + WiFi Cepat', price: 1150000, status: 'perbaikan', lastKwh: 695 },
      { id: 'R11', code: 'K-11', floor: 'Kontrakan Petak', type: 'Kontrakan 2 Kamar + Dapur + Teras', price: 2650000, status: 'terisi', lastKwh: 2140 },
      { id: 'R12', code: 'K-12', floor: 'Kontrakan Petak', type: 'Kontrakan 2 Kamar + Dapur + Teras', price: 2650000, status: 'kosong', lastKwh: 1890 }
    ],
    tenants: [
      { id: 'T01', roomCode: 'A-01', name: 'Raka Pratama Putra', nik: '3174041505980003', phone: '6281287654321', job: 'Software Engineer - SCBD', checkIn: '2026-02-05', deposit: 1000000, emergName: 'Bpk. Hendra Pratama (Ayah)', emergPhone: '628119988221', ktpImg: '' },
      { id: 'T02', roomCode: 'A-02', name: 'Nadia Putri Maharani', nik: '3273085209990001', phone: '6281377889900', job: 'Analis Perbankan - Kuningan', checkIn: '2026-03-01', deposit: 1000000, emergName: 'Ibu Sulastri (Ibu)', emergPhone: '6281266554433', ktpImg: '' },
      { id: 'T03', roomCode: 'A-03', name: 'Dimas Arya Saputra', nik: '3374021911970004', phone: '6285711223344', job: 'Account Executive - Gatot Subroto', checkIn: '2026-04-08', deposit: 500000, emergName: 'Bpk. Wahyudi (Ayah)', emergPhone: '6281322334455', ktpImg: '' },
      { id: 'T04', roomCode: 'A-04', name: 'Siti Aisyah Rahma', nik: '3578044406000002', phone: '6282199008877', job: 'Apoteker Klinik Pratama', checkIn: '2026-01-10', deposit: 500000, emergName: 'Bpk. H. Ridwan (Wali)', emergPhone: '6281233445566', ktpImg: '' },
      { id: 'T06', roomCode: 'A-06', name: 'Fajar Nugroho', nik: '3471091203960005', phone: '6281908877665', job: 'Konsultan Pajak', checkIn: '2026-05-03', deposit: 500000, emergName: 'Ibu Ratna Dewi (Kakak)', emergPhone: '6281766554422', ktpImg: '' },
      { id: 'T07', roomCode: 'B-07', name: 'Kevin Wijaya', nik: '3671052807010003', phone: '6285266778899', job: 'Mahasiswa S2 Universitas Atma Jaya', checkIn: '2026-06-05', deposit: 500000, emergName: 'Bpk. Anton Wijaya (Ayah)', emergPhone: '628118877665', ktpImg: '' },
      { id: 'T08', roomCode: 'B-08', name: 'Aulia Zahra Permata', nik: '3276026112020001', phone: '6287855443322', job: 'Desainer UI/UX Agensi Digital', checkIn: '2026-07-07', deposit: 500000, emergName: 'Ibu Dewi Sartika (Ibu)', emergPhone: '6281899001122', ktpImg: '' },
      { id: 'T09', roomCode: 'B-09', name: 'Bagas Adi Kurniawan', nik: '3302110904010002', phone: '6289612345678', job: 'Staff Logistik E-Commerce', checkIn: '2026-04-12', deposit: 350000, emergName: 'Bpk. Slamet Kurniawan (Ayah)', emergPhone: '6285644332211', ktpImg: '' },
      { id: 'T11', roomCode: 'K-11', name: 'Keluarga Reza & Intan', nik: '3175071802940006', phone: '6281234987654', job: 'Wiraswasta Kuliner UMKM', checkIn: '2026-01-05', deposit: 1500000, emergName: 'Bpk. Herman (Orang Tua)', emergPhone: '6281355667788', ktpImg: '' }
    ],
    bills: [
      { id: 'KW-202611-001', roomCode: 'A-01', tenantId: 'T01', tenantName: 'Raka Pratama Putra', tenantPhone: '6281287654321', period: 'November 2026', dueDate: '2026-11-05', baseRent: 2150000, kwhUsed: 92, electricCost: 156400, waterCost: 50000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-04', paymentMethod: 'Transfer BCA' },
      { id: 'KW-202611-002', roomCode: 'A-02', tenantId: 'T02', tenantName: 'Nadia Putri Maharani', tenantPhone: '6281377889900', period: 'November 2026', dueDate: '2026-11-05', baseRent: 2150000, kwhUsed: 84, electricCost: 142800, waterCost: 50000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-03', paymentMethod: 'QRIS Kost' },
      { id: 'KW-202611-003', roomCode: 'A-03', tenantId: 'T03', tenantName: 'Dimas Arya Saputra', tenantPhone: '6285711223344', period: 'November 2026', dueDate: '2026-11-08', baseRent: 1750000, kwhUsed: 88, electricCost: 149600, waterCost: 50000, discount: 0, manualFine: null, status: 'unpaid', paidAt: '', paymentMethod: '-' },
      { id: 'KW-202611-004', roomCode: 'A-04', tenantId: 'T04', tenantName: 'Siti Aisyah Rahma', tenantPhone: '6282199008877', period: 'November 2026', dueDate: '2026-11-10', baseRent: 1750000, kwhUsed: 76, electricCost: 129200, waterCost: 50000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-09', paymentMethod: 'Transfer Mandiri' },
      { id: 'KW-202611-005', roomCode: 'A-06', tenantId: 'T06', tenantName: 'Fajar Nugroho', tenantPhone: '6281908877665', period: 'November 2026', dueDate: '2026-11-05', baseRent: 1750000, kwhUsed: 95, electricCost: 161500, waterCost: 50000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-05', paymentMethod: 'Transfer BCA' },
      { id: 'KW-202611-006', roomCode: 'B-07', tenantId: 'T07', tenantName: 'Kevin Wijaya', tenantPhone: '6285266778899', period: 'November 2026', dueDate: '2026-11-06', baseRent: 1550000, kwhUsed: 70, electricCost: 119000, waterCost: 45000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-06', paymentMethod: 'QRIS Kost' },
      { id: 'KW-202611-007', roomCode: 'B-08', tenantId: 'T08', tenantName: 'Aulia Zahra Permata', tenantPhone: '6287855443322', period: 'November 2026', dueDate: '2026-11-07', baseRent: 1550000, kwhUsed: 78, electricCost: 132600, waterCost: 45000, discount: 0, manualFine: null, status: 'unpaid', paidAt: '', paymentMethod: '-' },
      { id: 'KW-202611-008', roomCode: 'B-09', tenantId: 'T09', tenantName: 'Bagas Adi Kurniawan', tenantPhone: '6289612345678', period: 'November 2026', dueDate: '2026-11-14', baseRent: 1150000, kwhUsed: 38, electricCost: 64600, waterCost: 40000, discount: 0, manualFine: null, status: 'unpaid', paidAt: '', paymentMethod: '-' },
      { id: 'KW-202611-009', roomCode: 'K-11', tenantId: 'T11', tenantName: 'Keluarga Reza & Intan', tenantPhone: '6281234987654', period: 'November 2026', dueDate: '2026-11-05', baseRent: 2650000, kwhUsed: 135, electricCost: 229500, waterCost: 75000, discount: 0, manualFine: null, status: 'paid', paidAt: '2026-11-04', paymentMethod: 'Transfer BCA' }
    ],
    expenses: [
      { id: 'EX01', date: '2026-11-02', category: 'Internet WiFi', desc: 'Langganan WiFi Fiber Dedicated 300 Mbps (Lantai 1 & 2)', amount: 585000 },
      { id: 'EX02', date: '2026-11-04', category: 'Gaji Penjaga & Kebersihan', desc: 'Honor Penjaga Kost & Kebersihan Lorong Bulanan', amount: 1250000 },
      { id: 'EX03', date: '2026-11-06', category: 'Listrik PLN Utama', desc: 'Token Listrik Pompa Air, Lampu Taman & CCTV', amount: 340000 },
      { id: 'EX04', date: '2026-11-08', category: 'Perbaikan Kamar & AC', desc: 'Servis Cuci AC 4 Kamar + Cat Ulang Kamar B-10', amount: 475000 },
      { id: 'EX05', date: '2026-11-10', category: 'Keamanan & Iuran RT/RW', desc: 'Iuran Keamanan Lingkungan & Angkut Sampah RT 04', amount: 180000 }
    ],
    monthlyHistory: [
      { month: 'Jun', income: 14200000, expense: 2450000 },
      { month: 'Jul', income: 15100000, expense: 2600000 },
      { month: 'Agu', income: 15850000, expense: 2390000 },
      { month: 'Sep', income: 16400000, expense: 2720000 },
      { month: 'Okt', income: 16950000, expense: 2510000 }
    ]
  };
}

let db = getDefaultDatabase();

function formatRupiah(num) {
  const n = Math.round(Number(num) || 0);
  return 'Rp ' + n.toLocaleString('id-ID');
}

function terbilangIndonesia(nilai) {
  nilai = Math.abs(Math.round(Number(nilai) || 0));
  const huruf = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];
  function sebut(n) {
    if (n < 12) return huruf[n];
    if (n < 20) return sebut(n - 10) + ' Belas';
    if (n < 100) return sebut(Math.floor(n / 10)) + ' Puluh ' + sebut(n % 10);
    if (n < 200) return 'Seratus ' + sebut(n - 100);
    if (n < 1000) return sebut(Math.floor(n / 100)) + ' Ratus ' + sebut(n % 100);
    if (n < 2000) return 'Seribu ' + sebut(n - 1000);
    if (n < 1000000) return sebut(Math.floor(n / 1000)) + ' Ribu ' + sebut(n % 1000);
    if (n < 1000000000) return sebut(Math.floor(n / 1000000)) + ' Juta ' + sebut(n % 1000000);
    return sebut(Math.floor(n / 1000000000)) + ' Miliar ' + sebut(n % 1000000000);
  }
  const res = sebut(nilai).replace(/\s+/g, ' ').trim();
  return (res || 'Nol') + ' Rupiah';
}

function getLateDaysAndFine(bill) {
  if (bill.status === 'paid') {
    return { lateDays: 0, fine: Number(bill.manualFine || 0) };
  }
  if (!bill.dueDate) return { lateDays: 0, fine: 0 };
  const today = new Date();
  const due = new Date(bill.dueDate + 'T23:59:59');
  const diffMs = today.getTime() - due.getTime();
  const lateDays = diffMs > 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0;
  const dailyRate = Number(db.settings.dailyFine || 25000);
  const fine = bill.manualFine !== null && bill.manualFine !== undefined ? Number(bill.manualFine) : lateDays * dailyRate;
  return { lateDays, fine };
}

function getBillTotal(bill) {
  const { fine } = getLateDaysAndFine(bill);
  return (Number(bill.baseRent) || 0) + (Number(bill.electricCost) || 0) + (Number(bill.waterCost) || 0) + fine - (Number(bill.discount) || 0);
}

function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.rooms)) {
        db = parsed;
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }
  } catch (e) {
    db = getDefaultDatabase();
  }

  // Try syncing with optional local server.js if running on localhost
  fetch('/api/db').then(r => r.ok ? r.json() : null).then(serverDb => {
    if (serverDb && Array.isArray(serverDb.rooms)) {
      db = serverDb;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      refreshAllViews();
    }
  }).catch(() => {});
}

function saveDatabase() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  const statusEl = document.getElementById('syncStatusText');
  if (statusEl) {
    const t = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    statusEl.textContent = `Tersimpan Otomatis (${t})`;
  }
  fetch('/api/db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(db)
  }).catch(() => {});
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  if (tabId === 'dashboard') {
    setTimeout(drawProfitChart, 40);
  } else if (tabId === 'kwitansi') {
    renderReceiptSelectOptions();
    renderReceiptPreview();
  }
}

function setRoomFilter(filterVal) {
  activeRoomFilter = filterVal;
  document.querySelectorAll('#roomFilterBar .pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filterVal);
  });
  renderRoomGrid();
}

function refreshAllViews() {
  // Sync room overdue status automatically based on unpaid bills past due
  db.rooms.forEach(room => {
    const hasTenant = db.tenants.find(t => t.roomCode === room.code);
    const unpaidBill = db.bills.find(b => b.roomCode === room.code && b.status !== 'paid');
    if (room.status !== 'perbaikan') {
      if (!hasTenant) {
        if (room.status !== 'kosong') room.status = 'kosong';
      } else if (unpaidBill && getLateDaysAndFine(unpaidBill).lateDays > 0) {
        room.status = 'jatuh_tempo';
      } else {
        room.status = 'terisi';
      }
    }
  });

  document.getElementById('sidebarPropertyName').textContent = db.settings.shortName || db.settings.kostName;
  document.getElementById('headerPropertyTitle').textContent = db.settings.kostName;
  document.getElementById('headerPropertySub').textContent = `${db.settings.address} • Pengingat WA Otomatis, Listrik/Air & Kwitansi PDF Resmi`;

  renderDashboardKpis();
  renderRoomGrid();
  renderOccupancySummary();
  renderTenantsTable();
  renderBillsTable();
  renderExpensesAndPnl();
  populateSettingsForm();
  renderReceiptSelectOptions();
  renderReceiptPreview();
  drawProfitChart();
}

function renderDashboardKpis() {
  const totalRooms = db.rooms.length;
  const occupiedRooms = db.rooms.filter(r => r.status === 'terisi' || r.status === 'jatuh_tempo').length;
  const emptyRooms = db.rooms.filter(r => r.status === 'kosong').length;
  const repairRooms = db.rooms.filter(r => r.status === 'perbaikan').length;
  const occPct = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const paidBills = db.bills.filter(b => b.status === 'paid');
  const unpaidBills = db.bills.filter(b => b.status !== 'paid');

  const totalPaid = paidBills.reduce((acc, b) => acc + getBillTotal(b), 0);
  const totalUnpaid = unpaidBills.reduce((acc, b) => acc + getBillTotal(b), 0);
  const totalExpenses = db.expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const netProfit = totalPaid - totalExpenses;
  const marginPct = totalPaid > 0 ? ((netProfit / totalPaid) * 100).toFixed(1) : '0.0';

  document.getElementById('badgeTotalRooms').textContent = String(totalRooms);
  document.getElementById('badgeUnpaidCount').textContent = String(unpaidBills.length);

  document.getElementById('kpiOccupancy').textContent = `${occPct}% (${occupiedRooms}/${totalRooms})`;
  document.getElementById('kpiOccupancySub').textContent = `${emptyRooms} Kamar Kosong • ${repairRooms} Perbaikan`;

  document.getElementById('kpiRevenue').textContent = formatRupiah(totalPaid);
  document.getElementById('kpiRevenueSub').textContent = `${paidBills.length} Kwitansi Lunas Terverifikasi`;

  document.getElementById('kpiUnpaid').textContent = formatRupiah(totalUnpaid);
  document.getElementById('kpiUnpaidSub').textContent = `${unpaidBills.length} Tagihan Aktif • Klik Tagih WA`;

  document.getElementById('kpiNetProfit').textContent = formatRupiah(netProfit);
  document.getElementById('kpiNetProfitSub').textContent = `Biaya Rp ${(totalExpenses / 1000000).toFixed(2)} Jt • Margin ${marginPct}%`;

  const allBtn = document.querySelector('#roomFilterBar [data-filter="all"]');
  if (allBtn) allBtn.textContent = `Semua (${totalRooms})`;
}

function renderRoomGrid() {
  const container = document.getElementById('roomGridContainer');
  const filtered = db.rooms.filter(r => activeRoomFilter === 'all' ? true : r.status === activeRoomFilter);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;padding:28px;text-align:center;color:#94a3b8;">Tidak ada kamar dengan filter ini.</div>`;
    return;
  }

  const badgeLabels = {
    terisi: 'TERISI AKTIF',
    jatuh_tempo: 'JATUH TEMPO',
    kosong: 'KOSONG',
    perbaikan: 'PERBAIKAN'
  };

  container.innerHTML = filtered.map(room => {
    const tenant = db.tenants.find(t => t.roomCode === room.code);
    const bill = db.bills.find(b => b.roomCode === room.code && b.status !== 'paid') || db.bills.find(b => b.roomCode === room.code);
    const lateInfo = bill ? getLateDaysAndFine(bill) : { lateDays: 0, fine: 0 };

    let tenantHtml = '';
    if (tenant) {
      tenantHtml = `
        <div class="room-tenant">
          <strong>${tenant.name}</strong>
          <span style="color:#94a3b8;">WA: ${tenant.phone} • Meter: ${room.lastKwh} kWh</span>
          ${bill && bill.status !== 'paid'
            ? `<div style="color:#fda4af;font-weight:700;margin-top:3px;">Tagihan: ${formatRupiah(getBillTotal(bill))} ${lateInfo.lateDays > 0 ? `(Telat ${lateInfo.lateDays} hr)` : ''}</div>`
            : `<div style="color:#34d399;font-weight:700;margin-top:3px;">Tagihan Bulan Ini: LUNAS ✓</div>`}
        </div>
      `;
    } else if (room.status === 'perbaikan') {
      tenantHtml = `<div class="room-tenant"><strong style="color:#fcd34d;">Unit Sedang Servis / Cat Ulang</strong><span style="color:#94a3b8;">Meter Terakhir: ${room.lastKwh} kWh</span></div>`;
    } else {
      tenantHtml = `<div class="room-tenant"><strong style="color:#7dd3fc;">Kamar Siap Huni!</strong><span style="color:#94a3b8;">Klik "+ Penyewa" untuk Check-In</span></div>`;
    }

    return `
      <div class="room-card status-${room.status}">
        <div>
          <div class="room-top">
            <span class="room-code">${room.code}</span>
            <span class="status-badge badge-${room.status}">${badgeLabels[room.status] || room.status}</span>
          </div>
          <div class="room-type" style="margin-top:4px;">${room.floor} • ${room.type}</div>
          <div class="room-price" style="margin-top:5px;">${formatRupiah(room.price)} <span style="font-size:11px;color:#94a3b8;font-weight:600;">/ bulan</span></div>
        </div>
        ${tenantHtml}
        <div class="room-actions">
          ${bill ? `<button class="btn btn-wa btn-sm" onclick="openWaModalForBill('${bill.id}')">📲 WA</button>` : ''}
          ${bill ? `<button class="btn btn-cyan btn-sm" onclick="jumpToReceipt('${bill.id}')">🧾 Kwitansi</button>` : ''}
          ${!tenant && room.status === 'kosong' ? `<button class="btn btn-emerald btn-sm" onclick="openTenantModal('', '${room.code}')">+ Isi Kamar</button>` : ''}
          <button class="btn btn-outline btn-sm" onclick="openRoomModal('${room.id}')">Kelola</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderOccupancySummary() {
  const el = document.getElementById('occupancySummaryBox');
  const counts = {
    terisi: db.rooms.filter(r => r.status === 'terisi').length,
    jatuh_tempo: db.rooms.filter(r => r.status === 'jatuh_tempo').length,
    kosong: db.rooms.filter(r => r.status === 'kosong').length,
    perbaikan: db.rooms.filter(r => r.status === 'perbaikan').length
  };
  const total = Math.max(db.rooms.length, 1);

  const rows = [
    { label: 'Kamar Terisi & Lancar', val: counts.terisi, color: '#10b981' },
    { label: 'Jatuh Tempo / Belum Lunas', val: counts.jatuh_tempo, color: '#f43f5e' },
    { label: 'Kamar Kosong Siap Sewa', val: counts.kosong, color: '#38bdf8' },
    { label: 'Sedang Perbaikan / Servis', val: counts.perbaikan, color: '#f59e0b' }
  ];

  const expTotal = db.expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  el.innerHTML = rows.map(r => {
    const pct = Math.round((r.val / total) * 100);
    return `
      <div style="margin-bottom:13px;">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;margin-bottom:4px;">
          <span>${r.label}</span>
          <span style="color:${r.color};">${r.val} Unit (${pct}%)</span>
        </div>
        <div style="height:8px;background:#08111f;border-radius:99px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${r.color};border-radius:99px;"></div>
        </div>
      </div>
    `;
  }).join('') + `
    <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border);font-size:12.5px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="color:#94a3b8;">Tarif Listrik Meteran:</span>
        <strong>${formatRupiah(db.settings.kwhRate)} / kWh</strong>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="color:#94a3b8;">Denda Terlambat Otomatis:</span>
        <strong style="color:#fda4af;">${formatRupiah(db.settings.dailyFine)} / hari</strong>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span style="color:#94a3b8;">Total Operasional Bulan Ini:</span>
        <strong style="color:#fcd34d;">${formatRupiah(expTotal)}</strong>
      </div>
    </div>
  `;
}

function drawProfitChart() {
  const canvas = document.getElementById('profitChartCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const W = Math.max(rect.width, 460);
  const H = 260;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const curIncome = db.bills.filter(b => b.status === 'paid').reduce((s, b) => s + getBillTotal(b), 0);
  const curExpense = db.expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const series = [
    ...(db.monthlyHistory || []),
    { month: 'Nov (Ini)', income: curIncome, expense: curExpense }
  ];

  const maxVal = Math.max(...series.map(s => Math.max(s.income, s.expense)), 5000000) * 1.16;
  const padL = 62, padR = 20, padT = 26, padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Grid lines
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.lineWidth = 1;
  ctx.font = '600 11px Segoe UI, sans-serif';
  ctx.fillStyle = '#94a3b8';
  for (let i = 0; i <= 4; i++) {
    const y = padT + (plotH * i) / 4;
    const val = maxVal * (1 - i / 4);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillText((val / 1000000).toFixed(0) + ' Jt', 10, y + 4);
  }

  const groupW = plotW / series.length;
  const barW = Math.min(24, groupW * 0.28);
  const netPoints = [];

  series.forEach((item, idx) => {
    const cx = padL + groupW * idx + groupW / 2;
    const incH = (item.income / maxVal) * plotH;
    const expH = (item.expense / maxVal) * plotH;
    const net = Math.max(0, item.income - item.expense);
    const netY = padT + plotH - (net / maxVal) * plotH;
    netPoints.push({ x: cx, y: netY, net });

    // Income Bar
    const gInc = ctx.createLinearGradient(0, padT, 0, padT + plotH);
    gInc.addColorStop(0, '#10b981');
    gInc.addColorStop(1, '#059669');
    ctx.fillStyle = gInc;
    ctx.beginPath();
    ctx.roundRect(cx - barW - 3, padT + plotH - incH, barW, incH, [5, 5, 0, 0]);
    ctx.fill();

    // Expense Bar
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.roundRect(cx + 3, padT + plotH - expH, barW, expH, [5, 5, 0, 0]);
    ctx.fill();

    // Month label
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 11.5px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.month, cx, H - 12);
  });

  // Net Profit Line
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  netPoints.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.stroke();

  netPoints.forEach(pt => {
    ctx.fillStyle = '#060d18';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // Legend
  ctx.textAlign = 'left';
  ctx.font = '700 11px Segoe UI, sans-serif';
  ctx.fillStyle = '#10b981'; ctx.fillRect(padL, 6, 10, 10);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Pemasukan Sewa', padL + 15, 15);
  ctx.fillStyle = '#f43f5e'; ctx.fillRect(padL + 128, 6, 10, 10);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Operasional', padL + 143, 15);
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(padL + 230, 6, 10, 10);
  ctx.fillStyle = '#e2e8f0'; ctx.fillText('Tren Laba Bersih', padL + 245, 15);
}

/* TENANTS CRUD */
function renderTenantsTable() {
  const q = (document.getElementById('searchTenantInput')?.value || '').toLowerCase();
  const tbody = document.getElementById('tenantsTableBody');
  const rows = db.tenants.filter(t =>
    !q ||
    t.name.toLowerCase().includes(q) ||
    t.roomCode.toLowerCase().includes(q) ||
    t.nik.includes(q) ||
    t.phone.includes(q)
  );

  tbody.innerHTML = rows.map(t => `
    <tr>
      <td><span class="status-badge badge-terisi" style="font-size:12px;">${t.roomCode}</span></td>
      <td>
        <strong style="color:#fff;">${t.name}</strong>
        <div style="font-size:11.5px;color:#94a3b8;">${t.job || '-'}</div>
      </td>
      <td>
        <div style="font-family:monospace;font-size:12.5px;color:#7dd3fc;">NIK: ${t.nik}</div>
        <div style="font-size:11px;color:#34d399;">✓ KTP Terverifikasi</div>
      </td>
      <td>
        <a href="https://wa.me/${t.phone.replace(/^0/, '62')}" target="_blank" style="color:#4ade80;font-weight:700;text-decoration:none;">📲 ${t.phone}</a>
      </td>
      <td>
        <div style="font-weight:600;">${t.emergName || '-'}</div>
        <div style="font-size:11.5px;color:#94a3b8;">${t.emergPhone || '-'}</div>
      </td>
      <td>
        <div>Masuk: ${t.checkIn}</div>
        <div style="font-size:11.5px;color:#fcd34d;">Deposit: ${formatRupiah(t.deposit)}</div>
      </td>
      <td>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" onclick="openTenantModal('${t.id}')">Edit</button>
          <button class="btn btn-rose btn-sm" onclick="checkoutTenant('${t.id}')">Check-Out</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* BILLS & WHATSAPP REMINDER */
function renderBillsTable() {
  const filter = document.getElementById('filterBillStatus')?.value || 'all';
  const tbody = document.getElementById('billsTableBody');
  const list = db.bills.filter(b => {
    if (filter === 'paid') return b.status === 'paid';
    if (filter === 'unpaid') return b.status !== 'paid';
    return true;
  });

  tbody.innerHTML = list.map(b => {
    const { lateDays, fine } = getLateDaysAndFine(b);
    const total = getBillTotal(b);
    const isPaid = b.status === 'paid';

    return `
      <tr>
        <td style="font-family:monospace;font-weight:700;color:#7dd3fc;">${b.id}</td>
        <td>
          <strong>Kamar ${b.roomCode} — ${b.tenantName}</strong>
          <div style="font-size:11.5px;color:#94a3b8;">WA: ${b.tenantPhone}</div>
        </td>
        <td>
          <div>${b.period}</div>
          <div style="font-size:11.5px;color:${!isPaid && lateDays > 0 ? '#fda4af' : '#94a3b8'};">Jatuh Tempo: ${b.dueDate}</div>
        </td>
        <td>${formatRupiah(b.baseRent)}</td>
        <td>
          <div>Listrik (${b.kwhUsed} kWh): ${formatRupiah(b.electricCost)}</div>
          <div style="font-size:11.5px;color:#94a3b8;">Air/Kebersihan: ${formatRupiah(b.waterCost)}</div>
        </td>
        <td>
          ${fine > 0
            ? `<span style="color:#fda4af;font-weight:800;">+${formatRupiah(fine)}</span><div style="font-size:11px;color:#fda4af;">Telat ${lateDays} hari</div>`
            : `<span style="color:#94a3b8;">Rp 0</span>`}
        </td>
        <td style="font-weight:800;font-size:14px;color:#fff;">${formatRupiah(total)}</td>
        <td>
          ${isPaid
            ? `<span class="status-badge badge-terisi">LUNAS (${b.paymentMethod})</span>`
            : lateDays > 0
              ? `<span class="status-badge badge-jatuh_tempo">TERLAMBAT ${lateDays} HR</span>`
              : `<span class="status-badge badge-perbaikan">BELUM BAYAR</span>`}
        </td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button class="btn btn-wa btn-sm" onclick="openWaModalForBill('${b.id}')">📲 Tagih WA</button>
            ${!isPaid ? `<button class="btn btn-emerald btn-sm" onclick="markBillPaid('${b.id}')">✓ Lunas</button>` : ''}
            <button class="btn btn-cyan btn-sm" onclick="jumpToReceipt('${b.id}')">🧾 Kwitansi</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function buildWhatsappMessage(bill) {
  const { lateDays, fine } = getLateDaysAndFine(bill);
  const total = getBillTotal(bill);
  if (bill.status === 'paid') {
    return (
      `Halo Kak *${bill.tenantName}* (Kamar *${bill.roomCode}*),\n\n` +
      `Terima kasih! Pembayaran sewa kost di *${db.settings.kostName}* untuk periode *${bill.period}* telah kami terima *LUNAS*.\n\n` +
      `🧾 *RINCIAN KWITANSI RESMI (${bill.id}):*\n` +
      `• Sewa Kamar ${bill.roomCode}: ${formatRupiah(bill.baseRent)}\n` +
      `• Listrik (${bill.kwhUsed} kWh): ${formatRupiah(bill.electricCost)}\n` +
      `• Air & Kebersihan: ${formatRupiah(bill.waterCost)}\n` +
      (fine > 0 ? `• Denda Keterlambatan: ${formatRupiah(fine)}\n` : '') +
      `• *TOTAL DIBAYAR: ${formatRupiah(total)}*\n` +
      `• Status: *LUNAS (${bill.paymentMethod})*\n\n` +
      `Semoga nyaman tinggal di ${db.settings.shortName || db.settings.kostName}. Terima kasih 🙏`
    );
  }

  return (
    `Halo Kak *${bill.tenantName}* penghuni *Kamar ${bill.roomCode}*,\n\n` +
    `Semoga sehat dan lancar selalu aktivitasnya 🙏. Kami dari pengelola *${db.settings.kostName}* menginformasikan rincian tagihan sewa periode *${bill.period}*:\n\n` +
    `📋 *RINCIAN TAGIHAN (${bill.id}):*\n` +
    `• Sewa Pokok Kamar ${bill.roomCode}: ${formatRupiah(bill.baseRent)}\n` +
    `• Pemakaian Listrik (${bill.kwhUsed} kWh): ${formatRupiah(bill.electricCost)}\n` +
    `• Air PDAM & Kebersihan: ${formatRupiah(bill.waterCost)}\n` +
    (fine > 0 ? `• Denda Keterlambatan (${lateDays} hari): ${formatRupiah(fine)}\n` : '') +
    (bill.discount > 0 ? `• Potongan Diskon: -${formatRupiah(bill.discount)}\n` : '') +
    `• *TOTAL TAGIHAN: ${formatRupiah(total)}*\n` +
    `• Jatuh Tempo: *${bill.dueDate}*\n\n` +
    `💳 *METODE PEMBAYARAN RESMI:*\n` +
    `${db.settings.bankInfo}\n\n` +
    `Mohon konfirmasi bukti transfer ke chat ini agar segera kami terbitkan *Kwitansi Digital Resmi (LUNAS)*. Terima kasih banyak Kak 🙏`
  );
}

function openWaModalForBill(billId) {
  const bill = db.bills.find(b => b.id === billId);
  if (!bill) return;
  const cleanPhone = String(bill.tenantPhone || '').replace(/[^0-9]/g, '').replace(/^0/, '62');
  document.getElementById('waModalPhone').value = cleanPhone;
  document.getElementById('waModalText').value = buildWhatsappMessage(bill);
  document.getElementById('waModal').classList.add('open');
}

function copyWaMessage() {
  const txt = document.getElementById('waModalText').value;
  navigator.clipboard.writeText(txt).then(() => alert('Pesan WhatsApp berhasil disalin ke clipboard!'));
}

function launchWaLink() {
  const phone = document.getElementById('waModalPhone').value.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const text = document.getElementById('waModalText').value;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

function markBillPaid(billId) {
  const bill = db.bills.find(b => b.id === billId);
  if (!bill) return;
  const { fine } = getLateDaysAndFine(bill);
  bill.manualFine = fine;
  bill.status = 'paid';
  bill.paidAt = new Date().toISOString().slice(0, 10);
  bill.paymentMethod = 'Transfer / QRIS';
  saveDatabase();
  refreshAllViews();
  jumpToReceipt(bill.id);
}

function generateMonthlyBills() {
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const now = new Date();
  const periodStr = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  let created = 0;

  db.tenants.forEach((t, idx) => {
    const exists = db.bills.find(b => b.roomCode === t.roomCode && b.period.toLowerCase() === periodStr.toLowerCase());
    if (exists) return;
    const room = db.rooms.find(r => r.code === t.roomCode);
    const baseRent = room ? room.price : 1500000;
    const kwhUsed = 75;
    const electricCost = kwhUsed * Number(db.settings.kwhRate || 1700);
    const dueDay = (t.checkIn && t.checkIn.slice(8, 10)) || '10';
    const dueDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${dueDay}`;
    db.bills.unshift({
      id: `KW-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(db.bills.length + 1 + idx).padStart(3, '0')}`,
      roomCode: t.roomCode,
      tenantId: t.id,
      tenantName: t.name,
      tenantPhone: t.phone,
      period: periodStr,
      dueDate,
      baseRent,
      kwhUsed,
      electricCost,
      waterCost: 50000,
      discount: 0,
      manualFine: null,
      status: 'unpaid',
      paidAt: '',
      paymentMethod: '-'
    });
    created++;
  });

  saveDatabase();
  refreshAllViews();
  switchTab('tagihan');
  alert(created > 0 ? `Berhasil membuat ${created} tagihan baru untuk periode ${periodStr}!` : `Seluruh kamar terisi sudah memiliki tagihan periode ${periodStr}.`);
}

/* OFFICIAL KWITANSI / RECEIPT */
function renderReceiptSelectOptions() {
  const sel = document.getElementById('receiptSelectBill');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = db.bills.map(b =>
    `<option value="${b.id}">${b.id} — Kamar ${b.roomCode} (${b.tenantName}) [${b.status === 'paid' ? 'LUNAS' : 'TAGIHAN'}]</option>`
  ).join('');
  if (prev && db.bills.some(b => b.id === prev)) sel.value = prev;
}

function jumpToReceipt(billId) {
  switchTab('kwitansi');
  const sel = document.getElementById('receiptSelectBill');
  if (sel) {
    sel.value = billId;
    renderReceiptPreview();
  }
}

function sendSelectedReceiptWa() {
  const sel = document.getElementById('receiptSelectBill');
  if (sel && sel.value) openWaModalForBill(sel.value);
}

function renderReceiptPreview() {
  const sel = document.getElementById('receiptSelectBill');
  const mode = document.getElementById('receiptFormatMode')?.value || 'a4';
  const note = document.getElementById('receiptCustomNote')?.value || '';
  const container = document.getElementById('receiptPaperContainer');
  if (!container) return;

  const bill = db.bills.find(b => b.id === (sel ? sel.value : '')) || db.bills[0];
  if (!bill) {
    container.innerHTML = `<div class="panel">Belum ada data kwitansi.</div>`;
    return;
  }

  const { lateDays, fine } = getLateDaysAndFine(bill);
  const total = getBillTotal(bill);
  const isPaid = bill.status === 'paid';

  if (mode === 'thermal') {
    container.innerHTML = `
      <div class="receipt-paper thermal-mode">
        <div style="text-align:center;border-bottom:1px dashed #0f172a;padding-bottom:10px;margin-bottom:10px;">
          <div style="font-weight:900;font-size:15px;">${db.settings.shortName || db.settings.kostName}</div>
          <div style="font-size:11px;">${db.settings.address}</div>
          <div style="font-size:11px;">WA: ${db.settings.ownerPhone}</div>
        </div>
        <div style="font-size:12px;line-height:1.6;">
          <div>No     : ${bill.id}</div>
          <div>Kamar  : ${bill.roomCode}</div>
          <div>Penyewa: ${bill.tenantName}</div>
          <div>Periode: ${bill.period}</div>
          <div>Status : <strong>${isPaid ? 'LUNAS (' + bill.paidAt + ')' : 'BELUM LUNAS'}</strong></div>
        </div>
        <div style="border-top:1px dashed #0f172a;border-bottom:1px dashed #0f172a;margin:10px 0;padding:8px 0;font-size:12px;">
          <div style="display:flex;justify-content:space-between;"><span>Sewa Kamar</span><span>${formatRupiah(bill.baseRent)}</span></div>
          <div style="display:flex;justify-content:space-between;"><span>Listrik (${bill.kwhUsed}kWh)</span><span>${formatRupiah(bill.electricCost)}</span></div>
          <div style="display:flex;justify-content:space-between;"><span>Air & Kebersihan</span><span>${formatRupiah(bill.waterCost)}</span></div>
          ${fine > 0 ? `<div style="display:flex;justify-content:space-between;"><span>Denda (${lateDays}hr)</span><span>${formatRupiah(fine)}</span></div>` : ''}
          <div style="display:flex;justify-content:space-between;font-weight:900;margin-top:6px;font-size:13.5px;">
            <span>TOTAL</span><span>${formatRupiah(total)}</span>
          </div>
        </div>
        <div style="font-size:11px;text-align:center;">${note}</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="receipt-paper">
      <div class="receipt-header">
        <div>
          <div style="font-size:20px;font-weight:900;color:#064e3b;letter-spacing:-0.02em;">${db.settings.kostName}</div>
          <div style="font-size:12.5px;color:#475569;margin-top:2px;">${db.settings.address}</div>
          <div style="font-size:12px;color:#475569;">WhatsApp Pengelola: ${db.settings.ownerPhone}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:18px;font-weight:900;color:#0f172a;">KWITANSI SEWA RESMI</div>
          <div style="font-family:monospace;font-size:13px;font-weight:700;color:#059669;">No: ${bill.id}</div>
          <div style="margin-top:8px;">
            <span class="receipt-stamp ${isPaid ? '' : 'unpaid'}">${isPaid ? 'LUNAS TERVERIFIKASI' : 'TAGIHAN AKTIF'}</span>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:170px 1fr;row-gap:8px;font-size:13.5px;margin-bottom:18px;">
        <div style="color:#64748b;font-weight:700;">Telah Terima Dari</div>
        <div style="font-weight:800;">: ${bill.tenantName} (Kamar ${bill.roomCode})</div>
        <div style="color:#64748b;font-weight:700;">Uang Sejumlah</div>
        <div style="font-style:italic;font-weight:700;background:#ecfdf5;padding:4px 10px;border-radius:6px;color:#065f46;"># ${terbilangIndonesia(total)} #</div>
        <div style="color:#64748b;font-weight:700;">Untuk Pembayaran</div>
        <div>: Sewa Kamar Kost/Kontrakan Unit <strong>${bill.roomCode}</strong> Periode <strong>${bill.period}</strong></div>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;font-size:13px;color:#0f172a;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;">Deskripsi Komponen Biaya</th>
            <th style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;text-align:right;">Nominal (IDR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #cbd5e1;">Sewa Pokok Kamar ${bill.roomCode} (${bill.period})</td>
            <td style="border:1px solid #cbd5e1;text-align:right;font-weight:700;">${formatRupiah(bill.baseRent)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #cbd5e1;">Pemakaian Listrik Kamar (${bill.kwhUsed} kWh × ${formatRupiah(db.settings.kwhRate)})</td>
            <td style="border:1px solid #cbd5e1;text-align:right;font-weight:700;">${formatRupiah(bill.electricCost)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #cbd5e1;">Iuran Air PDAM, WiFi & Kebersihan Lingkungan</td>
            <td style="border:1px solid #cbd5e1;text-align:right;font-weight:700;">${formatRupiah(bill.waterCost)}</td>
          </tr>
          ${fine > 0 ? `
          <tr>
            <td style="border:1px solid #cbd5e1;color:#be123c;">Denda Keterlambatan (${lateDays} hari lewat jatuh tempo ${bill.dueDate})</td>
            <td style="border:1px solid #cbd5e1;text-align:right;font-weight:700;color:#be123c;">${formatRupiah(fine)}</td>
          </tr>` : ''}
          <tr style="background:#064e3b;color:#ffffff;">
            <td style="padding:11px 12px;font-weight:800;font-size:14px;">TOTAL PEMBAYARAN</td>
            <td style="padding:11px 12px;text-align:right;font-weight:900;font-size:16px;">${formatRupiah(total)}</td>
          </tr>
        </tbody>
      </table>

      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px;font-size:12.5px;">
        <div style="max-width:58%;color:#475569;">
          <div><strong>Rekening Resmi:</strong> ${db.settings.bankInfo}</div>
          <div style="margin-top:4px;">${note}</div>
        </div>
        <div style="text-align:center;min-width:200px;">
          <div>${isPaid ? 'Tanggal Lunas: ' + bill.paidAt : 'Tanggal Cetak: ' + new Date().toISOString().slice(0, 10)}</div>
          <div style="margin:6px 0 44px;font-weight:700;">Pengelola / Pemilik Kost,</div>
          <div style="font-weight:900;text-decoration:underline;">${db.settings.ownerName}</div>
        </div>
      </div>
    </div>
  `;
}

/* EXPENSES & PROFIT LOSS */
function renderExpensesAndPnl() {
  const tbody = document.getElementById('expensesTableBody');
  tbody.innerHTML = db.expenses.map(e => `
    <tr>
      <td>${e.date}</td>
      <td><span class="status-badge badge-kosong">${e.category}</span></td>
      <td>${e.desc}</td>
      <td style="font-weight:800;color:#fda4af;">${formatRupiah(e.amount)}</td>
      <td><button class="btn btn-rose btn-sm" onclick="deleteExpense('${e.id}')">Hapus</button></td>
    </tr>
  `).join('');

  const paidIncome = db.bills.filter(b => b.status === 'paid').reduce((s, b) => s + getBillTotal(b), 0);
  const pendingIncome = db.bills.filter(b => b.status !== 'paid').reduce((s, b) => s + getBillTotal(b), 0);
  const totalExp = db.expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const netProfit = paidIncome - totalExp;

  document.getElementById('kostProfitLossSummary').innerHTML = `
    <div style="background:#08111f;border:1px solid var(--border);border-radius:12px;padding:16px;font-size:13.5px;">
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="color:#94a3b8;">Pendapatan Sewa & Listrik (Lunas)</span>
        <strong style="color:#34d399;">+ ${formatRupiah(paidIncome)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="color:#94a3b8;">Piutang Tagihan Belum Tertagih</span>
        <strong style="color:#7dd3fc;">${formatRupiah(pendingIncome)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="color:#94a3b8;">Total Biaya Operasional Kost</span>
        <strong style="color:#fda4af;">- ${formatRupiah(totalExp)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:12px 0 4px;font-size:16px;">
        <strong>LABA BERSIH KAS KOST</strong>
        <strong style="color:#4ade80;font-size:18px;">${formatRupiah(netProfit)}</strong>
      </div>
    </div>
  `;
}

/* MODALS: ROOM, TENANT, BILL, EXPENSE */
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

function openRoomModal(roomId = '') {
  const r = db.rooms.find(x => x.id === roomId);
  document.getElementById('roomEditId').value = r ? r.id : '';
  document.getElementById('roomCodeInput').value = r ? r.code : '';
  document.getElementById('roomFloorInput').value = r ? r.floor : 'Lantai 1';
  document.getElementById('roomTypeInput').value = r ? r.type : 'Standar AC + KM Dalam + WiFi';
  document.getElementById('roomPriceInput').value = r ? r.price : 1650000;
  document.getElementById('roomStatusInput').value = r ? r.status : 'kosong';
  document.getElementById('roomLastKwhInput').value = r ? r.lastKwh : 1000;
  document.getElementById('btnDeleteRoom').style.display = r ? 'inline-flex' : 'none';
  document.getElementById('roomModal').classList.add('open');
}

function saveRoomModal() {
  const editId = document.getElementById('roomEditId').value;
  const code = document.getElementById('roomCodeInput').value.trim().toUpperCase();
  if (!code) return alert('Kode kamar wajib diisi!');
  const payload = {
    id: editId || 'R' + Date.now(),
    code,
    floor: document.getElementById('roomFloorInput').value,
    type: document.getElementById('roomTypeInput').value.trim(),
    price: Number(document.getElementById('roomPriceInput').value) || 0,
    status: document.getElementById('roomStatusInput').value,
    lastKwh: Number(document.getElementById('roomLastKwhInput').value) || 0
  };
  if (editId) {
    const idx = db.rooms.findIndex(x => x.id === editId);
    if (idx >= 0) db.rooms[idx] = payload;
  } else {
    db.rooms.push(payload);
  }
  saveDatabase();
  closeModal('roomModal');
  refreshAllViews();
}

function deleteRoomFromModal() {
  const editId = document.getElementById('roomEditId').value;
  if (!editId || !confirm('Hapus unit kamar ini?')) return;
  db.rooms = db.rooms.filter(r => r.id !== editId);
  saveDatabase();
  closeModal('roomModal');
  refreshAllViews();
}

function openTenantModal(tenantId = '', presetRoomCode = '') {
  const t = db.tenants.find(x => x.id === tenantId);
  uploadedKtpDataUrl = t ? (t.ktpImg || '') : '';
  const roomSelect = document.getElementById('tenRoomCode');
  roomSelect.innerHTML = db.rooms.map(r => `<option value="${r.code}">${r.code} — ${r.type} (${formatRupiah(r.price)})</option>`).join('');

  document.getElementById('tenantEditId').value = t ? t.id : '';
  document.getElementById('tenName').value = t ? t.name : '';
  document.getElementById('tenNik').value = t ? t.nik : '';
  roomSelect.value = t ? t.roomCode : (presetRoomCode || (db.rooms.find(r => r.status === 'kosong')?.code || db.rooms[0]?.code || ''));
  document.getElementById('tenPhone').value = t ? t.phone : '';
  document.getElementById('tenJob').value = t ? t.job : '';
  document.getElementById('tenCheckIn').value = t ? t.checkIn : new Date().toISOString().slice(0, 10);
  document.getElementById('tenDeposit').value = t ? t.deposit : 500000;
  document.getElementById('tenEmergName').value = t ? t.emergName : '';
  document.getElementById('tenEmergPhone').value = t ? t.emergPhone : '';
  document.getElementById('tenKtpPreview').innerHTML = uploadedKtpDataUrl
    ? `<img src="${uploadedKtpDataUrl}" alt="KTP" style="max-height:110px;border-radius:8px;" />`
    : `Kartu Identitas KTP Terverifikasi Sistem • Pilih file gambar untuk melampirkan foto KTP`;
  document.getElementById('tenantModal').classList.add('open');
}

function handleKtpUpload(ev) {
  const file = ev.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    uploadedKtpDataUrl = String(reader.result || '');
    document.getElementById('tenKtpPreview').innerHTML = `<img src="${uploadedKtpDataUrl}" alt="KTP" style="max-height:110px;border-radius:8px;" />`;
  };
  reader.readAsDataURL(file);
}

function saveTenantModal() {
  const editId = document.getElementById('tenantEditId').value;
  const name = document.getElementById('tenName').value.trim();
  const roomCode = document.getElementById('tenRoomCode').value;
  if (!name || !roomCode) return alert('Nama penyewa dan kamar wajib diisi!');
  const payload = {
    id: editId || 'T' + Date.now(),
    roomCode,
    name,
    nik: document.getElementById('tenNik').value.trim() || '3174000000000001',
    phone: document.getElementById('tenPhone').value.trim() || '6281200000000',
    job: document.getElementById('tenJob').value.trim(),
    checkIn: document.getElementById('tenCheckIn').value,
    deposit: Number(document.getElementById('tenDeposit').value) || 0,
    emergName: document.getElementById('tenEmergName').value.trim(),
    emergPhone: document.getElementById('tenEmergPhone').value.trim(),
    ktpImg: uploadedKtpDataUrl
  };
  if (editId) {
    const idx = db.tenants.findIndex(x => x.id === editId);
    if (idx >= 0) db.tenants[idx] = payload;
  } else {
    db.tenants = db.tenants.filter(x => x.roomCode !== roomCode);
    db.tenants.push(payload);
  }
  const room = db.rooms.find(r => r.code === roomCode);
  if (room) room.status = 'terisi';
  saveDatabase();
  closeModal('tenantModal');
  refreshAllViews();
}

function checkoutTenant(tenantId) {
  const t = db.tenants.find(x => x.id === tenantId);
  if (!t || !confirm(`Proses Check-Out penyewa ${t.name} dari kamar ${t.roomCode}?`)) return;
  db.tenants = db.tenants.filter(x => x.id !== tenantId);
  const room = db.rooms.find(r => r.code === t.roomCode);
  if (room) room.status = 'kosong';
  saveDatabase();
  refreshAllViews();
}

function openBillModal() {
  const sel = document.getElementById('billTenantSelect');
  sel.innerHTML = db.tenants.map(t => `<option value="${t.id}">Kamar ${t.roomCode} — ${t.name}</option>`).join('');
  document.getElementById('billDueDate').value = new Date().toISOString().slice(0, 10);
  prefillBillFromTenant();
  document.getElementById('billModal').classList.add('open');
}

function prefillBillFromTenant() {
  const tid = document.getElementById('billTenantSelect').value;
  const t = db.tenants.find(x => x.id === tid);
  const room = t ? db.rooms.find(r => r.code === t.roomCode) : null;
  document.getElementById('billBaseRent').value = room ? room.price : 1500000;
  recalcBillModalElectric();
}

function recalcBillModalElectric() {
  const kwh = Number(document.getElementById('billKwhUsed').value) || 0;
  document.getElementById('billElectricCost').value = kwh * Number(db.settings.kwhRate || 1700);
}

function saveBillModal() {
  const tid = document.getElementById('billTenantSelect').value;
  const t = db.tenants.find(x => x.id === tid);
  if (!t) return alert('Tambahkan penyewa terlebih dahulu!');
  const newBill = {
    id: `KW-${new Date().getFullYear()}11-${String(db.bills.length + 1).padStart(3, '0')}`,
    roomCode: t.roomCode,
    tenantId: t.id,
    tenantName: t.name,
    tenantPhone: t.phone,
    period: document.getElementById('billPeriod').value.trim() || 'November 2026',
    dueDate: document.getElementById('billDueDate').value,
    baseRent: Number(document.getElementById('billBaseRent').value) || 0,
    kwhUsed: Number(document.getElementById('billKwhUsed').value) || 0,
    electricCost: Number(document.getElementById('billElectricCost').value) || 0,
    waterCost: Number(document.getElementById('billWaterCost').value) || 0,
    discount: Number(document.getElementById('billDiscount').value) || 0,
    manualFine: null,
    status: 'unpaid',
    paidAt: '',
    paymentMethod: '-'
  };
  db.bills.unshift(newBill);
  saveDatabase();
  closeModal('billModal');
  refreshAllViews();
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
  if (!desc || amount <= 0) return alert('Isi keterangan dan nominal pengeluaran!');
  db.expenses.unshift({
    id: 'EX' + Date.now(),
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

/* SETTINGS, EXPORT CSV & BACKUP JSON */
function populateSettingsForm() {
  document.getElementById('setKostName').value = db.settings.kostName || '';
  document.getElementById('setKostAddress').value = db.settings.address || '';
  document.getElementById('setOwnerName').value = db.settings.ownerName || '';
  document.getElementById('setOwnerPhone').value = db.settings.ownerPhone || '';
  document.getElementById('setBankInfo').value = db.settings.bankInfo || '';
  document.getElementById('setKwhRate').value = db.settings.kwhRate || 1700;
  document.getElementById('setDailyFine').value = db.settings.dailyFine || 25000;
}

function saveSettingsForm() {
  db.settings.kostName = document.getElementById('setKostName').value.trim();
  db.settings.shortName = db.settings.kostName.slice(0, 22);
  db.settings.address = document.getElementById('setKostAddress').value.trim();
  db.settings.ownerName = document.getElementById('setOwnerName').value.trim();
  db.settings.ownerPhone = document.getElementById('setOwnerPhone').value.trim();
  db.settings.bankInfo = document.getElementById('setBankInfo').value.trim();
  db.settings.kwhRate = Number(document.getElementById('setKwhRate').value) || 1700;
  db.settings.dailyFine = Number(document.getElementById('setDailyFine').value) || 25000;
  saveDatabase();
  refreshAllViews();
  alert('Pengaturan Kost & Rekening berhasil disimpan!');
}

function exportBillsCsv() {
  const header = ['No_Kwitansi', 'Kamar', 'Nama_Penyewa', 'WhatsApp', 'Periode', 'Jatuh_Tempo', 'Sewa_Pokok', 'Listrik_Rp', 'Air_Rp', 'Denda_Rp', 'Total_Rp', 'Status'];
  const lines = [header.join(',')];
  db.bills.forEach(b => {
    const { fine } = getLateDaysAndFine(b);
    const row = [
      b.id,
      b.roomCode,
      `"${(b.tenantName || '').replace(/"/g, '""')}"`,
      b.tenantPhone,
      `"${b.period}"`,
      b.dueDate,
      b.baseRent,
      b.electricCost,
      b.waterCost,
      fine,
      getBillTotal(b),
      b.status === 'paid' ? 'LUNAS' : 'BELUM_BAYAR'
    ];
    lines.push(row.join(','));
  });
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Rekap_Tagihan_Kost_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

function downloadBackupJson() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Backup_KostPintar_Pro_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

function restoreBackupJson(ev) {
  const file = ev.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || '{}'));
      if (!Array.isArray(parsed.rooms)) throw new Error('Format tidak sesuai');
      db = parsed;
      saveDatabase();
      refreshAllViews();
      alert('Database Kost berhasil di-restore!');
    } catch (e) {
      alert('Gagal membaca file JSON backup.');
    }
  };
  reader.readAsText(file);
}

function resetToSampleDemo() {
  if (!confirm('Muat ulang 12 kamar contoh demo realistis?')) return;
  db = getDefaultDatabase();
  saveDatabase();
  refreshAllViews();
}

function resetEmptyDatabase() {
  if (!confirm('Kosongkan seluruh kamar contoh untuk mulai mengisi data kost Anda sendiri dari nol?')) return;
  db = {
    settings: db.settings,
    rooms: [],
    tenants: [],
    bills: [],
    expenses: [],
    monthlyHistory: []
  };
  saveDatabase();
  refreshAllViews();
}

window.addEventListener('resize', () => {
  if (document.getElementById('tab-dashboard')?.classList.contains('active')) {
    drawProfitChart();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadDatabase();
  refreshAllViews();
});
