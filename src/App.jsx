import Nav from "./components/main/navigation/Nav";
import Home from "./components/main/home/Home";
import CardQuiz from "./components/main/card_quiz/CardQuiz";
import CardGroup from "./components/main/card_group/CardGroup";
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<CardGroup />} />
        <Route path="/quiz" element={<CardQuiz />} />
      </Routes>
    </>
  );
}

export default App;
