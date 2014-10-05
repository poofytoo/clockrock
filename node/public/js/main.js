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
        $scope.shuttles = data.shuttles;
      })
      .error(function(data, status, headers, config) {
        console.log("Error getting shuttles list: " + data + "; " + status);
      });

    $scope.toggleLight = function() {
      $.post('/toggle');
    };
  });