import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TodoState from './context/todoState';
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })


    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
    return (
      <>
      <TodoState showAlert={showAlert}>
        <Router>
          <Navbar title="MY TODO" />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />

          </Routes>
        </Router>
        </TodoState>




      </>
    );
  }

  export default App;
