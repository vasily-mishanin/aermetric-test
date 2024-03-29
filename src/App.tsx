import './App.css';
import { Modal } from './components/Modal';
import UserInfo from './pages/users/UserInfo';
import RootLayout from './pages/RootLayout';
import { NoMatch } from './pages/not-found/NoMatch';
import UsersPage from './pages/users/UsersPage';
import { usersStore } from './store/usersStore';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path='/' element={<RootLayout />}>
          <Route
            path='/users/search'
            element={<UsersPage store={usersStore} />}
          ></Route>
          <Route path='/users' element={<UsersPage store={usersStore} />} />
          {/* <Route path='/users/:id' element={<h1>One User Page</h1>}></Route> */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
      {previousLocation && (
        <Routes>
          <Route
            path='/users/:id'
            element={
              <Modal>
                <UserInfo store={usersStore} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
