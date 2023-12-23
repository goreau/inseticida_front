import axios from "@/services/api.js";

class SisawebService {
  login(user) {
    return axios.post("/loginsw", user)
    .then(response => {
      return response;
    },
    (error) => {
        throw new Error(error.data.message);
    })
  } 
}

export default new SisawebService();