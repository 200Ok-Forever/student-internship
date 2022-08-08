import { Typography, Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useContext, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useHistory } from "react-router-dom";
import { getLongUserInfo } from "../../api/auth-api";
import { UserContext } from "../../store/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // get user's infomations
  const [info, setInfo] = useState({});
  useEffect(() => {
    setLoading(true);
    const loadInfo = async () => {
      const res = await getLongUserInfo(user.uid);
      res.student_info.skills = res.student_info.skills.toString();
      setInfo(res.student_info);
      setLoading(false);
    };
    loadInfo();
  }, [user.uid]);

  const history = useHistory();

  return (
    <>
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "35px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, width: "60px", height: "60px" }}
              src={info.avatar}
            />
            <Typography variant="h4" fontWeight="bold" fontFamily="inherit">
              {info.first_name} {info.last_name}
            </Typography>
          </Box>
          <Box sx={{ width: "50vw" }}>
            {user.role === 1 && (
              <Button
                variant="outlined"
                sx={{ alignSelf: "flex-start" }}
                onClick={() => {
                  history.push("/editstudentprofile");
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          <ProfileInfo data={info} />
        </Box>
      )}
    </>
  );
};

export default Profile;
