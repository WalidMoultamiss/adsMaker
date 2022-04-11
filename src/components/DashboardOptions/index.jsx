import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const DashboardOptions = ({
  classNames,
  setReload,
  livraisons,
  drivers,
  SelectedDriverFromTable,
  selectedLivraisonFromTable,
}) => {
  const Options = [
    {
      name: "Add Livraison",
      icon: () => (
        <span>
          <AddIcon />
          <LocalShippingIcon />
        </span>
      ),
      onClick: () => {
        handleOpen();
      },
    },
    {
      name: "Assign Livraison",
      icon: () => (
        <span>
          <AddIcon />
          <AssignmentTurnedInIcon />
        </span>
      ),
      onClick: () => {
        handleOpenAssign();
      },
    },
    {
      name: "Add driver",
      icon: () => (
        <span>
          <AddIcon />
          <DriveEtaIcon />
        </span>
      ),
      onClick: () => {
        handleOpenDriver();
      },
    },
  ];

  const [direction, setdirection] = React.useState("");
  const [From, setFrom] = React.useState("Casablanca");
  const [To, setTo] = React.useState("Rabat");
  const [Kg, setKg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [fullName, setFullName] = React.useState("Souhail Ben Youssef");
  const [CIN, setCIN] = React.useState("KP87687");
  const [permis, setPermis] = React.useState("YT656577");
  const [truck, setTruck] = React.useState("voiture");

  const [selectedLivraison, setSelectedLivraison] = React.useState({});
  const [selectedDriver, setSelectedDriver] = React.useState({});

  const handleChange = (event) => {
    setdirection(event.target.value);
  };

  const handleChangeSelectedLivraison = (event) => {
    setSelectedLivraison(event.target.value);
  };

  const handleChangeSelectedDriver = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleChangeTruck = (event) => {
    setTruck(event.target.value);
  };

  useEffect(() => {
    setSelectedDriver(SelectedDriverFromTable?._id);
  }, [SelectedDriverFromTable]);

  useEffect(() => {
    setSelectedLivraison(selectedLivraisonFromTable?._id);
  }, [selectedLivraisonFromTable]);



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  const [open, setOpen] = React.useState(false);
  const [openDriver, setOpenDriver] = React.useState(false);
  const [openAssign, setOpenAssign] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDriver = () => setOpenDriver(true);
  const handleCloseDriver = () => setOpenDriver(false);
  const handleOpenAssign = () => setOpenAssign(true);
  const handleCloseAssign = () => setOpenAssign(false);

  const [dateLivraison, setDateLivraison] = React.useState(new Date());

  const handleAddLivraison = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/livraison/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        dateLivraison: dateLivraison.toLocaleDateString().replace(/\//g, "-"),
        direction: direction,
        from: From,
        to: To,
        kg: Kg,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(false);
          handleClose();
          //increment setReload
          setReload((reload) => reload + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleAddDriver = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/chauffeur/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fullName: fullName,
        CIN: CIN,
        permis: permis,
        truck: truck,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(false);
          handleCloseDriver();
          //increment setReload
          setReload((reload) => reload + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleAddAssign = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/chauffeur/newLivraison/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        livraisonId: selectedLivraison,
        chauffeurId: selectedDriver,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(false);
          handleCloseAssign();
          //increment setReload
          setReload((reload) => reload + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className={`w-full flex flex-row gap-3 ${classNames}`}>
      {Options.map((option, i) => (
        <motion.button
          onClick={option.onClick}
          key={i}
          className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
        >
          <div className="text-white p-3 rounded-full bg-green-400 w-fit">
            {option.icon()}
          </div>
          <span className="text-2xl">{option.name}</span>
        </motion.button>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: "16px" }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Add livraison
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Pick a date"
              value={dateLivraison}
              onChange={(newValue) => {
                setDateLivraison(newValue);
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
          <TextField
            id="Weight in Kg"
            label="Weight in Kg"
            margin="normal"
            onChange={(e) => setKg(e.target.value)}
            fullWidth
            value={Kg}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Direction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={direction}
              label="Direction"
              onChange={handleChange}
            >
              {[
                "Europe",
                "Afrique",
                "Asie",
                "Amerique",
                "Australie",
                "Nationale",
              ].map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id=""
            label="from"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => setFrom(e.target.value)}
            value={From}
          />
          <TextField
            id="Weight in Kg"
            label="To"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => setTo(e.target.value)}
            value={To}
          />
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              color="primary"
              margin="normal"
              onClick={() => handleAddLivraison()}
            >
              {isLoading && <CircularProgress size={24} color="success" />}
              <span className="px-6">Add</span>
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDriver}
        onClose={handleCloseDriver}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: "16px" }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Add Driver
          </Typography>
          <TextField
            id="Weight in Kg"
            label="Full Name"
            margin="normal"
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            value={fullName}
          />
          <TextField
            id="Weight in Kg"
            label="CIN"
            margin="normal"
            onChange={(e) => setCIN(e.target.value)}
            fullWidth
            value={CIN}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Truck</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={truck}
              margin="normal"
              label="Direction"
              onChange={handleChangeTruck}
            >
              {["voiture", "miniCamion", "camion"].map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="Weight in Kg"
            label="Permis"
            margin="normal"
            onChange={(e) => setPermis(e.target.value)}
            fullWidth
            value={permis}
          />
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              color="primary"
              margin="normal"
              onClick={() => handleAddDriver()}
            >
              {isLoading && <CircularProgress size={24} color="success" />}
              <span className="px-6">Add</span>
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openAssign}
        onClose={handleCloseAssign}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: "16px" }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Assign Livraison
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Livraison</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLivraison}
              margin="normal"
              label="Direction"
              onChange={handleChangeSelectedLivraison}
            >
              {livraisons?.map((e, i) => (
                <MenuItem key={i} value={e._id}>
                  {e.from + "-" + e.to + " " + e.kg + " Kg"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedDriver}
              margin="normal"
              label="Direction"
              onChange={handleChangeSelectedDriver}
            >
              {drivers?.map((e, i) => (
                <MenuItem key={i} value={e._id}>
                  {e.fullName + " " + e.CIN}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              color="primary"
              margin="normal"
              onClick={() => handleAddAssign()}
            >
              {isLoading && <CircularProgress size={24} color="success" />}
              <span className="px-6">Add</span>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DashboardOptions;
