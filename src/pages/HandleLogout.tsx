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

    // Fungsi handleOnline dihapus navigasi untuk menghindari redireksi tidak diinginkan
    const handleOnline = () => {
      // Optional: Implementasikan logika yang diperlukan saat koneksi kembali online, tetapi hindari navigasi
    };

    // Menambahkan event listeners untuk event offline dan online
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Melakukan pengecekan token hanya jika jalur URL bukan "/reset-password"
    if (
      !location.pathname.includes('/reset-password') &&
      !location.pathname.includes('/send-email')
    ) {
      const token = sessionStorage.getItem('token');
      const query = new URLSearchParams(location.search);
      const urlToken = query.get('token');

      // Redirect ke halaman login jika token tidak ada baik di sessionStorage maupun URL
      if (!token && !urlToken) {
        navigate('/');
      }
    }

    // Membersihkan event listeners saat komponen unmount
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [navigate, location.pathname, location.search]);

  return null;
};

export default useLogoutOnDisconnect;
