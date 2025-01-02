import { createContext, useState } from "react";

export const Context = createContext();

const ContxtProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
        setRecentPrompt(""); // Clear recent prompt as well
    };

    const onSent = async () => {
        if (!input.trim()) return;

        setLoading(true);

        try {
            const res = await fetch('https://clone-two-blush.vercel.app/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!res.ok) {
                let errorText = "An error occurred.";
                try {
                    errorText = await res.text();
                } catch (textError) {
                    console.error("Error parsing error response:", textError);
                }
                throw new Error(`HTTP error ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            setInput(''); // Clear input after successful send
            setResultData(data.response);
            setRecentPrompt(input);
            setShowResult(true);

            setPrevPrompt((prev) => {
                if (prev.includes(input)) {
                    return prev;
                }
                return [...prev, input];
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            setResultData(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContxtProvider;
