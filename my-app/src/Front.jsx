import React from "react";
import "./Front.css"; // import the CSS
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import {io} from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function Front() {
  const navigate=useNavigate();
  const [isnewroom,setisnewroom]=useState(false);
  const [isexistingroom,setisexistingroom]=useState(false);
  const [newroomval,setnewroomval]=useState("")
  const [existroomval,setexisroomval]=useState("")
  const [username,setusername]=useState("");
  const createnewroom=()=>{
    setisnewroom(!isnewroom)
  }
  const enterexistingroom=()=>{
    setisexistingroom(!isexistingroom)
  }

  const handlenew=()=>{
    navigate('/whiteboard',{state:{'username':username,'roomid':newroomval}})
  }

  const handleold=()=>{
    navigate('/whiteboard',{state:{'username':username,'roomid':existroomval}})
  }

  return (
    <div>
        <Typography>Enter your name</Typography>
        <TextField onChange={(e)=>{setusername(e.target.value)}}></TextField>
        
        <Button onClick={createnewroom}>Create a new room</Button>
        {isnewroom && <div>
          <Typography >Create new room id</Typography>
          <TextField onChange={(e)=>{setnewroomval(e.target.value)}}></TextField>
          <Button onClick={handlenew}>
            Create
          </Button>
          </div>}
          <Button onClick={enterexistingroom}>Join existing room</Button>
        {isexistingroom && <div>
          <Typography>Enter room id</Typography>
          <TextField onChange={(e)=>{setexisroomval(e.target.value)}}></TextField>
          <Button onClick={handleold}>
            Join
          </Button>
          </div>}
        
    </div>
  );
}
