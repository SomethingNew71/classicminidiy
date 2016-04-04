(() => {
  const moduleDependencies = [
    'ui.router',
    // 'cmdiy.routes',
    // 'cmdiy.controllers',
    // 'cmdiy.directives',


  ];

  moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function moduleConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html',
        // controller: 'timelineController',
      })
      .state('history', {
        url: '/history',
        templateUrl: 'history.html',
        // controller: 'sourcesController',
      })
      .state('techspecs', {
        url: '/techspecs',
        templateUrl: 'techspecs.html',
        // controller: 'revisionsController',
      });
  }

  angular
    .module('cmdiy.routes', moduleDependencies)
    .config(moduleConfig);
})();
