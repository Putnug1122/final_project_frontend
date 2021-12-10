<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">
            <img
              src="../../static/assets/img/avatar/avatar-2.png"
              alt=""
              width="30px"
              class="rounded-circle"
            />
          </th>
          <td colspan="2">Gede Putra Nugraha</td>
          <td><i class="fa fa-envelope fa-lg"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    img: String,
    name: { type: String, default: 'Nama' },
    role: { type: String, default: 'student' },
  },
}
</script>
