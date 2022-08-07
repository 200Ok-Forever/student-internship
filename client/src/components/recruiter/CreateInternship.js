import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import {
  Link,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import { CURRENCY_CODES } from "./constants";
import SkillsSelect from "../UI/SkillsSelect";
import { postInternshipValidationSchema } from './validation_schema';
import { postInternship, putInternship } from "../../api/company-api";
import { UserContext } from "../../store/UserContext";
import moment from "moment";

const CreateInternship = () => {
  const location = useLocation();
  const job = location.state?.job;
  const history = useHistory();
  const [paid, setPaid] = useState(!job || job.max_salary > 0);
  const { user } = useContext(UserContext)

  if (location.path === "/job/edit" && !job) {
    history.push("/")
  };

  const formik = useFormik({
    initialValues: {
      title: job?.title || "",
      closed_date: (job && moment(job.closeDate, "YYYY-MM-DD hh:mm:ss")) || moment(),
      type: job?.type || "full time",
      apply_link: job?.apply_link || "",
      is_remote: job?.is_remote === "true" || false,
      city: job?.city || "",
      description: job?.description ||"",
      google_link: "",
      min_salary: job?.min_salary || 0,
      max_salary: job?.max_salary || 0,
      salary_currency: job?.salary_currency || "USD",
      steps: job?.processes || [""],
      questions: job?.questions || [""],
      cover_letter: job?.require_coverLetter || false,
      resume: job?.require_resume || true,
      skills: job?.skills || []
    },
    validationSchema: postInternshipValidationSchema,
    onSubmit: async values => {
      let data = {
        apply_link: values.apply_link,
        type: values.type,
        title: values.title,
        is_remote: values.is_remote.toString(),
        description: values.description,
        google_link: values.google_link,
        expiration_time: values.closed_date.format("YYYY-MM-DD 23:59:00"),
        min_salary: parseInt(values.min_salary),
        max_salary: parseInt(values.max_salary),
        salary_currency: values.salary_currency,
        recruiting_process: values.steps,
        application: {
          resume: values.resume,
          coverLetter: values.cover_letter,
          questions: values.questions
        },
        city: values.city,
        skills: values.skills.map(s => s.name)
      }
      const res = job ?
        await putInternship(job.id, data, user.token)
      : await postInternship(user.uid, data, user.token)
      
      if (res.message === "Successfuly") {
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (!paid) {
      formik.setFieldValue("min_salary", 0);
      formik.setFieldValue("max_salary", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {job ? "Edit" : "Post"} an Internship
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }} mt={4}>
        <Typography variant="h5" component="div">
          General Details
        </Typography>
        <TextField
          id="title"
          name="title"
          required
          label="Position Title"
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Application Close Date"
              inputFormat="DD/MM/yyyy"
              value={formik.values.closed_date}
              onChange={val => formik.setFieldValue("closed_date", val)}
              required 
              id="closed_date" 
              name="closed_date"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            id="city"
            name="city"
            label="City"
            required
            variant="outlined"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
              />
            }
            label="Paid Role"
          />
          <FormControl>
            <InputLabel id="currency">Salary Currency</InputLabel>
            <Select
              labelId="currency"
              disabled={!paid}
              id="salary_currency"
              name="salary_currency"
              label="Salary Currency"
              value={formik.values.salary_currency}
              onChange={formik.handleChange}              
            >
              {CURRENCY_CODES.map((c) => (
                <MenuItem value={c} key={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <CurrencyTextField
            label="Min Salary"
            id="min_salary"
            name="min_salary"
            variant="outlined"
            currencySymbol="$"
            minimumValue="0"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            disabled={!paid}
            value={formik.values.min_salary}
            onChange={(e, v) => formik.setFieldValue("min_salary", v)} 
          />
          <CurrencyTextField
            label="Max Salary"
            id="max_salary"
            name="max_salary"
            required
            variant="outlined"
            currencySymbol="$"
            minimumValue="0"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            disabled={!paid}
            value={formik.values.max_salary}
            onChange={(e, v) => formik.setFieldValue("max_salary", v)} 
          />
        </Box>
        <Box>
          <TextField
            id="apply_link"
            fullWidth
            name="apply_link"
            label="External Application Link"
            variant="outlined"
            value={formik.values.apply_link}
            onChange={formik.handleChange}
          />    
        </Box>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                id="is_remote"
                name="is_remote"
                value={formik.values.is_remote}
                onChange={(e) => formik.setFieldValue("is_remote", e.target.checked)} 
              />
            }
            label="Remote Role"
          />
          <FormControl>
            <InputLabel id="type">Job Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              name="type"
              label="Job Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              required
            >
              <MenuItem value="full time">Full Time</MenuItem>
              <MenuItem value="part time">Part Time</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <SkillsSelect 
            defaultValue={formik.values.skills}
            label="Necessary Skills" 
            onChange={(event, value) => {
              formik.setFieldValue("skills", value);
            }}
            value={formik.values.skills}
          />
        </Box>
        <Box>
          <TextField
            id="description"
            name="description"
            label="Role Description"
            required
            placeholder="A description of the role"
            multiline
            rows={5}
            value={formik.values.description}
            onChange={formik.handleChange} 
            fullWidth
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        <Box>
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            Recruitment Process
          </Typography>
          {formik.errors.steps && formik.touched.steps && <div style={{ color: 'red' }}>{formik.errors.steps}</div>}
          <List
            values={formik.values.steps}
            setValues={(value) => {
              formik.setFieldValue("steps", value);
            }}
            placeholder="e.g. phone interview, technical interview etc"
          />
        </Box>
        <Box>
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            Applicaiton Details
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  id="resume"
                  name="resume"
                  checked={formik.values.resume}
                  onChange={(e) => formik.setFieldValue('resume', e.target.checked)}
                />
              }
              label="Resume Required"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="cover_letter"
                  name="cover_letter"
                  checked={formik.values.cover_letter}
                  onChange={(e) => formik.setFieldValue("cover_letter", e.target.checked)}
                />
              }
              label="Cover Letter Required"
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Questions
          </Typography>
          {formik.errors.questions && formik.touched.questions && <div style={{ color: 'red' }}>{formik.errors.questions}</div>}
          <List
            values={formik.values.questions}
            setValues={(value) => {
              formik.setFieldValue("questions", value);
            }}
            placeholder="e.g. why do you want this role?"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }} mt={4}>
        <Button onClick={formik.handleSubmit} color="primary" variant="contained" sx={{ px: 5, mr: 3 }}>
          Post
        </Button>
        <Link underline="none" component={RouterLink} to="/">
          Cancel
        </Link>
      </Box>
    </Box>
  );
};

const List = ({ values, setValues, placeholder }) => {
  const onTextChange = (val, i) => {
    let newValues = [...values];
    newValues[i] = val;
    setValues(newValues);
  };

  const onDelete = (i) => {
    let newValues = [...values];
    newValues.splice(i, 1);
    setValues(newValues);
  };

  const onAdd = () => {
    let newValues = [...values];
    newValues.push("");
    setValues(newValues);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} mt={3}>
      {values.map((v, i) => (
        <Box sx={{ display: "flex", alignItems: "center" }} key={i}>
          <Typography variant="subtitle1" sx={{ width: "30px" }}>
            {i + 1}
          </Typography>
          <TextField
            sx={{ flexGrow: 1 }}
            placeholder={placeholder}
            variant="outlined"
            value={v}
            onChange={(e) => onTextChange(e.target.value, i)}
          />
          <IconButton
            color="error"
            onClick={() => onDelete(i)}
            disabled={values.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        sx={{ alignSelf: "flex-start" }}
        onClick={onAdd}
        color="primary"
        variant="outlined"
        size="large"
      >
        Add
      </Button>
    </Box>
  );
};

export default CreateInternship;
