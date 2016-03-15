/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {

    'use strict';
    angular.module('febatlas').controller('TitleController', TitleController);

    TitleController.$inject = ['TitleService','CommentsService','$location'];

    function TitleController(TitleService,CommentsService,$location) {

        var titleCntl = this;

        titleCntl.sortType = {
            "Year":"Year",
            "imdbRating":"imdbRating",
            "imdbVotes":"imdbVotes"
        };

        titleCntl.sortTitle = function(sortType){
            if(sortType === "Year"){
                titleCntl.titles = _.sortBy(titleCntl.titles, 'year').reverse();
            }
            if(sortType === "imdbRating"){
                titleCntl.titles = _.sortBy(titleCntl.titles, 'imdbRating').reverse();
            }
            if(sortType === "imdbVotes"){
                titleCntl.titles = _.sortBy(titleCntl.titles, 'imdbVotes').reverse();
            }
        };


        titleCntl.filterOptions={
            "value":"",
            "type":""
        };

        titleCntl.titleFilter = function(){
            if(titleCntl.filterOptions.type == "Year"){
                TitleService.getTitleByYear(titleCntl.filterOptions.value)
                    .then(function(data) {
                            titleCntl.titles= data;
                            titleCntl.totalItems = titleCntl.titles.length;
                            titleCntl.currentPage = 1;
                        },
                        function(error) {
                            console.log(error);
                        });
            }
            if(titleCntl.filterOptions.type == "Genre"){
                TitleService.getTitleByGenre(titleCntl.filterOptions.value)
                    .then(function(data) {
                            titleCntl.titles= data;
                            titleCntl.totalItems = titleCntl.titles.length;
                            titleCntl.currentPage = 1;
                        },
                        function(error) {
                            console.log(error);
                        });
            }
            if(titleCntl.filterOptions.type == "Type"){
                TitleService.getTitleByType(titleCntl.filterOptions.value)
                    .then(function(data) {
                            titleCntl.titles= data;
                            titleCntl.totalItems = titleCntl.titles.length;
                            titleCntl.currentPage = 1;
                        },
                        function(error) {
                            console.log(error);
                        });
            }
        };

        titleCntl.titleClearFilter= function(){
            TitleService.getAllTitle()
                .then(function(data) {
                        titleCntl.titles= data;
                        titleCntl.totalItems = titleCntl.titles.length;
                        titleCntl.currentPage = 1;
                        titleCntl.filterOptions.value="";
                        titleCntl.filterOptions.type="";
                    },
                    function(error) {
                        console.log(error);
                    });
        };

        titleCntl.pageChanged = function(){
            titleCntl.searchTitle ="";
        };

        titleCntl.setTitle = function(id){
            $location.path('/titles/'+id);
        };

        function init(){
            TitleService.getAllTitle()
                .then(function(data) {
                        titleCntl.titles= data;
                        titleCntl.totalItems = titleCntl.titles.length;
                        titleCntl.currentPage = 1;
                    },
                    function(error) {
                        console.log(error);
                    });
        }
        init();
    }

})();