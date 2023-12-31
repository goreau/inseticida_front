<template>
    <div class="main-container">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                    Acesso
                  </p>
              </header>
              <div class="card-content">
                <div class="content">                
                  <div class="field">
                    <label class="label">Login</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input is-danger" type="text" placeholder="Nome de usuário" v-model="user.login">
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="fa-solid fa-user" />
                      </span>
                    </div>
                  </div>
                  <div class="field">
                      <label class="label">Senha</label>
                      <div class="control has-icons-left">
                          <input class="input" type="password" v-model="user.senha" placeholder="Sua senha">
                          <span class="icon is-small is-left">
                            <font-awesome-icon icon="fa-solid fa-lock" />
                          </span>
                        </div>
                  </div>
                  <a href="#" @click="openCadastro">Login via Sisaweb</a>
                </div>
              </div>
              <footer class="card-footer">
                <footerCard @submit="login" @cancel="null" @aux="details" :cFooter="cFooter" />
              </footer>
            </div>
          </div>
        </div>
        <confirm-dialog ref="confirmDialog"></confirm-dialog>
        <new-senha-dialog ref="newSenhaDialog"></new-senha-dialog>
      </div>
  </template>
  
  <script>
  import Message from '@/components/general/Message.vue'
  import footerCard from '@/components/forms/FooterCard.vue'
  import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
  import NewSenhaDialog from '@/components/forms/NewSenhaDialog.vue';
  import authService from "@/services/auth.service";

  
  export default {
    data() {
      return {
        user: {
          login: '',
          senha: '',
        },
        isNewUser: false,
        isLoading: false,
        message: '',
        caption: '',
        type: '',
        showMessage: false,
        cFooter:{
          strSubmit:'Entrar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
        }
      }
    },
    computed: {
    /*  loggedIn() {
        return this.$store.getters['auth/isLogged'];
      }*/
    },
    components: {
      Message,
      footerCard,
      ConfirmDialog,
      NewSenhaDialog
    },
    created() {
      document.getElementById('main').className = "main_colapsed";
      this.$store.dispatch("auth/logout").then(() => {});
    /*  if (this.loggedIn) {
        this.$router.push("/home");
      }*/
    },
    methods: {
      closeModal() {
        this.isNewUser = false;
      },
      openCadastro(){
        this.$router.replace({ name: 'loginsw' });
      },
      login() {
        document.getElementById('login').classList.add('is-loading');
      /*  let user = {
          login: this.login,
          senha: this.senha
        }*/
  
        this.$store.dispatch("auth/login", this.user)
          .then(
            () => {
              document.getElementById('main').className = "main";
              this.$router.push({ name: 'home' });
            },
            async (error) => {
              this.message =
              (error.response &&
                error.response.data) ||
              error.message ||
              error.toString();

              if (this.message == 'Alterar senha'){
                const senha = await this.$refs.newSenhaDialog.show({
                  okButton: 'Confirmar',
                });
                if (senha != ''){
                  this.user.senha = senha;
                  authService.firstAccess(this.user).then(
                    (response) => {
                      this.showMessage = true;
                      this.msg = "Dados do usuário alterados comm sucesso.";
                      this.type = "success";
                      this.caption = "Usuário";
                      setTimeout(() => (this.showMessage = false), 3000);
                    },
                    (error) => {
                      this.msg =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.response.data ||
                        error.message ||
                        error.toString();
                      this.showMessage = true;
                      this.type = "alert";
                      this.caption = "Usuário";
                      setTimeout(() => (this.showMessage = false), 3000);
                    }
                  );
              } else {
              
                this.isLoading = false;
                this.showMessage = true;
                this.type = 'alert';
                this.caption = 'Erro';
                
                setTimeout(() => this.showMessage = false, 3000);
              }
            }}
          )
          .finally(() => {
            document.getElementById('login').classList.remove('is-loading');
          });
      },
      cancelRegister(){
        this.isRegistering = false;
      },
      registerOk() {
        this.isRegistering = false;
      }
    }
  
  }
  
  </script>
  
  <style scoped>
  .card-footer {
      padding: 1rem;
  }
  
  .card-footer .button {
      width: 100%;
  }

  
  </style>