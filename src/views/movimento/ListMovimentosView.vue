<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Movimentos</p>
            <button class="button is-primary is-outlined" @click="newMovimento">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName"/>
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
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
import movimentoService from "@/services/movimento.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
      return {
          tableName: 'movimento', 
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
      }
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      this.isLoading = true;
      movimentoService.getMovimentos()
          .then((response) => {
              this.dataTable = response.data;
              this.isLoading = false;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => this.isLoading = false);

      this.columns = [
          {title: 'Produto', field: 'produto', type: 'string'},
          {title: 'Lote', field: 'lote', type: 'string'},
          {title: 'Data', field: 'data', type: 'string', sorter: 'date'},
          {title: 'Local', field: 'unidade', type: 'string'},
          {title: 'Tipo', field: 'tipo', type: 'string'},
          {title: 'Or/Dest', field: 'origem', type: 'string'},
          {title: 'Quant', field: 'quantidade', type: 'string', sorter: 'number'},
          {title: 'Prop', field: 'login', type: 'string', visible: false, download: true},
          {title: 'Ações',  
            formatter: (cell, formatterParams) =>{
              const row = cell.getRow().getData();

              const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = row.id_users != parseInt(this.currentUser.id);
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editmovimento/${row.id_movimento}`);
              });

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = row.id_users != parseInt(this.currentUser.id);
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir esse movimento?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                movimentoService.delete(row.id_movimento);
                location.reload();
              }
              });


              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btEdit);
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