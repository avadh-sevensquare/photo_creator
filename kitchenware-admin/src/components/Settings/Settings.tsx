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
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Save,
  PhotoCamera,
  Business,
  Receipt,
  Inventory,
  Notifications,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [companySettings, setCompanySettings] = useState({
    name: 'Kitchenware Store',
    email: 'info@kitchenware.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    logo: '',
  });

  const [taxSettings, setTaxSettings] = useState({
    taxRate: 10,
    taxName: 'Sales Tax',
    includeTaxInPrice: false,
  });

  const [stockSettings, setStockSettings] = useState({
    lowStockThreshold: 10,
    autoReorder: true,
    reorderQuantity: 50,
    emailAlerts: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    newOrderNotifications: true,
    deliveryUpdates: true,
    salesReports: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSaveCompany = () => {
    console.log('Saving company settings:', companySettings);
    // In a real app, this would save to backend
  };

  const handleSaveTax = () => {
    console.log('Saving tax settings:', taxSettings);
  };

  const handleSaveStock = () => {
    console.log('Saving stock settings:', stockSettings);
  };

  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
  };

  const tabs = [
    { id: 'company', label: 'Company Info', icon: <Business /> },
    { id: 'tax', label: 'Tax & Billing', icon: <Receipt /> },
    { id: 'stock', label: 'Stock Settings', icon: <Inventory /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Settings
              </Typography>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  fullWidth
                  variant={activeTab === tab.id ? 'contained' : 'text'}
                  startIcon={tab.icon}
                  onClick={() => setActiveTab(tab.id)}
                  sx={{
                    justifyContent: 'flex-start',
                    mb: 1,
                    backgroundColor: activeTab === tab.id ? '#4CAF50' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#212121',
                    '&:hover': {
                      backgroundColor: activeTab === tab.id ? '#388E3C' : '#F5F5F5',
                    },
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          {activeTab === 'company' && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Company Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          backgroundColor: '#4CAF50',
                          fontSize: '2rem',
                          mb: 2,
                        }}
                      >
                        {companySettings.name.charAt(0)}
                      </Avatar>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                      </IconButton>
                      <Typography variant="caption" color="text.secondary">
                        Upload Company Logo
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveCompany}
                  sx={{ backgroundColor: '#4CAF50' }}
                >
                  Save Company Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'tax' && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Tax & Billing Settings
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tax Rate (%)"
                      type="number"
                      value={taxSettings.taxRate}
                      onChange={(e) => setTaxSettings({ ...taxSettings, taxRate: parseFloat(e.target.value) || 0 })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Tax Name"
                      value={taxSettings.taxName}
                      onChange={(e) => setTaxSettings({ ...taxSettings, taxName: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={taxSettings.includeTaxInPrice}
                          onChange={(e) => setTaxSettings({ ...taxSettings, includeTaxInPrice: e.target.checked })}
                        />
                      }
                      label="Include tax in displayed prices"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: '#F5F5F5' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          Tax Preview
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Subtotal:</Typography>
                          <Typography>$100.00</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>{taxSettings.taxName} ({taxSettings.taxRate}%):</Typography>
                          <Typography>${(100 * taxSettings.taxRate / 100).toFixed(2)}</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Total:</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                            ${(100 + (100 * taxSettings.taxRate / 100)).toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveTax}
                  sx={{ backgroundColor: '#4CAF50' }}
                >
                  Save Tax Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'stock' && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Stock Management Settings
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Low Stock Threshold"
                      type="number"
                      value={stockSettings.lowStockThreshold}
                      onChange={(e) => setStockSettings({ ...stockSettings, lowStockThreshold: parseInt(e.target.value) || 0 })}
                      sx={{ mb: 2 }}
                      helperText="Items below this quantity will trigger low stock alerts"
                    />
                    <TextField
                      fullWidth
                      label="Auto Reorder Quantity"
                      type="number"
                      value={stockSettings.reorderQuantity}
                      onChange={(e) => setStockSettings({ ...stockSettings, reorderQuantity: parseInt(e.target.value) || 0 })}
                      sx={{ mb: 2 }}
                      helperText="Default quantity to reorder when stock is low"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={stockSettings.autoReorder}
                          onChange={(e) => setStockSettings({ ...stockSettings, autoReorder: e.target.checked })}
                        />
                      }
                      label="Enable auto reorder"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={stockSettings.emailAlerts}
                          onChange={(e) => setStockSettings({ ...stockSettings, emailAlerts: e.target.checked })}
                        />
                      }
                      label="Send email alerts for low stock"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: '#F5F5F5' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          Current Settings Summary
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">Low Stock Threshold:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {stockSettings.lowStockThreshold} units
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">Auto Reorder:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {stockSettings.autoReorder ? 'Enabled' : 'Disabled'}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">Reorder Quantity:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {stockSettings.reorderQuantity} units
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Email Alerts:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {stockSettings.emailAlerts ? 'Enabled' : 'Disabled'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveStock}
                  sx={{ backgroundColor: '#4CAF50' }}
                >
                  Save Stock Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Notification Settings
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Alert Types
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.lowStockAlerts}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockAlerts: e.target.checked })}
                        />
                      }
                      label="Low stock alerts"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.newOrderNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, newOrderNotifications: e.target.checked })}
                        />
                      }
                      label="New order notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.deliveryUpdates}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, deliveryUpdates: e.target.checked })}
                        />
                      }
                      label="Delivery status updates"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.salesReports}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, salesReports: e.target.checked })}
                        />
                      }
                      label="Daily sales reports"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Delivery Methods
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                        />
                      }
                      label="Email notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                        />
                      }
                      label="SMS notifications"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveNotifications}
                  sx={{ backgroundColor: '#4CAF50' }}
                >
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;