<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="navbar-bg"></div>
      <partials-navbar />
      <partials-sidebar />

      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-body">
            <div class="card rounded">
              <div class="card-body">
                <Nuxt />
              </div>
            </div>
          </div>
        </section>
      </div>
      <partials-footer />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
