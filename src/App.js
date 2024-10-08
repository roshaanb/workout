import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import WeightsTable from "./scenes/weightsTable";
import WeightsGroupedTable from "./scenes/weightsGroupedTable";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import AddSession from "./scenes/addSession";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import WeightsSessionLine from "./scenes/weightsSessionLine";
import WeightsMaxLine from "./scenes/weightsMaxLine";
import Geography from "./scenes/geography";
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
              <Route path="/team" element={<Team />} />
              <Route path="/weights" element={<WeightsTable />} />
              <Route path="/weights-grouped" element={<WeightsGroupedTable />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/add-session" element={<AddSession />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route
                path="/weights-session-line"
                element={<WeightsSessionLine />}
              />
              <Route path="/weights-max-line" element={<WeightsMaxLine />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
