import { useState , useEffect } from "react";
import api from "../services/api.js";

function ChatBox ({ projectId }) {

    const [ messages , setMessages ] = useState([])
    const [ text , setText ] = useState("")
  
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

      <h3>Project Chat</h3>

      <div className="messages">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg._id}>
             <strong>{msg.sender.name}</strong>
             <p>{msg.text}</p>
           </div>
            ))}
        </div>      
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleSend}>
          Send
        </button>
      </div>

    </div>
  );
}

export default ChatBox;