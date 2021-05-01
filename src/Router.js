import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import PageResult from './components/results/PageResult';
import Task from './components/tasks/Task';
import NewTask from './components/tasks/NewTask';
import ViewTask from './components/tasks/ViewTask';
import EditTask from './components/tasks/EditTask';
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
        <Route path="/new" component={NewTask} />
        <Route path="/view/(taskId)?/:taskId?" component={ViewTask} />
        <Route path="/edit/(taskId)?/:taskId?" component={EditTask} />
        <Route path="/pageResults" component={PageResult} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}