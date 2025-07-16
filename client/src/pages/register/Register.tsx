import Login from "../../components/user/login/Login";
import SignUp from "../../components/user/signup/SignUp";
import "../register/register.css";

const Register = () => {
  return (
    <div className="register-container">
      <SignUp />
      <Login />
    </div>
  );
};

export default Register;
