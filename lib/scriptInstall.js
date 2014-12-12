'use strict';

var grunt = require('grunt');

function ScriptInstall(task) {
	this.task = task;

	this.options = task.options(ScriptInstall.Defaults);
}

ScriptInstall.prototype = {
	run: function () {
		var newHtmlContent = this.getNewHtmlContent();
		if (!newHtmlContent) {
			return;
		}

		grunt.file.write(this.options.html, newHtmlContent);
	},

	getNewHtmlContent: function () {
		var blockData = this.getBlockData();
		if (!blockData) {
			grunt.log.error('The script-install block was not found!');
			return null;
		}

		var injectedHtml = '\n' + this.getScriptTags(blockData.indentation);
		if (this.options.keepWrappings) {
			 injectedHtml = blockData.startBlock + injectedHtml + blockData.indentation + blockData.endBlock;
		}

		return blockData.htmlContent.substr(0, blockData.startIndex) +
				injectedHtml +
				blockData.htmlContent.substr(blockData.endIndex);
	},

	getScriptTags: function (indentation) {
		var scriptTags = '';
		var count = 0;
		this.task.files.forEach(function (file) {
			if (grunt.file.isDir(file.dest)) {
				return;
			}

			scriptTags += indentation + this.getScriptTag(file.dest);
			count += 1;
		}, this);

		grunt.log.ok('Injected ' + count + ' script tags into ' + this.options.html);

		return scriptTags;
	},

	getScriptTag: function (path) {
		return '<script src="' + this.options.prefix + path + '"></script>\n';
	},

	getHtmlContent: function () {
		return grunt.file.read(this.options.html);
	},

	getBlockData: function () {
		var htmlContent = this.getHtmlContent();
		var re = /(([\s\t]*)<!--\s*script-install(\S*)\s*-->)(\n|\r|.)*?(<!--\s*end-script-install\s*-->)/gi;
		var match = re.exec(htmlContent);

		if (!match || match.length < 6) {
			return null;
		}

		return {
			startBlock: match[1],
			endBlock: match[5],
			startIndex: match.index,
			endIndex: match.index + match[0].length,
			htmlContent: htmlContent,
			indentation: match[2].replace(/(\r)|(\n)/g, '')
		}
	}
};

ScriptInstall.Defaults = {
	html: 'index.html',
	prefix: '',
	keepWrappings: true
};

ScriptInstall.taskName = 'scriptInstall';
ScriptInstall.taskDescription = 'Task template';


module.exports = ScriptInstall;