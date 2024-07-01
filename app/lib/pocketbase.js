// pocketbase.js

import PocketBase from 'pocketbase';

const API_BASE_URL = process.env.apiBaseUrl;


const pocketBase = new PocketBase(API_BASE_URL);

export default pocketBase;