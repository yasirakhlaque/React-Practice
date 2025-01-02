import { useContext } from 'react'
import './Main.css'
import { Context } from '../../Context/Context'

export default function Main() {

    const { 
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput } = useContext(Context);
    return (
        <>
            <div className="main">
                <div className="nav">
                    <h3>Gemini</h3>
                    <div className="user-box">
                        <img src="Images/user1.jpg" alt="user" />
                    </div>
                </div>
                <div className="hero">

                    {!showResult ?
                        <>
                            <div className="greet">
                                <h1>Hey, Yasir</h1>
                                <p>How Are You!</p>
                            </div>
                            <div className="cards">
                                <div className="card card1">
                                    <p>Why Doing Internship is important during college days?</p>
                                    <i className="fa-solid fa-book"></i>
                                </div>
                                <div className="card card2">
                                    <p>Why Doing Internship is important during college days?</p>
                                    <i className="fa-solid fa-book"></i>
                                </div>
                                <div className="card card3">
                                    <p>Why Doing Internship is important during college days?</p>
                                    <i className="fa-solid fa-book"></i>
                                </div>
                                <div className="card card4">
                                    <p>Why Doing Internship is important during college days?</p>
                                    <i className="fa-solid fa-book"></i>
                                </div>
                            </div>
                        </>
                        : <div className='result'>
                            <div className="result-title">
                                <img src="Images/user1.jpg" alt="user" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src="Images/logo.png" alt="logo" />
                                {loading ?
                                    <div className='loading'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div> :
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }

                            </div>
                        </div>}

                    <div className="hero-bottom">
                        <div className="input-area">
                            <div className="send">
                                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" name="text" placeholder='Enter Your Message Here' />
                                <i className="fa-solid fa-circle-chevron-right" onClick={() => onSent()}></i>
                            </div>
                            <p className='disclamer'>
                                Gemini may response inappropriate answers so double check the information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}