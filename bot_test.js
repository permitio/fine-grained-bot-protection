const https = require('https');

https.get(process.env.APP_URL, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
}); 