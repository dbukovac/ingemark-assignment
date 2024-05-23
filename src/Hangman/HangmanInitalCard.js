import React, { useState } from 'react';
import { Box, Button, Card, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUsername } from '../Slices/userSlice';
import { nextStep } from '../Slices/stepsSlice';
import { fetchQuoteAsync } from '../Slices/quoteSlice';
import { startTimer } from '../Slices/timerSlice';

export function HangmanInitialCard() {
  const [user, setUser] = useState("");

  const dispatch = useDispatch();

  const startGame = () => {
    if(user) {
        dispatch(setUsername(user));
        dispatch(fetchQuoteAsync());
        dispatch(nextStep());
        dispatch(startTimer());
    } else {
        alert("Username not valid");
    }
  }

  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", padding: 8, borderWidth: "medium" }}>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <TextField onChange={event => setUser(event.target.value)} label="Your name" variant="outlined" sx={{ borderColor: "white" }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => startGame()} variant="contained">Start game</Button>
        </Box>
    </Card>
  )
}