<template>
  <div style="width: 100%;">
    <v-layout row wrap class="ml-0" style="background-color: #fff;">
      <v-flex xs12 sm12 class="pb-2">
        <div class="row-header">
          <div class="background-triangle-big" v-if="cssxModel.dictItemId"> Sửa đổi cơ sở sản xuất nước ngoài</div>
          <div class="background-triangle-big" v-else> Thêm mới cơ sở sản xuất nước ngoài</div>
          <div class="layout row wrap header_tools row-blue">
            <div class="flex xs12 text-right" style="margin-left: auto;">

              <v-btn flat v-if="code === STATE_SUA_THONG_TIN_TK" class="mr-3 ml-0 my-0 py-0 btn-border-left" color="grey darken-1" v-on:click.native="saveCoSoNuocNgoai()">
                <v-icon class="mr-2">save</v-icon>
                Lưu lại
              </v-btn>

              <v-btn flat class="mr-3 ml-0 my-0 py-0 btn-border-left" color="grey darken-1" v-on:click.native="quayLai()">
                <v-icon class="mr-2">undo</v-icon>
                Quay lại
              </v-btn>

            </div>
          </div>

        </div>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-right">
        <v-subheader><label class="mr-3 my-0">Mã CSSX/Nhà Xưởng</label></v-subheader>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
        :disabled="cssxModel.dictItemId"
        v-model="cssxModel.itemCode"
        placeholder="Nhập mã CSSX/Nhà xưởng"
        clearable
        outline
        class="py-0"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-right">
        <v-subheader><label class="mr-3 my-0"> Tên CSSX/Nhà Xưởng</label></v-subheader>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
        v-model="cssxModel.itemName"
        placeholder="Nhập tên CSSX/Nhà xưởng"
        clearable
        outline
        class="py-0 pr-3"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-right">
        <v-subheader><label class="mr-3 my-0">Loại hình</label></v-subheader>
      </v-flex>
      <v-flex xs12 sm10>
        <v-select
          :items="loaiHinhCSSXItems"
          v-model="loaiHinhCSSX"
          item-text="groupName"
          item-value="groupCode"
          clearable
          outline
          class="py-0 pr-3"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-right" v-if="loaiHinhCSSX === 'NHAXUONG'">
        <v-subheader><label class="mr-3 my-0">CSSX cha</label></v-subheader>
      </v-flex>
      <v-flex xs12 sm10 v-if="loaiHinhCSSX === 'NHAXUONG'">
        <v-select
          :items="cssxChaItems"
          v-model="cssxModel.parentItemCode"
          item-text="itemName"
          item-value="itemCode"
          outline
          clearable
          class="py-0 pr-3"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-right">
        <v-subheader><label class="mr-3 my-0">Địa chỉ CSSX/Nhà Xưởng</label></v-subheader>
      </v-flex>
      <v-flex xs12 sm10>
        <v-text-field
        multi-line
        v-model="cssxModel.itemDescription"
        placeholder="Nhập mã CSSX/Nhà xưởng"
        clearable
        outline
        class="py-0 pr-3"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12>
        <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style">
      <v-expansion-panel-content class="expansion-header-registration" v-bind:value="true">
      
        <div slot="header" class="text-bold primary--text">Doanh nghiệp nhập khẩu (trong nước) có liên kết</div>
        <v-layout row wrap class="ml-0">
          <v-flex xs12 sm12>
            <content-placeholders v-if="loading">
              <content-placeholders-img />
              <content-placeholders-heading />
            </content-placeholders>
          </v-flex>
          <v-flex xs12 sm12 v-if="!loadingDoanhNghiepTT_NN">
            <v-data-table 
              :headers="headersDoanhNghiepTT_NN"
              :items="itemsDoanhNghiepTT_NN"
              no-data-text="Không có dữ liệu"
              hide-actions
              class="table-bordered danhSachHoSoTable__class"
              loading="true"
              hide-actions
            >
              <template slot="headers" slot-scope="props">
                <tr>
                  <th v-for="header in props.headers" :key="header.text"
                  :class="['column text-xs-center']" v-html="header.text"
                  >
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <td class="text-xs-center" style="padding: 8px; width: 3%;">
                  {{ props.index + 1 }}
                </td>
                <td style="padding: 8px; width: 33%;" class="text-xs-left">
                  {{ props.item.applicantName }}  <br/>
                  {{ props.item.address }}
                </td>
                <td style="padding: 8px;" class="text-xs-left">
                  {{ props.item.applicantIdNo }} <br/>
                  {{ props.item.contactTelNo }} <br/>
                  {{ props.item.contactEmail }} 
                </td>
                <td style="padding: 8px;" class="text-xs-left">{{ props.item.contactName }}</td>
                <td style="padding: 8px;" class="text-xs-left">
                  {{ props.item['loaiHinh'] }} 
                </td>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12 sm12 class="text-xs-center" v-else>
            <v-progress-circular indeterminate v-bind:size="70" v-bind:width="2" color="purple"></v-progress-circular>
          </v-flex>
        </v-layout>

      </v-expansion-panel-content>
      </v-expansion-panel>
      </v-flex>
      <!-- <v-flex xs12 sm12 class="pb-2">
        <v-btn color="primary" small v-if="code === STATE_SUA_THONG_TIN_TK || code === STATE_CAP_NHAT_TINH_TRANG" @click="saveCoSoNuocNgoai()">Lưu lại</v-btn>
        <v-btn color="primary" small @click="backCSSXNuocNgoai()">Quay lại</v-btn>
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
// import axios from 'axios'
// import router from '@/router'
const COMPONENT_NAME = 'jx-hanghai-filter-left'
const STATE_XEM_TK = 'xem-tai-khoan'
const STATE_SUA_THONG_TIN_TK = 'sua-tai-khoan'
const STATE_PHE_DUYET_TK = 'phe-duyet-tai-khoan'
const STATE_CAP_NHAT_TINH_TRANG = 'cap-nhat-tinh-trang'
const STATE_MO_TK = 'mo-khoa-tai-khoan'
const STATE_KHOA_TK = 'khoa-tai-khoan'
export default {
  name: COMPONENT_NAME,
  props: {
    type: '',
    code: '',
    id: ''
  },
  components: {
  },
  computed: {
    cssxModel () {
      return this.$store.getters.cssxModel || {}
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
  data () {
    return {
      COMPONENT_NAME: COMPONENT_NAME,
      STATE_XEM_TK: STATE_XEM_TK,
      STATE_SUA_THONG_TIN_TK: STATE_SUA_THONG_TIN_TK,
      STATE_PHE_DUYET_TK: STATE_PHE_DUYET_TK,
      STATE_CAP_NHAT_TINH_TRANG: STATE_CAP_NHAT_TINH_TRANG,
      STATE_MO_TK: STATE_MO_TK,
      STATE_KHOA_TK: STATE_KHOA_TK,
      loaiHinhCSSXItems: [],
      cssxChaItems: [],
      loadingDoanhNghiepTT_NN: false,
      headersDoanhNghiepTT_NN: [
        {
          text: 'STT',
          align: 'left',
          sortable: false,
          value: 'stt'
        },
        {
          text: 'Tên, địa chỉ cơ sở sản xuất. Cơ sở nhập khẩu',
          align: 'left',
          sortable: true,
          value: 'address'
        },
        {
          text: 'Mã số thuế. điện thoại. fax. email',
          align: 'left',
          sortable: true,
          value: 'contactEmail'
        },
        {
          text: 'Người đại diện. chức danh',
          align: 'left',
          sortable: true,
          value: 'applicantName'
        },
        {
          text: 'Thông tin chung',
          align: 'left',
          sortable: true,
          value: 'thongtinchung'
        }
      ],
      itemsDoanhNghiepTT_NN: [],
      loaiHinhCSSX: ''
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
    if (!vm.cssxModel['dictItemId']) {
      vm.$router.push({
        path: '/thong-tin-doanh-nghiep-nuoc-ngoai/' + vm.type + '/' + vm.code
      })
      return
    }
    vm.$nextTick(function () {
      vm.loadSelectLoaiHinhCSSX()
      vm.loadDSHSDenHanXacNhan()
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.checkShowInfo()
      // let vm = this
      // let query = newRoute.query
    }
  },
  methods: {
    loadSelectLoaiHinhCSSX () {
      let vm = this
      vm.$store.dispatch('loadSelectLoaiHinhCSSX', {
        dictItemId: vm.id
      }).then(result => {
        vm.loaiHinhCSSX = result
      }).catch(xhr => {
        console.log('loadDSHSDenHanXacNhan+++++++++++', xhr)
      })
    },
    loadDSHSDenHanXacNhan () {
      let vm = this
      vm.$store.dispatch('loadDSHSDenHanXacNhan', {
        registrationId: vm.id
      }).then(result => {
        vm.itemsDoanhNghiepTT_NN = result
      }).catch(xhr => {
        console.log('loadDSHSDenHanXacNhan+++++++++++', xhr)
      })
    },
    fetchUsers (item) {
      console.log('item---------+++++++++++', item)
    },
    contextSelected (command) {
      console.log('node++++++++', command)
    },
    selected (node) {
      this.selectedNode = node
      console.log('node++++++++', this.selectedNode)
    },
    quayLai () {
      // window.history.back()
      this.$router.push({
        path: '/co-so-nuoc-ngoai/' + this.type + '/' + this.code
      })
    }
  },
  filters: {
    registrationState (data) {
      return ''
    },
    date (data) {
      return ''
    }
  }
}
</script>
