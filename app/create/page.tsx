"use client";
import React from "react";
/* eslint-disable */

import { useRequestMutation } from "../_http/axiosFetcher";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { trigger: createProject } = useRequestMutation("todos", {
    method: "POST",
    module: "devApi",
  });

  const initialValues = {
    name: "",
    surname: "",
    age: "",
    percent: "",
    status: "pending",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required"),
    percent: Yup.number()
      .typeError("Percent must be a number")
      .required("Percent is required")
      .max(100, "Percent cannot be more than 100"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await createProject({
        body: values,
      });
      router.push("/");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-2">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="text"
                name="surname"
                placeholder="Surname"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="surname"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="number"
                name="age"
                placeholder="Age"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="number"
                name="percent"
                placeholder="Percent"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="percent"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                as="select"
                name="status"
                className="border p-2 rounded w-full"
              >
                <option value="pending">Pending</option>
                <option value="accept">Accepted</option>
                <option value="reject">Rejected</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
