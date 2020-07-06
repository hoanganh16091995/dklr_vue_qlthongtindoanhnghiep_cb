<template>
  <div style="background: #ffff;">
    <div class="ml-0">
      <v-form
      ref="formDoanhNghiep"
      v-model="validFormDN"
      lazy-validation
      :style="styleStatus"
      >
        <v-layout row wrap class="ml-0">
          <!-- <div class="lv-title">THÔNG TIN CHUNG DOANH NGHIỆP</div> -->

          <v-flex xs12 sm12 v-if="thongTinDoanhNghiep['applicantStatus'] === 3 || thongTinDoanhNghiep['applicantStatus'] === '3'">
            <label class="bold">Ghi chú: </label> <label class="bold">{{thongTinDoanhNghiep['applicantRemarks']}}</label>
          </v-flex>

          <v-flex xs12 sm12 class="pt-2">
            <label class="bold">Tên doanh nghiệp: <span style="color: red;">(*)</span></label></label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinDoanhNghiep['applicantName']"
              placeholder="Nhập tên doanh nghiệp"
              clearable
              class="py-0"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
              :class="{'track-change': isChange('applicantName')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold">Địa chỉ trụ sở chính (Theo Giấy chứng nhận đăng ký doanh nghiệp): <span style="color: red;">(*)</span></label></label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinDoanhNghiep['applicantAddress']"
              placeholder="Nhập địa chỉ doanh nghiệp"
              clearable
              class="py-0"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
              :class="{'track-change': isChange('applicantAddress')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4 class="pr-1">
            <label class="bold">Tỉnh thành</label>
            <v-autocomplete
              @input="changeTinhThanh()"
              :items="cityItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinDoanhNghiep['applicantCityCode']"
              outline
              :class="{'track-change': isChange('applicantCityCode')}"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4 class="pr-1">
            <label class="bold">Quận/Huyện:</label>
            <v-autocomplete
              @input="changeQuanHuyen()"
              :items="districtItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinDoanhNghiep['applicantDistrictCode']"
              outline
              :class="{'track-change': isChange('applicantDistrictCode')}"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Phường/Xã:</label>
            <v-autocomplete
              :items="wardItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinDoanhNghiep['applicantWardCode']"
              outline
              :class="{'track-change': isChange('applicantWardCode')}"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Mã số doanh nghiệp (mã số thuế):</label>
            <v-text-field
              :disabled="true"
              outline
              v-model="thongTinDoanhNghiep['applicantCode']"
              placeholder="Nhập mã số thuế doanh nghiệp"
              clearable
              class="py-0 pr-1"
              :class="{'track-change': isChange('applicantCode')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Nơi cấp: <span style="color: red;">(*)</span></label>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinDoanhNghiep['noiCap']"
              placeholder="Nhập nơi cấp"
              clearable
              class="py-0 pr-1"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
              :class="{'track-change': isChange('noiCap')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <label class="bold">Ngày cấp: <span style="color: red;">(*)</span></label>

            <v-menu
              ref="ngayCap"
              v-model="ngayCapMenu"
              :close-on-content-click="false"
              full-width
              >
              <template>
                <v-text-field
                  slot="activator"
                  class="py-0 pr-1"
                  v-model="thongTinDoanhNghiep['ngayCapFormatted']"
                  outline
                  placeholder="Nhập ngày cấp"
                  @blur="ngayCap = parseDate(thongTinDoanhNghiep['ngayCapFormatted'])"
                  required
                  :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
                  :class="{'track-change': isChange('ngayCap')}"
                ></v-text-field>
              </template>
              <v-date-picker v-model="ngayCap" no-title @input="ngayCapMenu = false"></v-date-picker>
            </v-menu>
            <!-- <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinDoanhNghiep['ngayCap']"
              placeholder="Nhập ngày cấp"
              clearable
              class="py-0 pr-1"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
              :class="{'track-change': isChange('ngayCap')}"
            ></v-text-field> -->
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold">Loại giấy chứng nhận:</label>
            <v-radio-group v-model="thongTinDoanhNghiep['applicantIdentityType']" column class="ml-5">
              <v-radio label="Giấy chứng nhận đăng ký doanh nghiệp" value="2"></v-radio>
              <v-radio label="Giấy chứng nhận đăng ký kinh doanh" value="1"></v-radio>
            </v-radio-group>
          </v-flex>
    
          <v-flex xs12 sm12>
            <label class="bold" v-if="(thongTinDoanhNghiep['applicantIdentityType'] === 2 || thongTinDoanhNghiep['applicantIdentityType'] === '2')">
              Giấy chứng nhận đăng ký doanh nghiệp:
            </label>
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
                  v-model="thongTinDoanhNghiep['applicantIdentityFileName']"
                  placeholder="Nhập tên file"
                  clearable
                  class="py-0"
                  :class="{'track-change': isChange('applicantIdentityFileName')}"
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
          
          <v-flex xs12 sm12>
            <label class="bold">Giấy chứng nhận đủ điều kiện sản xuất, lắp ráp ô tô (Với loại hình sản xuất Trên cơ sở tổng thành rời):</label>
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
                  v-model="thongTinDoanhNghiep['applicantXcgFileName']"
                  placeholder="Nhập tên file"
                  clearable
                  class="py-0"
                  :class="{'track-change': isChange('applicantXcgFileName')}"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 class="text-xs-center">
                <v-chip label style="cursor: pointer;" outline color="blue" @click="xacNhanTaiFileĐuieuKien()">Xác nhận tải file</v-chip>
              </v-flex>
              <v-flex xs12 sm4 class="pt-2">
                <input type="file" name="fileDieuKien" id="fileDieuKien">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm4>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Số điện thoại:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantPhone']"
            placeholder="Nhập số điện thoại"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantPhone')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Số fax:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantFax']"
            placeholder="Nhập số fax"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantFax')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Địa chỉ email:</label>
            <v-text-field
            :disabled="true"
            outline
            v-model="thongTinDoanhNghiep['applicantEmail']"
            placeholder="Nhập địa chỉ email"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantEmail')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Website:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantWebsite']"
            placeholder="Nhập website"
            clearable
            class="py-0"
            :class="{'track-change': isChange('applicantWebsite')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Người đại diện:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantRepresentative']"
            placeholder="Nhập tên người đại diện"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantRepresentative')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Chức danh:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantRepresentativeTitle']"
            placeholder="Nhập chức danh"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantRepresentativeTitle')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Số điện thoại người đại diện:</label>
            <v-text-field
            :disabled="disabledForm"
            outline
            v-model="thongTinDoanhNghiep['applicantRepresentativePhone']"
            placeholder="Nhập số điện thoại"
            clearable
            class="py-0 pr-1"
            :class="{'track-change': isChange('applicantRepresentativePhone')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <label class="bold">Loại hình doanh nghiệp:</label>
            <v-autocomplete
            :items="loaiHinhItems"
            item-text="itemName"
            item-value="itemCode"
            v-model="thongTinDoanhNghiep['markupCorporation']"
            outline
            :class="{'track-change': isChange('markupCorporation')}"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm12>
            <label class="bold pb-1">Người liên hệ:</label> <br>
            <v-chip class="mb-1" label outline color="blue" @click="addContact()">Thêm mới</v-chip> <br>

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
                      v-model="props.item['applicantContactName']"
                      placeholder="Nhập tên người đại diện"
                      clearable
                      class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                    :disabled="disabledForm"
                    v-model="props.item['applicantContactPhone']"
                    placeholder="Nhập số điện thoại"
                    clearable
                    class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                    :disabled="disabledForm"
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

          <v-flex xs12 sm1 class="pt-2">
            <label class="bold">Đối tượng:</label>
          </v-flex>
          <v-flex xs12 sm11 class="pt-2">
            <v-layout row wrap style="">
              <v-flex xs12 sm3>
                <v-checkbox class="" :class="{'track-change': isChange('markupMaintainer')}" v-model="thongTinDoanhNghiep['markupMaintainer']" label="CS Bảo hành bảo dưỡng" value="4"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm3>
                <v-checkbox class="" :class="{'track-change': isChange('markupImporter')}" v-model="thongTinDoanhNghiep['markupImporter']" label="CS Nhập khẩu" value="3"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm3>
                <v-checkbox class="" :class="{'track-change': isChange('markupDomesticsManufacturer')}" v-model="thongTinDoanhNghiep['markupDomesticsManufacturer']" label="CS SXLR trong nước" value="2"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm3>
                <v-checkbox class="" :class="{'track-change': isChange('markupDesigner')}" v-model="thongTinDoanhNghiep['markupDesigner']" label="CS Thiết kế" value="1"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
    </div>
  </div>
