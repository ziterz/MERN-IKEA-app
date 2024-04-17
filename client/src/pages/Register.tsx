import Header from "../components/Header";

const Register = () => {
  return (
    <>
      <Header />
      <main>
        <section id="carousel">
          <div className="container m-auto">
            <div className="mt-32 grid grid-cols-2 gap-4">
              <div className="flex justify-center align-middle">
                <div className="w-3/5 px-2">
                  <h2 className="mb-6 text-4xl font-bold">
                    Create personal account
                  </h2>
                  <span>Login to IKEA Family Account</span>
                </div>
              </div>
              <div>
                <div className="justify-left flex align-middle">
                  <div className="w-2/3">
                    <form>
                      <div className="mb-4">
                        <label htmlFor="phoneNumber" className="text-sm">
                          Phone number
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="e.g: 081234567890"
                        />
                      </div>
                      <div className="mb-4">
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
                          placeholder="e.g: example@mail.com"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="firstName" className="text-sm">
                          First Name
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your first name ..."
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="lastName" className="text-sm">
                          Last Name
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your last name ..."
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="address" className="text-sm">
                          Address
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your address for delivery ..."
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="postalCode" className="text-sm">
                          Postal Code
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your postal code number ..."
                        />
                      </div>
                      <div className="mb-4">
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
                          placeholder="Enter your password ..."
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="confirmPassword" className="text-sm">
                          Repeat your confirmPassword
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Repeat your password ..."
                        />
                      </div>
                      <div className="mb-4">
                        <button
                          type="submit"
                          className="w-full rounded-full bg-sky-700 px-4 py-4 text-sm font-bold text-white hover:bg-sky-800"
                        >
                          Create account
                        </button>
                      </div>
                    </form>
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

export default Register;
