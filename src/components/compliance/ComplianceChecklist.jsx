import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  TextField, 
  Button,
  Box 
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { complianceApi } from '../../services/api';

function ComplianceChecklist({ regulationId }) {
  const [notes, setNotes] = useState({});

  const { data: checklist } = useQuery({
    queryKey: ['checklist', regulationId],
    queryFn: () => complianceApi.getChecklist(regulationId)
  });

  const submitMutation = useMutation({
    mutationFn: (data) => complianceApi.submitChecklist(regulationId, data)
  });

  const handleSubmit = () => {
    submitMutation.mutate({
      checklistItems: checklist.map(item => ({
        id: item.id,
        completed: item.completed,
        notes: notes[item.id] || ''
      }))
    });
  };

  return (
    <Box>
      <List>
        {checklist?.map((item) => (
          <ListItem key={item.id}>
            <Checkbox
              checked={item.completed}
              onChange={(e) => {
                item.completed = e.target.checked;
              }}
            />
            <ListItemText
              primary={item.requirement}
              secondary={
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add notes..."
                  value={notes[item.id] || ''}
                  onChange={(e) => setNotes({
                    ...notes,
                    [item.id]: e.target.value
                  })}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                />
              }
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit Checklist
      </Button>
    </Box>
  );
}

export default ComplianceChecklist;