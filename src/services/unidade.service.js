import axios from "@/services/api.js";

class UnidadeService {
  create(data) {
    return axios.post("/unidade", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getUnidade(id) {
    return axios.get(`/unidade/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/unidade", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/unidade/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getUnidades(filter){
    return axios.get(`/unidades/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(tipo, id){
    return axios.get(`/unidadescombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new UnidadeService();