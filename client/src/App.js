// import classes from "./App.module.scss";
import { Fragment, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Route, Switch, useLocation } from "react-router-dom";
import NotFound from "./components/404Page/NotFound";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Resources from "./components/educational/Resources";
import Forum from "./components/forum/Forum";
import IndustryForum from "./components/forum/IndustryForum";
import ForumPost from "./components/forum/ForumPost";
import CreatePost from "./components/forum/CreatePost";
import Home from "./components/home/Home";
import Calendar from "./components/home/Calendar";
import JobList from "./components/jobs/JobList";
import NavBar from "./components/appBar/NavBar";
import { Container, Box } from "@mui/material";
import classes from "./App.module.scss";
import { INDUSTRIES } from "./components/forum/constants";
import StudentSignup from "./components/auth/StudentSignup";
import CompanySignup from "./components/auth/CompanySignup";
import JobDetail from "./components/jobs/JobDetail";
import ApplyIntern from "./components/jobs/ApplyIntern";
import Saved from "./components/student/SavedInternships";
import History from "./components/student/History";
import Company from "./components/company/Company";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Chat from "./components/chat/Chat";
import { ChatEngineWrapper, Socket } from "react-chat-engine";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <NavBar />
      <Container
        maxWidth={false}
        className={location.pathname !== "/chat" && classes.rootContainer}
      >
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/apply" exact component={ApplyIntern} />
          <Route path="/search" exact component={JobList} />
          <Route path="/job" exact component={JobDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/company" exact component={Company} />
          <Route path="/signup/student" exact component={StudentSignup} />
          <Route path="/signup/company" exact component={CompanySignup} />
          <Route
            path="/passwordreset/send"
            exact
            component={ForgottenPassword}
          />
          <Route path="/passwordreset/reset" exact component={ResetPassword} />
          <Route path="/forum" exact component={Forum} />
          <Route path="/chat" exact component={Chat} />
          <Route component={NarrowContainerRoutes} />
          <Route path="/resources" exact component={Resources} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
}

// width is smaller because they don't need that much space
const NarrowContainerRoutes = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: smallScreen ? "100%" : "60%", margin: "auto" }}>
      <Switch>
        {INDUSTRIES.map((industry) => (
          <Route path={`/forum/${industry}`} component={IndustryForum} />
        ))}
        <Route path="/forum/posts" component={ForumPost} />
        <Route path="/forum/create" component={CreatePost} />
        <Route path="/forum/*" component={Forum} />
        <Route path="/saved" component={Saved} />
        <Route path="/history" component={History} />
      </Switch>
    </Box>
  );
};

export default App;
