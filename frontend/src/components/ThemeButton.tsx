import { useThemeStore } from "@/store/themeStore";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeButton() {
    const { toggleTheme } = useThemeStore();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme()}
            className="rounded-full glass glass-border hover:bg-violet-500/10 transition-all"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-violet-500" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
