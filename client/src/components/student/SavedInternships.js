import React, { useState, useContext, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import JobBlock from "../jobs/JobBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../auth/UserContext";
import { getSavedInternships } from "../../api/internship-api";

// const internships = [
//   {
//     job_id: "aa",
//     company_id: "1",
//     title: "Software engineer intern",
//     description:
//       "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
//     location: "Sydney",
//     closed_date: "01/03/2023",
//     min_salary: "12",
//     max_salary: "40",
//     salary_currency: "AUD",
//     company_name: "Google",
//     company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
//     is_remote: "FALSE",
//     job_type: "Full-time",
//     status: "",
//   },
//   {
//     job_id: "aa",
//     company_id: "1",
//     title: "Software engineer intern",
//     description:
//       "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
//     location: "Sydney",
//     closed_date: "01/03/2023",
//     min_salary: "12",
//     max_salary: "40",
//     salary_currency: "AUD",
//     company_name: "Google",
//     company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
//     is_remote: "TRUE",
//     job_type: "Full-time",
//     status: "",
//   },
//   {
//     job_id: "aa",
//     company_id: "1",
//     title: "Software engineer intern",
//     description:
//       "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
//     location: "Sydney",
//     closed_date: "01/03/2023",
//     min_salary: "12",
//     max_salary: "40",
//     salary_currency: "AUD",
//     company_name: "Google",
//     company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
//     is_remote: "TRUE",
//     job_type: "Full-time",
//     status: "",
//   },
// ];

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const SavedInternships = () => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const getSaved = () => {
      // eslint-disable-next-line no-unused-vars
      const i = getSavedInternships(user.token);
    };
    getSaved();
  }, [user.token]);

  return (
    <Box sx={boxStyling} mb="30px">
      <Typography variant="h4" component="div">
        Saved Internships
      </Typography>
      <Box sx={boxStyling}>
        {internships.map((i) => (
          <JobBlock job={i} key={i.job_id}>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </JobBlock>
        ))}
      </Box>
    </Box>
  );
};

export default SavedInternships;
