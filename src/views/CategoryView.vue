<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h3 class="title">CATEGORIAS</h3>
            <p class="category">Listado de Categorias</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green" :listCategory='fetchCategory'></simple-table>
          </md-card-content>
        </md-card>
        {{fetchCategory}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import  SimpleTable  from "@/components/Category/listCategory.vue";
export default {
  components: {
    SimpleTable
  },
  computed:{
    ...mapGetters(['fetchCategory'])
  },
  methods: {
      ...mapActions(['fetchListCategory'])
  },
  created(){
      this.fetchListCategory();
  }

};
</script>

<style lang="scss" scoped>
.CategoriaView {
  margin-left: 2rem;
}
</style>
