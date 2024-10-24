import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import RHFAutocomplete from "../components/react-hook-form/rhf-autocomplete";
import { findDifference, SCHEMA_OPTIONS } from "../utils/options";
import FormProvider from "../components/react-hook-form/form-provider";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "../components/react-hook-form/rhf-textfield";
import useBoolean from "../hooks/use-boolean";
import { addBlog, getBlogs } from "../api/blog";

function BlogForm({ open, onClose }) {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    added_schemas: Yup.array()
      .of(
        Yup.object({
          schema: Yup.object().shape({
            id: Yup.string().required("Schema is Required"),
            label: Yup.string().required("Schema is Required"),
          }),
        }).required("schema is Required")
      )
      .min(1, "Atleast One Schema is Required"),
    add_schema: Yup.object()
      .shape({
        id: Yup.string().required("Schema is Required"),
        label: Yup.string().required("Schema is Required"),
      })
      .when("added_schemas", {
        is: (value) => !isEmpty(value),
        then: (schema) => schema.nullable(),
        otherwise: (schema) => schema.required("This Field is Required"),
      }),
  });
  const defaultValues = {
    add_schema: null,
    name: "",
    added_schemas: [],
  };
  const schemaAdded = useBoolean();
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, isValid },
    reset,
    trigger,
    setValue,
    watch,
  } = methods;
  const values = watch();
  console.log(values, "SOME");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "added_schemas",
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const options = {
        segment_name: get(data, "name"),
        schema: map(get(data, "added_schemas"), (el) => {
          return {
            [get(el, "schema.id")]: get(el, "schema.label"),
          };
        }),
      };
      const res = await addBlog(options);
      alert("Data Added Successfully");
      reset();
      onClose();
      console.log(options, "OPTIONSSS");
    } catch (err) {
      console.log(err, "ERRO");
    }
  });
  console.log(errors, "ERROR");

  useEffect(() => {
    if (schemaAdded.value) {
      setValue("add_schema", null);
      schemaAdded.onFalse();
    }
  }, [schemaAdded.value]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "60%", height: "80%" } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Saving Segment</DialogTitle>
        <DialogContent>
          <DialogTitle>Enter the name of the Segment</DialogTitle>
          <Stack gap={3}>
            <Stack>
              <RHFTextField name={"name"} label={"Name Of Schema"} />
            </Stack>
            {!isEmpty(get(errors, "added_schemas")) && (
              <Typography variant="caption" color="error">
                {get(errors, "added_schemas.message")}
              </Typography>
            )}
            {!isEmpty(fields) && (
              <Stack
                border={"1px solid blue"}
                height={"40%"}
                gap={3}
                padding={3}
              >
                {fields.map((el, idx) => {
                  return (
                    <Stack
                      key={el.id}
                      flexDirection={"row"}
                      gap={3}
                      width={"100%"}
                    >
                      <RHFAutocomplete
                        sx={{ width: "100%" }}
                        key={el.id}
                        label={"Added Schema"}
                        name={`added_schemas[${idx}].schema`}
                        options={map(
                          findDifference(
                            SCHEMA_OPTIONS,
                            map(values.added_schemas, (el) => {
                              return {
                                label: get(el, "schema.label"),
                                value: get(el, "schema.id"),
                              };
                            }),
                            "value"
                          ),
                          (el) => {
                            return {
                              id: get(el, "value"),
                              label: get(el, "label"),
                            };
                          }
                        )}
                      />
                      <Stack justifyContent={"center"}>
                        <Button
                          onClick={() => {
                            remove(idx);
                          }}
                          variant="contained"
                        >
                          -
                        </Button>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            )}
            <Stack gap={3}>
              <RHFAutocomplete
                sx={{ mt: 2 }}
                name={"add_schema"}
                options={map(
                  findDifference(
                    SCHEMA_OPTIONS,
                    map(values.added_schemas, (el) => {
                      return {
                        label: get(el, "schema.label"),
                        value: get(el, "schema.id"),
                      };
                    }),
                    "value"
                  ),
                  (el) => {
                    return {
                      id: get(el, "value"),
                      label: get(el, "label"),
                    };
                  }
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.label}
                label={"Add Schema To Segment"}
              />
              <Stack>
                <Button
                  onClick={() => {
                    if (!isEmpty(get(values, "add_schema.id"))) {
                      const result = {
                        id: get(values, "add_schema.id"),
                        label: get(values, "add_schema.label"),
                      };
                      append({
                        schema: result,
                      });
                      schemaAdded.onTrue();
                    } else {
                      schemaAdded.onFalse();
                    }
                  }}
                >
                  Add New Schema
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack flexDirection={"row-reverse"} gap={3}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

export default BlogForm;
