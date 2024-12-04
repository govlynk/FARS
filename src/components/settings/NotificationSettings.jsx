import { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    complianceAlerts: true,
    documentUpdates: true,
    regulationChanges: true,
    auditTrails: false
  });

  const [frequency, setFrequency] = useState('daily');

  const handleToggle = (name) => {
    setNotifications(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle notification settings update
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={() => handleToggle('email')}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.desktop}
                  onChange={() => handleToggle('desktop')}
                />
              }
              label="Desktop Notifications"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Notification Types
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.complianceAlerts}
                  onChange={() => handleToggle('complianceAlerts')}
                />
              }
              label="Compliance Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.documentUpdates}
                  onChange={() => handleToggle('documentUpdates')}
                />
              }
              label="Document Updates"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.regulationChanges}
                  onChange={() => handleToggle('regulationChanges')}
                />
              }
              label="Regulation Changes"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.auditTrails}
                  onChange={() => handleToggle('auditTrails')}
                />
              }
              label="Audit Trail Updates"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Notification Frequency</InputLabel>
            <Select
              value={frequency}
              label="Notification Frequency"
              onChange={(e) => setFrequency(e.target.value)}
            >
              <MenuItem value="realtime">Real-time</MenuItem>
              <MenuItem value="daily">Daily Digest</MenuItem>
              <MenuItem value="weekly">Weekly Summary</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Save Preferences
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NotificationSettings;