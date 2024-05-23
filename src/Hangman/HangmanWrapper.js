import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectStep } from '../Slices/stepsSlice';
import { HangmanInitialCard } from './HangmanInitalCard';
import { HangmanMainScreen } from './HangmanMainScreen';
import { HangmanScoreScreen } from './HangmanScoreScreen';

export function HangmanWrapper() {
  const currentStep = useSelector(selectStep);

  const renderScreen = (step) => {
    switch(step) {
      case 1:
        return <HangmanInitialCard />;
      case 2:
        return <HangmanMainScreen />;
      case 3:
        return <HangmanScoreScreen />
      default: 
        return <HangmanInitialCard />;
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {
        renderScreen(currentStep)
      }
    </Box>
  )
}