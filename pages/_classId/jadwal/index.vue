<template></template>

<script>
export default {}
</script>

<style></style>
<template>
  <div>
    <div v-if="!$route.query.materi" class="row">
      <div class="col-md-3 overflow-auto pb-5" style="height: 80vh">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            v-for="(schedule, i) in schedules"
            :key="i"
            :class="`nav-link d-flex justify-content-between my-2 py-3 ${
              i == 0 ? 'active' : ''
            }`"
            :id="`menu-schedule-${i}`"
            data-toggle="pill"
            :href="`#content-schedule-${i}`"
            role="tab"
          >
            Sesion {{ i + 1 }}
            <Menu />
          </a>
        </div>
        <div class="text-center mt-3">
          <nuxt-link
            class="text-primary"
            :to="`/${$route.params.classId}/jadwal/add`"
            >+ Jadwal</nuxt-link
          >
        </div>
      </div>
      <div class="col-md-9">
        <div class="tab-content" id="v-pills-tabContent">
          <div
            v-for="(schedule, i) in schedules"
            :key="i"
            :class="`tab-pane fade ${i == 0 ? 'show active' : ''}`"
            :id="`content-schedule-${i}`"
            role="tabpanel"
          >
            <div class="row">
              <div
                class="col-sm-6 col-md-4"
                v-for="(material, i) in schedule.materials"
                :key="i"
              >
                <material-item />
              </div>
            </div>
            <div class="text-center mb-3">
              <nuxt-link
                class="btn btn-default rounded-pill"
                :to="`/${$route.params.classId}/jadwal/${schedule.id}/materi/add`"
                >+ Materi</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <MaterialItem />
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      schedules: [
        { id: 'a', materials: [{}] },
        { id: 'b', materials: [{}, {}] },
        { id: 'c', materials: [{}, {}, {}] },
        { id: 'd', materials: [{}, {}, {}, {}] },
        { id: 'e', materials: [{}, {}, {}, {}, {}, {}] },
      ],
    }
  },
}
</script>
