import * as React from "react";
import {
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function ListComponent() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <BasicTable />
    </div>
  );
}

//------------------------------------------------------------------------------

const BasicTable = () => {
  const navigate = useNavigate();
  var data = JSON.parse(localStorage.getItem("showList"));

  const [arrow, setArrow] = React.useState(false);
  const [datalist, setDatalist] = React.useState([]);

  React.useEffect(() => {
    setDatalist(data);
  }, []);

  const handleArrow = () => {
    setArrow(!arrow);
    if (arrow) {
      let data1 = [...datalist];
      data1.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });

      setDatalist(data1);
    } else {
      let data1 = [...datalist];

      data1.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      setDatalist(data1);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={handleArrow}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "4px" }}>name</span>
                {arrow ? (
                  <ArrowDownwardIcon fontSize="small" />
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </div>
            </TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Cost</TableCell>
            <TableCell align="center">List</TableCell>
            <TableCell align="center">Modify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datalist?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.cost}</TableCell>
              <TableCell align="center">{row.list.join(",")}</TableCell>
              <TableCell align="center">
                <BasicModal data={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

const BasicModal = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState(data.name);
  const [category, setCategory] = React.useState(data.category);
  const [cost, setCost] = React.useState(data.cost);
  const [list, setList] = React.useState(data.list);
  const [tagName, setTagName] = React.useState(data.list);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeCost = (event) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setCost(inputValue);
    }
  };
  const handleChangeList = (event) => {
    setList(event.target.value);
  };

  const handleSubmit = () => {
    let modData = {
      name: name,
      category: category,
      cost: cost,
      list: tagName,
    };
    // console.log('ketan data', data);

    let myArray = JSON.parse(localStorage.getItem("showList")) || null;

    //find the index of object from array that you want to update
    const objIndex = myArray.findIndex((obj) => obj.name === data.name);

    // Make sure to avoid incorrect replacement
    // When specific item is not found
    if (objIndex === -1) {
      return;
    }

    const updatedObj = {
      name: name,
      category: category,
      cost: cost,
      list: tagName,
    };

    // make final new array of objects by combining updated object.
    const updatedProjects = [
      ...myArray.slice(0, objIndex),
      updatedObj,
      ...myArray.slice(objIndex + 1),
    ];
    localStorage.removeItem("showList");
    localStorage.setItem("showList", JSON.stringify(updatedProjects));
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Modify</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Edit plan
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
                  {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
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
              Edit
            </Button>
          </CardActions>
        </Box>
      </Modal>
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
      <FormControl sx={{ width: "8rem" }} size="small">
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          size="small"
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

export default ListComponent;
