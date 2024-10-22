import { useState } from 'react';
import { RandomVal, Sum } from './Random.js';
import Ticket from './Ticket.jsx';

export default function Lottery({ n=3,winCondition}) {
    let [ticket, setTicket] = useState(RandomVal(n));
    let isWin = winCondition(ticket);

    let BuyTicket = () => {
        setTicket(RandomVal(n));
    }

    return (
        <div>
            <h1>Lottery</h1>
            <Ticket ticket={ticket}/>
            <h1>{isWin && "Congratulation You Won"}</h1>
            <button onClick={BuyTicket}>Buy Ticket</button>
        </div>
    )
}