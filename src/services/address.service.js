import axios from "@/services/api.js";

class AddressService {
  create(data) {
    return axios.post("/address", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getAddress(id) {
    return axios.get(`/address/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/address", data)
    .then(response => {
      return response;
    },
    (error) => {
        throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/address/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getAddresss(filter){
    return axios.get(`/addresss/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getAddressRecibo(mun){
    return axios.get(`/addressrecibo/${mun}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new AddressService();