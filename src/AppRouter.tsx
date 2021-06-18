import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import UVDashboard from './modules/uv_dashboard/uv_dashboard';
import Settings from "./modules/uv_settings/uv_settings";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>

          <Redirect exact from="/" to={process.env.PUBLIC_URL + "/"} />

          <Route path={process.env.PUBLIC_URL + "/settings"}>
            <Settings></Settings>
          </Route>

          <Route path={'/'}>
            <UVDashboard ></UVDashboard>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
