<template>

  <v-layout wrap>
    <div class="row-header" style="height: 38px;overflow: hidden; background: rgb(236, 233, 233);">
          <div class="background-triangle-big view_tp_pdf"> {{titleTable}} </div>
          <div class="layout row wrap header_tools row-blue">

            <div class="flex text-right" style="margin-left: auto;">
              <span class="font-regulal" style="font-weight: bold;color: #2372bb;">  </span>
              
              <v-btn
                v-if="type === STATE_TRONG_NUOC"
                flat
                small
                :disabled="loadingDetail"
                :loading="loadingBtn"
                class="ml-0 mr-3 my-0"
                style="text-transform: none; color: #007bff; font-weight: normal;"
                @click="showSearchAvd = !showSearchAvd"
                >
                <v-icon size="17">{{!showSearchAvd ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon><span slot="loader">Loading...</span>
                Lọc nâng cao
              </v-btn>

              <!-- <v-btn
                flat
                small
                :disabled="loadingDetail"
                :loading="loadingBtn"
                class="mx-0 my-0"
                style="text-transform: none; color: #007bff; font-weight: normal;"
                @click="quayLai()"
                >
                <span slot="loader">Loading...</span>
                <v-icon size="17">keyboard_backspace</v-icon>Quay lại
              </v-btn> -->

          </div>
        </div>
    </div>
    <v-flex xs12 sm12 class="pb-2" style="background: #ffff;">
      <v-btn small :color="stateFilter === 1 ? 'blue-grey lighten-4' : 'primary'" @click="filterADV({filterAll: '1', mtcore: 1})">Tất cả</v-btn>
      <!-- <v-btn small :color="stateFilter === 2 ? 'blue-grey lighten-4' : 'primary'" @click="filterADV({ttdnTinhTrang: 0})">TK khởi tạo/ chỉnh sửa</v-btn> -->
      <v-btn small :color="stateFilter === 3 ? 'blue-grey lighten-4' : 'primary'" @click="filterADV({applicantstatus: 1, mtcore: 1})">Chờ duyệt</v-btn>
      <v-btn small :color="stateFilter === 5 ? 'blue-grey lighten-4' : 'primary'" @click="filterADV({applicantstatus: 2, mtcore: 1})">Đã duyệt</v-btn>
    </v-flex>
    <jx-hanghai-filter-adv
      :type="type"
      :code="code"
      v-if="type === STATE_TRONG_NUOC && showSearchAvd"
      ref="filteradvF"
    ></jx-hanghai-filter-adv>
    <v-flex>
      <!-- <content-placeholders v-if="loading">
        <content-placeholders-img />
        <content-placeholders-heading />
      </content-placeholders> -->
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        ></v-progress-circular> <br>
        <span>Đang tải dữ liệu...</span>
      </div>
      <v-data-table
        v-else
        :headers="headersThongTinDoanhNghiep"
        :items="dataThongTinDoanhNghiepItems"
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
          <tr v-if="type === STATE_TRONG_NUOC">
            <td class="text-xs-center" style="width: 5%;">
              {{ pageThongTinDoanhNghiep * 15 - 15 + props.index + 1 }}
            </td>
            <td class="text-xs-center">
              <span>{{ props.item.applicantCode }}</span>
            </td>
            <td class="text-xs-center">
              <span @click.prevent.stop="toDetailHoSoDoanhNghiep(props.item)" style="cursor: pointer;">{{ props.item.applicantName }}</span>  <br/>
              <span @click.prevent.stop="toDetailHoSoDoanhNghiep(props.item)" style="cursor: pointer;">{{ props.item.applicantAddress }}</span>
            </td>
            <td class="text-xs-center">
              <span>{{ props.item.applicantPhone }}</span> <br/>
              <span>{{ props.item.applicantEmail }}</span>
            </td>
            <td class="text-xs-center">
              <span>{{ props.item.applicantContactName }}</span> <br>
              <span>{{ props.item.applicantRepresentativeTitle }}</span>
            </td>
            <td class="text-xs-center">
              <span>{{ props.item['registrationClass'] }}</span>
            </td>
            <td class="text-xs-center">
              <span>{{ props.item['applicantNote'] }}</span>
            </td>
            <td class="text-xs-center" v-if="showLyDo">
              <!-- <span>{{ props.item['registrationRemarks'] }}</span> -->
              <!-- <span v-if="code === STATE_XEM_TK" style="color: blue; cursor: pointer;" @click="anhXaThongTinDoanhNghiep(props.item)">Ánh xạ</span>
              <span v-if="code === STATE_SUA_THONG_TIN_TK" style="color: blue; cursor: pointer;" @click="doiThongTinTaiKhoan(props.item)">Đổi mật khẩu, email</span>
              <span v-if="code === STATE_KHOA_TK" style="color: blue; cursor: pointer;" @click="moKhoaThongTinDoanhNghiep(props.item)">Khóa</span>
              <span v-if="code === STATE_MO_TK" style="color: blue; cursor: pointer;" @click="moKhoaThongTinDoanhNghiep(props.item)">Mở khóa</span> -->
            </td>
            <!-- <td class="text-xs-center">
            </td> -->
          </tr>
          <tr v-else>
            <td class="text-xs-center" style="width: 5%;">
              {{ pageThongTinDoanhNghiep * 15 - 15 + props.index + 1 }}
            </td>
            <td class="text-xs-center">
              {{props.item.itemCode}}
            </td>
            <td class="text-xs-center">
              {{props.item.itemName}}
            </td>
            <td class="text-xs-center">
              {{props.item.itemDescription}}
            </td>
            <td class="text-xs-center" style="width: 10%;">
              <a @click="toDetailCoSoNuocNgoai(props.item)" style="color: blue;" v-if="code === STATE_XEM_TK" href="javascript:;" class="pr-2">Xem</a>
              <a @click="toDetailCoSoNuocNgoai(props.item)" style="color: blue;" v-if="code === STATE_SUA_THONG_TIN_TK" href="javascript:;" class="pr-2">Sửa</a>
              <a @click="deleteCoSoNuocNgoai(props.item.itemCode)" style="color: blue;" v-if="code === STATE_SUA_THONG_TIN_TK" href="javascript:;" class="">Xóa</a>
              <!-- <v-icon v-if="code === STATE_SUA_THONG_TIN_TK" class="mr-2" style="cursor: pointer; font-size: 16px;" @click="toDetailCoSoNuocNgoai(props.item)">edit</v-icon>
              <v-icon  style="cursor: pointer; font-size: 16px;" @click="deleteCoSoNuocNgoai(props.item.itemCode)">delete</v-icon> -->
            </td>
          </tr>
        </template>

      </v-data-table>
      <div v-if="type === STATE_NGOAI_NUOC" class="text-xs-right layout wrap" style="position: relative;">
        <div class="flex pagging-table px-2"> 
          <tiny-pagination :total="dataThongTinDoanhNghiepTotal" :page="pageThongTinDoanhNghiep" custom-class="custom-tiny-class" 
            @tiny:change-page="paggingThongTinDoanhNghiep" ></tiny-pagination> 
        </div>
      </div>
    </v-flex>
    
    <v-dialog v-model="popUpDoiThongTinDoanhNghiep" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="primary" height="43">
          <div class="text-bold">Đổi mật khẩu, thư điện tử</div>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click.native="popUpDoiThongTinDoanhNghiep = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pb-0">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <label>Nhập mật khẩu mới</label>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                :append-icon="stateChangePassCitizen ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (stateChangePassCitizen = !stateChangePassCitizen)"
                :type="stateChangePassCitizen ? 'password' : 'text'"
                name="passNewCitizen"
                id="passNewCitizen"
                value="a@12345"
                v-model="ttdnDetail['passNewCitizen']"
                class="input-group--focused pt-0"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-checkbox
                class="mt-0"
                label="Đồng ý đổi mật khẩu"
                v-model="checkboxDoiMatKhau"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12>
                <label>Nhập email mới</label>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                class="pt-0"
                v-model="ttdnDetail['emailNewCitizen']"
                :rules="[rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-checkbox
                class="mt-0"
                label="Đồng ý đổi thư điện tử"
                v-model="checkboxDoiEmail"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 class="text-xs-right">
                <v-btn small color="primary" @click="changeThongTinTaiDoanhNghiep()">Lưu lại</v-btn>
                <v-btn small @click="popUpDoiThongTinDoanhNghiep = !popUpDoiThongTinDoanhNghiep">Thoát</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
import supportData from '../store/support_data.json'
import FilterAdv from './dklr/hanghai_filter_adv.vue'
import TinyPagination from './dklr/hanghai_pagination.vue'
// import $ from 'jquery'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}

export default {
  props: ['type', 'code'],
  components: {
    'tiny-pagination': TinyPagination,
    'jx-hanghai-filter-adv': FilterAdv
  },
  computed: {
    colorFilterBtn () {

    },
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
  data: () => ({
    stateFilter: '',
    rules: {
      required: (value) => !!value || 'Trường yêu cầu bắt buộc.',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email không hợp lệ.'
      }
    },
    checkboxDoiEmail: true,
    checkboxDoiMatKhau: true,
    ttdnDetail: {
      passNewCitizen: '',
      emailNewCitizen: '',
      userId: 0
    },
    showSearchAvd: false,
    showLyDo: false,
    stateChangePassCitizen: false,
    popUpDoiThongTinDoanhNghiep: false,
    STATE_TRONG_NUOC: 'trong-nuoc',
    STATE_NGOAI_NUOC: 'ngoai-nuoc',
    STATE_XEM_TK: 'xem-tai-khoan',
    STATE_SUA_THONG_TIN_TK: 'sua-tai-khoan',
    STATE_PHE_DUYET_TK: 'phe-duyet-tai-khoan',
    STATE_CAP_NHAT_TINH_TRANG: 'cap-nhat-tinh-trang',
    STATE_MO_TK: 'mo-khoa-tai-khoan',
    STATE_KHOA_TK: 'khoa-tai-khoan',
    loadingDetail: false,
    loadingBtn: false,
    titleTable: '',
    total: 100,
    STATE_FILTER_TAT_CA: 1,
    STATE_FILTER_KHOI_TAO_CHINH_SUA: 2,
    STATE_FILTER_CHO_DUYET: 3,
    STATE_FILTER_YEU_CAU_BO_SUNG: 4,
    STATE_FILTER_DA_DUYET: 5,
    STATE_FILTER_DANG_KHOA: 6,
    countItemSelect: 30,
    countItemRest: 70,
    loading: false,
    supportData: supportData,
    loadHomeDataTable: {},
    headers: [],
    payment: false,
    dataThongTinDoanhNghiepItems: [
    ],
    filterState: {},
    dataThongTinDoanhNghiepTotal: 0,
    pageThongTinDoanhNghiep: 1,
    headersThongTinDoanhNghiep: [],
    paymentTypeData: {},
    paymentMarkDelete: {},
    loaiHinhCSSXItems: [],
    cssxChaItems: []
  }),
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      if (vm.type === vm.STATE_TRONG_NUOC) {
        vm.headersThongTinDoanhNghiep = vm.supportData.headersThongTinDoanhNghiep_TrongNuoc
      } else {
        vm.headersThongTinDoanhNghiep = vm.supportData.headersThongTinDoanhNghiep_NgoaiNuoc
      }
    })
  },
  created () {
    var vm = this
    vm.changeHeader()
    vm.loadLoaiHinhCSSX()
    vm.loadCSSXCha()
    vm.$nextTick(function () {
      let query = vm.$router.history.current.query
      if (query && query.hasOwnProperty('page') && query['page'] !== 1) {
        vm.pageThongTinDoanhNghiep = parseInt(query['page']) || 1
      } else {
        vm.pageThongTinDoanhNghiep = 1
      }
      if (query.hasOwnProperty('applicantStatus') && query['applicantStatus']) {
        vm.filterState['applicantStatus'] = query['applicantStatus']
      }
      vm.checkChangeHeader()
      console.log('vm.filterState+++++++', vm.filterState)
      let param = null
      param = {
        start: vm.pageThongTinDoanhNghiep * 15 - 15,
        end: vm.pageThongTinDoanhNghiep * 15
      }
      if (query) {
        for (var key in query) {
          if (key !== 'page') {
            param[key] = query[key]
          }
        }
      }
      let action = ''
      if (vm.type === vm.STATE_TRONG_NUOC) {
        action = 'loadDanhSachDoanhNghiepTrongNuoc'
        param['applicantstatus'] = '1,2,3'
      } else {
        action = 'loadDanhSachDoanhNghiepNgoaiNuoc'
      }
      if (vm.type === vm.STATE_TRONG_NUOC) {
        param['start'] = -1
        param['end'] = -1
      }
      // vm.setStateFilter(param)
      vm.loading = true
      vm.$store.dispatch(action, param).then(function (result) {
        vm.loading = false
        vm.dataThongTinDoanhNghiepItems = result['data'] || []
        vm.dataThongTinDoanhNghiepTotal = result['total'] || 0
      }).catch(xhr => {
        vm.loading = false
        vm.dataThongTinDoanhNghiepItems = []
        vm.dataThongTinDoanhNghiepTotal = 0
      })
    })
  },
  watch: {
    'filterState': {
      deep: true,
      handler (val) {
        let vm = this
        vm.checkChangeHeader()
      }
    },
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let query = newRoute.query
      vm.changeHeader()
      if (query && query.hasOwnProperty('page') && query['page']) {
        vm.pageThongTinDoanhNghiep = parseInt(query['page']) || 1
      } else {
        vm.pageThongTinDoanhNghiep = 1
      }
      if (query.hasOwnProperty('applicantStatus') && query['applicantStatus']) {
        vm.filterState['applicantStatus'] = query['applicantStatus']
      }
      vm.checkChangeHeader()
      let param = null
      param = {
        start: vm.pageThongTinDoanhNghiep * 15 - 15,
        end: vm.pageThongTinDoanhNghiep * 15
      }
      for (var key in query) {
        if (key !== 'page') {
          param[key] = query[key]
        }
      }
      vm.loading = true
      console.log('param++++++table+++++++', param)
      let action = ''
      if (vm.type === vm.STATE_TRONG_NUOC) {
        action = 'loadDanhSachDoanhNghiepTrongNuoc'
      } else {
        action = 'loadDanhSachDoanhNghiepNgoaiNuoc'
      }
      if (vm.type === vm.STATE_TRONG_NUOC) {
        param['start'] = -1
        param['end'] = -1
      }
      vm.$store.dispatch(action, param).then(function (result) {
        vm.dataThongTinDoanhNghiepItems = result['data'] || []
        vm.dataThongTinDoanhNghiepTotal = result['total'] || 0
        vm.loading = false
      }).catch(xhr => {
        vm.loading = false
        vm.dataThongTinDoanhNghiepItems = []
        vm.dataThongTinDoanhNghiepTotal = 0
      })
    }
  },
  methods: {
    xemHoSo (item) {
      // let vm = this
    },
    xemGiayChungNhan (item) {
      // let vm = this
    },
    xemBienBan (item) {
      // let vm = this
    },
    loadLoaiHinhCSSX: function () {
      let vm = this
      vm.$store.dispatch('loadLoaiHinhCSSX', {}).then(result => {
        vm.loaiHinhCSSXItems = result
      }).catch(xhr => {
      })
    },
    loadCSSXCha: function () {
      let vm = this
      vm.$store.dispatch('loadCSSXCha', {}).then(result => {
        vm.cssxChaItems = result
      }).catch(xhr => {
      })
    },
    toDetailCoSoNuocNgoai: function (item) {
      var vm = this
      vm.detailPage = true
      vm.$store.commit('setCssxModel', item)
      let query = {}
      if (item.parentItemId) {
        var parentItem = vm.cssxChaItems.find(function (cssxCha) {
          return cssxCha.dictItemId === item.parentItemId
        })
        if (parentItem) {
          query['parentItemCode'] = parentItem.itemCode
        }
      }
      vm.$router.push({
        path: '/co-so-nuoc-ngoai/' + vm.type + '/' + vm.code + '/' + item.dictItemId,
        query: {
          parentItemCode: query['parentItemCode']
        }
      })
      // vm.loadDoanhNghiepTT_NN(item.dictItemId)
      // vm.loadSelectLoaiHinhCSSX(item.dictItemId)
      // vm.onScrollTop()
    },
    changeHeader: function () {
      let vm = this
      if (vm.type === 'trong-nuoc') {
        if (!vm.code) {
          vm.titleTable = 'Doanh nghiệp trong nước'
        } else if (vm.code === 'xem-tai-khoan') {
          vm.titleTable = 'Xem tài khoản'
        } else if (vm.code === 'sua-tai-khoan') {
          vm.titleTable = 'Sửa tài khoản'
        } else if (vm.code === 'phe-duyet-tai-khoan') {
          vm.titleTable = 'Phê duyệt tài khoản'
        } else if (vm.code === 'khoa-tai-khoan') {
          vm.titleTable = 'Khóa tài khoản'
        } else if (vm.code === 'mo-khoa-tai-khoan') {
          vm.titleTable = 'Mở khóa tài khoản'
        } else if (vm.code === 'cap-nhat-tinh-trang') {
          vm.titleTable = 'Cập nhật tình trạng'
        }
      } else {
        vm.titleTable = 'Doanh nghiệp nước ngoài'
      }
    },
    moKhoaThongTinDoanhNghiep: function (item) {
      let vm = this
      vm.$store.dispatch('moKhoaThongTinDoanhNghiep', item).then(result => {
        item['lock'] = !item['lock']
        toastr.success('Thực hiện thành công!')
      }).catch(xhr => {
        toastr.error('Thực hiện thất bại, vui lòng thử lại!')
      })
    },
    checkChangeHeader: function () {
      let vm = this
      if (vm.type === vm.STATE_TRONG_NUOC && (vm.filterState['applicantStatus'] === 3 || vm.filterState['applicantStatus'] === '3' || vm.filterState['applicantStatus'] === 0 || vm.filterState['applicantStatus'] === '0')) {
        vm.showLyDo = true
        vm.headersThongTinDoanhNghiep = vm.supportData.headersThongTinDoanhNghiep_Khoa_TrongNuoc
      } else if (vm.type === vm.STATE_TRONG_NUOC) {
        vm.showLyDo = false
        vm.headersThongTinDoanhNghiep = vm.supportData.headersThongTinDoanhNghiep_TrongNuoc
      } else {
        vm.showLyDo = false
        vm.headersThongTinDoanhNghiep = vm.supportData.headersThongTinDoanhNghiep_NgoaiNuoc
      }
    },
    filterADV: function (param) {
      console.log('param++++++++', param)
      let vm = this
      vm.filterState = param
      if (!param) {
        param = {}
      }
      if (param && param.hasOwnProperty('filterAll') && param['filterAll']) {
        param = {}
        param['filterAll'] = true
      }
      console.log('vm.type++++++++++++++', vm.type)
      let type = vm.type || 'trong-nuoc'
      let code = vm.code || 'xem-tai-khoan'
      // vm.setStateFilter(param)
      vm.$router.push({
        path: '/thong-tin-doanh-nghiep/' + type + '/' + code,
        query: {
          ...param
        }
      })
    },
    toDetailHoSoDoanhNghiep: function (item) {
      let vm = this
      console.log('item+++++++++++', item)
      let code = vm.code || 'xem-tai-khoan'
      vm.$router.push({
        path: '/thong-tin-doanh-nghiep/' + vm.type + '/' + code + '/' + item['applicantCode'],
        query: {
          id: item['id']
        }
      })
    },
    deleteCoSoNuocNgoai: function (itemCode) {
      let vm = this
      let cf = confirm('Bạn có thực sự muốn xóa dữ liệu này!')
      if (cf) {
        vm.$store.dispatch('deleteCoSoNuocNgoai', {
          itemCode: itemCode
        }).then(result => {
          toastr.success('Xóa thành công!')
        }).catch(xhr => {
          toastr.error('Xóa thất bại, vui lòng thử lại!')
        })
      }
    },
    changeThongTinTaiDoanhNghiep: function () {
      var vm = this
      if (vm.checkboxDoiMatKhau && vm.ttdnDetail['passNewCitizen']) {
        vm.$store.dispatch('changePassApplicant', {
          applicantId: vm.ttdnDetail['applicantId'],
          passNewCitizen: vm.ttdnDetail['passNewCitizen']
        }).then(result => {
          toastr.success('Đổi mật khẩu thành công!')
        }).catch(xhr => {
          toastr.error('Đổi mật khẩu thất bại, vui lòng thử lại!')
        })
      }
      if (vm.checkboxDoiEmail && vm.ttdnDetail['emailNewCitizen']) {
        setTimeout(function () {
          vm.$store.dispatch('changeEmailApplicant', {
            applicantId: vm.ttdnDetail['applicantId'],
            emailNewCitizen: vm.ttdnDetail['emailNewCitizen']
          }).then(result => {
            toastr.success('Đổi email thành công!')
          }).catch(xhr => {
            toastr.error('Đổi email thất bại, vui lòng thử lại!')
          })
        }, 500)
      }
    },
    paggingThongTinDoanhNghiep (config) {
      let vm = this
      let current = vm.$router.history.current
      let newQuery = current.query
      let queryString = '?'
      newQuery['page'] = ''
      for (let key in newQuery) {
        if (newQuery[key] !== '' && newQuery[key] !== 'undefined' && newQuery[key] !== undefined) {
          queryString += key + '=' + newQuery[key] + '&'
        }
      }
      queryString += 'page=' + config.page
      vm.$router.push({
        path: current.path + queryString
      })
    },
    toDetail (index, item) {
      let status = item.requestState
      if (this.type === 'thu_tuc') {
        status = item.documentStatusCode
      }
      this.$router.push('/ho-so/' + this.type + '/' + item.documentName + '/' + item.documentYear + '/' + item.documentTypeCode + '/' + status)
    }
  },
  filters: {
    money (value) {
      if (value) {
        var moneyCur = (value / 1).toFixed(0).replace('.', ',')
        return moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ'
      } else {
        return ''
      }
    }
  }
}
</script>
