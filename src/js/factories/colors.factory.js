(() => {
  const moduleDependencies = [];

  colorFactory.$inject = ['$q', '$http'];

  function colorFactory ($q, $http) {
    const deferred = $q.defer();

    $http.get('/js/data/colors.json')
      .success((colors) => {
        deferred.resolve(colors);
      })
      .error((err) => {
        console.log('Error getting colors.', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  angular
    .module('cmdiy.colorFactory', moduleDependencies)
    .factory('colorFactory', colorFactory);
})();
