import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "../../components/Header";
import { exercises } from "../../helpers";
import { useState, useEffect } from "react";
import axios from "axios";

let today = new Date().toJSON().slice(0, 10);

let initialValues = {
  date: today,
  reps: 6,
  weight: 0,
};

const latestWeightVals = {
  deadlift: 0,
  bench: 0,
  squat: 0,
  "overhead press": 0,
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
  const [data] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data/line")
      .then(({ data: { data: exercises } }) => {
        exercises.forEach(({ id, data }) => {
          latestWeightVals[id] = JSON.parse(data)[0].y;
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log("submitted values", values);
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
                  if (value === "bench") {
                    handleChange({
                      target: { name: "weight", value: latestWeightVals.bench },
                    });
                  } else if (value === "deadlift") {
                    handleChange({
                      target: {
                        name: "weight",
                        value: latestWeightVals.deadlift,
                      },
                    });
                  } else if (value === "overhead press") {
                    handleChange({
                      target: {
                        name: "weight",
                        value: latestWeightVals["overhead press"],
                      },
                    });
                  } else if (value === "squat") {
                    handleChange({
                      target: { name: "weight", value: latestWeightVals.squat },
                    });
                  }
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
