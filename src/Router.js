import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Task from './components/Task';
import Login from "./components/auth/Login";
import useToken from "./components/auth/useToken";

export default function Roter() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Switch>
        <Route path="/result/(env)?/:env?/(module)?/:module?/(build_no)?/:build_no?" component={Task} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}