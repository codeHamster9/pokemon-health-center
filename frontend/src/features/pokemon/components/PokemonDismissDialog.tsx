import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkin } from "../api/pokemonApi";

interface PokemonDismissDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    checkin: Checkin | null;
}

export function PokemonDismissDialog({
    open,
    onOpenChange,
    onConfirm,
    checkin,
}: PokemonDismissDialogProps) {
    if (!checkin) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Mark as Healed?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to dismiss <strong>{checkin.pokemon?.name || 'this Pokémon'}</strong>?
                        This will mark the treatment as complete.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        onConfirm();
                        onOpenChange(false);
                    }}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
