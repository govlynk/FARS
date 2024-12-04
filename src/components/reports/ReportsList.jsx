import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Typography
} from '@mui/material';
import { Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

function ReportsList({ reports = [] }) {
  const handleDownload = async (reportId) => {
    try {
      const response = await reportApi.download(reportId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Card>
      <List>
        {reports.map((report) => (
          <ListItem key={report.id}>
            <ListItemText
              primary={report.title}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {report.description}
                  </Typography>
                  <Chip
                    label={report.type}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                  />
                  <Chip
                    label={format(new Date(report.createdAt), 'MMM d, yyyy')}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={report.format.toUpperCase()}
                    size="small"
                  />
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="preview"
                sx={{ mr: 1 }}
              >
                <Eye />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="download"
                onClick={() => handleDownload(report.id)}
              >
                <Download />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default ReportsList;