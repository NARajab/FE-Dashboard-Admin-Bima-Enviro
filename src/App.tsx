import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SendEmail from './pages/Authentication/SendEmail';
import ResetPassword from './pages/Authentication/ResetPassword';
import SuccessMessage from './pages/ReturnPage';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import P2hKkh from './pages/Dashboard/P2hKkh';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TableP2h from './pages/Tables/TableP2h';
import TableTm from './pages/Tables/TableTm';
import TableKkh from './pages/Tables/TableKkh';
import TableUsers from './pages/Tables/TableUsers';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import HandleLogout from './pages/HandleLogout';

function App() {
  HandleLogout();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Signin | Bima Nusa Internasional" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/send-email"
        element={
          <>
            <PageTitle title="Send Email | Bima Nusa Internasional" />
            <SendEmail />
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <PageTitle title="Reset Password" />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/success-message"
        element={
          <>
            <PageTitle title="Success Message" />
            <SuccessMessage />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="P2H & KKH Dashboard | Bima Nusa Internasional" />
            <P2hKkh />
          </>
        }
      />
      <Route
        path="/p2h"
        element={
          <>
            <PageTitle title="Table P2H | Bima Nusa Internasional" />
            <TableP2h />
          </>
        }
      />
      <Route
        path="/tm"
        element={
          <>
            <PageTitle title="Table Timesheet | Bima Nusa Internasional" />
            <TableTm />
          </>
        }
      />
      <Route
        path="/kkh"
        element={
          <>
            <PageTitle title="Table KKH | Bima Nusa Internasional" />
            <TableKkh />
          </>
        }
      />
      <Route
        path="/users"
        element={
          <>
            <PageTitle title="Table Users | Bima Nusa Internasional" />
            <TableUsers />
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <PageTitle title="P2H & KKH Calendar | Bima Nusa Internasional" />
            <Calendar />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Profile />
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements />
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout />
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Settings />
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart />
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </>
        }
      />
    </Routes>
  );
}

export default App;
