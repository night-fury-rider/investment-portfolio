import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import UVDashboard from './modules/uv_dashboard/uv_dashboard';
import Settings from "./modules/uv_settings/uv_settings";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/settings">
            <Settings></Settings>
          </Route>
          <Route path="/">
            <UVDashboard ></UVDashboard>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
