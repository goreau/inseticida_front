<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader v-if="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Histórico de Movimentos</p><br>
                        <button class="button is-primary is-outlined" @click="back">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-plus-circle" />
                            </span>
                            <span>Voltar</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <p class="card-header-title is-centered">Unidade: {{ base.unidade }} - Produto: {{ base.produto }} ({{ base.lote }})</p>
                        <hr>
                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import saldoService from "@/services/saldo.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
    name: 'ListaVendas',
    data() {
        return {
            filter: {
                lote: 59,
                unidade: 7
            },
            base: {
                produto: '',
                lote: '',
                unidade: '',
            },
            tableName: 'crono',
            dataTable: [],
            isLoading: false,
            columns: [],
            myspan: null,
            myspan2: null,
            id_user: 0,
        }
    },
    components: {
        MyTable,
        Loader,
        ConfirmDialog
    },
    methods: {
        back(){
            this.$router.back();
        },
        newMovimento() {
            this.$router.push('/movimento');
        },
        editMovimento(id) {
            this.$router.push(`/editmov/${id}`);
        },
        getFormat(row) {
            return {
                'has-text-danger-dark': row.status == 1,
                'has-text-danger': row.status == 2,
                'has-text-info': row.status == 3,
                'has-text-success': row.status == 9,
                'has-text-info': row.status == 7
            }
        },
        calculateTotals(data) {
            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    data[i].saldo = data[i].operator; // Primeira linha, o total é igual ao valor
                } else {
                    data[i].saldo = (parseFloat(data[i].operator) + parseFloat(data[i - 1].saldo)).toFixed(2); // Soma da linha atual e a anterior
                }
            }
            return data;
        },
        createColumns() {
            this.columns = [
                { title: 'Data', field: 'data', type: 'string', sorter: 'date' },
                { title: 'Tipo', field: 'tipo', type: 'string' },
                { title: 'Or/Dest', field: 'origem', type: 'string' },
                { title: 'Quant', field: 'quantidade', type: 'string', sorter: 'number', formatter:function(cell, formatterParams){
                    var value = cell.getValue();
                    var row = cell.getRow();
                    var data = row.getData('operator');
                    if(data.operator > 0){
                        return "<span style='color:#3FB449;'>" + value + "</span>";
                    }else{
                        return "<span style='color:#de2721;'>" + value + "</span>";
                    }
                } },
                { title: "Saldo", field: "saldo", }
            ]
        }
    },
    mounted() {
        this.id_user = this.currentUser.id;

        this.isLoading = true;
        saldoService.getCrono(this.filter)
            .then((response) => {
                this.dataTable = this.calculateTotals(response.data);
                let base = this.dataTable[0];
                this.base.produto = base.produto;
                this.base.lote = base.lote;
                this.base.unidade = base.unidade;

                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => this.isLoading = false);
        this.createColumns();

    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    created() {
        this.filter.lote = this.$route.params.lote;
        this.filter.unidade = this.$route.params.unidade;
    },
}
</script>

<style scoped>
.button {
    margin-right: 1rem;
}
</style>