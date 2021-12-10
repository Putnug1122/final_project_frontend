<template>
  <div class="container">
    <h3 class="text-primary">Teachers</h3>
    <hr class="hr-tutor" />
    <anggota class="mb-5" />
    <h3 class="text-primary">Classmates</h3>
    <hr class="hr-student" />
    <anggota />
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style>
hr {
  height: 1px;
  margin-left: 15px;
  margin-bottom: -3px;
}
.hr-tutor {
  background-image: -webkit-linear-gradient(
    left,
    rgba(66, 133, 244, 0.8),
    rgba(66, 133, 244, 0.6),
    rgba(0, 0, 0, 0)
  );
}
.hr-student {
  height: 1px;
  background-image: -webkit-linear-gradient(
    left,
    rgba(66, 133, 244, 0.8),
    rgba(66, 133, 244, 0.6),
    rgba(0, 0, 0, 0)
  );
}
</style>
