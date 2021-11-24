import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './utils/userContext'
import { useState, useMemo } from 'react';
import { MainLayout } from './layouts';
import { 
  CanvasPage, 
  LoginPage,
  RegisterPage,
  NotFound, 
  ProfilePage
} from './pages';

function App() {
  const [image, setImage] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const value = useMemo(
    () => ({ currentUser, setCurrentUser }), 
    [currentUser]
  );

  return (
    <Router>
      <UserContext.Provider value={value}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CanvasPage image={image} />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/profile/:id" element={<ProfilePage setImage={setImage} />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </MainLayout>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
