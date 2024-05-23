import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuoteAsync, selectQuoteValue, selectQuoteUniqueChars, selectQuoteId } from '../Slices/quoteSlice';
import { selectErrors, resetErrors, incrementError } from '../Slices/errorsSlice';
import { endTimer, resetTimer, selectTime } from '../Slices/timerSlice';
import { isLetter } from '../Utils/utils';
import { sendGameResult } from '../Api/sendGameResult';
import { selectUser } from '../Slices/userSlice';
import { nextStep } from '../Slices/stepsSlice';
import { fetchScoresAsync } from '../Slices/scoresSlice';

export function HangmanMainScreen() {
  const [selectedLetters, setSelectedLetters] = useState([]);

  const currentQuoteValue = useSelector(selectQuoteValue);
  const currentQuoteUniqueChars = useSelector(selectQuoteUniqueChars);
  const currentQuoteId = useSelector(selectQuoteId);
  const currentErrors = useSelector(selectErrors);
  const currentUser = useSelector(selectUser);
  const currentTime = useSelector(selectTime);

  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(fetchQuoteAsync());
    dispatch(resetErrors());
    dispatch(resetTimer());
    setSelectedLetters([]);
  }

  const inputLetter = letter => {
    if(isLetter(letter) && !selectedLetters.includes(letter)) {
      const newArray = selectedLetters.concat([letter]);
      setSelectedLetters(newArray);

      if(!currentQuoteUniqueChars.some(quoteLetter => quoteLetter === letter)) {
        dispatch(incrementError());
      }
    }
  }

  const renderQuote = useMemo(() => {
    const renderedQuote = currentQuoteValue.map((letter, index) => {
      const visible = selectedLetters.includes(letter.toLowerCase())
      if(isLetter(letter)) {
        return <Box key={index} sx={{ marginRight: "2px", marginBottom: 2 }}><input size={1} value={visible ? letter : ""} disabled /></Box>
      } else {
        return <Box key={index} sx={{ marginRight: 2 }}>{letter}</Box>
      }
    })
    return renderedQuote;
  }, [currentQuoteValue, selectedLetters])

  useEffect(() => {
    if(currentQuoteUniqueChars.length && !currentQuoteUniqueChars.some(letter => isLetter(letter) && !selectedLetters.includes(letter))) {
      dispatch(endTimer());
      console.log("game over");
    }
  }, [currentQuoteUniqueChars, selectedLetters, dispatch])

  useEffect(() => {
    if(currentTime) {
      sendGameResult({ quoteId: currentQuoteId, length: currentQuoteValue.length, uniqueCharacters: currentQuoteUniqueChars.length, userName: currentUser, errors: currentErrors, duration: currentTime });
      dispatch(fetchScoresAsync());
      dispatch(nextStep());
    }
  }, [currentQuoteUniqueChars, currentErrors, currentQuoteId, currentQuoteValue, currentUser, currentTime, dispatch])

  return (
    <Box sx={{ maxWidth: "60vh" }}>
      {
        currentQuoteValue &&
        <>
          <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", padding: 6, borderWidth: "medium", marginBottom: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {renderQuote}
            </Box>
            <Typography sx={{ marginBottom: 1 }}>Waiting for your input, enter the next letter in the box below:</Typography>
            <TextField size='small' onChange={event => inputLetter(event.target.value.toLowerCase())} value={""} label="Next letter" variant="outlined" sx={{ borderColor: "white", width: "100px" }} />
          </Card>
          <Box sx={{ display: "flex", justifyContent: "space-between"}}>
            <Box>
              <Typography>Letters already selected: {selectedLetters.join(", ")}</Typography>
              <Typography>Errors: {currentErrors}</Typography>
            </Box>
            <Button variant="contained" onClick={() => resetGame()}>Reset</Button>
          </Box>
        </>
      }
    </Box>
  )
}