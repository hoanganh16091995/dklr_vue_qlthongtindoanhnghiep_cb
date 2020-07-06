<!-- TODO detailTemplate page -->
<template>
  <div style="width: 100%;">
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12>
        <label>Tên xưởng sản xuất lắp ráp:</label>
        <v-text-field
        v-model="vr_ProductionPlant['productionPlantName']"
        outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12>
        <label>Địa điểm sản xuất (Theo Giấy chứng nhận đăng ký doanh nghiệp / chứng nhận đăng ký kinh doanh/ chứng nhận đầu tư):</label>
        <v-textarea
        rows="2"
        v-model="vr_ProductionPlant['productionPlantAddress']"
        outline
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Tỉnh/Thành:</label>
        <v-autocomplete
        :items="cityItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ProductionPlant['productionPlantProvinceCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Quận/Huyện:</label>
        <v-autocomplete
        :items="districtItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ProductionPlant['productionPlantDistrictCode']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 class="px-1">
        <label>Phường/Xã:</label>
        <v-autocomplete
        :items="wardItems"
        item-text="itemName"
        item-value="itemCode"
        v-model="vr_ProductionPlant['productionPlantWard']"
        outline
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm12>
        <label>Loại giấy chứng nhận:</label>
        <v-radio-group v-model="radioGroup">
          <v-radio
          label="Giấy chứng nhận đăng ký doanh nghiệp"
          :value="1"
          ></v-radio>
          <v-radio
          label="Giấy chứng nhận đăng ký kinh doanh"
          :value="1"
          ></v-radio>
          <v-radio
          label="Giấy chứng nhận đầu tư"
          :value="1"
          ></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs12 sm4>
        <label class="bold">Số giấy chứng nhận:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['productionPlantIdentityNo']"
        placeholder="Nhập số giấy chứng nhận"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm4>
        <label class="bold">Nơi cấp:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['noiCap']"
        placeholder="Nhập nơi cấp"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm4>
        <label class="bold">Ngày cấp:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['ngayCap']"
        placeholder="Nhập ngày cấp"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6>
        <label class="bold">Địa chỉ email:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['productionPlantEmail']"
        placeholder="Nhập địa chỉ email"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6>
        <label class="bold">Website:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['productionPlantWebsite']"
        placeholder="Nhập website"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12>
        <label class="bold">Loại hình:</label>
        <v-checkbox class="ml-5" v-model="vr_ProductionPlant['productionMaintainer']" label="Bảo hành bảo dưỡng" value="2"></v-checkbox>
        <v-checkbox class="ml-5" v-model="vr_ProductionPlant['productionManufacture']" label="Sản xuất lắp ráp" value="1"></v-checkbox>
      </v-flex>

      <v-flex xs12 sm3>
        <label class="bold">Người đại diện:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['productionPlantRepresentative']"
        placeholder="Nhập tên người đại diện"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm3>
        <label class="bold">Chức danh:</label>
        <v-text-field
        :disabled="disabledForm"
        outline
        v-model="vr_ProductionPlant['productionPlantRepresentativeTitle']"
        placeholder="Nhập chức danh"
        clearable
        class="py-0 pr-1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm3>
        <label class="bold">Số điện thoại người đại diện:</label>
        <v-text-field
          :disabled="disabledForm"
          outline
          v-model="vr_ProductionPlant['poductionPlantContactPhone']"
          placeholder="Nhập số điện thoại"
          clearable
          class="py-0 pr-1"
          ></v-text-field>
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
                v-model="props.item['productionPlantRepresentative']"
                placeholder="Nhập tên người đại diện"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-text-field
                :disabled="true"
                v-model="props.item['poductionPlantContactPhone']"
                placeholder="Nhập số điện thoại"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-text-field
                :disabled="true"
                v-model="props.item['poductionPlantContactEmail']"
                placeholder="Nhập email"
                clearable
                class="py-0"
                ></v-text-field>
              </td>
            </tr>
          </template>

        </v-data-table>
      </v-flex>

      <!-- <v-flex xs12 sm12>
        <label>Cơ sở SXLR nước ngoài liên kết cung cấp phụ tùng cho nhà xưởng lắp ráp:</label>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Cơ sở sản xuất</th>
              <th class="text-xs-center">Địa chỉ</th>
              <th class="text-xs-center">Ngày cập nhật</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductionPlantSupplierItems">
              <td style="width: 5%;" class="text-xs-center">{{index + 1}}</td>
              <td>
                {{item['corporationName']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['corporationAddress']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['modifyDate']}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>
      <v-flex xs12 sm6 style="display: flex; align-items: flex-end;">
        <label>Danh sách nhân viên KTCL tại nhà xưởng:</label>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
      </v-flex>
      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Tên nhân viên</th>
              <th class="text-xs-center">Số chứng chỉ</th>
              <th class="text-xs-center">Vị trí làm việc</th>
              <th class="text-xs-center">Nơi đào tạo</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductionPlantEmployeeItems">
              <td style="width: 5%;" class="text-xs-center">
                {{item['sequenceNo']}}
              </td>
              <td>
                {{item['employeeName']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['employeeCertificateNo']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['workingPosition']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['trainningAt']}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>

      <v-flex xs12 sm6 style="display: flex; align-items: flex-end;">
        <label>Danh sách trang thiết bị kiểm tra tại nhà xưởng:</label>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
      </v-flex>
      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Mã thiết bị</th>
              <th class="text-xs-center">Tên thiết bị</th>
              <th class="text-xs-center">Tên nhãn hiệu</th>
              <th class="text-xs-center">Tên thương mại</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductionPlantEquipmentItems">
              <td style="width: 5%;" class="text-xs-center">
                {{item['sequenceNo']}}
              </td>
              <td>
                {{item['equipmentCode']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['equipmentName']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['trademarkname']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['commercialname']}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>

      <v-flex xs12 sm6 style="display: flex; align-items: flex-end;">
        <label>Danh sách trang thiết bị sản xuất tại nhà xưởng:</label>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
      </v-flex>
      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Mã thiết bị</th>
              <th class="text-xs-center">Tên thiết bị</th>
              <th class="text-xs-center">Tên nhãn hiệu</th>
              <th class="text-xs-center">Tên thương mại</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductionPlantProdEquipmentItems">
              <td style="width: 5%;" class="text-xs-center">
                {{item['sequenceNo']}}
              </td>
              <td>
                {{item['equipmentCode']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['equipmentName']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['trademarkname']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['commercialname']}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>

      <v-flex xs12 sm6 style="display: flex; align-items: flex-end;">
        <label>Danh sách loại sản phẩm SXLR tại nhà xưởng:</label>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
      </v-flex>
      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Nhóm sản phẩm</th>
              <th class="text-xs-center">Loại sản phẩm</th>
              <th class="text-xs-center">Tên nhãn hiệu</th>
              <th class="text-xs-center">Tên thương mại</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductionPlantProdEquipmentItems">
              <td style="width: 5%;" class="text-xs-center">
                {{item['sequenceNo']}}
              </td>
              <td>
                {{item['vehicleClass']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['vehicleTypeCode']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['trademarkname']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['commercialname']}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>

      <v-flex xs12 sm6 style="display: flex; align-items: flex-end;">
        <label>Danh sách Loại hình sản xuất của nhà xưởng:</label>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
      </v-flex>
      <v-flex xs12 sm12>
        <table border="1" class="table-simple" style="width: 100%;" >
          <thead>
            <tr>
              <th class="text-xs-center">
                STT
              </th>
              <th class="text-xs-center">Loại hình sản xuất, lắp ráp</th>
              <th class="text-xs-center">Phân loại</th>
              <th class="text-xs-center">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in vr_ProductClassificationItems">
              <td style="width: 5%;" class="text-xs-center">
                {{item['sequenceNo']}}
              </td>
              <td>
                {{item['vehicleClass']}}
              </td>
              <td class="text-xs-center" style="width: 20%;">
                {{item['classificationMode']}}
              </td>
              <td class="text-xs-center" style="width: 14%;">
                {{item['status'] | productClassificationStatus}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
// import axios from 'axios'
// import router from '@/router'
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
    referenceUid: '',
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
      vr_ProductionPlantProdEquipmentItems: [],
      vr_ProductionPlantEquipmentItems: [],
      vr_ProductionPlantSupplierItems: [],
      vr_ProductionPlantEmployeeItems: [],
      vr_ProductionPlant: {
        productionPlantProvinceCode: '',
        productionPlantDistrictCode: '',
        productionPlantMetadata: ''
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
      vm.loadvr_ProductionPlant()
      let productionPlantProvinceCode = vm.vr_ProductionPlant['productionPlantProvinceCode'] || 0
      vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
      if (productionPlantProvinceCode) {
        vm.getDictItem('districtItems', {parent: productionPlantProvinceCode, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (vm.vr_ProductionPlant['productionPlantDistrictCode']) {
        vm.getDictItem('districtItems', {parent: vm.vr_ProductionPlant['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    })
  },
  watch: {
    'vr_ProductionPlant.productionPlantMetadata' (val) {
      if (val) {
        this.dataNguoiDaiDienItems = JSON.parse(val) || []
      }
    },
    'vr_ProductionPlant.productionPlantProvinceCode' (val) {
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'vr_ProductionPlant.productionPlantDistrictCode' (val) {
      if (val) {
        this.getDictItem('wardItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    '$route': function (newRoute, oldRoute) {
      let vm = this
      vm.$nextTick(function () {
        vm.loadvr_ProductionPlant()
        let productionPlantProvinceCode = vm.vr_ProductionPlant['productionPlantProvinceCode'] || 0
        vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
        if (productionPlantProvinceCode) {
          vm.getDictItem('districtItems', {parent: productionPlantProvinceCode, dictItemCode: 'ADMINISTRATIVE_REGION'})
        }
        if (vm.vr_ProductionPlant['productionPlantDistrictCode']) {
          vm.getDictItem('districtItems', {parent: vm.vr_ProductionPlant['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
        }
      })
    }
  },
  methods: {
    loadvr_ProductionPlant () {
      let vm = this
      if (vm.item && vm.item['id']) {
        console.log('thong tin xuong+++++++', vm.item)
        vm.vr_ProductionPlant = vm.item
        return
      }
      if (!vm.id || vm.id === '0') {
        console.log('not id to load thong tin xuong+++++++', vm.thongTinChung)
        return
      }
      vm.$store.dispatch('getvr_ProductionPlant', {
        productionPlantCode: vm.id
      }).then(result => {
        vm.vr_ProductionPlant = result || {}
      }).catch(xhr => {
      })
    },
    // getThongTin () {
    //   let vm = this
    //   return new Promise((resolve, reject) => {
    //     let query = {
    //       'indice': 'vr_ApplicantProfile',
    //       'query': {
    //         'query': {
    //           'bool': {
    //             'must': [
    //               {
    //                 'match': {
    //                   'type_es': 'vr_ApplicantProfile'
    //                 }
    //               },
    //               {
    //                 'match': {
    //                   'registrationId': vm.registrationId
    //                 }
    //               },
    //               {
    //                 'match': {
    //                   'data.vr_ProductionPlant.referenceUid': vm.referenceUid
    //                 }
    //               }
    //             ]
    //           }
    //         }
    //       }
    //     }
    //     vm.$store.dispatch('getThongTin', query).then(result => {
    //       let data = result['hits']['hits']
    //       let tempObj = {}
    //       if (data && data['length']) {
    //         tempObj = data[0]['_source']
    //       }
    //       vm.vr_ApplicantProfile = tempObj['data']['vr_ApplicantProfile'] || {}
    //       vm.vr_ProductionPlant = tempObj['data']['vr_ProductionPlant'] || {}
    //       vm.vr_ApplicantProfileEmployeeItems = tempObj['data']['vr_ApplicantProfileEmployeeItems'] || []
    //       vm.vr_ProductClassificationItems = tempObj['data']['vr_ProductClassificationItems'] || []
    //       vm.vr_ApplicantProfileProdEquipmentItems = tempObj['data']['vr_ApplicantProfileProdEquipmentItems'] || []
    //       vm.vr_ApplicantProfileEquipmentItems = tempObj['data']['vr_ApplicantProfileEquipmentItems'] || []
    //       vm.vr_ApplicantProfileSupplierItems = tempObj['data']['vr_ApplicantProfileSupplierItems'] || []
    //       resolve(tempObj)
    //     }).catch(xhr => {
    //       reject(xhr)
    //     })
    //   })
    // },
    // getDetailApplicantProfile (data) {
    //   let vm = this
    //   if (!data) {
    //     data = {}
    //   }
    //   return new Promise((resolve, reject) => {
    //     vm.$store.dispatch('getDetailApplicantProfile', data).then(result => {
    //       vm.vr_ProductionPlant = result || {}
    //       resolve(vm.vr_ProductionPlant)
    //     }).catch(xhr => {
    //       reject(xhr)
    //     })
    //   })
    // },
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
