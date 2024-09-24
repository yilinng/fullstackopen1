import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddForm from './AddForm';
import { Diagnosis } from '../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: string) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

export default function AddDiagnosisCode({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new Diagnosis</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
        <AddForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} error={error} />
    </DialogContent>
  </Dialog>
  )
}
