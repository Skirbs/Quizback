import Nav from "./components/main/navigation/Nav";
import Home from "./components/main/home/Home";
import CardQuiz from "./components/main/card_quiz/CardQuiz";
import CardGroup from "./components/main/card_group/CardGroup";
import {Routes, Route, Navigate} from "react-router-dom";
import DataContextComponent from "./store/DataContext";
import UtilContextComponent from "./store/UtilContext";
function App() {
  return (
    <UtilContextComponent>
      <DataContextComponent>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<CardGroup />} />
          <Route path="/quiz" element={<CardQuiz />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DataContextComponent>
    </UtilContextComponent>
  );
}

export default App;
