// import { Autocomplete, TextField } from "@mui/material";
// import React from "react";
// import { Controller, useFormContext } from "react-hook-form";

// function RHFAutocomplete({ name, label, ...other }) {
//   const { control, setValue } = useFormContext();
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Autocomplete
//           {...field}
//           onChange={
//             (event, value) => {
//               console.log(setValue, "VALL");
//               // setValue(name, value, { shouldValidate: true });
//             }
//             // setValue(name, value, { shouldValidate: true })
//           }
//           disableClearable
//           renderInput={(params) => (
//             <TextField
//               label={label}
//               error={!!error}
//               helperText={error && error?.message}
//               {...params}
//             />
//           )}
//           {...other}
//         />
//       )}
//     ></Controller>
//   );
// }

// export default RHFAutocomplete;

import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function RHFAutocomplete({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, value) => {
            field.onChange(value);
          }}
          disableClearable
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error.message : ""}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

export default RHFAutocomplete;
