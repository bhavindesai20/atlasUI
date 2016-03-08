(function() {

    'use strict';
    angular.module('febatlas').controller('TitleController', TitleController);

    TitleController.$inject = ['TitleService'];

    function TitleController(TitleService) {
        var titleCntl = this;
        init();

        var title = {
            "title": "Avengers: Age of Ultron - gulp",
            "year": "2015",
            "rated": "PG-13",
            "released": "2015-05-01",
            "runtime": "141",
            "genre": "Action, Adventure, Sci-Fi",
            "director": "Joss Whedon",
            "writer": "Joss Whedon, Stan Lee (Marvel comics), Jack Kirby (Marvel comics)",
            "actors": "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans",
            "plot": "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.",
            "language": "English",
            "country": "USA",
            "awards": "1 win & 12 nominations.",
            "poster": "http://ia.media-imdb.com/images/M/MV5BMTU4MDU3NDQ5Ml5BMl5BanBnXkFtZTgwOTU5MDUxNTE@._V1_SX300.jpg",
            "metascore": "66",
            "imdbRating": "7.6",
            "imdbVotes": "370909",
            "imdbID": "tt2395427",
            "type": "movie"
        };

        function init() {
           /* TitleService
                .getAllTitle()
                .then(function(data) {
                        titleCntl.titles = data;
                        console.log(titleCntl.titles);
                    },
                    function(error) {
                        console.log(error);
                    }); */

            TitleService
                .addTitle(title)
                .then(function(data) {
                        titleCntl.titles = data;
                        console.log(titleCntl.titles);
                    },
                    function(error) {
                        console.log(error);
                    });

        }

    }

})();