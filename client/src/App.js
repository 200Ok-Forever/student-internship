// import classes from "./App.module.scss";
import jwt_decode from "jwt-decode";
import { useContext, Fragment, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
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
import Applications from "./components/recruiter/Applications";
import RecommendedCandidates from "./components/recruiter/RecommendedCandidates";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ResumeCreator from "./components/educational/ResumeCreator";
import Chat from "./components/chat/Chat";
import Profile from "./components/student/Profile";
import { UserContext } from "./store/UserContext";
import UserPosts from './components/forum/UserPosts';
import CreateInternship from './components/recruiter/CreateInternship';
import EditStudentProfile from "./components/student/EditStudentProfile";
import StudentProfile from "./components/student/StudentProfile";
import { STUDENT_ROLE, RECRUITER_ROLE } from './constants';

const getSession = () => {
  const cookie = getCookie("user");
  if (!cookie) {
    return;
  }

  var decoded = jwt_decode(cookie);

  return {
    avatar: decoded.avatar,
    email: decoded.email,
    role: decoded.role,
    uid: decoded.uid,
    username: decoded.username,
    verification_code: decoded.verification_code,
    token: cookie,
  };
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function App() {
  const location = useLocation();
  const [user, setUser] = useState(getSession() || {});

  return (
    <Fragment>
      <UserContext.Provider value={{ user, setUser }}>
        {location.pathname !== "/chat" && <NavBar />}
        <Container
          maxWidth={false}
          className={location.pathname !== "/chat" && classes.rootContainer}
        >
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <PrivateRoute path="/calendar" exact component={Calendar} />
            <PrivateRoute path="/apply" exact component={ApplyIntern} />
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
            <Route
              path="/passwordreset/reset"
              exact
              component={ResetPassword}
            />
            <Route path="/resume-creator" exact component={ResumeCreator} />
            <Route path="/forum" exact component={Forum} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/editstudentprofile" exact component={EditStudentProfile} />
            <Route path="/studentprofile/:id" exact component={StudentProfile} />
            <PrivateRoute
              role={RECRUITER_ROLE}
              path="/applications"
              exact
              component={Applications}
            />
            <Route path="/profile" exact component={Profile} />
            <PrivateRoute
              path="/recommended-candidates"
              role={RECRUITER_ROLE}
              exact
              component={RecommendedCandidates}
            />
            <Route component={NarrowContainerRoutes} />
          </Switch>
        </Container>
      </UserContext.Provider>
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
        <Route path="/forum" exact component={Forum} />
        {INDUSTRIES.map((industry) => (
          <Route path={`/forum/${industry}`} component={IndustryForum} />
        ))}
        <Route path="/forum/me" component={UserPosts} />
        <Route path="/forum/posts" component={ForumPost} />
        <Route path="/forum/create" component={CreatePost} />
        <Route path="/forum/:id/edit" component={CreatePost} />
        <Route path="/forum/*" component={Forum} />
        <PrivateRoute role={STUDENT_ROLE} path="/saved" component={Saved} />
        <PrivateRoute role={STUDENT_ROLE} path="/history" component={History} />
        <Route path="/resources" exact component={Resources} />
        <PrivateRoute
          role={RECRUITER_ROLE}
          path="/job/create"
          exact
          component={CreateInternship}
        />
        <PrivateRoute
          role={RECRUITER_ROLE}
          path="/job/:id/edit"
          exact
          component={CreateInternship}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Box>
  );
};

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = !!user.token;
  const authorised = !role || user.role === role;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && authorised ? (
          <Component {...props} />
        ) : !isLoggedIn ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default App;
