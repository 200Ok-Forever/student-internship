// import classes from "./App.module.scss";
import { Fragment } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/404Page/NotFound";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Resources from "./components/educational/Resources";
import Forum from "./components/forum/Forum";
import IndustryForum from './components/forum/IndustryForum';
import ForumPost from './components/forum/ForumPost';
import CreatePost from './components/forum/CreatePost';
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

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container maxWidth={false} className={classes.rootContainer}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/apply" exact component={ApplyIntern} />
          <Route path="/search" exact component={JobList} />
          <Route path="/job" exact component={JobDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/student" exact component={StudentSignup} />
          <Route path="/signup/company" exact component={CompanySignup} />
          <Route path="/forum" exact component={Forum} />
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
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: smallScreen ? '100%' : '60%', margin: 'auto' }}>
      <Switch>
        {INDUSTRIES.map(industry => (
          <Route path={`/forum/${industry}`} component={IndustryForum} />
        ))}
        <Route path='/forum/posts' component={ForumPost} />
        <Route path='/forum/create' component={CreatePost} />
        <Route path="/forum/*" component={Forum} />
      </Switch>
    </Box>
  )
}

export default App;
