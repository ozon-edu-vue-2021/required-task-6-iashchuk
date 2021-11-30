<template>
  <div id="app">
    <TableView />
  </div>
</template>

<script>
import TableView from "@/views/table-view";
export default {
  name: "App",
  components: {
    TableView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #fb1058;
}

a:hover {
  opacity: 0.7;
}
</style>
