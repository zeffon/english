/**
 * System env config
 */
import { devConf } from './dev'
import { prodConf } from './prod'

const env = process.env.NODE_ENV
const CONFIG = env === 'production' ? prodConf : devConf

export default CONFIG
