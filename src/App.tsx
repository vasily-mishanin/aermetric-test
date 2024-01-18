import './App.css';
import Users from './pages/Users';
import { usersStore } from './store/usersStore';

setTimeout(() => {
  usersStore.addUser({ name: 'Bob' });
}, 3000);

function App() {
  return (
    <>
      <Users store={usersStore} />
    </>
  );
}

export default App;
