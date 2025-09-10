import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FileDownload,
  FileUpload,
} from '@mui/icons-material';
import { StockItem } from '../../types';

const StockManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: '1',
      name: 'Stainless Steel Pans Set',
      category: 'Cookware',
      quantity: 45,
      unitPrice: 89.99,
      totalValue: 4049.55,
      lowStockThreshold: 10,
      isLowStock: false,
      sku: 'KP-001',
    },
    {
      id: '2',
      name: 'Kitchen Knives Set',
      category: 'Cutlery',
      quantity: 5,
      unitPrice: 129.99,
      totalValue: 649.95,
      lowStockThreshold: 10,
      isLowStock: true,
      sku: 'KP-002',
    },
    {
      id: '3',
      name: 'Food Processor',
      category: 'Appliances',
      quantity: 12,
      unitPrice: 199.99,
      totalValue: 2399.88,
      lowStockThreshold: 5,
      isLowStock: false,
      sku: 'KP-003',
    },
    {
      id: '4',
      name: 'Cutting Boards Set',
      category: 'Utensils',
      quantity: 8,
      unitPrice: 34.99,
      totalValue: 279.92,
      lowStockThreshold: 15,
      isLowStock: true,
      sku: 'KP-004',
    },
    {
      id: '5',
      name: 'Storage Containers',
      category: 'Storage',
      quantity: 25,
      unitPrice: 24.99,
      totalValue: 624.75,
      lowStockThreshold: 20,
      isLowStock: false,
      sku: 'KP-005',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    lowStockThreshold: 10,
    sku: '',
  });

  const handleOpen = (item?: StockItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lowStockThreshold: item.lowStockThreshold,
        sku: item.sku || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: '',
        quantity: 0,
        unitPrice: 0,
        lowStockThreshold: 10,
        sku: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    const totalValue = formData.quantity * formData.unitPrice;
    const isLowStock = formData.quantity <= formData.lowStockThreshold;

    if (editingItem) {
      setStockItems(items =>
        items.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                ...formData,
                totalValue,
                isLowStock,
              }
            : item
        )
      );
    } else {
      const newItem: StockItem = {
        id: Date.now().toString(),
        ...formData,
        totalValue,
        isLowStock,
      };
      setStockItems([...stockItems, newItem]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setStockItems(items => items.filter(item => item.id !== id));
  };

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Stock Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FileUpload />}
            sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
          >
            Import
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{ backgroundColor: '#4CAF50' }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#757575' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="Utensils">Utensils</MenuItem>
                  <MenuItem value="Appliances">Appliances</MenuItem>
                  <MenuItem value="Cookware">Cookware</MenuItem>
                  <MenuItem value="Cutlery">Cutlery</MenuItem>
                  <MenuItem value="Storage">Storage</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Stock Status</InputLabel>
                <Select label="Stock Status">
                  <MenuItem value="">All Items</MenuItem>
                  <MenuItem value="low">Low Stock</MenuItem>
                  <MenuItem value="normal">Normal Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell align="right">${item.totalValue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.isLowStock ? 'Low Stock' : 'In Stock'}
                        color={item.isLowStock ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpen(item)}
                        sx={{ color: '#4CAF50' }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Stock Item' : 'Add New Stock Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="Utensils">Utensils</MenuItem>
                  <MenuItem value="Appliances">Appliances</MenuItem>
                  <MenuItem value="Cookware">Cookware</MenuItem>
                  <MenuItem value="Cutlery">Cutlery</MenuItem>
                  <MenuItem value="Storage">Storage</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: '#4CAF50' }}
          >
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockManagement;