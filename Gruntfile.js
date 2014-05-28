module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      dist: {
        src: ["build/main-built.js"],
        dest: "public/javascripts/application.js"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "src/*.js"]
    },
    watch: {
      gruntfile: {
        files: "Gruntfile.js",
        tasks: ["jshint:all"]
      },
      sources: {
        files: ["src/*.js"],
        tasks: ["compile"]
      }
    },
    availabletasks: {
      tasks: {}
    },
    bower: {
      install: {
        options: {
          targetDir: "bower_components" }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          mainConfigFile: "src/main.js",
          include: ["../bower_components/requirejs/require.js", ],
          name: "main",
          out: "build/main-built.js",
          optimize: "none",
          paths: {
            jquery: "../bower_components/jquery/jquery"
          }
        }
      }
    }
  });

  grunt.registerTask("init:dev", ["bower"]);
  grunt.registerTask("compile",  ["jshint:all", "requirejs", "concat:dist"]);
  grunt.registerTask("server",   ["compile", "connect", "watch"]);
  grunt.registerTask("tasks",    ["availabletasks"]);
};
