import axios from "@/services/api.js";

class MovimentoService {
  create(data) {
    return axios.post("/movimento", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getMovimento(id) {
    return axios.get(`/movimento/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getDuplicates(filter) {
    return axios.get(`/duplicates/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/movimento", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/movimento/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getMovimentos(filter){
    return axios.get(`/movimentos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new MovimentoService();