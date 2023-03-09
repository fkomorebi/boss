<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建/编辑用户"
    width="40%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formInline" label-position="top">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.sex" placeholder="性别">
          <el-option label="男" value="M" />
          <el-option label="女" value="F" />
          <el-option label="未知" value="" default />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="formInline.age" placeholder="年龄" :min="0" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formInline.phone" placeholder="电话" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-cascader
          v-model="addressPrefix"
          :options="addressData"
          ref="addressPfxEle"
        />
        <el-input
          v-model="formInline.address"
          placeholder="请输入详细地址"
          style="margin-top: 5px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="oncancel">取消</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {ElMessageBox} from 'element-plus'
import addressData from '@/assets/data/address'
const addressPfxEle = ref(null)
const addressPrefix = ref([])
const props = defineProps({
  dialogVisible: {type: Boolean, required: true},
  onSubmit: {type: Function},
  oncancel: {type: Function},
  defaultData: {type: Object},
})
const formInline = reactive({})
// 检测值是否发生改变
onBeforeUpdate(() => {
  formInline.name = props.defaultData?.name
  formInline.sex = props.defaultData?.sex
  formInline.age = props.defaultData?.age
  formInline.phone = props.defaultData?.phone
  if (props.defaultData && props.defaultData?.address) {
    let addressPfx = props.defaultData.address.split('/')
    if (addressPfx.length < 4) {
      formInline.address = ''
      addressPrefix.value = {}
    } else {
      addressPrefix.value = []
      addressPrefix.value.push(addressPfx[0])
      addressPrefix.value.push(addressPfx[1])
      addressPrefix.value.push(addressPfx[2])
      let addressTemp = ''
      for (let i = 3; i < addressPfx.length; i++) {
        addressTemp = addressPfx[i] + '/'
      }
      addressTemp = addressTemp.substring(0, addressTemp.length - 1)
      formInline.address = addressTemp
    }
  }
  if (!props.dialogVisible) {
    addressPrefix.value = []
    formInline.address = ''
    if (addressPfxEle.value) {
      addressPfxEle.value.panel.clearCheckedNodes()
    }
  }
})
function submit() {
  if (props.onSubmit) {
    formInline.address =
      addressPrefix.value[0] +
      '/' +
      addressPrefix.value[1] +
      '/' +
      addressPrefix.value[2] +
      '/' +
      formInline.address
    if (props.defaultData && props.defaultData?.id) {
      formInline.id = props.defaultData?.id
    }
    props.onSubmit(formInline)
  }
}

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
