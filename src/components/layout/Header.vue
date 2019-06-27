<template>
  <div class="main-menu">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="index.html">Library System</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="navbar-item active">
                                <a href="index.html" class="nav-link">Home</a>
                            </li>
                            <li class="navbar-item">
                                <a href="shop.html" class="nav-link">Shop</a>
                            </li>
                            <li class="navbar-item">
                                <a href="about.html" class="nav-link">About</a>
                            </li>
                            <li class="navbar-item">
                                <a href="faq.html" class="nav-link">FAQ</a>
                            </li>
                            <li class="navbar-item">
                                <a href="login.html" class="nav-link">Login</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search">
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

<style scoped>
@import "./../../assets/css/owl.carousel.min.css";
@import "./../../assets/css/styles.css";

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900");

</style>
