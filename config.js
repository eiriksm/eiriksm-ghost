var path = require('path');

var s3 =  {
  active: 's3',
  s3: {
    config: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION
    }
  }
};

module.exports = {
  production: {
    url: 'http://' + process.env.OPENSHIFT_APP_DNS,
    database: {
      client: 'postgres',
      connection: {
        host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
        port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
        user: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
        password: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
        database: process.env.OPENSHIFT_APP_NAME,
        charset: 'utf8'
      }
    },
    server: {
      host: process.env.OPENSHIFT_NODEJS_IP,
      port: process.env.OPENSHIFT_NODEJS_PORT
    },
    mail: {
      transport: 'SMTP',
      options: {
        host: 'smtp.mandrillapp.org',
        service: 'Mandrill',
        port: 587,
        auth: {
          user: process.env.MANDRILL_USER,
          pass: process.env.MANDRILL_KEY
        }
      }
    }
  },
  development: {
        url: 'http://localhost:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        },
        storage: s3
    }
};
