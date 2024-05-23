import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectScores } from '../Slices/scoresSlice';
import { calculateScore } from '../Utils/utils';
import { newGame } from '../Slices/stepsSlice';
import { resetTimer, selectTime } from '../Slices/timerSlice';
import { resetErrors, selectErrors } from '../Slices/errorsSlice';
import { selectQuoteUniqueChars, selectQuoteValue } from '../Slices/quoteSlice';
import { selectUser } from '../Slices/userSlice';

export function HangmanScoreScreen() {
  const [order, setOrder] = useState('desc');

  const dispatch = useDispatch();

  const currentScores = useSelector(selectScores);

  const currentQuoteValue = useSelector(selectQuoteValue);
  const currentQuoteUniqueChars = useSelector(selectQuoteUniqueChars);
  const currentErrors = useSelector(selectErrors);
  const currentUser = useSelector(selectUser);
  const currentTime = useSelector(selectTime);

  const descendingComparator = (a, b) => {
    if (b.points < a.points) {
      return -1;
    }
    if (b.points > a.points) {
      return 1;
    }
    return 0;
  }

  const getComparator = useCallback(() => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b);
  }, [order])

  const rows = useMemo(() => {
    const userScore = [{
      length: currentQuoteValue.length,
      uniqueCharacters: currentQuoteUniqueChars.length,
      userName: currentUser,
      errors: currentErrors,
      duration: currentTime
    }];
    const allScores = currentScores.concat(userScore);
    return allScores.map(score => { return { username: score.userName, points: calculateScore(score.errors, score.uniqueCharacters, score.length, score.duration) } }).sort(getComparator())
  }, [currentScores, currentQuoteValue, currentQuoteUniqueChars, currentUser, currentErrors, currentTime, getComparator]);

  const handleSort = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  }

  const resetGame = () => {
    dispatch(resetTimer());
    dispatch(resetErrors());
    dispatch(newGame());
  }

  return (
    rows && 
    <Box>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant='h4'>Highscores</Typography>
        <Button variant="contained" onClick={() => resetGame()}>Start new game</Button>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 600, borderStyle: "solid" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>User name</Typography>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active
                  direction={order}
                  onClick={() => handleSort()}
                >
                  <Typography variant='h6'>Score</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}