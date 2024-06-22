import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title , targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    // const [timeStarted , setTimeStarted] = useState(false);
    // const [timeExpired , setTimeExpired] = useState(false);
    const [timeRemaining , setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        
        dialog.current.open();   //we did not stop time so we lostt!!!
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);

    }

    
    function handleStart() {
        // setTimeStarted(true);
        timer.current =setInterval(() => {    //(setTimeout)is not enough to just set & stop the timer, Instead i need to measure how much time is left.Sooo, i need to use" setInterval " will execute this func here every time this time here expired,so not just once.
            // setTimeExpired(true);
            // dialog.current.open();
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        },10 );  //(targetTime * 1000) i dont wanna set the targetTime as a time . so i execute this func every 10 milliseconds
    }

    function handleStop() {
        dialog.current.open();   //we manually stopped the timer so we won !!!
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />    
            <section className="challenge">
              <h2>{title}</h2>
              {/* {timeExpired && <p>You lost!</p>} */}
              <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
              </p>
              <p>
                  <button onClick={timerIsActive ? handleStop : handleStart}>
                     {timerIsActive ? 'Stop' : 'Start'} Challenge
                  </button>
              </p>
              <p className={timerIsActive ? 'active' : undefined}>
                 {timerIsActive ? 'Time is running...' : 'Timer inactive'} 
              </p>
             </section>
         </>


    );
}