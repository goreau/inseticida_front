<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
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
import MyTable from "@/components/forms/MyTable.vue";
import MyGroupedTable from "@/components/forms/MyGroupedTable.vue";
import reportService from "@/services/report.service";
import recibo from './recibo.js';
import recibot from './reciboT.js';


export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      group: null,
      columns: [],
      title: 'Relatórios',
      strFiltro: '',
      myspan: null,
    };
  },
  components: {
    MyTable,
    MyGroupedTable
  },
  methods: {
    createColumns() {
          var quant = function(cell, formatterParams){
            cell.getElement().style.paddingRight = "4rem";
            var number = cell.getValue();
              let x = number.split('.');
              let x1 = x[0];
              let x2 = x.length > 1 ? ',' + x[1] : '';
              var rgx = /(\d+)(\d{3})/;
              while (rgx.test(x1)) {
                  x1 = x1.replace(rgx, '$1' + '.' + '$2');
              }
              return x1 + x2;
          };

      switch (this.id) {
        case '1':
          this.title = 'Repasse de Produtos';
          this.columns = [
            { title: "Local", field: "local", type: "string" },
            { title: "Município", field: "municipio", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Data", field: "data", type: "string", sorter: "date" },
            { title: "Quantidade", field: "qtd", type: "string", hozAlign:"right", formatter: quant},
            { title: "Unidade", field: "unidade", type: "string" },
            { title: "Validade", field: "validade", type: "string", sorter: "date" },
            { title: "Recibo", 
              formatter: (cell, formatterParrams) =>{
                const row = cell.getRow().getData();

                var newlink = document.createElement('a');
                newlink.setAttribute('href', '#/report/1');
                
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
            { title: "Validade", field: "validade", type: "string", sorter: "date" },
            { title: "Quantidade", field: "qtd", type: "string", hozAlign:"right", formatter: quant },
            { title: "Unidade", field: "unidade", type: "string" },

          ];
          break;
        case '3':
          this.title = 'Resumo Mensal';
          this.columns = [
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Validade", field: "validade", type: "string", sorter: "date" },
            { title: "Entrada", field: "entrada", type: "string", hozAlign:"right", formatter: quant },
            { title: "Devolução", field: "devolucao", type: "string", hozAlign:"right", formatter: quant },
            { title: "Repasse", field: "repasse", type: "string", hozAlign:"right", formatter: quant },
            { title: "Consumo", field: "consumo", type: "string", hozAlign:"right", formatter: quant },
            { title: "Transferência", field: "transfer", type: "string", hozAlign:"right", formatter: quant },
            { title: "Descarte", field: "descarte", type: "string", hozAlign:"right", formatter: quant },
            { title: "Saldo", field: "saldo", type: "string", hozAlign:"right", formatter: quant },
          ];
          break;
        case '4':
          this.title = 'Resumo por tipo de movimento';
          this.columns = [
            { title: "Tipo", field: "tipo", type: "string" },
            { title: "Data", field: "data", type: "string", sorter: "date" },
            { title: "Local", field: "local", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string", hozAlign:"right", formatter: quant },
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
            { title: "Validade", field: "validade", type: "string", sorter: "date" },
            { title: "Local", field: "local", type: "string" },
            { title: "Saldo", field: "saldo", type: "string", hozAlign:"right", formatter: quant },
            { title: "Unidade", field: "unidade", type: "string" },
          ];
          break;
        case '6':
          this.title = 'Resumo de Repasse';
          this.columns = [
            { title: "Municipio", field: "municipio", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Jan", field: "jan", type: "string", hozAlign:"right", formatter: quant },
            { title: "Fev", field: "fev", type: "string", hozAlign:"right", formatter: quant },
            { title: "Mar", field: "mar", type: "string", hozAlign:"right", formatter: quant },
            { title: "Abr", field: "abr", type: "string", hozAlign:"right", formatter: quant },
            { title: "Mai", field: "mai", type: "string", hozAlign:"right", formatter: quant },
            { title: "Jun", field: "jun", type: "string", hozAlign:"right", formatter: quant },
            { title: "Jul", field: "jul", type: "string", hozAlign:"right", formatter: quant },
            { title: "Ago", field: "ago", type: "string", hozAlign:"right", formatter: quant },
            { title: "Set", field: "set", type: "string", hozAlign:"right", formatter: quant },
            { title: "Out", field: "out", type: "string", hozAlign:"right", formatter: quant },
            { title: "Nov", field: "nov", type: "string", hozAlign:"right", formatter: quant },
            { title: "Dez", field: "dez", type: "string", hozAlign:"right", formatter: quant },
          ];
          break;
        case '7':
          this.title = 'Transferências';
          this.columns = [
            { title: "Origem", field: "origem", type: "string" },
            { title: "Destino", field: "destino", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Data", field: "data", type: "string" },
            { title: "Quantidade", field: "qtd", type: "string", hozAlign:"right", formatter: quant },
            { title: "Recibo", 
              formatter: (cell, formatterParrams) =>{
                const row = cell.getRow().getData();

                var newlink = document.createElement('a');
                newlink.setAttribute('href', '#/report/1');
                
                newlink.innerText = 'Visualizar';

                newlink.addEventListener('click', () => {
                  recibot.getRecibo(row);
                });

                return newlink;
              },
            }
          ];
          break;
        case '8':
          this.title = 'Repasse e Consumo';
          this.columns = [
            { title: "Regional", field: "regional", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Mês", field: "mes", type: "string" },
            { title: "Repasse", field: "repasse", type: "string", hozAlign:"right", formatter: quant },
            { title: "Consumo", field: "consumo", type: "string", hozAlign:"right", formatter: quant },
          ];
          break;
        case '9':
          this.title = 'Intervalos no Repasse de Produtos';
          this.columns = [
            { title: "Local", field: "local", type: "string" },
            { title: "Município", field: "municipio", type: "string" },
            { title: "Produto", field: "produto", type: "string" },
            { title: "Lote", field: "lote", type: "string" },
            { title: "Data Pedido", field: "pedido", type: "string", sorter: "date" },
            { title: "Data Liberação", field: "liberacao", type: "string", sorter: "date" },
            { title: "Data Repasse", field: "repasse", type: "string", sorter: "date" },
            { title: "Quantidade", field: "quantidade", type: "string", hozAlign:"right", formatter: quant},
            { title: "Unidade", field: "unidade", type: "string" },
          ];
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.myspan = document.getElementsByName('coisa')[0];
    reportService.getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    this.createColumns();
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
