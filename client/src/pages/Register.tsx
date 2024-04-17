import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      navigate(location.state?.from?.pathname || "/login");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    mutation.mutate(data);
  };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label htmlFor="phoneNumber" className="text-sm">
                          Phone number
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="e.g: 081234567890"
                          {...register("phoneNumber", {
                            required: "Phone Number is required",
                            pattern: {
                              value: /^08(\d{3,4}-?){2}\d{3,4}$/,
                              message: "Invalid phone number",
                            },
                          })}
                        />
                        {errors.phoneNumber && (
                          <span className="text-sm text-red-500">
                            {errors.phoneNumber.message}
                          </span>
                        )}
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
                          id="email"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="e.g: example@mail.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="text-sm text-red-500">
                            {errors.email.message}
                          </span>
                        )}
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
                          id="firstName"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your first name ..."
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                        />
                        {errors.firstName && (
                          <span className="text-sm text-red-500">
                            {errors.firstName.message}
                          </span>
                        )}
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
                          id="lastName"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your last name ..."
                          {...register("lastName", {
                            required: "Last Name is required",
                          })}
                        />
                        {errors.lastName && (
                          <span className="text-sm text-red-500">
                            {errors.lastName.message}
                          </span>
                        )}
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
                          id="address"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your address for delivery ..."
                          {...register("address", {
                            required: "Address is required",
                          })}
                        />
                        {errors.address && (
                          <span className="text-sm text-red-500">
                            {errors.address.message}
                          </span>
                        )}
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
                          id="postalCode"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your postal code number ..."
                          {...register("postalCode", {
                            required: "Postal Code is required",
                            pattern: {
                              value: /^\d{5}$/,
                              message: "Invalid postal code",
                            },
                          })}
                        />
                        {errors.postalCode && (
                          <span className="text-sm text-red-500">
                            {errors.postalCode.message}
                          </span>
                        )}
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
                          id="password"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your password ..."
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 5,
                              message:
                                "Password must have at least 5 characters",
                            },
                          })}
                        />
                        {errors.password && (
                          <span className="text-sm text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="confirmPassword" className="text-sm">
                          Repeat your password
                          <span className="float-right text-lg text-red-600">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Repeat your password ..."
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              value === watch("password") ||
                              "The passwords do not match",
                          })}
                        />
                        {errors.confirmPassword && (
                          <span className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                          </span>
                        )}
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
