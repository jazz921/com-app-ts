import { FC, useEffect, useContext, ChangeEvent } from "react";
import { ACTIONS } from "../reducer";
import { GlobalContext } from "../Main";
import { IChat } from "../interfaces";

const GroupChat: FC = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let loggedInData = state.users.find((user) => user.id === state.loggedin.id);

  const getTime = (): string => {
    let date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let currentDate = `${year}-${month}-${day} `;
    let time = date.toTimeString().slice(0, 8);
    return `${currentDate}${time}`;
  };

  const addMessage = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    let message = event.target.message.value;
    if (message.trim() === "") {
      alert("Please enter a message");
    } else {
      let newMessage = {
        sender_id: loggedInData?.id,
        message: message,
        sender_name: loggedInData?.name,
        time: getTime(),
      };
      dispatch({
        type: ACTIONS.SEND_CHAT,
        payload: newMessage,
      });
      event.target.message.value = ""
    }
  };

  useEffect(() => {}, [state]);

  return (
    <div className="group-chat-container">
      <div className="exit-container">
        <p>Group chat</p>
      </div>
      <div className="chats-container">
        {state.chats.map((chat: IChat) => (
          <p key={Math.random() * 100000}>
            [{chat.time}] {chat.sender_name}: {chat.message}
          </p>
        ))}
      </div>
      <div className="send-form-container">
        <form className="message-form" onSubmit={addMessage}>
          {loggedInData && <p id="current-user">{loggedInData.name}</p>}
          <input
            type="text"
            name="message"
            autoComplete="off"
            placeholder="Enter message"
          />
          <div>
            <button>Send</button>
          </div>
        </form>
        <button className="refresh-btn" onClick={() => location.reload()}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
