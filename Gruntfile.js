module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['js/*.js', 'gruntfile.js'],
			options: {
				// check http://www.jshint.com/docs/options/#bitwise
				bitwise: true,
				camelcase: false,
				curly: true,
				eqeqeq: true,
				es3: false,
				forin: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: false,
				plusplus: false,
				quotmark: true,
				undef: true,
				unused: 'strict',
				strict: false,
				trailing: true,
				maxparams: false,
				maxdepth: false,
				maxstatements: false,
				maxcomplexity: false,
				maxlen: false,
				browser: true,
				devel: true,
				

				// Global Variables permitted
				globals: {
					module: true,
					jQuery: true,
					$: true,
					'las de angular': true
				}
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
