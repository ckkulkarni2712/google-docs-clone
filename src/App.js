import "./App.css";
import TypeArea from "./Components/Spreadsheet/TypeArea";
import { store } from "./Redux/Store/store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { database } from "./Server/Firebase";
import Home from "./Components/SplashScreen/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/app/*" element={<Home database={database} />} />
            <Route
              path="/app/document/:id"
              element={<TypeArea database={database} />}
            />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
