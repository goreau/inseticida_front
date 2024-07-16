<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input is-fullwidth" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in lotes"
          :key="loc.id_lote"
          :value="loc.id_lote"
          :selected="loc.id_lote == sel"
        >
          {{ loc.lote }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import loteService from "@/services/lote.service.js";

export default {
  name: "CmbLote",
  data() {
    return {
      lotes: [],
    };
  },
  props: ['id_prop', 'sel', 'errclass','tipo', 'unid'],
  methods: {
    onChange(event) {
      this.$emit('selLote',event.target.value);
    },
    loadData() {
      loteService.getCombo(this.unid, this.tipo)
      .then((res) => {
        this.lotes = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.lotes = [];
      })
    }
  },
  watch: {
    tipo(value) {
      this.loadData();
    },
    unid(value) {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  
};
</script>

<style scoped>
  
</style>
