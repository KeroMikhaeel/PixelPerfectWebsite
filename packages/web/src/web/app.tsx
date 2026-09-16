import { Route, Switch } from "wouter";
import Index from "./pages/index";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { SmoothScroll } from "./components/smooth-scroll";
import { Cursor } from "./components/cursor";
import { PointerTracker } from "./components/pointer-tracker";
import { AmbientField } from "./components/three/ambient-field";

function App() {
  return (
    <Provider>
      <SmoothScroll>
        <PointerTracker />
        <AmbientField />
        <Cursor />
        <Switch>
          <Route path="/" component={Index} />
        </Switch>
      </SmoothScroll>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
