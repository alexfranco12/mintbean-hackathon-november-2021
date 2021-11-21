import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts';
import { 
  HomePage, 
  CanvasPage, 
  LoginPage, 
  NotFound 
} from './pages';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CanvasPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
