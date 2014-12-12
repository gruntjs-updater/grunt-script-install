# grunt-script-install

> Simple plugin for injecting script tags to your html file.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-script-install --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-script-install');
```

For dependecies to be injected pop this snippet into your html:

```html
<!-- script-install -->
<!-- end-script-install -->
```

## The "scriptInstall" task

### Overview
In your project's Gruntfile, add a section named `scriptInstall` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  scriptInstall: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.html
Type: `String`
Default value: `'index.html'`

A path to html file where script tags will be injected.

#### options.prefix
Type: `String`
Default value: `''`

Additional prefix before the path in script tag, for example `'/scripts'`

### Usage Examples

This is an simple example that will pick up all js files specified and inject them in index.html file.

Assuming this is a project structure:

```
\app
	\scripts
		\moduleA
			fileA1.js
			fileA2.js
		\moduleB
			fileB1.js
		\coffee
			fileCoffee.coffee
		file1.js
	index.html
```

Html file:
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<!-- script-install -->
	<!-- end-script-install -->

</body>
</html>
```

Grunt config:
```js
grunt.initConfig({
  scriptInstall: {
    dev: {
	    options: {
	      html: 'index.html'
	    },
	    files: [
	      {
	        expand: true,
	        cwd: 'app',
	        src: [
	          'scripts/*',
	          'scripts/moduleA/**/*',
	          'scripts/moduleB/**/*',
	          'scripts/coffee/**/*'
	        ],
	        ext: '.js',
	        filter: 'isFile'
	      }
	    ],
    }
  },
});
```

This will generate following html:
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<!-- script-install -->
	<script src="scripts/file1.js"></script>
	<script src="scripts/moduleA/fileA1.js"></script>
	<script src="scripts/moduleA/fileA2.js"></script>
	<script src="scripts/moduleB/fileB1.js"></script>
	<script src="scripts/coffee/fileCoffee.js"></script>
	<!-- end-script-install -->

</body>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
