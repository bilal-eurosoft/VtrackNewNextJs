"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { pictureVideoDataOfVehicleT } from "@/types/videoType";
import {
  postDriverDataByClientId,
  GetDriverDataByClientId,
} from "@/utils/API_CALLS";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%,-100%)",
  width: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function DriverProfile() {
  const { data: session } = useSession();
  const [DriverData, setDriverData] = useState<pictureVideoDataOfVehicleT[]>(
    []
  );
  const router = useRouter();
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPages, setRowsPerPages] = React.useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const handleClose = () => setOpen(false);
  const [formData, setFormDate] = useState<any>({
    id: "",
    clientId: "61e6d00fd9cc7102ac6464a3",
    driverNo: "",
    driverfirstName: "",
    driverMiddleName: "",
    driverLastName: "",
    driverContact: "",
    driverIdNo: "",
    driverAddress1: "",
    driverAddress2: "",
    driverRFIDCardNumber: "",
    isAvailabl: "",
  });

  const handleEdit = (id: any) => {
    setOpen(true);
    const filterData: any = DriverData.find((item: any) => item.id == id);
    setSelectedData(filterData);
  };

  const [singleFormData, setSingleFormData] = useState<any>({
    // Initial values or leave empty based on your requirement
    id: "",
    clientId: "61e6d00fd9cc7102ac6464a3",
    driverNo: "",
    driverfirstName: "",
    driverMiddleName: "",
    driverLastName: "",
    driverContact: "",
    driverIdNo: "",
    driverAddress1: "",
    driverAddress2: "",
    driverRFIDCardNumber: "",
    isAvailabl: false, // Assuming it's a boolean
  });

  useEffect(() => {
    if (selectedData) {
      setSingleFormData({
        id: selectedData.id,
        clientId: "61e6d00fd9cc7102ac6464a3",
        driverNo: selectedData.driverNo,
        driverfirstName: selectedData.driverfirstName,
        driverMiddleName: selectedData.driverMiddleName,
        driverLastName: selectedData.driverLastName,
        driverContact: selectedData.driverContact,
        driverIdNo: selectedData.driverIdNo,
        driverAddress1: selectedData.driverAddress1,
        driverAddress2: selectedData.driverAddress2,
        driverRFIDCardNumber: selectedData.driverRFIDCardNumber,
        isAvailabl: selectedData.isAvailable,
      });
    }
  }, [selectedData]);

  // Rest of your component code...

  const handleOpen = () => {
    setOpen(true);
  };

  // const lastIndex = rowsPerPages * currentPage;
  // const firstIndex = currentPage * rowsPerPages + rowsPerPages;
  const result = DriverData.slice(
    rowsPerPages * currentPage,
    currentPage * rowsPerPages + rowsPerPages
  );
  const totalCount = DriverData.length / currentPage;
  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPages(+event.target.value);
    setCurrentPage(0);
  };

  const handleChangeDriver = (key: any, e: any) => {
    setFormDate({ ...formData, [key]: e.target.value });
  };
  const handleEditDriver = (key: any, e: any) => {
    setSelectedData({ ...singleFormData, [key]: e.target.value });
  };

  // const handleDriverEditedSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     if (session) {
  //       const newformdata = {
  //         ...singleFormData,
  //         clientId: session?.clientId,
  //       };
  //       console.log("new", newformdata);

  //       const response = await toast.promise(
  //         postDriverDataByClientId({
  //           token: session?.accessToken,
  //           newformdata: newformdata,
  //         }),
  //         {
  //           loading: "Saving data...",
  //           success: "Data saved successfully!",
  //           error: "Error saving data. Please try again.",
  //         },
  //         {
  //           style: {
  //             border: "1px solid #00B56C",
  //             padding: "16px",
  //             color: "#1A202C",
  //           },
  //           success: {
  //             duration: 2000,
  //             iconTheme: {
  //               primary: "#00B56C",
  //               secondary: "#FFFAEE",
  //             },
  //           },
  //           error: {
  //             duration: 2000,
  //             iconTheme: {
  //               primary: "#00B56C",
  //               secondary: "#FFFAEE",
  //             },
  //           },
  //         }
  //       );
  //       console.log("response", response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching zone data:", error);
  //   }
  //   console.log("data", data);
  //   setDriverData(DriverData);
  //   setOpen(false);
  // };

  const id: any = selectedData?._id;

  const handleDriverEditedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedData);
    const payLoad: any = {
      id: selectedData.id,
      driverNo: selectedData.driverNo,
      driverfirstName: selectedData.driverfirstName,
      driverMiddleName: selectedData.driverMiddleName,
      driverLastName: selectedData.driverLastName,
      driverContact: selectedData.driverContact,
      driverIdNo: selectedData.driverIdNo,
      driverAddress1: selectedData.driverAddress1,
      driverAddress2: selectedData.driverAddress2,
      driverRFIDCardNumber: selectedData.driverRFIDCardNumber,
      isAvailabl: selectedData.isAvailable,
    };

    try {
      if (session) {
        const newformdata = {
          ...payLoad,
          clientId: session?.clientId,
        };

        const response = await toast.promise(
          postDriverDataByClientId({
            token: session?.accessToken,
            newformdata: newformdata,
          }),
          {
            loading: "Saving data...",
            success: "Data saved successfully!",
            error: "Error saving data. Please try again.",
          },
          {
            style: {
              border: "1px solid #00B56C",
              padding: "16px",
              color: "#1A202C",
            },
            success: {
              duration: 2000,
              iconTheme: {
                primary: "#00B56C",
                secondary: "#FFFAEE",
              },
            },
            error: {
              duration: 2000,
              iconTheme: {
                primary: "#00B56C",
                secondary: "#FFFAEE",
              },
            },
          }
        );
        vehicleListData();
      }
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
    setOpen(false);
  };

  const handleDriverSubmit = async (e: any) => {
    e.preventDefault();

    if (session) {
      const newformdata: any = {
        ...formData,
        clientId: session?.clientId,
      };

      const response = await toast.promise(
        postDriverDataByClientId({
          token: session?.accessToken,
          newformdata: newformdata,
        }),

        {
          loading: "Saving data...",
          success: "Data saved successfully!",
          error: "Error saving data. Please try again.",
        },
        {
          style: {
            border: "1px solid #00B56C",
            padding: "16px",
            color: "#1A202C",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#00B56C",
              secondary: "#FFFAEE",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "#00B56C",
              secondary: "#FFFAEE",
            },
          },
        }
      );
    }
  };

  const vehicleListData = async () => {
    try {
      if (session) {
        const response = await GetDriverDataByClientId({
          token: session?.accessToken,
          clientId: session?.clientId,
        });
        setDriverData(response);
      }
      // setLaoding(false);
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
  };
  useEffect(() => {
    vehicleListData();
  }, [session]);

  const handleSearch = (event: any) => {
    const newSearchTerm = event.target.value;
    setInputs(newSearchTerm);
  };
  const handleCloseInput = () => {
    setInputs("");
  };

  const handleDelete = (id: any) => {
    // router.push("http://localhost:3010/ActiveDriver");
  };
  const test = 20;
  return (
    <div>
      {data.map((item: any, index) => {
        return (
          <div key={index}>
            <p>{item.driverfirstName}</p>
          </div>
        );
      })}
      <Paper sx={{ width: "98%" }} className="  ms-3 mr-3 mt-3">
        <div className="grid lg:grid-cols-12 md:grid-cols-2  sm:grid-cols-2  p-4  bg-bgLight">
          <div className="lg:col-span-10 md:grid-col-span-1 sm:grid-col-span-1 lg:mb-0 flex lg: justify-center sm:justify-start mb-4 ">
            <button
              onClick={handleOpen}
              className="bg-green px-4 py-1  text-white rounded-md"
            >
              Add New Driver
            </button>

            <button
              onClick={() => router.push("http://localhost:3010/ActiveDriver")}
              className="bg-red px-4 py-1 mx-3  text-white rounded-md"
            >
              InActive Driver List
            </button>
          </div>

          <div
            className="lg:col-span-2 md:grid-col-span-1 sm:grid-col-span-1 border-b border-grayLight  text-center"
            id="hover_bg"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                <svg
                  className="h-5  w-5 text-gray mt-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="10" cy="10" r="7" />{" "}
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </div>
              <div className="col-span-10">
                <input
                  type="text"
                  className=" border-none outline-none bg-transparent "
                  placeholder="Seacrch"
                  onChange={handleSearch}
                  value={inputs}
                />
              </div>
              <div
                className="col-span-1 cursor-pointer"
                onClick={handleCloseInput}
              >
                <svg
                  className="h-5 w-5 text-gray mt-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="18" y1="6" x2="6" y2="18" />{" "}
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className="text-black"
              >
                <div className="grid grid-cols-12 bg-green">
                  <div className="col-span-11">
                    <p className="  p-3 text-white w-full ">Add Driver</p>
                  </div>
                  <div className="col-span-1">
                    <svg
                      className="h-6 w-6 text-labelColor mt-3"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="18" y1="6" x2="6" y2="18" />{" "}
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              </Typography>
              <form onSubmit={handleDriverSubmit}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.driverfirstName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleChangeDriver("driverfirstName", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={formData.driverMiddleName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleChangeDriver("driverMiddleName", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        <span className="text-red">*</span> Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.driverLastName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleChangeDriver("driverLastName", e)
                        }
                      />
                    </div>
                  </div>

                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Driver Number
                      </label>
                      <input
                        value={formData.driverNo}
                        type="text"
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) => handleChangeDriver("driverNo", e)}
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value={formData.driverContact}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleChangeDriver("driverContact", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        ID Number
                      </label>
                      <input
                        type="text"
                        value={formData.driverIdNo}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleChangeDriver("driverIdNo", e)
                        }
                      />
                    </div>
                  </div>

                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "start" }}
                  >
                    <div className="lg:col-span-2 col-span-1 ">
                      <label className="text-sm text-labelColor ">
                        RFID
                        <input
                          type="checkbox"
                          onClick={() => setShowCardNumber(!showCardNumber)}
                          style={{ accentColor: "green" }}
                          className="border border-green  outline-green  cursor-pointer ms-4  "
                        />
                      </label>
                    </div>
                    {showCardNumber ? (
                      <div className="lg:col-span-3 col-span-1 ">
                        <label className="text-sm text-labelColor">
                          Card Number
                        </label>
                        <br></br>
                        <input
                          type="text"
                          value={formData.driverRFIDCardNumber}
                          className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                          onChange={(e: any) =>
                            handleChangeDriver("driverRFIDCardNumber", e)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="grid grid-cols-12 m-6 mt-8 gap-8 ">
                    <div className="col-span-6 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Address 1
                      </label>
                      <br></br>
                      <textarea
                        value={formData.driverAddress1}
                        className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-20 "
                        onChange={(e: any) =>
                          handleChangeDriver("driverAddress1", e)
                        }
                      ></textarea>
                      <button
                        className="bg-green text-white px-10 mt-8 py-2 rounded-sm"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-span-6 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Address 2
                      </label>
                      <br></br>
                      <textarea
                        value={formData.driverAddress2}
                        className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-20 "
                        onChange={(e: any) =>
                          handleChangeDriver("driverAddress2", e)
                        }
                      ></textarea>
                    </div>
                  </div>
                </Typography>
              </form>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className="text-black"
              >
                <div className="grid grid-cols-12 bg-green">
                  <div className="col-span-11">
                    <p className="  p-3 text-white w-full ">Add Driver</p>
                  </div>
                  <div className="col-span-1">
                    <svg
                      className="h-6 w-6 text-labelColor mt-3"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="18" y1="6" x2="6" y2="18" />{" "}
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              </Typography>
              <form onSubmit={handleDriverEditedSubmit}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverfirstName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverfirstName", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverMiddleName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverMiddleName", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        <span className="text-red">*</span> Last Name
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverLastName}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverLastName", e)
                        }
                      />
                    </div>
                  </div>

                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Driver Number
                      </label>
                      <input
                        value={singleFormData.driverNo}
                        type="text"
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) => handleEditDriver("driverNo", e)}
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverContact}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverContact", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        ID Number
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverIdNo}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) => handleEditDriver("driverIdNo", e)}
                      />
                    </div>
                  </div>

                  <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "start" }}
                  >
                    <div className="lg:col-span-2 col-span-1 ">
                      <label className="text-sm text-labelColor ">
                        RFID
                        <input
                          type="checkbox"
                          onClick={() => setShowCardNumber(!showCardNumber)}
                          style={{ accentColor: "green" }}
                          className="border border-green  outline-green  cursor-pointer ms-4  "
                        />
                      </label>
                    </div>
                    {showCardNumber ? (
                      <div className="lg:col-span-3 col-span-1 ">
                        <label className="text-sm text-labelColor">
                          Card Number
                        </label>
                        <br></br>
                        <input
                          type="text"
                          value={singleFormData.driverRFIDCardNumber}
                          className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                          onChange={(e: any) =>
                            handleEditDriver("driverRFIDCardNumber", e)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="grid grid-cols-12 m-6 mt-8 gap-8 ">
                    <div className="col-span-6 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Address 1
                      </label>
                      <br></br>
                      <textarea
                        value={singleFormData.driverAddress1}
                        className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-20 "
                        onChange={(e: any) =>
                          handleEditDriver("driverAddress1", e)
                        }
                      ></textarea>
                      <button
                        className="bg-green text-white px-10 mt-8 py-2 rounded-sm"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-span-6 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Address 2
                      </label>
                      <br></br>
                      <textarea
                        value={singleFormData.driverAddress2}
                        className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-20 "
                        onChange={(e: any) =>
                          handleEditDriver("driverAddress2", e)
                        }
                      ></textarea>
                    </div>
                  </div>
                </Typography>
              </form>
            </Box>
          </Fade>
        </Modal>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Driver Number
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  First Name
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Middle Name
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Last Name
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver ID
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver Contact
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver Card
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver Address 1
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver Address 2
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Driver Availaibilty
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Actions
                </TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody className="bg-bgLight cursor-pointer ">
              {result
                .filter((item: any) => {
                  if (item == "") {
                    return item;
                  } else if (
                    item.driverfirstName
                      .toLowerCase()
                      .includes(inputs.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((row: any) => (
                  <TableRow className="hover:bg-bgHoverTabel">
                    <TableCell align="center" colSpan={2}>
                      {row.driverNo}
                    </TableCell>

                    <TableCell align="center" colSpan={2}>
                      {row.driverfirstName}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverMiddleName}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverLastName}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverIdNo}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverContact}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverRFIDCardNumber}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverAddress1}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.driverAddress2}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.isAvailable === true ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <button
                        className="text-green hover:border-green border-b border-bgLight"
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;&nbsp;{" "}
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red  text-sm px-2 hover:border-red border-b border-bgLight"
                      >
                        InActive
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        // style={{
        //   display: "flex",
        //   justifyContent: "end",
        //   alignItems: "end",
        // }}
        component="div"
        count={DriverData.length}
        rowsPerPage={rowsPerPages}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="bg-bgLight"
      />
    </div>
  );
}
