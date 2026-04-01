/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HomePage } from './pages/HomePage';
import { SagaMapPage } from './pages/SagaMapPage';
import { SettingsPage } from './pages/SettingsPage';
import NewTrackerPage from './pages/NewTrackerPage';
import { EpisodeTrackerPage } from './pages/EpisodeTrackerPage';
import { Layout } from './components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="tracker" element={<NewTrackerPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="map" element={<SagaMapPage />} />
      <Route path="episodes" element={<EpisodeTrackerPage />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}