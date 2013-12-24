/*
 * grunt-script-install
 * https://github.com/patrykziem/grunt-script-install
 *
 * Copyright (c) 2013 Patryk Ziemkowski
 * Licensed under the MIT license.
 */

'use strict';

var ScriptInstall = require('../lib/scriptInstall');

module.exports = function (grunt) {
	grunt.registerMultiTask(ScriptInstall.taskName, ScriptInstall.taskDescription, function () {
		var task = new ScriptInstall(this);

		task.run();
	});
};
