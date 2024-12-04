import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Upload, Download, History, Delete } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentApi } from '../services/api';
import { format } from 'date-fns';

function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState({ title: '', category: '', description: '' });
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: documentApi.getAll
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, metadata }) => documentApi.upload(file, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries(['documents']);
      setUploadDialogOpen(false);
      setSelectedFile(null);
      setMetadata({ title: '', category: '', description: '' });
    }
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setMetadata(prev => ({ ...prev, title: file.name }));
  };

  const handleUpload = () => {
    if (selectedFile && metadata.title) {
      uploadMutation.mutate({ file: selectedFile, metadata });
    }
  };

  const filteredDocuments = documents?.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (documentId) => {
    try {
      const response = await documentApi.download(documentId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf'); // You might want to use the actual filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Document Management</Typography>
        <Button
          variant="contained"
          startIcon={<Upload />}
          onClick={() => setUploadDialogOpen(true)}
        >
          Upload Document
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Documents"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <List>
              {filteredDocuments?.map((document) => (
                <ListItem key={document.id}>
                  <ListItemText
                    primary={document.title}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {document.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={document.category}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={`Version ${document.version}`}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={format(new Date(document.updatedAt), 'MMM d, yyyy')}
                            size="small"
                          />
                        </Box>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={() => handleDownload(document.id)}
                      sx={{ mr: 1 }}
                    >
                      <Download />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="history"
                      sx={{ mr: 1 }}
                    >
                      <History />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <input
              type="file"
              onChange={handleFileSelect}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              fullWidth
              label="Title"
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Category"
              value={metadata.category}
              onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || !metadata.title}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Documents;