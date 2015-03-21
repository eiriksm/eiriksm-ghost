// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    url = require('url'),
    config;
var dbUrl = url.parse(process.env.DATABASE_URL);
var dbAuth = dbUrl.auth.split(':');
var pgdb = {
  client: 'postgres',
  connection: {
    host: dbUrl.hostname,
    user: dbAuth[0],
    password: dbAuth[1],
    database: dbUrl.pathname.substring(1),
    port: dbUrl.port,
    ssl: true
  }
}
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
}
config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://my-ghost-blog.com',
        mail: {},
        database: pgdb,

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.PORT || '2368'
        },
        storage: s3,
        paths: {
          contentPath: path.join(__dirname, '/content/')
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: pgdb,
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        storage: s3,
        paths: {
          contentPath: path.join(__dirname, '/content/')
        }
    },

};

// Export config
module.exports = config;
