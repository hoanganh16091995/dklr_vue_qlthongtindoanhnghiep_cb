<!-- TODO detailTemplate page -->
<template>
  <div style="width: 100%;">
  <div class="row-header">
    <div class="background-triangle-big"> Thông tin doanh nghiệp - {{applicantProfileModel['applicantName']}}</div>
    <div class="layout row wrap header_tools row-blue">
      
      <div class="flex xs6 pl-4 pt-2" style="margin-left: auto;">
        <label class="bold" style="color: red;">{{applicantProfileModel['applicantStatus'] | filterStatus}}</label>
        <label class="bold">({{applicantProfileModel['modifyDate']}})</label>
      </div>

      <div class="flex xs6 text-right" style="margin-left: auto;">
    
        <v-btn flat class=" my-0 py-0 ml-0 mr-3 btn-border-left" color="grey darken-1" v-on:click.native="quayLai()">
          <v-icon class="mr-2">undo</v-icon>
          Quay lại
        </v-btn>

      </div>
  
    </div>
  </div>
  
  <v-expansion-panel expand class="my-0 opencps-dossier-info">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="true">
    
    <div slot="header" class="text-bold primary--text">I. Thông tin chung <i></i></div>
    <v-layout wrap class="px-4 pb-2 pt-2">
      <v-flex xs12 sm6>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader class="py-0">Tên tổ chức/ Doanh nghiệp (<span style="color: red;">*</span>): </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="applicantName">
            <span>
            
              <v-subheader>{{applicantProfileModel.applicantName}}</v-subheader>
              
            </span>
            <!-- <v-text-field v-else
            outline
            v-model="applicantProfileModel.applicantName"
            placeholder="tên tổ chức, doanh nghiệp ..."
            class="pt-0 mt--5"
            single-line
            :rules="[(v) => !!v || 'Tên tổ chức/ Doanh nghiệp bắt buộc phải nhập']"
            required
            ></v-text-field> -->
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Mã số thuế (<span style="color: red;">*</span>):</v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="applicantCode">
            <span>
            
              <v-subheader>{{applicantProfileModel['applicantCode']}}</v-subheader>
              
            </span>
            <!-- <v-text-field v-else
            outline
            v-model="applicantProfileModel['applicantCode']"
            placeholder="mã số thuế ..."
            class="pt-0 mt--5"
            single-line
            :rules="[(v) => !!v || 'Mã số thuế bắt buộc phải nhập']"
            required
            ></v-text-field> -->
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Ngày cấp:</v-subheader> 
          </v-flex>
          <v-flex xs12 sm7 jx-bind="applicantIdDate">
            <span>
            
              <v-subheader>{{applicantProfileModel.applicantIdDate | date}}</v-subheader>
              
            </span>
            <!-- <v-menu v-else
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    outline
                    class="pt-0 mt--5"
                    placeholder="ngày ... tháng ... năm"
                    v-model="applicantProfileModel.applicantIdDate"
                    append-icon="event"
                    readonly
                    @blur="applicantProfileModel.applicantIdDate = parseDate(dateFormatted)"
                  ></v-text-field>
                  <v-date-picker v-model="applicantProfileModel.applicantIdDate" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
                  </v-date-picker>
                </v-menu> -->

          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Người đại diện (<span style="color: red;">*</span>): </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="contactName">
            <span>
            
              <v-subheader>{{applicantProfileModel['applicantContactName']}}</v-subheader>
              
            </span>
            <!-- <v-text-field v-else
            outline
            v-model="applicantProfileModel['applicantContactName']"
            placeholder="tên người đại diện ..."
            class="pt-0 mt--5"
            single-line
            :rules="[(v) => !!v || 'Người đại diện bắt buộc phải nhập']"
            required
            ></v-text-field> -->
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Số điện thoại liên hệ: </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="applicantContactPhone">
            <v-subheader>{{applicantProfileModel['applicantContactPhone']}}</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Địa chỉ email liên hệ (<span style="color: red;">*</span>): </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="applicantContactEmail">
            <span>
            
              <v-subheader>{{applicantProfileModel['applicantContactEmail']}}</v-subheader>
              
            </span>
            <!-- <v-text-field v-else
            outline
            v-model="applicantProfileModel.applicantContactEmail"
            placeholder="địa chỉ email ..."
            class="pt-0 mt--5"
            single-line
            :rules="[(v) => !!v || 'Địa chỉ email bắt buộc phải nhập']"
            required
            ></v-text-field> -->
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Địa chỉ (<span style="color: red;">*</span>):</v-subheader> 
          </v-flex>
          <v-flex xs12 sm7 jx-bind="address">
            <!-- v-if="initData.user['id'] != applicantProfileModel.userId" -->
            <span>
            
              <v-subheader>{{applicantProfileModel['applicantAddress']}}</v-subheader>
              
            </span>
            <!-- <v-textarea
            v-else
            outline
            v-model="applicantProfileModel['applicantAddress']"
            placeholder="Địa chỉ ..."
            :rules="[(v) => !!v || 'Địa chỉ bắt buộc phải nhập']"
            required
            ></v-textarea> -->
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Tỉnh/ Thành Phố: </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="cityCode">
            <v-subheader>{{applicantProfileModel['applicantCity']}}</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Quận/ Huyện: </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="districtCode">
            <v-subheader>{{applicantProfileModel['applicantDistrictName']}}</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout wrap class="pb-2">
          <v-flex xs12 sm5 class="text-right text-bold pr-2">
            <v-subheader>Xã/ Phường: </v-subheader>
          </v-flex>
          <v-flex xs12 sm7 jx-bind="wardCode">
            <v-subheader>{{applicantProfileModel['applicantWardName']}}</v-subheader>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="false">
    
    <div slot="header" style="" class="text-bold primary--text">II. Thông tin doanh nghiệp và các xưởng lắp ráp (nếu có)</div>
    <v-expansion-panel class="my-0 expansion__list_style">
          
            <vuejx-thong-tin-all
              class="px-2"
              ref="thongTinAll"
              style="height: 600px; overflow: auto;"
              :applicantProfileId="applicantProfileModel['id']"
              :id="id"
            >
              
            </vuejx-thong-tin-all>

          <!-- <v-expansion-panel-content key="ttcdn">
            <div slot="header">1. Thông tin chung doanh nghiệp</div>
  
            <vuejx-thong-tin-doanh-nghiep
              class="px-2"
              ref="thongTinDoanhNghiep"
              :registrationId="id"
              :item="{}"
              :style="{'pointer-events': 'none', 'opacity': 0.6}"
              :applicantProfileId="id"
              :id="id"
              @thongTinDoanhNghiep="thongTinDoanhNghiep"
            >
              
            </vuejx-thong-tin-doanh-nghiep>
  
          </v-expansion-panel-content>

          <v-expansion-panel-content v-for="(item,i) in danhSachXuongItems" v-if="item" :key="'xuong' + i">
            <div slot="header">{{i + 2}}. Xưởng sản xuất {{i + 1}}</div>
  
            <vuejx-thong-tin-xuong
              class="px-2"
              ref="thongTinXuong"
              :registrationId="id"
              :referenceUid="0"
              :style="{'pointer-events': 'none', 'opacity': 0.6}"
              :item="item"
              :applicantProfileId="id"
              :id="item['id']"
            ></vuejx-thong-tin-xuong>
  
          </v-expansion-panel-content> -->
      </v-expansion-panel>

    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style" v-if="!stateRegisChoXN.includes(applicantProfileModel['applicantStatus'])">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="false">
    
    <div slot="header" class="text-bold primary--text">IV. Lịch sử đánh giá COP</div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12 v-if="!loadingLichSuDanhGiaCOP">
        <v-data-table 
          :headers="headersLichSuDanhGiaCOP"
          :items="itemsLichSuDanhGiaCOP"
          no-data-text="Không có dữ liệu"
          hide-actions
          class="table-bordered danhSachHoSoTable__class px-3 py-2"
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
            <td style="padding: 8px 0px 8px 0px; width: 3%; " class="text-xs-center">
              {{ props.index + 1 }}
            </td>
            <td style="padding: 8px;" class="text-xs-center">
              {{props.item['copReportNo']}}
            </td>
            <td style="padding: 8px; width: 30%;" class="text-xs-center">
              {{props.item['copReportDate']}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item['productionPlantName']}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item['expiredStatus']}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item['totalPointA'] || '0'}} (A) / {{props.item['totalPointB'] || '0'}} (B) / {{props.item['totalPointC'] || '0'}} (C)
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item.testingResult}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item.expiredDate}}
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

  <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style" v-if="!stateRegisChoXN.includes(applicantProfileModel['applicantStatus'])">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="false">
    
    <div slot="header" class="text-bold primary--text">V. Hồ sơ đến hạn xác nhận hiệu lực</div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12 v-if="!loadingHSDenHanXacNhan">
        <v-data-table 
          :headers="headersHSDenHanXacNhan"
          :items="itemsHSDenHanXacNhan"
          no-data-text="Không có dữ liệu"
          hide-actions
          class="table-bordered danhSachHoSoTable__class px-3 py-2"
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
            <td style="padding: 8px; padding-left: 0px; text-align: center;">
              {{ props.index + 1 }}
            </td>
            <td style="padding: 8px;" class="text-xs-left">
              {{ props.item.serviceName }} 
              <br>
              {{ props.item.applicantName }} 
            </td>
            <td style="padding: 8px;" class="text-xs-left">
              {{ props.item.dossierIdCTN }} 
              <br v-if="props.item.dossierNo">
              {{ props.item.dossierNo }} 
            </td>
            <td style="padding: 8px;" class="text-xs-left">
              {{ props.item.submitDate}}
              <br v-if="props.item.submitDate">
              {{ props.item.receiveDate}}
            </td>

            <td style="padding: 8px;" class="text-xs-center">

              <span v-if="props.item.certNo">{{ props.item.certNo }}</span>
              <span v-else>---</span> <br>
              <span v-if="props.item.certDate">{{ props.item.certDate }}</span>
              <span v-else>---</span>
            </td>

            <td style="padding: 8px;" class="text-xs-left" v-html="props.item.briefNote">
            </td>
            <td style="padding: 8px;" class="text-xs-left" v-html="props.item.applicantNote"></td>
          </template>
        </v-data-table>
        </v-flex>
      <v-flex xs12 sm12 class="text-xs-center" v-else>
          <v-progress-circular indeterminate v-bind:size="70" v-bind:width="2" color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>

    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style" v-if="!stateRegisChoXN.includes(applicantProfileModel['applicantStatus'])">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="false">
    
    <div slot="header" class="text-bold primary--text">VI. Sản phẩm dừng sản xuất</div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12 v-if="!loadingSpDungSanXuat">
        <v-data-table 
          :headers="headersSpDungSanXuat"
          :items="itemsSpDungSanXuat"
          no-data-text="Không có dữ liệu"
          hide-actions
          class="table-bordered danhSachHoSoTable__class px-3 py-2"
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
            <td style="padding: 8px 0px 8px 0px; width: 3%; " class="text-xs-center">
              <!-- {{ pageCoSoNuocNgoai * 15 - 15 + props.index + 1 }} -->
              {{ props.index + 1 }}
            </td>
            <td style="padding: 8px;" class="text-xs-center">
              {{props.item.itemCode}}
            </td>
            <td style="padding: 8px; width: 30%;" class="text-xs-center">
              {{props.item.itemName}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item.itemDescription}}
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

  <v-expansion-panel expand class="my-0 opencps-dossier-info opencps-dossier-part-style" v-if="!stateRegisChoXN.includes(applicantProfileModel['applicantStatus'])">
    <v-expansion-panel-content class="expansion-header-registration" v-bind:value="false">
    
    <div slot="header" class="text-bold primary--text">VII. Quản lý phương thức cấp phiếu xuất xưởng</div>
    <v-layout row wrap class="ml-0">
      <v-flex xs12 sm12 v-if="!loadingPtCapPhieuXX">
        <v-data-table 
          :headers="headersPtCapPhieuXX"
          :items="itemsPtCapPhieuXX"
          no-data-text="Không có dữ liệu"
          hide-actions
          class="table-bordered danhSachHoSoTable__class px-3 py-2"
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
            <td style="padding: 8px 0px 8px 0px; width: 3%; " class="text-xs-center">
              <!-- {{ pageCoSoNuocNgoai * 15 - 15 + props.index + 1 }} -->
              {{ props.index + 1 }}
            </td>
            <td style="padding: 8px;" class="text-xs-center">
              {{props.item.itemCode}}
            </td>
            <td style="padding: 8px; width: 30%;" class="text-xs-center">
              {{props.item.itemName}}
            </td>
            <td style="padding: 8px; width: 40%;" class="text-xs-center">
              {{props.item.itemDescription}}
            </td>
          </template>
        </v-data-table>
        <div class="pl-5 pt-1 pb-2">
          <span style="font-weight: bold;">Ghi chú :</span>
          <p class="pl-4">
            -  5. Sản lượng (số phiếu đã lấy trong 1 năm, hoặc trong vòng n tháng gần nhất, hoặc từ ngày đến ngày). <br>
            -  6. Sản lượng trung bình/ tháng trong 1 năm hoặc 6 tháng gần nhất (chỉ tính những tháng phát sinh). <br>
            -  7. Sản lượng trung bình/ tháng, không tính những tháng đột biến (> 20%, 30%). <br>
            -  8. Tính thời gian COP gần nhất. <br>
            -  9. Ngày kiểm tra đột xuất gần nhất, ngày giám sát gần nhất. <br>
            -  10. Số lần kiểm tra đột xuất không đạt trong vòng 6 tháng hoặc 1 năm gần nhất. <br>
            -  11. Số lần kiểm tra đột xuất, giám sát trong tháng hiện tại. <br>
            -  12. Số lần lấy phiếu trong tháng hiện tại. <br>
            -  13. Ngày đầu tiên trong 1 chu kỳ so với ngày hiện tại. <br>
            -  14. Số lần kiểm tra trong 1 chu kỳ (đếm lùi từ 1 ngày thuộc tham số đầu vào). <br>

          </p>
        </div>
        </v-flex>
      <v-flex xs12 sm12 class="text-xs-center" v-else>
          <v-progress-circular indeterminate v-bind:size="70" v-bind:width="2" color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>

    </v-expansion-panel-content>
  </v-expansion-panel>
  

  <v-flex xs12 sm12 class="px-2 pt-1">
    <v-btn color="primary" class="ml-0 mr-0" v-on:click.native="saveThongTinChung(2)" v-if="(applicantProfileModel['applicantStatus'] !== 2 )&& stateButtonregistration">
      <v-icon class="mr-2">done</v-icon>
      Phê duyệt
    </v-btn>
    <v-btn color="primary" class="ml-0 mr-0" v-on:click.native="stateLyDoChinhSua = !stateLyDoChinhSua" v-if="(applicantProfileModel['applicantStatus'] !== 3 && applicantProfileModel['applicantStatus'] !== 2) && stateButtonregistration" >
      <v-icon class="mr-2">undo</v-icon>
      Yêu cầu chỉnh sửa đăng kí
    </v-btn>

    <v-text-field
    v-model="lyDoSuaDangKy"
    v-if="stateLyDoChinhSua && stateButtonregistration"
    label="Lý do"
    class="pb-2"
    multi-line
    ></v-text-field>
    <v-btn class="ml-0" v-if="stateLyDoChinhSua && stateButtonregistration" color="primary" small @click="saveThongTinChung(3)">Xác nhận</v-btn>
  </v-flex>
