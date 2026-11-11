/* ============================================================================
 * FinKas UMKM Pro v4.2 — Aplikasi Pembukuan Keuangan, Laba Rugi & Invoice WA
 * Full Source Code Edition — Official Store: aswadi.dev
 * ============================================================================ */

const STORAGE_KEY = 'finkas_umkm_pro_v42_db';

const ACCOUNTS_META = [
  { id: 'kas', name: 'Kas Tunai Laci', bankCode: 'TUNAI / CASH', color: '#10b981', bg: 'rgba(16,185,129,0.16)' },
  { id: 'bca', name: 'Bank BCA Bisnis', bankCode: 'BCA • 021-422-4531', color: '#38bdf8', bg: 'rgba(56,189,248,0.16)' },
  { id: 'mandiri', name: 'Bank Mandiri Usaha', bankCode: 'MANDIRI • 137-00-9821', color: '#f59e0b', bg: 'rgba(245,158,11,0.16)' },
  { id: 'qris', name: 'Saldo QRIS / E-Wallet', bankCode: 'QRIS • GoPay / OVO / Dana', color: '#a855f7', bg: 'rgba(168,85,247,0.16)' }
];

const INCOME_CATEGORIES = [
  'Penjualan Produk/Jasa',
  'Pelunasan Piutang',
  'Pendapatan Reseller/Grosir',
  'Pendapatan Lainnya',
  'Mutasi Masuk'
];

const EXPENSE_CATEGORIES = [
  'HPP Bahan Baku',
  'Gaji & Komisi',
  'Sewa Tempat',
  'Operasional & Utilitas',
  'Marketing & Iklan',
  'Pajak & Administrasi',
  'Pelunasan Hutang Supplier',
  'Mutasi Keluar'
];

let db = null;
let currentInvoiceItems = [];
let editingInvoiceId = null;

function formatRupiah(num) {
  const n = Math.round(Number(num) || 0);
  const sign = n < 0 ? '-' : '';
  return sign + 'Rp ' + Math.abs(n).toLocaleString('id-ID');
}

function showToast(msg) {
  const el = document.getElementById('toastEl');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

function createSampleDatabase() {
  return {
    version: '4.2',
    profile: {
      name: 'Berkah Mandiri Nusantara',
      initials: 'BM',
      tagline: 'Distribusi Kuliner, Katering & Retail UMKM Terpadu',
      owner: 'Budi Santoso, S.E.',
      phone: '6281288997766',
      city: 'Jakarta Selatan',
      address: 'Jl. Tebet Raya No. 88, Tebet, Jakarta Selatan 12810',
      bankInfo: 'BCA 021-422-4531 a/n Berkah Mandiri Nusantara • Mandiri 137-00-9821 • Menerima QRIS All Payment'
    },
    openingBalances: {
      kas: 4500000,
      bca: 18500000,
      mandiri: 48500000,
      qris: 3250000
    },
    transactions: [
      { id: 'TX-101', date: '2026-06-14', ref: 'INV-2606-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 14800000, desc: 'Penjualan Paket Katering Kantor & Retail Juni' },
      { id: 'TX-102', date: '2026-06-22', ref: 'EXP-2606-02', type: 'OUT', category: 'HPP Bahan Baku', account: 'mandiri', amount: 6200000, desc: 'Belanja Bahan Baku Kemasan & Sembako Grosir' },
      { id: 'TX-103', date: '2026-06-28', ref: 'EXP-2606-03', type: 'OUT', category: 'Gaji & Komisi', account: 'bca', amount: 3500000, desc: 'Gaji Staf Operasional & Kurir Bulan Juni' },

      { id: 'TX-104', date: '2026-07-12', ref: 'INV-2607-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 17400000, desc: 'Penjualan Grosir & Pesanan Event Korporat Juli' },
      { id: 'TX-105', date: '2026-07-19', ref: 'QR-2607-04', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'qris', amount: 4900000, desc: 'Rekap Penjualan Outlet Harian via QRIS Juli' },
      { id: 'TX-106', date: '2026-07-25', ref: 'EXP-2607-05', type: 'OUT', category: 'HPP Bahan Baku', account: 'mandiri', amount: 8100000, desc: 'Restock Bahan Baku Produksi & Box Kemasan' },
      { id: 'TX-107', date: '2026-07-28', ref: 'EXP-2607-06', type: 'OUT', category: 'Gaji & Komisi', account: 'bca', amount: 4200000, desc: 'Gaji Karyawan & Bonus Penjualan Juli' },

      { id: 'TX-108', date: '2026-08-15', ref: 'INV-2608-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 21500000, desc: 'Paket Hampers & Katering Kemerdekaan RI Agustus' },
      { id: 'TX-109', date: '2026-08-21', ref: 'EXP-2608-02', type: 'OUT', category: 'HPP Bahan Baku', account: 'mandiri', amount: 7900000, desc: 'Pembelian Bahan Baku Utama Supplier Induk' },
      { id: 'TX-110', date: '2026-08-27', ref: 'EXP-2608-03', type: 'OUT', category: 'Operasional & Utilitas', account: 'kas', amount: 2450000, desc: 'Listrik, Internet Fiber, Gas & Operasional Toko' },

      { id: 'TX-111', date: '2026-09-10', ref: 'INV-2609-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 19800000, desc: 'Kontrak Langganan Katering 3 Perusahaan September' },
      { id: 'TX-112', date: '2026-09-18', ref: 'QR-2609-02', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'qris', amount: 6350000, desc: 'Transaksi Kasir QRIS & Pesanan Online September' },
      { id: 'TX-113', date: '2026-09-25', ref: 'EXP-2609-03', type: 'OUT', category: 'HPP Bahan Baku', account: 'bca', amount: 8800000, desc: 'Belanja Bahan Baku & Kemasan Foodgrade' },
      { id: 'TX-114', date: '2026-09-29', ref: 'EXP-2609-04', type: 'OUT', category: 'Gaji & Komisi', account: 'mandiri', amount: 4600000, desc: 'Gaji Tim Produksi & Admin Keuangan September' },

      { id: 'TX-115', date: '2026-10-08', ref: 'INV-2610-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 23400000, desc: 'Penjualan Paket Rapat & Retail Grosir Oktober' },
      { id: 'TX-116', date: '2026-10-16', ref: 'KAS-2610-02', type: 'IN', category: 'Pendapatan Reseller/Grosir', account: 'kas', amount: 5800000, desc: 'Setoran Tunai Agen & Reseller Cabang Bekasi' },
      { id: 'TX-117', date: '2026-10-22', ref: 'EXP-2610-03', type: 'OUT', category: 'HPP Bahan Baku', account: 'mandiri', amount: 9400000, desc: 'Belanja Bahan Baku Produksi Oktober' },
      { id: 'TX-118', date: '2026-10-27', ref: 'EXP-2610-04', type: 'OUT', category: 'Marketing & Iklan', account: 'bca', amount: 1850000, desc: 'Iklan Meta Ads, Brosur Promo & Endorse UMKM' },
      { id: 'TX-119', date: '2026-10-30', ref: 'EXP-2610-05', type: 'OUT', category: 'Gaji & Komisi', account: 'bca', amount: 4800000, desc: 'Pembayaran Gaji & Insentif Karyawan Oktober' },

      { id: 'TX-120', date: '2026-11-02', ref: 'INV-2611-01', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'bca', amount: 16750000, desc: 'Pembayaran Kontrak Katering PT Graha Teknika (150 Pax)' },
      { id: 'TX-121', date: '2026-11-05', ref: 'QR-2611-02', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'qris', amount: 7450000, desc: ' Settlement Penjualan Outlet QRIS Pekan Pertama Nov' },
      { id: 'TX-122', date: '2026-11-07', ref: 'EXP-2611-03', type: 'OUT', category: 'HPP Bahan Baku', account: 'mandiri', amount: 6950000, desc: 'Pembelian Bahan Baku Segar & Kemasan Premium' },
      { id: 'TX-123', date: '2026-11-09', ref: 'KAS-2611-04', type: 'IN', category: 'Pelunasan Piutang', account: 'kas', amount: 4250000, desc: 'Pelunasan Tagihan Toko Roti Mekar Sari' },
      { id: 'TX-124', date: '2026-11-10', ref: 'EXP-2611-05', type: 'OUT', category: 'Sewa Tempat', account: 'bca', amount: 3000000, desc: 'Cicilan Sewa Ruko Dapur Produksi November' },
      { id: 'TX-125', date: '2026-11-11', ref: 'INV-2611-06', type: 'IN', category: 'Penjualan Produk/Jasa', account: 'mandiri', amount: 8900000, desc: 'Order Paket Snack Box & Hampers Seminar Nasional' },
      { id: 'TX-126', date: '2026-11-11', ref: 'EXP-2611-07', type: 'OUT', category: 'Operasional & Utilitas', account: 'kas', amount: 1150000, desc: 'Listrik Token, Internet WiFi & BBM Pengiriman Kurir' }
    ],
    debts: [
      { id: 'DB-01', type: 'PIUTANG', party: 'CV Sinar Jaya Abadi', wa: '6281290001122', due: '2026-11-15', amount: 6850000, account: 'bca', status: 'UNPAID', desc: 'Invoice INV/2026/11/008 - Paket Katering Rapat Direksi 120 Box' },
      { id: 'DB-02', type: 'PIUTANG', party: 'Klinik Sehat Sentosa', wa: '6281388776655', due: '2026-11-18', amount: 3400000, account: 'mandiri', status: 'UNPAID', desc: 'Invoice INV/2026/11/009 - Konsumsi Pelatihan Medis' },
      { id: 'DB-03', type: 'PIUTANG', party: 'Toko Kopi Senja Kemang', wa: '6285711223344', due: '2026-11-22', amount: 2750000, account: 'qris', status: 'UNPAID', desc: 'Supply Pastry & Croissant Beku 10 Karton' },
      { id: 'DB-04', type: 'HUTANG', party: 'PT Indogrosir Kemasan Jaya', wa: '6281122334455', due: '2026-11-19', amount: 3150000, account: 'mandiri', status: 'UNPAID', desc: 'PO Kemasan Paperbowl & Cup Sablon Custom 3.000 Pcs' },
      { id: 'DB-05', type: 'PIUTANG', party: 'Toko Roti Mekar Sari', wa: '6281233445566', due: '2026-11-09', amount: 4250000, account: 'kas', status: 'PAID', desc: 'Supply Bahan Isian Cokelat & Keju Premium' }
    ],
    invoices: [
      {
        id: 'INV-REC-1',
        docType: 'INVOICE TAGIHAN',
        number: 'INV/2026/11/008',
        date: '2026-11-11',
        due: '2026-11-15',
        clientName: 'CV Sinar Jaya Abadi',
        clientWa: '6281290001122',
        clientAddr: 'Gedung Perkantoran Mampang Lt. 4, Jakarta Selatan',
        discount: 150000,
        taxRate: 0,
        status: 'BELUM LUNAS',
        note: 'Mohon cantumkan nomor invoice pada berita transfer. Terima kasih atas kepercayaan Anda.',
        items: [
          { name: 'Paket Nasi Box Eksekutif Ayam Bakar Madu', qty: 100, price: 48000 },
          { name: 'Snack Box Premium Rapat (3 Kue + Kopi)', qty: 100, price: 22000 }
        ]
      },
      {
        id: 'INV-REC-2',
        docType: 'KWITANSI PEMBAYARAN',
        number: 'KWT/2026/11/004',
        date: '2026-11-02',
        due: '2026-11-02',
        clientName: 'PT Graha Teknika Persada',
        clientWa: '6281199887766',
        clientAddr: 'Kawasan Industri Pulogadung, Jakarta Timur',
        discount: 0,
        taxRate: 0,
        status: 'LUNAS',
        note: 'Pembayaran telah diterima penuh melalui Transfer Bank BCA.',
        items: [
          { name: 'Kontrak Katering Makan Siang Karyawan (250 Pax)', qty: 250, price: 67000 }
        ]
      }
    ]
  };
}

function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      db = JSON.parse(raw);
      if (db && Array.isArray(db.transactions)) return;
    }
  } catch (_) {}
  db = createSampleDatabase();
  persistDatabase();
}

function persistDatabase() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (_) {}
  // Optional async sync if running with local Node server.js
  if (location.protocol.startsWith('http')) {
    fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(db)
    }).catch(() => {});
  }
}

