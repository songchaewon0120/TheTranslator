import './App.css';
import './ban.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Subtitle from './Subtitle';  
import LogIn from './LogIn';  
import First from './First';  
import Sign_Up from './Sign_Up';

function Main() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<First />} />
            <Route path="/Subtitle" element={<Subtitle />} />  
            <Route path="/LogIn" element={<LogIn />} />  
            <Route path="/Home" element={<Home />} />  
            <Route path="/Sign_Up" element={<Sign_Up />} />  
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default Main;
