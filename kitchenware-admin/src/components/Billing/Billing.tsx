import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add,
  Delete,
  Print,
  Search,
  Receipt,
} from '@mui/icons-material';
import { Bill, BillItem, StockItem } from '../../types';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Mock stock items for product selection
  const stockItems: StockItem[] = [
    { id: '1', name: 'Stainless Steel Pans Set', category: 'Cookware', quantity: 45, unitPrice: 89.99, totalValue: 4049.55, lowStockThreshold: 10, isLowStock: false, sku: 'KP-001' },
    { id: '2', name: 'Kitchen Knives Set', category: 'Cutlery', quantity: 5, unitPrice: 129.99, totalValue: 649.95, lowStockThreshold: 10, isLowStock: true, sku: 'KP-002' },
    { id: '3', name: 'Food Processor', category: 'Appliances', quantity: 12, unitPrice: 199.99, totalValue: 2399.88, lowStockThreshold: 5, isLowStock: false, sku: 'KP-003' },
  ];

  const [currentBill, setCurrentBill] = useState<BillItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(0.1); // 10% tax

  // Mock billing history
  const [billingHistory] = useState<Bill[]>([
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        { stockItemId: '1', name: 'Stainless Steel Pans Set', quantity: 2, unitPrice: 89.99, total: 179.98 },
        { stockItemId: '2', name: 'Kitchen Knives Set', quantity: 1, unitPrice: 129.99, total: 129.99 },
      ],
      subtotal: 309.97,
      tax: 30.99,
      discount: 0,
      total: 340.96,
      date: new Date('2024-01-15'),
      status: 'Paid',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      items: [
        { stockItemId: '3', name: 'Food Processor', quantity: 1, unitPrice: 199.99, total: 199.99 },
      ],
      subtotal: 199.99,
      tax: 19.99,
      discount: 10,
      total: 209.98,
      date: new Date('2024-01-14'),
      status: 'Paid',
    },
  ]);

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const existingItemIndex = currentBill.findIndex(item => item.stockItemId === selectedProduct.id);
      
      if (existingItemIndex >= 0) {
        const updatedBill = [...currentBill];
        updatedBill[existingItemIndex].quantity += quantity;
        updatedBill[existingItemIndex].total = updatedBill[existingItemIndex].quantity * updatedBill[existingItemIndex].unitPrice;
        setCurrentBill(updatedBill);
      } else {
        const newItem: BillItem = {
          stockItemId: selectedProduct.id,
          name: selectedProduct.name,
          quantity,
          unitPrice: selectedProduct.unitPrice,
          total: quantity * selectedProduct.unitPrice,
        };
        setCurrentBill([...currentBill, newItem]);
      }
      setOpen(false);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  const handleRemoveItem = (stockItemId: string) => {
    setCurrentBill(currentBill.filter(item => item.stockItemId !== stockItemId));
  };

  const handleQuantityChange = (stockItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(stockItemId);
      return;
    }
    
    setCurrentBill(currentBill.map(item =>
      item.stockItemId === stockItemId
        ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice }
        : item
    ));
  };

  const calculateSubtotal = () => {
    return currentBill.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - discount;
  };

  const handleCreateBill = () => {
    if (currentBill.length === 0 || !customerName) return;

    const newBill: Bill = {
      id: Date.now().toString(),
      customerName,
      items: currentBill,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      discount,
      total: calculateTotal(),
      date: new Date(),
      status: 'Paid',
    };

    // In a real app, this would be saved to backend
    console.log('New bill created:', newBill);
    
    // Reset form
    setCurrentBill([]);
    setCustomerName('');
    setDiscount(0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Billing / Sales
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={activeTab === 'create' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('create')}
            sx={{ 
              backgroundColor: activeTab === 'create' ? '#4CAF50' : 'transparent',
              borderColor: '#4CAF50',
              color: activeTab === 'create' ? 'white' : '#4CAF50',
            }}
          >
            Create Bill
          </Button>
          <Button
            variant={activeTab === 'history' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('history')}
            sx={{ 
              backgroundColor: activeTab === 'history' ? '#4CAF50' : 'transparent',
              borderColor: '#4CAF50',
              color: activeTab === 'history' ? 'white' : '#4CAF50',
            }}
          >
            Billing History
          </Button>
        </Box>
      </Box>

      {activeTab === 'create' ? (
        <Grid container spacing={3}>
          {/* Product Selection */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Products
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                    sx={{ backgroundColor: '#4CAF50' }}
                  >
                    Add Product
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentBill.map((item) => (
                        <TableRow key={item.stockItemId}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell align="center">
                            <TextField
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.stockItemId, parseInt(e.target.value) || 0)}
                              size="small"
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                          <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.stockItemId)}
                              sx={{ color: '#FF9800' }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Bill Summary */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Bill Summary
                </Typography>

                <TextField
                  fullWidth
                  label="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${calculateSubtotal().toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax (10%):</Typography>
                  <Typography>${calculateTax().toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Discount:</Typography>
                  <Typography>-${discount.toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  label="Discount Amount"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Receipt />}
                  onClick={handleCreateBill}
                  disabled={currentBill.length === 0 || !customerName}
                  sx={{ backgroundColor: '#4CAF50', mb: 1 }}
                >
                  Create Bill
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Print />}
                  sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                >
                  Print Bill
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        /* Billing History */
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Billing History
              </Typography>
              <TextField
                placeholder="Search bills..."
                size="small"
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#757575' }} />,
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bill ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billingHistory.map((bill) => (
                    <TableRow key={bill.id} hover>
                      <TableCell>#{bill.id}</TableCell>
                      <TableCell>{bill.customerName}</TableCell>
                      <TableCell>{bill.date.toLocaleDateString()}</TableCell>
                      <TableCell>{bill.items.length} items</TableCell>
                      <TableCell align="right">${bill.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={bill.status}
                          color={bill.status === 'Paid' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" sx={{ color: '#4CAF50' }}>
                          <Print />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Product Selection Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Select Product</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SKU: {item.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setSelectedProduct(item)}
                        sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                      >
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedProduct && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Selected: {selectedProduct.name}
              </Typography>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                size="small"
                sx={{ width: 120 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            disabled={!selectedProduct}
            sx={{ backgroundColor: '#4CAF50' }}
          >
            Add to Bill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Billing;