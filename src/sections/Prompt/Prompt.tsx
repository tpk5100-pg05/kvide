import { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { PromptRef } from '@/sections/Prompt/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

function Prompt(props: unknown, ref: Ref<PromptRef>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [onSubmit, setOnSubmit] = useState<(value: string) => void>(
    () => () => console.log('onSubmit not set'),
  );
  const [onDismiss, setOnDismiss] = useState<() => void>(
    () => () => console.log('onDismiss not set'),
  );

  useImperativeHandle(ref, () => ({
    open: (message, defaultValue) => {
      setMessage(message);
      setValue(defaultValue || '');
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
    onSubmit: (listener) => {
      setOnSubmit(() => listener);
    },
    onDismiss: (listener) => {
      setOnDismiss(() => listener);
    },
  }));

  return (
    <Dialog open={open}>
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        <TextField value={value} onChange={(event) => setValue(event.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDismiss()}>Cancel</Button>
        <Button onClick={() => onSubmit(value)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(Prompt);
