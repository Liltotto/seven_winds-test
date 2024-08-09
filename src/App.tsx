import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import ProjectsList from "./components/ProjectsList/ProjectsList";

import "./App.scss";

function App() {
  return (
    <>
      <Header />
      <div className="common-section">
        <ProjectsList />
        <MainSection />
      </div>
    </>
  );
}

export default App;
