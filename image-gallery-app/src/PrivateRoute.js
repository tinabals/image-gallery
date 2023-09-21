import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import this hook from your chosen Firebase library
import { auth } from './firebase-config'; // Import and initialize the auth object from Firebase
import ImageGallery from './components/ImageGallery';

const PrivateRoute = () => {
    const [user] = useAuthState(auth); // Assuming you're using the useAuthState hook for authentication

    return user ? (
        <>
            <Outlet />
            <ImageGallery />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;

