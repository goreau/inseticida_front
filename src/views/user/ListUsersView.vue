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
            <p class="card-header-title is-centered">Usuários Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newUser">
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
          <span class="icon is-small is-left" name="coisa3">
            <font-awesome-icon  icon="fa-solid fa-envelope" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import authService from "@/services/auth.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: 'ListaVendas',
  data() {
      return {
        tableName: 'users',
          dataTable: [],
          isLoading: false,
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
          isLoading: false,
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
      Message,

  },
  methods: {
    newUser() {
      this.$router.push('/user');
      },
      editUser(id) {
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
    let nivel = this.currentUser.nivel;

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    this.myspan3 = document.getElementsByName('coisa3')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      this.isLoading = true;
      authService.list()
          .then((response) => {
              this.dataTable = response.data;
              this.isLoading = false;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => this.isLoading = false);

      this.columns = [
          {title: 'Nome', field: 'nome', type: 'string'},
          {title: 'Login', field: 'login', type: 'string'},
          {title: 'Unidade', field: 'unidade', type: 'string'},
          {title: 'Nivel', field: 'role', type: 'string'},
          {title: 'Ações',  
            formatter: (cell, formatterParrams) =>{
              const row = cell.getRow().getData();

              const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = this.id_user != row.id_prop && this.id_user != 11;
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editUser/${row.id_users}`);
              });

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = this.id_user != row.id_prop && this.id_user != 11;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir esse usuário?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                authService.delete(row.id_users)
                .then(
                  (response) => {
                    this.showMessage = true;
                    this.message = "Usuário marcado como inativo.";
                    this.type = "success";
                    this.caption = "Usuário";
                    setTimeout(() => {
                      this.showMessage = false;
                      location.reload();
                    }, 3000);
                  },
                  (error) => {
                    this.message = error;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                )
              }
              });

              const btMail = document.createElement('button');
              btMail.type = 'button';
              btMail.title = 'E-mail';
              btMail.disabled = nivel != 1;
              btMail.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btMail.classList.add('button', 'is-link', 'is-outlined');
              btMail.innerHTML = this.myspan3.innerHTML;
              btMail.addEventListener('click', () => {
                let email = prompt("Informe o email", row.email);
                if (email != null) {
                  let data = {
                    id_users: row.id_users,
                    email: email
                  }
                  authService.newMail(data).then(
                    (response) => {
                      this.showMessage = true;
                      this.message = "Email do usuário alterado com sucesso.";
                      this.type = "success";
                      this.caption = "Usuário";
                      setTimeout(() => {
                        this.showMessage = false;
                        location.reload();
                      }, 3000);
                    },
                    (error) => {
                      this.message = error.message;
                        
                      this.showMessage = true;
                      this.type = "alert";
                      this.caption = "Usuário";
                      setTimeout(() => (this.showMessage = false), 3000);
                    }
                  )
                }
              });

              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btEdit);
              buttonHolder.appendChild(btDel);
              buttonHolder.appendChild(btMail);

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