<template>
  <div style="width: 100%; background: #ffff; position: relative;" class="filter__adv_class">
    <v-flex xs12 sm12>
      <v-layout row wrap class="ml-0 pr-3">
        <v-flex xs12 sm2 class="pr-2 pt-1 text-xs-right">
          <span>Tên doanh nghiệp:</span>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            @keyup.enter="filterADV"
            v-model="applicantName"
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2 class="pr-2 pt-1 text-xs-right">
          <span>Mã số thuế:</span>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            @keyup.enter="filterADV"
            v-model="applicantCode"
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2 class="pr-2 pt-1 text-xs-right">
          <span>Địa chỉ:</span>
        </v-flex>
        <v-flex xs12 sm10>
          <v-textarea
            @keyup.enter="filterADV"
            rows="2"
            v-model="applicantAddress"
            outline
          ></v-textarea>
        </v-flex>

        <v-flex xs12 sm2 class="pr-2 pt-1 text-xs-right">
          <span>Loại hình:</span>
        </v-flex>
        <v-flex xs12 sm4>
          <v-select
          @input="filterADV"
          multiple
          :items="ttdnLoaiHinhItems"
          item-text="itemText"
          item-value="itemValue"
          v-model="markupCorporation"
          outline
          ></v-select>
        </v-flex>

        <v-flex xs12 sm2 class="pr-2 pt-1 text-xs-right">
          <span>Nguồn:</span>
        </v-flex>
        <v-flex xs12 sm4>
          <v-select
          @input="filterADV"
          :items="ttdnNguonItems"
          item-text="itemText"
          item-value="itemValue"
          v-model="mtCore"
          outline
          ></v-select>
        </v-flex>

        <v-flex xs12 sm12 class="text-xs-right">
          <v-btn small color="primary" @click="filterADV">Tìm kiếm</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
import moment from 'moment'
import router from '@/router'
const COMPONENT_NAME = 'jx-hanghai-filter-adv'

export default {
  name: COMPONENT_NAME,
  components: {
  },
  props: {
    type: '',
    code: ''
  },
  watch: {
  },
  data () {
    return {
      applicantName: '',
      applicantCode: '',
      applicantAddress: '',
      markupCorporation: [],
      ttdnTinhTrang: '',
      mtCore: 1,
      ttdnTrangThai: '',
      ttdnLoaiHinhItems: [
        {
          itemText: 'Thiết kế',
          itemValue: 1
        },
        {
          itemText: 'SXLR trong nước',
          itemValue: 2
        },
        {
          itemText: 'Nhập khẩu',
          itemValue: 3
        },
        {
          itemText: 'CS Bảo hành bảo dưỡng',
          itemValue: 4
        }
      ],
      ttdnNguonItems: [
        {
          itemText: 'MTCORE',
          itemValue: 1
        },
        {
          itemText: 'ORACLE',
          itemValue: 0
        }
      ]
    }
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
  methods: {
    filterADV: function () {
      console.log('param++++++++', param)
      let vm = this
      let param = {}
      let current = vm.$router.history.current
      let newQuery = current.query
      for (var key in newQuery) {
        param[key] = newQuery[key]
      }
      router.push({
        path: '/thong-tin-doanh-nghiep/' + vm.type + '/' + vm.code,
        query: {
          ...param,
          applicantstatus: '',
          applicantname: vm.applicantName,
          applicantcode: vm.applicantCode,
          applicantaddress: vm.applicantAddress,
          markupcorporation: vm.markupCorporation.join() || '',
          mtcore: vm.mtCore
        }
      })
    },
    toDetail () {
      router.push({
        path: '/import-du-lieu/chi-tiet'
      })
    },
    formatDate (date) {
      if (date === null || date === undefined || date === '') return ''
      return moment(date, 'DD/MM/YYYY HH:mm').toDate().getTime()
    }
  }
}
</script>
