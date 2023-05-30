
import { FormControl } from "@mui/material";
import FormAddCategorization from "../../components/PostAd/FormProductCategorization/FormAddCategorization";
import { useForm } from "react-hook-form";

const FAKES_OPTION_DATA = [
  { id: 1, optionName: "Memory" },
  { id: 2, optionName: "RAM" },
  { id: 3, optionName: "ROM" },
];

const OTHER_DATA = [{ id: 1, optionName: "Other" }];

const Demo = () => {
  const methods = useForm();


  return <FormControl {...methods}>
    <FormAddCategorization />
  </FormControl>;
};

export default Demo;
