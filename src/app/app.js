/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {
    'use strict';
     angular.module('febatlas', ['ngRoute', 'ui.bootstrap','ngMessages'])
            .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider'];

    function moduleConfig($routeProvider) {
        $routeProvider
            .when('/titles', {
                templateUrl: '/views/title.tmpl.html',
                controller: 'TitleController',
                controllerAs: 'titleCntl'
            })
            .when('/titles/:id', {
                templateUrl: '/views/title-detail.tmpl.html',
                controller: 'TitleDetailController',
                controllerAs: 'titleDetailCntl'
            })
            .when('/home', {
                templateUrl: '/views/home.tmpl.html',
                controller: 'HomeController',
                controllerAs: 'homeCntl'
            })
            .when('/admin', {
                templateUrl: '/views/admin.tmpl.html',
                controller: 'AdminController',
                controllerAs: 'adminCntl'
            })
            .when('/user', {
                templateUrl: '/views/user.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userCntl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
})();