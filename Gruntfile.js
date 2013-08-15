module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    	 pkg: grunt.file.readJSON('package.json'),
	 jshint: {
	    options: {
	      curly: true,
	      eqeqeq: true,
	      eqnull: true,
	      browser: true,
	      globals: {
		jQuery: true
	      },
	    },
	    uses_defaults: ['*.js'],
	    with_overrides: {
	      options: {
		curly: false,
		undef: true,
	      },
	      files: {
		src: ['dir3/**/*.js', 'dir4/**/*.js']
	      },
	    }
	  },
	uglify: {
	  options: {
	    // the banner is inserted at the top of the output
	    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
	  dist: {
	    files: {
	      '*.min.js': ['*.js']
	    }
	  }
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
