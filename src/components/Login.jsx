import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function LoginForm() {
  const { setShowUserLogin, setUser } = useAppContext();
  const [acc, setAcc] = useState(true);    

  const OnSubmitHandler = async (event) => {

    event.preventDefault();

    setUser({
      email: "text.greendev.com",
      name: "testing"
    })
    setShowUserLogin(false);
  }

  return (
    /* ───── overlay ───── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/30 backdrop-blur-sm"
      onClick={() => setShowUserLogin(false)}   /* close on outside click */
    >
      {acc && (                                  /* show modal only when acc === true */
        /* ───── modal ───── */
        <div
          className="w-[420px] rounded-lg bg-[#B0DB9C]/30 p-10 shadow-xl"
          onClick={(e) => e.stopPropagation()}   /* keep clicks inside */
        >
          <form onSubmit={OnSubmitHandler}>
            <h1 className="mb-8 text-center text-3xl font-semibold text-gray-800">
              Login
            </h1>

            {/* Email */}
            <div className="relative mb-8 h-12 w-full">
              <input
                type="text"
                placeholder="Email"
                required
                className="h-full w-full rounded-full border border-gray-300
                           bg-white/40 px-5 pr-12 text-sm text-gray-800
                           placeholder-gray-500 focus:border-gray-500 focus:outline-none"
              />
              <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
            </div>

            {/* Password */}
            <div className="relative mb-4 h-12 w-full">
              <input
                type="password"
                placeholder="Password"
                required
                className="h-full w-full rounded-full border border-gray-300
                           bg-white/40 px-5 pr-12 text-sm text-gray-800
                           placeholder-gray-500 focus:border-gray-500 focus:outline-none"
              />
              <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
            </div>

            {/* Remember / Forgot */}
            <div className="mb-4 flex justify-between text-xs text-gray-700">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-gray-800" /> Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mb-5 w-full rounded-full bg-gray-800 py-3 text-base
                         font-semibold text-white hover:bg-gray-900 focus:outline-none"
            >
              Login
            </button>

            {/* Register link */}
            <p className="text-center text-xs text-gray-700">
              Don't have an account?
              <a
                href="#"
                className="ml-1 font-semibold hover:underline"
                onClick={(e) => {
                  e.preventDefault();   // stop page refresh
                  setAcc(false);        // hide login card or switch to register
                }}
              >
                Register
              </a>
            </p>
          </form>
        </div>
      )}


      {!acc && (                                  /* show modal only when acc === true */
        /* ───── modal ───── */
        <div
          className="w-[420px] rounded-lg bg-[#B0DB9C]/30 p-10 shadow-xl"
          onClick={(e) => e.stopPropagation()}   /* keep clicks inside */
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="mb-8 text-center text-3xl font-semibold text-gray-800">
              SignUp
            </h1>

            {/* Email */}
            <div className="relative mb-8 h-12 w-full">
              <input
                type="text"
                placeholder="Email"
                required
                className="h-full w-full rounded-full border border-gray-300
                           bg-white/40 px-5 pr-12 text-sm text-gray-800
                           placeholder-gray-500 focus:border-gray-500 focus:outline-none"
              />
              <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
            </div>

            {/* Password */}
            <div className="relative mb-8 h-12 w-full">
              <input
                type="password"
                placeholder="Password"
                required
                className="h-full w-full rounded-full border border-gray-300
                           bg-white/40 px-5 pr-12 text-sm text-gray-800
                           placeholder-gray-500 focus:border-gray-500 focus:outline-none"
              />
              <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
            </div>

             {/*Confirm Password */}
            <div className="relative mb-4 h-12 w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="h-full w-full rounded-full border border-gray-300
                           bg-white/40 px-5 pr-12 text-sm text-gray-800
                           placeholder-gray-500 focus:border-gray-500 focus:outline-none"
              />
              <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
            </div>

            {/* Remember / Forgot */}
            <div className="mb-4 flex justify-between text-xs text-gray-700">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-gray-800" /> Remember me
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mb-5 w-full rounded-full bg-gray-800 py-3 text-base
                         font-semibold text-white hover:bg-gray-900 focus:outline-none"
            >
              SignUp
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
