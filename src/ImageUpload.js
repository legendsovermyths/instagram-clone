import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const classes = useStyles();
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className='imageupload'>
      <CircularProgress
        variant='static'
        className='imageupload__circularProgress'
        value={progress}
      />
      <TextField
        id='standard-basic'
        placeholder='Enter a caption'
        label='Caption'
        onChange={(event) => setCaption(event.target.value)}
      />
      <div className={classes.root}>
        <Button
          onClick={handleUpload}
          variant='contained'
          color='primary'
          component='span'>
          Upload
        </Button>
        <input
          onChange={handleChange}
          className={classes.input}
          id='icon-button-file'
          type='file'
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'>
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </div>
  );
}

export default ImageUpload;
