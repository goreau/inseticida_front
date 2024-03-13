<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Relatórios</p>
          </header>
          <div class="card-content">
            <div class="content">
              <section class="section">
                <div class="dvTipo">
                  <label class="label">Filtros:</label>
                  <div class="columns" v-if="tipo_relat == 4">
                    <div class="column is-full">
                      <label class="label">Tipo</label>
                      <div class="control has-icons-left has-icons-right">
                        <div class="columns">
                          <div class="column is-offset-2">
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="1" v-model="filter.tipo" />
                                Entrada
                              </label>
                            </div>
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="2" v-model="filter.tipo" />
                                Devolução
                              </label>
                            </div>
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="3" v-model="filter.tipo" />
                                Repasse
                              </label>
                            </div>
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="4" v-model="filter.tipo" />
                                Consumo
                              </label>
                            </div>
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="5" v-model="filter.tipo" />
                                Transferência
                              </label>
                            </div>
                            <div class="columns">
                              <label class="radio">
                                <input type="radio" name="tipo" value="9" v-model="filter.tipo" />
                                Descarte
                              </label>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Unidade</label>
                        <div class="control">
                          <CmbUnidade :id_prop="currentUser.id" :sel="filter.id_unidade"
                            @selUnid="filter.id_unidade = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Produto</label>
                        <div class="control">
                          <CmbProduto :sel="filter.id_produto" @selProd="filter.id_produto = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns" v-if="tipo_relat == 1">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Município</label>
                        <div class="control">
                          <CmbLocalMov :id_prop="currentUser.id" :sel="filter.id_municipio"
                            @selUnid="filter.id_municipio = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns" v-if="hasData">
                    <div class="column is-half">
                      <label class="label">Início</label>
                      <div class="field">
                        <div class="control">
                          <input type="date" id="dtIni" />
                        </div>
                      </div>
                    </div>

                    <div class="column is-half">
                      <label class="label">Término</label>
                      <div class="field">
                        <div class="control">
                          <input type="date" id="dtFim" />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section" v-if="tipo_relat > 0">
                <div class="columns is-centered">
                  <div class="column is-4">
                    <div class="control">
                      <button class="button is-link submit-btn is-fullwidth" id="login" @click="processar">
                        <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                        Processar
                      </button>
                    </div>
                  </div>
                </div>
              </section>
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
import CmbUnidade from "@/components/forms/CmbUnidade.vue";
import CmbLocalMov from "@/components/forms/CmbLocalMov.vue";
import CmbProduto from "@/components/forms/CmbProduto.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

export default {
  data() {
    return {
      tipo_relat: 0,
      filter: {
        id_unidade: 0,
        dt_inicio: "",
        dt_final: "",
        id_produto: 0,
        id_municipio: 0,
        tipo: 0
      },
      hasData: false,
      ini_date: '',
      fim_date: '',
      id_usuario: 0,
      unidade: "",
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbUnidade,
    CmbProduto,
    CmbLocalMov,
  },
  methods: {
    processar() {
      localStorage.setItem('filter', JSON.stringify(this.filter));

      if (this.tipo_relat < 100) {
        this.$router.push(`/report/${this.tipo_relat}`);
      } else {
        this.$router.push(`/reportN/${this.tipo_relat}`);
      }
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.id_usuario = cUser.id;
    }

    var obj = localStorage.getItem('filter');
    if (obj) {
      this.filter = JSON.parse(obj);

      this.ini_date = this.filter.dt_inicio == '' ? null : moment(String(this.filter.dt_inicio)).format('DD/MM/YYYY');
      this.fim_date = this.filter.dt_final == '' ? null : moment(String(this.filter.dt_final)).format('DD/MM/YYYY');
    }
    if (this.hasData){

      const element = document.querySelector('#dtIni');

      if (element.type == 'text') {
        return true;
      }

      var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        dateStart: this.ini_date,
        showHeader: false,
        color: "primary"
      };

      var calini = bulmaCalendar.attach('#dtIni', options);

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }

      options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        dateStart: this.fim_date,
        showHeader: false,
        color: "primary"
      };

      var calfim = bulmaCalendar.attach('#dtFim', options);

      const element2 = document.querySelector('#dtFim');
      console.log(element2);
      if (element2) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element2.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    }
  },
  created() {
    this.tipo_relat = this.$route.params.id;
    var dtarray = new Array('1', '3', '4', '6', '7', '8');
    this.hasData = dtarray.indexOf(this.tipo_relat) != -1;
    console.log(this.hasData)
  }, 
  watch: {
    '$route' () {
      this.tipo_relat = this.$route.params.id;
    }
  },
};
</script>

<style scoped>
.submit-btn {
  background-color: #4f52a3;
  color: #e6e2db;
  font-weight: bold;
  border: 2px solid #13156e;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}

.btico {
  padding-right: 2rem;
  margin-left: -2rem;
}

section {
  padding: .5rem;
}

.radio {
  margin-left: 1rem !important;
  width: 100%;
}

.flatpickr-input {
  width: auto;
}

.flatpickr-input[readonly] {
  width: auto;
}

.dvTipo {
  border: 1px solid #aaa;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  width: 100%;
}
</style>
