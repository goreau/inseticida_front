import axios from "@/services/api.js";

class LoteService {
  create(data) {
    return axios.post("/lote", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getLote(id) {
    return axios.get(`/lote/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/lote", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/lote/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getLotes(filter){
    return axios.get(`/lotes/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(unid, tipo){
    return axios.get(`/lotescombo/${unid}/${tipo}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getUnidProd(id) {
    return axios.get(`/unidprod/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 
  
}

export default new LoteService();