import React from "react";
import {
  CardActionArea,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RESOURCES } from "./constants";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";

const Resources = () => {
  return (
    <Box>
      <Typography variant="h4">Educational Resources</Typography>
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        Learn everything about landing an internship from our hand-picked
        resouces!
      </Typography>
      <Alert
        action={
          <Button
            color="secondary"
            variant="outlined"
            component={RouterLink}
            to="/resume-creator"
          >
            Generate Resume
          </Button>
        }
        severity="info"
        variant="filled"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Use our Resume Generator to quickly and easily create a stand-out
        resume!
      </Alert>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 4 }}>
        <Box>
          <Typography variant="h5" mb={2}>
            General
          </Typography>
          <Grid container spacing={3}>
            {RESOURCES.general.map((r) => (
              <Grid item xs={12} md={6} lg={4}>
                <ResourceCard resource={r} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h5" mb={2}>
            Networking
          </Typography>
          <Grid container spacing={3}>
            {RESOURCES.networking.map((r) => (
              <Grid item xs={12} md={6} lg={4}>
                <ResourceCard resource={r} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h5" mb={2}>
            Resume and Cover Letter Writing
          </Typography>
          <Grid container spacing={3}>
            {RESOURCES.documents.map((r) => (
              <Grid item xs={12} md={6} lg={4}>
                <ResourceCard resource={r} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h5" mb={2}>
            Interviews
          </Typography>
          <Grid container spacing={3}>
            {RESOURCES.interviews.map((r) => (
              <Grid item xs={12} md={6} lg={4}>
                <ResourceCard resource={r} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const ResourceCard = ({ resource }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea onClick={() => window.open(resource.link, "_blank")}>
        <CardContent>
          <Grid container>
            <Grid item xs={2}>
              {resource.type === "article" ? (
                <ArticleIcon fontSize="large" color="primary" />
              ) : resource.type === "video" ? (
                <OndemandVideoIcon fontSize="large" color="primary" />
              ) : (
                <LanguageIcon fontSize="large" color="primary" />
              )}
            </Grid>
            <Grid item xs={10}>
              <Typography gutterBottom variant="h5" component="div">
                {resource.name}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                {resource.author}
              </Typography>
              <Typography variant="body1">{resource.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Resources;
