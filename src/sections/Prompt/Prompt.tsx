import { forwardRef, Ref, useImperativeHandle, useState, KeyboardEvent } from 'react';
import { PromptRef } from '@/sections/Prompt/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

function Prompt(
  props: { color?: 'info' | 'primary' | 'secondary' | 'inherit' },
  ref: Ref<PromptRef>,
): JSX.Element {
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

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit(value);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyPress={onKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button color={props.color} onClick={() => onDismiss()}>
          Cancel
        </Button>
        <Button color={props.color} onClick={() => onSubmit(value)}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(Prompt);
