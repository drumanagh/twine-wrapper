module.exports = function (grunt) {
  grunt.initConfig({
    story: grunt.file.readJSON('story/package.json'),

    // this task is split weirdly like this because of a bug in node-webkit-builder.
    // once that is fixed, they will be one task again.
    nwjs: {
      options: {
        version: '0.16.1',
        appName: '<%= story.window.title %>',
        appVersion: null,
        macIcns: 'story/icon-osx.icns',
        winIco: 'story/icon-win.ico',
        macCredits: 'story/about.html',
        platforms: ['win32', 'win64', 'osx64', 'linux']
      },
      src: ['./bower_components/**/*', './story/**/*']
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
      'darwin-x64': {
        options: {
          archive: 'build/<%= story.window.title %> - OSX64.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/<%= story.window.title %>/osx64/<%= story.window.title %>.app',
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
      'win32-ia32': { cmd: '"build/<%= story.window.title %>/win32/<%= story.window.title %>.exe"' },
      'win32-x64': { cmd: '"build/<%= story.window.title %>/win64/<%= story.window.title %>.exe"' },
      'darwin-ia32': { cmd: '"build/<%= story.window.title %>/osx32/<%= story.window.title %>.app/Contents/MacOS/nwjs"' },
      'darwin-x64': { cmd: '"build/<%= story.window.title %>/osx64/<%= story.window.title %>.app/Contents/MacOS/nwjs"' },
      'linux-ia32': { cmd: '"build/<%= story.window.title %>/linux32/<%= story.window.title %>"' },
      'linux-x64': { cmd: '"build/<%= story.window.title %>/linux64/<%= story.window.title %>"' }
    }
  })

  grunt.loadNpmTasks('grunt-exec')
  grunt.loadNpmTasks('grunt-nw-builder')
  grunt.loadNpmTasks('grunt-contrib-compress')

  grunt.registerTask('default', ['start'])
  grunt.registerTask('build', ['nwjs', 'compress'])

  grunt.registerTask('start', function () {
    switch (process.platform + '-' + process.arch) {
      case 'win32-ia32':
      case 'win32-x64':
      case 'darwin-ia32':
      case 'darwin-x64':
        return grunt.task.run('exec:' + process.platform + '-' + process.arch)
      case 'freebsd-ia32':
      case 'freebsd-ia32':
      case 'linux-ia32':
      case 'linux-x64':
        return grunt.task.run('exec:linux-' + process.arch)
      default:
        return grunt.log.writeln('OS not supported: ' + process.platform + '-' + process.arch + '.')
    }
  })
}
