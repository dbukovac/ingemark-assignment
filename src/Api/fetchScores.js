import axios from 'axios';

export async function fetchScores() {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }