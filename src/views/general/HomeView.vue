<template>
  <div class="home">
    <br>
   <!-- <div class="columns">
      <div class="column is-full has-text-centered pt-6 mt-6">
        <img alt="Vue logo" src="../../assets/home.png">
        <br>
        <p class="title">Sistema de Controle de Inseticidas</p>
        <p class="place">Coordenadoria de Controle de Doenças</p>
      </div>
    </div>-->
    <div class="columns">
      <div class="column is-full has-text-centered pt-6 mt-6">
    <div class="box">
            <div class="welcome_image"></div>
            <p class="title">Sistema de Controle de Inseticidas</p>
            <p class="title place" style="margin-top: 5%;">Coordenadoria de Controle de Doenças</p>
    </div>
    </div></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {

  }
}
</script>

<style scoped lang="scss">
@import "@/components/general/css/custom-var";
img{
  width: 18vw;
}
.title{
  margin-top: 4vw;
  font-size: 3vw;
  color: $item-color-master;
}
.place{
  font-size: 2vw;
  color: $item-color-master;
}
.welcome_image{
  background-image:url( '../../assets/home.png');
  opacity: 0.3;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}

.box{
  position: relative;
  display: inline-block; /* Make the width of box same as image */
  width: 100%;
}

.box .title{
  color: var(--tab_topo);
  position: absolute;
  z-index: 999;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 40%; /* Adjust this value to move the positioned div up and down */
  text-align: center;
  width: 100%; /* Set the width of the positioned div */
}

</style>
