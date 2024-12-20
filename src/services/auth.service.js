import axios from "@/services/api.js";
import authHeader from './auth.header.js';

class AuthService {
    login(user) {
       return axios.post("/login", {
          login: user.login,
          senha: user.senha
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.removeItem('filter');
            localStorage.removeItem('undefined');
          } 
    
          return response.data;
        },
        (error) => {
             return error.data;
       })
    }

    logout() {
      localStorage.removeItem('user');
    }

    register(data) {
      return axios.post("/user", data)
      .then(response => {
        return response;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    list() {
     /* var headers = authHeader();
      headers['Content-Type'] = "application/json";
      var header = { headers: headers };*/

      return axios.get("/users")
      .then(response => {
        return response.data;
      })
    }

    update(data) {
      return axios.put("/user", data)
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    newMail(data) {
      return axios.put("/newmail", data)
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    firstAccess(data) {
      return axios.put("/firstaccess", data)
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    edit(data) {
      return axios.put('/editUser', data)
      .then(response => {
        return response.msg;
      },
      (error) => {
        throw new Error(error.data.msg);
      })
    }

    delete(id) {
      return axios.delete(`/user/${id}`)
      .then(response => {
        return response;
      },
      (error) => {
        return error.response.data;
      })
    }
  

    getUserData(id) {
      return axios.get(`/user/${id}` )
      .then(response => {
        return response;
      })
    }  

    inativos() {
       return axios.get("/inativos")
       .then(response => {
         return response.data;
       });
     }

     setAtivo(id){
      return axios.put('/setAtivo', {'id': id})
      .then(response => {
        return response.data;
      },
      (error) => {
        return error.response.data;
      })
     }

    updateDb() {
      return axios.get("/updatedb")
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }
    
}

export default new AuthService();