import React, { useEffect, useState } from "react";
import { useLoginMutation } from "@services/user.js";
import { motion } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="right" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useLoginMutation();

  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleSnackbar = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [snackAlert, setSnackAlert] = useState({
    variant: "info",
    message: "beauty",
  });

  const selector = useSelector((state) => state.userApi);

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  let navigate = useNavigate();

  const NavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await login({ email, password });
    if (data) {
      console.log(data);
      setSnackAlert({ variant: "success", message: "Login Success" });
      handleSnackbar(TransitionLeft)();
      NavigateToDashboard();
    }
    if (error) {
      console.log(error);
      setSnackAlert({ variant: "error", message: "login failed" });
      handleSnackbar(TransitionLeft)();
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col justify-center hero-content lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <motion.button className="btn btn-primary" onClick={handleSubmit}>
                Login
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ""}
      >
        <Alert
          onClose={handleClose}
          severity={snackAlert.variant}
          sx={{ width: "100%" }}
        >
          {snackAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
