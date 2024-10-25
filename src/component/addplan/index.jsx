import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function AddPlan() {
  return (
    <div style={{ width: "100%", height: "100vh", margin: "auto" }}>
      <BasicCard />
    </div>
  );
}

const BasicCard = () => {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [cost, setCost] = React.useState(0);
  // const [list, setList] = React.useState('')
  const [tagName, setTagName] = React.useState([]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeCost = (event) => {
    // setCost(event.target.value);
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setCost(inputValue);
    }
  };

  const handleSubmit = () => {
    var showList = [];
    var show = {
      name: name,
      category: category,
      cost: cost,
      list: tagName,
    };
    showList.push(show);
    showList = showList.concat(
      JSON.parse(localStorage.getItem("showList") || "[]")
    );
    localStorage.setItem("showList", JSON.stringify(showList));
    alert("data is successfully store");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
      <Card sx={{ width: "24rem" }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Add Plan data
          </Typography>
          <div style={{ display: "flex", marginTop: 10 }}>
            <Typography
              variant="h6"
              component="div"
              style={{ width: "30%", textAlign: "end", marginRight: 5 }}
            >
              Name :
            </Typography>
            <TextField
              id="Name"
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={handleChangeName}
              sx={{ width: "8rem" }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <Typography
              variant="h6"
              component="div"
              style={{ width: "30%", textAlign: "end", marginRight: 5 }}
            >
              Category :
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChangeCategory}
                  sx={{ width: "8rem" }}
                >
                  <MenuItem value={"prepaid"}>Prepaid</MenuItem>
                  <MenuItem value={"postpaid"}>Postpaid</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <Typography
              variant="h6"
              component="div"
              style={{ width: "30%", textAlign: "end", marginRight: 5 }}
              
            >
              Cost :
            </Typography>
            <TextField
              id="cost"
              variant="outlined"
              size="small"
              value={cost}
              onChange={handleChangeCost}
              sx={{ width: "8rem" }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <Typography
              variant="h6"
              component="div"
              style={{ width: "30%", textAlign: "end", marginRight: 5 }}
            >
              All List :
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <MultipleSelectCheckmarks
                tagName={tagName}
                setTagName={setTagName}
              />
            </Box>
          </div>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" onClick={handleSubmit} variant="contained">
            Sumbit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 7;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["OTP", "OCR", "LIVELINESS", "PAN-VALIDATION"];

const MultipleSelectCheckmarks = ({ tagName, setTagName }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setTagName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          size="small"
          sx={{ width: "8rem" }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={tagName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddPlan;
