<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop':'', 'vcenter']" v-for="(item1, i1) in scope.row.children"
                    :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable
                        @close="removeRightById(scope.row, item1.id)"> {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 二级权限 -->
                <el-row :class="[i2 !== 0 ? 'bdtop':'', 'vcenter']" v-for="(item2, i2) in item1.children"
                        :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success"
                            closable
                            @close="removeRightById(scope.row, item2.id)"> {{ item2.authName }}
                    </el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag :class="[i3 !== 0 ? 'bdtop':'']"
                            v-for="(item3, i3) in item2.children"
                            :key="item3.id"
                            closable
                            @close="removeRightById(scope.row, item3.id)"
                            type="warning">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="290px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning"
                       icon="el-icon-setting"
                       @click="showSetRightDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed">
      <el-tree :data="rightslist"
               :props="treeProps"
               node-key="id"
               default-expand-all
               ref="treeRef"
               :default-checked-keys="defKeys"
               show-checkbox></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Roles',
    data () {
      return {
        /* 所有角色的列表数据 */
        rolelist: [],
        /* 控制分配权限对话框 */
        setRightDialogVisible: false,
        /* 所有权限的数据 */
        rightslist: {},
        /* 树形控件的属性绑定对象 */
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        /* 默认选中的节点id值 */
        defKeys: [],
        // 即将分配权限的id
        roleId: ''
      }
    },
    created () {
      this.getRolesList()
    },
    methods: {
      // 获取所有角色的列表
      async getRolesList () {
        const { data: res } = await this.$http.get('roles')
        if (res.meta.status !== 200) {
          return this.$message.error('获取角色列表失败')
        }

        this.rolelist = res.data
      },
      /* 根据id删除对应的权限 */
      async removeRightById (role, rightId) {
        const confirmResult = await this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info('取消删除')
        }

        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)

        if (res.meta.status !== 200) {
          return this.$message.error('删除权限失败')
        }

        role.children = res.data
      },
      /* 展示分配权限对话框 */
      async showSetRightDialog (sole) {
        this.roleId = sole.id
        // 获取所有权限
        const { data: res } = await this.$http.get('rights/tree')

        if (res.meta.status !== 200) {
          return this.$message.error('获取权限失败')
        }

        this.rightslist = res.data
        this.getLeafKeys(sole, this.defKeys)
        this.setRightDialogVisible = true
      },
      /* 通过递归的方式获取权限id */
      getLeafKeys (node, arr) {
        if (!node.children) {
          return arr.push(node.id)
        }

        node.children.forEach(item =>
          this.getLeafKeys(item, arr))
      },
      /* 监听对话框的关闭 */
      setRightDialogClosed () {
        this.defKeys = []
      },
      /* 点击为权限分配角色 */
      async allotRights () {
        const keys = [
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedKeys()
        ]

        const idStr = keys.join(',')

        const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, {
          rids: idStr
        })

        if (res.meta.status !== 200) {
          return this.$message.error('分配权限失败')
        }

        this.$message.success('分配权限成功')
        this.getRolesList()
        this.setRightDialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
</style>
