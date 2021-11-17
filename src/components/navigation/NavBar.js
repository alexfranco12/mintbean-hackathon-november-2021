import styled from "styled-components";

export const NavBar = () => {
  return ( 
    <NavBarStyled>
      <h1>PAINT</h1>
    </NavBarStyled>
   );
};

const NavBarStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
  }
  @media ${props => props.theme.breakpoints.mobile} {
  }
`;