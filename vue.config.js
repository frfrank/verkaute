const bodyParser = require('body-parser');
const file = require("./src/assets/offlineData.json");

module.exports = {
  publicPath: process.env.BASE_URL,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  lintOnSave: true,

  configureWebpack: {
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  },


 /* css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style/_global.scss";
        `,
      },
    },
  },*/

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: `'http://localhost:8090/'`,
      },
    },

    before: (app) => {
      if (process.env.NODE_ENV !== `'offline'`) {
        return;
      }

      app.use(bodyParser.json());

      app.get('/api/caseStudies/*', (req, res) => {
        res.json(file['GET /api/caseStudies/*']);
      });
      app.get('/api/ranking/case/*', (req, res) => {
        res.json(file['GET /api/ranking/case/*']);
      });
      app.get('/api/rankinguser/case/*', (req, res) => {
        res.json(file['GET /api/rankinguser/case/*']);
      });


      app.get('/api/users/profile', (req, res) => {
        const user = { ...file['GET /api/users/profile'] };

        if (req.headers.authorization.includes('ADMIN')) {
          user.isAdmin = true;
        }

        res.json(user);
      });

      app.post('/api/login', (req, res) => {
        const auth = { ...file[`POST ${req.path}`] };

        if (req.body.email.includes('admin')) {
          auth.token = 'OFFLINE_ADMIN_TOKEN';
        }

        res.json(auth);
      });

      app.put('/api/users/profile', (req, res) => {
        res.json(file[`GET ${req.path}`]);
      });

      app.get('/api/*', (req, res) => {
        res.json(file[`GET ${req.path}`]);
      });

      app.post('/api/*', (req, res) => {
        res.json(file[`POST ${req.path}`] || true);
      });

      app.put('/api/*', (req, res) => {
        res.json(file[`PUT ${req.path}`] || true);
      });

      app.delete('/api/*', (req, res) => {
        res.json(file[`DELETE ${req.path}`]);
      });
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
