import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import UserSettings from '../components/settings/UserSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';

function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <UserSettings />;
      case 1:
        return <NotificationSettings />;
      case 2:
        return <SecuritySettings />;
      case 3:
        return <IntegrationSettings />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ mt: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="User Profile" />
          <Tab label="Notifications" />
          <Tab label="Security" />
          <Tab label="Integrations" />
        </Tabs>
        <Divider />
        <Box sx={{ p: 3 }}>
          {renderTabContent()}
        </Box>
      </Card>
    </Box>
  );
}

export default Settings;