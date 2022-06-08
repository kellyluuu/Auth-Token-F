import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/signup";

function LoginPage({ handleSignupOrLogin, updateMessage }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handleChange(e) {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formState);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      navigate("/", { replace: true });
    } catch (err) {
      // Change this to a modal or toast in deployed apps
      alert(err.message);
    }
  }

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <legend>Log In</legend>
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          name="password"
          onChange={handleChange}
        />
        <div className="form-controls">
          <button>Log In</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;