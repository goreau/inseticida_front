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
            <p class="card-header-title is-centered">Lote</p>
          </header>
          <div class="card-content">
            <div class="content">
                <div class="field">
                  <label class="label">Produto</label>
                  <div class="control">
                    <CmbProduto
                      @selProd="lote.id_produto = $event"
                    />
                    <span class="is-error" v-if="v$.lote.id_produto.$error">
                      {{ v$.lote.id_produto.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Lote</label>
                  <input 
                    type="text"
                    class="input" 
                    placeholder="Lote do Produto" 
                    v-model="lote.lote"
                    />
                    <span class="is-error" v-if="v$.lote.lote.$error">
                      {{ v$.lote.lote.$errors[0].$message }}
                    </span>
                </div>
                <div class="field">
                  <label class="label">Data Validade</label>
                  <div class="control">
                    <input type="date" id="dtVal">
                  </div>
                  <span class="is-error" v-if="v$.lote.dt_validade.$error">
                    {{ v$.lote.dt_validade.$errors[0].$message }}
                  </span>
                </div>
                <div class="field">
                  <label class="label">Data Entrada</label>
                  <div class="control">
                    <input type="date" id="dtEntr">
                  </div>
                  <span class="is-error" v-if="v$.lote.dt_entrada.$error">
                    {{ v$.lote.dt_entrada.$errors[0].$message }}
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
import loteService from "@/services/lote.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbProduto from "@/components/forms/CmbProduto.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';

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
      lote: {
        lote: "",
        id_produto: 0,
        id_users: 0,
        dt_validade: "",
        dt_entrada: ""
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
      lote: {
        lote: {required$, maxLength: maxLength$(255)},
        id_produto: {minValue: combo$(1),},
        dt_validade: {required$},
        dt_entrada: {required$},
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        loteService.create(this.lote).then(
          (response) => {
            this.showMessage = true;
            this.message = "Lote inserido com sucesso!!";
            this.type = "success";
            this.caption = "Lote";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Lote";
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
        this.caption = "Lote";
        setTimeout(() => (this.showMessage = false), 3000);
      }  
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser && cUser.id != 11){
      this.message = "Você não tem permissão para cadastrar novos lotes";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Produto";
        setTimeout(() => {
          this.showMessage = false
          this.$router.go(-1);
        }, 3000);
    }

    if (cUser){
      this.lote.id_users = cUser.id;
    }


    const options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      showHeader: false,
      color: "primary"
    };

    var calendar = bulmaCalendar.attach('[type=date]', options);

    const element = document.querySelector('#dtVal');
    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.lote.dt_validade = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }

    const element2 = document.querySelector('#dtEntr');
    if (element2) {
        element2.bulmaCalendar.on('select', datepicker => {
          this.lote.dt_entrada = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
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