</div>
</template>

<script>
// import axios from 'axios'
// import router from '@/router'
import moment from 'moment'
const COMPONENT_NAME = 'jx-hanghai-filter-left'
import toastr from 'toastr'
// import ThongTinXuong from '@/components/dklr/ThongTinXuong.vue'
// import ThongTinDoanhNghiepForm from '@/components/dklr/ThongTinDoanhNghiepForm.vue'
import ThongTinAll from '@/components/dklr/thong_tin_all.vue'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}
export default {
  name: COMPONENT_NAME,
  props: {
    type: '',
    code: '',
    id: ''
  },
  components: {
    // 'vuejx-thong-tin-xuong': ThongTinXuong,
    // 'vuejx-thong-tin-doanh-nghiep': ThongTinDoanhNghiepForm,
    'vuejx-thong-tin-all': ThongTinAll
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
      expansionI: true,
      expansionII: true,
      expansionIII: true,
      expansionIV: true,
      expansionV: true,
      expansionVI: true,
      expansionVII: true,
      dateFormatted: '',
      COMPONENT_NAME: COMPONENT_NAME,
      // STATE_XEM_TK: 'xem-tai-khoan',
      // STATE_SUA_THONG_TIN_TK: 'sua-tai-khoan',
      // STATE_PHE_DUYET_TK: 'phe-duyet-tai-khoan',
      // STATE_CAP_NHAT_TINH_TRANG: 'cap-nhat-tinh-trang',
      // STATE_MO_TK: 'mo-khoa-tai-khoan',
      // STATE_KHOA_TK: 'khoa-tai-khoan',
      stateRegisChoXN: [3],
      loadingCoSoNuocNgoai_Regis: false,
      itemsCoSoNuocNgoai_Regis: [],
      loadingLichSuDanhGiaCOP: false,
      danhSachXuongItems: [],
      applicantProfileModel: {},
      headersLichSuDanhGiaCOP: [
        {
          text: 'STT',
          align: 'left',
          sortable: false,
          value: 'stt'
        },
        {
          text: 'Số báo cáo đánh giá COP',
          align: 'left',
          sortable: false,
          value: 'sobaocaoCOP'
        },
        {
          text: 'Ngày đánh giá',
          align: 'left',
          sortable: false,
          value: 'ngaydanhgia'
        },
        {
          text: 'Nhà xưởng/ địa chỉ',
          align: 'left',
          sortable: false,
          value: 'nhãuongdiachi'
        },
        {
          text: 'Còn hạn/ hết hạn',
          align: 'left',
          sortable: false,
          value: 'conhanhethan'
        },
        {
          text: 'Tổng điểm',
          align: 'left',
          sortable: false,
          value: 'tongdiem'
        },
        {
          text: 'Kết quả',
          align: 'left',
          sortable: false,
          value: 'ketqua'
        },
        {
          text: 'Ngày đánh giá kế tiếp',
          align: 'left',
          sortable: false,
          value: 'ngaydanhgiaketiep'
        }
      ],
      itemsLichSuDanhGiaCOP: [],
      loadingHSDenHanXacNhan: false,
      headersHSDenHanXacNhan: [
        {
          text: 'STT',
          align: 'center',
          sortable: false,
          value: 'stt'
        },
        {
          text: 'Tên thủ tục <br> Tên doanh nghiệp',
          align: 'left',
          sortable: false,
          value: 'applicantName'
        },
        {
          text: 'Mã hồ sơ <br> Số hồ sơ',
          align: 'left',
          sortable: false,
          value: 'dossierId'
        },
        {
          text: 'Ngày gửi <br> Ngày tiếp nhận',
          align: 'left',
          sortable: false,
          value: 'submitDate'
        },
        {
          text: 'Số chứng chỉ <br> Ngày cấp',
          align: 'center',
          sortable: false,
          value: 'action'
        },
        {
          text: 'Nội dung',
          align: 'left',
          sortable: false,
          value: 'action'
        },
        {
          text: 'Ghi chú',
          align: 'left',
          sortable: false,
          value: 'lastActionNote'
        }
      ],
      itemsHSDenHanXacNhan: [],
      loadingSpDungSanXuat: false,
      headersSpDungSanXuat: [
        {
          text: 'STT',
          align: 'left',
          sortable: false,
          value: 'stt'
        },
        {
          text: 'Nhóm sản phẩm',
          align: 'left',
          sortable: false,
          value: 'nhomsanpham'
        },
        {
          text: 'Loại sản phẩm',
          align: 'left',
          sortable: false,
          value: 'loaisanpham'
        },
        {
          text: 'Nhãn hiệu',
          align: 'left',
          sortable: false,
          value: 'nhanhieu'
        },
        {
          text: 'Tên thương mại',
          align: 'left',
          sortable: false,
          value: 'tenthuongmai'
        },
        {
          text: 'Mã kiểu loại',
          align: 'left',
          sortable: false,
          value: 'makieuloai'
        }
      ],
      itemsSpDungSanXuat: [],
      loadingPtCapPhieuXX: false,
      headersPtCapPhieuXX: [
        {
          text: 'STT',
          align: 'left',
          sortable: false,
          value: 'stt'
        },
        {
          text: 'Thủ tục',
          align: 'left',
          sortable: false,
          value: 'thutuc'
        },
        {
          text: 'Phương thức cấp',
          align: 'left',
          sortable: false,
          value: 'phuongthuccap'
        },
        {
          text: 'Tần suất kiểm tra trong 1 chu kỳ <br> (90 ngày)',
          align: 'left',
          sortable: false,
          value: 'tanxuatkiemtra'
        },
        {
          text: 'Điểm cấp phát <br> (Luồng xanh, đỏ, vàng)',
          align: 'left',
          sortable: false,
          value: 'diemcapphat'
        },
        {
          text: 'Ghi chú (5)...(14)',
          align: 'left',
          sortable: false,
          value: 'ghichu'
        }
      ],
      itemsPtCapPhieuXX: [],
      stateButtonregistration: true,
      stateLyDoChinhSua: false,
      headersCoSoNuocNgoai_Regis: [
        {
          text: 'STT',
          align: 'center',
          sortable: false,
          value: 'stt'
        },
        {
          text: ' Mã CSSX/Nhà Xưởng',
          align: 'center',
          sortable: false,
          value: 'macssx'
        },
        {
          text: 'Tên CSSX/Nhà Xưởng',
          align: 'center',
          sortable: false,
          value: 'tencssx'
        },
        {
          text: 'Địa chỉ CSSX/Nhà Xưởng',
          align: 'center',
          sortable: false,
          value: 'diachicssx'
        }
      ],
      // showThongTinChung: false,
      // showThongTinDoanhNghiep: false,
      // showCoSoSanXuatLapRap: false,
      // showDanhGiaCop: false,
      // showHoSoDenHanXN: false,
      // showSanPhamDungSanXuat: false,
      // showQuanLyPhieuXuatXuong: false,
      productPlantItems: [],
      thongTinDoanhNghiepData: {}
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
      vm.$store.dispatch('loadInitResource').then(function (result) {
        let query = vm.$router.history.current.query
        if (query && query['id']) {
          vm.loadProductionPlants(query['id'])
        }
        vm.loadApplicantProfileDetail()
        if (vm.showCoSoSanXuatLapRap) {
          vm.loadDSCoSoNuocNgoai_Regis()
        }
      })
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      // this.checkShowInfo()
      // let vm = this
      // let query = newRoute.query
    }
  },
  methods: {
    loadProductionPlants (applicantprofileid) {
      let vm = this
      vm.$store.dispatch('loadProductionPlants', {
        applicantprofileid: applicantprofileid
      }).then(result => {
        vm.danhSachXuongItems = result['data'] || []
        console.log('loadProductionPlants================', vm.danhSachXuongItems)
      }).catch(xhr => {
        console.log('loadDSPtCapPhieuXX+++++++++++', xhr)
      })
    },
    thongTinAll (data) {
      let vm = this
      this.applicantProfileModel = data
      if (vm.showDanhGiaCop) {
        vm.loadDSLichSuDanhGiaCOP()
      }
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
        vm.applicantProfileModel = result
      }).catch(xhr => {
        console.log(xhr)
      })
    },
    // showAlpacaJSFORMRegist (item) {
    //   let vm = this
    //   item['registrationId'] = vm.id
    //   vm.$store.dispatch('showAlpacaJSFORMRegist', item).then(result => {
    //   }).catch(xhr => {
    //     console.log('showAlpacaJSFORMRegist+++++++++++', xhr)
    //   })
    // },
    // loadDSPtCapPhieuXX () {
    //   let vm = this
    //   vm.$store.dispatch('loadDSPtCapPhieuXX', {
    //     registrationId: vm.id
    //   }).then(result => {
    //     vm.itemsPtCapPhieuXX = result
    //   }).catch(xhr => {
    //     console.log('loadDSPtCapPhieuXX+++++++++++', xhr)
    //   })
    // },
    loadDSCoSoNuocNgoai_Regis () {
      let vm = this
      vm.$store.dispatch('loadDSCoSoNuocNgoai_Regis', {}).then(result => {
        vm.itemsCoSoNuocNgoai_Regis = result
      }).catch(xhr => {
        console.log('loadDSCoSoNuocNgoai_Regis+++++++++++', xhr)
      })
    },
    loadDSLichSuDanhGiaCOP (proId) {
      let vm = this
      let query = {
        'indice': 'vr_COPReportRepository',
        'query': {
          'query': {
            'bool': {
              'must': [
                {
                  'match': {
                    'type_es': 'vr_COPReportRepository'
                  }
                },
                {
                  'match': {
                    'data.vr_COPReportRepository.applicantProfileId': proId || vm.applicantProfileModel['id']
                  }
                }
              ]
            }
          }
        }
      }
      vm.$store.dispatch('getThongTin', query).then(result => {
        let data = result['hits']['hits']['_source']
        if (data && data['_source'] && data['_source']['data']['vr_COPReportRepository']) {
          vm.itemsLichSuDanhGiaCOP = data['_source']['data']['vr_COPReportRepository']
        }
      }).catch(xhr => {
        console.log('loadDSLichSuDanhGiaCOP+++++++++++', xhr)
        vm.itemsLichSuDanhGiaCOP = []
      })
    },
    loadDSSpDungSanXuat () {
      let vm = this
      vm.$store.dispatch('loadDSSpDungSanXuat', {
        registrationId: vm.id
      }).then(result => {
        vm.itemsSpDungSanXuat = result
      }).catch(xhr => {
        console.log('loadDSSpDungSanXuat+++++++++++', xhr)
      })
    },
    // loadDSHSDenHanXacNhan () {
    //   let vm = this
    //   vm.$store.dispatch('loadDSHSDenHanXacNhan', {
    //     registrationId: vm.id
    //   }).then(result => {
    //     vm.itemsHSDenHanXacNhan = result
    //   }).catch(xhr => {
    //     console.log('loadDSHSDenHanXacNhan+++++++++++', xhr)
    //   })
    // },
    async saveThongTinChung (state) {
      let vm = this
      vm.applicantProfileModel['mtCore'] = 1
      return new Promise((resolve, reject) => {
        this.applicantProfileModel['applicantStatus'] = state || 0
        let query = {
          'indice': 'vr_ApplicantProfile',
          'postStatus': 'draft',
          'body': {
            'vr_ApplicantProfile': vm.applicantProfileModel
          }
        }
        query['body']['vr_ProductionPlant'] = vm.danhSachXuongItems
        query['postStatus'] = 'send'
        vm.$store.dispatch('saveThongTin', query).then(result => {
          vm.applicantProfileModel['applicantStatus'] = state
          // vm.$store.commit('setThongTinChung', result['data']['vr_ApplicantProfile'] || result['data'])
          toastr.success('Thực hiện thành công!')
        }).catch(xhr => {
          toastr.error('Xử lý thất bại, vui lòng thử lại!')
        })
      })
    },
    registrationPheDuyet (state) {
      let vm = this
      vm.$store.dispatch('saveRegistration', {
        registrationId: vm.id,
        registrationState: state,
        markasdeleted: vm.applicantProfileModel['markasdeleted'],
        lyDoSuaDangKy: vm.lyDoSuaDangKy
      }).then(result => {
        vm.applicantProfileModel = Object.assign(vm.applicantProfileModel, result)
        toastr.success('Lưu thành công!')
      }).catch(xhr => {
        console.log(xhr)
        toastr.error('Lưu thất bại, vui lòng thử lại!')
      })
    },
    fetchUsers (item) {
      console.log('item---------+++++++++++', item)
    },
    toDetail (item) {
    },
    contextSelected (command) {
      console.log('node++++++++', command)
    },
    selected (node) {
      this.selectedNode = node
      console.log('node++++++++', this.selectedNode)
    },
    quayLai () {
      window.history.back()
    }
  },
  filters: {
    expiredStatus (status) {
      if (!status) {
        return ''
      }
      if (status === 0) {
        return 'Dừng hiệu lực'
      } else if (status === 1) {
        return 'Còn hiệu lực'
      } else if (status === 2) {
        return 'Đã bị thay thế'
      }
    },
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
    date (date) {
      if (!date) {
        return ''
      }
      return moment(String(date)).utc().format('DD/MM/YYYY HH:mm:ss')
    },
    filterStatus (val) {
      if (val === 1 || val === '1') {
        return 'Chờ duyệt'
      } else if (val === 2 || val === '2') {
        return 'Đã duyệt'
      } else if (val === 3 || val === '3') {
        return 'Yêu cầu bổ sung'
      }
      return 'Chưa xác nhận'
    }
  }
}
</script>
