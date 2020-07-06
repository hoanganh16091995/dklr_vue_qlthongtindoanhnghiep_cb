<template>
  <div style="background: #ffff;">
    <div class="ml-0">
      <div class="row-header">
        <div class="background-triangle-big"> Thông tin doanh nghiệp</div>
        <div class="layout row wrap header_tools row-blue">

          <div class="flex xs12 text-right pr-3" style="margin-left: auto;">
            
            <!-- <v-btn flat class=" my-0 py-0 btn-border-left" color="grey darken-1" v-on:click.native="saveThongTinChung(0)">
              <v-icon class="mr-2">save</v-icon>
              Lưu nháp
            </v-btn>

            <v-btn flat class=" my-0 py-0 btn-border-left" color="grey darken-1" v-on:click.native="saveThongTinChung(1)">
              <v-icon class="mr-2">send</v-icon>
              Gửi
            </v-btn>
             -->

            <!-- <v-btn flat class=" my-0 py-0 btn-border-left" color="grey darken-1" v-on:click.native="quayLai()">
              <v-icon class="mr-2">undo</v-icon>
              Quay lại
            </v-btn> -->
          </div>
        </div>
      </div>
      <v-layout row wrap class="pt-2 ml-0 mt-2">
        <v-flex xs12 sm12 class="py-2">
          <thong-tin-doanh-nghiep-form class="px-2" :thongTinDoanhNghiep="thongTinDoanhNghiep" :disabledForm="true" :thongTinChungPrev="{}"></thong-tin-doanh-nghiep-form>
        </v-flex>
        <!-- <v-flex xs12 sm12 class="text-xs-right">
          <v-btn color="primary" @click="saveThongTinChung(0)"><v-icon>save</v-icon>&nbsp; Lưu nháp</v-btn>
          <v-btn color="primary" @click="saveThongTinChung(1)"><v-icon>send</v-icon>&nbsp; Gửi</v-btn>
        </v-flex> -->
      </v-layout>

      <v-layout row wrap class="pt-2 ml-0">
        <v-flex xs12 sm12>
          <div class="row-header">
            <div class="background-triangle-big"> Danh sách nhà xưởng</div>
            <div class="layout row wrap header_tools row-blue">
            </div>
          </div>

          <v-data-table
            v-if="!loading"
            :headers="headersNhaXuong"
            :items="listXuongItems"
            class="table-bordered danhSachHoSoTable__class"
            hide-actions
            :no-data-text="'Không tìm thấy dữ liệu'"
            :no-results-text="'Không tìm thấy dữ liệu'"
          >
            <template slot="headers" slot-scope="props">
              <th v-for="header in props.headers" class="text-xs-center" v-html="header['text']">
                
              </th>
            </template>
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center" style="width: 5%;">
                  {{ props.index + 1 }}
                </td>
                <td class="text-xs-center">
                  <span style="cursor: pointer;">{{ props.item['productionPlantCode']}}</span>
                </td>
                <td class="text-xs-center">
                  <span style="cursor: pointer;">{{ props.item['productionPlantName'] }}</span>  <br/>
                </td>
                <td class="text-xs-center">
                  <span style="cursor: pointer;">{{ props.item['productionPlantAddress'] }}</span>  <br/>
                </td>
                <td class="text-xs-center">
                  <span>{{ props.item['productionPlantEmail'] }}</span>
                </td>
                <td class="text-xs-center">
                  <span>{{ props.item['productionPlantContactPhone'] }}</span> <br>
                </td>
                <td class="text-xs-center">
                  <!-- <a href="javascript:;" style="color: blue;" @click="deleteXuong(props.item, props.index)">Xóa</a> -->
                </td>
              </tr>
            </template>

          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="pt-2 ml-0">
        <v-flex xs12 sm12>
          <div class="row-header mb-2">
            <div class="background-triangle-big"> Thông tin xưởng</div>
            <div class="layout row wrap header_tools row-blue">
            </div>
          </div>
          <thong-tin-xuong-form style="border-bottom: 2px solid blue; padding-bottom: 10px;" v-for="(item, index) in listXuongItems" :key="'thongTinXuong' + index" class="px-2" :disabledForm="true" :thongTinXuong="item" :thongTinXuongPev="thongTinXuongPev(item['id'])"></thong-tin-xuong-form>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import supportData from '@/store/support_data.json'
