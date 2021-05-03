import axios from 'axios';

export const axiosWithAuth = () => {
  const token = process.env.REACT_APP_STRIPE_SECRET_KEY;

  return axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
