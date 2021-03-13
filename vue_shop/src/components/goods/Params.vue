<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert show-icon
                title="注意：只允许为第三级分类设置相关参数！"
                type="warning"
                :closable="false">
      </el-alert>
      <!-- 商品分类 -->
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectedCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域-->
      <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick">
        <el-tab-pane
          label="动态参数"
          name="many">
          <el-button
            type="primary"
            :disabled="isBtnDisabled"
            size="mini"
            @click="addDialogVisible = true">
            添加参数
          </el-button>
          <el-table
            :data="manyTableData"
            border
            stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)">
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else class="button-new-tag"
                  size="small" @click="showInput(scope.row)">
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)">
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeParams(scope.row.attr_id)"
                  icon="el-icon-delete">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="静态属性"
          name="only">
          <el-button
            type="primary"
            :disabled="isBtnDisabled"
            size="mini"
            @click="addDialogVisible = true">
            添加属性
          </el-button>
          <el-table
            :data="onlyTableData"
            border
            stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)">
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else class="button-new-tag"
                  size="small" @click="showInput(scope.row)">
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)">
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeParams(scope.row.attr_id)"
                  icon="el-icon-delete">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px">
        <el-form-item
          :label="titleText"
          prop="attr_name">
          <el-input
            v-model="addForm.attr_name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数的对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px">
        <el-form-item
          :label="titleText"
          prop="attr_name">
          <el-input
            v-model="editForm.attr_name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Params',
    data () {
      return {
        // 商品分类列表
        catelist: [],
        // 级联选择配置对象
        cateProps: {
          expandTrigger: 'hover',
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 级联选择双向绑定id
        selectedCateKeys: [],
        // 被激活的页签
        activeName: 'many',
        // 动态参数的数据
        manyTableData: [],
        // 静态属性的数据
        onlyTableData: [],
        // 控制添加对话框的显示与隐藏
        addDialogVisible: false,
        // 添加参数的表单数据对象
        addForm: {
          attr_name: ''
        },
        addFormRules: {
          attr_name: [
            {
              required: true,
              message: '请输入参数名称',
              trigger: 'blur'
            }
          ]
        },
        // 控制修改对话框的显示与隐藏
        editDialogVisible: false,
        // 修改参数的表单数据对象
        editForm: {
          attr_id: '',
          attr_name: ''
        },
        editFormRules: {
          attr_name: [
            {
              required: true,
              message: '请输入参数名称',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      // 如果按钮需要被禁用，则返回true
      isBtnDisabled () {
        return this.selectedCateKeys.length !== 3
      },
      // 当前选中的三级分类的id
      cateId () {
        if (this.selectedCateKeys.length === 3) {
          return this.selectedCateKeys[this.selectedCateKeys.length - 1]
        }
        return null
      },
      // 动态计算弹框文本
      titleText () {
        if (this.activeName === 'many') {
          return '动态参数'
        }

        return '静态属性'
      }
    },
    created () {
      this.getCateList()
    },
    methods: {
      // 获取所有分类参数
      async getCateList () {
        const { data: res } = await this.$http.get('categories')
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类失败')
        }

        this.catelist = res.data
      },
      // 级联选择框变化触发
      handleChange () {
        this.getParamsData()
      },
      // tab页签点击事件处理
      handleTabClick () {
        this.getParamsData()
      },
      // 获取参数列表
      async getParamsData () {
        if (this.selectedCateKeys.length !== 3) {
          this.selectedCateKeys = []
          this.manyTableData = []
          this.onlyTableData = []
          return
        }

        // 选中的是三级分类
        // console.log(this.selectedCateKeys)

        // 根据所选分类的id，和当前所处面板，获取对应的参数
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: this.activeName }
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取参数列表失败！')
        }

        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          // 控制文本框显示与隐藏
          item.inputVisible = false
          // 文本输入框的值
          item.inputValue = ''
        })
        if (this.activeName === 'many') {
          this.manyTableData = res.data
        } else {
          this.onlyTableData = res.data
        }
      },
      // 监听对话框的关闭事件
      addDialogClose () {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加参数
      addParams () {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return

          const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          })

          if (res.meta.status !== 201) {
            return this.$message.error('添加参数失败')
          }

          this.$message.success('添加参数成功')
          this.addDialogVisible = false
          this.getParamsData()
        })
      },
      // 点击按钮，展示修改对话框
      async showEditDialog (attrId) {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${attrId}`, {
          params: {
            attr_sel: this.activeName
          }
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取参数信息失败')
        }

        this.editForm = res.data

        this.editDialogVisible = true
      },
      // 重置修改的表单
      editDialogClosed () {
        this.$refs.editFormRef.resetFields()
      },
      // 点击按钮，修改参数
      editParams () {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return

          const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          })

          if (res.meta.status !== 200) {
            return this.$message.error('修改参数失败')
          }

          this.$message.success('修改参数成功')
          this.getParamsData()
          this.editDialogVisible = false
        })
      },
      // 编辑对话框关闭
      editDialogClose () {
        this.$refs.editFormRef.resetFields()
      },
      // 根据id删除对应的参数项
      async removeParams (attrId) {
        const confirmResult = await this.$confirm(
          '此操作将永久删除该参数，是否继续？',
          '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info(' 已取消删除！')
        }

        const { data: res } = await this.$http.delete(
          `categories/${this.cateId}/attributes/${attrId}`)

        if (res.meta.status !== 200) {
          return this.$message.error('删除参数失败！')
        }
        this.$message.success('删除成功！')
        this.getParamsData()
      },
      // 文本框失去焦点，或按下enter键
      async handleInputConfirm (row) {
        if (row.inputValue.trim().length === 0) {
          row.inputValue = ''
          row.inputVisible = false
          return
        }
        // 如果没有return，则输入的内容需要做后续处理
        row.attr_vals.push(row.inputValue.trim())
        row.inputValue = ''
        row.inputVisible = false

        this.saveAttrVals(row)
      },
      // 点击按钮展示文本输入框
      showInput (row) {
        row.inputVisible = true
        // 让文本框自动获得焦点
        // $nextTick当页面上元素被重新渲染后，才能指定回调函数中的代码
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 将对 attr_vals 的操作保存数据库
      async saveAttrVals (row) {
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${row.attr_id}`, {
            attr_name: row.attr_name,
            attr_sel: row.attr_sel,
            attr_vals: row.attr_vals.join(' ')
          })

        if (res.meta.status !== 200) {
          return this.$message.error('修改参数失败！')
        }

        this.$message.success('修改参数成功！')
      },
      // 删除对应的参数和选项
      async handleClose (i, row) {
        row.attr_vals.splice(i, 1)
        this.saveAttrVals(row)
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-cascader {
    margin-top: 15px
  }

  .el-tag {
    margin: 10px
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 120px;
    margin-left: 10px;
  }
</style>
