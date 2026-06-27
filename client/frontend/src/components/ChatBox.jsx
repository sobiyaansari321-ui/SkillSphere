import { useState , useEffect , useRef } from "react";
import api from "../services/api.js";
import { IoLogoWechat } from "react-icons/io5";

function ChatBox ({ projectId }) {

    const [ messages , setMessages ] = useState([])
    const [ text , setText ] = useState("")
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const messagesEndRef = useRef(null)
  
    const fetchMessages = async () => {
        try {
    const token = localStorage.getItem("token");
  
    const response = await api.get(`/messages/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    setMessages(response.data);
  }
   catch (error) {
    console.log(error.response?.data || error.message);
  }
  }

  useEffect( ()=>{

        const fetchMessages = async () => {
        try {
    const token = localStorage.getItem("token");
  
    const response = await api.get(`/messages/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    setMessages(response.data);
  }
   catch (error) {
    console.log(error.response?.data || error.message);
  }
  }

    fetchMessages();
  }, [projectId]) 

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({
      behavior:"smooth"
    })
  }, [messages])


  const handleSend = async () => {
  if (!text.trim()) return;

  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/messages",
      {
        projectId,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("")

    fetchMessages()

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};


  return (
  <div className="chat-box">

    <div className="chat-header">
      <IoLogoWechat /> Team Conversation
    </div>

    <div className="messages">

      {messages.length === 0 ? (

        <p className="empty-chat">
          Start the conversation 👋
        </p>

      ) : (

       messages.map((msg) => (
  <div
    key={msg._id}
    className={
      currentUser?._id === msg.sender._id
        ? "message-row own"
        : "message-row"
    }
  >

    <div
      className={
        currentUser?._id === msg.sender._id
          ? "message-card own-card"
          : "message-card"
      }
    >

      {currentUser?._id !== msg.sender._id && (
  <div className="sender-name">
    {msg.sender.name}
  </div>
)}

      <div className="message-text">
  {msg.text}
</div>

<div className="message-time">
  {new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</div>

    </div>

  </div>

))
      )}
<div ref={messagesEndRef}></div>

    </div>

    <div className="chat-input">

      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
  ➤
</button>

    </div>

  </div>
);
}

export default ChatBox;