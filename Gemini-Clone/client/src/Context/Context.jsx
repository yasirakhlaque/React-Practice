import { createContext, useState } from "react";
import axios from 'axios';

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
          const res = await axios.post('https://clone-two-blush.vercel.app/api/generate', { prompt: input }, {
            headers: {
              'Content-Type': 'application/json',
            },
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
          // Improved error handling
          setResultData(getErrorMsg(error));
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
