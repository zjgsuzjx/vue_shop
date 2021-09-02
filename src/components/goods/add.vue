<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps
        :space="250"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- tab栏区域 -->
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-col :span="8">
                <el-input v-model="addForm.goods_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-col :span="8">
                <el-input
                  v-model="addForm.goods_price"
                  type="number"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-col :span="8">
                <el-input
                  v-model="addForm.goods_weight"
                  type="number"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-col :span="8">
                <el-input
                  v-model="addForm.goods_number"
                  type="number"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="商品分类 (请选择三级)" prop="goods_cat">
              <!-- 选择商品分类的级联选择框 -->
              <el-row class="cat_opt">
                <el-col>
                  <span>选择商品分类：</span>
                  <el-cascader
                    expand-trigger="hover"
                    :options="categories"
                    :props="cateProps"
                    v-model="addForm.goods_cat"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-col>
              </el-row>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTabData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in onlyTabData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://acg.zjgsuzjx.top:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传jpg/png文件哦~</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
          </el-tab-pane>
        </el-tabs>
        <!-- 上一步和下一步 -->
        <el-button
          type="primary"
          @click="preStep"
          v-if="activeIndex !== '0'"
          class="firstButton"
          >上一步</el-button
        >
        <el-button type="primary" v-else disabled class="firstButton"
          >上一步</el-button
        >
        <el-button type="primary" @click="nextStep" v-if="activeIndex !== '4'"
          >下一步</el-button
        >
        <el-button type="success" v-else @click="addGood">提交</el-button>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '0',
      categories: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        // 商品详情描述
        goods_introduce: '',
        attrs: []
      },
      manyTabData: [],
      onlyTabData: [],
      addFormRules: {
        goods_name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        goods_price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true,
            message: '请输入商品重量',
            trigger: 'blur'
          }
        ],
        goods_number: [
          {
            required: true,
            message: '请输入商品数量',
            trigger: 'blur'
          }
        ],
        goods_cat: [
          {
            required: true,
            message: '请选择商品分类',
            trigger: 'blur'
          }
        ]
      },
      //   图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      this.categories = res.data
    },
    handleChange () {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！！')
        return false
      }
    },
    async tabClicked () {
      // 证明访问的是参数面板
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: 'many' } }
        )
        if (res.meta.status !== 200) { return this.$message.error('获取动态参数列表失败！！') }
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length !== 0 ? item.attr_vals.split(' ') : []
        })
        this.manyTabData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: 'only' } }
        )
        if (res.meta.status !== 200) { return this.$message.error('获取静态属性失败！！') }
        this.onlyTabData = res.data
      }
    },
    // 处理图片预览
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 处理移除图片的操作
    handleRemove (file) {
      const filePath = file.response.data.tmp_path
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath)
      this.addForm.pics.splice(i, 1)
    },
    // 监听图片上传成功的事件
    handleSuccess (response) {
      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
    },
    // 实现上一步功能
    preStep () {
      if (this.addForm.goods_cat.length === 3) {
        this.activeIndex = (this.activeIndex - 1).toString()
        this.tabClicked()
      } else return this.$message.error('请先选择商品分类！！')
    },
    // 实现下一步功能
    nextStep () {
      if (this.addForm.goods_cat.length === 3) {
        this.activeIndex = (parseInt(this.activeIndex) + 1).toString()
        this.tabClicked()
      } else return this.$message.error('请先选择商品分类！！')
    },
    addGood () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项!!')
        }
        // 这里也可以用lodash进行深拷贝
        const obj = JSON.parse(JSON.stringify(this.addForm))
        obj.goods_cat = obj.goods_cat.join(',')
        // 处理动态参数和静态属性
        this.manyTabData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_vals: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newInfo)
        })
        this.onlyTabData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_vals: item.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })
        obj.attrs = this.addForm.attrs
        // 发起请求添加商品
        const { data: res } = await this.$http.post('goods', obj)
        console.log(obj)
        console.log(res)
        if (res.meta.status !== 201) { return this.$message.error('添加商品失败惹！！') }
        this.$message.success('添加商品成功了欸~')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 5px 5px 0;
}
.firstButton {
  margin-left: 150px;
  margin-right: 50px;
}
.previewImg {
  width: 100%;
}
</style>
