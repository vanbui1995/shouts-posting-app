import { useFind, useSubscribe, useTracker } from "meteor/react-meteor-data";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Required")
    .min(5, "Minimum 5 characters")
    .trim(),
  username: yup
    .string()
    .required("Required")
    .min(5, "Minimum 5 characters")
    .trim(),
  name: yup.string().required("Required").trim(),

  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function RegisterPage() {
  let navigate = useNavigate();
  let location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
  }>({
    resolver: yupResolver(validationSchema),
  });

  const [isLoading, setLoading] = useState(false);

  let from = location.state?.from?.pathname || "/";

  function handleSubmitForm(values: {
    username: string;
    password: string;
    name: string;
  }) {
    setLoading(true);
    Accounts.createUser(
      {
        username: values.username,
        password: values.password,
        profile: {
          name: values.name,
          image:
            "https://images.unsplash.com/photo-1577046848358-4623c0859b8a?w=200",
        },
      },
      (error: any) => {
        if (!error) {
          alert("Register successfully, Login automatically");
          navigate(from || "/app", { replace: true });
          reset();
        } else {
          console.log({ error });
          alert(error?.reason || "Unexpected error, please try again!");
          setLoading(false);
        }
      }
    );
  }
  const currentUser = useTracker(() => Meteor.user(), []);

  if (currentUser) {
    return <Navigate to={"/app"} />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                {...register("username")}
                id="username"
                name="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                render={({ message }) => (
                  <span className="text-red text-[0.85rem]">{message}</span>
                )}
                errors={errors}
                name="username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your Name
            </label>
            <div className="mt-2">
              <input
                {...register("name")}
                id="name"
                name="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                render={({ message }) => (
                  <span className="text-red text-[0.85rem]">{message}</span>
                )}
                errors={errors}
                name="name"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Have an account! Please Login
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                render={({ message }) => (
                  <span className="text-red text-[0.85rem]">{message}</span>
                )}
                errors={errors}
                name="password"
              />
            </div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900 mt-3"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-confirmPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                render={({ message }) => (
                  <span className="text-red text-[0.85rem]">{message}</span>
                )}
                errors={errors}
                name="confirmPassword"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-iceberg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
