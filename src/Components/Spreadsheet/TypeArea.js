import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { setDocumentName } from "../../Redux/Reducers/contentSlice.js";
import "./style.css";
import { useParams } from "react-router-dom";
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";
import Sidebar from "../Sidebar/Sidebar.js";

const TypeArea = ({ database }) => {
  let params = useParams();
  const isMounted = useRef();
  const collectionRef = collection(database, "docsData");
  const [openNameMenu, setOpenNameMenu] = useState(false);
  const handleChange = (newContent) => {
    setContent(newContent);
  };
  const [documentState, setDocumentState] = useState("");
  const [content, setContent] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleOpenMenu = () => {
    setOpenNameMenu(true);
  };
  const handleDocumentNameChange = () => {
    setOpenNameMenu(false);
    setIsHovered(false);
  };
  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        content: content,
        title: documentState,
      });
    }, 1000);
    return () => clearTimeout(updateDocsData);
  }, [content, documentState]);
  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      const data = docs.data();
      if (data) {
        setContent(data.content || "");
        setDocumentState(data.title || "");
      } else {
        setContent("");
        setDocumentState("");
      }
    });
  };
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  }, []);
  return (
    <div className="container">
      <Box sx={{ display: "flex", p: 2, gap: 2 }}>
        <i className="material-icons" style={{ fontSize: "42px" }}>
          description
        </i>
        {openNameMenu ? (
          <TextField
            value={documentState}
            onChange={(e) => {
              setDocumentState(e.target.value);
            }}
            onBlur={handleDocumentNameChange}
          />
        ) : (
          <Typography
            sx={{
              mt: 1.5,
              border: isHovered ? "2px solid black" : "none",
              cursor: isHovered ? "text" : "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenMenu}
          >
            {documentState}
          </Typography>
        )}
      </Box>
      <ReactQuill modules={modules} value={content} onChange={handleChange} />
    </div>
  );
};

export default TypeArea;
