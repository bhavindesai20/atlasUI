angular.module('febatlas').factory('RatingService',['$http','$q',function($http, $q){
    var serverRatingEndPoint = 'http://localhost:8083/febatlas/api/rating';

    var ratingRest ={

        addRating : function(titleId,userId,rating){
            return $http({
                method: 'POST',
                url: serverRatingEndPoint+"/"+titleId+"/"+userId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:rating
            });
        },

        getRatingByTitle : function(titleId){
            return $http({
                method: 'GET',
                url: serverRatingEndPoint +"/title/"+titleId
            });
        },

        getRatingByUser : function(userId){
            return $http({
                method: 'GET',
                url: serverRatingEndPoint +"/user/"+userId
            });
        },

        getTitleAvgRating : function(titleId){
            return $http({
                method: 'GET',
                url: serverRatingEndPoint +"/"+titleId
            });
        }
    };

    return ratingRest;
}]);