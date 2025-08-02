import { Routes, Route } from "react-router-dom";
import StreamPage from "./pages/StreamPage.tsx";
import WatchPage from "./pages/WatchPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/stream" element={<StreamPage />} />
      <Route path="/watch" element={<WatchPage />} />
    </Routes>
  );
}

export default App;
