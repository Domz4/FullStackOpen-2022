import { useQueryClient, useQuery, useMutation } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdotes } from "./requests";
import AnecdoteContext from "./AnecdoteContext";
import { useContext } from "react";

const App = () => {
    const [anecdotes, dispatch] = useContext(AnecdoteContext);
    console.log(anecdotes);
    const queryClient = useQueryClient();

    const updateAnecdoteMutation = useMutation(updateAnecdotes, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
        },
    });
    const handleVote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        dispatch({ type: "UPDATE", payload: updatedAnecdote });
        updateAnecdoteMutation.mutate(updatedAnecdote);
    };

    const result = useQuery("anecdotes", getAnecdotes, {
        retry: false,
        onSuccess: (data) => {
            dispatch({ type: "GET", payload: data });
        },
    });

    return result.isLoading ? (
        <h1>anecdote service not available due to problems in server</h1>
    ) : (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
