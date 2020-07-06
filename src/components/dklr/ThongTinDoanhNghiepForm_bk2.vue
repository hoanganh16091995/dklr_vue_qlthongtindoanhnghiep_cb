<!-- TODO detailTemplate page -->
<template>
  <div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12>
        <label>Tên doanh nghiệp:</label>
        <v-text-field
        v-model="vr_ApplicantProfile['applicantName']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12>
        <label>Địa chỉ trụ sở chính:</label>
        <v-textarea
        rows="2"
        v-model="vr_ApplicantProfile['applicantAddress']"
        outline
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Tỉnh/Thành:</label>
        <v-autocomplete
        :items="cityItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['applicantCityCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Quận/Huyện:</label>
        <v-autocomplete
        :items="districtItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['applicantDistrictCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Phường/Xã:</label>
        <v-autocomplete
        :items="wardItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ApplicantProfile['applicantWardCode']"
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

      <v-flex xs12 sm12>
        <label class="bold pb-1">Người liên hệ:</label> <br>

        <v-data-table
          :headers="headersNguoiDaiDien"
          :items="dataNguoiDaiDienItems"
          class="table-bordered danhSachHoSoTable__class"
          hide-actions
          :no-data-text="'Không có dữ liệu'"
          :no-results-text="'Không có dữ liệu'"
          >
          <template slot="headers" slot-scope="props">
            <th v-for="header in props.headers" class="text-xs-center" v-html="header['text']">

            </th>
          </template>
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" style="">
                <v-text-field
                :disabled="true"
                v-model="props.item['applicantContactName']"
                placeholder="Nhập tên người đại diện"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-text-field
                :disabled="true"
                v-model="props.item['applicantContactPhone']"
                placeholder="Nhập số điện thoại"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-text-field
                :disabled="true"
                v-model="props.item['applicantContactEmail']"
                placeholder="Nhập email"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-chip label outline color="blue" @click="deleteContact(props.item, props.index)">Xóa</v-chip>
              </td>
            </tr>
          </template>

        </v-data-table>
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
        <label>Hãng mẹ: <v-icon size="18" style="color: green; display: inline-block;">{{vr_ApplicantProfile['markupCorporation'] === 0 ? 'done' : 'done'}} </v-icon></label>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Nhà sản xuất nước ngoài: <v-icon size="18" style="color: green; display: inline-block;">{{vr_ApplicantProfile['markupOverseasManufacturer'] === 0 ? 'done' : 'done'}}</v-icon></label>
      </v-flex>

      <v-flex xs12 sm4 class="px-1">
        <label>Cơ sở sản xuất trong nước: <v-icon size="18" style="color: green; display: inline-block;">{{vr_ApplicantProfile['markupDomesticsManuacturer'] === 0 ? 'done' : 'done'}} </v-icon></label>
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

      <v-flex xs12 sm12 class="pl-5">
        <label>Hình thức cấp phôi phiếu cho xe cơ giới: {{vr_ApplicantProfile['issueTypeXCG'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12 class="pl-5">
        <label>Hình thức cấp phôi phiếu cho Xe mô tô, xe máy: {{vr_ApplicantProfile['issueTypeXMY'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12 class="pl-5">
        <label>Hình thức cấp phôi phiếu cho Xe chuyên dùng: {{vr_ApplicantProfile['issueTypeXCD'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12 class="pl-5">
        <label>Hình thức cấp phôi phiếu cho Xe đạp điện: {{vr_ApplicantProfile['issueTypeXDD'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12 class="pl-5">
        <label>Hình thức cấp phôi phiếu cho Xe chở người bốn bánh: {{vr_ApplicantProfile['issueTypeXCN'] | typeHinhThuc}}</label>
      </v-flex>

      <v-flex xs12 sm12 class="pl-5">
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
      headersNguoiDaiDien: [
        {
          'text': 'Họ và tên',
          'align': 'center',
          'sortable': false,
          'value': 'stt',
          'display': ''
        },
        {
          'text': 'Số điện thoại',
          'align': 'center',
          'sortable': false,
          'value': 'maXuong',
          'display': ''
        },
        {
          'text': 'Email',
          'align': 'center',
          'sortable': false,
          'value': 'tenXuong',
          'display': ''
        }
      ],
      dataNguoiDaiDienItems: [],
      vr_ProductClassificationItems: [],
      vr_ApplicantProfileProdEquipmentItems: [],
      vr_ApplicantProfileEquipmentItems: [],
      vr_ApplicantProfileSupplierItems: [],
      vr_ApplicantProfileEmployeeItems: [],
      vr_ApplicantProfile: {
        productionPlantMetadata: '',
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
        if (result) {
          this.$emit('thongTinDoanhNghiep', result)
          vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
          if (result['applicantCityCode']) {
            vm.getDictItem('districtItems', {parent: result['applicantCityCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
          }
          if (result['applicantDistrictCode']) {
            vm.getDictItem('wardItems', {parent: result['applicantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
          }
        }
      })
    })
  },
  watch: {
    'vr_ApplicantProfile.productionPlantMetadata' (val) {
      if (val) {
        this.dataNguoiDaiDienItems = JSON.parse(val) || []
      }
    },
    'vr_ApplicantProfile.applicantCityCode' (val) {
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'vr_ApplicantProfile.applicantDistrictCode' (val) {
      if (val) {
        this.getDictItem('wardItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    '$route': function (newRoute, oldRoute) {
      let vm = this
      // let query = newRoute.query
      vm.getThongTin().then(result => {
        if (result) {
          this.$emit('thongTinDoanhNghiep', result)
          vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
          if (result['applicantCityCode']) {
            vm.getDictItem('districtItems', {parent: result['applicantCityCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
          }
          if (result['applicantDistrictCode']) {
            vm.getDictItem('wardItems', {parent: result['applicantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
          }
        }
      })
    }
  },
  methods: {
    getThongTin () {
      let vm = this
      return new Promise((resolve, reject) => {
        let query = {
          applicantcode: vm.id,
          mtcore: 1
        }
        vm.$store.dispatch('getThongTinDN', query).then(result => {
          vm.vr_ApplicantProfile = result || {}
          resolve(result)
        }).catch(xhr => {
          reject(xhr)
        })
      })
    },
    loadProductionPlants (data) {
      let vm = this
      if (!data) {
        data = {}
      }
      data['applicantDistrictCode'] = vm.id
      vm.$store.dispatch('loadProductionPlants', data).then(result => {
        vm.vr_ProductPlantItems = result['data'] || []
      }).catch(xhr => {
        vm.vr_ProductPlantItems = []
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
      } else if (state === 30) {
        return 'Cấp giám sát'
      } else {
        return ''
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
    date (date) {
      if (!date) {
        return ''
      }
      return moment(String(date)).utc().format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>

