import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Download, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../services/api';
import ReportsList from '../components/reports/ReportsList';
import ReportFilters from '../components/reports/ReportFilters';
import ReportMetrics from '../components/reports/ReportMetrics';

function Reports() {
  const [filterParams, setFilterParams] = useState({
    startDate: '',
    endDate: '',
    type: 'all',
    department: 'all'
  });
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    type: 'compliance',
    format: 'pdf'
  });

  const { data: reports } = useQuery({
    queryKey: ['reports', filterParams],
    queryFn: () => reportApi.getAll(filterParams)
  });

  const handleGenerateReport = async () => {
    try {
      await reportApi.generate(reportConfig);
      setGenerateDialogOpen(false);
      setReportConfig({ title: '', type: 'compliance', format: 'pdf' });
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <Button
          variant="contained"
          startIcon={<FileText />}
          onClick={() => setGenerateDialogOpen(true)}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ReportFilters
            filters={filterParams}
            onFilterChange={setFilterParams}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <ReportMetrics />
          <Box sx={{ mt: 3 }}>
            <ReportsList reports={reports} />
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={generateDialogOpen}
        onClose={() => setGenerateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Report Title"
              value={reportConfig.title}
              onChange={(e) => setReportConfig({ ...reportConfig, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportConfig.type}
                label="Report Type"
                onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
              >
                <MenuItem value="compliance">Compliance Status</MenuItem>
                <MenuItem value="risk">Risk Assessment</MenuItem>
                <MenuItem value="audit">Audit Trail</MenuItem>
                <MenuItem value="metrics">Performance Metrics</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                value={reportConfig.format}
                label="Format"
                onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            disabled={!reportConfig.title || !reportConfig.type}
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Reports;