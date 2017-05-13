﻿(function (global) {
    var map = {
        'app': 'app',
        '@angular': 'js/@angular',
        'rxjs': 'js/rxjs'
    };

    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };

    var ngPackagesNames = [
        'common',
        'compiler',
        'core',
        'http',
        'forms',
        'router',
        'platform-browser',
        'platform-browser-dynamic',
        'upgrade'
    ];

    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'index.js', defaultExtension: 'js'
        };
    }

    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {
            main: '/bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    }

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    ngPackagesNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);