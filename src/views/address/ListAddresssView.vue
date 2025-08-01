<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Endereços Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newLote">
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
import addressService from "@/services/address.service";
import MyTable from '@/components/forms/MyTable.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaLotes',
  data() {
      return {
          tableName: 'address',
          dataTable: [],
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
      }
  },
  components: {
      MyTable,
      ConfirmDialog
  },
  methods: {
    newLote() {
      this.$router.push('/address');
      },
      editAddress(id) {
          this.$router.push(`/editaddress/${id}`);
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

      addressService.getAddresss()
          .then((response) => {
              this.dataTable = response.data;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => {});

      this.columns = [
          {title: 'Unidade', field: 'unidade', type: 'string'},
          {title: 'Logradouro', field: 'endereco', type: 'string'},
          {title: 'Bairro', field: 'bairro', type: 'string'},
          {title: 'Atualizado em', field: 'atualiz', type: 'string', sorter: "date"},
          {title: 'Ações',  
            formatter: (cell, formatterParams) =>{
              const row = cell.getRow().getData();

              const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = this.currentUser.id != row.id_users;
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editAddress/${row.id_address}`);
              });

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = this.currentUser.id != row.id_users;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir esse endereço?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                addressService.delete(row.id_address);
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