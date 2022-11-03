import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';
import { useRecoilState } from 'recoil';
import { bottomHeight, topHeight } from './state';

function App() {
  const [, setTopBarHeight] = useRecoilState(topHeight);
  const [, setBotBarHeight] = useRecoilState(bottomHeight);

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Notifications />
        <HotKeys />
        <SW />
        <BrowserRouter>
          <Header onHeightChange={setTopBarHeight} />
          <Pages />
          <Sidebar onHeightChange={setBotBarHeight} />
        </BrowserRouter>
      </LocalizationProvider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
