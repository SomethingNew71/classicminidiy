(() => {
  const moduleDependencies = [
    'angular-timeline',
  ];

  function timelineDirective () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'timeline.html',
      controller () {},
    };
  }

  angular
    .module('cmdiy.ngTimeline', moduleDependencies)
    .directive('ngTimeline', timelineDirective);
})();
