<template>
  <div>
    <i
      class="fas fa-ellipsis-v dropdown-toggle pointer elipcis"
      data-toggle="dropdown"
      :style="`font-size:1.3em;color:white;`"
    ></i>
    <div class="dropdown-menu">
      <a class="dropdown-item has-icon" @click="canEdit" href="#"
        ><i class="fas fa-info-circle"></i> Move</a
      >
      <a class="dropdown-item text-danger has-icon" @click="canDelete" href="#"
        ><i class="fas fa-sign-out-alt"></i> Keluar Kelas</a
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    canEdit: Function,
    canDelete: Function,
  },
}
</script>
<style>
.dropdown-toggle::after {
  display: none;
}
/* make the menu on top left the card */
.elipcis {
  position: absolute;
  top: 0;
  margin-top: 0.5em;
  margin-left: 0.5em;
  color: #66806a !important;
}
</style>
