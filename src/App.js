import { Box, Typography } from "@mui/material";
import { HangmanWrapper } from "./Hangman/HangmanWrapper";

function App() {
  return (
      <Box sx={{ height: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <Typography variant="h1">Hangman game</Typography>
        </Box>
        <HangmanWrapper />
      </Box>
  );
}

export default App;
