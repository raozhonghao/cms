
angular
    .module('cms', [
        'ngAnimate',
        'ngCookies',
        'ui.router',
        'ui.bootstrap'
    ])
    .run(function($rootScope, $state, $stateParams) {
        'use strict';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider
            .when('', '/')
            .when('/sites', '/websites')
            .when('/sites/:website_id', '/websites/:website_id')
            .otherwise('/');

        $stateProvider
            .state('websites', {
                url: '/websites',
                templateUrl: 'views/websites.html'
            })
            .state('websites.detail', {
                url: '/:website_id',
                templateUrl: 'views/detail.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            });
    });