function loadSampleData(confirmUser) {
  if (confirmUser && !confirm('Muat ulang contoh data transaksi UMKM lengkap? Data saat ini akan diganti dengan contoh simulasi.')) {
    return;
  }
  db = createSampleDatabase();
  persistDatabase();
  loadInvoiceIntoBuilder(db.invoices[0]);
  refreshAllViews();
  showToast('✅ Contoh data pembukuan UMKM berhasil dimuat!');
}

function resetBlankData() {
  if (!confirm('Kosongkan seluruh transaksi untuk mulai pembukuan baru dari 0? (Pastikan Anda sudah Backup JSON jika diperlukan)')) {
    return;
  }
  db = {
    version: '4.2',
    profile: { ...db.profile },
    openingBalances: { kas: 0, bca: 0, mandiri: 0, qris: 0 },
    transactions: [],
    debts: [],
    invoices: []
  };
  persistDatabase();
  newInvoiceForm();
  refreshAllViews();
  showToast('🗑️ Data direset bersih! Siap untuk pembukuan usaha Anda.');
}

/* ============================================================================
 * NAVIGATION & MODAL HELPERS
 * ============================================================================ */
const TAB_TITLES = {
  dashboard: ['Dashboard Ringkasan Keuangan & Arus Kas', 'Pantau saldo kas/bank real-time, grafik arus kas bulanan, laba bersih, dan piutang pelanggan'],
  jurnal: ['Buku Jurnal Kas Masuk & Kas Keluar', 'Kelola seluruh transaksi pemasukan, HPP bahan baku, biaya operasional, dan mutasi rekening'],
  invoice: ['Generator Invoice, Penawaran & Kwitansi WhatsApp', 'Buat tagihan pelanggan resmi siap cetak PDF & kirim tagihan langsung ke WhatsApp'],
  piutang: ['Manajemen Hutang Supplier & Piutang Pelanggan', 'Pantau tagihan belum dibayar, pengingat jatuh tempo WA, dan pelunasan otomatis ke Jurnal Kas'],
  labarugi: ['Laporan Laba Rugi (Profit & Loss) & Posisi Kas', 'Laporan keuangan standar UMKM siap cetak PDF dan tanda tangan pemilik usaha']
};

