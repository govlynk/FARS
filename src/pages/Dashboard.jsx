import { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Dashboard() {
  const { data: complianceStats } = useQuery({
    queryKey: ['complianceStats'],
    queryFn: async () => {
      const response = await axios.get('/api/compliance/stats');
      return response.data;
    }
  });

  const { data: recentActivities } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      const response = await axios.get('/api/activities/recent');
      return response.data;
    }
  });

  return (
    <div className="dashboard">
      <Typography variant="h4" gutterBottom>
        Compliance Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h6">Compliance Overview</Typography>
            <BarChart width={500} height={300} data={complianceStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="compliant" fill="#4caf50" />
              <Bar dataKey="nonCompliant" fill="#f44336" />
            </BarChart>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h6">Recent Activities</Typography>
            <div className="activities-list">
              {recentActivities?.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <Typography variant="body1">{activity.description}</Typography>
                  <Typography variant="caption">{activity.timestamp}</Typography>
                </div>
              ))}
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;