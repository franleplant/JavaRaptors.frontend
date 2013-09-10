module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: [
				'app/scripts/**/*.js',
				'!app/scripts/vendor/*.js',
				'test/e2e/*js',
				'test/unit/*js',
				'app/dbmock/*.json',
				'gruntfile.js',
				'package.json'
			],
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
				unused: false,
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
					jQuery: true,
					$: true,
					jraptors: true,
					angular: true,
					//For testing
					describe: true,
					it: true,
					beforeEach: true,
					inject: true,
					module: true,
					afterEach: true,
					expect: true,
					repeater: true,
					element: true,
					input: true,
					browser: true
				}
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 9000,
					base: './'
				}
			}
		},


		karma: {
			dev: {
				configFile: 'config/karma.conf.js',
				singleRun: false
			}
		},
		watch: {
			all: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default',[ 'connect']);

};
