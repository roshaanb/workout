export const sortDate = (a, b) => {
  var aa = a.split("/").reverse().join(),
    bb = b.split("/").reverse().join();
  return aa < bb ? -1 : aa > bb ? 1 : 0;
};

export const exerciseColors = {
  deadlift: "#fc8d62",
  squat: "#e78ac3",
  bench: "#66c2a6",
  "overhead press": "#8ea0cb",
};

export const exercises = Object.keys(exerciseColors);

export const yscaleMininum = (selectedExercises) => {
  if (selectedExercises.includes("overhead press")) return "20";
  else if (selectedExercises.includes("bench")) return "40";
  else if (selectedExercises.includes("squat")) return "60";
  else if (selectedExercises.includes("deadlift")) return "90";
  else return "auto";
};
