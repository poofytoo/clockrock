// $('.shuttle-select').click(function() {
//   var tag = $(this).attr('data-id');
//   var title = $(this).attr('data-name');
//   console.log(tag, title);
//   $.ajax({
//     type: 'POST',
//     url: '/setShuttle',
//     data: {tag: tag, title: title},
//     dataType: 'json'});
// });

angular.module('clockrock', [])
  .controller('ShuttleController', function($scope, $http) {
    $http.post('/getShuttles', {})
      .success(function(data, status, headers, config) {
        console.log('hey');
        $scope.shuttles = data.shuttles;
        console.log($scope.shuttles);
      })
      .error(function(data, status, headers, config) {
        console.log("Error getting shuttles list: " + data + "; " + status);
      });

    $scope.toggleLight = function() {
      $.post('/toggle', {hey: 'hello'}, function(data) {
        console.log(data);
      });
    };
  });