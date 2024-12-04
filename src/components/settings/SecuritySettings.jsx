import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Alert
} from '@mui/material';

function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password update
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Password Settings
      </Typography>

      <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>
        Security Options
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />
          }
          label="Two-Factor Authentication"
        />
        <FormControlLabel
          control={
            <Switch
              checked={sessionTimeout}
              onChange={() => setSessionTimeout(!sessionTimeout)}
            />
          }
          label="Auto Session Timeout"
        />
      </FormGroup>

      {twoFactor && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Two-factor authentication adds an extra layer of security to your account.
          You'll need to verify your identity using your phone when signing in.
        </Alert>
      )}
    </Box>
  );
}

export default SecuritySettings;