import axios from "@/services/api.js";

class RevalidaService {
  create(data) {
    return axios.post("/revalida", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getRevalida(id) {
    return axios.get(`/revalida/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/revalida", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/revalida/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getRevalidas(filter){
    return axios.get(`/revalidas/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(tipo, id){
    return axios.get(`/revalidascombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new RevalidaService();