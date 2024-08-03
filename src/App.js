// import logo from './logo.svg';
import './App.css';
import UserSearch from './Components/UserSearch';

function App() {
  return (
    <div className="App">
      <div className="flex justify-center items-center !bg-gradient-to-br !from-blue-300 !to-purple-300 w-full h-full min-h-screen mt-0 mb-auto">
        <UserSearch />
      </div>
    </div>
  );
}

export default App;
