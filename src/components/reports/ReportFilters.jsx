import {
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box
} from '@mui/material';

function ReportFilters({ filters, onFilterChange }) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={filters.endDate}
          onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl>
          <InputLabel>Report Type</InputLabel>
          <Select
            value={filters.type}
            label="Report Type"
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="compliance">Compliance</MenuItem>
            <MenuItem value="risk">Risk Assessment</MenuItem>
            <MenuItem value="audit">Audit Trail</MenuItem>
            <MenuItem value="metrics">Metrics</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Department</InputLabel>
          <Select
            value={filters.department}
            label="Department"
            onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
          >
            <MenuItem value="all">All Departments</MenuItem>
            <MenuItem value="procurement">Procurement</MenuItem>
            <MenuItem value="legal">Legal</MenuItem>
            <MenuItem value="operations">Operations</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
}

export default ReportFilters;