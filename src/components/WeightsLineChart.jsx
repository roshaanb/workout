import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect } from "react";
import axios from "axios";
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";
import { exerciseColors, exercises, yscaleMininum } from "../helpers";

const WeightsMaxLineChart = ({
  isDashboard = false,
  selectedExercises = exercises,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data/line")
      .then((response) => {
        const output = [];
        let out = response.data.data;
        out.forEach((exercise) => {
          const parsedData = JSON.parse(exercise.data);
          let parsedRow = {
            id: exercise.id,
            data: parsedData,
          };
          output.push(parsedRow);
        });
        setData(output);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  let selectedData = [];
  data.forEach((row) => {
    if (selectedExercises.includes(row.id)) selectedData.push(row);
  });

  return (
    <ResponsiveLine
      data={selectedData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: {
          text: { fill: colors.grey[100] },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : (el) => exerciseColors[el.id]}
      margin={{ top: 50, right: 110, bottom: 60, left: 60 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        min: yscaleMininum(selectedExercises),
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 33,
        format: (value) => {
          const [day, month, year] = [
            String(value.getDate()).padStart(2, "0"),
            String(value.getMonth() + 1).padStart(2, "0"),
            value.getFullYear(),
          ];
          return `${day}/${month}/${year}`;
        },
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "weight",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      enableCrosshair={false}
      enableGridX={false}
      enableGridY={false}
      tooltip={({ point }) => {
        const [year, month, day] = point.data.xFormatted.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        return (
          <Box
            backgroundColor={exerciseColors[point.serieId]}
            padding="6px 8px"
            color={colors.primary[500]}
          >
            <Typography variant="h8">
              {formattedDate}, <b>{point.data.y}kg</b>, {point.serieId}
            </Typography>
          </Box>
        );
      }}
      pointSize={5}
      pointColor={{ theme: "background" }}
      pointBorderWidth={5}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );
};

export default WeightsMaxLineChart;
