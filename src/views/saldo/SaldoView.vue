<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-8">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Movimento e Saldo</p>
                    </header>
                    <div class="card-content">
                        <p class="card-header-title is-centered">Filtros</p>
                        <div class="columns">
                            <div class="column is-3 is-offset-1">
                                <div class="field">
                                    <label class="label">Unidade</label>
                                    <div class="control">
                                        <CmbUnidade :id_prop="currentUser.id" @selUnid="filter.unidade = $event" />
                                        <span class="is-error" v-if="vv$.filter.unidade.$error">
                                            {{ vv$.filter.unidade.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-4">
                                <div class="field">
                                    <label class="label">Produto</label>
                                    <div class="field has-addons">
                                        <div class="control is-expanded">
                                            <CmbLote :unid="filter.unidade" @selLote="filter.lote = $event" :tipo="filter.tipo" />
                                            <span class="is-error" v-if="vv$.filter.lote.$error">
                                                {{ vv$.filter.lote.$errors[0].$message }}
                                            </span>
                                        </div>
                                        <div class="control">
                                            <button class="button is-info is-outlined" id="trocalotes" @click="changeLote">
                                            Todos os Lotes
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="column is-1">
                                <label class="label">&nbsp;</label>
                                <button class="button is-primary is-outlined" @click="resumo">
                                    <span class="icon">
                                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                    </span>
                                    <span>Ver Resumo</span>
                                </button>
                            </div>
                            <div class="column is-1 is-offset-1">
                                <label class="label">&nbsp;</label>
                                <button class="button is-link is-outlined" @click="crono">
                                    <span class="icon">
                                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                    </span>
                                    <span>Ver Histórico</span>
                                </button>
                            </div>
                        </div>
                        <span v-if="hasData">
                            <p class="card-header-title is-centered">Movimentos Registrados</p>
                            <table class="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Entrada</th>
                                        <th>Devolução</th>
                                        <th>Repasse</th>
                                        <th>Consumo</th>
                                        <th>Transferência</th>
                                        <th>Descarte</th>
                                        <th>Saldo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="has-text-success">{{ dataHist.entrada }}</td>
                                        <td class="has-text-success">{{ dataHist.devolucao }}</td>
                                        <td class="has-text-danger">{{ dataHist.repasse }}</td>
                                        <td class="has-text-danger">{{ dataHist.consumo }}</td>
                                        <td class="has-text-danger">{{ dataHist.transferencia }}</td>
                                        <td class="has-text-danger">{{ dataHist.descarte }}</td>
                                        <th class="has-text-link">{{ saldo_historico }}</th>
                                    </tr>
                                </tbody>
                            </table>
                        
                            <br>
                            <hr>
                            <p class="card-header-title is-centered">Saldo do Sistema</p>
                            <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Criado Em</th>
                                    <th>Alterado em</th>
                                    <th>Saldo</th>
                                    <th>Ações</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in dataTable" :key="row.id_saldo">
                                    <td class="has-text-success">{{ row.criado }}</td>
                                    <td class="has-text-success">{{ row.atualizado }}</td>
                                    <td class="has-text-danger">{{ row.qt_saldo }}</td>
                                    <td class="has-text-danger">
                                        <button @click="edit(row.id_saldo)" type="button" :disabled="cannotEdit" class="button is-primary is-outlined" title="Editar">
                                            <span class="icon is-small is-left">
                                                <font-awesome-icon icon="fa-solid fa-edit" />
                                            </span>
                                        </button>
                                    </td>  
                                </tr>
                            </tbody>
                            </table>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
    <new-saldo-dialog ref="newSaldoDialog"></new-saldo-dialog>
</template>

<script>
import saldoService from "@/services/saldo.service";
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";
import NewSaldoDialog from '@/components/forms/NewSaldoDialog.vue';
import useValidate from "@vuelidate/core";
import {
    combo$,
} from "../../components/forms/validators.js";
import CmbLote from "@/components/forms/CmbLote.vue";
import CmbUnidade from "@/components/forms/CmbUnidade.vue";

export default {
    name: 'Saldo',
    data() {
        return {
            filter: {
                lote: 0,
                unidade: 1,
                tipo: 0
            },
            tableName: 'saldo',
            dataTable: [],
            dataHist: [],
            saldo_historico: 0,
            isLoading: false,
            id_user: 0,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            vv$: useValidate(),
            hasData: false,
            cannotEdit: true,
        }
    },
    validations() {
        return {
            filter: {
                lote: { minValue: combo$(1), },
                unidade: { minValue: combo$(1), },
            },
        };
    },
    components: {
        Loader,
        ConfirmDialog,
        Message,
        NewSaldoDialog,
        CmbLote,
        CmbUnidade
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    mounted(){
        let cUser = this.currentUser;
        if (cUser) {
            this.cannotEdit = cUser.nivel != 1;
        }
    },
    methods: {
        changeLote(){
            let btn = document.getElementById('trocalotes');
            if(this.filter.tipo == 3){
                this.filter.tipo =  0;
                btn.innerHTML = 'Todos os Lotes';
            } else {
                this.filter.tipo = 3;
                btn.innerHTML = 'Lotes Ativos';
            }
            
        },
        resumo(){
            this.vv$.$validate(); // checks all inputs
            if (!this.vv$.$error) {
                this.getHistory();
            } else {
                this.message = "Todos os filtros são obrigatórios";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Saldo";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        crono() {
            this.vv$.$validate(); // checks all inputs
            if (!this.vv$.$error) {
                this.$router.push(`/crono/${this.filter.lote}/${this.filter.unidade}`);
            } else {
                this.message = "Todos os filtros são obrigatórios";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Saldo";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        async edit(e){
            const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Essa opção só deve ser utilizada após verificação dos movimentos para confirmação da discrepância!!\r\nDeseja mesmo alterar esse saldo?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                const newSaldo = await this.$refs.newSaldoDialog.show({
                  okButton: 'Confirmar',
                });
                if (newSaldo != ''){
                    let values = {
                        id_saldo: e,
                        qt_saldo: newSaldo
                    }
                    saldoService.update(values)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Saldo alterado com sucesso!!";
                        this.type = "success";
                        this.caption = "Saldo"; 
                        setTimeout(() => {
                            this.showMessage = false;
                            location.reload();
                        }, 3000); 
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Saldo";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .catch((error)=>{
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Saldo";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                   // 
                }
                
              }
        },
        calcSaldo() {
            let sd = parseFloat(this.dataHist.entrada) + parseFloat(this.dataHist.devolucao) - 
                (parseFloat(this.dataHist.repasse) + parseFloat(this.dataHist.consumo) + parseFloat(this.dataHist.transferencia) + parseFloat(this.dataHist.descarte));
            this.saldo_historico = sd.toFixed(2);
        },
        getHistory() {
            this.isLoading = true;
            saldoService.getHistorico(this.filter)
                .then((response) => {
                    this.dataHist = response.data.historico;
                    this.calcSaldo();
                    this.dataTable = response.data.saldo;
                    this.isLoading = false;
                    this.hasData = true;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => this.isLoading = false);
        }
    }
}
</script>

<style></style>