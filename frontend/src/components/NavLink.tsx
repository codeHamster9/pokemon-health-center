import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
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
