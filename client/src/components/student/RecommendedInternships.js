import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "../UI/Card";
import ScrollableRow from "../UI/ScrollableRow";
import { getInternshipRecommendations } from "../../api/internship-api";
import { UserContext } from "../../store/UserContext";

const RecommendedInternships = () => {
  const [recommend, setRecommend] = useState([]);
  const [recentlyPosted, setRecentlyPosted] = useState([]);
  const [closingSoon, setClosingSoon] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getJobs = async (type) => {
      const resp = await getInternshipRecommendations(type, user.token);
      if (type === "recommend") {
        setRecommend(resp);
      } else if (type === "new") {
        setRecentlyPosted(resp);
      } else {
        setClosingSoon(resp);
      }
    };
    getJobs("recommend");
    getJobs("new");
    getJobs("closing");
  }, [user.token]);

  return (
    <Box>
      <Typography variant="h5" component="div" gutterBottom fontWeight={700}>
        Recommended for You
      </Typography>
      <ScrollableRow>
        {recommend?.map((i) =>
          i.map((item, idx) => (
            <Card
              title={item.title}
              itemId={idx}
              subheading={item.company_name}
              media={item.company_logo}
              to={`/job?id=${item.job_id}`}
            >
              {item.description}
            </Card>
          ))
        )}
      </ScrollableRow>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        fontWeight={700}
        mt="60px"
      >
        Recently Posted
      </Typography>
      <ScrollableRow>
        {recentlyPosted?.map((i) =>
          i.map((item, idx) => (
            <Card
              title={item.title}
              itemId={idx}
              subheading={item.company_name}
              media={item.company_logo}
              to={`/job?id=${item.job_id}`}
            >
              {item.description}
            </Card>
          ))
        )}
      </ScrollableRow>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        fontWeight={700}
        mt="30px"
      >
        Closing Soon
      </Typography>
      <ScrollableRow>
        {closingSoon?.map((i) =>
          i.map((item, idx) => (
            <Card
              title={item.title}
              itemId={idx}
              subheading={item.company_name}
              media={item.company_logo}
              to={`/job?id=${item.job_id}`}
            >
              {item.description}
            </Card>
          ))
        )}
      </ScrollableRow>
    </Box>
  );
};

export default RecommendedInternships;
