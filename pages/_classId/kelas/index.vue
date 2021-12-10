<template>
  <div class="container">
    <div class="mb-4">
      <div
        class="hero text-white hero-bg-image hero-bg-parallax"
        data-background="/assets/img/comfy-home.png"
      >
        <div class="hero-inner">
          <h2>Welcome, Student!</h2>
          <div class="mt-4">
            <a href="#" class="btn btn-outline-white btn-lg btn-icon icon-left"
              ><i class="far fa-user"></i> Setup Account</a
            >
          </div>
        </div>
      </div>
      <!-- <div class="card kartu">
        <img
          src="../../../static/assets/img/comfy-home.png"
          alt=""
          class="card-img-top rounded"
        />
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-3 d-none d-sm-none d-md-block d-lg-block">
        <div class="card card-info">
          <div class="card-header">
            <h4>Upcoming</h4>
          </div>
          <div class="card-body">
            <p>Card <code>.card-info</code></p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <schedule v-for="i in 40" :key="i" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style></style>
