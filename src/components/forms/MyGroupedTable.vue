<template>
  <div class="columns is-centered" v-if="filtered">
    <div class="column is-2">
      <div class="field is-horizontal">
        <label class="label" style="padding-right: 2rem">Filtrar: </label>
        <label class="switch">
          <input type="checkbox" @change="toggleFilter($event)" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="column is-10" :style="{visibility: filter ? 'visible' : 'hidden'}">
      <div class="columns">
        <div class="column is-3">
          <div class="select">
            <select v-model="form.column" class="input">
              <option value="0">-- Coluna --</option>
              <option
                v-for="(item, index) in cbColumns"
                :key="index"
                :value="item.field"
              >
                {{ item.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <div class="select">
              <select v-model="form.operator" class="input">
                <option value="0">-- Comparador --</option>
                <option value="=">igual a</option>
                <option value=">">maior que</option>
                <option value="<">menor que</option>
                <option value="!=">diferente de</option>
                <option value="like">contendo</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field has-addons">
            <input
              type="text"
              class="input"
              v-model="form.value"
              placeholder="Valor a filtrar"
            />
            <div class="control">
              <a class="button is-info" @click="setFilter">
                <span class="icon is-small">
                  <font-awesome-icon icon="fa-solid fa-search" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <button class="button is-success is-outlined" title="Limpar Filtros" @click="clearFilter">
            <span class="icon is-small">
                  <font-awesome-icon icon="fa-solid fa-broom" />
                </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="has-text-right">
    <button
      id="download-csv"
      class="button is-link is-outlined is-small"
      @click="download_csv"
    >
      <font-awesome-icon icon="fa-solid fa-file-csv" />
    </button>
    <button
      id="download-json"
      class="button is-info is-outlined is-small"
      @click="download_json"
    >
      <font-awesome-icon icon="fa-solid fa-file-lines" />
    </button>
    <button
      id="download-xlsx"
      class="button is-success is-outlined is-small"
      @click="download_xlsx"
    >
      <font-awesome-icon icon="fa-solid fa-file-excel" />
    </button>
    <button
      id="download-pdf"
      class="button is-danger is-outlined is-small"
      @click="download_pdf"
    >
      <font-awesome-icon icon="fa-solid fa-file-pdf" />
    </button>
  </div>
  <div ref="table"></div>
  <Loader :active="isLoading" />
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import lang from "./lang";
import Loader from '@/components/general/Loader.vue';

export default {
  data() {
    return {
      tabulator: null, //variable to hold your table
      form: {
        column: "0",
        operator: "0",
        value: "",
        type: "string",
      },
      filter: false,
      isLoading: false,
      cbColumns:[]
    };
  },
  methods: {
    tabulatorGetGroupData(group) {
        var rows = [];
        var groupList = group._group;
        rows = tabulatorGetGroupDataList(groupList);
        return rows;
    },
    tabulatorGetGroupDataList(groupList) {
        var rows = groupList.rows;
        for (var i = 0; i < groupList.groupList.length; i++) {
            rows = rows.concat(tabulatorGetGroupDataList(groupList.groupList[i]));
        }
        return rows;
    },
    setFilter() {
      let obj = this.form;

      const col = this.columns.filter((v) => v.field === obj.column, obj);
      obj.type = col[0].type;

      this.tabulator.setFilter(obj.column, obj.operator, obj.value);
    },
    clearFilter() {
      this.isLoading = true;
      this.form.column = "0";
      this.form.operator = "0";
      this.form.value = "";

      this.tabulator.clearFilter();
      this.isLoading = false;
    },
    download_csv() {
      this.tabulator.download("csv", "data.csv");
    },
    download_xlsx() {
      this.tabulator.download("xlsx", "data.xlsx", { sheetName: "Inseticida" });
    },
    download_pdf() {
      this.tabulator.download("pdf", "data.pdf", {
        orientation: "portrait", //set page orientation to portrait
        title: "Sistema Inseticida", //add title to report
      });
    },
    download_json() {
      this.tabulator.download("json", "data.json");
    },
    toggleFilter(e) {
      this.filter = e.target.checked;
    },
  },
  props: ["tableData", "columns","filtered"],
  watch: {
    tableData(value) {
      this.isLoading = true;
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        data: value, //link data to table
        layout: "fitColumns",
        placeholder:"Nenhum registro atende aos critérios escolhidos!",
        reactiveData: true, //enable data reactivity
        columns: this.columns, //define table columns
        pagination: "local",
        paginationSize: 10,
        groupBy: ['produto','lote'],
        groupStartOpen:[false, false],
        groupHeader:[
                function(value, count, data, group){ //generate header contents for gender groups 
                    group.getElement().style.backgroundColor = "#D3D4DC";
                    var total = 0;
                    var rows = tabulatorGetGroupData(group);
                    for (var i = 0; i < rows.length; i++) {
                        total += parseFloat(rows[i].data.saldo);
                    }
                    var tot = total.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    tot += rows[0].data.unidade == 'Litro' ? ' l' : (rows[0].data.unidade == 'Kg' ? ' Kg' : ' Unidades');
                          
                    function tabulatorGetGroupData(group) {
                        var rows = [];
                        var groupList = group._group;
                        rows = tabulatorGetGroupDataList(groupList);
                        return rows;
                    }
                function tabulatorGetGroupDataList(groupList) {
                    var rows = groupList.rows;
                    for (var i = 0; i < groupList.groupList.length; i++) {
                        rows = rows.concat(tabulatorGetGroupDataList(groupList.groupList[i]));
                    }
                    return rows;
                }

                    return "Produto: " + value + "<span style='color:#00d; margin-left:10px;'>  - Saldo: " + tot + "</span>";
                },
                function(value, count, data, group){ //generate header contents for color groups
                    group.getElement().style.backgroundColor = '#F1F2F8';
                    return "Lote: " + value + "<span style='color:#1D8423; margin-left:10px;'>  -  (" + count + " locais)</span>";
                },
                
        ],
        paginationSizeSelector: [5, 10, 15, 20],
        movableColumns: true,
        paginationCounter: "rows",
      });

      let me = this;
    
      this.tabulator.on("tableBuilt", function () {
        if (me.filter ) {//&& me.tabulator.ta
          if (me.arrFilter.length > 0){
            me.tabulator.setFilter(me.arrFilter);
          } 
         // this.$router.go();
        }
        me.isLoading = false;
      });

      this.cbColumns = this.columns.filter( el => el.title !== "Ações");
    },
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"
    );
    document.head.appendChild(externalScript);
  },
};
</script>
<style scoped>
.tabela {
  width: 800px;
  height: auto;
}

.button {
  margin-right: 1rem;
}

/** slider classes */
.switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: -0.2rem;
  left: 0;
  right: 0;
  bottom: -0.2rem;
  background-color: #8dacf3;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1rem;
  width: 1rem;
  left: 0.5rem;
  bottom: 0.5rem;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2a455a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2a455a;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.slider.round {
  border-radius: 0.75rem;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
