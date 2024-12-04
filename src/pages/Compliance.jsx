import { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Grid, 
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { complianceApi } from '../services/api';
import ComplianceChecklist from '../components/compliance/ComplianceChecklist';
import RiskAssessment from '../components/compliance/RiskAssessment';
import ComplianceMetrics from '../components/compliance/ComplianceMetrics';

function Compliance() {
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [checklistOpen, setChecklistOpen] = useState(false);

  const { data: complianceStatus } = useQuery({
    queryKey: ['complianceStatus'],
    queryFn: complianceApi.getStatus
  });

  const handleOpenChecklist = (regulation) => {
    setSelectedRegulation(regulation);
    setChecklistOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Compliance Status
            </Typography>
            <List>
              {complianceStatus?.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenChecklist(item)}
                    >
                      View Checklist
                    </Button>
                  }
                >
                  <ListItemText
                    primary={item.regulation}
                    secondary={item.lastUpdated}
                  />
                  <Chip
                    label={item.status}
                    color={item.status === 'Compliant' ? 'success' : 'warning'}
                    sx={{ mr: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <RiskAssessment />
        </Grid>

        <Grid item xs={12}>
          <ComplianceMetrics />
        </Grid>
      </Grid>

      <Dialog
        open={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Compliance Checklist - {selectedRegulation?.regulation}
        </DialogTitle>
        <DialogContent>
          {selectedRegulation && (
            <ComplianceChecklist regulationId={selectedRegulation.id} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChecklistOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Compliance;