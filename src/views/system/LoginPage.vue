<template>
  <div class="login w-screen h-screen px-4 *flex-center flex-col">
    <var-card>
      <template #title>
        <h1 class="text-4xl text-center font-medium">vgin</h1>
      </template>
      <template #description>
        <var-form ref="form">
          <var-space direction="column" c:p="x-4">
            <var-input
              v-model="formData.username"
              placeholder="用户名"
              :rules="[(v) => checkRequired(v, '用户名'), checkUsername]"
            />
            <var-input
              v-model="formData.password"
              placeholder="密码"
              :rules="[(v) => checkRequired(v, '密码'), checkPassword]"
            />
            <var-space c:p="t-4" justify="space-between">
              <var-button text type="primary" c:p="0">忘记密码</var-button>
              <var-button type="primary" :loading="isFetching" @click="validate">登录</var-button>
            </var-space>
          </var-space>
        </var-form>
        <var-space c:m="!t-2 !l-4">
          <VIcon><IMdiGithub /></VIcon>
          <VIcon><IMdiWechat /></VIcon>
          <VIcon><IMdiGoogle /></VIcon>
        </var-space>
      </template>
    </var-card>
    <p c:text="sm gray-400" c:m="t-2">
      还没账号？
      <var-button text type="primary" c:p="0">注册</var-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useGet } from '@/hooks/useRequest'
import { checkRequired, checkUsername, checkPassword } from '@/utils/verifications'
import { _FormComponent } from '@varlet/ui'
import { LoginResponse } from '@/types/api'

const formData = reactive({
  username: '',
  password: ''
})
const form = ref<_FormComponent | null>(null)

const { data, isFetching, execute } = useGet<LoginResponse>({
  url: 'user/login',
  params: formData
})

const validate = async () => {
  if (!form.value) return
  const flag = await form.value.validate()
  if (flag) {
    await execute()
    if (data.value) {
      console.log(data.value.data)
      useLocalStorage('APP_TOKEN', data.value.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.login :deep(.var-card__floater) {
  @apply px-2 py-6;
}
</style>
