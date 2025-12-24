import { useEffect, useRef } from "react";

export function useAutoScroll(trigger: any) {
    const prevTriggerRef = useRef(trigger);

    useEffect(() => {
        // Assuming trigger is a number (length) or comparable value
        if (trigger > prevTriggerRef.current) {
            // Updated (e.g. data added), scroll to bottom
            // Using a timeout to allow virtualizers or DOM updates to settle
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
        prevTriggerRef.current = trigger;
    }, [trigger]);
}
