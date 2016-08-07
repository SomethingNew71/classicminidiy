(() => {
  const moduleDependencies = [
    'ui.router',
    'cmdiy.controllers',
    'cmdiy.directives',
    'cmdiy.factories',

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
      .state('colors', {
        url: '/colors',
        templateUrl: 'colors.html',
        // controller: 'revisionsController',
      })
      .state('wheels', {
        url: '/wheels',
        templateUrl: 'wheels.html',
        // controller: 'sourcesController',
      });
  }

  angular
    .module('cmdiy.routes', moduleDependencies)
    .config(moduleConfig);
})();
