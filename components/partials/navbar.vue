<template>
  <div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <ul class="navbar-nav mr-auto">
        <li>
          <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>

      <ul v-if="$route.params.namaKelas" class="nav navbar-nav text-center">
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="`/kelasku/${$route.params.namaKelas}/${$route.params.idKelas}`"
          >
            Stream</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="`/kelasku/${$route.params.namaKelas}/${$route.params.idKelas}/jadwal`"
          >
            Classwork</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="`/kelasku/${$route.params.namaKelas}/${$route.params.idKelas}/member`"
          >
            People</nuxt-link
          >
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
          >
            <div class="d-sm-none d-lg-inline-block">
              Hi, {{ $auth.user.full_name }}
            </div></a
          >
          <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdown-title">Logged in 5 min ago</div>
            <nuxt-link to="/profile" class="dropdown-item has-icon">
              <i class="far fa-user"></i> Profile
            </nuxt-link>
            <a
              href="#"
              @click="logout"
              class="dropdown-item has-icon text-danger"
            >
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      moment: moment,
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
@media (min-width: 768px) {
  .navbar-nav.navbar-center {
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
  }
}
</style>
