import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Register from './components/Register';
import ForgotPassword from './components/Login/ForgotPassword';
import EnterOtp from './components/Login/Otp';
import ResetPassword from './components/Login/ResetPassword';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/login" element={<LoginPage />} />  */}
          <Route path='/Register' element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;