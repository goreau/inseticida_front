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
            <p class="card-header-title is-centered">Produto</p>
          </header>
          <div class="card-content">
            <div class="content">
                <div class="field">
                  <label class="label">Nome</label>
                  <input 
                    type="text" 
                    class="input"
                    placeholder="Nome do produto" 
                    v-model="produto.nome"
                    />
                    <span class="is-error" v-if="v$.produto.nome.$error">
                      {{ v$.produto.nome.$errors[0].$message }}
                    </span>
                </div>
                <div class="field">
                  <label class="label">Código</label>
                  <input 
                    type="text"
                    class="input" 
                    placeholder="Código do produto" 
                    v-model="produto.codigo"
                    />
                    <span class="is-error" v-if="v$.produto.codigo.$error">
                      {{ v$.produto.codigo.$errors[0].$message }}
                    </span>
              </div>
              <div class="field">
                <label class="label">Unidade</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="1"
                      v-model="produto.unidade"
                    />
                    Quilograma
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      v-model="produto.unidade"
                    />
                    Litro
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      v-model="produto.unidade"
                    />
                    Unidade
                  </label>
                </div>
                <span class="is-error" v-if="v$.produto.unidade.$error">
                    {{ v$.produto.unidade.$errors[0].$message }}
                </span>
              </div>
              <!---->
              
              <!---->
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import produtoService from "@/services/produto.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";

import {
  required$,
  maxLength$,
} from "../../components/forms/validators.js";


export default {
  components: {
    Loader,
    Message,
    footerCard
  },
  data() {
    return {
      produto: {
        id_produto: 0,
        nome: "",
        codigo: 0,
        unidade: 0,
      },
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
  validations() {
    return {
      produto: {
        nome: {required$, maxLength: maxLength$(255)},
        codigo: {required$, maxLength: maxLength$(255)},
        unidade: {required$},
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    update() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        produtoService.update(this.produto).then(
          (response) => {
            this.showMessage = true;
            this.message = "Produto alterado com sucesso!!";
            this.type = "success";
            this.caption = "Produto";
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Produto";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Produto";
        setTimeout(() => (this.showMessage = false), 3000);
      }  
    },
    loadData() {
      this.isLoading = true;
      produtoService.getProduto(this.produto.id_produto).then(
        (response) => {
          let data = response.data;
          this.produto.nome = data.nome;         
          this.produto.codigo = data.codigo;
          this.produto.unidade = data.unidade;
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
          this.caption = "Produto";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );
      this.isLoading = false;
    },
  },
  created() {
    this.produto.id_produto = this.$route.params.id;
    this.loadData();
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser && cUser.id != 11){
      this.message = "Você não tem permissão para cadastrar novos produtos";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Produto";
        setTimeout(() => {
          this.showMessage = false
          this.$router.go(-1);
        }, 3000);
    }
  },
};
</script>

<style scoped>
label.radio{
  margin-left: 1rem;
}
.fieldset{
  border: 1px solid;
  padding-bottom: .4rem;
  padding-top: .4rem;
}
</style>
