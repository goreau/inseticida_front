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
            <p class="card-header-title is-centered">Pedido</p>
          </header>
          <div class="card-content">
            <div class="content">
                <div class="field">
                  <label class="label">Produto</label>
                  <div class="control">
                    <CmbProduto
                      @selProd="pedido.id_produto = $event"
                    />
                    <span class="is-error" v-if="v$.pedido.id_produto.$error">
                      {{ v$.pedido.id_produto.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Quantidade Solicitada</label>
                  <input 
                    type="text"
                    class="input" 
                    placeholder="Quantidade Solicitada" 
                    v-model="pedido.quant_sol"
                    />
                    <span class="is-error" v-if="v$.pedido.quant_sol.$error">
                      {{ v$.pedido.quant_sol.$errors[0].$message }}
                    </span>
                </div>
                <div class="field">
                  <label class="label">Quantidade Liberada</label>
                  <input 
                    type="text"
                    class="input" 
                    placeholder="Quantidade Liberada" 
                    v-model="pedido.quant_lib"
                    disabled
                    />
                </div>
                <div class="field">
                <label class="label">Programa</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="1"
                      v-model="pedido.id_programa"
                    />
                    Arboviroses
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      v-model="pedido.id_programa"
                    />
                    Leishmanioses
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      v-model="pedido.id_programa"
                    />
                    Doença de Chagas
                  </label>
                </div>
                <span class="is-error" v-if="v$.pedido.id_programa.$error">
                    {{ v$.pedido.id_programa.$errors[0].$message }}
                </span>
              </div>
              <div class="field">
                <label class="label">Justificativa</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Motivo do Pedido"
                    v-model="pedido.justifica"
                    :class="{ 'is-danger': v$.pedido.justifica.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.justifica.$error">
                    {{ v$.pedido.justifica.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <hr>
              <h3>Informações Adicionais</h3>
              <div class="field">
                <label class="label">No Máquinas montadas em veículos</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_montada"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">No Máquinas portáteis</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_portatil"
                    :class="{ 'is-danger': v$.pedido.est_portatil.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_portatil.$error">
                    {{ v$.pedido.est_portatil.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">No Pulverizadores</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_pulverizador"
                    :class="{ 'is-danger': v$.pedido.est_pulverizador.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_pulverizador.$error">
                    {{ v$.pedido.est_pulverizador.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">No Imóveis a tratar</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_imoveis"
                    :class="{ 'is-danger': v$.pedido.est_imoveis.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_imoveis.$error">
                    {{ v$.pedido.est_imoveis.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">% Pendência no Controle de Criadouros</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_pendencia"
                    :class="{ 'is-danger': v$.pedido.est_pendencia.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_pendencia.$error">
                    {{ v$.pedido.est_pendencia.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">No Casos na última quinzena</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_casos"
                    :class="{ 'is-danger': v$.pedido.est_casos.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_casos.$error">
                    {{ v$.pedido.est_casos.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Consumo desde último pedido</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="pedido.est_consumo"
                    :class="{ 'is-danger': v$.pedido.est_consumo.$error }"
                  />
                  <span class="is-error" v-if="v$.pedido.est_consumo.$error">
                    {{ v$.pedido.est_consumo.$errors[0].$message }}
                  </span>
                </div>
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
import pedidoService from "@/services/pedido.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbProduto from "@/components/forms/CmbProduto.vue";

import {
  required$,
  maxLength$,
  combo$,
} from "../../components/forms/validators.js";


export default {
  components: {
    Loader,
    Message,
    footerCard,
    CmbProduto
  },
  data() {
    return {
      pedido: {
        id_programa: 0, 
        id_produto: 0, 
        justifica: '', 
        quant_sol: '', 
        quant_lib: '', 
        id_users: 0, 
        id_sisaweb: 0, 
        id_municipio: 0, 
        est_montada: '', 
        est_portatil: '', 
        est_pulverizador: '', 
        est_imoveis: '', 
        est_casos: '', 
        est_pendencia: '', 
        est_consumo: ''
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
        },
      user: null
    };
  },
  validations() {
    return {
      pedido: {
        id_produto: {minValue: combo$(1),},
        id_programa: {required$, minValue: 1}, 
        justifica: {maxLength: maxLength$(255)}, 
        quant_sol: {required$},   
        est_portatil: {required$}, 
        est_pulverizador: {required$}, 
        est_imoveis: {required$}, 
        est_casos: {required$}, 
        est_pendencia: {required$}, 
        est_consumo: {required$}
      },
    };
  },
  methods: {
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');

        this.pedido.id_municipio = this.user.local;
        if (this.pedido.est_montada==''){
          this.pedido.est_montada='0';
        }
        
        pedidoService.create(this.pedido).then(
          (response) => {
            this.showMessage = true;
            this.message = "Pedido inserido com sucesso!!";
            this.type = "success";
            this.caption = "Pedido";
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Pedido";
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
        this.caption = "Pedido";
        setTimeout(() => (this.showMessage = false), 3000);
      }  
    },
  },
  created() {
    this.user = JSON.parse(this.$route.params.user);
    console.log(this.user);
  },
  mounted() {
    if (this.user){
      this.pedido.id_sisaweb = this.user.id;
    }
  }
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