function switchTab(tabId) {
  document.querySelectorAll('.tab-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  const target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');

  const meta = TAB_TITLES[tabId];
  if (meta) {
    document.getElementById('pageHeaderTitle').textContent = meta[0];
    document.getElementById('pageHeaderSub').textContent = meta[1];
  }

  if (tabId === 'dashboard') {
    setTimeout(drawMonthlyCashflowChart, 40);
  } else if (tabId === 'labarugi') {
    renderProfitLossReport();
  } else if (tabId === 'invoice') {
    updateInvoicePreview();
  }
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/* ============================================================================
 * CALCULATIONS & DASHBOARD RENDERING
 * ============================================================================ */
function computeAccountBalances() {
  const balances = {
    kas: Number(db.openingBalances?.kas || 0),
    bca: Number(db.openingBalances?.bca || 0),
    mandiri: Number(db.openingBalances?.mandiri || 0),
    qris: Number(db.openingBalances?.qris || 0)
  };
  const txCounts = { kas: 0, bca: 0, mandiri: 0, qris: 0 };

  for (const tx of db.transactions) {
    const acc = balances[tx.account] !== undefined ? tx.account : 'kas';
    const amt = Number(tx.amount) || 0;
    if (tx.type === 'IN') balances[acc] += amt;
    else balances[acc] -= amt;
    txCounts[acc] = (txCounts[acc] || 0) + 1;
  }
  return { balances, txCounts };
}

function isTransferTx(tx) {
  return tx.category === 'Mutasi Masuk' || tx.category === 'Mutasi Keluar';
}

function renderBrandIdentity() {
  const p = db.profile;
  document.getElementById('sidebarLogoBadge').textContent = (p.initials || 'FK').slice(0, 3).toUpperCase();
  document.getElementById('sidebarBizName').textContent = p.name;
  document.getElementById('sidebarBizMeta').textContent = p.tagline;
}

function renderDashboard() {
  const operationalTx = db.transactions.filter(t => !isTransferTx(t));
  const inTxs = operationalTx.filter(t => t.type === 'IN');
  const outTxs = operationalTx.filter(t => t.type === 'OUT');

  const totalIn = inTxs.reduce((s, t) => s + Number(t.amount || 0), 0);
  const totalOut = outTxs.reduce((s, t) => s + Number(t.amount || 0), 0);
  const netProfit = totalIn - totalOut;
  const marginPct = totalIn > 0 ? ((netProfit / totalIn) * 100).toFixed(1) : '0.0';

  const unpaidPiutang = db.debts.filter(d => d.type === 'PIUTANG' && d.status === 'UNPAID');
  const unpaidHutang = db.debts.filter(d => d.type === 'HUTANG' && d.status === 'UNPAID');
  const sumPiutang = unpaidPiutang.reduce((s, d) => s + Number(d.amount || 0), 0);
  const sumHutang = unpaidHutang.reduce((s, d) => s + Number(d.amount || 0), 0);

  document.getElementById('kpiTotalIn').textContent = formatRupiah(totalIn);
  document.getElementById('kpiInCount').textContent = `${inTxs.length} transaksi pemasukan tercatat`;
  document.getElementById('kpiTotalOut').textContent = formatRupiah(totalOut);
  document.getElementById('kpiOutCount').textContent = `${outTxs.length} transaksi pengeluaran tercatat`;
  document.getElementById('kpiNetProfit').textContent = formatRupiah(netProfit);
  document.getElementById('kpiNetProfit').style.color = netProfit >= 0 ? '#34d399' : '#fda4af';
  document.getElementById('kpiProfitMargin').textContent = `Margin Laba Bersih: ${marginPct}%`;
  document.getElementById('kpiReceivables').textContent = formatRupiah(sumPiutang);
  document.getElementById('kpiPayablesInfo').textContent = `${unpaidPiutang.length} tagihan aktif • Hutang: ${formatRupiah(sumHutang)}`;
  document.getElementById('unpaidCountBadge').textContent = String(unpaidPiutang.length + unpaidHutang.length);

  // Multi-Rekening Wallets
  const { balances, txCounts } = computeAccountBalances();
  const walletGrid = document.getElementById('walletCardsGrid');
  walletGrid.innerHTML = ACCOUNTS_META.map(acc => `
    <div class="wallet-card">
      <div class="wallet-head">
        <span style="font-size:0.82rem; font-weight:800; color:#e2e8f0;">${acc.name}</span>
        <span class="wallet-badge" style="background:${acc.bg}; color:${acc.color};">AKTIF</span>
      </div>
      <div class="wallet-bal">${formatRupiah(balances[acc.id])}</div>
      <div class="wallet-meta">${acc.bankCode} • ${txCounts[acc.id] || 0} mutasi</div>
    </div>
  `).join('');

  // Expense Category Breakdown
  const catTotals = {};
  for (const t of outTxs) {
    catTotals[t.category] = (catTotals[t.category] || 0) + Number(t.amount || 0);
  }
  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const colors = ['#f43f5e', '#f59e0b', '#0ea5e9', '#a855f7', '#10b981', '#6366f1'];
  const catContainer = document.getElementById('expenseCategoryList');
  if (sortedCats.length === 0) {
    catContainer.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted);">Belum ada data pengeluaran.</div>`;
  } else {
    catContainer.innerHTML = sortedCats.slice(0, 6).map(([cat, amt], idx) => {
      const pct = totalOut > 0 ? Math.round((amt / totalOut) * 100) : 0;
      const col = colors[idx % colors.length];
      return `
        <div>
          <div class="cat-item-top">
            <span>${cat}</span>
            <span style="color:${col}">${formatRupiah(amt)} (${pct}%)</span>
          </div>
          <div class="cat-progress">
            <div class="cat-progress-bar" style="width:${Math.max(4, pct)}%; background:${col};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Recent Transactions Table
  const sortedTx = [...db.transactions].sort((a, b) => b.date.localeCompare(a.date));
  const accMap = Object.fromEntries(ACCOUNTS_META.map(a => [a.id, a.name]));
  document.getElementById('recentTxBody').innerHTML = sortedTx.slice(0, 7).map(t => `
    <tr>
      <td style="white-space:nowrap; color:#cbd5e1;">${t.date}</td>
      <td>
        <div style="font-weight:700; color:#fff;">${escapeHtml(t.desc)}</div>
        <div style="font-size:0.72rem; color:var(--text-muted);">${escapeHtml(t.category)} • ${escapeHtml(t.ref || '-')}</div>
      </td>
      <td><span style="font-size:0.76rem; color:#94a3b8;">${accMap[t.account] || t.account}</span></td>
      <td><span class="${t.type === 'IN' ? 'pill-in' : 'pill-out'}">${t.type === 'IN' ? 'MASUK' : 'KELUAR'}</span></td>
      <td style="text-align:right; font-weight:800; color:${t.type === 'IN' ? '#34d399' : '#fda4af'};">
        ${t.type === 'IN' ? '+' : '-'}${formatRupiah(t.amount)}
      </td>
    </tr>
  `).join('') || `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada transaksi. Klik "Kas Masuk" di atas untuk mulai mencatat.</td></tr>`;

  // Upcoming Due Debts
  const activeDebts = db.debts.filter(d => d.status === 'UNPAID').sort((a, b) => a.due.localeCompare(b.due));
  const dueEl = document.getElementById('upcomingDueList');
  dueEl.innerHTML = activeDebts.slice(0, 4).map(d => `
    <div style="background:rgba(11,19,36,0.75); border:1px solid var(--border); border-radius:12px; padding:11px 13px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
      <div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="${d.type === 'PIUTANG' ? 'pill-warn' : 'pill-out'}">${d.type}</span>
          <strong style="font-size:0.83rem;">${escapeHtml(d.party)}</strong>
        </div>
        <div style="font-size:0.73rem; color:var(--text-muted); margin-top:3px;">Jatuh Tempo: <strong>${d.due}</strong></div>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:800; font-size:0.88rem; color:#fff;">${formatRupiah(d.amount)}</div>
        <button class="btn btn-emerald btn-sm" style="margin-top:4px;" onclick="settleDebt('${d.id}')">✓ Lunasi</button>
      </div>
    </div>
  `).join('') || `<div style="font-size:0.8rem; color:var(--text-muted);">Tidak ada tagihan belum lunas 🎉</div>`;

  drawMonthlyCashflowChart();
}

/* ============================================================================
 * INTERACTIVE CANVAS MONTHLY CASHFLOW CHART
 * ============================================================================ */
function drawMonthlyCashflowChart() {
  const canvas = document.getElementById('cashflowCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width < 40) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  ctx.clearRect(0, 0, W, H);

  // Aggregate last 6 months (2026-06 .. 2026-11 or dynamic from data)
  const monthsMap = new Map();
  const defaultMonths = ['2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11'];
  for (const m of defaultMonths) monthsMap.set(m, { inAmt: 0, outAmt: 0 });

  for (const t of db.transactions) {
    if (isTransferTx(t) || !t.date) continue;
    const ym = t.date.slice(0, 7);
    if (!monthsMap.has(ym)) monthsMap.set(ym, { inAmt: 0, outAmt: 0 });
    const entry = monthsMap.get(ym);
    if (t.type === 'IN') entry.inAmt += Number(t.amount || 0);
    else entry.outAmt += Number(t.amount || 0);
  }

  const keys = Array.from(monthsMap.keys()).sort().slice(-6);
  const monthNames = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu', '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des' };

  const series = keys.map(k => {
    const v = monthsMap.get(k);
    const [yr, mo] = k.split('-');
    return {
      label: `${monthNames[mo] || mo} '${yr.slice(2)}`,
      inAmt: v.inAmt,
      outAmt: v.outAmt,
      net: v.inAmt - v.outAmt
    };
  });

  const maxVal = Math.max(5000000, ...series.map(s => Math.max(s.inAmt, s.outAmt)));
  const padL = 66, padR = 20, padT = 20, padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Grid lines
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.lineWidth = 1;
  ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#94a3b8';

  for (let i = 0; i <= 4; i++) {
    const y = padT + plotH - (i / 4) * plotH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();

    const val = (maxVal * i) / 4;
    const shortLabel = val >= 1000000 ? `${(val / 1000000).toFixed(0)} Jt` : `${Math.round(val / 1000)} Rb`;
    ctx.textAlign = 'right';
    ctx.fillText(shortLabel, padL - 8, y + 4);
  }

  const groupW = plotW / series.length;
  const barW = Math.min(26, groupW * 0.28);
  const netPoints = [];

  series.forEach((s, idx) => {
    const cx = padL + groupW * idx + groupW / 2;
    const hIn = (s.inAmt / maxVal) * plotH;
    const hOut = (s.outAmt / maxVal) * plotH;

    // Income Bar
    const gradIn = ctx.createLinearGradient(0, padT + plotH - hIn, 0, padT + plotH);
    gradIn.addColorStop(0, '#34d399');
    gradIn.addColorStop(1, '#059669');
    ctx.fillStyle = gradIn;
    roundRectFill(ctx, cx - barW - 3, padT + plotH - hIn, barW, Math.max(2, hIn), 5);

    // Expense Bar
    const gradOut = ctx.createLinearGradient(0, padT + plotH - hOut, 0, padT + plotH);
    gradOut.addColorStop(0, '#fb7185');
    gradOut.addColorStop(1, '#e11d48');
    ctx.fillStyle = gradOut;
    roundRectFill(ctx, cx + 3, padT + plotH - hOut, barW, Math.max(2, hOut), 5);

    // X label
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.font = '700 11.5px Plus Jakarta Sans, sans-serif';
    ctx.fillText(s.label, cx, H - 12);

    const netY = padT + plotH - Math.max(0, (s.net / maxVal) * plotH);
    netPoints.push({ x: cx, y: netY, net: s.net });
  });

  // Net Profit Smooth Line
  if (netPoints.length > 1) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    netPoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    netPoints.forEach(pt => {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });
  }
}

