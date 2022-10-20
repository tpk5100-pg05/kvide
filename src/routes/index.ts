import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import TreatmentIcon from '@mui/icons-material/Medication';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TuneIcon from '@mui/icons-material/Tune';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const episodeRoute = (id: number) => {
  return `/episode/${id}`;
};

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
    inNavbar: true,
  },
  [Pages.History]: {
    component: asyncComponentLoader(() => import('@/pages/History')),
    path: '/history',
    title: 'History',
    icon: HistoryIcon,
    inNavbar: true,
  },
  [Pages.Settings]: {
    component: asyncComponentLoader(() => import('@/pages/Settings')),
    path: '/settings',
    title: 'Settings',
    icon: TuneIcon,
    inNavbar: true,
  },
  [Pages.Treatments]: {
    component: asyncComponentLoader(() => import('@/pages/Treatments')),
    path: '/settings/treatments',
    title: 'Treatments',
    icon: TreatmentIcon,
  },
  [Pages.Symptoms]: {
    component: asyncComponentLoader(() => import('@/pages/Symptoms')),
    path: '/settings/symptoms',
    title: 'Symptoms',
    icon: TextSnippetIcon,
  },
  [Pages.Episode]: {
    path: '/episode/:id',
    title: 'Episode',
    component: asyncComponentLoader(() => import('@/pages/EpisodeView')),
    inNavbar: false,
  },
  [Pages.EpisodeAdd]: {
    path: '/episode/add',
    title: 'Add Episode',
    component: asyncComponentLoader(() => import('@/pages/EpisodeAdd')),
    inNavbar: false,
  },
  [Pages.exportPDF]: {
    component: asyncComponentLoader(() => import('@/pages/ExportPDF')),
    path: '/ExportPDF',
    title: 'Export',
    icon: HistoryIcon,
    inNavbar: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
  [Pages.Help]: {
    path: '/Help',
    title: 'Help',
    component: asyncComponentLoader(() => import('@/pages/Help')),
    inNavbar: true,
  },
} as const;

export { routes, episodeRoute };
