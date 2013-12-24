'use strict';

var grunt = require('grunt');

function ScriptInstall(task) {
	this.task = task;

	this.options = task.options(ScriptInstall.Defaults);
}

ScriptInstall.prototype = {
	run: function () {
		var htmlContent = grunt.file.read(this.options.html);

		var re = /(([\s\t]*)<!--\s*script-install(\S*)\s*-->)(\n|\r|.)*?(<!--\s*end-script-install\s*-->)/gi;
		var match = re.exec(htmlContent);

		if (!match) {
			return;
		}

		var tabsMatch = match[1].match(/\t/gi);
		var tabs = '';
		if (tabsMatch) {
			tabs = (new Array(tabsMatch.length + 1)).join('\t');
		}

		var injectedHtml = match[1] + '\r\n';

		this.task.files.forEach(function (file) {
			file.src.forEach(function (src) {
				if (!src) {
					return;
				}

				injectedHtml += tabs + '<script src="' + src + '"></script>\r\n';
			}, this);
		}, this);

		injectedHtml += tabs + match[5];

		var newHtmlContent = htmlContent.substr(0, match.index) + injectedHtml +
				htmlContent.substr(match.index + match[0].length);

		grunt.file.write(this.options.html, newHtmlContent);
	}
};

ScriptInstall.Defaults = {

};

ScriptInstall.taskName = 'scriptInstall';
ScriptInstall.taskDescription = 'Task template';


module.exports = ScriptInstall;