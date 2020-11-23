/*import React, { ChangeEvent, FormEvent } from 'react';
import './test.css';
import socketIOClient from "socket.io-client";

interface Message { name: string, message: string }

const Test: React.FC = () => {
  const [messageList, setMessageList] = React.useState<Message[]>([]);// <>: type 설정, 배열
  const [name, setName] = React.useState(''); //컴포넌트 상태 관리. [현재 상태, setter함수]
  const [value, setValue] = React.useState('');
  const socket = socketIOClient('http://localhost:3002/');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('send message', { name: name, message: value });
  };
  React.useEffect(() => {
    socket.on('receive message', (message: { name: string, message: string }) => {
      setMessageList(messageList => messageList.concat(message));
    })
  }, []);

  return (
    <div className="App">
      <section className="chat-list">
        {messageList.map((item: Message, i: number) =>
          <div key={i} className="message">
            <p className="username">{item.name.toUpperCase()}</p>
            <p className="message-text">{item.message}</p>
          </div>
        )}
      </section>
      <form className="chat-form"
        onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}>
        <div className="chat-inputs">
          <input
            type="text"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
            placeholder="유저이름"
          />
          <input
            type="text"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value}
            placeholder="메세지입력하기"
          />
        </div>
        <button type="submit">입력하기</button>
      </form>
    </div>
  );
}

export default Test;*/