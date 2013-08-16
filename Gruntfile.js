module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['js/*.js', 'gruntfile.js'],
			options: {

			}
		},
		karma: {
			unit: {
				browsers: ['PhantomJS'],
				runnerPort: 9999,
				colors: true,
				autoWatch: true
			},
			options: {
				files: ['test/*.js']
			}
		},
		watch: {
			all: {
				files: ['<%= jshint.files %>'],
				tasks: ['default']
			}		
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['jshint', 'karma']);
};
