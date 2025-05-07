import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import WeatherPage from './components/pages/WeatherPage'
import CheckinPage from './components/pages/CheckinPage'
import Page3 from './components/pages/Page3'
import Page4 from './components/pages/Page4'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/weather' Component={WeatherPage} />
          <Route path='/checkin' Component={CheckinPage} />
          <Route path='/page3' Component={Page3} />
          <Route path='/page4' Component={Page4} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
