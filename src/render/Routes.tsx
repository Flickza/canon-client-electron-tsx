import {
  Route,
  HashRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import RouterPaths from "@/render/utils/routes.json";
import HomePage from "@/render/components/HomePage";
import Home from "@/render/components/Home";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            caseSensitive
            path="/"
            element={<Navigate replace to={RouterPaths.HOME} />}
          />
          <Route caseSensitive path={RouterPaths.HOME} element={<Home />} />
          <Route
            caseSensitive
            path="/HomePage"
            element={<Navigate replace to={RouterPaths.HOME} />}
          />
          <Route caseSensitive path={RouterPaths.HOME} element={<HomePage />} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
