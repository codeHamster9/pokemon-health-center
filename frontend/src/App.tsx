import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Activity, Sun, Moon } from 'lucide-react';
import { useThemeStore } from './store/themeStore';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import Dashboard from './pages/pokemon/Dashboard';
import MachineMetrics from './pages/pokemon/MachineMetrics';
import ActiveCheckins from './pages/pokemon/ActiveCheckins';

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-secondary text-secondary-foreground"
          : "text-muted-foreground hover:bg-secondary/50"
      )}
    >
      {children}
    </Link>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Activity className="text-primary w-6 h-6" />
            <span>Guardio Health</span>
          </div>

          <nav className="flex items-center gap-1">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/machines">Machines</NavLink>
            <NavLink to="/active">Active Check-ins</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
              AD
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6 flex-1">
        {children}
      </main>
    </div>
  )
}

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
