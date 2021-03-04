<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        border
        :show-row-hover="false"
        index-text="#">
        <!-- 是否有效 -->
        <template
          slot="isok"
          slot-scope="scope">
          <i class="el-icon-success"
             style="color: lightgreen"
             v-if="scope.row.cat_deleted === false">
          </i>
          <i style="color: red"
             class="el-icon-error"
             v-else>
          </i>
        </template>
        <template
          slot="order"
          slot-scope="scope"
        >
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed">
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            clearable
            @change="parentCateChanged">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Cate.vue',
    data () {
      return {
        queryInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        // 商品分类的数据列表
        catelist: [],
        // 总条数
        total: 0,
        // 为table指定列的定义
        columns: [{
          label: '分类名称',
          prop: 'cat_name'
        }, {
          label: '是否有效',
          // 将当前列定义为模版列
          type: 'template',
          // 当前模版名称
          template: 'isok'
        }, {
          label: '排序',
          type: 'template',
          template: 'order'
        }, {
          label: '操作',
          type: 'template',
          template: 'opt'
        }],
        // 控制添加分类对话框的显示与隐藏
        addCateDialogVisible: false,
        // 添加分类的对话框
        addCateForm: {
          cat_name: '',
          // 父级分类的id
          cat_pid: 0,
          // 当前默认添加分类的等级
          cat_level: 0
        },
        // 添加分类表单的验证规则
        addCateFormRules: {
          cat_name: [
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
            }, {
              min: 2,
              max: 16,
              message: '分类名的长度在2～10个字符之间',
              trigger: 'blur'
            }
          ]
        },
        // 父级分类列表
        parentCateList: [],
        // 指定级联选择
        cascaderProps: {
          expandTrigger: 'hover',
          checkStrictly: true,
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 选中的父级分类id数组
        selectedKeys: []
      }
    },
    created () {
      this.getCateList()
    },
    methods: {
      // 获取商品分类数组
      async getCateList () {
        const { data: res } = await this.$http.get('categories', {
          params: this.queryInfo
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类失败')
        }

        this.catelist = res.data.result
        this.total = res.data.total
      },
      // 监听pagesize改变事件
      handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize
        this.getCateList()
      },
      // 监听当前
      handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage
        this.getCateList()
      },
      // 点击按钮，展示添加分类对话框
      showAddCateDialog () {
        // 先获取父级分类列表
        this.getParentCateList()
        this.addCateDialogVisible = true
      },
      // 获取父级分类列表
      async getParentCateList () {
        const { data: res } = await this.$http.get('categories', {
          params: { type: 2 }
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取父级分类失败')
        }

        this.parentCateList = res.data
      },
      // 选择项发生变化触发
      parentCateChanged () {
        if (this.selectedKeys.length > 0) {
          // 父级分类的id
          this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
          this.addCateForm.cat_level = this.selectedKeys.length
        } else {
          this.addCateForm.cat_pid = 0
          this.addCateForm.cat_level = 0
        }
      },
      // 点击按钮加分类
      addCate () {
        this.$refs.addCateFormRef.validate(async valid => {
          if (!valid) return

          const { data: res } = await this.$http.post('categories',
            this.addCateForm)

          if (res.meta.status !== 201) {
            return this.$message.error('添加分类失败')
          }

          this.$message.success('添加分类成功')
          this.getCateList()
          this.addCateDialogVisible = false
        })
      },
      // 监听对话框的关闭事件，重置表单
      addCateDialogClosed () {
        this.$refs.addCateFormRef.resetFields()
        this.selectedKeys = []
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .treeTable {
    margin-top: 15px;
  }

  .el-cascader {
    width: 100%;
  }
</style>
