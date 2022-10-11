import NProgress from 'nprogress'
import { LocationQueryRaw, stringifyQuery } from 'vue-router'
import { MaybeRef, isObject } from '@vueuse/core'

type RequestParams = {
  url: string
  params?: MaybeRef<unknown>
  showProgress?: boolean
}

const router = useRouter()

const useRequest = createFetch({
  baseUrl: import.meta.env.APP_BASE_URL,
  options: {
    immediate: false,
    timeout: 6000,
    beforeFetch({ options }) {
      const token = useStorage('APP_TOKEN', null)
      if (token.value) {
        options.headers = Object.assign(options.headers || {}, {
          Authorization: `Bearer ${token}`
        })
      }
      return { options }
    },
    afterFetch({ data, response }) {
      if (!data.status && data.code === 200 && response.status === 200) {
        Snackbar.error(data.msg || '连接错误，请稍后重试')
        data = {}
      } else if (response.status === 401 || data.code === 401) {
        Snackbar.error(data.msg || '登录过期，请重新登录')
        useTimeoutFn(() => {
          router.push('/login')
        }, 1500)
        data = {}
      } else if (response.status === 403 || data.code === 403) {
        Snackbar.error(data.msg || '无权限访问')
        data = {}
      } else if (response.status === 404 || data.code === 404) {
        Snackbar.error(data.msg || '找不到资源')
        data = {}
      } else if (response.status === 500 || data.code === 500) {
        Snackbar.error(data.msg || '服务器错误，请稍后重试')
        data = {}
      } else {
        Snackbar.error('未知错误，请联系管理员')
        data = {}
      }

      import.meta.env.MODE === 'development' && console.log('result: ', data)

      return { data }
    },
    onFetchError(ctx) {
      return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

export const useGet = <T = unknown>(config: RequestParams) => {
  const _url = computed(() => {
    const _url = unref(config.url)
    const _params = unref(config.params)
    const queryString = isObject(_params)
      ? stringifyQuery(_params as LocationQueryRaw)
      : _params || ''
    return `${_url}${queryString ? '?' : ''}${queryString}`
  })

  return useRequest<T>(_url, {
    beforeFetch() {
      if (config.showProgress) {
        NProgress.start()
      }
    },
    afterFetch(ctx) {
      if (config.showProgress) {
        NProgress.done()
      }
      return ctx
    }
  }).json()
}

export const usePost = (config: RequestParams) => {
  return useRequest(config.url, {
    beforeFetch() {
      if (config.showProgress) {
        NProgress.start()
      }
    },
    afterFetch(ctx) {
      if (config.showProgress) {
        NProgress.done()
      }
      return ctx
    }
  }).post(config.params)
}

export const usePut = (config: RequestParams) => {
  return useRequest(config.url).put(config.params)
}

export const useDel = (config: RequestParams) => {
  return useRequest(config.url).delete(config.params)
}

export default useRequest
