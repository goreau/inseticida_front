<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Endereço</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Unidade</label>
                                <div class="control">
                                    <CmbUnidade :id_prop="currentUser.id" 
                                        @selUnid="address.id_unidade = $event"
                                        :sel="address.id_unidade"
                                        :errclass="{ 'is-danger': v$.address.id_unidade.$error }" />
                                    <span class="is-error" v-if="v$.address.id_unidade.$error">
                                        {{ v$.address.id_unidade.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="field">
                                <label class="label">Logradouro</label>
                                <input type="text" class="input" placeholder="Nome da rua, avenida, etc"
                                    v-model="address.logradouro" />
                                <span class="is-error" v-if="v$.address.logradouro.$error">
                                    {{ v$.address.logradouro.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Número</label>
                                <input type="text" class="input" placeholder="Número do Imóvel"
                                    v-model="address.numero" />
                                <span class="is-error" v-if="v$.address.numero.$error">
                                    {{ v$.address.numero.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Complemento</label>
                                <input type="text" class="input" placeholder="Complemento"
                                    v-model="address.complemento" />
                                <span class="is-error" v-if="v$.address.complemento.$error">
                                    {{ v$.address.complemento.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Bairro</label>
                                <input type="text" class="input" placeholder="Nome do Bairro"
                                    v-model="address.bairro" />
                                <span class="is-error" v-if="v$.address.bairro.$error">
                                    {{ v$.address.bairro.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">CEP</label>
                                <input type="text" class="input" placeholder="Código Postal"
                                    v-model="address.cep" />
                                <span class="is-error" v-if="v$.address.cep.$error">
                                    {{ v$.address.cep.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">DDD</label>
                                <input type="text" class="input" placeholder=""
                                    v-model="address.ddd" />
                                <span class="is-error" v-if="v$.address.ddd.$error">
                                    {{ v$.address.ddd.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="field">
                                <label class="label">Telefone</label>
                                <input type="text" class="input" placeholder=""
                                    v-model="address.telefone" />
                                <span class="is-error" v-if="v$.address.telefone.$error">
                                    {{ v$.address.telefone.$errors[0].$message }}
                                </span>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="update" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import addressService from "@/services/address.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbUnidade from "@/components/forms/CmbUnidade.vue";


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
        CmbUnidade
    },
    data() {
        return {
            address: {
                id_address: 0,
                id_users: 0,
                id_unidade: 0,
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cep: '',
                ddd: '',
                telefone: '',
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
            address: {
                id_unidade: { minValue: combo$(1), },
                logradouro: {required$, maxLength: maxLength$(255)},
                numero: {required$, maxLength: maxLength$(255)},
                complemento: {maxLength: maxLength$(255)},
                bairro: {required$, maxLength: maxLength$(255)},
                cep: {required$, maxLength: maxLength$(255)},
                ddd: {required$, maxLength: maxLength$(5)},
                telefone: {required$, maxLength: maxLength$(10)},
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

                addressService.update(this.address).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Endereço alterado com sucesso!!";
                        this.type = "success";
                        this.caption = "Endereço";
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Endereço";
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
                this.caption = "Endereço";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        loadData() {
            this.isLoading = true;
            addressService.getAddress(this.address.id_address).then(
                (response) => {
                    let data = response.data;
                    this.address.bairro = data.bairro;
                    this.address.ddd = data.ddd;
                    this.address.cep = data.cep;
                    this.address.id_unidade = data.id_unidade;
                    this.address.logradouro = data.logradouro;
                    this.address.numero = data.numero;
                    this.address.complemento = data.complemento;
                    this.address.telefone = data.telefone;
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
                    this.caption = "Lote";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );
            this.isLoading = false;
        },
    },
    created() {
        this.address.id_address = this.$route.params.id;
        this.loadData();
    },
    mounted() {
        let cUser = this.currentUser;

        if (cUser) {
            this.address.id_users = cUser.id;
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
