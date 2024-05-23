<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in regionais"
          :key="loc.id_regional"
          :value="loc.id_regional"
          :selected="loc.id_regional == sel"
        >
          {{ loc.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import UnidadeService from "@/services/unidade.service.js";

export default {
  name: "CmbUnidade",
  data() {
    return {
      regionais: [],
    };
  },
  props: ['id_prop', 'sel', 'errclass','tipo'],
  methods: {
    onChange(event) {
      this.$emit('selUnid',event.target.value);
    },
    loadData() {
      UnidadeService.getComboReg()
      .then((res) => {
        this.regionais = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.regionais = [];
      })
    }
  },
  watch: {
    id_prop(value) {
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
