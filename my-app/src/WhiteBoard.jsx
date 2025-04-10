// CanvasPage.jsx
import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import Button from '@mui/material/Button';
import { useRef } from "react";
//import UndoIcon from '@mui/icons-material/Undo';
import { HexColorPicker } from "react-colorful";
import Slider from '@mui/material/Slider';

export default function CanvasPage() {

const Canvasref=useRef(null);
const [boardcolor,setboardcolor]=useState("pink");
const [brushColor,setbrushColor]=useState("black")
const [colorpicker,showColorpicker]=useState(false);
const [brushRadius,setbrushRadius]=useState(10);
const [radiusslider,setshowradiusslider]=useState(false);

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



      <div style={{borderColor:'2px solid black', padding:'4px',display:'block'}}>
      <CanvasDraw ref={Canvasref}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={2}
        canvasWidth={1000}
        canvasHeight={700}
        hideGrid={true}
        backgroundColor={boardcolor}
        //disabled={true}
      />
      </div>

     
    </div>




    </div>

  );
}
