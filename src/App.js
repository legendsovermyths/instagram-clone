import React,{useState, useEffect} from 'react';
import './App.css';
import Post from "./Post"
import {db} from "./firebase"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [posts, setPosts]=useState([]);
  const [open, setOpen]=useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })))
    })
  },[])
  const signup=()=>{}
  return (
    <div className="App">
    <Modal
       open={open}
       onClose={()=>setOpen(false)}>

     <div style={modalStyle} className={classes.paper}>


     <img className="modal__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt=""/>
     <form className="app__signup">
     <div className="app__textfield"><TextField value={username} onChange={(e)=>setUsername(e.target.value)} id="outlined-basic" type="username" label="Username" variant="outlined" /></div>
     <div className="app__textfield"><TextField value={email} onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" type="email" label="Email" variant="outlined" /></div>
     <div className="app__textfield"><TextField value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" type="password" label="Password" variant="outlined" /></div>

     <div className="app__modalbutton"> <Button onClick={signup} variant="contained" disableElevation>Sign up</Button></div>
    </form>
 </div>
     </Modal>
    <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""/>
          <Button onClick={()=>setOpen(true)} color="primary" >Sign Up</Button>
  </div>
  <div className="app__posts">
    {
      posts.map(({id,post})=>(
        <Post key={id} userName={post.userName} imageUrl={post.imageUrl} caption={post.caption}/>
      ))
    }
    </div>
    </div>
  );
}

export default App;
