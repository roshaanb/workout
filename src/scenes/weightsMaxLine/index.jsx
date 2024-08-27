import { useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";
import Header from "../../components/Header";
import WeightsMaxLineChart from "../../components/WeightsLineChart";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { exerciseColors, exercises } from "../../helpers";

const WeightsLine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleCheckboxChange = (exercise) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(exercise)
        ? prevSelected.filter((item) => item !== exercise)
        : [...prevSelected, exercise]
    );
  };

  const [selectedExercises, setSelectedExercises] = useState(exercises);

  return (
    <Box m="20px">
      <Header
        title={"Weights maximums line chart"}
        subtitle={"Time series of weight maximums (6 rep equivalent)"}
      />
      <Box height="75vh">
        <FormControl component="fieldset">
          <FormLabel
            style={{
              visibility: "visible",
              fontWeight: "bold",
              color: colors.grey[100],
            }}
            component="legend"
          >
            Select Exercises
          </FormLabel>
          <FormGroup row>
            {exercises.map((exercise) => (
              <FormControlLabel
                key={exercise}
                control={
                  <Checkbox
                    sx={{
                      color: exerciseColors[exercise],
                      "&.Mui-checked": {
                        color: exerciseColors[exercise],
                      },
                    }}
                    checked={selectedExercises.includes(exercise)}
                    onChange={() => handleCheckboxChange(exercise)}
                    name={exercise}
                  />
                }
                label={exercise}
              />
            ))}
          </FormGroup>
        </FormControl>
        <WeightsMaxLineChart selectedExercises={selectedExercises} />
      </Box>
    </Box>
  );
};

export default WeightsLine;
