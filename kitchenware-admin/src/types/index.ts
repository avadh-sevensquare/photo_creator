export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Stock Manager' | 'Cashier' | 'Delivery';
  avatar?: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: 'Utensils' | 'Appliances' | 'Cookware' | 'Cutlery' | 'Storage' | 'Other';
  quantity: number;
  unitPrice: number;
  totalValue: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  description?: string;
  sku?: string;
}

export interface Bill {
  id: string;
  customerName: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  date: Date;
  status: 'Paid' | 'Pending' | 'Cancelled';
}

export interface BillItem {
  stockItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  items: BillItem[];
  status: 'Pending' | 'Out for Delivery' | 'Delivered';
  deliveryDate: Date;
  assignedTo?: string;
  address: string;
  phone: string;
}

export interface DashboardStats {
  totalStockItems: number;
  lowStockAlerts: number;
  pendingDeliveries: number;
  todaySales: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}