import { Card, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../../services/api';

function ReportMetrics() {
  const { data: metrics } = useQuery({
    queryKey: ['reportMetrics'],
    queryFn: () => reportApi.getMetrics()
  });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Report Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: 300 }}>
            <BarChart
              width={800}
              height={300}
              data={metrics?.reportsByType}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1976d2" name="Reports Generated" />
            </BarChart>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ReportMetrics;