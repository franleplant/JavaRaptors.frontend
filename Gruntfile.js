module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['src/*.js', 'gruntfile.js'],
			options: {

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

	grunt.registerTask('default', ['jshint']);
};