function roundRectFill(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
  ctx.fill();
}

window.addEventListener('resize', () => {
  if (document.getElementById('tab-dashboard')?.classList.contains('active')) {
    drawMonthlyCashflowChart();
  }
});

/* ============================================================================
 * JURNAL KAS MASUK & KAS KELUAR (CRUD + FILTER)
 * ============================================================================ */
function syncTxCategoryOptions(selectedVal) {
  const type = document.getElementById('txType').value;
  const cats = type === 'IN' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const sel = document.getElementById('txCategory');
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
  if (selectedVal && cats.includes(selectedVal)) sel.value = selectedVal;
}

function openTxModal(defaultType = 'IN', editId = null) {
  document.getElementById('txEditId').value = editId || '';
  if (editId) {
    const tx = db.transactions.find(x => x.id === editId);
    if (!tx) return;
    document.getElementById('txModalTitle').textContent = 'Edit Transaksi Jurnal Kas';
    document.getElementById('txType').value = tx.type;
    syncTxCategoryOptions(tx.category);
    document.getElementById('txDate').value = tx.date;
    document.getElementById('txAccount').value = tx.account;
    document.getElementById('txAmount').value = tx.amount;
    document.getElementById('txRef').value = tx.ref || '';
    document.getElementById('txDesc').value = tx.desc || '';
  } else {
    document.getElementById('txModalTitle').textContent = defaultType === 'IN' ? '➕ Catat Kas Masuk (Pemasukan)' : '➖ Catat Kas Keluar (Pengeluaran)';
    document.getElementById('txType').value = defaultType;
    syncTxCategoryOptions();
    document.getElementById('txDate').value = new Date().toISOString().slice(0, 10);
    document.getElementById('txAccount').value = 'bca';
    document.getElementById('txAmount').value = '';
    document.getElementById('txRef').value = `${defaultType === 'IN' ? 'KM' : 'KK'}-${String(db.transactions.length + 1).padStart(3, '0')}`;
    document.getElementById('txDesc').value = '';
  }
  openModal('txModal');
}

function saveTransaction() {
  const editId = document.getElementById('txEditId').value;
  const type = document.getElementById('txType').value;
  const date = document.getElementById('txDate').value;
  const category = document.getElementById('txCategory').value;
  const account = document.getElementById('txAccount').value;
  const amount = Math.round(Number(document.getElementById('txAmount').value || 0));
  const ref = document.getElementById('txRef').value.trim() || '-';
  const desc = document.getElementById('txDesc').value.trim();

  if (!date || amount <= 0 || !desc) {
    alert('Mohon lengkapi Tanggal, Nominal (lebih dari 0), dan Keterangan Transaksi!');
    return;
  }

  if (editId) {
    const idx = db.transactions.findIndex(x => x.id === editId);
    if (idx !== -1) {
      db.transactions[idx] = { ...db.transactions[idx], type, date, category, account, amount, ref, desc };
    }
    showToast('✅ Transaksi berhasil diperbarui!');
  } else {
    db.transactions.push({
      id: 'TX-' + Date.now(),
      type,
      date,
      category,
      account,
      amount,
      ref,
      desc
    });
    showToast('✅ Transaksi berhasil dicatat ke Jurnal Kas!');
  }

  persistDatabase();
  closeModal('txModal');
  refreshAllViews();
}

function deleteTransaction(id) {
  if (!confirm('Hapus transaksi ini dari Jurnal Kas? Saldo rekening akan otomatis disesuaikan.')) return;
  db.transactions = db.transactions.filter(t => t.id !== id);
  persistDatabase();
  refreshAllViews();
  showToast('🗑️ Transaksi dihapus dari jurnal.');
}

function openTransferModal() {
  document.getElementById('trfDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('trfAmount').value = '';
  openModal('transferModal');
}

function executeAccountTransfer() {
  const fromAcc = document.getElementById('trfFrom').value;
  const toAcc = document.getElementById('trfTo').value;
  const date = document.getElementById('trfDate').value;
  const amount = Math.round(Number(document.getElementById('trfAmount').value || 0));
  const note = document.getElementById('trfNote').value.trim() || 'Mutasi Antar Rekening';

  if (fromAcc === toAcc) {
    alert('Rekening asal dan tujuan tidak boleh sama!');
    return;
  }
  if (!date || amount <= 0) {
    alert('Masukkan tanggal dan nominal mutasi yang valid!');
    return;
  }

  const accMap = Object.fromEntries(ACCOUNTS_META.map(a => [a.id, a.name]));
  const refCode = 'TRF-' + String(Date.now()).slice(-4);

  db.transactions.push(
    {
      id: 'TX-' + Date.now() + '-A',
      type: 'OUT',
      date,
      category: 'Mutasi Keluar',
      account: fromAcc,
      amount,
      ref: refCode,
      desc: `${note} (Ke ${accMap[toAcc]})`
    },
    {
      id: 'TX-' + Date.now() + '-B',
      type: 'IN',
      date,
      category: 'Mutasi Masuk',
      account: toAcc,
      amount,
      ref: refCode,
      desc: `${note} (Dari ${accMap[fromAcc]})`
    }
  );

  persistDatabase();
  closeModal('transferModal');
  refreshAllViews();
  showToast('🔁 Mutasi saldo antar rekening berhasil dicatat!');
}

function resetJournalFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterType').value = 'ALL';
  document.getElementById('filterAccount').value = 'ALL';
  document.getElementById('filterCategory').value = 'ALL';
  document.getElementById('filterDateFrom').value = '';
  document.getElementById('filterDateTo').value = '';
  renderJournalTable();
}

