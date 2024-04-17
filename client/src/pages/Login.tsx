import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate(location.state?.from?.pathname || "/");
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
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
                  <h2 className="text-4xl font-bold">
                    Login to IKEA Family Account
                  </h2>
                </div>
              </div>
              <div>
                <div className="justify-left flex align-middle">
                  <div className="w-3/5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-6">
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
                          placeholder="Enter your email address"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors.email && (
                          <span className="text-sm text-red-500">
                            {errors.email.message}
                          </span>
                        )}
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
                          id="password"
                          className="w-full rounded border border-gray-400 px-5 py-3 text-sm"
                          placeholder="Enter your password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                        {errors.password && (
                          <span className="text-sm text-red-500">
                            {errors.password.message}
                          </span>
                        )}
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
                        to={`/register`}
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

export default Login;
