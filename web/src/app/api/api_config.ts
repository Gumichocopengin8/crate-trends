import axiosBase from 'axios';

const urlBase = 'http://localhost:8080/api/v1';
const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export const axios = axiosBase.create({
  baseURL: urlBase,
  headers,
  responseType: 'json',
});

export const cratesURL = '/crates';
