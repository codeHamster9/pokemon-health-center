import { Activity } from 'lucide-react';
import { NavLink } from './NavLink';
import { ThemeButton } from './ThemeButton';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
                        <ThemeButton />
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
    );
}
