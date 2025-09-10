import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  Assessment,
  FileDownload,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('sales');
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 24 },
    { name: 'Feb', sales: 3000, orders: 13 },
    { name: 'Mar', sales: 5000, orders: 28 },
    { name: 'Apr', sales: 4500, orders: 22 },
    { name: 'May', sales: 6000, orders: 35 },
    { name: 'Jun', sales: 5500, orders: 31 },
  ];

  const stockUsageData = [
    { name: 'Utensils', value: 35, color: '#4CAF50' },
    { name: 'Appliances', value: 25, color: '#FF9800' },
    { name: 'Cookware', value: 20, color: '#2196F3' },
    { name: 'Cutlery', value: 15, color: '#9C27B0' },
    { name: 'Storage', value: 5, color: '#F44336' },
  ];

  const topSellingItems = [
    { name: 'Stainless Steel Pans Set', sales: 45, revenue: 4049.55 },
    { name: 'Kitchen Knives Set', sales: 32, revenue: 4159.68 },
    { name: 'Food Processor', sales: 28, revenue: 5599.72 },
    { name: 'Cutting Boards Set', sales: 25, revenue: 874.75 },
    { name: 'Storage Containers', sales: 22, revenue: 549.78 },
  ];

  const lowStockReport = [
    { name: 'Kitchen Knives Set', current: 5, threshold: 10, category: 'Cutlery' },
    { name: 'Cutting Boards', current: 8, threshold: 15, category: 'Utensils' },
    { name: 'Measuring Cups', current: 3, threshold: 12, category: 'Utensils' },
    { name: 'Spatulas', current: 7, threshold: 20, category: 'Utensils' },
  ];

  const COLORS = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336'];

  const handleExportReport = () => {
    // In a real app, this would generate and download the report
    console.log('Exporting report:', reportType, timeRange);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Reports & Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              label="Report Type"
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="sales">Sales Report</MenuItem>
              <MenuItem value="stock">Stock Report</MenuItem>
              <MenuItem value="delivery">Delivery Report</MenuItem>
              <MenuItem value="financial">Financial Report</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExportReport}
            sx={{ backgroundColor: '#4CAF50' }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Sales
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    $28,000
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                      +12% from last month
                    </Typography>
                  </Box>
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
                  <Assessment sx={{ color: 'white' }} />
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
                    Total Orders
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#2196F3' }}>
                    153
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                      +8% from last month
                    </Typography>
                  </Box>
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
                  <Assessment sx={{ color: 'white' }} />
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
                    Average Order Value
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#FF9800' }}>
                    $183
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                      +5% from last month
                    </Typography>
                  </Box>
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
                  <Assessment sx={{ color: 'white' }} />
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
                    Low Stock Items
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#F44336' }}>
                    12
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingDown sx={{ color: '#F44336', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#F44336' }}>
                      -3 from last week
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#F44336',
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Assessment sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    name="Sales ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#2196F3"
                    strokeWidth={2}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Stock Usage by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stockUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stockUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Top Selling Items
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Sales</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSellingItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{item.sales}</TableCell>
                        <TableCell align="right">${item.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Low Stock Alert
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Current</TableCell>
                      <TableCell align="right">Threshold</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lowStockReport.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell align="right">{item.current}</TableCell>
                        <TableCell align="right">{item.threshold}</TableCell>
                        <TableCell>
                          <Chip
                            label="Low Stock"
                            color="warning"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;