import { Flame, Droplets, Leaf, Zap, Star, Mountain, Ghost, Wind, Bug as BugIcon, Skull, Moon, Sun, Hexagon } from "lucide-react";

export const getPokemonTypeIcon = (type?: string) => {
    const defaultStyle = {
        icon: <Sun className="w-6 h-6 text-gray-500" />,
        className: 'bg-gray-500/20 border-gray-500/30 text-gray-500'
    };

    if (!type) return defaultStyle;

    switch (type.toLowerCase()) {
        case 'fire':
            return {
                icon: <Flame className="w-6 h-6 text-orange-500" />,
                className: 'bg-orange-500/20 border-orange-500/30 text-orange-500'
            };
        case 'water':
            return {
                icon: <Droplets className="w-6 h-6 text-blue-500" />,
                className: 'bg-blue-500/20 border-blue-500/30 text-blue-500'
            };
        case 'grass':
            return {
                icon: <Leaf className="w-6 h-6 text-green-500" />,
                className: 'bg-green-500/20 border-green-500/30 text-green-500'
            };
        case 'electric':
            return {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                className: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500'
            };
        case 'psychic':
            return {
                icon: <Star className="w-6 h-6 text-purple-500" />,
                className: 'bg-purple-500/20 border-purple-500/30 text-purple-500'
            };
        case 'rock':
        case 'ground':
            return {
                icon: <Mountain className="w-6 h-6 text-stone-500" />,
                className: 'bg-stone-500/20 border-stone-500/30 text-stone-500'
            };
        case 'ghost':
            return {
                icon: <Ghost className="w-6 h-6 text-indigo-500" />,
                className: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-500'
            };
        case 'flying':
            return {
                icon: <Wind className="w-6 h-6 text-sky-500" />,
                className: 'bg-sky-500/20 border-sky-500/30 text-sky-500'
            };
        case 'bug':
            return {
                icon: <BugIcon className="w-6 h-6 text-lime-500" />,
                className: 'bg-lime-500/20 border-lime-500/30 text-lime-500'
            };
        case 'poison':
            return {
                icon: <Skull className="w-6 h-6 text-fuchsia-500" />,
                className: 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-500'
            };
        case 'dark':
            return {
                icon: <Moon className="w-6 h-6 text-slate-400" />,
                className: 'bg-slate-500/20 border-slate-500/30 text-slate-400'
            };
        case 'fairy':
            return {
                icon: <Star className="w-6 h-6 text-pink-500" />,
                className: 'bg-pink-500/20 border-pink-500/30 text-pink-500'
            };
        case 'steel':
            return {
                icon: <Hexagon className="w-6 h-6 text-gray-500" />,
                className: 'bg-gray-500/20 border-gray-500/30 text-gray-500'
            };
        default:
            return defaultStyle;
    }
};
