import Vue from 'vue'
import Vuex from 'vuex'
import toastr from 'toastr'
import axios from 'axios'
import support from './support.json'
import $ from 'jquery'
// import router from '@/router'

Vue.use(toastr)
Vue.use(Vuex)
const itemCodeNuocNgoai = 'VR86'
export const store = new Vuex.Store({
  state: {
    initData: null,
    loading: false,
    loadingTable: false,
    loadingSubmit: false,
    error: null,
    docTypes: null,
    roleFilterStatus: null,
    userSignsData: null,
    otherData: {},
    itineraryNo: null,
    detailHs: null,
    maritimeCode: '',
    selectTauRoi: {},
    cssxModel: {}
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    loadInitResource ({commit, state}) {
      if (state.initData == null) {
        return new Promise(function (resolve, reject) {
          let param = {}
          let orginURL = window.location.href
          let coma = window.location.href.lastIndexOf('#/')
          if (coma > 0) {
            orginURL = window.location.href.substr(0, coma)
          }
          var url1 = new Promise(function (resolve, reject) {
            axios.get(orginURL + support.renderURLInit, param).then(function (response) {
              let serializable = response.data
              resolve(serializable)
            }).catch(function (error) {
              console.log(error)
              reject(error)
            })
          })
          Promise.all([url1]).then(function (results) {
            var data = results[0]
            commit('setInitData', data)
            resolve(data)
          }).catch(function (xhr) {
            commit('setInitData', null)
            reject(null)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve(state.initData)
        })
      }
    },
    getThongTin ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          axios.post('/o/dklr/_search', data).then(function (response) {
            const serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            reject(error)
          })
        })
      })
    },
    getThongTinDN ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            params: data
          }
          axios.get('/o/rest/vr-app/applicant/profile/detail', param).then(function (response) {
            const serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            reject(error)
          })
        })
      })
    },
    getFormData ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          /* eslint-disable */
          var url = '/o/rest/v2/registrations/' + data['registrationId'] + '/forms/' + data['referenceUid'] + '/formdata'
          $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            headers: {
              'groupId': state.initData['groupId'],
              Accept: 'application/json'
            },
            data: {
            },
            success: function (result){
              resolve(result)
            },
            error: function (result){
              reject(result)
            }
          })
          /* eslint-disable */
        })
      })
    },
    saveForm ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          /* eslint-disable */
          var url = '/o/rest/v2/registrations/' + data['registrationId'] + '/forms/' + data['referenceUid'] + '/formdata'
          $.ajax({
            url: url,
            dataType: 'json',
            type: 'PUT',
            headers: {
              'groupId': state.initData['groupId'],
              Accept: 'application/json'
            },
            data: {
              formdata: JSON.stringify(data.value)
            },
            success: function (result){
              resolve(result)
            },
            error: function (result){
              reject(result)
            }
          })
          /* eslint-disable */
        })
      })
    },
    getDictItem ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/dictcollections/' + data['dictItemCode'] + '/dictitems',
            dataType: 'json',
            type: 'GET',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: data,
            success: function (result) {
              resolve(result)
            },
            error: function (result) {
              reject(result)
            }
          })
        })
      })
    },
    addForm ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/registrations/' + data.registrationId + '/forms/' + data['formNo'],
            dataType: 'json',
            type: 'POST',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
            },
            success: function (result) {
              resolve(result)
            },
            error: function (result) {
              reject(result)
            }
          })
        })
      })
    },
    showAlpacaJSFORMRegist ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          /* eslint-disable */
          var url = '/o/rest/v2/registrations/' + data['registrationId'] + '/forms/' + data['referenceUid'] + '/formscript'
          let alapcaJSRei = {}
          $('#regist_form_' + data['referenceUid']).empty()
          let config = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(url, config).then(function (response) {
            var serializable = response.data
            alapcaJSRei = eval('(' + serializable + ')')
            axios.get('/o/rest/v2/registrations/' + data['registrationId'] + '/forms/' + data['referenceUid'] + '/formdata', config).then(function (responseFormData) {
              alapcaJSRei['data'] = responseFormData.data
              window.$('#regist_form_' + data['referenceUid']).alpaca(alapcaJSRei)
              resolve(alapcaJSRei)
            }).catch(function (xhr) {
              reject(xhr)
            })
          }).catch(function (xhr) {
            reject(xhr)
          })
          /* eslint-disable */
        })
      })
    },
    loadListForms ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/registrations/' + data['registrationId'] + '/forms'
          var configs = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(url, configs).then(function (response) {
            var serializable = response.data
            var arrFormnotRemmove = []
            if (serializable.data) {
              for (var i = 0; i < serializable.data.length; i++) {
                if (!serializable.data[i].removed) {
                  arrFormnotRemmove.push(serializable.data[i])
                }
              }
            }
            let registForms = arrFormnotRemmove
            resolve(registForms)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadDSPtCapPhieuXX ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictitems'
          var configDSCoSoNuocNgoai = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
              registrationId: data['registrationId']
            }
          }
          axios.get(url, configDSCoSoNuocNgoai).then(function (response) {
            let serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadDSLichSuDanhGiaCOP ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictitems'
          axios.get(url, {}).then(function (response) {
            let serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadDSSpDungSanXuat ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictitems'
          var configDSCoSoNuocNgoai = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
              registrationId: data['registrationId']
            }
          }
          axios.get(url, configDSCoSoNuocNgoai).then(function (response) {
            let serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (xhr) {
            console.log(xhr)
          })
        })
      })
    },
    loadDSCoSoNuocNgoai_Regis ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictitems'
          var configDSCoSoNuocNgoai = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
              registrationId: data['registrationId'],
              start: data['start'] || 0,
              end: data['end'] || 15
            }
          }
          axios.get(url, configDSCoSoNuocNgoai).then(function (response) {
            let serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (xhr) {
            console.log(xhr)
            reject(xhr)
          })
        })
      })
    },
    loadDSHSDenHanXacNhan ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/dossiers/todo'
          var configDSCoSoNuocNgoai = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
              registrationId: data['registrationId'],
              follow: true,
              start: 0,
              end: 15,
              status: 'processing',
              substatus: '',
              sort: 'modified',
              order: false
            }
          }
          axios.get(url, configDSCoSoNuocNgoai).then(function (response) {
            let serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (xhr) {
            console.log(xhr)
            reject(xhr)
          })
        })
      })
    },
    saveCoSoNuocNgoai ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = state.initData['urlCsSoNuocNgoai'].saveDictItemURL
          let portletNamespace = state.initData['portletNamespace']
          console.log('saveCoSoNuocNgoai_URL======================>>>>>', url)
          var type = 'POST'
          var url = urlAddCoSoNuocNgoai + '&' + portletNamespace + 'collectionCode=' + itemCodeNuocNgoai
          var dictCollectionCode = portletNamespace + 'dictCollectionCode'
          var itemCode = portletNamespace + 'itemCode'
          var itemName = portletNamespace + 'itemName'
          var itemNameEN = portletNamespace + 'itemNameEN'
          var parentItemId = portletNamespace + 'parentItemId'
          var sibling = portletNamespace + 'sibling'
          var level = portletNamespace + 'level'
          var metaData = portletNamespace + 'metaData'
          var parentItemCode = portletNamespace + 'parentItemCode'
          var itemDescription = portletNamespace + 'itemDescription'
          var itemCodeOld = portletNamespace + 'itemCodeOld'
          var groupCode = portletNamespace + 'groupCode'
          var dataTmp = {}
          dataTmp[itemCode] = data['itemCode']
          dataTmp[itemName] = data['itemName']
          dataTmp[itemNameEN] = data['itemName']
          dataTmp[parentItemId] = ''
          dataTmp[sibling] = 0
          dataTmp[level] = ''
          dataTmp[metaData]= ''
          dataTmp[parentItemCode] = data['parentItemCode']
          dataTmp[itemDescription] = data['itemDescription']
          dataTmp[groupCode] = data['loaiHinhCSSX']
          if (data['dictItemId']) {
            dataTmp[itemCodeOld] = data['itemCode']
            url = urlAddCoSoNuocNgoai + '&' + portletNamespace + 'collectionCode=' + itemCodeNuocNgoai 
            + '&' + portletNamespace + 'itemCodeOld=' + data['itemCode']
          }
          $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            headers: {
              groupId: state.initData['groupId']
            },
            data: dataTmp,
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    loadDanhSachDoanhNghiepTrongNuoc ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlRequest = '/o/rest/vr-app/applicant/profile/search'
          let query = {}
          for (var key in data) {
            if (key !== 'url') {
              query[key] = data[key]
            }
          }
          let param = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: query
          }
          axios.get(urlRequest, param).then(function (response) {
            var serializable = response.data
            var arrResult = serializable.data || []
            // if (serializable.data) {
            //   for (var i = 0; i < serializable.data.length; i++) {
            //     serializable.data[i]['stt'] = i + 1
            //     if (!serializable.data[i].removed) {
            //       arrResult.push(serializable.data[i])
            //     }
            //   }
            // }
            if (Array.isArray(data['state'])) {
              if (arrResult.length) {
                let thongTinDoanhNghiepTableItems = arrResult.filter(function (item) {
                  return data['state'].includes(item['applicantStatus'])
                })
                resolve({
                  data: thongTinDoanhNghiepTableItems,
                  total: thongTinDoanhNghiepTableItems.length
                })
              } else {
                resolve({
                  data: arrResult,
                  total: arrResult.length
                })
              }
            } else {
              resolve({
                data: arrResult,
                total: arrResult.length
              })
            }
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadTrackChange ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          /* eslint-disable */
          var url = '/o/rest/vr-app/trackchanges/applicantprofile/' + data['applicantCode'] || 0
          data['mtCore'] = 1
          $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            headers: {
              'groupId': state.initData['groupId'],
              'Accept': 'application/json'
            },
            data: data,
            success: function (result){
              commit('setTrackChanges', result)
              resolve(result)
            },
            error: function (result){
              reject(result)
            }
          })
          /* eslint-disable */
        })
      })
    },
    loadDanhSachDoanhNghiepNgoaiNuoc ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlRequest = '/o/rest/v2/temp/dictcollections/VR86/dictitems'
          let query = {}
          for (var key in data) {
            if (key !== 'url') {
              query[key] = data[key]
            }
          }
          let param = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: query
          }
          axios.get(urlRequest, param).then(function (response) {
            var serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    changePassApplicant ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/applicants/changepass/' + data['applicantId'],
            dataType: 'json',
            type: 'PUT',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
              value: data['passNewCitizen']
            },
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    loadApplicantProfileDetail ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/vr-app/applicant/profile/' + data['applicantCode'],
            dataType: 'json',
            type: 'GET',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
            },
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    saveRegistration ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/v2/registrations/' + data.registrationId
          $.ajax({
            url: url,
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
              'registrationState': data['registrationState'],
              'markasdeleted': data['markasdeleted'],
              'remarks': data['lyDoSuaDangKy']
            },
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data, textStatus, xhr) {
              resolve(data)
            },
            error: function (xhr, textStatus, errorThrown) {
              reject(xhr)
            }
          })
        })
      })
    },
    saveThongTin ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let configs = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
            }
          }
          axios.post('/o/dklr/post', data, configs).then(function (response) {
            var serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    changeEmailApplicant ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/applicants/changeemail/' + data['applicantId'],
            dataType: 'json',
            type: 'PUT',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
              value: data['emailNewCitizen']
            },
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    deleteCoSoNuocNgoai ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictitems/' + data['itemCode'],
            dataType: 'json',
            type: 'DELETE',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
            },
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    moKhoaThongTinDoanhNghiep ({commit, state}, data) {
      let lockData = !data['lock']
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          $.ajax({
            url: '/o/rest/v2/applicants/lock',
            dataType: 'json',
            type: 'PUT',
            headers: {
              'groupId': state.initData['groupId']
            },
            data: {
              lock: lockData
            },
            success: function (result) {
              resolve(result)
            },
            error: function (xhr) {
              reject(xhr)
            }
          })
        })
      })
    },
    loadDoanhNghiepTT_NN: function (dictItemId) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var paramsBuilder = {
            start: 0,
            end: 15
          }
          const config_registrations = {
            params: paramsBuilder,
            headers: {
              'groupId': state.initData['groupId']
            }
          }
          var url = '/o/rest/v2/registrations'
          axios.get(url, config_registrations).then(function (response) {
            var serializable = response.data
            var arrResult = []
            if (serializable.data) {
              for (var i = 0; i < serializable.data.length; i++) {
                if (!serializable.data[i].removed) {
                  arrResult.push(serializable.data[i])
                }
              }
            }
            resolve(arrResult)
          }).catch(function (xhr) {
            console.log(xhr)
            reject(xhr)
          })
        })
      })
    },
    loadSelectLoaiHinhCSSX ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlGetDictGroup = state.initData['urlCsSoNuocNgoai']['getDictGroupURL']
          console.log('urlGetDictGroup_URL===================>>>>>>', urlGetDictGroup)
          let portletNamespace = state.initData['portletNamespace']
          let urlRequest = urlGetDictGroup + '&' + portletNamespace + 'dictItemId=' + data.dictItemId
          $.ajax({
            url: urlRequest,
            type: 'POST',
            dataType: 'json',
            headers: {
              groupId: state.initData['groupId']
            },
            data: {},
            success: function (result) {
              resolve(result['groupCode'])
            },
            error: function (result) {
              console.log(result)
              reject(result)
            }
          })
        })
      })      
    },
    loadProductionPlants ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlRequest = '/o/rest/vr-app/production/plant/search'
          let param = {
            headers: {
              groupId: state.initData['groupId']
            },
            params: {
              mtcore: 1,
              ...data
            }
          }
          axios.get(urlRequest, param).then(function (response) {
            var serializable = response.data || {
              total: 0,
              data: []
            }
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadLoaiHinhCSSX ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlRequest = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictgroups?sort=groupName&level=0'
          let param = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(urlRequest, param).then(function (response) {
            var serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadCSSXCha ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let urlRequest = '/o/rest/v2/temp/dictcollections/' + itemCodeNuocNgoai + '/dictgroups?sort=sibling&level=0'
          let param = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(urlRequest, param).then(function (response) {
            var serializable = response.data['data'] || []
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadingTable (state, payload) {
      state.loadingTable = payload
    },
    setLoadingSubmit (state, payload) {
      state.loadingSubmit = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setInitData (state, payload) {
      state.initData = payload
    },
    clearError (state) {
      state.error = null
    },
    setDocTypes (state, payload) {
      state.docTypes = payload
    },
    setRoleFilterStatus (state, payload) {
      state.roleFilterStatus = payload
    },
    setOtherData (state, payload) {
      state.otherData = payload
    },
    setItineraryNo (state, payload) {
      state.itineraryNo = payload
    },
    setDetailHs (state, payload) {
      state.detailHs = payload
    },
    setMaritimeCode (state, payload) {
      state.maritimeCode = payload
    },
    setSelectTauRoi (state, payload) {
      state.selectTauRoi = payload
    },
    setCssxModel (state, payload) {
      window.sessionStorage.setItem('cssxModel', JSON.stringify(payload))
      state.cssxModel = payload
    }
  },
  getters: {
    initData (state) {
      return state.initData
    },
    loading (state) {
      return state.loading
    },
    cssxModel (state) {
      let cssxModel = state.cssxModel
      if (!cssxModel || Object.keys(cssxModel).length === 0 && cssxModel.constructor === Object) {
        let item = window.sessionStorage.getItem('cssxModel') || '{}'
        return JSON.parse(item) || {}
      } else {
        return cssxModel
      }
    },
    loadingInitData (state) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          resolve(result)
        })
      })
    }
  }
})
