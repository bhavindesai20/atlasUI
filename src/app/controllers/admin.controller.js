/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {

    'use strict';
    angular.module('febatlas').controller('AdminController', AdminController);

    AdminController.$inject = ['TitleService', '$location','$scope'];

    function AdminController(TitleService,$location,$scope) {
        var adminCntl = this;

        adminCntl.addTitle = function(){

            TitleService.addTitle(adminCntl.newTitle)
                .then(function(data) {
                        return TitleService.getAllTitle();
                })
                .then(function(data) {
                    adminCntl.titles= data;
                    adminCntl.newTitle="";
                    $scope.addTitleForm.$setPristine();
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        adminCntl.updateTitle = function(){

            TitleService
                .updateTitle(adminCntl.newTitle.id,adminCntl.newTitle)
                .then(function(data) {
                        adminCntl.newTitle="";
                        adminCntl.submitUpdate = false;
                        $scope.addTitleForm.$setPristine();
                        return TitleService.getAllTitle();
                })
                .then(function(data) {
                    adminCntl.titles= data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        adminCntl.submitTitle = function(isValid){
            if (isValid && !adminCntl.newTitle.id) {
                adminCntl.addTitle();
            }
            else{
                adminCntl.updateTitle();
            }
        };

        adminCntl.editTitle=function(title){
            adminCntl.submitUpdate = true;
            adminCntl.newTitle = title;
        };

        adminCntl.deleteTitle = function(titleId){
            TitleService
                .deleteTitle(titleId)
                .then(function(data) {
                        return TitleService.getAllTitle();
                        console.log(data);
                })
                .then(function(data) {
                    adminCntl.titles= data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        function init(){
            adminCntl.submitUpdate = false;
            TitleService.getAllTitle()
                .then(function(data) {
                        adminCntl.titles= data;
                    },
                    function(error) {
                        console.log(error);
                    });
        }
        init();





    }
})();