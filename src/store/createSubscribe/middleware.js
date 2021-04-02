import axios from 'axios'
import { message } from 'antd'
import { DOMAIN, getHeaders } from '../general'

const BASE_ENDPOINT = `${DOMAIN}/subscribers`;

const createNewSubscribe = (credentials) => {
  axios.post(BASE_ENDPOINT, credentials,)
    .then((response) => {
      if (response.status === 200) {
        message.info('You have been subscribed to updates!')
      }
    })
    .catch((error) => {
      if (error.response) {
        const requestMessage = error.response.data.message
        if (requestMessage) {
          message.error(`Error: ${requestMessage}.`)
        } else {
          message.error('Something went wrong, please try again.')
        }
      }
    })
}
export const getSubscriber = (email) => {
  const headers = getHeaders();
  const result = axios
    .get(`${BASE_ENDPOINT}/${email}`, {headers})
    .then((data) => data)
    .catch((err) => err.response);
  return result
}
export default createNewSubscribe