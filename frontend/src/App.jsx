
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';

import { AuthProvider } from './context/authProvider';


import Posts from './pages/Posts';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Register/>}/>
              <Route path="olvide-password" element={<ForgotPassword/>}/>
              <Route path="olvide-password/:token" element={<NewPassword/>}/>
              <Route path="confirmar/:token" element={<ConfirmAccount/>}/>
          </Route>

          <Route path="/posts" element={<ProtectedRoute />}>
              <Route index element={<Posts />} />
          </Route>
        </Routes>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
