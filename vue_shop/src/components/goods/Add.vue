<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        type="info"
        center
        title="添加商品信息"
        :closable="false"
      ></el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        align-center
        finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top">
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          @tab-click="tabClicked"
          :before-leave="beforeTabLeave">
          <el-tab-pane
            label="基本信息"
            name="0">
            <el-form-item
              label="商品名称"
              prop="goods_name">
              <el-input
                v-model="addForm.goods_name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price">
              <el-input
                v-model="addForm.goods_price"
                type="number">
              </el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight">
              <el-input
                v-model="addForm.goods_weight"
                type="number">
              </el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number">
              <el-input
                v-model="addForm.goods_number"
                type="number">
              </el-input>
            </el-form-item>
            <el-form-item
              label="商品分类"
              prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="cateProps"
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name="1">
            <!-- 渲染表单的item -->
            <el-form-item
              :label="item.attr_name"
              v-for="(item) in manyTableData"
              :key="item.attr_id">
              <el-checkbox-group
                v-model="item.attr_vals">
                <el-checkbox
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  :label="cb"
                  border>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2">
            <el-form-item
              v-for="(item) in onlyTableData"
              :key="item.attr_id"
              :label="item.attr_name">
              <el-input
                v-model="item.attr_vals">
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3">
            <el-upload
              :action="uploadUrl"
              :headers="headerObj"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button
                size="small"
                type="primary">
                点击上传
              </el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4">
            <quill-editor
              v-model="addForm.goods_introduce">
            </quill-editor>
            <el-button
              type="primary"
              class="btnAdd"
              @click="add">
              添加商品
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewVisible"
      width="50%">
      <img
        :src="previewPath"
        class="previewImg">
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'Add',
    data () {
      return {
        activeIndex: '0',
        // 添加商品的表单数据对象
        addForm: {
          goods_name: '',
          goods_price: 0,
          goods_weight: 0,
          goods_number: 0,
          goods_cat: [],
          // 图片的数组
          pics: [],
          // 商品的详情
          goods_introduce: '',
          attrs: []
        },
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
        // 商品分类列表
        catelist: [],
        // 商品分类列表
        cateProps: {
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        },
        // 动态参数列表
        manyTableData: [],
        // 静态属性列表
        onlyTableData: [],
        // 上传图片的URL地址
        uploadUrl: 'http://localhost:8888/api/private/v1/upload',
        // 图片上传组件的请求头
        headerObj: {
          Authorization: window.sessionStorage.getItem('token')
        },
        // 预览图片路径
        previewPath: '',
        // 图片预览
        previewVisible: false
      }
    },
    computed: {
      cateId () {
        if (this.addForm.goods_cat.length === 3) {
          return this.addForm.goods_cat[2]
        }

        return null
      }
    },
    created () {
      this.getCateList()
    },
    methods: {
      async getCateList () {
        const { data: res } = await this.$http.get('categories')

        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类数据失败')
        }

        this.catelist = res.data
      },
      // 级联选择器选中项变化
      handleChange () {
        if (this.addForm.goods_cat.length !== 3) {
          this.addForm.goods_cat = []
        }
      },
      beforeTabLeave (activeName, oldActiveName) {
        if (oldActiveName === '0' &&
          this.addForm.goods_cat.length !== 3) {
          this.$message.error('请先选择商品分类')
          return false
        }
      },
      async tabClicked () {
        // 证明访问的是动态参数面板
        if (this.activeIndex === '1') {
          const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
            params: { sel: 'many' }
          })

          if (res.meta.status !== 200) {
            return this.$message.error('获取动态参数的列表失败')
          }

          res.data.forEach(item => {
            item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(' ')
          })
          this.manyTableData = res.data
        } else if (this.activeIndex === '2') {
          const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
            params: { sel: 'only' }
          })

          if (res.meta.status !== 200) {
            return this.$message.error('获取静态属性的列表失败')
          }

          this.onlyTableData = res.data
        }
      },
      // 处理图片预览效果
      handlePreview (file) {
        this.previewPath = file.response.data.url
        this.previewVisible = true
      },
      // 处理移除图片的操作
      handleRemove (file) {
        const filePath = file.response.data.tmp_path

        const index = this.addForm.pics.findIndex(
          item => item.pic === filePath)

        this.addForm.pics.splice(index, 1)
      },
      // 监听文件上传成功的事件
      handleSuccess (response) {
        const picInfo = { pic: response.data.tmp_path }

        this.addForm.pics.push(picInfo)
      },
      // 添加商品
      add () {
        this.$refs.addFormRef.validate(
          async valid => {
            if (!valid) {
              return this.$message.error('请填写必要的表单项')
            }

            // 执行添加的业务逻辑
            // lodash cloneDeep
            const form = _.cloneDeep(this.addForm)
            form.goods_cat = form.goods_cat.join(',')

            // 动态参数
            this.manyTableData.forEach(item => {
              form.attrs.push({
                attr_id: item.attr_id,
                attr_value: item.attr_vals.join(' ')
              })
            })
            // 静态属性
            this.onlyTableData.forEach(item => {
              form.attrs.push({
                attr_id: item.attr_id,
                attr_value: item.attr_vals.join(' ')
              })
            })

            const { data: res } = await this.$http.post('goods', form)

            if (res.meta.status !== 201) {
              return this.$message.error('添加商品失败！')
            }
            this.$message.success('添加商品成功！')
            this.$router.push('/goods')
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-checkbox {
    margin: 0 10px 0 0 !important;
  }

  .previewImg {
    width: 100%;
  }

  .btnAdd {
    margin-top: 15px;
  }

</style>
