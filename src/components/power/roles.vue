<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图 -->
    <el-card>
      <el-button type="primary" @click="addRoleDialogVisible = true"
        >添加角色</el-button
      >
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              v-for="(item1, i1) in props.row.children"
              :key="item1.id"
              :class="['bdbottom', i1 !== 0 ? '' : 'bdtop', 'vcenter']"
            >
              <el-col :span="5">
                <el-tag closable @close="removeRight(props.row, item1.id)">{{
                  item1.authName
                }}</el-tag
                ><i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                  :class="[i2 !== 0 ? 'bdtop' : '', 'vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRight(props.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRight(props.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="showEditRole(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限弹框 -->
    <el-dialog title="提示" :visible.sync="rolesDialogVisible" width="40%">
      <!-- 树形控件 -->
      <el-tree
        :data="rightsTree"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色弹框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleRules"
        ref="addRoleRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleDialogVisible"
      width="40%"
    >
      <el-form
        :model="editRole"
        :rules="editRoleRules"
        ref="editRoleRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleFinish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      rolesDialogVisible: false,
      rightsTree: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
      defKeys: [],
      roleId: "",
      addRoleDialogVisible: false,
      addRoleForm: {
        roleName: "",
        roleDesc: "",
      },
      addRoleRules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称！",
            trigger: "blur",
          },
        ],
      },
      editRole: {},
      editRoleRules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称！",
            trigger: "blur",
          },
        ],
      },
      editRoleDialogVisible: false,
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("/roles");
      if (res.meta.status !== 200) {
        return this.$message.error("请求角色列表错误！！！");
      }
      this.rolesList = res.data;
    },
    async removeRight(role, rightId) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmRes !== "confirm") {
        return this.$message.info("取消了删除！");
      }
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败！！");
      }
      // 为了防止删除后关闭了折叠栏
      role.children = res.data;
    },
    async showSetRightDialog(role) {
      this.roleId = role.id;
      this.defKeys = [];
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限数据失败!!");
      }
      // 把获取到的data数据保存到tree中
      this.rightsTree = res.data;
      //
      this.getLeafKeys(role, this.defKeys);
      this.rolesDialogVisible = true;
    },
    // 通过递归的形式，获取角色下所有三级权限的id
    getLeafKeys(node, arr) {
      // 如果没有子节点，说明是三级权限了
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr));
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      // 拼接成字符串
      const idStr = keys.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      );
      if (res.meta.status != 200) {
        return this.$message.error("权限分配失败！！");
      }
      this.$message.success("权限分配成功");
      this.getRolesList();
      this.rolesDialogVisible = false;
    },
    // 添加角色功能
    addRole() {
      this.$refs.addRoleRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("roles", this.addRoleForm);
        if (res.meta.status !== 201) {
          return this.$message.error("角色添加失败！！！");
        }
        this.$message.success("角色添加成功~");
        // 添加完之后再刷新一次角色列表
        this.getRolesList();
      });
      this.addRoleDialogVisible = false;
    },
    // 编辑角色功能
    async showEditRole(Id) {
      this.editRoleDialogVisible = true;
      const { data: res } = await this.$http.get(`roles/${Id}`);
      if (res.meta.status !== 200) return this.$message.error("获取出错了！");
      this.editRole = res.data;
    },
    editRoleFinish() {
      this.$refs.editRoleRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          `roles/${this.editRole.roleId}`,
          this.editRole
        );
        if (res.meta.status !== 200) {
          return this.$message.error("角色修改失败！！！");
        }
        this.$message.success("角色修改成功~");
        // 修改完之后再刷新一次角色列表
        this.getRolesList();
        this.editRoleDialogVisible = false;
      });
    },
    // 添加用户对话框关闭之前重置所有表单数据
    addDialogClosed() {
      this.addRoleForm.roleName = "";
      this.addRoleForm.roleDesc = "";
    },
    // 删除角色
    async deleteRole(id) {
      // 弹框询问
      const confirmRes = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          if (this.rolesList.length === 1)
            return this.$message.error("别删了吧吧吧，只剩一个人了");
          const { data: res } = await this.$http.delete(`roles/${id}`);
          if (res.meta.status !== 200) return this.$message.error("删除失败！");
          this.$message.success("删除成功~");
          this.getRolesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
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

.template {
  transition: 1s;
}
</style>
