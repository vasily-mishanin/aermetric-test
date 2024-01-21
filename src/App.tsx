import './App.css';
import RootLayout from './pages/RootLayout';
import UsersPage from './pages/users/UsersPage';
import { usersStore } from './store/usersStore';

// setTimeout(() => {
//   usersStore.addUser({ firstName: 'Bob' });
// }, 3000);

import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route
            path='/users/search'
            element={<UsersPage store={usersStore} />}
          ></Route>
          <Route path='/users' element={<UsersPage store={usersStore} />} />
          <Route path='/users/:id' element={<h1>One User Page</h1>}></Route>
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
