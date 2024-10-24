import React from "react";
import { FormProvider as Form } from "react-hook-form";
function FormProvider({ children, methods, onSubmit }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

export default FormProvider;
