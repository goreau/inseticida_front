<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in unidades"
          :key="loc.id_unidade"
          :value="loc.id_unidade"
          :selected="loc.id_unidade == sel"
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
      unidades: [],
    };
  },
  props: ['id_prop', 'sel', 'errclass','tipo'],
  methods: {
    onChange(event) {
      this.$emit('selUnid',event.target.value);
    },
    loadData() {
      UnidadeService.getCombo()
      .then((res) => {
        this.unidades = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.unidades = [];
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
