<template>
  <search :on-search="onSearch" />
  <el-button type="primary" @click="createDialogVisable = true">新建</el-button>
  <el-button type="warning" @click="onRecoverUserInfo">撤销</el-button>
  <el-button type="danger" @click="handleDelete">批量删除</el-button>
  <userInfoPop
    :on-submit="onCreateUserInfo"
    :dialog-visible="createDialogVisable"
    :oncancel="
      () => {
        createDialogVisable = false
      }
    "
  />
  <userInfoPop
    :on-submit="onUpdateUserInfo"
    :dialog-visible="updateDialogVisable"
    :default-data="updateUserInfo"
    :oncancel="
      () => {
        updateDialogVisable = false
      }
    "
  />
  <el-table
    :data="userInfos"
    class="user-table"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="sex" label="性别">
      <template v-slot="scope">{{
        scope.row.sex.toUpperCase() === 'M' ? '男' : '女'
      }}</template>
    </el-table-column>
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="phone" label="电话号码" />
    <el-table-column prop="address" label="详细地址" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="onEditUserInfo(scope.row)" text>编辑</el-button>
        <el-button type="danger" @click="onDelUserInfo(scope.row.id)" text
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-sizes="options"
    layout="total, sizes, prev, pager, next"
    :total="total"
    @size-change="onPageSizeChange"
    @current-change="handleCurrentChange"
    class="pagination"
  />
</template>

<script setup>
import search from '@/components/search.vue'
import useUserInfoStore from '@/store/modules/userInfo'
import userInfoPop from '@/components/userInfoPop.vue'
import service from '@/utils/axios'
import {storeToRefs} from 'pinia'
import {setCmd, popCmd, cmdCode} from '@/utils/cmd'

const userInfoStore = useUserInfoStore()

const createDialogVisable = ref(false)
const updateDialogVisable = ref(false)
const updateUserInfo = ref({})
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const options = [10, 20, 30, 40, 50]
const {userInfos, pageSize, pageIndex} = storeToRefs(userInfoStore)
const total = ref(0)

sessionStorage.setItem('cmd', [])

let searchParmas
/**
 * 批量删除用户信息
 */
function handleDelete() {
  let ids = []
  for (const key in multipleSelection.value) {
    ids.push(multipleSelection.value[key].id)
  }
  setCmd({code: cmdCode.DELETE, data: ids})
  service({
    method: 'delete',
    url: '/api/user/del',
    data: ids,
  }).then((res) => {
    if (res?.data > 0) {
      onSearch(searchParmas)
    }
  })
}
/**
 * 撤销操作
 */
function onRecoverUserInfo() {
  let cmd = popCmd()
  if (!cmd) {
    return
  }
  switch (cmd.code) {
    case cmdCode.UPDATE:
      onUpdateUserInfo(cmd.data, false)
      break
    case cmdCode.DELETE:
      service({
        method: 'put',
        url: '/api/user/recover',
        data: cmd.data,
      }).then((res) => {
        if (res.data > 0) {
          onSearch(searchParmas)
        }
      })
      break
    case cmdCode.CREATE:
      onDelUserInfo(cmd.data, false)
      break
  }
}

/**
 * 创建用户信息
 * @param {Object} obj
 */
function onCreateUserInfo(obj) {
  service({
    method: 'post',
    url: '/api/user/add',
    data: obj,
  }).then((res) => {
    if (res.data.row > 0) {
      createDialogVisable.value = false
      setCmd({code: cmdCode.CREATE, data: res.data.id})
      onSearch(searchParmas)
    }
  })
}
let oldRowData
/**
 * 更新用户信息
 * @param {Object} obj
 */
function onUpdateUserInfo(obj, isRecord = true) {
  service({
    method: 'put',
    url: '/api/user/update',
    data: obj,
  }).then((res) => {
    if (res.data > 0) {
      updateDialogVisable.value = false
      if (isRecord) {
        setCmd({code: cmdCode.UPDATE, data: oldRowData})
      }
      onSearch(searchParmas)
    }
  })
}
/**
 * 编辑用户信息
 * @param {Object} row
 */
function onEditUserInfo(row) {
  oldRowData = row
  updateUserInfo.value = row
  updateDialogVisable.value = true
}
/**
 * 删除用户信息
 * @param {Number} id
 */
function onDelUserInfo(id, isRecord = true) {
  service({
    method: 'delete',
    url: '/api/user/del',
    data: [id],
  }).then((res) => {
    if (res?.data > 0) {
      if (isRecord) {
        setCmd({code: cmdCode.DELETE, data: [id]})
      }
      onSearch(searchParmas)
    }
  })
}
/**
 * 查找用户信息
 */
function onSearch(formInline) {
  searchParmas = formInline
  searchParmas.pageSize = pageSize.value
  searchParmas.pageIndex = pageIndex.value
  console.log(formInline)
  service({
    method: 'get',
    url: '/api/user/list',
    params: searchParmas,
  }).then((res) => {
    if (res.code == 200) {
      userInfoStore.toggleUserInfos(res.data.userList)
      total.value = res.data.size
    }
  })
}
function onPageSizeChange(pageSize) {
  userInfoStore.togglePageSize(pageSize)
  onSearch(searchParmas)
}
function handleCurrentChange(pageIndex) {
  userInfoStore.togglePageIndex(pageIndex)
  onSearch(searchParmas)
}
onSearch({
  pageSize: userInfoStore.pageSize,
  pageIndex: userInfoStore.pageIndex,
})
</script>

<style lang="scss" scoped>
$marginTop: 5px;
.split-page {
  float: right;
  width: 150px;
}
.bottom-btn {
  margin-top: $marginTop;
}
.user-table {
  width: 100%;
  height: 100%;
  margin-top: $marginTop;
}
.pagination {
  margin-right: 50%;
  transform: translate(50%);
  display: inline-flex;
  float: right;
}
</style>
