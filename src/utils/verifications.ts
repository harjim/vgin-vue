export const checkRequired = (v: any, label: string) => !!v || `${label}不能为空`

export const checkUsername = (v: string): boolean | string => {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/
  if (v.length < 4 || v.length > 16) {
    return '用户名在4~16位之间'
  }
  if (!reg.test(v)) {
    return '用户名由数字、字母、下划线、短横杠组成'
  }
  return true
}

export const checkPassword = (v: string): boolean | string => {
  const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  if (v.length < 6) {
    return '密码不小于6位字符'
  }
  if (!reg.test(v)) {
    return '密码中至少包含1个大写字母、1个小写字母、1个数字、1个特殊字符'
  }
  return true
}
