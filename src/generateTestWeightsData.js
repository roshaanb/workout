import { exercises, ddmmyyyy } from "./helpers.js";
import { writeFile } from "fs";

const weightRanges = {
  // exercise: {reps: startWeight, ... }
  deadlift: { 6: 120, 8: 100, 10: 95 },
  squat: { 6: 85, 8: 77.5, 10: 75 },
  bench: { 6: 52.5, 8: 48.5, 10: 45 },
  "overhead press": { 6: 30, 8: 25, 10: 20 },
};

var mockData = [];
var date = new Date();

// loop through weights sessions
do {
  const numOfExercises = Math.ceil(Math.random() * 4);

  // create random combination of exercises for session
  var exercisesInSession = [...exercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, numOfExercises);

  exercisesInSession.forEach((exercise) => {
    var reps = 6 + Math.floor(Math.random() * 3) * 2;
    var sets = 3 + Math.round(Math.random());

    for (let i = 0; i < sets; i++) {
      mockData.push({
        date: ddmmyyyy(date),
        exercise,
        weight:
          weightRanges[exercise][reps] + 2.5 * Math.floor(Math.random() * 5),
        reps,
      });
    }
  });

  date.setDate(date.getDate() - 1 - Math.ceil(Math.random() * 4));
} while (date.getFullYear() > 2021);

const jsonData = JSON.stringify(mockData);

writeFile("mockData.json", jsonData, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("Data written to file");
  }
});
