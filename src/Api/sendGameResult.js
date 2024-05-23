import axios from 'axios';

export async function sendGameResult(data) {
    try {
        const response = await axios.post('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores', data, { headers: { 'content-type': 'application/json' } });
        return response;
    } catch (error) {
        console.error(error);
    }
}