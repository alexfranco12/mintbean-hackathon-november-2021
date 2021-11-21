import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return ( 
    <NavBarStyled>
      <h1 className="title">PAINT</h1>
      <Link to="/login" className="login">
        login
      </Link>
    </NavBarStyled>
   );
};

const NavBarStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 1;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto;
  & .title {
    grid-column: 1 / span 7;
    grid-row: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  & .login {
    grid-column: 8 / span 2;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
  }
  @media ${props => props.theme.breakpoints.mobile} {
  }
`;