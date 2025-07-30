import { useState } from "react";
import Login from "../../components/user/login/Login";
import SignUp from "../../components/user/signup/SignUp";
import "../register/register.css";

const Register = () => {
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <div className="register-container">
        <SignUp setIsPending={setIsPending} isPending={isPending} />
        {isPending && (
          <div className="overlay">
            <div className="loader" />
          </div>
        )}
        <Login setIsPending={setIsPending} isPending={isPending} />
      </div>
    </>
  );
};

export default Register;
