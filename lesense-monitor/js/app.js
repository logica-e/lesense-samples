angular.module('lesenseMonitor', [
  'siTable'
]).config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

angular.module('lesenseMonitor').controller('SensorCtrl', function($scope, $http, $interval, $location) {
  var limit = 10;
  var url = 'https://lesense.logicae.com.br/api/1.0/sensor';

  $scope.params = {};

  function getData() {
    var params = $location.search();
    $http.get(url, {
      params: {
        'token': params['token'],
        'limit': limit,
      }
    }).then(function(ret) {
      $scope.sensor_data = ret.data.items;
    });
  }
  
  $scope.$watch('params.token', getData, true);
  $interval(getData, 5000);
});
