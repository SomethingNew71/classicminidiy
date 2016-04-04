(() => {
  const moduleDependencies = [
    'ngMaterial',
    'ui.router',
    'cmdiy.routes',
    // 'cmdiy.controllers',
    // 'cmdiy.directives',
  ];

  angular
    .module('cmdiy', moduleDependencies);
})();
