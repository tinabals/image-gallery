import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ImageGallery from './components/ImageGallery';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {user ? (
              <Route path="/imagegallery" element={<ImageGallery />} />
            ) : (
              <Route path="/imagegallery" element={<Navigate to="/" />} />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
