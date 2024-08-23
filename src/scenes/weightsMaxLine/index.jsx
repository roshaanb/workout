import { Box } from "@mui/material";
import Header from "../../components/Header";
import WeightsMaxLineChart from "../../components/WeightsLineChart";

const WeightsLine = () => {
  return (
    <Box m="20px">
      <Header title={"Weights maximums line chart"} subtitle={"Time series of weight maximums (6 rep equivalent)"} />
      <Box height="75vh">
        <WeightsMaxLineChart />
      </Box>
    </Box>
  );
};

export default WeightsLine;
