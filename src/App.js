import { Timeline } from "./Timeline/Timeline";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Timeline />
      </div>
    </RecoilRoot>
  );
}

export default App;
