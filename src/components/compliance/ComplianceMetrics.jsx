import { Card, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { complianceApi } from '../../services/api';

function ComplianceMetrics() {
  const { data: metrics } = useQuery({
    queryKey: ['complianceMetrics'],
    queryFn: () => complianceApi.getMetrics()
  });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Compliance Metrics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BarChart width={500} height={300} data={metrics?.compliance || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="compliantItems" fill="#4caf50" name="Compliant" />
            <Bar dataKey="nonCompliantItems" fill="#f44336" name="Non-Compliant" />
          </BarChart>
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart width={500} height={300} data={metrics?.trend || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="complianceRate" stroke="#2196f3" name="Compliance Rate" />
          </LineChart>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ComplianceMetrics;