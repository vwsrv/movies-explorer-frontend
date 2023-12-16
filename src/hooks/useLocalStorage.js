import { useState, useEffect } from "react";

function isDefined(storedValue) {
    return storedValue !== null && storedValue !== 'undefined';
}

export default function useLocalStorageState(key, initialValue) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);

        if (isDefined(storedValue)) {
            return JSON.parse(storedValue)
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState] 
}