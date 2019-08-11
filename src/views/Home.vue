<template>
  <div class="home">
    <script defer type="application/javascript" src="js/jquery.min.js"></script>
    <script defer type="application/javascript" src="js/bootstrap.min.js"></script>
    <script defer type="application/javascript" src="js/owl.carousel.min.js"></script>
    <script defer type="application/javascript" src="js/custom.js"></script>

    <section class="slider">
      <div class="container">
        <div id="owl-demo" class="owl-carousel owl-theme">
          <div class="item">
            <div class="slide">
              <img src="images/slide1.jpg" alt="slide1" />
              <div class="content">
                <div class="title">
                  <h3>welcome to library system</h3>
                  <h5>Discover the best books online with us</h5>
                  <router-link to="/view-book-list" class="btn" style="color:black">view books</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="slide">
              <img src="images/slide2.jpg" alt="slide1" />
              <div class="content">
                <div class="title">
                  <h3>welcome to Library System</h3>
                  <h5>Discover the best books online with us</h5>
                  <router-link to="/view-book-list" class="btn" style="color:black">view books</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="slide">
              <img src="images/slide3.jpg" alt="slide1" />
              <div class="content">
                <div class="title">
                  <h3>welcome to library system</h3>
                  <h5>Discover the best books online with us</h5>
                  <router-link to="/view-book-list" class="btn" style="color:black">view books</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="slide">
              <img src="images/slide4.jpg" alt="slide1" />
              <div class="content">
                <div class="title">
                  <h3>welcome to library system</h3>
                  <h5>Discover the best books online with us</h5>
                  <router-link to="/view-book-list" class="btn" style="color:black">view books</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="recomended-sec">
      <div class="container">
        <div class="title">
          <h2>highly recommendes books</h2>
          <hr />
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="item">
              <img src="images/img1.jpg" alt="img" />
              <h3>how to be a bwase</h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
              <div class="hover">
                <router-link to="/view-book-list">
                  <span>
                    <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                  </span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item">
              <img src="images/img2.jpg" alt="img" />
              <h3>How to write a book...</h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
              <!-- <span class="sale">Sale !</span> -->
              <div class="hover">
                <router-link to="/view-book-list">
                  <span>
                    <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                  </span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item">
              <img src="images/img3.jpg" alt="img" />
              <h3>7-day self publish...</h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
              <div class="hover">
                <router-link to="/view-book-list">
                  <span>
                    <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                  </span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item">
              <img src="images/img4.jpg" alt="img" />
              <h3>wendy doniger</h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
              <div class="hover">
                <router-link to="/view-book-list">
                  <span>
                    <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about-sec">
      <div class="about-img">
        <figure style="background:url(./images/about-img.jpg)no-repeat;"></figure>
      </div>
      <div class="about-content">
        <h2>About Library System,</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. Lorem Ipsum has been the book.</p>
        <p>It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and</p>
        <div class="btn-sec">
          <router-link to="/view-book-list" class="btn yellow">browse books</router-link>
          <router-link to="/view-book-list" class="btn black">borrow</router-link>
        </div>
      </div>
    </section>
    <section class="recent-book-sec">
      <div class="container">
        <div class="title">
          <h2>highly recommendes books</h2>
          <hr />
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r1.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r2.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r3.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r4.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r5.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r1.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r2.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r3.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r4.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="images/r5.jpg" alt="img" />
              <h3>
                <router-link to="/view-book-list">Keepers of the kalachakara</router-link>
              </h3>
              <h6>
                <span class="price"></span> 
                <router-link to="/view-book-list">Borrow Now</router-link>
              </h6>
            </div>
          </div>
        </div>
        <div class="btn-sec">
          <router-link to="/view-book-list" class="btn gray-btn">view all books</router-link>
        </div>
      </div>
    </section>
    <section class="features-sec">
      <div class="container">
        <ul>
          <li>
            <span class="icon">
              <i class="fas fa-brain"></i>
            </span>
            <h3>AI-Written Book</h3>
            <h5>Articial Intelligence Learning</h5>
            <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...</h6>
          </li>
          <li>
            <span class="icon return">
              <i class="fa fa-reply-all" aria-hidden="true"></i>
            </span>
            <h3>30- DAY RETURN</h3>
            <h5>Moneyback guarantee</h5>
            <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...</h6>
          </li>
          <li>
            <span class="icon chat">
              <i class="fa fa-comments" aria-hidden="true"></i>
            </span>
            <h3>24/7 SUPPORT</h3>
            <h5>online Consultations</h5>
            <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...</h6>
          </li>
        </ul>
      </div>
    </section>
    <section class="offers-sec" style="background:url(images/offers.jpg)no-repeat;">
      <div class="cover"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="detail">
              <h3>Donate books</h3>
              <h6>
Our library is organizing an event of donation books, and book donors can get a soft skill point.
              </h6>
              <router-link to="/view-book-list" class="btn" style="color:black">view event</router-link>
              <span class="icon-point percentage">
                <img src="images/precentagae.png" alt />
              </span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="detail">
              <h3>Writing storybook competition</h3>
              <h6>
Our library is organizing an event to write a storybook competition, and writers can get a soft skill point.
              </h6>
              <router-link to="/view-book-list" class="btn" style="color:black">participate</router-link>
              <span class="icon-point amount">
                <img src="images/amount.png" alt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="testimonial-sec">
      <div class="container">
        <div id="testimonal" class="owl-carousel owl-theme">
          <div class="item">
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. been the book</h3>
            <div class="box-user">
              <h4 class="author">Susane Mathew</h4>
              <span class="country">Malaysia</span>
            </div>
          </div>
          <div class="item">
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. been the book</h3>
            <div class="box-user">
              <h4 class="author">Susane Mathew</h4>
              <span class="country">Malaysia</span>
            </div>
          </div>
          <div class="item">
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. been the book</h3>
            <div class="box-user">
              <h4 class="author">Susane Mathew</h4>
              <span class="country">Malaysia</span>
            </div>
          </div>
          <div class="item">
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. been the book</h3>
            <div class="box-user">
              <h4 class="author">Susane Mathew</h4>
              <span class="country">Malaysia</span>
            </div>
          </div>
        </div>
      </div>
      <div class="left-quote">
        <img src="images/left-quote.png" alt="quote" />
      </div>
      <div class="right-quote">
        <img src="images/right-quote.png" alt="quote" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>


