import React from 'react';
import { Box, Typography } from '@mui/material';
import JobBlock from "../jobs/JobBlock";
import RemoveButton from "../UI/RemoveButton";

const internships = [
  {
    job_id: "aa",
    company_id: "1",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
    city: "Sydney",
    closed_date: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    remote: true,
    job_type: "Full-time",
  },
  {
    job_id: "aa3",
    company_id: "2",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    job_type: "Full-time",
    remote: false,
  },
  {
    job_id: "aa1",
    company_id: "3",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    job_type: "Full-time",
    remote: true,
  },
];

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const PostedInternships = () => {
  return (
    <Box>
      <Typography variant="h4" component="div">
        Manage Your Internship Postings
      </Typography>
      <Box sx={boxStyling}>
        {internships.map((i) => (
          <JobBlock job={i} key={i.job_id}>
            <RemoveButton />
          </JobBlock>
        ))}
      </Box>    
    </Box>
  )
}

export default PostedInternships;