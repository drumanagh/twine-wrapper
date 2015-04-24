module.exports = function(grunt) {
  grunt.initConfig({
    story: grunt.file.readJSON('story/package.json'),

    // this task is split weirdly like this because of a bug in node-webkit-builder.
    // once that is fixed, they will be one task again.
    nodewebkit: {
      win32: {
        options: {
          version: '0.12.0',
          appName: '<%= story.window.title %>',
          appVersion: null,
          macIcns: 'story/icon-osx.icns',
          winIco: 'story/icon-win.ico',
          macCredits: 'story/about.html',
          platforms: ['win32']
        },
        src: ['./bower_components/**/*', './story/**/*']
      },
      other: {
        options: {
          version: '0.12.0',
          appName: '<%= story.window.title %>',
          appVersion: null,
          macIcns: 'story/icon-osx.icns',
          winIco: 'story/icon-win.ico',
          macCredits: 'story/about.html',
          platforms: ['win64', 'osx', 'linux']
        },
        src: ['./bower_components/**/*', './story/**/*']
      }
    },

    compress: {
      'linux-ia32': {
        options: {
          archive: 'build/<%= story.window.title %> - Linux32.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/linux32/',
            src: ['**']
          }
        ]
      },
      'linux-x64': {
        options: {
          archive: 'build/<%= story.window.title %> - Linux64.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/linux64/',
            src: ['**']
          }
        ]
      },
      'darwin-ia32': {
        options: {
          archive: 'build/<%= story.window.title %> - OSX32.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/osx32/',
            src: ['**']
          }
        ]
      },
      'darwin-x64': {
        options: {
          archive: 'build/<%= story.window.title %> - OSX64.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/osx64/',
            src: ['**']
          }
        ]
      },
      'win32-ia32': {
        options: {
          archive: 'build/<%= story.window.title %> - Win32.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/win32/',
            src: ['**']
          }
        ]
      },
      'win32-x64': {
        options: {
          archive: 'build/<%= story.window.title %> - Win64.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/win64/',
            src: ['**']
          }
        ]
      }
    },

    exec: {
      'win32-ia32':  { cmd: '"build/<%= story.window.title %>/win32/<%= story.window.title %>.exe"' },
      'win32-x64':   { cmd: '"build/<%= story.window.title %>/win64/<%= story.window.title %>.exe"' },
      'darwin-ia32': { cmd: '"build/<%= story.window.title %>/osx32/<%= story.window.title %>.app/Contents/MacOS/nwjs"' },
      'darwin-x64':  { cmd: '"build/<%= story.window.title %>/osx64/<%= story.window.title %>.app/Contents/MacOS/nwjs"' },
      'linux-ia32':  { cmd: '"build/<%= story.window.title %>/linux32/<%= story.window.title %>"' },
      'linux-x64':   { cmd: '"build/<%= story.window.title %>/linux64/<%= story.window.title %>"' }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['start']);
  grunt.registerTask('build', ['nodewebkit', 'compress']);

  grunt.registerTask('start', function() {
    switch (process.platform + '-' + process.arch) {
      case 'win32-ia32':
      case 'win32-x64':
      case 'darwin-ia32':
      case 'darwin-x64':
        return grunt.task.run('exec:' + process.platform + '-' + process.arch);
      case 'freebsd-ia32':
      case 'freebsd-ia32':
      case 'linux-ia32':
      case 'linux-x64':
        return grunt.task.run('exec:linux-' + process.arch);
      default:
        return grunt.log.writeln('OS not supported: ' + process.platform + '-' + process.arch + '.');
    }
  });
};
