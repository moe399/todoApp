// pocketbase.js

import PocketBase from 'pocketbase';

const API_BASE_URL = "http://127.0.0.1:8090";


const pocketBase = new PocketBase(API_BASE_URL);

export default pocketBase;