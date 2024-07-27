import { ErrorMessage, Field } from 'formik'
import React from 'react'

const InputField = ({label,name,type,required}) => {
  return (

    <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <Field
      id={name}
      name={name}
      type={type?type:"text"}
      autoComplete={name}
      required={required?required:false}
      className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-600 text-sm mt-1"
    />
  </div>
  )
}

export default InputField
