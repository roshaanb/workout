import { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { sortDate } from "../../helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const WeightsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [countedRows, setCountedRows] = useState([]);
  const [open, setOpen] = useState(false);

  const refreshData = () => {
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  };

  const deleteRows = (idsArray) => {
    idsArray.forEach((id) => {
      axios
        .delete(`http://localhost:3001/api/data/${id}`)
        .then(() => {
          refreshData();
        })
        .catch((error) => {
          console.error("There was an error deleting the row", error);
        });
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      cellClassName: "name-column--cell",
      flex: 0.7,
      sortComparator: sortDate,
      sortingOrder: ["desc", "asc"],
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
    <Box
      m="20px"
      onKeyDown={(e) => {
        if (e.key === "Backspace" && countedRows.length) {
          setOpen(true);
        }
      }}
    >
      <Header title="Weights" subtitle="Raw weights data" />
      <Box
        m="-20px 0 0 0"
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
          checkboxSelection
          initialState={{
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          sx={
            countedRows.length < 1
              ? {
                  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                    {
                      display: "none",
                    },
                }
              : null
          }
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(ids) => setCountedRows(ids)}
        />
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          disabled={countedRows.length === 0 || countedRows.length > 9}
          color="error"
          sx={{
            mt: "10px",
            height: "40px",
            width: "150px",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete Row{countedRows.length > 1 ? "s" : ""}
        </Button>

        <Dialog
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          keepMounted
        >
          <DialogContent
            sx={{
              mb: "-20px",
              fontSize: "160px",
              backgroundColor: colors.redAccent[700],
            }}
          >
            <DialogContentText sx={{ fontSize: "20px" }}>
              {countedRows.length > 1
                ? "Delete these rows?"
                : "Delete this row?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: colors.redAccent[700],
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                setOpen(false);
              }}
              autoFocus
              sx={{ color: colors.primary[100] }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                deleteRows(countedRows);
                setOpen(false);
              }}
              sx={{ color: colors.primary[100] }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          startIcon={<RefreshIcon />}
          variant="contained"
          color="success"
          sx={{
            mt: "10px",
            ml: "10px",
            height: "40px",
            width: "150px",
          }}
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
};

export default WeightsTable;
