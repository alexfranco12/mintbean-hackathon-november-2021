import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts';
import { 
  CanvasPage, 
  LoginPage,
  RegisterPage,
  NotFound, 
  ProfilePage
} from './pages';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CanvasPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
