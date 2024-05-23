import axios from "@/services/api.js";

class UnidadeService {
  create(data) {
    return axios.post("/unidade", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
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
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/unidade/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data);
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

  getCombo(){
    return axios.get(`/unidadescombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getComboReg(){
    return axios.get(`/regionaiscombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getComboMov(tipo, id_prop){
    return axios.get(`/movcombo/${tipo}/${id_prop}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new UnidadeService();