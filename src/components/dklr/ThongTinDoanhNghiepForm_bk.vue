<!-- TODO detailTemplate page -->
<template>
  <div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12>
        <label>Tên doanh nghiệp:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['productionPlantName']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12>
        <label>Địa chỉ trụ sở chính:</label>
        <v-textarea
        rows="2"
        v-model="vr_ApplicantProfile['productionPlantAddress']"
        outline
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Tỉnh/Thành:</label>
        <v-autocomplete
        :items="cityItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['productionPlantProvinceCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Quận/Huyện:</label>
        <v-autocomplete
        :items="districtItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['productionPlantDistrictCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Phường/Xã:</label>
        <v-autocomplete
        :items="wardItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['productionPlantWard']"
        outline
        ></v-autocomplete>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Mã số thuế:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantCode']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Nơi cấp:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['noi_cap']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Ngày cấp:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['ngay_cap']"
        outline
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm3 class="px-1">
        <label>Số điện thoại:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantPhone']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
        <label>Số fax:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantFax']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
        <label>Địa chỉ email:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantEmail']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
        <label>Website:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['ngay_cap']"
        outline
        ></v-text-field>
      </v-flex>


      <v-flex xs12 sm3 class="px-1">
        <label>Người đại diện:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantRepresentative']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
        <label>Chức danh:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantRepresentativeTitle']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
      </v-flex>
      <v-flex xs12 sm3 class="px-1">
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Người liên hệ:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantContactName']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Số điện thoại liên hệ:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantContactPhone']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Email người liên hệ:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantContactEmail']"
        outline
        ></v-text-field>
      </v-flex>
      
      <v-flex xs12 sm4 class="px-1">
        <label>Hãng mẹ: <v-icon size="18" style="color: green;">{{vr_ApplicantProfile['markupCorporation'] === 0 ? 'done' : 'done'}} </v-icon></label>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Nhà sản xuất nước ngoài: <v-icon size="18" style="color: green;">{{vr_ApplicantProfile['markupOverseasManufacturer'] === 0 ? 'done' : 'done'}}</v-icon></label>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Cơ sở sản xuất trong nước: <v-icon size="18" style="color: green;">{{vr_ApplicantProfile['markupDomesticsManuacturer'] === 0 ? 'done' : 'done'}} </v-icon></label>
      </v-flex>

      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
          </thead>

          <tbody>
            <tr>
              <td class="text-xs-center">
                Đánh dấu là Nhà nhập khẩu (linh kiện)
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupImporter']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện ô tô
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXCG']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện mô tô xe máy
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXMY']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <!-- ============================================== -->

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện xe máy chuyên dùng
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXCD']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện xe đạp điện
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXDD']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện xe chở người bốn bánh 
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXCN']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu linh kiện xe chở hàng bốn bánh 
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupComponentXCH']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu ô tô
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXCG']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu mô tô xe máy
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXMY']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu xe máy chuyên dùng
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXCD']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu xe đạp điện
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXDD']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
               Đánh dấu xe chở người bốn bánh
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXCN']"
                label=""
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td class="text-xs-center">
                Đánh dấu xe chở hàng bốn bánh 
              </td>
              <td class="text-xs-center">
                <v-checkbox
                v-model="vr_ApplicantProfile['markupXCH']"
                label=""
                ></v-checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho xe cơ giới: {{vr_ApplicantProfile['issueTypeXCG'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho Xe mô tô, xe máy: {{vr_ApplicantProfile['issueTypeXMY'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho Xe chuyên dùng: {{vr_ApplicantProfile['issueTypeXCD'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho Xe đạp điện: {{vr_ApplicantProfile['issueTypeXDD'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho Xe chở người bốn bánh: {{vr_ApplicantProfile['issueTypeXCN'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Hình thức cấp phôi phiếu cho Xe chở hàng bốn bánh: {{vr_ApplicantProfile['issueTypeXCH'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12>
        <label>Ghi chú cho việc phân luồng, xác định hình thức cấp phôi phiếu:</label>
        <v-textarea
        rows="2"
        v-model="vr_ApplicantProfile['issueTypeDescription']"
        outline
        ></v-textarea>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Số năm hoạt động:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantOperationPeriod']"
        outline
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6>
        <label>Loại hình doanh nghiệp:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantBusinessType']"
        outline
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from 'moment'
const COMPONENT_NAME = 'jx-hanghai-filter-left'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}
export default {
  name: COMPONENT_NAME,
  props: {
    registrationId: '',
    item: {},
    type: '',
    code: '',
    applicantProfileId: '',
    id: ''
  },
  components: {
  },
  computed: {
    initData () {
      let init = this.$store.getters.initData
      if (!init || Object.keys(init).length === 0 && init.constructor === Object) {
        return {
          user: {
            id: 0
          }
        }
      } else {
        return init
      }
    }
  },
  data () {
    return {
      vr_ProductClassificationItems: [],
      vr_ApplicantProfileProdEquipmentItems: [],
      vr_ApplicantProfileEquipmentItems: [],
      vr_ApplicantProfileSupplierItems: [],
      vr_ApplicantProfileEmployeeItems: [],
      vr_ApplicantProfile: {
        productionPlantProvinceCode: '',
        productionPlantDistrictCode: ''
      },
      cityItems: [],
      districtItems: [],
      wardItems: []
    }
  },
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadInitResource').then(function (result) {
      })
    })
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      vm.getThongTin().then(result => {
        if (result['data'] && result['data']['vr_ApplicantProfile']) {
          this.$emit('thongTinDoanhNghiep', result['data']['vr_ApplicantProfile'])
          let productionPlantProvinceCode = result['data']['vr_ApplicantProfile']['productionPlantProvinceCode'] || 0
          vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
          vm.getDictItem('districtItems', {parent: productionPlantProvinceCode, dictItemCode: 'ADMINISTRATIVE_REGION'})
        }
      })
    })
  },
  watch: {
    'vr_ApplicantProfile.productionPlantProvinceCode' (val) {
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'vr_ApplicantProfile.ProductionPlantDistrictCode' (val) {
      if (val) {
        this.getDictItem('wardItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    '$route': function (newRoute, oldRoute) {
      let vm = this
      // let query = newRoute.query
      vm.getThongTin().then(result => {
        if (result['data'] && result['data']['vr_ApplicantProfile']) {
          this.$emit('thongTinDoanhNghiep', result['data']['vr_ApplicantProfile'])
          let productionPlantProvinceCode = result['data']['vr_ApplicantProfile']['productionPlantProvinceCode'] || 0
          vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
          vm.getDictItem('districtItems', {parent: productionPlantProvinceCode, dictItemCode: 'ADMINISTRATIVE_REGION'})
        }
      })
    }
  },
  methods: {
    getThongTin () {
      let vm = this
      return new Promise((resolve, reject) => {
        let query = {
          'indice': 'vr_ApplicantProfile',
          'query': {
            'query': {
              'bool': {
                'must': [
                  {
                    'match': {
                      'type_es': 'vr_ApplicantProfile'
                    }
                  },
                  {
                    'match': {
                      'registrationId': vm.registrationId
                    }
                  }
                ]
              }
            }
          }
        }
        vm.$store.dispatch('getThongTin', query).then(result => {
          let data = result['hits']['hits']
          let tempObj = {}
          if (data && data['length']) {
            tempObj = data[0]['_source']
          }
          vm.vr_ApplicantProfile = tempObj['data']['vr_ApplicantProfile'] || {}
          vm.vr_ApplicantProfileEmployeeItems = tempObj['data']['vr_ApplicantProfileEmployeeItems'] || []
          vm.vr_ProductClassificationItems = tempObj['data']['vr_ProductClassificationItems'] || []
          vm.vr_ApplicantProfileProdEquipmentItems = tempObj['data']['vr_ApplicantProfileProdEquipmentItems'] || []
          vm.vr_ApplicantProfileEquipmentItems = tempObj['data']['vr_ApplicantProfileEquipmentItems'] || []
          vm.vr_ApplicantProfileSupplierItems = tempObj['data']['vr_ApplicantProfileSupplierItems'] || []
          resolve(tempObj)
        }).catch(xhr => {
          reject(xhr)
        })
      })
    },
    loadProductionPlantEmployees (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['ProductionPlantId'] = vm.id
      vm.$store.dispatch('loadProductionPlantEmployees', data).then(result => {
        vm.vr_ApplicantProfileEmployeeItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ApplicantProfileEmployeeItems = []
      })
    },
    loadProductionPlantClassification (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['ProductionPlantId'] = vm.id
      vm.$store.dispatch('loadProductionPlantClassification', data).then(result => {
        vm.vr_ProductClassificationItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ProductClassificationItems = []
      })
    },
    loadProductionPlantProdEquipment (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['ProductionPlantId'] = vm.id
      vm.$store.dispatch('loadProductionPlantProdEquipment', data).then(result => {
        vm.vr_ApplicantProfileProdEquipmentItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ApplicantProfileProdEquipmentItems = []
      })
    },
    loadProductionPlantEquipment (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['ProductionPlantId'] = vm.id
      vm.$store.dispatch('loadProductionPlantEquipment', data).then(result => {
        vm.vr_ApplicantProfileEquipmentItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ApplicantProfileEquipmentItems = []
      })
    },
    loadProductionPlantSupplier (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['ProductionPlantId'] = vm.id
      vm.$store.dispatch('loadProductionPlantSupplier', data).then(result => {
        vm.vr_ApplicantProfileSupplierItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ApplicantProfileSupplierItems = []
      })
    },
    getDetailApplicantProfile (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      return new Promise((resolve, reject) => {
        vm.$store.dispatch('getDetailApplicantProfile', data).then(result => {
          vm.vr_ApplicantProfile = result || {}
          resolve(vm.vr_ApplicantProfile)
        }).catch(xhr => {
          reject(xhr)
        })
      })
    },
    getDictItem (key, data) {
      let vm = this
      if (!key) {
        return
      }
      if (!data) {
        data = {}
      }
      vm.$store.dispatch('getDictItem', data).then(result => {
        if (!result) {
          result = {
            total: 0,
            data: []
          }
        }
        vm[key] = result['data']
      })
    },
    quayLai () {
      window.history.back()
    }
  },
  filters: {
    registrationState (state) {
      if (state === 0) {
        return 'Lưu nháp'
      } else if (state === 1) {
        return 'Chờ duyệt'
      } else if (state === 2) {
        return 'Đã duyệt'
      } else {
        return 'Yêu cầu bổ sung'
      }
    },
    typeHinhThuc (state) {
      if (state === 0) {
        return 'Bị đình chỉ'
      } else if (state === 10) {
        return 'Cấp ứng'
      } else if (state === 20) {
        return 'Cấp theo lô'
      } else {
        return 'Cấp giám sát'
      }
    },
    productClassificationStatus (state) {
      if (!state) {
        return ''
      }
      if (state === 0) {
        return 'Không xác định'
      } else if (state === 1) {
        return 'Được hoạt động'
      } else if (state === 2) {
        return 'Bị đình chỉ'
      }
    },
    checkShowInfo () {
      let vm = this
      if (vm.code === vm.STATE_XEM_TK) {
        vm.showThongTinChung = false
        vm.showThongTinDoanhNghiep = true
        vm.showCoSoSanXuatLapRap = true
        vm.showDanhGiaCop = true
        vm.showHoSoDenHanXN = true
        vm.showSanPhamDungSanXuat = true
        vm.showQuanLyPhieuXuatXuong = true
      } else if (vm.code === vm.STATE_SUA_THONG_TIN_TK) {
        vm.showThongTinChung = true
        vm.showThongTinDoanhNghiep = false
        vm.showCoSoSanXuatLapRap = false
        vm.showDanhGiaCop = false
        vm.showHoSoDenHanXN = false
        vm.showSanPhamDungSanXuat = false
        vm.showQuanLyPhieuXuatXuong = false
      } else if (vm.code === vm.STATE_PHE_DUYET_TK) {
        vm.showThongTinChung = false
        vm.showThongTinDoanhNghiep = true
        vm.showCoSoSanXuatLapRap = false
        vm.showDanhGiaCop = false
        vm.showHoSoDenHanXN = false
        vm.showSanPhamDungSanXuat = false
        vm.showQuanLyPhieuXuatXuong = false
      } else if (vm.code === vm.STATE_CAP_NHAT_TINH_TRANG) {
        vm.showThongTinChung = false
        vm.showThongTinDoanhNghiep = true
        vm.showCoSoSanXuatLapRap = true
        vm.showDanhGiaCop = true
        vm.showHoSoDenHanXN = true
        vm.showSanPhamDungSanXuat = true
        vm.showQuanLyPhieuXuatXuong = true
      } else {
        vm.showThongTinChung = true
        vm.showThongTinDoanhNghiep = true
        vm.showCoSoSanXuatLapRap = true
        vm.showDanhGiaCop = true
        vm.showHoSoDenHanXN = true
        vm.showSanPhamDungSanXuat = true
        vm.showQuanLyPhieuXuatXuong = true
      }
    },
    date (date) {
      if (!date) {
        return ''
      }
      return moment(String(date)).utc().format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>

