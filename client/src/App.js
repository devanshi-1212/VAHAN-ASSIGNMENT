import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notifications } from "react-push-notification";
import Dashboard from "./pages/Dashboard";
import CreateTable from "./pages/CreateTable";
import TableCard from "./pages/TableCard";
import { CssBaseline } from "@mui/material";
import "./global.css";
import LoginPage from "./pages/LoginPage";
// import dotenv from "dotenv";

// dotenv.config();

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createtable" element={<CreateTable />} />
          <Route path="/tables/:tableName" element={<TableCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
