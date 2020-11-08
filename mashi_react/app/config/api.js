import { isDev } from '../utils/env'

const prefix = isDev ? '/api' : ''
export const API_getList = `${prefix}/get/list`
