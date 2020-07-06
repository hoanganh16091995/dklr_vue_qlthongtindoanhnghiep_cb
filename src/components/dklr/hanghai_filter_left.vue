<template>
  <div style="width: 100%; position: relative; border-right: 1px solid #ccc; height: 100%;">
    <div class="expansion-panel__header" data-ripple="false" style="background-color: #14bef0; color: #fff;     padding: 9px 9px 8px 9px;"><div>THÔNG TIN DOANH NGHIỆP</div>
      <div class="header__icon"></div>
    </div>
    <div style="width: 100%;" class="ml-3" v-if="loading">
			<content-placeholders>
				<content-placeholders-text :lines="4" />
			</content-placeholders>
		</div>
		<div class="flex xs12" v-else>
      
      <v-treeview
        v-model="tree"
        return-object
        item-key="index"
        item-text="name"
        :open="open"
        :active.sync="active"
        :items="items"
        activatable
        open-on-click
        >
        <template slot="prepend" slot-scope="props">
          <v-icon v-if="!props.item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[props.item.file] }}
          </v-icon>
        </template>
        <template slot="label" slot-scope="props">
          <span @click="toDetail(props.item)">{{props.item['name']}}</span>
        </template>
        <template slot="append" slot-scope="props">
          <span class="px-3"><v-icon size="18" v-if="props.item.index === indexSelect">play_arrow</v-icon></span>
        </template>
      </v-treeview>

      <!-- <v-treeview
        v-model="tree"
        return-object
        item-key="index"
        item-text="name"
        :open="open"
        :active.sync="active"
        :items="items"
        activatable
        open-on-click
        >
        <template slot="prepend" slot-scope="props">
          <span v-if="!props.item.file"></span>
          <v-icon v-else>
            {{ files[props.item.file] }}
          </v-icon>
        </template>
        <template slot="label" slot-scope="props">
          <div v-on:click.stop="" v-if="props.item['stateLabel'] !== undefined && !props.item['stateLabel']">
            <v-select
            v-if="!props.item['loading']"
            class="my-0 py-0"
            style="width: 200px;"
            @input="getValue(props.item)"
            return-object
            v-model="props.item['value']"
            :items="itemsHS"
            item-text="name"
            item-value="id"
            menu-props="auto"
            hide-details
            single-line
            ></v-select>
            <span v-else>Loading....</span>
          </div>
          
          <span v-else style="pt-2">
            {{props.item['name']}}
          </span>
        </template>
        <template slot="append" slot-scope="props">
          <span class="px-3" v-if="props.item.index === indexSelect && props.item['type'] !== 'search'"><v-icon size="18">play_arrow</v-icon></span>
          <v-icon v-on:click.stop="loadingDn(props.item)" class="pr-2" v-else-if="props.item['type'] === 'search'">
            search
          </v-icon>
        </template>
      </v-treeview> -->
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import router from '@/router'
const COMPONENT_NAME = 'jx-hanghai-filter-left'
export default {
  name: COMPONENT_NAME,
  props: {
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
      TYPE_TRONG_NUOC: 'trong-nuoc',
      TYPE_NGOAI_NUOC: 'ngoai-nuoc',
      STATE_TRONG_NUOC: 'trong-nuoc',
      STATE_NGOAI_NUOC: 'ngoai-nuoc',
      STATE_XEM_TK: 'xem-tai-khoan',
      STATE_SUA_THONG_TIN_TK: 'sua-tai-khoan',
      STATE_PHE_DUYET_TK: 'phe-duyet-tai-khoan',
      STATE_CAP_NHAT_TINH_TRANG: 'cap-nhat-tinh-trang',
      STATE_MO_TK: 'mo-khoa-tai-khoan',
      STATE_KHOA_TK: 'khoa-tai-khoan',
      indexSelect: -1,
      role_filter_status: [],
      documentType: {},
      shipName: '',
      maBanKhai: '',
      callSign: '',
      doc_typesSelect: [],
      doc_types: [],
      loading: false,
      isThuTuc: false,
      payment: false,
      initDataFilter: {},
      activeIndex: 0,
      dataFilter: [],
      open: [],
      active: [],
      files: {
        open: 'folder_open',
        close: 'folder'
      },
      tree: [],
      itemsHS: [],
      items: [
        {
          name: 'Doanh nghiệp trong nước',
          file: true,
          type: 'trong-nuoc',
          index: 0,
          children: [
            // {
            //   id: 'tn-xemtk',
            //   type: 'trong-nuoc',
            //   name: 'Xem tài khoản',
            //   file: true,
            //   code: 'xem-tai-khoan',
            //   index: 1
            // },
            // {
            //   id: 'tn-suathongtintk',
            //   type: 'trong-nuoc',
            //   name: 'Sửa thông tin tài khoản',
            //   file: true,
            //   code: 'sua-tai-khoan',
            //   index: 2
            // },
            // {
            //   id: 'tn-pheduyettk',
            //   type: 'trong-nuoc',
            //   name: 'Phê duyệt tài khoản',
            //   file: true,
            //   code: 'phe-duyet-tai-khoan',
            //   index: 3
            // }
          ]
        },
        {
          name: 'Cơ sở sản xuất nước ngoài',
          type: 'ngoai-nuoc',
          file: true,
          index: 7,
          children: [
            // {
            //   id: 'nn-khoatk',
            //   type: 'ngoai-nuoc',
            //   name: 'Xem tài khoản',
            //   file: true,
            //   code: 'xem-tai-khoan',
            //   index: 8
            // },
            // {
            //   id: 'nn-suathongtintk',
            //   type: 'ngoai-nuoc',
            //   name: 'Sửa thông tin tài khoản',
            //   file: true,
            //   code: 'sua-tai-khoan',
            //   index: 9
            // },
            // {
            //   id: 'nn-capnhattk',
            //   type: 'ngoai-nuoc',
            //   name: 'Cập nhật tình trạng',
            //   file: true,
            //   code: 'cap-nhat-tinh-trang',
            //   index: 10
            // }
          ]
        }
      ]
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadInitResource').then(function (result) {
      })
      let params = vm.$router.history.current.params
      if (params) {
        let arraySource = []
        if (params['type'] === vm.TYPE_TRONG_NUOC) {
          arraySource = vm.items[0]['children']
        } else {
          arraySource = vm.items[1]['children']
        }
        console.log('type++++++', params['type'])
        console.log('arraySource++++++', arraySource)
        let itemPin = arraySource.find(item => {
          return item['code'] === params['code']
        })
        if (itemPin) {
          vm.active[0] = itemPin
          vm.indexSelect = itemPin['index']
        }
      }
      // let query = vm.$router.history.current.query
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      // let vm = this
      // let query = newRoute.query
    },
    'tree' (val) {
      console.log('tree++++++++', val)
    },
    'active' (val) {
      if (val[0]) {
        console.log('val++++++++', val)
        this.indexSelect = val[0].index
        this.toDetail(val[0])
      }
    }
  },
  methods: {
    // loadingDn (data) {
    //   data['stateLabel'] = !data['stateLabel']
    //   this.itemsHS = [
    //     {
    //       name: 'DN 01',
    //       id: 1
    //     },
    //     {
    //       name: 'DN 02',
    //       id: 2
    //     },
    //     {
    //       name: 'DN 03',
    //       id: 3
    //     }
    //   ]
    // },
    // getValue (value) {
    //   console.log('change++++++++', value)
    //   value['stateLabel'] = !value['stateLabel']
    //   value['children'].push({
    //     children: [],
    //     id: value['value'].id,
    //     type: 'search',
    //     name: value['value'].name,
    //     file: '',
    //     stateLabel: true,
    //     code: value['value'].id,
    //     index: value['value'].id + 1
    //   })
    // },
    toDetail (item) {
      console.log('item---------+++++++++++', item)
      if (item['type'] && item['code']) {
        router.push({
          path: '/thong-tin-doanh-nghiep/' + item['type'] + '/' + item['code']
        })
      } else {
        router.push({
          path: '/thong-tin-doanh-nghiep/' + item['type']
        })
      }
    },
    contextSelected (command) {
      console.log('node++++++++', command)
    },
    selected (node) {
      this.selectedNode = node
      console.log('node++++++++', this.selectedNode)
    }
  }
}
</script>
