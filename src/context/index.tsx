import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useEffect,
} from "react";

const App = createContext({});

export function useGlobalContext() {
    return useContext(App);
}

export default function Provider({ children }) {

    return (
        <></>
    );
}
