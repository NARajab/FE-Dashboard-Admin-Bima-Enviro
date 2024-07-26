import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useLogoutOnDisconnect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOffline = () => {
      sessionStorage.removeItem('token');
      navigate('/');
    };

    const handleOnline = () => {
      // Optional: Implementasikan logika yang diperlukan saat koneksi kembali online, tetapi hindari navigasi
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if (
      !location.pathname.includes('/reset-password') &&
      !location.pathname.includes('/send-email') &&
      !location.pathname.includes('/success-message')
    ) {
      const token = sessionStorage.getItem('token');
      const query = new URLSearchParams(location.search);
      const urlToken = query.get('token');

      if (!token && !urlToken) {
        navigate('/');
      }
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [navigate, location.pathname, location.search]);

  return null;
};

export default useLogoutOnDisconnect;