function getFilteredTransactions() {
  const q = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim();
  const type = document.getElementById('filterType')?.value || 'ALL';
  const acc = document.getElementById('filterAccount')?.value || 'ALL';
  const cat = document.getElementById('filterCategory')?.value || 'ALL';
  const dFrom = document.getElementById('filterDateFrom')?.value || '';
  const dTo = document.getElementById('filterDateTo')?.value || '';

  return [...db.transactions]
    .filter(t => {
      if (type !== 'ALL' && t.type !== type) return false;
      if (acc !== 'ALL' && t.account !== acc) return false;
      if (cat !== 'ALL' && t.category !== cat) return false;
      if (dFrom && t.date < dFrom) return false;
      if (dTo && t.date > dTo) return false;
      if (q && !(`${t.desc} ${t.ref} ${t.category}`).toLowerCase().includes(q)) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function renderJournalTable() {
  const rows = getFilteredTransactions();
  const sumIn = rows.filter(r => r.type === 'IN').reduce((s, r) => s + Number(r.amount || 0), 0);
  const sumOut = rows.filter(r => r.type === 'OUT').reduce((s, r) => s + Number(r.amount || 0), 0);
  const accMap = Object.fromEntries(ACCOUNTS_META.map(a => [a.id, a.name]));

  document.getElementById('journalFilterSummary').innerHTML =
    `Menampilkan <strong>${rows.length}</strong> transaksi • Total Masuk: <span style="color:#34d399">${formatRupiah(sumIn)}</span> • Total Keluar: <span style="color:#fda4af">${formatRupiah(sumOut)}</span> • Selisih Kas: <span style="color:#38bdf8">${formatRupiah(sumIn - sumOut)}</span>`;

  document.getElementById('journalTableBody').innerHTML = rows.map(t => `
    <tr>
      <td style="white-space:nowrap;">${t.date}</td>
      <td style="font-family:monospace; color:#94a3b8;">${escapeHtml(t.ref || '-')}</td>
      <td><span style="font-weight:700; color:#e2e8f0;">${escapeHtml(t.category)}</span></td>
      <td>${escapeHtml(t.desc)}</td>
      <td>${accMap[t.account] || t.account}</td>
      <td><span class="${t.type === 'IN' ? 'pill-in' : 'pill-out'}">${t.type === 'IN' ? 'KAS MASUK' : 'KAS KELUAR'}</span></td>
      <td style="text-align:right; font-weight:800; color:${t.type === 'IN' ? '#34d399' : '#fda4af'};">
        ${t.type === 'IN' ? '+' : '-'}${formatRupiah(t.amount)}
      </td>
      <td style="text-align:center; white-space:nowrap;">
        <button class="btn btn-ghost btn-sm" onclick="openTxModal('${t.type}', '${t.id}')">✏️</button>
        <button class="btn btn-rose btn-sm" onclick="deleteTransaction('${t.id}')">🗑️</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">Tidak ada transaksi yang cocok dengan filter pencarian.</td></tr>`;
}

/* ============================================================================
 * GENERATOR INVOICE, QUOTATION & KWITANSI WA
 * ============================================================================ */
function newInvoiceForm() {
  editingInvoiceId = null;
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  document.getElementById('invDocType').value = 'INVOICE TAGIHAN';
  document.getElementById('invNumber').value = `INV/${today.slice(0, 4)}/${today.slice(5, 7)}/${String(db.invoices.length + 1).padStart(3, '0')}`;
  document.getElementById('invDate').value = today;
  document.getElementById('invDue').value = nextWeek;
  document.getElementById('invClientName').value = '';
  document.getElementById('invClientWa').value = '';
  document.getElementById('invClientAddr').value = '';
  document.getElementById('invDiscount').value = 0;
  document.getElementById('invTaxRate').value = '0';
  document.getElementById('invStatus').value = 'BELUM LUNAS';
  document.getElementById('invNote').value = 'Terima kasih atas kerja sama Anda. Mohon konfirmasi bukti pembayaran melalui WhatsApp.';
  currentInvoiceItems = [{ name: 'Paket Produk / Layanan Usaha', qty: 1, price: 250000 }];
  renderInvoiceItemRows();
  updateInvoicePreview();
}

function loadInvoiceIntoBuilder(inv) {
  if (!inv) return newInvoiceForm();
  editingInvoiceId = inv.id;
  document.getElementById('invDocType').value = inv.docType || 'INVOICE TAGIHAN';
  document.getElementById('invNumber').value = inv.number || '';
  document.getElementById('invDate').value = inv.date || '';
  document.getElementById('invDue').value = inv.due || '';
  document.getElementById('invClientName').value = inv.clientName || '';
  document.getElementById('invClientWa').value = inv.clientWa || '';
  document.getElementById('invClientAddr').value = inv.clientAddr || '';
  document.getElementById('invDiscount').value = inv.discount || 0;
  document.getElementById('invTaxRate').value = String(inv.taxRate || 0);
  document.getElementById('invStatus').value = inv.status || 'BELUM LUNAS';
  document.getElementById('invNote').value = inv.note || '';
  currentInvoiceItems = (inv.items || []).map(x => ({ ...x }));
  renderInvoiceItemRows();
  updateInvoicePreview();
}

function renderInvoiceItemRows() {
  const box = document.getElementById('invItemsContainer');
  box.innerHTML = currentInvoiceItems.map((it, idx) => `
    <div style="display:grid; grid-template-columns: 1fr 78px 130px 36px; gap:6px; align-items:center;">
      <input type="text" class="input" placeholder="Nama Barang / Jasa" value="${escapeHtml(it.name)}"
        oninput="currentInvoiceItems[${idx}].name=this.value; updateInvoicePreview();" />
      <input type="number" class="input" placeholder="Qty" min="1" value="${it.qty}"
        oninput="currentInvoiceItems[${idx}].qty=Number(this.value||1); updateInvoicePreview();" />
      <input type="number" class="input" placeholder="Harga (Rp)" min="0" value="${it.price}"
        oninput="currentInvoiceItems[${idx}].price=Number(this.value||0); updateInvoicePreview();" />
      <button class="btn btn-rose btn-sm" onclick="removeInvoiceItemRow(${idx})">✕</button>
    </div>
  `).join('');
}

function addInvoiceItemRow() {
  currentInvoiceItems.push({ name: '', qty: 1, price: 0 });
  renderInvoiceItemRows();
  updateInvoicePreview();
}

function removeInvoiceItemRow(idx) {
  if (currentInvoiceItems.length <= 1) return;
  currentInvoiceItems.splice(idx, 1);
  renderInvoiceItemRows();
  updateInvoicePreview();
}

function readCurrentInvoiceData() {
  const subtotal = currentInvoiceItems.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.price || 0)), 0);
  const discount = Math.max(0, Number(document.getElementById('invDiscount')?.value || 0));
  const afterDisc = Math.max(0, subtotal - discount);
  const taxRate = Number(document.getElementById('invTaxRate')?.value || 0);
  const taxAmt = Math.round((afterDisc * taxRate) / 100);
  const grandTotal = afterDisc + taxAmt;

  return {
    id: editingInvoiceId || ('INV-' + Date.now()),
    docType: document.getElementById('invDocType')?.value || 'INVOICE TAGIHAN',
    number: document.getElementById('invNumber')?.value || 'INV/2026/001',
    date: document.getElementById('invDate')?.value || '',
    due: document.getElementById('invDue')?.value || '',
    clientName: document.getElementById('invClientName')?.value || 'Pelanggan Yth.',
    clientWa: document.getElementById('invClientWa')?.value || '',
    clientAddr: document.getElementById('invClientAddr')?.value || '-',
    discount,
    taxRate,
    taxAmt,
    subtotal,
    grandTotal,
    status: document.getElementById('invStatus')?.value || 'BELUM LUNAS',
    note: document.getElementById('invNote')?.value || '',
    items: currentInvoiceItems.map(x => ({ ...x }))
  };
}

function updateInvoicePreview() {
  const inv = readCurrentInvoiceData();
  const p = db.profile;
  const isPaid = inv.status === 'LUNAS';

  document.getElementById('invoicePaperArea').innerHTML = `
    <div class="paper-header">
      <div class="paper-brand">
        <div class="paper-logo">${escapeHtml((p.initials || 'FK').slice(0, 3))}</div>
        <div>
          <div style="font-size:1.15rem; font-weight:900; color:#0f172a;">${escapeHtml(p.name)}</div>
          <div style="font-size:0.76rem; color:#475569; max-width:300px;">${escapeHtml(p.address)}</div>
          <div style="font-size:0.75rem; color:#0f766e; font-weight:700;">WA/Telp: ${escapeHtml(p.phone)}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="paper-doc-badge">${escapeHtml(inv.docType)}</div>
        <div style="font-size:0.84rem; font-weight:800; color:#1e293b; margin-top:2px;">No: ${escapeHtml(inv.number)}</div>
        <div style="margin-top:6px;">
          <span style="display:inline-block; padding:3px 10px; border-radius:999px; font-size:0.72rem; font-weight:900; background:${isPaid ? '#dcfce7' : '#fef3c7'}; color:${isPaid ? '#166534' : '#92400e'}; border:1px solid ${isPaid ? '#86efac' : '#fcd34d'};">
            STATUS: ${escapeHtml(inv.status)}
          </span>
        </div>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; gap:16px; margin-bottom:14px; font-size:0.82rem;">
      <div>
        <div style="font-size:0.7rem; font-weight:800; color:#64748b; text-transform:uppercase;">Kepada Yth:</div>
        <div style="font-size:0.95rem; font-weight:800; color:#0f172a;">${escapeHtml(inv.clientName || 'Pelanggan Yth.')}</div>
        <div style="color:#475569;">${escapeHtml(inv.clientAddr)}</div>
        ${inv.clientWa ? `<div style="color:#475569;">WA: ${escapeHtml(inv.clientWa)}</div>` : ''}
      </div>
      <div style="text-align:right;">
        <div><span style="color:#64748b;">Tanggal Terbit:</span> <strong>${inv.date || '-'}</strong></div>
        <div><span style="color:#64748b;">Jatuh Tempo:</span> <strong style="color:#b91c1c;">${inv.due || '-'}</strong></div>
      </div>
    </div>

    <table class="paper-table">
      <thead>
        <tr>
          <th style="width:36px;">No</th>
          <th>Deskripsi Barang / Layanan</th>
          <th style="text-align:center; width:64px;">Qty</th>
          <th style="text-align:right; width:125px;">Harga Satuan</th>
          <th style="text-align:right; width:135px;">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map((it, i) => `
          <tr>
            <td>${i + 1}</td>
            <td style="font-weight:600;">${escapeHtml(it.name || '-')}</td>
            <td style="text-align:center;">${it.qty}</td>
            <td style="text-align:right;">${formatRupiah(it.price)}</td>
            <td style="text-align:right; font-weight:700;">${formatRupiah((Number(it.qty) || 0) * (Number(it.price) || 0))}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="display:grid; grid-template-columns: 1.15fr 1fr; gap:20px; margin-top:14px;">
      <div style="font-size:0.77rem; color:#334155; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
        <div style="font-weight:800; color:#0f172a; margin-bottom:4px;">Informasi Rekening Pembayaran:</div>
        <div>${escapeHtml(p.bankInfo)}</div>
        ${inv.note ? `<div style="margin-top:8px; font-style:italic; color:#475569;">"${escapeHtml(inv.note)}"</div>` : ''}
      </div>
      <div>
        <div class="paper-summary-row"><span>Subtotal</span><strong>${formatRupiah(inv.subtotal)}</strong></div>
        ${inv.discount > 0 ? `<div class="paper-summary-row" style="color:#dc2626;"><span>Diskon Potongan</span><strong>- ${formatRupiah(inv.discount)}</strong></div>` : ''}
        ${inv.taxRate > 0 ? `<div class="paper-summary-row"><span>PPN (${inv.taxRate}%)</span><strong>${formatRupiah(inv.taxAmt)}</strong></div>` : ''}
        <div class="paper-summary-total">
          <span>TOTAL TAGIHAN</span>
          <span>${formatRupiah(inv.grandTotal)}</span>
        </div>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:28px; padding-top:14px; font-size:0.8rem; color:#334155;">
      <div>
        <div>Penerima / Pelanggan,</div>
        <div style="height:52px;"></div>
        <div style="font-weight:700; border-top:1px solid #94a3b8; padding-top:4px; min-width:150px; text-align:center;">
          ${escapeHtml(inv.clientName || '....................')}
        </div>
      </div>
      <div style="text-align:center;">
        <div>${escapeHtml(p.city)}, ${inv.date || new Date().toISOString().slice(0, 10)}</div>
        <div style="font-weight:700; color:#0f172a;">Hormat Kami,</div>
        <div style="height:48px;"></div>
        <div style="font-weight:800; color:#0f172a; border-top:1px solid #0f172a; padding-top:4px; min-width:170px;">
          ${escapeHtml(p.owner)}
        </div>
      </div>
    </div>
  `;
}

function saveCurrentInvoice() {
  const inv = readCurrentInvoiceData();
  const existingIdx = db.invoices.findIndex(x => x.id === inv.id || x.number === inv.number);
  if (existingIdx !== -1) {
    db.invoices[existingIdx] = inv;
  } else {
    db.invoices.unshift(inv);
  }
  editingInvoiceId = inv.id;
  persistDatabase();
  renderSavedInvoicesTable();
  showToast('💾 Dokumen Invoice/Kwitansi berhasil disimpan!');
}

function renderSavedInvoicesTable() {
  const tbody = document.getElementById('savedInvoicesBody');
  if (!tbody) return;
  tbody.innerHTML = db.invoices.map(inv => {
    const sub = (inv.items || []).reduce((s, it) => s + Number(it.qty || 0) * Number(it.price || 0), 0);
    const afterD = Math.max(0, sub - Number(inv.discount || 0));
    const total = afterD + Math.round((afterD * Number(inv.taxRate || 0)) / 100);
    return `
      <tr>
        <td style="font-weight:700;">${escapeHtml(inv.number)}</td>
        <td>${escapeHtml(inv.clientName)}</td>
        <td style="font-weight:800;">${formatRupiah(total)}</td>
        <td><span class="${inv.status === 'LUNAS' ? 'pill-in' : 'pill-warn'}">${inv.status}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick='loadSavedInvoiceById("${inv.id}")'>📂 Buka</button>
        </td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Belum ada arsip invoice.</td></tr>`;
}

function loadSavedInvoiceById(id) {
  const found = db.invoices.find(x => x.id === id);
  if (found) {
    loadInvoiceIntoBuilder(found);
    showToast(`📂 Membuka ${found.number}`);
  }
}

function sendInvoiceWhatsApp() {
  const inv = readCurrentInvoiceData();
  saveCurrentInvoice();
  const cleanPhone = (inv.clientWa || '').replace(/[^0-9]/g, '');
  const itemLines = inv.items.map((it, i) => `${i + 1}. ${it.name} (${it.qty} x ${formatRupiah(it.price)}) = ${formatRupiah(it.qty * it.price)}`).join('\n');

  const msg =
    `Halo Yth. *${inv.clientName}*,\n` +
    `Berikut kami kirimkan rincian *${inv.docType}* dari *${db.profile.name}*:\n\n` +
    `📄 *No. Dokumen:* ${inv.number}\n` +
    `📅 *Tanggal:* ${inv.date}\n` +
    `⏳ *Jatuh Tempo:* ${inv.due}\n` +
    `📌 *Status:* ${inv.status}\n\n` +
    `*Rincian Pesanan:*\n${itemLines}\n` +
    (inv.discount > 0 ? `Potongan Diskon: -${formatRupiah(inv.discount)}\n` : '') +
    (inv.taxRate > 0 ? `PPN (${inv.taxRate}%): ${formatRupiah(inv.taxAmt)}\n` : '') +
    `━━━━━━━━━━━━━━━━━━\n` +
    `💰 *TOTAL TAGIHAN: ${formatRupiah(inv.grandTotal)}*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `🏦 *Pembayaran via:*\n${db.profile.bankInfo}\n\n` +
    `Terima kasih atas kepercayaan Anda! 🙏`;

  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function markInvoicePaidToJournal() {
  const inv = readCurrentInvoiceData();
  document.getElementById('invStatus').value = 'LUNAS';
  document.getElementById('invDocType').value = 'KWITANSI PEMBAYARAN';
  saveCurrentInvoice();
  updateInvoicePreview();

  db.transactions.push({
    id: 'TX-' + Date.now(),
    type: 'IN',
    date: new Date().toISOString().slice(0, 10),
    category: 'Penjualan Produk/Jasa',
    account: 'bca',
    amount: inv.grandTotal,
    ref: inv.number,
    desc: `Pelunasan Invoice ${inv.number} - ${inv.clientName}`
  });
  persistDatabase();
  refreshAllViews();
  showToast(`✅ Invoice ${inv.number} ditandai LUNAS & otomatis masuk Jurnal Kas!`);
}

/* ============================================================================
 * MANAJEMEN HUTANG & PIUTANG
 * ============================================================================ */
function openDebtModal(defaultType = 'PIUTANG') {
  document.getElementById('debtType').value = defaultType;
  document.getElementById('debtModalTitle').textContent = defaultType === 'PIUTANG'
    ? '➕ Catat Piutang Pelanggan Baru'
    : '➕ Catat Hutang Supplier Baru';
  document.getElementById('debtDue').value = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  document.getElementById('debtParty').value = '';
  document.getElementById('debtWa').value = '';
  document.getElementById('debtAmount').value = '';
  document.getElementById('debtDesc').value = '';
  openModal('debtModal');
}

function saveDebtRecord() {
  const type = document.getElementById('debtType').value;
  const due = document.getElementById('debtDue').value;
  const party = document.getElementById('debtParty').value.trim();
  const wa = document.getElementById('debtWa').value.trim();
  const amount = Math.round(Number(document.getElementById('debtAmount').value || 0));
  const account = document.getElementById('debtAccount').value;
  const desc = document.getElementById('debtDesc').value.trim();

  if (!party || amount <= 0 || !due) {
    alert('Mohon isi Nama Pelanggan/Supplier, Jatuh Tempo, dan Nominal Tagihan!');
    return;
  }

  db.debts.unshift({
    id: 'DB-' + Date.now(),
    type,
    party,
    wa,
    due,
    amount,
    account,
    status: 'UNPAID',
    desc: desc || `${type} Usaha`
  });

  persistDatabase();
  closeModal('debtModal');
  refreshAllViews();
  showToast(`✅ Catatan ${type} berhasil disimpan!`);
}

function settleDebt(id) {
  const d = db.debts.find(x => x.id === id);
  if (!d || d.status === 'PAID') return;
  const accMap = Object.fromEntries(ACCOUNTS_META.map(a => [a.id, a.name]));
  if (!confirm(`Tandai LUNAS ${d.type} "${d.party}" sebesar ${formatRupiah(d.amount)}?\nTransaksi akan otomatis dicatat ke Jurnal (${accMap[d.account] || d.account}).`)) {
    return;
  }

  d.status = 'PAID';
  db.transactions.push({
    id: 'TX-' + Date.now(),
    type: d.type === 'PIUTANG' ? 'IN' : 'OUT',
    date: new Date().toISOString().slice(0, 10),
    category: d.type === 'PIUTANG' ? 'Pelunasan Piutang' : 'Pelunasan Hutang Supplier',
    account: d.account || 'bca',
    amount: d.amount,
    ref: d.id,
    desc: `Pelunasan ${d.type}: ${d.party} (${d.desc})`
  });

  persistDatabase();
  refreshAllViews();
  showToast(`✅ ${d.type} ${d.party} LUNAS & otomatis tercatat di Jurnal Kas!`);
}

function sendDebtReminderWa(id) {
  const d = db.debts.find(x => x.id === id);
  if (!d) return;
  const phone = (d.wa || '').replace(/[^0-9]/g, '');
  const msg =
    `Halo Yth. *${d.party}*,\n` +
    `Semoga usaha Bapak/Ibu selalu lancar 🙏\n\n` +
    `Kami dari *${db.profile.name}* izin mengingatkan tagihan yang jatuh tempo pada *${d.due}*:\n` +
    `📌 *Keterangan:* ${d.desc}\n` +
    `💰 *Nominal:* ${formatRupiah(d.amount)}\n\n` +
    `Pembayaran dapat ditransfer melalui:\n${db.profile.bankInfo}\n\n` +
    `Jika sudah melakukan pembayaran, mohon abaikan pesan ini atau kirimkan bukti transfernya ya. Terima kasih banyak! 🙏`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function deleteDebt(id) {
  if (!confirm('Hapus catatan hutang/piutang ini?')) return;
  db.debts = db.debts.filter(x => x.id !== id);
  persistDatabase();
  refreshAllViews();
}

function renderDebtsTable() {
  const fType = document.getElementById('debtFilterType')?.value || 'ALL';
  const fStat = document.getElementById('debtFilterStatus')?.value || 'ALL';

  const list = db.debts.filter(d => {
    if (fType !== 'ALL' && d.type !== fType) return false;
    if (fStat !== 'ALL' && d.status !== fStat) return false;
    return true;
  });

  document.getElementById('debtsTableBody').innerHTML = list.map(d => `
    <tr>
      <td><span class="${d.type === 'PIUTANG' ? 'pill-warn' : 'pill-out'}">${d.type}</span></td>
      <td>
        <div style="font-weight:800; color:#fff;">${escapeHtml(d.party)}</div>
        ${d.wa ? `<div style="font-size:0.72rem; color:#38bdf8;">WA: ${escapeHtml(d.wa)}</div>` : ''}
      </td>
      <td>${escapeHtml(d.desc)}</td>
      <td style="font-weight:700;">${d.due}</td>
      <td style="text-align:right; font-weight:800;">${formatRupiah(d.amount)}</td>
      <td>
        <span class="${d.status === 'PAID' ? 'pill-in' : 'pill-warn'}">${d.status === 'PAID' ? 'LUNAS' : 'BELUM LUNAS'}</span>
      </td>
      <td style="text-align:center; white-space:nowrap;">
        ${d.status === 'UNPAID' ? `<button class="btn btn-emerald btn-sm" onclick="settleDebt('${d.id}')">✅ Lunasi</button>` : ''}
        ${d.type === 'PIUTANG' && d.status === 'UNPAID' ? `<button class="btn btn-wa btn-sm" onclick="sendDebtReminderWa('${d.id}')">📲 Ingatkan WA</button>` : ''}
        <button class="btn btn-rose btn-sm" onclick="deleteDebt('${d.id}')">🗑️</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="7" style="text-align:center; padding:22px; color:var(--text-muted);">Tidak ada data hutang/piutang pada filter ini.</td></tr>`;
}

/* ============================================================================
 * LAPORAN LABA RUGI (PROFIT & LOSS) OTOMATIS + EXPORT CSV/JSON
 * ============================================================================ */
function computePnlBreakdown(periodFilter) {
  const rows = db.transactions.filter(t => {
    if (isTransferTx(t)) return false;
    if (periodFilter && periodFilter !== 'ALL' && !t.date.startsWith(periodFilter)) return false;
    return true;
  });

  const revByCat = {};
  let totalRev = 0;
  let totalHpp = 0;
  const opexByCat = {};
  let totalOpex = 0;

  for (const t of rows) {
    const amt = Number(t.amount || 0);
    if (t.type === 'IN') {
      revByCat[t.category] = (revByCat[t.category] || 0) + amt;
      totalRev += amt;
    } else {
      if (t.category === 'HPP Bahan Baku' || t.category === 'Pelunasan Hutang Supplier') {
        totalHpp += amt;
      } else {
        opexByCat[t.category] = (opexByCat[t.category] || 0) + amt;
        totalOpex += amt;
      }
    }
  }

  const grossProfit = totalRev - totalHpp;
  const netProfit = grossProfit - totalOpex;
  const netMargin = totalRev > 0 ? ((netProfit / totalRev) * 100).toFixed(1) : '0.0';

  return { revByCat, totalRev, totalHpp, grossProfit, opexByCat, totalOpex, netProfit, netMargin, txCount: rows.length };
}

function renderProfitLossReport() {
  const period = document.getElementById('pnlMonthFilter')?.value || 'ALL';
  const periodLabels = {
    'ALL': 'Akumulasi Seluruh Periode berjalan (2026)',
    '2026-11': 'Periode Bulan November 2026',
    '2026-10': 'Periode Bulan Oktober 2026',
    '2026-09': 'Periode Bulan September 2026',
    '2026-08': 'Periode Bulan Agustus 2026'
  };
  const pnl = computePnlBreakdown(period);
  const { balances } = computeAccountBalances();
  const totalCash = Object.values(balances).reduce((a, b) => a + b, 0);
  const p = db.profile;

  const revRowsHtml = Object.entries(pnl.revByCat).map(([k, v]) =>
    `<tr><td style="padding-left:24px;">${escapeHtml(k)}</td><td style="text-align:right; font-weight:600;">${formatRupiah(v)}</td></tr>`
  ).join('') || `<tr><td style="padding-left:24px; color:#64748b;">Belum ada pendapatan pada periode ini</td><td style="text-align:right;">Rp 0</td></tr>`;

  const opexRowsHtml = Object.entries(pnl.opexByCat).map(([k, v]) =>
    `<tr><td style="padding-left:24px;">${escapeHtml(k)}</td><td style="text-align:right; font-weight:600;">(${formatRupiah(v)})</td></tr>`
  ).join('') || `<tr><td style="padding-left:24px; color:#64748b;">Tidak ada beban operasional pada periode ini</td><td style="text-align:right;">Rp 0</td></tr>`;

  document.getElementById('pnlPaperArea').innerHTML = `
    <div class="paper-header">
      <div class="paper-brand">
        <div class="paper-logo">${escapeHtml((p.initials || 'FK').slice(0, 3))}</div>
        <div>
          <div style="font-size:1.18rem; font-weight:900; color:#0f172a;">${escapeHtml(p.name)}</div>
          <div style="font-size:0.78rem; color:#475569;">${escapeHtml(p.address)} • Telp/WA: ${escapeHtml(p.phone)}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="paper-doc-badge">LAPORAN LABA RUGI</div>
        <div style="font-size:0.82rem; font-weight:700; color:#334155;">${periodLabels[period] || period}</div>
        <div style="font-size:0.73rem; color:#64748b;">Berdasarkan ${pnl.txCount} transaksi jurnal</div>
      </div>
    </div>

    <table class="paper-table">
      <thead>
        <tr>
          <th>URAIAN AKUN KEUANGAN</th>
          <th style="text-align:right; width:200px;">JUMLAH (IDR)</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#f8fafc;"><td colspan="2" style="font-weight:800; color:#0f172a;">1. PENDAPATAN USAHA (REVENUE)</td></tr>
        ${revRowsHtml}
        <tr style="background:#ecfdf5;">
          <td style="font-weight:800; color:#065f46;">TOTAL PENDAPATAN KOTOR</td>
          <td style="text-align:right; font-weight:900; color:#065f46;">${formatRupiah(pnl.totalRev)}</td>
        </tr>

        <tr style="background:#f8fafc;"><td colspan="2" style="font-weight:800; color:#0f172a;">2. HARGA POKOK PENJUALAN (HPP)</td></tr>
        <tr>
          <td style="padding-left:24px;">HPP Bahan Baku & Pembelian Stok Supplier</td>
          <td style="text-align:right; font-weight:600; color:#b91c1c;">(${formatRupiah(pnl.totalHpp)})</td>
        </tr>
        <tr style="background:#eff6ff;">
          <td style="font-weight:800; color:#1e40af;">LABA KOTOR (GROSS PROFIT)</td>
          <td style="text-align:right; font-weight:900; color:#1e40af;">${formatRupiah(pnl.grossProfit)}</td>
        </tr>

        <tr style="background:#f8fafc;"><td colspan="2" style="font-weight:800; color:#0f172a;">3. BEBAN OPERASIONAL USAHA (OPEX)</td></tr>
        ${opexRowsHtml}
        <tr>
          <td style="font-weight:800; color:#991b1b;">TOTAL BEBAN OPERASIONAL</td>
          <td style="text-align:right; font-weight:800; color:#991b1b;">(${formatRupiah(pnl.totalOpex)})</td>
        </tr>
      </tbody>
    </table>

    <div class="paper-summary-total" style="font-size:1.08rem; padding:14px 16px;">
      <span>LABA BERSIH USAHA (NET PROFIT • MARGIN ${pnl.netMargin}%)</span>
      <span>${formatRupiah(pnl.netProfit)}</span>
    </div>

    <div style="margin-top:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px;">
      <div style="font-size:0.8rem; font-weight:800; color:#0f172a; margin-bottom:8px;">LAMPIRAN POSISI SALDO KAS & REKENING BANK SAAT INI (TOTAL: ${formatRupiah(totalCash)})</div>
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; font-size:0.78rem;">
        ${ACCOUNTS_META.map(a => `
          <div style="background:#fff; padding:8px 10px; border-radius:8px; border:1px solid #cbd5e1;">
            <div style="color:#64748b; font-weight:700;">${a.name}</div>
            <div style="font-weight:800; color:#0f172a; margin-top:2px;">${formatRupiah(balances[a.id])}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; margin-top:32px; font-size:0.82rem; color:#334155;">
      <div>
        <div>Dicetak otomatis melalui Sistem <strong>FinKas UMKM Pro</strong></div>
        <div style="color:#64748b; font-size:0.75rem;">Tanggal Cetak: ${new Date().toISOString().slice(0, 10)}</div>
      </div>
      <div style="text-align:center;">
        <div>${escapeHtml(p.city)}, ${new Date().toISOString().slice(0, 10)}</div>
        <div style="font-weight:700; color:#0f172a;">Pemilik Usaha / Penanggung Jawab,</div>
        <div style="height:56px;"></div>
        <div style="font-weight:800; color:#0f172a; border-top:1px solid #0f172a; padding-top:4px; min-width:190px;">
          ${escapeHtml(p.owner)}
        </div>
      </div>
    </div>
  `;
}

/* ============================================================================
 * PROFILE SETTINGS, CSV EXPORT & JSON BACKUP/RESTORE
 * ============================================================================ */
function openProfileModal() {
  const p = db.profile;
  document.getElementById('bizNameInput').value = p.name || '';
  document.getElementById('bizInitialsInput').value = p.initials || 'FK';
  document.getElementById('bizTaglineInput').value = p.tagline || '';
  document.getElementById('bizOwnerInput').value = p.owner || '';
  document.getElementById('bizPhoneInput').value = p.phone || '';
  document.getElementById('bizCityInput').value = p.city || '';
  document.getElementById('bizAddrInput').value = p.address || '';
  document.getElementById('bizBankInfoInput').value = p.bankInfo || '';
  openModal('profileModal');
}

function saveBusinessProfile() {
  db.profile = {
    name: document.getElementById('bizNameInput').value.trim() || 'Usaha Mandiri',
    initials: (document.getElementById('bizInitialsInput').value.trim() || 'UM').toUpperCase(),
    tagline: document.getElementById('bizTaglineInput').value.trim(),
    owner: document.getElementById('bizOwnerInput').value.trim() || 'Pemilik Usaha',
    phone: document.getElementById('bizPhoneInput').value.trim(),
    city: document.getElementById('bizCityInput').value.trim() || 'Jakarta',
    address: document.getElementById('bizAddrInput').value.trim(),
    bankInfo: document.getElementById('bizBankInfoInput').value.trim()
  };
  persistDatabase();
  closeModal('profileModal');
  refreshAllViews();
  showToast('🏢 Identitas Usaha berhasil diperbarui!');
}

function downloadBlobFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function exportJournalCsv() {
  const rows = getFilteredTransactions();
  const header = ['Tanggal', 'No Referensi', 'Tipe', 'Kategori Akun', 'Rekening', 'Nominal_IDR', 'Deskripsi'];
  const lines = [header.join(',')];
  for (const r of rows) {
    const safeDesc = `"${String(r.desc || '').replace(/"/g, '""')}"`;
    const safeCat = `"${String(r.category || '').replace(/"/g, '""')}"`;
    lines.push([r.date, r.ref, r.type, safeCat, r.account, r.amount, safeDesc].join(','));
  }
  downloadBlobFile(`Jurnal_Keuangan_${new Date().toISOString().slice(0, 10)}.csv`, '\uFEFF' + lines.join('\n'), 'text/csv;charset=utf-8');
  showToast('📥 File CSV/Excel Jurnal berhasil diunduh!');
}

function exportPnlCsv() {
  const period = document.getElementById('pnlMonthFilter')?.value || 'ALL';
  const pnl = computePnlBreakdown(period);
  const lines = [
    'Komponen Laporan Laba Rugi,Nominal_IDR',
    `Total Pendapatan Usaha,${pnl.totalRev}`,
    `Harga Pokok Penjualan (HPP),-${pnl.totalHpp}`,
    `Laba Kotor (Gross Profit),${pnl.grossProfit}`,
    `Total Beban Operasional,-${pnl.totalOpex}`,
    `Laba Bersih (Net Profit),${pnl.netProfit}`,
    `Margin Laba Bersih (%),${pnl.netMargin}%`
  ];
  downloadBlobFile(`Laporan_Laba_Rugi_${period}.csv`, '\uFEFF' + lines.join('\n'), 'text/csv;charset=utf-8');
  showToast('📥 Laporan Laba Rugi (.CSV) berhasil diunduh!');
}

function backupJson() {
  const content = JSON.stringify(db, null, 2);
  downloadBlobFile(`Backup_FinKas_UMKM_${new Date().toISOString().slice(0, 10)}.json`, content, 'application/json');
  showToast('💾 File Backup Database (.JSON) berhasil disimpan!');
}

function restoreJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(String(e.target.result || ''));
      if (!parsed || !Array.isArray(parsed.transactions)) {
        throw new Error('Format file backup tidak sesuai');
      }
      db = parsed;
      persistDatabase();
      refreshAllViews();
      showToast('✅ Database berhasil di-restore dari file JSON!');
    } catch (err) {
      alert('Gagal membaca file backup JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function refreshAllViews() {
  renderBrandIdentity();
  renderDashboard();
  renderJournalTable();
  renderSavedInvoicesTable();
  updateInvoicePreview();
  renderDebtsTable();
  renderProfitLossReport();
}

window.addEventListener('DOMContentLoaded', () => {
  loadDatabase();
  if (db.invoices && db.invoices.length > 0) {
    loadInvoiceIntoBuilder(db.invoices[0]);
  } else {
    newInvoiceForm();
  }
  refreshAllViews();
});
