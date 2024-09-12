"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";

import { useRequestMutation } from "../../_http/axiosFetcher";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { mutate } from "swr";

export default function EditModal({
  card,
  onClose,
}: {
  card: any;
  onClose: () => void;
}) {
  const initialValues = {
    name: card?.name || "",
    surname: card?.surname || "",
    age: card?.age || "",
    percent: card?.percent || "",
    status: card?.status || "pending",
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

  const { trigger: updateProject } = useRequestMutation("dataWithId", {
    method: "PUT",
    module: "devApi",
  });

  const handleEdit = async (values: any) => {
    try {
      await updateProject({
        body: values,
        dynamicValue: card._id,
      });
      mutate("todo");

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Details</h2>
        <Formik
          onSubmit={handleEdit}
          initialValues={initialValues}
          validationSchema={validationSchema}
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

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white p-2 rounded"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
