<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Usuários Inativos</p>
                    </header>
                    <div class="card-content">
                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
                    </div>
                </div>
                <div style="display: none;">
                    <span class="icon is-small is-left" name="coisa">
                        <font-awesome-icon icon="fa-solid fa-person-circle-check" />
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
            tableName: 'inativos',
            dataTable: [],
            isLoading: false,
            columns: [],
            myspan: null,
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


        this.isLoading = true;
        authService.inativos()
            .then((response) => {
                this.dataTable = response.data;
                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => this.isLoading = false);

        this.columns = [
            { title: 'Nome', field: 'nome', type: 'string' },
            { title: 'Login', field: 'login', type: 'string' },
            { title: 'Unidade', field: 'unidade', type: 'string' },
            { title: 'Nivel', field: 'nivel', type: 'string' },
            {
                title: 'Ações',
                formatter: (cell, formatterParrams) => {
                    const row = cell.getRow().getData();

                    const btEdit = document.createElement('button');
                    btEdit.type = 'button';
                    btEdit.title = 'Ativar';
                    btEdit.disabled = nivel != 1;
                    btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
                    btEdit.classList.add('button', 'is-primary', 'is-outlined');
                    btEdit.innerHTML = this.myspan.innerHTML;
                    btEdit.addEventListener('click', async () => {
                        const ok = await this.$refs.confirmDialog.show({
                            title: 'Usuário',
                            message: '           Deseja reativar esse usuário?           ',
                            okButton: 'Confirmar',
                        })
                        if (ok) {
                            authService.setAtivo(row.id_users)
                                .then(
                                    (response) => {
                                        this.showMessage = true;
                                        this.message = "Usuário reativado com sucesso.";
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

                    const buttonHolder = document.createElement('span');
                    buttonHolder.appendChild(btEdit);


                    return buttonHolder;

                }
            }
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