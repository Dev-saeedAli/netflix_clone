import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import Account from "./Pages/Account/Account";
import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import Homescreen from "./Pages/Homescreen/Homescreen";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/" element={<Homescreen/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
