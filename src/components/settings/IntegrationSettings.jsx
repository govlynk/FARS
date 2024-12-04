import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Alert
} from '@mui/material';

function IntegrationSettings() {
  const integrations = [
    {
      id: 'procurement',
      name: 'Procurement System',
      status: true,
      apiKey: '****-****-****-1234'
    },
    {
      id: 'document',
      name: 'Document Management',
      status: false,
      apiKey: ''
    },
    {
      id: 'audit',
      name: 'Audit System',
      status: true,
      apiKey: '****-****-****-5678'
    }
  ];

  const handleToggleIntegration = (id) => {
    // Handle integration toggle
  };

  const handleUpdateApiKey = (id, key) => {
    // Handle API key update
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        System Integrations
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Manage your integrations with external systems and services.
        API keys are required for secure communication.
      </Alert>

      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid item xs={12} key={integration.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1">
                      {integration.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={integration.status}
                          onChange={() => handleToggleIntegration(integration.id)}
                        />
                      }
                      label={integration.status ? 'Enabled' : 'Disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="API Key"
                      value={integration.apiKey}
                      onChange={(e) => handleUpdateApiKey(integration.id, e.target.value)}
                      type="password"
                      disabled={!integration.status}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary">
          Save Integration Settings
        </Button>
      </Box>
    </Box>
  );
}

export default IntegrationSettings;