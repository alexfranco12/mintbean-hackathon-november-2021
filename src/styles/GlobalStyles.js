import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body, html {
    font-family: ${props => props.theme.fonts.main};
    height: 100%;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyles