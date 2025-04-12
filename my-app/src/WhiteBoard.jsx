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


export default function CanvasPage() {

const Canvasref=useRef(null);
const [boardcolor,setboardcolor]=useState("pink");
const [brushColor,setbrushColor]=useState("black")
const [colorpicker,showColorpicker]=useState(false);
const [brushRadius,setbrushRadius]=useState(10);
const [radiusslider,setshowradiusslider]=useState(false);
const [messages,setMessage]=useState([]);
const [newInputMessage,setnewInputMessage]=useState("")

const handleSendMessage=(e)=>{
  setMessage([
   ...messages,
      newInputMessage
  ]
  );
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
    Canvasref.current.clear();
}



const handleSave=()=>{
    const data=Canvasref.current.getSaveData();
    console.log(data)
}

const handleUndo=()=>{
  Canvasref.current.undo();
}

const handleColorpicker=()=>{
    showColorpicker(!colorpicker)
}
const handleRadius=()=>{
    setshowradiusslider(!radiusslider)
}


  return (
    <div>
    <div style={{ padding: "20px" }}>
      <h2>Draw Something!</h2>
      <Button variant="outlined" style={{margin:"20px"}} onClick={handleClear}>Clear</Button>
      <Button variant="outlined" style={{margin:"20px"}} onClick={handleSave}>Save</Button>
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
      <CanvasDraw ref={Canvasref}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={2}
        canvasWidth={1000}
        canvasHeight={700}
        hideGrid={true}
        backgroundColor={boardcolor}
        enablePanAndZoom={false}
        //disabled={true}
      />
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
