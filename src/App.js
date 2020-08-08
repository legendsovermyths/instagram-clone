import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='App'>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img
            className='modal__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
            alt=''
          />
          <form className='app__signup'>
            <div className='app__textfield'>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='outlined-basic'
                type='email'
                label='Email'
                variant='outlined'
              />
            </div>
            <div className='app__textfield'>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='outlined-basic'
                type='password'
                label='Password'
                variant='outlined'
              />
            </div>

            <div className='app__modalbutton'>
              {" "}
              <Button
                type='submit'
                onClick={signIn}
                variant='contained'
                disableElevation>
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img
            className='modal__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
            alt=''
          />
          <form className='app__signup'>
            <div className='app__textfield'>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id='outlined-basic'
                type='username'
                label='Username'
                variant='outlined'
              />
            </div>
            <div className='app__textfield'>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='outlined-basic'
                type='email'
                label='Email'
                variant='outlined'
              />
            </div>
            <div className='app__textfield'>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='outlined-basic'
                type='password'
                label='Password'
                variant='outlined'
              />
            </div>

            <div className='app__modalbutton'>
              {" "}
              <Button
                type='submit'
                onClick={signup}
                variant='contained'
                disableElevation>
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
        />

        {user ? (
          <Button onClick={() => auth.signOut()} color='primary'>
            Logout
          </Button>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpen(true)} color='primary'>
              Sign up
            </Button>
            <Button onClick={() => setOpenSignIn(true)} color='primary'>
              LogIn
            </Button>
          </div>
        )}
      </div>
      <div className='app__posts'>
        <div className='app__postsLeft'>
          {posts.map(({ id, post }) => (
            <Post
              postId={id}
              key={id}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
            />
          ))}
        </div>
      </div>

      <footer>
        {user?.displayName ? <ImageUpload username={user.displayName} /> : ""}
      </footer>
    </div>
  );
}

export default App;
