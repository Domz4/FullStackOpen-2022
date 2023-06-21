import { useReducer, createContext } from "react";

const AnecdoteContext = createContext();

const AnecdoteReducer = (state, action) => {
    switch (action.type) {
        case "GET":
            return [...action.payload];
        case "CREATE":
            return [...state, action.payload];
        case "UPDATE":
            return state.map((anecdote) =>
                anecdote.id === action.payload.id ? action.payload : anecdote
            );
        default:
            return state;
    }
};

export const AnecdoteContextProvider = (props) => {
    const [anecdote, anecdoteDispatch] = useReducer(AnecdoteReducer, []);
    return (
        <AnecdoteContext.Provider value={[anecdote, anecdoteDispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    );
};

export default AnecdoteContext;
