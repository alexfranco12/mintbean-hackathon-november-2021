import styled from "styled-components";
import useAxios from "../utils/useAxios"; 
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const ProfilePage = ({ setImage }) => {
  const { id } = useParams();
  const { data: user, error, loading } = useAxios({
    method: 'GET',
    url: `api/users/me/${id}`,
    headers: {
      accept: '*/*',
    }
  })

  return ( 
    <ProfilePageStyled>
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <div>
          {error && error.message}
          {user &&
            <div className="content">
              <h1>Welcome, {user.username}</h1>
              {user.savedImages.map((image, i) => (
                <div key={i}>
                  <Link 
                    to='/' 
                    onClick={() => setImage(image)} 
                    >saved canvas #{i}
                  </Link>
                </div>
              ))}
            </div>
          }
        </div>
      )
    }
      
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
  height: 80vh;
`;