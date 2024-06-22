import { forwardRef , useImperativeHandle, useRef} from "react";
import { createPortal } from "react-dom";

 const ResultModal = forwardRef( function ResultModel ({  targetTime , remainingTime , onReset} , ref) {
   const dialog = useRef();
   const userlost = remainingTime <= 0;
   const formatRemainingTime = (remainingTime / 1000).toFixed(2);  //to show only 2 number decimal.... and divide /1000 to trnsform from milliseconds to seconds .
   const score = Math.round((1 - remainingTime / (targetTime * 10000)) * 100);  // range[0 ..100]

   useImperativeHandle(ref , () => {
      return {
         open() {
            dialog.current.showModal();

         }
       };
   });
    return createPortal(
        <dialog ref={dialog} className="result-modal" >
            {userlost && <h2> You lost</h2>}
            {!userlost && <h2 > Your score: {score}</h2>}
            <p>
                the target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p> 
                you stopped the timer with <strong>{formatRemainingTime} X seconds left.</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>

        </dialog>,
        document.getElementById('modal')


    );

});

export default ResultModal;