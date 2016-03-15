/**
 * Created by Bhavinkumar on 3/3/2016.
 */

(function() {
    angular.module('febatlas').controller('FooterController', FooterController);

    FooterController.$inject = [];

    function FooterController() {
        var footerCntl = this;
        footerCntl.header ="I am footer";
    }

})();