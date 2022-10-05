import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';
import MedicationIcon from '@mui/icons-material/Medication';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TuneIcon from '@mui/icons-material/Tune';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

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
  [Pages.Medications]: {
    component: asyncComponentLoader(() => import('@/pages/Medications')),
    path: '/settings/medications',
    title: 'Medications',
    icon: MedicationIcon,
  },
  [Pages.Symptoms]: {
    component: asyncComponentLoader(() => import('@/pages/Symptoms')),
    path: '/settings/symptoms',
    title: 'Symptoms',
    icon: TextSnippetIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Page 2',
    icon: AddTaskIcon,
    inNavbar: true,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: TerrainIcon,
    inNavbar: true,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: BugReportIcon,
    inNavbar: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
} as const;

export default routes;
