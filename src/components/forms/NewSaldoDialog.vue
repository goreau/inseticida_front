<template>
    <popup-modal ref="popup">
        <div class="columns titule">
            <p>Você vai alterar o valor do saldo, controlado pelo sistema. Só prossiga se tiver absoluta certeza do novo valor!</p>
        </div>
        <div class="corpo">
            <div class="field">
                <label class="label">Saldo</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="saldo"
                    placeholder="Informe o novo saldo"
                    :class="{ 'is-danger': saldo == '' }"
                  />
                  <span class="is-error" v-if="saldo == ''">
                    Obrigatório informar o valor
                  </span>
                </div>
              </div>
        </div>
        <div class="btns">
            <button class="button conf-btn" @click="_confirm">{{ okButton }}</button>
            <button class="button cancel-btn" @click="_cancel">{{ cancelButton }}</button>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue';

export default {
    name: 'NewSaldoDialog',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Cancelar', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        saldo: '',
        confirma: '',
    }),
    methods: {
        show(opts = {}) {
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            if (!this.saldo == '') {
                this.$refs.popup.close();
                this.resolvePromise(this.saldo);
            }
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise('')
        },
    },
}
</script>

<style scoped>
.titule {
    margin-top: 0;
    padding: .5rem .3rem;
    border-bottom: 1px solid rgb(50, 50, 104);
}
.titule p {
    font-size: large;
    font-weight: bold;
    padding: .5rem;
}
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 15% .2rem 15%;
}
.corpo {
    padding: 1rem 0;
}
.conf-btn {
  background-color: #4f52a3;
  color: #e6e2db;
  font-weight: bold;
  border: 2px solid #13156e;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.conf-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}

.cancel-btn {
  background-color: #509966;
  color: #e6e4df;
  font-weight: bold;
  border: 2px solid #1a8339;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.cancel-btn:hover {
  background-color: transparent;
  color: #1a8339;
  border: 2px solid #509966;
}

</style>