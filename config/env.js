
import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    baseURL: process.env.BASE_URL,
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    
};