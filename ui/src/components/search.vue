<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="formInline.name" placeholder="姓名" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="formInline.sex" placeholder="性别">
        <el-option label="男" value="M" />
        <el-option label="女" value="F" />
        <el-option label="男/女" value="" default />
      </el-select>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input-number v-model="formInline.age" placeholder="年龄" :min="0" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formInline.phone" placeholder="电话" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formInline.address" placeholder="地址" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const formInline = reactive({
  name: '',
  sex: '',
  age: null,
  phone: '',
  address: '',
})

const props = defineProps({
  onSearch: {type: Function},
})
const onSubmit = () => {
  if (props.onSearch) {
    props.onSearch(formInline)
  }
}
</script>
