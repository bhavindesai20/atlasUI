/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {

    'use strict';
    angular.module('febatlas').controller('UserController', UserController);

    UserController.$inject = ['UserService','$rootScope','$http','$location'];

    function UserController(UserService,$rootScope,$http,$location) {

        var userCntl = this;

        userCntl.login = function(){
            UserService.login(userCntl.userCredential)
                .then(function(data) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                    localStorage.setItem("token", 'Bearer '+data.token);
                    return UserService.getUserByEmail(userCntl.userCredential.email);
                }).then(function(data) {
                    $rootScope.user= data;
                    $location.path('/titles');
                })
                .catch(function(error) {
                    alert('Invalid Username Or Password');
                    userCntl.userCredential=null;
                });
        };

        userCntl.logout = function(){
                    $http.defaults.headers.common.Authorization = '';
                    $rootScope.user=null;
                    localStorage.removeItem("token");
        };

        userCntl.signUp = function(){

            UserService.signUp(userCntl.userDetails)
                .then(function(data) {
                    $location.path('/user');
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

    }

})();