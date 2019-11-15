#! node
const express = require('express');
const proxy = require('http-proxy-middleware');
const program = require('commander');
const { name, version } = require('./package.json');

const app = express();
program.version(version);
program.name(name);
program.alias('ss');
program.description('a server for spa production test');
program.option('-p, --port <number>', 'set the server port', 8080);
program.option('-l, --logLevel <string>', 'set the server port', 'debug');
program.option('--prefix <string>', 'set proxy prefix', '/api');
program.option('-r --rewrite', 'rewrite the prfix when proxy', true);
program.option(
  '-f --fallback',
  'the index.html page will likely have to be served in place of any 404 responses',
  true,
);
program.option('-t, --target <string>', 'set the proxy target url');

program.parse(process.argv);

app.use(express.static(process.cwd()));

if (program.target) {
  const proxyOptions = {
    target: program.target,
    logLevel: program.logLevel,
  };

  if (program.rewrite) {
    proxyOptions.pathRewrite = {
      [`^${program.prefix}`]: '',
    };
  }

  app.use(program.prefix, proxy(proxyOptions));
}

if (program.target && program.fallback) {
  app.use('/', (req, res) => {
    res.sendFile(`${process.cwd()}/index.html`);
  });
}

app.listen(program.port, (err) => {
  if (err) {
    throw err;
  }

  // eslint-disable-next-line no-console
  console.log(`the server is running at ${program.port} .....`);
});
