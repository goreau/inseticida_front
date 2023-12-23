<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Movimento</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Tipo</label>
                                <div class="control has-icons-left has-icons-right">
                                    <div class="columns">
                                        <div class="column is-offset-2">
                                            <div class="columns" v-if="nivel==1">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="1" v-model="movimento.tipo" />
                                                    Entrada
                                                </label>
                                            </div>
                                            <div class="columns">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="2" v-model="movimento.tipo" />
                                                    Devolução
                                                </label>
                                            </div>
                                            <div class="columns">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="3" v-model="movimento.tipo" />
                                                    Repasse
                                                </label>
                                            </div>
                                            <div class="columns">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="4" v-model="movimento.tipo" />
                                                    Consumo
                                                </label>
                                            </div>
                                            <div class="columns">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="5" v-model="movimento.tipo" />
                                                    Transferência
                                                </label>
                                            </div>
                                            <div class="columns" v-if="nivel==1">
                                                <label class="radio">
                                                    <input type="radio" name="tipo" value="9" v-model="movimento.tipo" />
                                                    Descarte
                                                </label>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <span class="is-error" v-if="v$.movimento.tipo.$error">
                                    {{ v$.movimento.tipo.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Produto</label>
                                <div class="control">
                                    <CmbLote @selLote="movimento.id_lote = $event" />
                                    <span class="is-error" v-if="v$.movimento.id_lote.$error">
                                        {{ v$.movimento.id_lote.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Local</label>
                                <div class="control">
                                    <CmbLocalMov :id_prop="currentUser.id" :tipo="movimento.tipo"
                                        @selUnid="movimento.or_dest = $event"
                                        :errclass="{ 'is-danger': v$.movimento.or_dest.$error }" />
                                    <span class="is-error" v-if="v$.movimento.or_dest.$error">
                                        {{ v$.movimento.or_dest.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Data</label>
                                <div class="control">
                                    <input type="date" id="dtMov">
                                </div>
                                <span class="is-error" v-if="v$.movimento.dt_movimento.$error">
                                    {{ v$.movimento.dt_movimento.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Quantidade</label>
                                <input type="text" class="input" placeholder="Quantidade do Produto"
                                    v-model="movimento.quantidade" />
                                <span class="is-error" v-if="v$.movimento.quantidade.$error">
                                    {{ v$.movimento.quantidade.$errors[0].$message }}
                                </span>
                            </div>

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
import movimentoService from "@/services/movimento.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbLote from "@/components/forms/CmbLote.vue";
import CmbLocalMov from "@/components/forms/CmbLocalMov.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';

import {
    required$,
    minValue$,
    combo$,
} from "../../components/forms/validators.js";


export default {
    components: {
        Loader,
        Message,
        footerCard,
        CmbLote,
        CmbLocalMov
    },
    data() {
        return {
            movimento: {
                id_users: 0,
                id_lote: 0,
                tipo: 0,
                id_unidade: 0,
                dt_movimento: '',
                quantidade: '',
                master: 0,
                or_dest: 0,
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            nivel: 0,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: '',
                aux: false
            }
        };
    },
    validations() {
        return {
            movimento: {
                id_lote: { minValue: combo$(1), },
                or_dest: { minValue: combo$(1), },
                tipo: { required$ },
                dt_movimento: { required$ },
                quantidade: { required$, minValue: 0.01 }
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

                movimentoService.create(this.movimento).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Movimento inserido com sucesso!!";
                        this.type = "success";
                        this.caption = "Movimento";
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Movimento";
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
                this.caption = "Movimento";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
    },
    mounted() {
        let cUser = this.currentUser;
        console.log(cUser);
        if (cUser) {
            this.movimento.id_users = cUser.id;
            this.nivel = cUser.role;
            this.movimento.id_unidade = cUser.unidade;
        }

        const options = {
            type: "date",
            dateFormat: "dd/MM/yyyy",
            showHeader: false,
            color: "primary"
        };

        var calendar = bulmaCalendar.attach('[type=date]', options);

        const element = document.querySelector('#dtMov');
        if (element) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            element.bulmaCalendar.on('select', datepicker => {
                this.movimento.dt_movimento = moment(datepicker.data.startDate).format('YYYY-MM-DD');
            });
        }
    },
};
</script>

<style scoped>
label.radio {
    margin-left: 1rem;
    margin-top: .5rem;
}

.fieldset {
    border: 1px solid;
    padding-bottom: .4rem;
    padding-top: .4rem;
}
</style>
