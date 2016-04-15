(() => {
  const moduleDependencies = [
    'angular-timeline',
  ];

  function timelineDirective () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'timeline.html',
      controllerAs: 'vm',
      controller () {
        const vm = this;
        vm.events = [{
          badgeClass: 'info',
          badgeIconClass: 'glyphicon-check',
          title: 'First heading',
          content: 'Some awesome content.',
        }, {
          badgeClass: 'warning',
          badgeIconClass: 'glyphicon-credit-card',
          title: 'Second heading',
          content: 'More awesome content.',
        }];
      },
    };
  }

  angular
    .module('cmdiy.ngTimeline', moduleDependencies)
    .directive('ngTimeline', timelineDirective);
})();
