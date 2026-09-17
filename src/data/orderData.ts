import { BuyerOrder } from '../types';

export const INITIAL_ORDERS: BuyerOrder[] = [
  {
    id: 'ORD-HERO-9090-8841',
    buyerName: 'Dra. Hj. Nurul Hidayati',
    linkedEmail: 'nurul.hidayati@guru.sd.belajar.id',
    whatsappNumber: '081234567890',
    schoolName: 'SDN Percobaan 1 Malang',
    packageType: 'Paket Lengkap 10 Modul Kreasikertas Studio Pro',
    amount: 149000,
    paymentMethod: 'QRIS / Transfer Bank',
    notes: 'Mohon aktivasi akun untuk 5 guru kelas di sekolah kami.',
    status: 'Dikonfirmasi',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    accessCode: 'HERO-9090-PRO-MALANG1',
  },
  {
    id: 'ORD-HERO-9090-7729',
    buyerName: 'Ahmad Fauzi, S.Pd.',
    linkedEmail: 'fauzi.guru@gmail.com',
    whatsappNumber: '085712349090',
    schoolName: 'SDIT Al-Hikmah Surabaya',
    packageType: 'Akses 3000+ Master Prompt Premium Guru',
    amount: 99000,
    paymentMethod: 'Transfer BCA',
    notes: 'Fokus materi STEM dan Papercraft 3D untuk siswa kelas 4 dan 5.',
    status: 'Selesai',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    accessCode: 'HERO-9090-STEM-SURABAYA',
  },
  {
    id: 'ORD-HERO-9090-6612',
    buyerName: 'Siti Rahmawati, M.Pd.',
    linkedEmail: 'siti.rahmawati@sdm16surabaya.sch.id',
    whatsappNumber: '087890901234',
    schoolName: 'SD Muhammadiyah 16 Surabaya',
    packageType: 'Paket Bundel LKPD & Worksheet Essay SD',
    amount: 129000,
    paymentMethod: 'QRIS',
    notes: 'Terima kasih Pak Eko, salam dari rekan guru SDM 16.',
    status: 'Dikonfirmasi',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    accessCode: 'HERO-9090-SDM16-SBY',
  },
];

const LOCAL_STORAGE_KEY = 'kreasikertas_buyer_orders';

export function getStoredOrders(): BuyerOrder[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading stored orders:', err);
  }
  // Initialize with initial orders
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
}

export function saveNewOrder(order: BuyerOrder): BuyerOrder[] {
  const current = getStoredOrders();
  const updated = [order, ...current];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving new order:', err);
  }
  return updated;
}

export function updateOrderStatus(orderId: string, newStatus: 'Pending' | 'Dikonfirmasi' | 'Selesai'): BuyerOrder[] {
  const current = getStoredOrders();
  const updated = current.map((item) =>
    item.id === orderId ? { ...item, status: newStatus } : item
  );
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating order status:', err);
  }
  return updated;
}

export function deleteOrder(orderId: string): BuyerOrder[] {
  const current = getStoredOrders();
  const updated = current.filter((item) => item.id !== orderId);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting order:', err);
  }
  return updated;
}
