import axios from "@/services/api.js";

class ProdutoService {
  create(data) {
    return axios.post("/produto", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getProduto(id) {
    return axios.get(`/produto/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/produto", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/produto/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getProdutos(filter){
    return axios.get(`/produtos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(tipo, id){
    return axios.get(`/produtoscombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new ProdutoService();