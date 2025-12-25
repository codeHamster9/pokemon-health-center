import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import Dashboard from './pages/pokemon/Dashboard';
import MachineMetrics from './pages/pokemon/MachineMetrics';
import ActiveCheckins from './pages/pokemon/ActiveCheckins';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/machines" element={<MachineMetrics />} />
                <Route path="/active" element={<ActiveCheckins />} />
              </Routes>
            </ErrorBoundary>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
