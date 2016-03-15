/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {
    angular.module('febatlas').controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope','$rootScope','$http','$location'];

    function HeaderController($scope,$rootScope,$http,$location) {

        $scope.isLogin = function(){
            if($rootScope.user != null){
               return true;
            }
            return false;
        };

        $scope.isAdmin = function(){
            if($rootScope.user != null && $rootScope.user.firstName == "Bhavin"){
                return true;
            }
            return false;
        };

        $scope.logout = function(){
            $http.defaults.headers.common.Authorization = '';
            $rootScope.user= null;
            localStorage.removeItem("token");
            $location.path('/titles');

        };



    }

})();