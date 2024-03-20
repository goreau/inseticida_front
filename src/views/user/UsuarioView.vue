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
                <label class="label">Local</label>
                <div class="control">
                  <CmbUnidade
                    :id_prop="currentUser.id"
                    @selUnid="user.id_unidade = $event"
                    :errclass="{ 'is-danger': v$.user.id_unidade.$error }"
                  />
                  <span class="is-error" v-if="v$.user.id_unidade.$error">
                    {{ v$.user.id_unidade.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Nível</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="1"
                      v-model="user.nivel"
                      :disabled="currentUser.nivel > 1"
                    />
                    Administrador
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      v-model="user.nivel"
                      :disabled="currentUser.nivel > 2"
                    />
                    Gestor Regional
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      v-model="user.nivel"
                    />
                    Usuário Setor
                  </label>
                </div>
                <span class="is-error" v-if="v$.user.nivel.$error">
                    {{ v$.user.nivel.$errors[0].$message }}
                </span>
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
                    type="password"
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
                    type="password"
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
            <footerCard @submit="register" @cancel="null" @aux="details" :cFooter="cFooter" />
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
        nome: "",
        login: "",
        senha: "",
        email: "",
        id_unidade: 0,
        nivel: 0,
        id_prop: 0,
        active: true
      },
      senha: '',
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Cadastrar',
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
        id_unidade: {minValue: combo$(1)},
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
    register() {
      this.v$.$validate(); 
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        authService.register(this.user).then(
          (response) => {
            this.showMessage = true;
            this.message = "Usuário cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Usuário";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
             /* (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.data.err ||
              error.message ||
              error.toString();*/
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
};
</script>

<style scoped></style>
