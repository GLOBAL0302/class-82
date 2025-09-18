import { Route, Routes } from "react-router-dom";
import ArtistsFeature from "./features/Artists/ArtistsFeature";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtistsFeature />} />
      </Routes>
    </>
  );
}

export default App;
