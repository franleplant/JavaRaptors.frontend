module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/scripts/vendor/angular-1.1.5.js',
      'app/scripts/vendor/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/scripts/vendor/jquery-2.0.3.js',
      'app/scripts/vendor/bootstrap.js',
      'app/scripts/vendor/ui-bootstrap-tpls-0.6.0.js',
      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
