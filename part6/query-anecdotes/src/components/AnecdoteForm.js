import { createAnecdotes } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import AnecdoteContext from "../AnecdoteContext";
import { useContext } from "react";

const AnecdoteForm = () => {
    const [_, dispatch] = useContext(AnecdoteContext);
    const queryClient = useQueryClient();
    const addAnecdoteMutation = useMutation(createAnecdotes, {
        onSuccess: (anecdote) => {
            dispatch({ type: "CREATE", payload: anecdote });
            queryClient.invalidateQueries("anecdotes");
        },
    });

    const onCreate = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        addAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
