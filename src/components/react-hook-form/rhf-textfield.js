import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function RHFTextField({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          onChange={(event) => {
            field.onChange(event.target.value);
          }}
          value={field.value}
          label={label}
          error={!!error}
          helperText={error ? error.message : ""}
          {...other}
        />
      )}
    />
  );
}

export default RHFTextField;
