/**
 * 区分本地开发环境、打包环境
 */
export const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
export const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
