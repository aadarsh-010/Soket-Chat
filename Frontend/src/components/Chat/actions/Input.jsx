import { useState , useEffect , useRef } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../../context/SocketContext";

function Input({ message, setMessage, textRef, socket }) {
  const { activeConversation } = useSelector((state) => state.chat);

  const [typing, setTyping] = useState(false);
  const lastTypingTimeRef = useRef(0);
  const timer = 1000;
   
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    console.log("1 typo" + typing);
    
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    
    lastTypingTimeRef.current = new Date().getTime();
    console.log("2 typo" + typing);
  };
   
  useEffect(() => {
    const interval = setInterval(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTimeRef.current;
      
      if (typing && timeDiff >= timer) {
        setTyping(false);
        socket.emit("stop typing", activeConversation._id);
        console.log("3 typo" + typing);
      }
    }, timer);
    
    return () => clearInterval(interval);
  }, [typing]);

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  );
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default InputWithSocket;
