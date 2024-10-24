import differenceBy from "lodash/differenceBy";
import { HOST_API } from "../config";
export const SCHEMA_OPTIONS = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

export function findDifference(array1, array2, key) {
  console.log(HOST_API, "AHHOSST");
  return differenceBy(array1, array2, key);
}
