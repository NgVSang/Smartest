import axios from 'axios';
import {API_KEY} from '../../config';
import {INotice} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  GETDISTANCEMATRIX: '/DistanceMatrix',
  AUTOCOMPLETE: '/Place/AutoComplete',
  GETNAMEBYPOSITION: '/Geocode',
  GETPLACEBYID: '/Place/Detail',
  GETIMAGEDISTANCE: '/staticmap/route',
};

const autoComplete = (text: string) => {
  return axios.get(ENDPOINTS.AUTOCOMPLETE, {
    params: {
      api_key: API_KEY,
      input: text,
      location: '16.05638957685639,108.20458492264152',
      radius: 2000,
      more_compound: true,
    },
    baseURL: 'https://rsapi.goong.io',
  });
};

const getPlaceById = (id: string) => {
  return axios.get(ENDPOINTS.GETPLACEBYID, {
    params: {
      api_key: API_KEY,
      place_id: id,
    },
    baseURL: 'https://rsapi.goong.io',
  });
};

const getDistance = (latitude: number, longitude: number) => {
  return axios.get(ENDPOINTS.GETDISTANCEMATRIX, {
    params: {
      api_key: API_KEY,
      origins: `${latitude},${longitude}`,
      destinations: '16.0119633,108.1837542',
      vehicle: 'car',
    },
    baseURL: 'https://rsapi.goong.io',
  });
};

export const GeoApi = {
  autoComplete,
  getPlaceById,
  getDistance,
};
