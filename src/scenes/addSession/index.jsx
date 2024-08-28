import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "../../components/Header";
import { exercises } from "../../helpers";

let today = new Date().toJSON().slice(0, 10);

const initialValues = {
  date: today,
  reps: 6,
};

const sessionSchema = yup.object().shape({
  date: yup
    .date()
    .typeError("please enter a valid date")
    .min("2000-01-01", "invalid date")
    .max("2100-01-01", "invalid date")
    .required("required"),
  exercise: yup.string().oneOf(exercises).required("required"),
  weight: yup
    .number()
    .typeError("please enter a number")
    .min(1, "weight must be greater than 0")
    .required("required"),
  reps: yup
    .number()
    .typeError("please enter a number")
    .min(1, "reps must be greater than 0")
    .required("required"),
});

const AddSession = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values)
    alert("Session added successfully");
  };

  return (
    <Box m="20px">
      <Header title="Add weights session" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={sessionSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                sx={{ gridColumn: "span 2" }}
                options={exercises}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    label="Exercise"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.exercise && !!errors.exercise}
                    helperText={touched.exercise && errors.exercise}
                    name="exercise"
                    {...params}
                  />
                )}
                onChange={(e, value) => {
                  handleChange({ target: { name: "exercise", value } });
                }}
                value={values.exercise}
                onBlur={handleBlur}
                name="exercise"
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Weight (kg)"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Reps"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reps}
                name="reps"
                error={!!touched.reps && !!errors.reps}
                helperText={touched.reps && errors.reps}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add new session
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddSession;
