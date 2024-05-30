import axios from "@/services/api.js";

class PedidoService {
  create(data) {
    return axios.post("/pedido", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getPedido(id) {
    return axios.get(`/pedido/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/pedido", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/pedido/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.data;
    })
  }  

  getPedidos(){
    return axios.get(`/pedidos`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getPedidosSw(mun){
    return axios.get(`/pedidos/${mun}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(tipo, id){
    return axios.get(`/pedidoscombo`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new PedidoService();