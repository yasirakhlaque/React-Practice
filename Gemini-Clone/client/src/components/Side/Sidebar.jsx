import { useContext,useState } from "react";
import "./Sidebar.css";
import { Context } from "../../Context/Context";

export default function Sidebar() {
    const { onSent, prevPrompt, setRecentPrompt, newChat, setInput } = useContext(Context);
    const [extended, setExtended] = useState(true);

    const toggleMenu = () => {
        setExtended(!extended);
    };

    const loadPrompt = (prompt) => {
        setInput(prompt); // Set input first
        setRecentPrompt(prompt); // Keep recent prompt consistent
        onSent(); // Then trigger the API call
    };

    return (
        <div className="sidebar">
            <div className="sidetop">
                <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
                <div className="new_chat" onClick={() => {
                    newChat()
                }}>
                    <i className="fa-solid fa-plus"></i>
                    {extended ? <h4>New Chat</h4> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <div className="recent-head">
                            <h4>Recent</h4>
                            <i className="fa-solid fa-history"></i>
                        </div>
                        {prevPrompt.map((item, index) => (
                            <div
                                key={index}
                                className="recent-entry"
                                onClick={() => loadPrompt(item)}
                            >
                                <i className="fa-regular fa-comment"></i>
                                <p>{item.slice(0, 15)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="side-bottom">.in progress</div>
        </div>
    );
}
