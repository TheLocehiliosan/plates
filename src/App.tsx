import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProgressProvider } from './context/ProgressContext';
import { Dashboard } from './pages/Dashboard';
import { Rules } from './pages/Rules';
import { VariantDetail } from './pages/VariantDetail';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="variant/:variantId" element={<VariantDetail />} />
            <Route path="rules" element={<Rules />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
