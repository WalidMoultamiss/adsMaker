import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  borderRadius:"5px"
};

export const TableDrivers = ({
  reload,
  setAllDrivers,
  setSelectedDriverFromTable,
}) => {
  const [drivers, setDrivers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDriver, setSelectedDriver] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chauffeur/")
      .then((response) => response.data)
      .then(
        (result) => {
          setDrivers(result);
          setAllDrivers(result);
          console.log(result);
        },
        (error) => console.log("error", error)
      )
      .catch((error) => console.log("error", error));
  }, [reload]);

  const getBonus = (driver) =>{
    fetch("http://localhost:5000/api/chauffeur/calculateKm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        chauffeurId: driver._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedDriver(selectedDriver=>({...selectedDriver, ...data}))
        handleOpen();
      })
      .catch((error) => console.log(error));
  }


  const TableHeads = [
    "fullName",
    "CIN",
    "permis",
    "truck",
    "N° livraisons",
    "createdAt",
    "action",
  ];

  return (
    <div className="-my-2 mt-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {TableHeads?.map((head, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drivers.map((l, i) => (
                <tr
                  key={i}
                  className="transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{l.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.CIN}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.permis}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.truck}</td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    {l?.livraisons?.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {l.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium flex gap-3 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedDriverFromTable(l);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 p-3 rounded-full bg-indigo-200"
                    >
                      Select driver
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900 p-3 rounded-full bg-green-100"
                      onClick={() => {
                        setSelectedDriver(l);
                        getBonus(l);
                      }}
                    >
                      Calculate bonus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedDriver && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span
              className="text-3xl font-bold capitalize"	
            >
            {selectedDriver?.fullName}
            </span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            CIN: {selectedDriver?.CIN}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            N° livraisons: {selectedDriver?.livraisons?.length}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Created at: {selectedDriver?.createdAt.split("T")[0]}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Type: {selectedDriver?.truck}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Comission: {selectedDriver?.comission}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Kilometrage: {selectedDriver?.totalKm}
          </Typography>
        </Box>
      </Modal>
      )}
    </div>
  );
};
