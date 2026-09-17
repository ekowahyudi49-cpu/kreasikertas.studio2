import React, { useState } from 'react';
import { BuyerOrder, PromptCategory } from '../types';
import {
  ShieldAlert,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  Trash2,
  Phone,
  Search,
  Download,
  LogOut,
  RefreshCw,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { updateOrderStatus, deleteOrder } from '../data/orderData';

interface AdminPanelViewProps {
  orders: BuyerOrder[];
  onRefreshOrders: () => void;
  onLogoutAdmin: () => void;
  onNavigate: (category: PromptCategory) => void;
  onShowToast: (msg: string) => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  orders,
  onRefreshOrders,
  onLogoutAdmin,
  onNavigate,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Dikonfirmasi' | 'Selesai'>('All');

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.linkedEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.schoolName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const confirmedCount = orders.filter((o) => o.status === 'Dikonfirmasi' || o.status === 'Selesai').length;

  const handleStatusChange = (orderId: string, newStatus: 'Pending' | 'Dikonfirmasi' | 'Selesai') => {
    updateOrderStatus(orderId, newStatus);
    onRefreshOrders();
    onShowToast(`Status order ${orderId} diperbarui menjadi: ${newStatus}`);
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(`Hapus order ${orderId} secara permanen?`)) {
      deleteOrder(orderId);
      onRefreshOrders();
      onShowToast(`Order ${orderId} berhasil dihapus.`);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Nomor Order', 'Nama Pembeli', 'Email Tertaut', 'WhatsApp', 'Sekolah', 'Paket', 'Nominal', 'Status', 'Tanggal'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.buyerName}"`,
      o.linkedEmail,
      o.whatsappNumber,
      `"${o.schoolName}"`,
      `"${o.packageType}"`,
      o.amount,
      o.status,
      o.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Order_Hero_Admin_909090_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Laporan CSV Order Hero berhasil diunduh!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#121f17] via-[#0e1813] to-[#090d0b] border border-emerald-500/40 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-300 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>ADMINISTRATOR PORTAL • ID: 909090</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Panel Manajemen <span className="text-emerald-400">Order Hero</span>
          </h1>
          <p className="text-xs text-slate-300">
            Kelola data pembeli ber-email tertaut, verifikasi pembayaran, dan aktivasi kode lisensi generator prompt.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="admin-export-csv-btn"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#142018] hover:bg-[#1a2c22] text-emerald-300 text-xs font-semibold border border-emerald-700/60 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>

          <button
            id="admin-logout-btn"
            onClick={onLogoutAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/60 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0e1612] border border-emerald-900/60 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Pesanan Masuk</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{orders.length}</div>
          <div className="text-[11px] text-emerald-400 font-medium">Pembeli Order Hero</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0e1612] border border-emerald-900/60 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Nilai Pesanan</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Total Akumulasi</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0e1612] border border-emerald-900/60 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Menunggu Konfirmasi</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">{pendingCount}</div>
          <div className="text-[11px] text-amber-400 font-medium">Perlu ditinjau</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0e1612] border border-emerald-900/60 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Dikonfirmasi / Selesai</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300">{confirmedCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium">Akses aktif</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0e1612] border border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, email tertaut, nomor order..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
          {(['All', 'Pending', 'Dikonfirmasi', 'Selesai'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#131d17] text-slate-300 hover:bg-emerald-950/40 border border-emerald-900/40'
              }`}
            >
              {st === 'All' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#0e1612] border border-emerald-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#121d16] text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-emerald-900/60">
              <tr>
                <th className="py-3 px-4">No. Order & Waktu</th>
                <th className="py-3 px-4">Pembeli (Email Tertaut)</th>
                <th className="py-3 px-4">Paket & Investasi</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Tidak ada data pesanan yang sesuai dengan filter atau pencarian.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const buyerWaUrl = `https://wa.me/${order.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Halo ${order.buyerName}, kami dari Admin KREASIKERTAS.STUDIO (ID: 909090) mengonfirmasi pesanan ${order.id} Anda.`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-emerald-950/20 transition">
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="font-mono font-bold text-emerald-400">
                          {order.id}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Kode: {order.accessCode}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        <div className="font-bold text-white text-sm">
                          {order.buyerName}
                        </div>
                        <div className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5">
                          <span className="text-emerald-400">✉</span> {order.linkedEmail}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          {order.schoolName}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        <div className="text-slate-200 font-medium max-w-xs line-clamp-1">
                          {order.packageType}
                        </div>
                        <div className="text-emerald-400 font-bold">
                          Rp {order.amount.toLocaleString('id-ID')}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Metode: {order.paymentMethod}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.status === 'Selesai'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                              : order.status === 'Dikonfirmasi'
                              ? 'bg-blue-950 text-blue-300 border border-blue-600'
                              : 'bg-amber-950 text-amber-300 border border-amber-600'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* WhatsApp Chat Button */}
                          <a
                            href={buyerWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat WhatsApp Pembeli"
                            className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 transition"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {/* Status Change Dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as any)
                            }
                            className="bg-[#131d17] border border-emerald-900/80 rounded-lg text-[11px] text-slate-200 px-2 py-1 focus:outline-none focus:border-emerald-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Dikonfirmasi">Konfirmasi</option>
                            <option value="Selesai">Selesai</option>
                          </select>

                          {/* Delete Order Button */}
                          <button
                            onClick={() => handleDelete(order.id)}
                            title="Hapus Order"
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
