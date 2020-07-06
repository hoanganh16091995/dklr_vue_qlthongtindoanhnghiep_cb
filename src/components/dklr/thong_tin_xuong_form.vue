<template>
  <div style="background: #ffff;">
    <v-form
      ref="formNhaXuong"
      v-model="validFormNX"
      lazy-validation
      :style="styleStatus"
      >
      <div class="ml-0">
        <v-layout row wrap class="ml-0">
          <!-- <div class="lv-title">THÔNG TIN XƯỞNG SẢN XUẤT LẮP RÁP</div> -->
          <v-flex xs12 sm12 class="pt-2">
            <label class="bold">Tên xưởng sản xuất, lắp ráp: <span style="color: red;">(*)</span></label>
            <v-text-field
              outline
              :disabled="disabledForm"
              v-model="thongTinXuong['productionPlantName']"
              placeholder="Nhập tên xưởng sản xuất, lắp ráp"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantName')}"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold">Địa điểm sản xuất (Theo Giấy chứng nhận đăng ký doanh nghiệp / chứng nhận đăng ký kinh doanh/ chứng nhận đầu tư): <span style="color: red;">(*)</span></label>
            <v-text-field
              outline
              :disabled="disabledForm"
              v-model="thongTinXuong['productionPlantAddress']"
              placeholder="Nhập địa chỉ xưởng"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantAddress')}"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4 class="pr-1">
            <label class="bold">Tỉnh thành</label>
            <v-autocomplete
              class="pr-1"
              @input="changeTinhThanh()"
              :class="{'track-change': isChange('productionPlantProvinceCode')}"
              outline
              :items="cityItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantProvinceCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4 class="pr-1">
            <label class="bold">Quận/Huyện:</label>
            <v-autocomplete
              class="pr-1"
              @input="changeQuanHuyen()"
              :class="{'track-change': isChange('productionPlantDistrictCode')}"
              outline
              :items="districtItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantDistrictCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Phường/Xã:</label>
            <v-autocomplete
              :class="{'track-change': isChange('applicantName')}"
              :items="wardItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantWardCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold">Loại giấy chứng nhận: <span style="color: red;">(*)</span></label>
            <v-radio-group v-model="thongTinXuong['productionPlantIdentityType']" column class="ml-5" required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']">
              <v-radio label="Giấy chứng nhận đăng ký doanh nghiệp" value="2"></v-radio>
              <v-radio label="Giấy chứng nhận đăng ký kinh doanh" value="1"></v-radio>
              <v-radio label="Giấy chứng nhận đầu tư" value="3"></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold" v-if="thongTinXuong['productionPlantIdentityType'] === 2 || thongTinXuong['productionPlantIdentityType'] === '2'">Giấy chứng nhận đăng ký doanh nghiệp:</label>

            <label class="bold" v-else-if="thongTinXuong['productionPlantIdentityType'] === 3 || thongTinXuong['productionPlantIdentityType'] === '3'">Giấy chứng nhận đầu tư:</label>

            <label class="bold" v-else>Giấy chứng nhận đăng ký kinh doanh:</label>
          </v-flex>
          <v-flex xs12 sm8>
            <v-layout row wrap class="ml-0">
              <v-flex xs12 sm2 class="pt-2">
                <label class="">Nhập tên file: <span style="color: red;">(*)</span></label>
              </v-flex>
              <v-flex xs12 sm3 class="pt-1">
                <v-text-field
                :disabled="disabledForm"
                outline
                required
                :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
                v-model="thongTinXuong['productionPlantIdentityFileName']"
                placeholder="Nhập tên file"
                clearable
                class="py-0"
                :class="{'track-change': isChange('productionPlantIdentityFileName')}"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 class="text-xs-center">
                <v-chip label style="cursor: pointer;" outline color="blue" @click="xacNhanTaiFileGCNDangKy()">Xác nhận tải file</v-chip>
              </v-flex>
              <v-flex xs12 sm4 class="pt-2">
                <input type="file" name="fileGCN" id="fileGCN">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm4>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Số giấy chứng nhận:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantIdentityNo']"
              placeholder="Nhập số giấy chứng nhận"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantIdentityNo')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Nơi cấp:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['noiCap']"
              placeholder="Nhập nơi cấp"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('noiCap')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Ngày cấp:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['ngayCap']"
              placeholder="Nhập ngày cấp"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('ngayCap')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <label class="bold">Địa chỉ email:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantEmail']"
              placeholder="Nhập địa chỉ email"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantEmail')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <label class="bold">Website:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantWebsite']"
              placeholder="Nhập website"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantWebsite')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold">Loại hình:</label>
            <v-checkbox class="ml-5" v-model="thongTinXuong['productionMaintainer']" label="Bảo hành bảo dưỡng" value="2"></v-checkbox>
            <v-checkbox class="ml-5" v-model="thongTinXuong['productionManufacture']" label="Sản xuất lắp ráp" value="1"></v-checkbox>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Người đại diện:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantRepresentative']"
              placeholder="Nhập tên người đại diện"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantRepresentative')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Chức danh:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantRepresentativeTitle']"
              placeholder="Nhập chức danh"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('productionPlantRepresentativeTitle')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Số điện thoại người đại diện:</label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['poductionPlantContactPhone']"
              placeholder="Nhập số điện thoại"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('poductionPlantContactPhone')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold pb-1">Người liên hệ:</label> <br>
            <v-chip class="mb-1" label outline color="blue" @click="addContact()">Thêm mới </v-chip> <br>

            <v-data-table
              v-if="!loading"
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
                      :disabled="disabledForm"
                      v-model="props.item['productionPlantRepresentative']"
                      placeholder="Nhập tên người đại diện"
                      clearable
                      class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                    :disabled="disabledForm"
                    v-model="props.item['poductionPlantContactPhone']"
                    placeholder="Nhập số điện thoại"
                    clearable
                    class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                      :disabled="disabledForm"
                      v-model="props.item['poductionPlantContactEmail']"
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

        </v-layout>
      </div>
    </v-form>
  </div>
