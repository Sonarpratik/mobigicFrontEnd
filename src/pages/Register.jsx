// Login.jsx
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { message } from "antd";
import { useSelector } from "react-redux";
import { useCreateUserMutation } from "../features/allApi";
import InputField from "../atom/InputField";
import EResponse from "../atom/EResponse";
import { Link } from "react-router-dom";

const handleFormSubmit = ({
  values,
  createUser,
}) => {
  // setTimeout(() => {
  //   console.log(JSON.stringify(values, null, 2));
  //   setSubmitting(false);
  // }, 400);


  if (values.password !== values.cpassword) {
    return message.error("Password dont match");
  }


    createUser(values);
  
};
const Register = () => {


  const { isAuthenticated, userToken, user } = useSelector(
    (state) => state.user
  );
  const userType = ["Client", "System"];



  const initialValues = {
    name: "",
    phone: "",
    email: "",
    // profile_pic: null,
    password: "",
    cpassword: "",
  };

  const userSchema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    phone: yup.string().required("Mobile No. is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string(),
    cpassword: yup.string(),
  });

  const [createUser, GetUserResponse] = useCreateUserMutation();

  return (
    <>
  
  <EResponse
        error={GetUserResponse?.error?.data?.message}
        Response={GetUserResponse}
        type={"create"}
        navigateTo={"/login"}
      />
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

        <div className="mt-10 sm:mx-auto sm:w-full ">
          <Formik
            initialValues={ initialValues}
            validationSchema={userSchema}
            onSubmit={(values) =>
              handleFormSubmit({
                values,
                createUser,
              })
            }
          >
            {({ isSubmitting, setFieldValue, errors }) => (
              <Form className="space-y-6">
                {console.log(errors)}
            

              

          

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile No.
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
            

           
           
                {/* <div>
                  <label
                    htmlFor="profile_pic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Picture
                  </label>
                  <input
                    id="profile_pic"
                    name="profile_pic"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue(
                        "profile_pic",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  <ErrorMessage
                    name="profile_pic"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div> */}
        
                    <InputField
                      required={true}
                      type={"password"}
                      name={"password"}
                      label={"Password"}
                    />
                    <InputField
                      required={true}
                      type={"password"}
                      name={"cpassword"}
                      label={"Confirm Password"}
                    />
            
            <div className="text-sm">
                        <Link
                          to="/login"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                         Have An Account
                        </Link>
                      </div>
                <div>
                  <button
                    type="submit"
                    disabled={false}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {
                    GetUserResponse?.isLoading
                      ? "Loading..."
                   
                      : "Register"}
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

export default Register;
