const { buffer } = require('gulp-util');

(function() {
  var PLUGIN_NAME, fs, gutil, path, spawn, through;

  spawn = require('child_process').spawn;

  through = require('through2');

  fs = require('fs');

  path = require('path');

  gutil = require('gulp-util');

  PLUGIN_NAME = 'gulp-phantom';

  module.exports = function(options) {
    var args, cmnd;
    if (options == null) {
      options = {};
    }
    cmnd = 'phantomjs';
    args = [];
    if (options.cookiesFile) {
      args.push('--cookies-file=' + options.cookiesFile);
    }
    if (options.config) {
      args.push('--config=' + options.config);
    }
    if (options.debug) {
      args.push('--debug=true');
    }
    if (options.diskCache) {
      args.push('--disk-cache=true');
    }
    if (options.ignoreSslErrors) {
      args.push('--ignore-ssl-errors=true');
    }
    if ((options.loadImages != null) && !options.loadImages) {
      args.push('--load-images=false');
    }
    if (options.localStragePath) {
      args.push('--local-storage-path=' + options.localStragePath);
    }
    if (options.localStrageQuota) {
      args.push('--local-storage-quota=' + options.localStrageQuota);
    }
    if (options.localToRemoteUrlAccess) {
      args.push('--local-to-remote-url-access=true');
    }
    if (options.maxDiskCacheSize) {
      args.push('--max-disk-cache-size=' + options.maxDiskCacheSize);
    }
    if (options.outputEncoding) {
      args.push('--output-encoding=' + options.outputEncoding);
    }
    if (options.remoteDebuggerPort) {
      args.push('--remote-debugger-port=' + options.remoteDebuggerPort);
    }
    if (options.remoteDebuggerAutorun) {
      args.push('--remote-debugger-autorun=true');
    }
    if (options.proxy) {
      args.push('--proxy=' + options.proxy);
    }
    if (options.proxyAuth) {
      args.push('--proxy-auth=' + options.proxyAuth);
    }
    if (options.proxyType) {
      args.push('--proxy-type=' + options.proxyType);
    }
    if (options.scriptEncoding) {
      args.push('--script-encoding=' + options.scriptEncoding);
    }
    if ((options.webSecurity != null) && !options.webSecurity) {
      args.push('--web-security=false');
    }
    if (options.sslProtocol) {
      args.push('--ssl-protocol=' + options.sslProtocol);
    }
    if (options.sslCertificatesPath) {
      args.push('--ssl-certificates-path=' + options.sslCertificatesPath);
    }
    if (options.help) {
      args.push('--help');
    }
    if (options.version) {
      args.push('--version');
    }
    // args.push('/dev/stdin');
    // La anterior es la l??nea de c??digo original
    return through.obj(function(file, encoding, callback) {
      var b, cd, ext, program, stdin, str;
      if (file.isNull()) {
        this.push(file);
        return callback();
      }
      if (file.isStream()) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        return callback();
      }
      args.push(file.path); //Con esta inserci??n respaldo el nombre del archivo a ejecutar
      cd = path.dirname(file.path);
      // console.log('Path original: ' + file.path);
      // La anterior era una l??nea de c??digo de comprobaci??n que hab??a insertado
      // para ir analizando el comportamiento del paquete en este punto
      ext = options.ext ? options.ext : '.txt';
      file.path = gutil.replaceExtension(file.path, ext);
      program = spawn(cmnd, args);
      // b = new Buffer(0);
      // La anterior es la l??nea de c??digo original del paquete, la cual est?? desactualizada,
      // por tanto, ya no funcionaba de la manera esperada
      b = new Buffer.alloc(0,'Buffer','utf-8'); // Esta es la l??nea de c??digo que la reemplaza
      program.stdout.on('readable', (function(_this) {
        // console.log('Probando. Args: ' + args + `\n` + ' Path: ' + file.path);
        // L??nea de comprobaci??n
        return function() {
          var chunk, _results;
          _results = [];
          while (chunk = program.stdout.read()) {
            // console.log('Lectura realizada: ' + chunk);
            // L??nea de comprobaci??n
            _results.push(b = Buffer.concat([b, chunk], b.length + chunk.length));
          }
          return _results;
        };
      })(this));
      program.stdout.on('end', (function(_this) {
        return function() {
          // console.log('End detectado...' + options);
          if (options.trim) {
            // b = new Buffer(b.toString('utf8').replace(/[\n\r]+$/m, ''));
            b = new Buffer.from(b.toString('utf8').replace(/[\n\r]+$/m, ''));
          }
          file.contents = b;
          _this.push(file);
          args.pop(); //Con esta l??nea elimino de la pila el nombre del archivo actual,
          // antes de ingresar el nombre del nuevo archivo a evaluar con gulp-phantom;
          // de otro modo, continuar??a evalu??ndose siempre el primer archivo
          return callback();          
        };
      })(this));
      str = file.contents.toString('utf8');
      str = str.replace(/require\('.\//g, "require('" + cd + "/");
      str = str.replace(/require\(".\//g, "require(\"" + cd + "/");
      str = str.replace(/require\('..\//g, "require('" + cd + "/../");
      str = str.replace(/require\("..\//g, "require(\"" + cd + "/../");
      // stdin = new Buffer(str);
      // L??nea de c??digo desactualizada
      stdin = new Buffer.from(str); // L??nea de c??digo actualizada
      return program.stdin.write(stdin, function() {
        return program.stdin.end();
      });
    });
  };

}).call(this);
