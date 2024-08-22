import { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Weights = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const columns = [
    {
      field: "formatted_date",
      headerName: "Date",
      cellClassName: "name-column--cell",
      flex: 0.7,
    },
    {
      field: "exercise",
      headerName: "Exercise",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "reps",
      headerName: "Reps",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Weights" subtitle="Raw weights data" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            fontSize: "16px",
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none!important",
          },
        }}
      >
        <DataGrid
          density="compact"
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Weights;
