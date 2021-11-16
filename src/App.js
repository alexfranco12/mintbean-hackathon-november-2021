import styled from "styled-components";
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <AppStyled>
        <h1>Hello World!</h1>

      </AppStyled>
    </Router>
  );
}

export default App;

const AppStyled = styled.div``;
