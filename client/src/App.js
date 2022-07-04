// import classes from "./App.module.scss";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/404Page/NotFound";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Resources from "./components/educational/Resources";
import Forum from "./components/forum/Forum";
import Home from "./components/home/Home";
import JobList from "./components/home/JobList";
import NavBar from "./components/appBar/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/job" exact component={JobList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forum" exact component={Forum} />
        <Route path="/resources" exact component={Resources} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
