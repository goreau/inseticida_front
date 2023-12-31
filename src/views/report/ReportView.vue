<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" v-if="id > 0 && id != 5" />
            <MyGroupedTable :tableData="dataTable" :columns="columns" :filtered="false" v-if="id == 5" />
          </div>
        </div>
      </div>
    </div>
    <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
        </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import MyTable from "@/components/forms/MyTable.vue";
import MyGroupedTable from "@/components/forms/MyGroupedTable.vue";
import reportService from "@/services/report.service";
import recibo from './recibo.js';

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      group: null,
      isLoading: false,
      columns: [],
      title: 'Relatórios',
      strFiltro: '',
      myspan: null,
    };
  },
  components: {
    Loader,
    MyTable,
    MyGroupedTable
  },
  methods: {
    createColumns() {
      switch (this.id) {
        case '1':
          this.title = 'Repasse de Produtos';
          this.columns = [
            { title: "Local", field: "local", type: "string" },
            { title: "Município", field: "municipio", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Data", field: "data", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string" },
            { title: "Unidade", field: "unidade", type: "string" },
            { title: "Validade", field: "validade", type: "string" },
            { title: "Recibo", 
              formatter: (cell, formatterParrams) =>{
                const row = cell.getRow().getData();

                var newlink = document.createElement('a');
                newlink.setAttribute('href', '#');
                
                newlink.innerText = 'Visualizar';

                newlink.addEventListener('click', () => {
                  recibo.getRecibo(row);
                });

                return newlink;
              },
            }
          ];
          break;
        case '2':
          this.title = 'Saldo por Local';
          this.columns = [
            { title: "Local", field: "local", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string" },
            { title: "Unidade", field: "unidade", type: "string" },

          ];
          break;
        case '3':
          this.title = 'Resumo Mensal';
          this.columns = [
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Validade", field: "validade", type: "string" },
            { title: "Entrada", field: "entrada", type: "string" },
            { title: "Devolução", field: "devolucao", type: "string" },
            { title: "Repasse", field: "repasse", type: "string" },
            { title: "Consumo", field: "consumo", type: "string" },
            { title: "Transferência", field: "transfer", type: "string" },
            { title: "Descarte", field: "descarte", type: "string" },
            { title: "Saldo", field: "saldo", type: "string" },
          ];
          break;
        case '4':
          this.title = 'Resumo por tipo de movimento';
          this.columns = [
            { title: "Tipo", field: "tipo", type: "string" },
            { title: "Local", field: "local", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string" },
            { title: "Unidade", field: "unidade", type: "string" },
            { title: "Or/Dest", field: "or dest", type: "string" },
          ];
          break;
        case '5':
          this.title = 'Saldo por Produto';
          this.group = ['produto','lote']
          this.columns = [ 
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Validade", field: "validade", type: "string" },
            { title: "Local", field: "local", type: "string" },
            { title: "Saldo", field: "saldo", type: "string" },
            { title: "Unidade", field: "unidade", type: "string" },
          ];
          break;
        case '6':
          this.title = 'Resumo de Repasse';
          this.columns = [
            { title: "Municipio", field: "municipio", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Jan", field: "jan", type: "string" },
            { title: "Fev", field: "fev", type: "string" },
            { title: "Mar", field: "mar", type: "string" },
            { title: "Abr", field: "abr", type: "string" },
            { title: "Mai", field: "mai", type: "string" },
            { title: "Jun", field: "jun", type: "string" },
            { title: "Jul", field: "jul", type: "string" },
            { title: "Ago", field: "ago", type: "string" },
            { title: "Set", field: "set", type: "string" },
            { title: "Out", field: "out", type: "string" },
            { title: "Nov", field: "nov", type: "string" },
            { title: "Dez", field: "dez", type: "string" },
          ];
          break;
        case '7':
          this.title = 'Transferências';
          this.columns = [
            { title: "Regional", field: "regional", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Mês", field: "mes", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string" },
          ];
          break;
        case '8':
          this.title = 'Repasse e Consumo';
          this.columns = [
            { title: "Regional", field: "regional", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Mês", field: "mes", type: "string" },
            { title: "Repasse", field: "repasse", type: "string" },
            { title: "Consumo", field: "consumo", type: "string" },
          ];
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.isLoading = true;
    this.myspan = document.getElementsByName('coisa')[0];
    reportService.getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.createColumns();
    this.isLoading = false;
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filter');
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}

.filter {
  font-size: small;
  font-weight: 600;
}
</style>
