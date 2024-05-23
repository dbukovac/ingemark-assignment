import axios from 'axios';

export async function fetchQuote() {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      return { id: response.data._id, content: response.data.content };
    } catch (error) {
      console.error(error);
    }
  }