</template>

<script>
// import supportData from '../store/support_data.json'
import $ from 'jquery'
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
    thongTinDoanhNghiep: {
      type: Object,
      default: {
        applicantCityCode: '',
        applicantDistrictCode: '',
        applicantWardCode: '',
        applicantStatus: 0,
        productionPlantMetadata: '',
        applicantIdentityFileEntryId: 0,
        applicantXcgFileEntryId: 0,
        applicantIdentityType: 2
      }
    },
    thongTinChungPrev: {
      type: Object,
      default: {}
    }
  },
  components: {
  },
  data: () => ({
    validFormDN: true,
    cityItems: [],
    districtItems: [],
    wardItems: [],
    ngayCap: '',
    ngayCapMenu: false,
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
    thongTinXuong: {},
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
      if (!vm.thongTinDoanhNghiep['applicantStatus'] || vm.thongTinDoanhNghiep['applicantStatus'] === '0' || vm.thongTinDoanhNghiep['applicantStatus'] === 3 || vm.thongTinDoanhNghiep['applicantStatus'] === '3' || vm.disabledForm) {
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
      if (vm.thongTinDoanhNghiep['applicantCityCode']) {
        vm.getDictItem('districtItems', {parent: vm.thongTinDoanhNghiep['applicantCityCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (vm.thongTinDoanhNghiep['applicantDistrictCode']) {
        vm.getDictItem('wardItems', {parent: vm.thongTinDoanhNghiep['applicantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (!vm.id || vm.id === '0') {
        // vm.mapThongTinChungToForm()
      }
    })
  },
  watch: {
    ngayCap (val) {
      this.thongTinDoanhNghiep['ngayCapFormatted'] = this.formatDate(val)
    },
    'dataNguoiDaiDienItems' (val) {
      this.thongTinDoanhNghiep['productionPlantMetadata'] = JSON.stringify(val)
      console.log('thongTinDoanhNghiep=============', this.thongTinDoanhNghiep)
    },
    'thongTinDoanhNghiep.applicantCityCode' (val) {
      console.log('watch val======111=====', val)
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'thongTinDoanhNghiep.applicantDistrictCode' (val) {
      console.log('watch val=====222======', val)
      if (val) {
        this.getDictItem('wardItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    }
  },
  methods: {
    isChange (key) {
      let vm = this
      if (!vm.thongTinChung || (Object.keys(vm.thongTinChung).length === 0 && vm.thongTinChung.constructor === Object)) {
        // console.log('not THONG TIN CHUNG ')
        return false
      }
      if (!vm.thongTinChungPrev || (Object.keys(vm.thongTinChungPrev).length === 0 && vm.thongTinChungPrev.constructor === Object)) {
        // console.log('not THONG TIN CHUNG PREV')
        return false
      }
      if (vm.thongTinChung[key] !== vm.thongTinChungPrev[key]) {
        return true
      }
      return false
    },
    changeTinhThanh () {
      console.log('watch val======111=====', this.thongTinDoanhNghiep['applicantCityCode'])
      this.getDictItem('districtItems', {parent: this.thongTinDoanhNghiep['applicantCityCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    changeQuanHuyen () {
      console.log('watch val======222222=====', this.thongTinDoanhNghiep['applicantDistrictCode'])
      this.getDictItem('wardItems', {parent: this.thongTinDoanhNghiep['applicantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    addContact () {
      this.dataNguoiDaiDienItems.push({})
    },
    deleteContact (item, index) {
      this.dataNguoiDaiDienItems.splice(index, 1)
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
    xacNhanTaiFileGCNDangKy () {
      let vm = this
      if (!vm.thongTinDoanhNghiep['applicantIdentityFileName']) {
        toastr.error('Bạn phải nhập tên file!')
        vm.$refs.formDoanhNghiep.validate()
        return
      }
      let inputFile = $('#fileGCN')[0]
      vm.$store.dispatch('uploadFileFormDN', {
        inputFile: inputFile
      }).then(result => {
        toastr.success('Tải lên thành công!')
        vm.thongTinDoanhNghiep['applicantIdentityFileEntryId'] = result['fileId'] || 0
      }).catch(xhr => {
        toastr.error('Tải lên thất bại, vui lòng thử lại!')
      })
    },
    xacNhanTaiFileĐuieuKien () {
      let vm = this
      if (!vm.thongTinDoanhNghiep['applicantXcgFileName']) {
        toastr.error('Bạn phải nhập tên file!')
        vm.$refs.formDoanhNghiep.validate()
        return
      }
      let inputFile = $('#fileDieuKien')[0]
      vm.$store.dispatch('uploadFileFormDN', {
        inputFile: inputFile
      }).then(result => {
        toastr.success('Tải lên thành công!')
        vm.thongTinDoanhNghiep['applicantXcgFileEntryId'] = result['fileId'] || 0
      }).catch(xhr => {
        toastr.error('Tải lên thất bại, vui lòng thử lại!')
      })
    },
    formatDate (date) {
      console.log('date==========', date)
      if (!date) return null
        const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
        const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    mapThongTinChungToForm () {
      let vm = this
      return new Promise((resolve, reject) => {
        vm.$store.dispatch('loadInitResource').then(function (result) {
          vm.loading = false
          if (!vm.id || vm.id === '0') {
            vm.thongTinDoanhNghiep = Object.assign(vm.thongTinDoanhNghiep, {
              applicantName: result.applicant['applicantName'],
              applicantIdType: result.applicant['applicantIdType'],
              applicantIdNo: result.applicant['applicantIdNo'],
              applicantIdDate: result.applicant['applicantIdDate'],
              address: result.applicant['address'],
              applicantCityCode: result.applicant['cityCode'],
              applicantDistrictCode: result.applicant['districtCode'],
              applicantWardCode: result.applicant['wardCode'],
              contactName: result.applicant['contactName'],
              contactTelNo: result.applicant['contactTelNo'],
              contactEmail: result.applicant['contactEmail'],
              govAgencyCode: result.applicant['govAgencyCode'],
              representativeEnterprise: result.applicant['representativeEnterprise']
            })
          }
          resolve(vm.thongTinDoanhNghiep)
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
