<template>
  <DockMenu 
    :items="items" 
    :onSelected="this.selected"
    :theme="{
        primary: '#161a4ee3',
        secondary: '#1a0a71',
        tertiary: '#668cff',
        textColor: '#fff'
      }">
      <template #search>
        <font-awesome-icon icon="fa-solid fa-search" />
      </template>
      <template #user>
        <font-awesome-icon icon="fa-solid fa-user" />
      </template>
      <template #prod>
        <font-awesome-icon icon="fa-solid fa-flask" />
      </template>
      <template #lote>
        <font-awesome-icon icon="fa-solid fa-cubes" />
      </template>
      <template #revalida>
        <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
      </template>
      <template #address>
        <font-awesome-icon icon="fa-solid fa-location-dot" />
      </template>
      <template #mov>
        <font-awesome-icon icon="fa-solid fa-truck-fast" />
      </template>
      <template #ped>
        <font-awesome-icon icon="fa-solid fa-hand-holding" />
      </template>
      </DockMenu>
</template>


<script>
  import { DockMenu } from "vue-dock-menu";
  import "vue-dock-menu/dist/vue-dock-menu.css";
 
  export default {
    name: "Menu",
    components: {
      DockMenu
    },
    data() {
      return {
        items: [
          {
            name: "Usuário",
            iconSlot: "users",
            menu: [
              { name: "Cadastrar",path: "usuário>cadastrar", route: "/user", iconSlot: "user",}, 
              {name: "Consultar",path: "usuário>consultar", route: "/users", iconSlot: "search",}
            ]
          },
          {
            name: "Gerenciamento",
            menu: [
              { name: "Produto",
                menu: [
                  {name: "Cadastrar", path: "gerenciamento>produto>cadastrar", "route": "/produto", iconSlot: "prod"},
                  {name: "Consultar",path: "gerenciamento>produto>consultar", "route": "/produtos", iconSlot: "search"}
                ]
              },
              { isDivider: true },
              { name: "Lote",
                menu: [
                  {name: "Cadastrar", path: "gerenciamento>lote>cadastrar", "route": "/lote", iconSlot: "lote"},
                  {name: "Consultar", path: "gerenciamento>lote>consultar", "route": "/lotes", iconSlot: "search"}]
              },
              { isDivider: true },
              { name: "Revalidação",
                menu: [
                  {name: "Cadastrar", path: "gerenciamento>revalidação>cadastrar", "route": "/revalida", iconSlot: "revalida"},
                  {name: "Consultar", path: "gerenciamento>revalidação>consultar", "route": "/revalidas", iconSlot: "search"}
                ]
              },
              { isDivider: true },
              { name: "Endereço",
                menu: [
                  {name: "Cadastrar", path: "gerenciamento>endereço>cadastrar", "route": "/address", iconSlot: "address"},
                  {name: "Consultar", path: "gerenciamento>endereço>consultar", "route": "/addresss", iconSlot: "search"}]
              },
            ]
          },
          {
            name: "Movimento",
            menu: [
              {name: "Cadastrar",path: "movimento>cadastrar", "route": "/movimento", iconSlot: "mov"}, 
              {name: "Consultar",path: "movimento>consultar", "route": "/movimentos", iconSlot: "search"}
            ]
          },
          {
            name: "Pedido",
            menu: [
              {name: "Cadastrar",path: "pedido>cadastrar", "route": "/pedido", iconSlot: "ped"}, 
              {name: "Consultar",path: "pedido>consultar", "route": "/pedidos", iconSlot: "search"}
            ]
          },
          {
            name: "Relatório",
            menu: [
              { name: "01. Repasse de Produto",path: "relatório>01. repasse de produto", "route": "/reports/1"}, 
              { name: "02. Saldo por Local",path: "relatório>02. saldo por local", "route": "/reports/2"},
              { name: "03. Resumo Mensal",path: "relatório>03. resumo mensal", "route": "/reports/3"}, 
              { name: "04. Resumo por Tipo de Movimento",path: "relatório>04. resumo por tipo de movimento", "route": "/reports/4"},
              { name: "05. Saldo por Produto",path: "relatório>05. saldo por produto", "route": "/reports/5"}, 
              { name: "06. Resumo de Repasse",path: "relatório>06. resumo de repasse", "route": "/reports/6"},
              { name: "07. Transferências",path: "relatório>07. transferências", "route": "/reports/7"}, 
              { name: "08. Repasse e Consumo",path: "relatório>08. repasse e consumo", "route": "/reports/8"}
            ]
          },
        ]
      }
    },
    methods: {
      selected(item) {  
        var select = null; 
        this.items.map( el  => {
          el.menu.map( x  => {
            if (Array.isArray(x.menu)){
              x.menu.map(y => {
                if(y.path === item.path){
                  select = y.route;
                }
              })
            } else {
              if(x.path === item.path){
                select = x.route;
              }
            }
          });
        });
        this.$router.push(select);
      },
    } 
  };
</script>

<style scoped>
  .menu-bar-container .top{
    top: auto !important;
  }
  .menu-bar-container{
    position:relative !important;
  }
</style>
