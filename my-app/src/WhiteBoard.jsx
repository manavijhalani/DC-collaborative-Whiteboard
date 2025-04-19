// CanvasPage.jsx
import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import Button from '@mui/material/Button';
import { useRef } from "react";
//import UndoIcon from '@mui/icons-material/Undo';
import { HexColorPicker } from "react-colorful";
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import {io} from 'socket.io-client';
import { useLocation } from "react-router-dom";



export default function CanvasPage() {
const location=useLocation();
const obj=location.state||{};
const roomid=obj.roomid;
const username=obj.username;
const Canvasref=useRef([React.createRef()]);//array of refs for each page to call related functions like save,undo etc
const [boardcolor,setboardcolor]=useState("pink");
const [brushColor,setbrushColor]=useState("black")
const [colorpicker,showColorpicker]=useState(false);
const [brushRadius,setbrushRadius]=useState(10);
const [radiusslider,setshowradiusslider]=useState(false);
const [messages,setMessage]=useState([]);
const [newInputMessage,setnewInputMessage]=useState("")
const [pageindex,setpageindex]=useState(0);
const [pagedrawing,savepagedrawing]=useState([])
const [pagewiseboardcolor,setpagewiseboardcolor]=useState([])
const socketref=useRef(null)

useEffect(()=>{
   // client-side
  socketref.current = io("http://localhost:3001");
   socketref.current?.on("connect", () => {
  console.log(socketref.current?.id); // x8WIv7-mJelg7on_ALbx
  const data={'username':username,'roomid':roomid}
  socketref.current?.emit('join-room',data);
  console.log(`sent id as ${roomid}`)
});

socketref.current?.on("disconnect", () => {
  console.log(socketref.current?.id); // undefined
});

socketref.current?.on("messagefromothers",(data)=>[
  setMessage(messages=>[...messages,data])
])
return()=>{
  socketref.current?.off('messagefromothers');
}

},[])



useEffect(() => {
  if (Canvasref.current.length === 0) {
    Canvasref.current.push(React.createRef());
  }
}, []);

useEffect(()=>{
  const canvas=Canvasref.current[pageindex]?.current;
  if(canvas)
  {
       canvas.clear();
       if(pagedrawing[pageindex])
        {
          setTimeout(() => {
            canvas.loadSaveData(pagedrawing[pageindex], true);
          }, 0);
          console.log(pagedrawing[pageindex])
        }
  }
  

},[pageindex])

const handleSendMessage=(e)=>{
  socketref.current?.emit('message',`${socketref.current.id} says ${newInputMessage}`)
  setMessage(messages=>[
   ...messages,
      newInputMessage
  ]
  );
  setnewInputMessage("")
  console.log(messages)
}
const card = (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, marginBottom:'20px' }}>
          Communicate
        </Typography>
        <TextField value={newInputMessage} onChange={(e)=>setnewInputMessage(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSendMessage}> Send</Button>
        <Button onClick={()=>{socket.emit('message',"hi")}}>Test</Button>
      </CardActions>
    </React.Fragment>
  );
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ACB9EE',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const handleClear=()=>{
    Canvasref.current[pageindex]?.current.clear();
}

const handleaddpage=()=>{
  const newpage=React.createRef();
  Canvasref.current.push(
     newpage
  )
  setpageindex(pageindex+1)

}

const handleSave=(pageindex)=>{
  if (Canvasref.current[pageindex] && Canvasref.current[pageindex].current) {
     const data=Canvasref.current[pageindex].current?.getSaveData();
     const drawings=[...pagedrawing]
     drawings[pageindex]=data
    savepagedrawing(drawings)
    const pageboardcolors=[...pagewiseboardcolor]
    pageboardcolors[pageindex]=boardcolor
    setpagewiseboardcolor(pageboardcolors)
}}

const handleUndo=()=>{
  Canvasref.current[pageindex]?.current.undo();
}

const handleColorpicker=()=>{
    showColorpicker(!colorpicker)
}
const handleRadius=()=>{
    setshowradiusslider(!radiusslider)
}

const handlePrevious=()=>{
  if(pageindex>0){
  setpageindex(pageindex-1)
    if(pagewiseboardcolor[pageindex])
    {
      setboardcolor(pagewiseboardcolor[pageindex])
    }
}
else{
  alert('you are on first page')
}
}

const handleNext=()=>{
  if(pageindex<Canvasref.current.length-1){
  setpageindex(pageindex+1)
  if(pagewiseboardcolor[pageindex])
    {
      setboardcolor(pagewiseboardcolor[pageindex])
    }
}
else{
  alert('you are on last page')
}

}

  return (
    <div>
    <div style={{ padding: "20px" }}>
      <h2>Draw Something!</h2>
      <Button variant="outlined" style={{margin:"20px"}} onClick={handleClear}>Clear</Button>
      <Button variant="outlined" style={{margin:"20px"}} onClick={()=>{handleSave(pageindex)}}>Save</Button>
      <Button variant="outlined" style={{margin:"20px"}} onClick={handleUndo}>Undo</Button>
      <Button variant="outlined" style={{margin:"20px"}} onClick={handleRadius}> Brush Radius</Button>
            {radiusslider && (
        <div style={{ width: 300, marginTop: 20 }}>
            <Slider
            value={brushRadius}
            onChange={(e, newval) => setbrushRadius(newval)}
            min={1}
            max={50}
            step={1}
            />
            <p>Brush Radius: {brushRadius}</p>
        </div>
        )}

      <Button variant="outlined"  style={{margin:"20px"}} onClick={handleColorpicker}> Colors</Button>
     {colorpicker && 
      <div>
        <p>Board Color</p>
      <HexColorPicker onChange={setboardcolor}></HexColorPicker>
      </div>
      }
      {colorpicker && 
      <div>
        <p>Brush Color</p>
      <HexColorPicker onChange={setbrushColor}></HexColorPicker>
      </div>
      }


     <div style={{ display: 'flex', gap: '20px', marginTop: '30px', alignItems: 'flex-start' }}>
      <div style={{borderColor:'2px solid black', padding:'4px',display:'inline-block'}}>
        <p>{pageindex+1}</p>
       <CanvasDraw ref={Canvasref.current[pageindex]}
        //key={pageindex}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={2}
        canvasWidth={1000}
        canvasHeight={700}
        hideGrid={true}
        backgroundColor={pagewiseboardcolor[pageindex]||boardcolor}
        enablePanAndZoom={false}
        />
      <Button sx={{marginTop:"10px"}} onClick={handlePrevious}>Previous Page</Button>
      <Button sx={{marginTop:"10px"}} onClick={handleaddpage}>Add new page</Button>
      <Button sx={{marginTop:"10px"}} onClick={handleNext}>Next Page</Button>

      </div>
      <div style={{display:'inline-block'}}>
        <Card>{card}</Card>
        <Stack spacing={2}   sx={{maxHeight:'500px',overflowY:'auto',width:'350px'}}>
            {[...messages].reverse().map((message,index)=>(
               <Item key={index}>{message}</Item>
            ))}
        </Stack>
      </div>
      

      
    </div>
    </div>

    

    </div>

  );
}
