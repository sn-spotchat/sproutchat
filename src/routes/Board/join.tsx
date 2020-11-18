import React, { ChangeEvent, FormEvent } from 'react';
//import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";

/* Styled */
//import styled from 'styled-components';

/* Styled Components 
const Container = styled.div`
`;*/
/*
class Join extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          id:null,
          password:null
      };
  }
  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
  }
  render() {
    const {username} = this.state;
    return (
       <div className="App">
          <header className="App-header">
            {username ? `Hello ${username}` : 'Hello World'}
          </header>
      </div>
    );
    ;
}
}
*/
/* Main Component */
interface data { id: string, password: string }

const Join: React.FC= () => {
  const [joinList, setJoinList] = React.useState<data[]>([]);// <>: type 설정, 배열
  const [id, setId] = React.useState(''); //컴포넌트 상태 관리. [현재 상태, setter함수]
  const [password, setPassword] = React.useState('');
  const socket = socketIOClient('localhost:3000');
  
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join', { id: id, password: password });
  };
  React.useEffect(() => {
    socket.on('join complete', (data: { id: string, password: string }) => {
      setJoinList(joinList => joinList.concat(data));
    })
  }, []);

  return (
    <div>
       <section className="chat-list">
        {joinList.map((item: data, i: number) =>
          <div key={i}>
            {item.id} 
            {item.password}
          </div>
        )}
      </section>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}>
            <h1>JOIN</h1>
            <input 
              type="text" 
              placeholder="id" 
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
              value={id}
            />
            <input 
              type="text" 
              placeholder="password" 
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit" value="회원가입"/>
        </form>
    </div>
  );
}
/*
Join.propTypes = {
  className: PropTypes.string,
}*/

/* Exports */
export default Join;