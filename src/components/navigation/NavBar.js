import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "..";
import { RiUserLine } from 'react-icons/ri'

export const NavBar = () => {
  const [showModal, setShowModal] = useState(false)

  return ( 
    <NavBarStyled>
      <Link to="/">
        <h1 className="title">PAINT</h1>
      </Link>
      
      <div className="profile-link" >
        <div
          className="link"
          onClick={() => setShowModal(true)}>
          <RiUserLine />
        </div>
      </div>
      
      <Modal showModal={showModal} setShowModal={setShowModal}/>

    </NavBarStyled>
   );
};

const NavBarStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 1;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto;
  position: relative;
  & a {
    color: ${props => props.theme.colors.dark1};
    & .title {
      grid-column: 1 / span 7;
      grid-row: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  & .profile-link {
    grid-column: 8 / span 2;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    & .link {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      border-radius: 4px;
      padding: .75rem 1.25rem;
      background-color: ${props => props.theme.colors.secondary1};
    }
  }


  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
  }
  @media ${props => props.theme.breakpoints.mobile} {
  }
`;