/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {

    'use strict';
    angular.module('febatlas').controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var homeCntl = this;
        homeCntl.myInterval = 3000;
        homeCntl.slides = [
            {image: 'images/banner.jpg', id: 0},
            {image: 'images/banner1.jpg', id: 1},
            {image: 'images/banner2.jpg', id: 2}
        ];
    }

})();