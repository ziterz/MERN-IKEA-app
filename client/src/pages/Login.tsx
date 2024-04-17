import { Link } from "react-router-dom";
import Header from "../components/Header";

const Auth = () => {
  return (
    <>
      <Header />
      <main>
        <section id="carousel">
          <div className="container m-auto">
            <div className="mt-32 grid grid-cols-2 gap-4">
              <div className="flex justify-center align-middle">
                <div className="w-3/5 px-2">
                  <h2 className="text-4xl font-bold">
                    Login to IKEA Family Account
                  </h2>
                </div>
              </div>
              <div>
                <div className="flex justify-center align-middle">
                  <div className="w-3/5">
                    <form>
                      <div className="mb-6">
                        <label htmlFor="email" className="text-sm">
                          Email
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="password" className="text-sm">
                          Password
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className="mb-4">
                        <button
                          type="submit"
                          className="w-full rounded-full bg-sky-700 px-4 py-4 text-sm font-bold text-white hover:bg-sky-800"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center">
                      <Link
                        to={"/register"}
                        className="text-sm font-bold text-sky-700"
                      >
                        Register a new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Auth;
