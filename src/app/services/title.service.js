(function() {

    angular
        .module('febatlas')
        .service('TitleService', TitleService);

    TitleService.$inject = ['$http','$q'];

    function TitleService($http, $q) {

        var serverTitleEndPoint = 'http://localhost:8083/febatlas/api/titles';
        var self = this;
        var headerConfig ={
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        };
        self.getAllTitle = getAllTitle;
        self.getTitle = getTitle;
        self.addTitle = addTitle;
        self.updateTitle = updateTitle;
        self.deleteTitle = deleteTitle;
        self.getTitleBySerach = getTitleBySerach;
        self.getTitleByType = getTitleByType;
        self.getTitleByYear = getTitleByYear;
        self.getTitleByGenre = getTitleByGenre;


        function getAllTitle(){
            return $http.get(serverTitleEndPoint)
                .then(successFn, errorFn);
        }

        function getTitle(id){
            return $http.get(serverTitleEndPoint+'/'+id)
                .then(successFn, errorFn);
        }

        function addTitle(title) {
            return $http.post(serverTitleEndPoint, title)
                .then(successFn, errorFn);
        }

        function updateTitle(titleId, title) {
            return $http.put(serverTitleEndPoint +'/'+ titleId, title)
                .then(successFn, errorFn);
        }

        function deleteTitle(titleId) {
            return $http.delete(serverTitleEndPoint +'/' + titleId)
                .then(successFn, errorFn);
        }

        function getTitleBySerach(query){
            return $http.get(serverTitleEndPoint +"/titlefilter?title="+query)
                .then(successFn, errorFn);
        }

        function getTitleByType(query){
            return $http.get(serverTitleEndPoint +"/typefilter?type="+query)
                .then(successFn, errorFn);
        }

        function getTitleByYear(query){
            return $http.get(serverTitleEndPoint +"/yearfilter?year="+query)
                .then(successFn, errorFn);
        }

        function getTitleByGenre(query){
            return $http.get(serverTitleEndPoint +"/genrefilter?genre="+query)
                .then(successFn, errorFn);
        }

        function successFn (response) {
            return response.data;
        }

        function errorFn(response) {
            return $q.reject(response.status);
        }


    }

})();