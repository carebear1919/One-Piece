/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SagaMapPage } from './pages/SagaMapPage';
import { EpisodeTrackerPage } from './pages/EpisodeTrackerPage';
import { MovieTrackerPage } from './pages/MovieTrackerPage';
import { FillerSettingsPage } from './pages/FillerSettingsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saga-map" element={<SagaMapPage />} />
          <Route path="/episodes" element={<EpisodeTrackerPage />} />
          <Route path="/movies" element={<MovieTrackerPage />} />
          <Route path="/filler-settings" element={<FillerSettingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

