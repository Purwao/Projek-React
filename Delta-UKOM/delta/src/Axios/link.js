import axios from 'axios';

const url = "http://127.0.0.1:8000/"
// const token ="9HROz90sbZJE0XX7EatXCKqHagalXd0mtapv2bA9"
const token = sessionStorage.getItem('token');
export const link = axios.create({
    baseURL: url,
    headers: {
      'api_token':token
            }
})

