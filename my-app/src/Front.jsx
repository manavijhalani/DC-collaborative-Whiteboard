import React from "react";
import "./Front.css"; // import the CSS
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

export default function Front() {
  return (
    <div>
        <Typography>Enter the room number you want to join</Typography>
        <TextField></TextField>
        <Typography>Enter your name</Typography>
        <TextField></TextField>
    </div>
  );
}
