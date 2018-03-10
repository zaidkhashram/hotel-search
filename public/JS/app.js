var appReq = angular.module("hotelApp", []);
var loaded = false;


appReq.controller('getHotelsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.Offers = null;
  $scope.item = {};
    $http({
     method: 'GET',
     url: '/getHotels',
     params : $scope.item
   //   params:{destinationName: "" , regionIds : "" , minTripStartDate : "" , lengthOfStay : "",minStarRating : "" , maxStarRating:"",
   // maxTotalRate : 5 , minTotalRate : "" , maxGuestRating : 5 , minGuestRating : ""}
     }).then(function successCallback(response) {
       $scope.Offers = response.data.offers.Hotel;
     });

     $scope.submit = function () {
       debugger;
       if($scope.minTripStartDate)
       {
         var date = $scope.minTripStartDate;
         var _month = (date.getMonth()+1) + "",_day=date.getDate() + "";

         if (_month.length == 1) {
           _month = "0" + _month;
         }

         if (_day.length == 1) {
           _day = "0" + _day;
         }

         $scope.item.minTripStartDate = date.getFullYear() + "-" + _month + "-" + _day;
       }

       $http({
        method: 'GET',
        url: '/getHotels',
        params : $scope.item
        }).then(function successCallback(response) {
          $scope.Offers = response.data.offers.Hotel;
        });
     }

}]);
