import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

class Join extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username:null
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

/* Main Component */
/*const Join = props => {
  
  const {
    className,
  } = props;

  
  return (
    <Container className={ className }>
        <form>
            <h1>JOIN</h1>
            <p><input type="text" placeholder="id" id="joinId" autocomplete="off"/></p>
            <p><input type="password" placeholder="password" id="joinPw" autocomplete="off"/></p>
            <p><input class="btn" type="submit" value="회원가입"/></p>
        </form>
    </Container>
  );
}


Join.propTypes = {
  className: PropTypes.string,
}
*/
/* Exports */
export default Join;