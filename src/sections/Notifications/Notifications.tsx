import { bottomHeight } from '@/state';
import { SnackbarProvider } from 'notistack';
import { useRecoilState } from 'recoil';

import Notifier from './Notifier';

function Notifications() {
  const [bottom] = useRecoilState(bottomHeight);

  return (
    <SnackbarProvider style={{ position: 'fixed', bottom: bottom }}>
      <Notifier />
    </SnackbarProvider>
  );
}

export default Notifications;
