<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <Message
          v-if="showMessage"
          @do-close="closeMessage"
          :msg="message"
          :type="type"
          :caption="caption"
        />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Revalidações Cadastradas</p>
            <button class="button is-primary is-outlined" @click="newRevalida">
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
import revalidaService from "@/services/revalida.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: 'ListaRevalidas',
  data() {
      return {
          dataTable: [],
          isLoading: false,
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
          message: "",
          caption: "",
          type: "",
          showMessage: false,
      }
  },
  components: {
      MyTable,
      Loader,
      ConfirmDialog,
      Message

  },
  methods: {
    newRevalida() {
      this.$router.push('/revalida');
      },
      editRevalida(id) {
          this.$router.push(`/manage/${id}`);
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
      revalidaService.getDuplicates({})
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
          {title: 'Validade Original', field: 'original', type: 'string', sorter: "date"},
          {title: 'Revalidado Para', field: 'validade', type: 'string', sorter: "date"},
          {title: 'Criação', field: 'created_at', type: 'string', sorter: "date"},
          {title: 'Atualização', field: 'updated_at', type: 'string', sorter: "date"},
          {title: 'Ações',  
            formatter: (cell, formatterParrams) =>{
              const row = cell.getRow().getData();

            /*  const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = row.id_users != this.currentUser.id;
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editRevalida/${row.id_revalida}`);
              });*/

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = row.id_users != this.currentUser.id;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir essa revalidação?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                revalidaService.delete(row.id_revalida).then(
                  (response) => {
                    this.showMessage = true;
                    this.message = "Revalidação excluída.";
                    this.type = "success";
                    this.caption = "Revalidação";
                    setTimeout(() => {
                      this.showMessage = false;
                      location.reload();
                    }, 3000);
                  },
                  (error) => {
                    this.message = error;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Revalidação";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                  )
              }
              });


              const buttonHolder = document.createElement('span');
             // buttonHolder.appendChild(btEdit);
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