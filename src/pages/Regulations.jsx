import { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { regulationApi } from '../services/api';

function Regulations() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: regulations, isLoading } = useQuery({
    queryKey: ['regulations'],
    queryFn: regulationApi.getAll
  });

  const filteredRegulations = regulations?.filter(reg => 
    reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">FAR Regulations</Typography>
        <Button
          variant="contained"
          startIcon={<PlusCircle />}
          onClick={() => {/* Handle add */}}
        >
          Add Regulation
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Regulations"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Card>
        <List>
          {filteredRegulations?.map((regulation) => (
            <ListItem key={regulation.id}>
              <ListItemText
                primary={regulation.title}
                secondary={regulation.description}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <Trash />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}

export default Regulations;