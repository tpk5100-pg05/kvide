import { SnackbarProvider } from 'notistack';

import Notifier from './Notifier';

function Notifications() {
  return (
    <SnackbarProvider>
      <Notifier />
    </SnackbarProvider>
  );
}

export default Notifications;
