import { BrowserRouter as Router } from 'react-router-dom'
import { Canvas } from './components'
import { MainLayout } from './layouts'

function App() {
  return (
    <Router>
      <MainLayout>
        <Canvas />
      </MainLayout>
    </Router>
  );
}

export default App;
