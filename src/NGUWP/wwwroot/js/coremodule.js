define(function () {
    var coreModule = angular.module("coreModule", ["ui.router", "ngAnimate"]);

    coreModule.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /index
        $urlRouterProvider.otherwise("/index");
        //
        // Set up the states
        $stateProvider
            .state('index', {
                url: "/index",
                controller: "indexController as indexCtrl",
                templateUrl: "views/index.html"
            })
            .state('item', {
                url: "/item/:id",
                controller: "itemController as itemCtrl",
                templateUrl: "views/item.html"
            });
    });

    coreModule.controller("indexController", function ($scope, dataService) {

        var $this = this;
        $this.posts = [];

        var promise = dataService.getList();
        promise.success(function (result) {
            // Success Callback
            $this.posts = result.books;
            //console.log(result.books);
        }).catch(function (error) {
            // Error Callback
            console.log(error);
        }).finally(function () {
            // Gets executed no matter what
        });

    });

    coreModule.controller("itemController", function ($stateParams, dataService) {

        var $this = this;
        $this.post = {};

        var promise = dataService.getEntity($stateParams.id);
        promise.success(function (result) {
            // Success Callback
            $this.post = result;
            //console.log(result);
        }).catch(function (error) {
            // Error Callback
            console.log(error);
        }).finally(function () {
            // Gets executed no matter what
        });
    });

    coreModule.directive("myWaterfall", function ($window) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                source: "="
            },
            templateUrl: "views/waterfall.html",
            controller: function ($scope, $element) {

                //console.log("myWaterfall controller");

                var $this = this;

                $this.config = {
                    colWidth: 300,
                    margin: 20,
                    blocks: []
                };
            },
            controllerAs: "myWaterfallCtrl",
            compile: function (tElement, tAttrs) {
                //console.log("myWaterfall compile");

                tElement.css({
                    "position": "relative"
                });

                return {
                    pre: function (scope, iElement, tAttrs) {
                        //console.log("myWaterfall pre");
                    },
                    post: function (scope, iElement, iAttrs) {

                        //console.log("myWaterfall post");

                        setupBlocks();

                        angular.element($window).resize(function () {
                            scope.$apply(function () {
                                setupBlocks();
                            });
                        });

                        function setupBlocks() {
                            scope.myWaterfallCtrl.config.blocks = [];

                            var containerWidth = iElement.innerWidth();
                            var colCount = Math.floor(containerWidth / (scope.myWaterfallCtrl.config.colWidth + scope.myWaterfallCtrl.config.margin));
                            for (var i = 0; i < colCount; i++) {
                                scope.myWaterfallCtrl.config.blocks.push(scope.myWaterfallCtrl.config.margin);
                            }
                        }
                    }
                }
            }
        };
    });

    coreModule.directive("myWaterfallItem", function () {
        return {
            restrict: "A",
            replace: false,
            require: "^myWaterfall",
            compile: function (tElement, tAttrs) {

                //console.log("myWaterfallItem compile");

                tElement.css({
                    "position": "absolute"
                });

                angular.element(tElement.children()[0]).css({
                    "margin": "0 auto"
                });

                return {
                    pre: function (scope, iElement, tAttrs) {
                        //console.log("myWaterfallItem pre");
                    },
                    post: function (scope, iElement, iAttrs, myWaterfallCtrl) {

                        //console.log("myWaterfallItem post");

                        scope.$watch("myWaterfallCtrl.config.blocks", function (newValue, oldValue) {
                            applyBlocks();
                        });

                        function applyBlocks() {
                            Array.min = function (array) {
                                return Math.min.apply(Math, array);
                            };

                            var config = myWaterfallCtrl.config;

                            var min = Array.min(config.blocks);
                            var index = $.inArray(min, config.blocks);
                            var leftPos = config.margin + (index * (config.colWidth + config.margin));

                            iElement.css({
                                "left": leftPos,
                                "top": min,
                                "width": config.colWidth
                            });
                            config.blocks[index] = min + iElement.outerHeight() + config.margin;
                        }
                    }
                }
            }
        };
    });

    coreModule.service("dataService", function ($http) {

        this.getList = function () {
            return $http.get("http://localhost:26002/api/values");
        };

        this.getEntity = function (id) {
            return $http.get("http://localhost:26002/api/values/" + id);
        };

    });

})



