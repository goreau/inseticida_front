<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in produtos"
          :key="loc.id_produto"
          :value="loc.id_produto"
          :selected="loc.id_produto == sel"
        >
          {{ loc.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import produtoService from "@/services/produto.service.js";

export default {
  name: "CmbProduto",
  data() {
    return {
      produtos: [],
    };
  },
  props: ['id_prop', 'sel', 'errclass','tipo'],
  methods: {
    onChange(event) {
      this.$emit('selProd',event.target.value);
    },
    loadData() {
      produtoService.getCombo()
      .then((res) => {
        this.produtos = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.produtos = [];
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
