<template>
  <div class="row my-2">
    <div class="col-md-3">
      <label class="text-capitalize" for="">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <input
        :type="type"
        v-model="val"
        class="form-control"
        :placeholder="'Masukkan ' + name"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { type: String, default: 'input' },
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('get', value)
      },
    },
  },
}
</script>
