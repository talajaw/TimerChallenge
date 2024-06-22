import { useState , useRef} from "react";
export default function Player() {

  const PlayerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(event) {
  //   setSubmitted(false);
  //   setEnteredPlayerName(event.target.value);
    
  // }

  function handleClick() {
    // setSubmitted(true);
    setEnteredPlayerName(PlayerName.current.value);  //Just reading a value not change anything
    PlayerName.current.value ='';  
  }

  return (
    <section id="player">
      <h2>Welcome { enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={PlayerName} type="text"  />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
