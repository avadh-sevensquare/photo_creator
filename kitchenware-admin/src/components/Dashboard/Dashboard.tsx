import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  Inventory,
  Warning,
  LocalShipping,
  AttachMoney,
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
} from 'recharts';
import StatsCard from './StatsCard';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const inventoryTrendData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
  ];

  const salesVsStockData = [
    { name: 'Utensils', sales: 4000, stock: 2400 },
    { name: 'Appliances', sales: 3000, stock: 1398 },
    { name: 'Cookware', sales: 2000, stock: 9800 },
    { name: 'Cutlery', sales: 2780, stock: 3908 },
    { name: 'Storage', sales: 1890, stock: 4800 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Stock Items"
            value="1,234"
            icon={<Inventory sx={{ color: 'white' }} />}
            color="#4CAF50"
            trend={{ value: 12, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Low Stock Alerts"
            value="23"
            icon={<Warning sx={{ color: 'white' }} />}
            color="#FF9800"
            trend={{ value: 5, isPositive: false }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Pending Deliveries"
            value="8"
            icon={<LocalShipping sx={{ color: 'white' }} />}
            color="#2196F3"
            trend={{ value: 2, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Today's Sales"
            value="$2,450"
            icon={<AttachMoney sx={{ color: 'white' }} />}
            color="#9C27B0"
            trend={{ value: 8, isPositive: true }}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Inventory Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inventoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    name="Stock Items"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Sales vs Stock
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesVsStockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#4CAF50" name="Sales ($)" />
                  <Bar dataKey="stock" fill="#FF9800" name="Stock Value ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Stock Updates
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { item: 'Stainless Steel Pans', action: 'Added 50 units', time: '2 hours ago' },
                  { item: 'Kitchen Knives Set', action: 'Low stock alert', time: '4 hours ago' },
                  { item: 'Food Storage Containers', action: 'Updated price', time: '6 hours ago' },
                  { item: 'Coffee Maker', action: 'Added 25 units', time: '8 hours ago' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      backgroundColor: '#F5F5F5',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {activity.item}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.action}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Low Stock Items
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { item: 'Kitchen Knives Set', stock: 5, threshold: 10 },
                  { item: 'Cutting Boards', stock: 8, threshold: 15 },
                  { item: 'Measuring Cups', stock: 3, threshold: 12 },
                  { item: 'Spatulas', stock: 7, threshold: 20 },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      backgroundColor: '#FFF3E0',
                      borderRadius: 1,
                      border: '1px solid #FF9800',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.item}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Threshold: {item.threshold}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FF9800',
                        fontWeight: 600,
                        backgroundColor: '#FFE0B2',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {item.stock} left
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;