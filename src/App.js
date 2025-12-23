import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import WeightsTable from "./scenes/weightsTable";
import WeightsGroupedTable from "./scenes/weightsGroupedTable";
import AddSession from "./scenes/addSession";
import WeightsVolumeBar from "./scenes/weightsVolumeBar";
import WeightsSessionLine from "./scenes/weightsSessionLine";
import WeightsMaxLine from "./scenes/weightsMaxLine";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weights" element={<WeightsTable />} />
              <Route
                path="/weights-grouped"
                element={<WeightsGroupedTable />}
              />
              <Route path="/add-session" element={<AddSession />} />
              <Route
                path="/weights-volume-bar"
                element={<WeightsVolumeBar />}
              />
              <Route
                path="/weights-session-line"
                element={<WeightsSessionLine />}
              />
              <Route path="/weights-max-line" element={<WeightsMaxLine />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
