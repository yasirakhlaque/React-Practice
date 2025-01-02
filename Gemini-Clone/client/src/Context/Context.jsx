import { createContext, useState } from "react";
import axios from 'axios'; // Import axios

export const Context = createContext();

const ContxtProvider = (props) => {
    // ... (Your existing state variables)

    const onSent = async () => {
        if (!input.trim()) return;

        setLoading(true);

        try {
            const res = await axios.post('https://clone-two-blush.vercel.app/api/generate', { prompt: input }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setInput('');
            setResultData(res.data.response);
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
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setResultData(`Error: ${error.response.status} - ${error.response.data.error || error.message}`);
                console.error("Response data:", error.response.data)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setResultData(`Error: No response from server. Check network connection.`);
            } else {
                // Something happened in setting up the request that triggered an Error
                setResultData(`Error: ${error.message}`);
            }
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
