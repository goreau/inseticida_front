<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message
          v-if="showMessage"
          @do-close="closeMessage"
          :msg="message"
          :type="type"
          :caption="caption"
        />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Usuário</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="user.nome"
                    :class="{ 'is-danger': v$.user.nome.$error }"
                  />
                  <span class="is-error" v-if="v$.user.nome.$error">
                    {{ v$.user.nome.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Município</label>
                <div class="control">
                  <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="municipio"
                    readonly
                  />
                </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Nível</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      nome="nivel"
                      value="1"
                      v-model="user.nivel"
                      :disabled="true"
                    />
                    Administrador
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      nome="nivel"
                      value="2"
                      v-model="user.nivel"
                      :disabled="true"
                    />
                    Gestor Regional
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      nome="nivel"
                      value="3"
                      v-model="user.nivel"
                      :disabled="true"
                    />
                    Usuário Setor
                  </label>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="E-mail"
                    v-model="user.email"
                    :class="{ 'is-danger': v$.user.email.$error }"
                  />
                  <span class="is-error" v-if="v$.user.email.$error">
                    {{ v$.user.email.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Login</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome de usuário"
                    v-model="user.login"
                    :class="{ 'is-danger': v$.user.login.$error }"
                  />
                  <span class="is-error" v-if="v$.user.login.$error">
                    {{ v$.user.login.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="senha"
                    v-model="user.senha"
                    placeholder="Informe a senha"
                    :class="{ 'is-danger': v$.user.senha.$error }"
                  />
                  <span class="is-error" v-if="v$.user.senha.$error">
                    {{ v$.user.senha.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Confirme a Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="senha"
                    v-model="senha"
                    placeholder="Confirme a senha"
                    :class="{ 'is-danger': v$.senha.$error }"
                  />
                  <span class="is-error" v-if="v$.senha.$error">
                    {{ v$.senha.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="edit" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbUnidade from "@/components/forms/CmbUnidade.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import authService from "@/services/auth.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
  email$,
  sameAs$
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      user: {
        id_users: 0,
        nome: "",
        login: "",
        senha: "",
        email: "",
        id_unidade: 0,
        nivel: 0,
        id_prop: 0,
      },
      senha: '',
      municipio: '',
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Salvar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
        }
    };
  },
  validations(){
    return {
      user: {
        nome: {required$, minLength: minLength$(10)},
        login: {required$, minLength: minLength$(5)},
        senha: {required$, minLength: minLength$(4)},
        email: {required$, email$},
        nivel: { minValue: combo$(1) },
      },
      senha: {sameAs: sameAs$(this.user.senha)}
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/isLogged"];
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbUnidade,
    footerCard
  },
  methods: {
    loadData(){
      this.isLoading = true;

      authService.getUserData(this.user.id_users).then(
        (response) => {
          let data = response.data;
          this.user.nome = data.nome;
          this.user.login = data.login;
          this.id_unidade = data.id_unidade;
          this.municipio = data.unidade;
          this.user.email = data.email;
          this.user.nivel = data.nivel;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.response.data ||
            error.message ||
            error.toString();
          this.showMessage = true;
          this.type = "alert";
          this.caption = "Usuario";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    edit() {
      this.v$.$validate(); 
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        authService.edit(this.user).then(
          (response) => {
            this.showMessage = true;
            this.message = "Dados do usuário alterados com sucesso.";
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
        )
        .finally(() => {
            document.getElementById("login").classList.remove("is-loading");
          });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Usuário";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.user.id_prop = this.currentUser.id;
  },
  created() {
    this.user.id_users = this.$route.params.id;
    this.loadData();
  },
};
</script>

<style scoped></style>
