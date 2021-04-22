import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Task from './components/Task';


export default function Roter() {

  return (
    <Router>
      <Switch>
        <Route path="/result/(env)?/:env?/(module)?/:module?/(build_no)?/:build_no?" component={Task} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}