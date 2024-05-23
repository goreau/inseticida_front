<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Unidade</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Regional</label>
                                <div class="control">
                                    <CmbRegional :id_prop="currentUser.id" :tipo="1"
                                        @selUnid="unidade.id_regional = $event"
                                        :errclass="{ 'is-danger': v$.unidade.id_regional.$error }" />
                                    <span class="is-error" v-if="v$.unidade.id_regional.$error">
                                        {{ v$.unidade.id_regional.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="field">
                                <label class="label">Código</label>
                                <input type="text" class="input" placeholder="Código da Unidade"
                                    v-model="unidade.codigo" />
                                <span class="is-error" v-if="v$.unidade.codigo.$error">
                                    {{ v$.unidade.codigo.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Nome</label>
                                <input type="text" class="input" placeholder="Nome da unidade" v-model="unidade.nome" />
                                <span class="is-error" v-if="v$.unidade.nome.$error">
                                    {{ v$.unidade.nome.$errors[0].$message }}
                                </span>
                            </div>
                            
                            <div class="field">
                                <label class="label">Tipo</label>
                                <div class="control has-icons-left has-icons-right">
                                    <label class="radio">
                                        <input type="radio" name="role" value="0" v-model="unidade.tipo"
                                            :disabled="currentUser.nivel > 1" />
                                        Nível Central
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="role" value="1" v-model="unidade.tipo"
                                            :disabled="currentUser.nivel > 2" />
                                        Regional
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="role" value="2" v-model="unidade.tipo" />
                                        Setor
                                    </label>
                                </div>
                                <span class="is-error" v-if="v$.unidade.tipo.$error">
                                    {{ v$.unidade.tipo.$errors[0].$message }}
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
import unidadeService from "@/services/unidade.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbRegional from "@/components/forms/CmbRegional.vue";


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
        CmbRegional
    },
    data() {
        return {
            unidade: {
                id_users: 0,
                id_regional: 0,
                nome: '',
                codigo: '',
                tipo: 2,
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
            unidade: {
                id_regional: { minValue: combo$(1), },
                nome: { required$, maxLength: maxLength$(255) },
                codigo: { required$, maxLength: maxLength$(255) },
                tipo: { required$, minValue: combo$(1) },
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

                unidadeService.create(this.unidade).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Unidade inserida com sucesso!!";
                        this.type = "success";
                        this.caption = "Endereço";
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Unidade";
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
                this.caption = "Unidade";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
    },
    mounted() {
        let cUser = this.currentUser;

        if (cUser) {
            if (cUser.id != 11) {
                this.message = "Você não tem permissão para inserir novas unidades";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Unidade";
                setTimeout(() => {
                    this.showMessage = false;
                    this.$router.go(-1);
                }, 3000);
                
            }
            this.unidade.id_users = cUser.id;
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
