module.exports = function(grunt) {

	var apiMocker = require('./api/api-mocker');

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
				newcap: false,
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
					xdescribe: true,
					it: true,
					beforeEach: true,
					inject: true,
					module: true,
					afterEach: true,
					expect: true,
					repeater: true,
					element: true,
					input: true,
					browser: true,
					require: true,
					__dirname: true,
					waitsFor: true,
					runs: true
				}
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 9000,
					base: './',

					// for more info go to https://github.com/sahibinden/connect-api-mocker
					middleware: function(connect, options) {

						var middlewares = [];

						// mock/rest directory will be mapped to your fake REST API
						middlewares.push(apiMocker(
							'/api',
							'/api'
						));

						// Static files
						middlewares.push(  connect.static(options.base)  );
						middlewares.push(  connect.static(__dirname)  );

						return middlewares;
					}
				}
			}
		},


		karma: {
			unit: {
				configFile: 'config/karma.conf.js',
				background: true
			}
		},


		watch: {
			options: {
				spawn: false
			},
			lint: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},
			unit: {
				files: ['<%= jshint.files %>'],
				tasks: ['karma:unit:run']
			}
		},
		concurrent: {
			dev: ['connect','dev'],
			options: {
				logConcurrentOutput: true
			}
		}
	});


	grunt.loadNpmTasks('grunt-concurrent');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('dev',['karma:unit', 'watch']);

	grunt.registerTask('default', ['concurrent:dev']);
};