</template>

<script>
// import supportData from '../store/support_data.json'
// import $ from 'jquery'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}
export default {
  props: {
    disabledForm: {
      type: Boolean,
      default: false
    },
    thongTinXuong: {
      productionPlantIdentityFileEntryId: 0,
      productionPlantIdentityType: 2,
      id: 0
    },
    thongTinXuongPev: {
      type: Object,
      default: {}
    }
  },
  components: {
  },
  data: () => ({
    validFormNX: false,
    cityItems: [],
    wardItems: [],
    districtItems: [],
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
      },
      {
        'text': 'Actions',
        'align': 'center',
        'sortable': false,
        'value': 'lastUpdate',
        'display': ''
      }
    ],
    dataNguoiDaiDienItems: [],
    loading: false,
    loadHomeDataTable: {},
    headers: [],
    payment: false,
    formTTDN: {},
    listXuongItems: [],
    listRegistrationTemplate: [],
    indexSelect: -1,
    loaiHinhItems: [
      {
        itemCode: 'Công ty Cổ phần',
        itemName: 'Công ty Cổ phần'
      },
      {
        itemCode: 'Công ty hợp danh',
        itemName: 'Công ty hợp danh'
      },
      {
        itemCode: 'Công ty liên doanh',
        itemName: 'Công ty liên doanh'
      },
      {
        itemCode: 'Công ty trách nhiệm hữu hạn hai thành viên trở lên',
        itemName: 'Công ty trách nhiệm hữu hạn hai thành viên trở lên'
      },
      {
        itemCode: 'Công ty trách nhiệm hữu hạn một thành viên',
        itemName: 'Công ty trách nhiệm hữu hạn một thành viên'
      },
      {
        itemCode: 'Doanh nghiệp Tư nhân',
        itemName: 'Doanh nghiệp Tư nhân'
      },
      {
        itemCode: 'Doanh nghiệp nhà nước',
        itemName: 'Doanh nghiệp nhà nước'
      },
      {
        itemCode: 'Hợp Tác Xã',
        itemName: 'Hợp Tác Xã'
      }
    ],
    linhVucItems: [
      {
        itemCode: 'Cục Đăng kiểm Việt Nam',
        itemName: 'Cục đăng kiểm Việt Nam'
      }
    ]
  }),
  computed: {
    styleStatus () {
      let vm = this
      let style = {}
      if (!vm.thongTinChung['applicantStatus'] || vm.thongTinChung['applicantStatus'] === '0' || vm.thongTinChung['applicantStatus'] === 3 || vm.thongTinChung['applicantStatus'] === '3' || vm.disabledForm) {
        style['pointer-events'] = 'none'
      }
      return style
    },
    thongTinChung () {
      /* eslint-disable */
      let item = this.$store.getters.thongTinChung || {}
      console.log('return item', item)
      return item
      /* eslint-disable */
    }
  },
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
    })
  },
  created () {
    let vm = this
    vm.$nextTick(function () {
      vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
      if (vm.thongTinXuong['productionPlantProvinceCode']) {
        vm.getDictItem('districtItems', {parent: vm.thongTinXuong['productionPlantProvinceCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (vm.thongTinXuong['productionPlantDistrictCode']) {
        vm.getDictItem('wardItems', {parent: vm.thongTinXuong['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    })
  },
  watch: {
    'dataNguoiDaiDienItems' (val) {
      this.thongTinXuong['productionPlantMetadata'] = JSON.stringify(val)
    },
    'thongTinXuong.productionPlantProvinceCode' (val) {
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'thongTinXuong.productionPlantDistrictCode' (val) {
      if (val) {
      }
    },
    'thongTinXuong.id' (val) {
      if (!val || val === '0') {
        this.thongTinXuong['productionPlantProvinceCode'] = this.thongTinChung['applicantCityCode']
        this.thongTinXuong['productionPlantIdentityNo'] = this.thongTinChung['applicantCode']
      }
    }
  },
  methods: {
    changeTinhThanh () {
      console.log('watch val======111=====', this.thongTinXuong['productionPlantProvinceCode'])
      this.getDictItem('districtItems', {parent: this.thongTinXuong['productionPlantProvinceCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    changeQuanHuyen () {
      console.log('watch val======222222=====', this.thongTinXuong['productionPlantDistrictCode'])
      this.getDictItem('wardItems', {parent: this.thongTinXuong['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    isChange (key) {
      let vm = this
      if (!vm.thongTinXuong || (Object.keys(vm.thongTinXuong).length === 0 && vm.thongTinXuong.constructor === Object)) {
        // console.log('not THONG TIN XƯỞNG ')
        return false
      }
      if (!vm.thongTinXuongPev || (Object.keys(vm.thongTinXuongPev).length === 0 && vm.thongTinXuongPev.constructor === Object)) {
        // console.log('not THONG TIN XƯỞNG PREV')
        return false
      }
      if (vm.thongTinXuong[key] !== vm.thongTinXuongPev[key]) {
        return true
      }
      return false
    },
    addContact () {
      this.dataNguoiDaiDienItems.push({})
    },
    deleteContact (item, index) {
      this.dataNguoiDaiDienItems.splice(index, 1)
    },
    xacNhanTaiFileGCNDangKy () {
      let vm = this
      if (!vm.thongTinXuong['productionPlantIdentityFileName']) {
        toastr.error('Bạn phải nhập tên file!')
        vm.$refs.formNhaXuong.validate()
        return
      }
      let inputFile = $('#fileGCN')[0]
      vm.$store.dispatch('uploadFileFormDN', {
        inputFile: inputFile
      }).then(result => {
        toastr.success('Tải lên thành công!')
        vm.thongTinXuong['productionPlantIdentityFileEntryId'] = result['fileId'] || 0
      }).catch(xhr => {
        toastr.error('Tải lên thất bại, vui lòng thử lại!')
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
    mapThongTinChungToForm () {
      let vm = this
      return new Promise((resolve, reject) => {
        vm.$store.dispatch('loadInitResource').then(function (result) {
          vm.loading = false
          if (!vm.id || vm.id === '0') {
            vm.thongTinChung = Object.assign(vm.thongTinChung, {
              applicantName: result.applicant['applicantName'],
              applicantIdType: result.applicant['applicantIdType'],
              applicantIdNo: result.applicant['applicantIdNo'],
              applicantIdDate: result.applicant['applicantIdDate'],
              address: result.applicant['address'],
              cityCode: result.applicant['cityCode'],
              districtCode: result.applicant['districtCode'],
              wardCode: result.applicant['wardCode'],
              contactName: result.applicant['contactName'],
              contactTelNo: result.applicant['contactTelNo'],
              contactEmail: result.applicant['contactEmail'],
              govAgencyCode: result.applicant['govAgencyCode'],
              representativeEnterprise: result.applicant['representativeEnterprise']
            })
          }
          resolve(vm.thongTinChung)
        }).catch(xhr => {
          vm.loading = false
          reject(xhr)
        })
      })
    }
  },
  filters: {
  }
}
</script>
