import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";
import { getUser, logout } from "./services/signup";

function App() {
  const [userState, setUserState] = useState({ user: getUser() });

  function handleSignupOrLogin() {
    setUserState({ user: getUser() });
  }

  function handleLogout() {
    logout();
    setUserState({ user: null });
  }

  return (
    <div className="App">
      <Header user={userState.user} handleLogout={handleLogout} />
      <Main user={userState.user} handleSignupOrLogin={handleSignupOrLogin} />
    </div>
  );
}

export default App;