/**
 * Created by Bhavinkumar on 3/3/2016.
 */

angular.module('febatlas').service('UserService', UserService);

UserService.$inject = ['$http','$q'];

function UserService($http, $q) {

    var serverUserEndPoint = 'http://localhost:8080/febatlas';
    var self = this;
    self.login = login;
    self.getUserByEmail = getUserByEmail;
    self.signUp=signUp;

    function login(user){
        return $http.post(serverUserEndPoint+'/users/login', user)
            .then(successFn, errorFn);
    }

    function getUserByEmail(email){
        return $http.get(serverUserEndPoint+'/api/users/email/'+email+'/')
            .then(successFn, errorFn);
    }
    function signUp(user){
        return $http.post(serverUserEndPoint+'/users', user)
            .then(successFn, errorFn);
    }

    function successFn (response) {
        return response.data;
    }

    function errorFn(response) {
        return $q.reject(response.status);
    }

}
