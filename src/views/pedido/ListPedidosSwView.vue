<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Pedidos Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newPedido">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true"/>
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon  icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import pedidoService from "@/services/pedido.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
      return {
          dataTable: [],
          isLoading: false,
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
          user: null,
      }
  },
  components: {
      MyTable,
      Loader,
      ConfirmDialog

  },
  methods: {
    newPedido() {
      this.$router.push({
        name: 'pedido',
        params: {
          user: JSON.stringify(this.user)
        },
      });
    },
      getFormat(row) {
          return {
              'has-text-danger-dark': row.status == 1,
              'has-text-danger': row.status == 2,
              'has-text-info': row.status == 3,
              'has-text-success': row.status == 9,
              'has-text-info': row.status == 7
          }
      }
  },
  created() {
    this.user = JSON.parse(this.$route.params.user);
  },
  mounted() {

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      this.isLoading = true;
      pedidoService.getPedidosSw(this.user.local)
          .then((response) => {
              this.dataTable = response.data;
              this.isLoading = false;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => this.isLoading = false);

      this.columns = [
          
          {
            title:"Pedido",
            columns:[
              {title: 'Data', field: 'dt_pedido', type: 'string'},
              {title: 'Produto', field: 'produto', type: 'string'},
              {title: 'Quantidade', field: 'quant_sol', type: 'string'},
            ], 
          },
          {title: 'Status', field: 'status', type: 'string'},
          {
            title:"Liberação",
            columns:[
              {title: 'Data', field: 'dt_libera', type: 'string'},
              {title: 'Quantidade', field: 'quant_lib', type: 'string'},
            ], 
          },
          {title: 'Ações',  
            formatter: (cell, formatterParrams) =>{
              const row = cell.getRow().getData();

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = row.quant_lib > 0;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir esse pedido?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                pedidoService.delete(row.id_pedido);
                location.reload();
              }
              });


              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btDel);

              return buttonHolder;

            }}
      ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
}
</script>

<style scoped>
.button { 
  margin-right: 1rem;
}
  
</style>