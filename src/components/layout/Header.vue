<template>
  <div class="main-menu">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="index.html">Library System</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="navbar-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="/" class="nav-link">Shop</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="/" class="nav-link">FAQ</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
            />
            <span class="fa fa-search"></span>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style scoped></style>
