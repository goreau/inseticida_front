import axios from "@/services/api.js";

class SaldoService {
  

  getHistorico(filter) {
  //  filter = JSON.parse(filter);
    return axios.post(`/historico_saldo`,filter)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/saldo", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getCrono(filter) {
    //  filter = JSON.parse(filter);
      return axios.post(`/crono`,filter)
      .then(response => {
          return {data: response.data};
      },
      (error) => {
          return error;
      })
    } 
  
}

export default new SaldoService();