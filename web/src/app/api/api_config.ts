import axiosBase from 'axios';

const urlBase = process.env.BASE_URL;
const headers = {
  'Content-Type': 'application/json',
  // 'X-Requested-With': 'XMLHttpRequest',
};

export const axios = axiosBase.create({
  baseURL: urlBase,
  headers,
  responseType: 'json',
});

export const cratesURL = '/crates';
