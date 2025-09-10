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
  TablePagination,
} from '@mui/material';
import {
  Edit,
  Print,
  Search,
  LocalShipping,
  Assignment,
} from '@mui/icons-material';
import { Delivery, BillItem } from '../../types';

const Deliveries: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  // Mock delivery data
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      items: [
        { stockItemId: '1', name: 'Stainless Steel Pans Set', quantity: 2, unitPrice: 89.99, total: 179.98 },
        { stockItemId: '2', name: 'Kitchen Knives Set', quantity: 1, unitPrice: 129.99, total: 129.99 },
      ],
      status: 'Pending',
      deliveryDate: new Date('2024-01-20'),
      assignedTo: 'Delivery Staff 1',
      address: '123 Main St, City, State 12345',
      phone: '+1 (555) 123-4567',
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      items: [
        { stockItemId: '3', name: 'Food Processor', quantity: 1, unitPrice: 199.99, total: 199.99 },
      ],
      status: 'Out for Delivery',
      deliveryDate: new Date('2024-01-19'),
      assignedTo: 'Delivery Staff 2',
      address: '456 Oak Ave, City, State 12345',
      phone: '+1 (555) 987-6543',
    },
    {
      id: '3',
      orderId: 'ORD-003',
      customerName: 'Mike Johnson',
      items: [
        { stockItemId: '4', name: 'Cutting Boards Set', quantity: 3, unitPrice: 34.99, total: 104.97 },
        { stockItemId: '5', name: 'Storage Containers', quantity: 2, unitPrice: 24.99, total: 49.98 },
      ],
      status: 'Delivered',
      deliveryDate: new Date('2024-01-18'),
      assignedTo: 'Delivery Staff 1',
      address: '789 Pine Rd, City, State 12345',
      phone: '+1 (555) 456-7890',
    },
  ]);

  const deliveryStaff = [
    'Delivery Staff 1',
    'Delivery Staff 2',
    'Delivery Staff 3',
  ];

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === deliveryId
        ? { ...delivery, status: newStatus as 'Pending' | 'Out for Delivery' | 'Delivered' }
        : delivery
    ));
  };

  const handleAssignDelivery = (deliveryId: string, staff: string) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === deliveryId
        ? { ...delivery, assignedTo: staff }
        : delivery
    ));
  };

  const handleViewDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setOpen(true);
  };

  const filteredDeliveries = deliveries.filter(delivery =>
    (delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || delivery.status === statusFilter)
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Out for Delivery':
        return 'info';
      case 'Delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Deliveries
        </Typography>
        <Button
          variant="contained"
          startIcon={<LocalShipping />}
          sx={{ backgroundColor: '#4CAF50' }}
        >
          New Delivery
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Pending Deliveries
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#FF9800' }}>
                    {deliveries.filter(d => d.status === 'Pending').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#FF9800',
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Assignment sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Out for Delivery
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#2196F3' }}>
                    {deliveries.filter(d => d.status === 'Out for Delivery').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#2196F3',
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocalShipping sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Delivered Today
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    {deliveries.filter(d => d.status === 'Delivered').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocalShipping sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Deliveries
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#9C27B0' }}>
                    {deliveries.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#9C27B0',
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocalShipping sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#757575' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Delivery Staff</InputLabel>
                <Select label="Delivery Staff">
                  <MenuItem value="">All Staff</MenuItem>
                  {deliveryStaff.map((staff) => (
                    <MenuItem key={staff} value={staff}>{staff}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Deliveries Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeliveries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((delivery) => (
                  <TableRow key={delivery.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {delivery.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {delivery.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {delivery.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {delivery.items.length} items
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total: ${delivery.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>{delivery.deliveryDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={delivery.assignedTo || ''}
                          onChange={(e) => handleAssignDelivery(delivery.id, e.target.value)}
                        >
                          <MenuItem value="">Unassigned</MenuItem>
                          {deliveryStaff.map((staff) => (
                            <MenuItem key={staff} value={staff}>{staff}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={delivery.status}
                          onChange={(e) => handleStatusUpdate(delivery.id, e.target.value)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(delivery)}
                        sx={{ color: '#4CAF50' }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: '#FF9800' }}
                      >
                        <Print />
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
          count={filteredDeliveries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Delivery Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Delivery Details - {selectedDelivery?.orderId}</DialogTitle>
        <DialogContent>
          {selectedDelivery && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Customer Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Name:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedDelivery.customerName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Phone:</Typography>
                  <Typography variant="body1">{selectedDelivery.phone}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Address:</Typography>
                  <Typography variant="body1">{selectedDelivery.address}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Delivery Date:</Typography>
                  <Typography variant="body1">{selectedDelivery.deliveryDate.toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Status:</Typography>
                  <Chip
                    label={selectedDelivery.status}
                    color={getStatusColor(selectedDelivery.status) as any}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Order Items
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedDelivery.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ${item.unitPrice.toFixed(2)} each
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    Total: ${selectedDelivery.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Print />}
            sx={{ backgroundColor: '#4CAF50' }}
          >
            Print Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Deliveries;