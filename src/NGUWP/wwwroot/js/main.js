require.config({
    paths: {
        "angular": "../lib/angular/angular",
        "uirouter": "../lib/angular-ui-router/release/angular-ui-router",
        "ngAnimate": "../lib/angular-animate/angular-animate",
        "jquery": "../lib/jquery/dist/jquery",
        "app": "app",
        "coreModule": "coreModule"
    },
    shim: {
        "app": {
            deps: ["angular", "uirouter", "ngAnimate", "coreModule"]
        },
        "angular": {
            deps: ["jquery"]
        },
        "uirouter": {
            deps: ["angular"]
        },
        "ngAnimate": {
            deps: ["angular"]
        },
        "coreModule": {
            deps: ["angular"]
        }
    }
})

// bootstrapping for the module for document
require(["app"], function () {
    angular.bootstrap(document, ["app"]);
})