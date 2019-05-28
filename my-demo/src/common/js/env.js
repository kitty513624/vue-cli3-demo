import proEnv from '../../../config/pro.env';
import uatEnv from '../../../config/uat.env';
import devEnv from '../../../config/dev.env';

let envObj = '';
const env = process.env.NODE_ENV;
switch (env) {
  case 'development':
    envObj = devEnv;
    break;
  case 'test':
    envObj = uatEnv;
    break;
  case 'production':
    envObj = proEnv;
    break;
  default:
    envObj = devEnv;
}
const envObject = envObj;
export { envObject as default };
