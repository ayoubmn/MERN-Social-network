//export const BASE_URL = 'http://localhost:3000'
//export const BASE_URL = 'https://garfield-network.herokuapp.com/'
const production  = 'https://garfield-network.herokuapp.com';
const development = 'http://localhost:3000/';
export const BASE_URL  = (process.env.NODE_ENV=="production" ? production : development);