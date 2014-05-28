module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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
          include: ["../bower_components/requirejs/require.js"],
          name: "main",
          out: "dist/async-gist.js",
          optimize: "none",
          paths: {
            jquery: "../bower_components/jquery/jquery"
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
         "dist/async-gist.min.js": ["dist/async-gist.js"]
        }
      }
    }
  });

  grunt.registerTask("init:dev", ["bower"]);
  grunt.registerTask("compile",  ["jshint:all", "requirejs", "uglify:dist"]);
};
