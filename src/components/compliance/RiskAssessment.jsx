import { Card, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { complianceApi } from '../../services/api';

function RiskAssessment() {
  const { data: risks } = useQuery({
    queryKey: ['risks'],
    queryFn: () => complianceApi.getRisks()
  });

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Risk Assessment
      </Typography>
      <List>
        {risks?.map((risk) => (
          <ListItem key={risk.id}>
            <ListItemText
              primary={risk.area}
              secondary={risk.description}
            />
            <Chip
              label={risk.level}
              color={getRiskColor(risk.level)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default RiskAssessment;