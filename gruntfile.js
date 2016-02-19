module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					sourceComments: 'map',
					includePaths: require('node-bourbon').includePaths
				},
				files: {
					'css/style.css': 'css/src/style.scss'
				}
			}
		},

		cssmin: {
			css:{
				src: 'css/style.css',
				dest: 'css/style.min.css'
			}
		},

		jshint: {
			beforeconcat: ['js/*.js']
		},

		concat: {
			dist: {
				src: [
			 	'js/src/*',
			 	'js/src/data/*',
			 	'js/src/classes/*',
			 	'js/src/controllers/*',
			 	'js/src/langs/*',

				],
				dest: 'js/script.js'
			}
		},

		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'js/sourcemap.map'
				},
				files: {
					'js/script.min.js': ['js/script.js']
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: [
				 	'js/src/*',
				 	'js/src/classes/*',
				 	'js/src/controllers/*',
				 	'js/src/langs/*',
				 	'js/src/data/*',
				],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['css/src/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false,
				}
			},
			php: {
				files: ['*.php'],
				options: {
					spawn: false
				}
			},
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: './'
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
};
