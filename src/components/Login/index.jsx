import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks";
import { AnimatePresence } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

export const Login = ({ setLoginPopup }) => {
  const cardRef = React.useRef();
  const [login, setLogin] = React.useState(true);
  const [register, setRegister] = React.useState(false);
  const [atlastrip, setAtlastrip] = React.useState(false);

  useEffect(() => {
    console.log("login");
  }, []);

  useOnClickOutside(cardRef, () => {
    setLoginPopup(false);
  });




  return (
    <div className="fixed z-[10000] top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-25">
      <motion.div
        initial={{ opacity: 0, y: -400 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -400 }}
        className="w-full relative max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
        ref={cardRef}
      >
        {atlastrip && (
          <div className="absolute flex justify-center items-center top-0 left-0 rounded-md w-full h-full bg-green-900 bg-opacity-80 z-10">
            <CircularProgress
              sx={{
                color: "white",
              }}
            />
          </div>
        )}
        <div className="rounded-xl bg-white shadow-xl ">
          <div className="p-6 sm:p-16">
            <div className="space-y-4">
              <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                Sign in to unlock the best of : <br />
                <span className="font-extrabold"> Atlastrip Ads Maker.</span>
              </h2>
            </div>
            <div className="mt-16 grid space-y-4">
              <button
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>

              <button
              onClick={() => {
                setAtlastrip(true);
                }}
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-green-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="/public/images/atlastripLogo.png"
                    className="rounded-full absolute left-0 w-5"
                    alt="Facebook logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-green-600 sm:text-base">
                    Continue with Atlastrip
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
              <p className="text-xs">
                By proceeding, you agree to our{" "}
                <a href="#" className="underline">
                  Terms of Use
                </a>{" "}
                and confirm you have read our{" "}
                <a href="#" className="underline">
                  Privacy and Cookie Statement
                </a>
                .
              </p>
              <p className="text-xs">
                This site is protected by reCAPTCHA and the{" "}
                <a href="#" className="underline">
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
