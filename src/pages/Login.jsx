import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../features/authfunctions/userLogin";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userToken, loading,user} = useSelector(
    (state) => state.user
  );
  const navigate=useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const userSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleFormSubmit = (values) => {
    dispatch(userLogin(values));
    console.log(values);
    // setSubmitting(true);
  };
 
  useEffect(() => {
  if(!loading&&userToken&&user?._id&&isAuthenticated){
 

      navigate("/")
    
  }
  }, [user, loading, isAuthenticated,userToken ]);
  return (
    <>
      <div className="flex min-h-[80vh] flex-1 flex-col justify-center items-center">
        <h2 className="mt-10 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
          Mobigic
        </h2>
        <div className=" px-6  w-[32rem] rounded-lg py-6 lg:px-8  shadow dark:border dark:bg-gray-lightest backdrop-blur-sm hover:backdrop-blur-lg dark:border-gray-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src={KsLogo}
            alt="Your Company"
          /> */}
            <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>

          <div className="mt-10 py-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              onSubmit={handleFormSubmit}
            >
              {() => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                    <div className="text-sm">
                        <a
                          href="/register"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Register
                        </a>
                      </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
