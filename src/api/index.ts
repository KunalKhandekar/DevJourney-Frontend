/**
 * Node modules
*/
import axios from "axios";

export const devJourneyAPI = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});
