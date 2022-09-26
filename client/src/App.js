import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./components/views/HomePage/HomePage";
import DiaryPage from "./components/views/DiaryPage/DiaryPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CalendarPage from "./components/views/CalendarPage/CalendarPage";
import PlannerPage from "./components/views/PlannerPage/PlannerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/diary" element={<DiaryPage />} />
        <Route exact path="/calendar" element={<CalendarPage />} />
        <Route exact path="/planner" element={<PlannerPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
