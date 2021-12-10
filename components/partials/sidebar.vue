<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="/">Classroom</a>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <a href="/">Cr</a>
      </div>
      <ul class="sidebar-menu">
        <div v-if="$auth.loggedIn && $auth.user.rule == 'admin'">
          <li class="menu-header">Dashboard</li>
          <li>
            <nuxt-link to="/" class="nav-link"
              ><i class="fas fa-fire"></i><span>Dashboard</span></nuxt-link
            >
          </li>
        </div>
        <li class="menu-header">Menu</li>
        <li v-for="(menu, i) in menus" :key="i">
          <nuxt-link :to="menu.link" class="nav-link">
            <i :class="menu.icon" style="font-size: 1.2em"></i>
            <span>{{ menu.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { icon: 'fas fa-school', name: 'Semua Kelas', link: '/list-kelas' },
        { icon: 'fas fa-user-friends', name: 'Kelasku', link: '/kelasku' },
        { icon: 'far fa-id-badge', name: 'Presensi', link: '/presensi' },
      ],
    }
  },
}
</script>

<style></style>
