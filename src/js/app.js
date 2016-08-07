(() => {
  const moduleDependencies = [
    'ngMaterial',
    'ui.router',
    'cmdiy.routes',
    'cmdiy.controllers',
    'cmdiy.directives',
    'cmdiy.factories',
  ];

  angular
    .module('cmdiy', moduleDependencies);
})();
