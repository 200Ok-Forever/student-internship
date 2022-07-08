// import classes from "./App.module.scss";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/404Page/NotFound";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Resources from "./components/educational/Resources";
import Forum from "./components/forum/Forum";
import IndustryForum from './components/forum/IndustryForum';
import Home from "./components/home/Home";
import Calendar from './components/home/Calendar';
import JobList from "./components/jobs/JobList";
import NavBar from "./components/appBar/NavBar";
import { Container } from "@mui/material";
import classes from "./App.module.scss";
import { INDUSTRIES } from "./components/forum/constants";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container maxWidth={false} className={classes.rootContainer}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/search" exact component={JobList} />
          <Route path="/job" exact component={JobList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forum" exact component={Forum} />
          {INDUSTRIES.map(industry => (
            <Route path={`/forum/${industry}`} component={IndustryForum} />
          ))}
          <Route path="/forum/*" component={Forum} />
          <Route path="/resources" exact component={Resources} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
