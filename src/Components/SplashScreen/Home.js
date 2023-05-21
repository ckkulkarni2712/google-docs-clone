import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./style.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
const Home = ({ database }) => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [openModal, setOpen] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const isMounted = useRef();
  const collectionRef = collection(database, "docsData");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addData = () => {
    addDoc(collectionRef, {
      title: title,
    })
      .then(() => {
        alert("Data Added");
        handleClose();
      })
      .catch(() => {
        alert("Cannot add data");
      });
  };
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  }, []);
  const getID = (id) => {
    navigate(`document/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(collectionRef, id));
      alert("Document deleted successfully");
    } catch (error) {
      alert("Error deleting document");
    }
  };
  return (
    <>
      <div>
        <div className="grid-main">
          {docsData.map((doc) => {
            return (
              <div className="grid-child">
                <Box
                  sx={{
                    height: "180px",
                    display: "block",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                  }}
                  onClick={() => getID(doc.id)}
                >
                  <Typography
                    dangerouslySetInnerHTML={{ __html: doc.content }}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pt: 2,
                    borderTop: 1,
                    borderTopWidth: "100%",
                    borderTopColor: "#e2e2e2",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ mt: 1 }}>
                    <Typography>{doc.title}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleDelete(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </div>
            );
          })}
          <div className="grid-child" onClick={handleOpen}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                background: "#e2e2e2",
                cursor: "pointer",
              }}
            >
              <AddOutlinedIcon fontSize="large" />
            </Box>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        title={title}
        setTitle={setTitle}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Add the Title"
            className="addInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            sx={{ width: "100%" }}
          />

          <Box>
            <Button onClick={addData} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
