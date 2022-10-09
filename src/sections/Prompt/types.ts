export interface PromptRef {
  open: (message: string, defaultValue?: string) => void;
  close: () => void;
  onSubmit: (callback: (value: string) => void) => void;
  onDismiss: (callback: () => void) => void;
}
