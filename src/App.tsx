import { Fragment, useState } from 'react';
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
import { getPageHeight } from './routes/Pages/utils';

function App() {
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [botBarHeight, setBotBarHeight] = useState(0);

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Notifications />
        <HotKeys />
        <SW />
        <BrowserRouter>
          <Header onHeightChange={setTopBarHeight} />
          <Pages height={(theme) => getPageHeight(theme, topBarHeight, botBarHeight)} />
          <Sidebar onHeightChange={setBotBarHeight} />
        </BrowserRouter>
      </LocalizationProvider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
