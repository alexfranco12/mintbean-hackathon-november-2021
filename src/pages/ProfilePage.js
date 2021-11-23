import styled from "styled-components";

export const ProfilePage = () => {
  return ( 
    <ProfilePageStyled>
      <h1>Welcome to the profile page</h1>
    </ProfilePageStyled> 
  );
};

const ProfilePageStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;