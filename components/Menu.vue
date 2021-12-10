<template>
  <div>
    <i
      class="fas fa-ellipsis-v dropdown-toggle pointer"
      data-toggle="dropdown"
      :style="`font-size: 1em`"
    ></i>
    <div class="dropdown-menu">
      <a class="dropdown-item" @click="canEdit" href="#">Sunting</a>
      <a class="dropdown-item" @click="canDelete" href="#">Hapus</a>
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
<style></style>