// import $ from 'jquery'
import toastr from 'toastr'
import ThongTinDoanhNghiepForm from '@/components/dklr/thong_tin_doanh_nghiep_form.vue'
import ThongTinXuongForm from '@/components/dklr/thong_tin_xuong_form.vue'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}
export default {
  props: {
    applicantProfileId: '',
    id: ''
  },
  components: {
    'thong-tin-doanh-nghiep-form': ThongTinDoanhNghiepForm,
    'thong-tin-xuong-form': ThongTinXuongForm
  },
  data: () => ({
    loading: false,
    loadHomeDataTable: {},
    headers: [],
    payment: false,
    formTTDN: {},
    thongTinXuong: {},
    thongTinDoanhNghiep: {},
    thongTinChungPrev: {},
    listXuongItemsPrev: [],
    listXuongItems: [],
    listRegistrationTemplate: [],
    indexSelect: -1,
    headersNhaXuong: []
  }),
  computed: {
    thongTinChung () {
      /* eslint-disable */
      let item = this.$store.getters.thongTinChung || {}
      console.log('return thongTinChung', item)
      return item
      /* eslint-disable */
    }
  },
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      vm.headersNhaXuong = supportData.headersThongTinXuong
    })
  },
  created () {
    let vm = this
    vm.$nextTick(function () {
      vm.loadTrackChange()
      vm.loadApplicantProfileDetail()
      vm.loadTrackChange()
      // vm.loadThongTinChung()
      // if (!vm.id || vm.id === '0') {
      //   vm.mapThongTinChungToForm()
      // } else {
      //   // vm.loadTrackChange()
      // }
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      // let vm = this
      // let query = newRoute.query
    },
    applicantProfileId (val) {
      if (val) {
        this.loadProductionPlants()
      }
    }
  },
  methods: {
    loadProductionPlants () {
      let vm = this
      vm.$store.dispatch('loadProductionPlants', {
        applicantprofileid: vm.applicantProfileId
      }).then(result => {
        vm.listXuongItems = result['data'] || []
        console.log('loadProductionPlants================', vm.listXuongItems)
      }).catch(xhr => {
        console.log('loadDSPtCapPhieuXX+++++++++++', xhr)
      })
    },
    loadApplicantProfileDetail () {
      let vm = this
      if (!vm.id) {
        console.log('NOT applicantCode!!!!!!!!!!!!!!!!')
        return
      }
      vm.$store.dispatch('loadApplicantProfileDetail', {
        applicantCode: vm.id
      }).then(result => {
        vm.thongTinDoanhNghiep = result
      }).catch(xhr => {
        console.log(xhr)
      })
    },
    loadTrackChange () {
      let vm = this
      vm.$store.dispatch('loadTrackChange', {
        applicantCode: vm.id
      }).then(result => {
        console.log('return trackChanges', item)
        if (result['previousContentFileEntryId']) {
          let prevContents = JSON.parse(result['previousContentFileEntryId']) || {}
          this.thongTinChungPrev = prevContents['vr_ApplicantProfile'] || {}
          this.listXuongItemsPrev = prevContents['vr_ProductionPlant'] || []
        }
        return item
      }).catch(xhr => {
      })
    },
    thongTinXuongPev (id) {
      let vm = this
      let item = {}
      if (id && vm.listXuongItemsPrev && vm.listXuongItemsPrev['length']) {
        item = vm.listXuongItemsPrev.find(item => {
          return item['id'] === id
        }) || {}
      }
      return item
    },
    async saveThongTinChung (state) {
      let vm = this
      vm.thongTinChung['mtCore'] = 1
      return new Promise((resolve, reject) => {
        let query = {
          'indice' : 'vr_ApplicantProfile',
          'postStatus': 'draft',
          'body' : {
            'vr_ApplicantProfile': vm.thongTinChung
          }
        }
        if (state === 1 || state === '1') {
          query['body']['vr_ProductionPlant'] = vm.listXuongItems
        }
        vm.$store.dispatch('saveThongTin', query).then(result => {
          vm.$store.commit('setThongTinChung', result)
          if (!vm.id || vm.id === '0') {
            toastr.success('Thêm mới thành công!')
            vm.$router.push({
              path: '/thong-tin-chung/' + result['applicantCode']
            })
          } else {
            toastr.success('Lưu thành công!')
          }
        }).catch(xhr => {
          toastr.error('xử lý thất bại, vui lòng thử lại!')
        })
      })
    },
    toDetailNhaXuong (item) {
      let vm = this
      vm.thongTinXuong = item
    },
    // loadTrackChange () {
    //   let vm = this
    //   vm.$store.dispatch('loadTrackChange', {
    //     applicantCode: vm.thongTinChung['applicantCode']
    //   }).then(result => {
    //   }).catch(xhr => {
    //   })
    // },
    quayLai () {
      window.history.back()
    }
  },
  filters: {
    money (value) {
    }
  }
}
</script>
