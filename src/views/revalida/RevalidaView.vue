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
            <p class="card-header-title is-centered">Revalidação</p>
          </header>
          <div class="card-content">
            <div class="content">
                <div class="field">
                  <label class="label">Produto</label>
                  <div class="control">
                    <CmbLote
                      @selLote="revalida.id_lote = $event"
                    />
                    <span class="is-error" v-if="v$.revalida.id_lote.$error">
                      {{ v$.revalida.id_lote.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Nova Validade</label>
                  <div class="control">
                    <input type="date" id="dtVal">
                  </div>
                  <span class="is-error" v-if="v$.revalida.dt_validade.$error">
                    {{ v$.revalida.dt_validade.$errors[0].$message }}
                  </span>
                </div>
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
import revalidaService from "@/services/revalida.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbLote from "@/components/forms/CmbLote.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

import {
  required$,
  combo$,
} from "../../components/forms/validators.js";


export default {
  components: {
    Loader,
    Message,
    footerCard,
    CmbLote
  },
  data() {
    return {
      revalida: {
        id_lote: 0,
        dt_validade: "",
        id_users: 0,
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
      revalida: {
        id_lote:  {minValue: combo$(1),},
        dt_validade: {required$},
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
        
        revalidaService.create(this.revalida).then(
          (response) => {
            this.showMessage = true;
            this.message = "Revalidação inserida com sucesso!!";
            this.type = "success";
            this.caption = "Revalidação";
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Revalidação";
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
        this.caption = "Revalidação";
        setTimeout(() => (this.showMessage = false), 3000);
      }  
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.revalida.id_users = cUser.id;
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
