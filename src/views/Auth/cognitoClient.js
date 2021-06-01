import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_iLiQ0zouT',
  ClientId: '2pvpl8frpion3u3n63tur5v2c6'
};

export default new CognitoUserPool(poolData);
