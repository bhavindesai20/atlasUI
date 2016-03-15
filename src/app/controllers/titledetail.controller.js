/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {

    'use strict';
    angular.module('febatlas').controller('TitleDetailController', TitleDetailController);

    TitleDetailController.$inject = ['$routeParams','TitleService','CommentsService','RatingService','$rootScope'];

    function TitleDetailController($routeParams,TitleService,CommentsService,RatingService,$rootScope) {

        var titleDetailCntl = this;
        titleDetailCntl.comments ="";
        titleDetailCntl.validUser = false;
        titleDetailCntl.yourRate = 0;
        titleDetailCntl.alreadyRated = false;

        titleDetailCntl.giveYourRating = function(value) {
                titleDetailCntl.yourRate = value;
                titleDetailCntl.overStarRate = value;
                if(localStorage.getItem("token")!= null) {
                    var rating = {
                        "rating": value
                    };
                    RatingService.addRating($routeParams.id,$rootScope.user.id,rating)
                        .then(function(data) {
                                titleDetailCntl.alreadyRated = true;
                                titleDetailCntl.yourRate = value;
                            },
                            function(error) {
                                console.log(error);
                            });
                }
                else{
                    alert("please Login for Rate Title");
                    titleDetailCntl.yourRate = 0;
                }
        };


        titleDetailCntl.addComment = function(){
            console.log(titleDetailCntl.newComment);
            CommentsService.addComment($routeParams.id,$rootScope.user.id,titleDetailCntl.newComment)
                .then(function(data) {
                        titleDetailCntl.newComment.comments ="";
                         return CommentsService.getCommentByTitle($routeParams.id);
                    }).then(function(data) {
                        titleDetailCntl.setComments= data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
        };

        function init(){

            TitleService.getTitle($routeParams.id)
                .then(function(data) {
                        titleDetailCntl.setTitle= data;
                    },
                    function(error) {
                        console.log(error);
                    });

            CommentsService.getCommentByTitle($routeParams.id)
                .then(function(data) {
                        titleDetailCntl.setComments= data;
                    },
                    function(error) {
                        console.log(error);
                    });

            RatingService.getTitleAvgRating($routeParams.id)
                .then(function(data) {
                        var avgRating = Math.round(data);
                        titleDetailCntl.rate = avgRating;
                        titleDetailCntl.max = 5;
                    },
                    function(error) {
                        console.log(error);
                    });

            if(localStorage.getItem("token")!= null){
                titleDetailCntl.validUser = true;
                RatingService.getRatingByUserForTitle($rootScope.user.id,$routeParams.id)
                    .then(function(data) {
                            if(data.rating) {
                                console.log('here in dat');
                                titleDetailCntl.alreadyRated = true;
                                titleDetailCntl.yourRate = data.rating;
                            }
                        },
                        function(error) {
                            console.log(error);
                        });
            }

        }

        init();
    }
})();