import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "..";
import { RiUserLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import axios from "axios";

export const NavBar = () => {
  const [showModal, setShowModal] = useState(false)
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { REACT_APP_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env
  const host = REACT_APP_ENV === "development" ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND;
  let navigate = useNavigate();

  const handleLogout = () => {
    axios.request({
      method: "GET",
      url: `${host}/api/users/logout`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    })

    setCurrentUser(null)
    navigate(`/`)
  }

  return ( 
    <NavBarStyled>
      <Link to="/" className="title">
        <h1>PAINT</h1>
      </Link>
      
      <div className="profile-link" >
        <div 
          className="link"
          style={{ opacity: currentUser ? 1 : 0 }}
          onClick={handleLogout}
          > <RiLogoutBoxRLine />
        </div>
        <div
          className="link"
          onClick={() => {
            if (!currentUser) { setShowModal(true)} 
            else { navigate(`/profile`) }
          }}>
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
  & .title {
    grid-column: 1 / span 7;
    grid-row: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2rem;
    color: ${props => props.theme.colors.dark1};
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
      margin: auto 1rem;
      background-color: ${props => props.theme.colors.secondary1};
    }
  }


  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
  }
  @media ${props => props.theme.breakpoints.mobile} {
  }
`;