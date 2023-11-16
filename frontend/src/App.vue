<template>
  <nav>
    <router-link to="/">Сотрудники</router-link> |
    <router-link to="/positions">Должности</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.error {
  color: red;
  margin-top: 10px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

.router-link-exact-active {
  color: #007bff;
}

button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

nav {
  padding: 30px;
}

.input {
  margin: 10px;
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
