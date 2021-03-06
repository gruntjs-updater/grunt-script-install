/*
 * grunt-script-install
 * https://github.com/patrykziem/grunt-script-install
 *
 * Copyright (c) 2013 Patryk Ziemkowski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		scriptInstall: {
			dev: {
				options: {
					html: 'test/fixtures/index.html'
				},
				files: [
					{
						expand: true,
						cwd: 'test/fixtures',
						src: [
							'scripts/*',
							'scripts/moduleA/**/*',
							'scripts/moduleB/**/*'
						],
						ext: '.js',
						filter: 'isFile'
					}
				]
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'scriptInstall']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
