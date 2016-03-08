angular.module('febatlas').factory('UserService',['$http','$q',function($http, $q){
    var serverUserEndPoint = 'http://localhost:8083/febatlas/api/users';

    var userRest ={

        getUser : function(id){
            return $http({
                method: 'GET',
                url: serverUserEndPoint + "/"+id
            });
        },

        addUser : function(user){
            return $http({
                method: 'POST',
                url: serverUserEndPoint,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:user
            });
        },

        updateUser : function(user){
            return $http({
                method: 'PUT',
                url: serverUserEndPoint,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:user
            });
        },

        deleteUser : function(id){
            return $http({
                method: 'DELETE',
                url: serverUserEndPoint + "/"+id
            });
        }
    };

    return userRest;
}]);