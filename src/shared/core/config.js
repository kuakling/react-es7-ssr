export default {
  appContainerId: 'react-root',
  baseUrl: process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}` : '',
  auth: {
    storageName: 'appJWT'
  },
  jwt: {
    secretKey: 'MY_SCRECRET'
  },
  apollo: {
    // uri: process.env.REACT_APP_APOLLO_URI
    // uri: IS_SERVER ? 'http://graphql:3001/graphql' : 'http://localhost/graphql'
    // uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
    uri: 'http://localhost:4001/graphql'
  },
  upload: {
    baseUrl: 'http://localhost:4001',
    single: 'upload-single',
    multiple: 'upload-multiple',
    folder: 'uploads',
  },
  modules: {
    user: {
      link: '/user',
      // auth: {
      //   loginBy: 'ldap', //db or ldap
      //   ldap: {
      //     server: ['dc2.psu.ac.th','dc7.psu.ac.th','dc1.psu.ac.th'],
      //     basedn: 'dc=psu,dc=ac,dc=th',
      //     domain: 'psu.ac.th',
      //   },
      // },
      upload: {
        path: 'user',
      },
      avatar: {
        path: 'avatars',
        aspectRatio: 1,
        size: {
          width: 300,
          height: 300,
        }
      },
      cover: {
        path: 'covers',
        aspectRatio: 16 / 6,
        size: {
          width: 1024,
          height: 383,
        }
      },
    }
  }
}