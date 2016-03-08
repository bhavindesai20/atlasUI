angular.module('febatlas').factory('CommentsService',['$http','$q',function($http, $q){
    var serverCommentEndPoint = 'http://localhost:8083/febatlas/api/comments';

    var commandRest ={

        addComment : function(titleId,userId,comment){
            return $http({
                method: 'POST',
                url: serverCommentEndPoint+"/"+titleId+"/"+userId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:comment
            });
        },
        updateComment : function(titleId,userId,comment){
            return $http({
                method: 'POST',
                url: serverCommentEndPoint+"/"+titleId+"/"+userId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:comment
            });
        },
        deleteComment : function(titleId,userId,commentId){
            return $http({
                method: 'DELETE',
                url: serverCommentEndPoint+"/"+titleId+"/"+userId+"/"+commentId
            });
        },

        getCommentByTitle : function(titleId){
            return $http({
                method: 'GET',
                url: serverCommentEndPoint +"/title/"+titleId
            });
        },

        getCommentByUser : function(userId){
            return $http({
                method: 'GET',
                url: serverCommentEndPoint +"/user/"+userId
            });
        }
    };

    return commandRest;
}]);