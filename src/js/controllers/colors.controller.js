(() => {
  const moduleDependencies = [
    'cmdiy.colorFactory',
  ];
  colorsController.$inject = ['$scope', 'ColorFactory'];
  function colorsController ($scope, ColorFactory) {
    const self = $scope;
    self.colors = [];

    self.filterColors = (searchText) => {
      searchText = searchText ? searchText.toLowerCase() : '';
      return self.colors.filter((color) => {
        const colorName = color.name.toLowerCase();
        return colorName.indexOf(searchText) !== -1;
      });
    };

    self.selectColor = (color) => {
      console.log(`Color: ${color}`);
    };

    ColorFactory.then((colors) => {
      self.colors = colors;
    }, (err) => {
      console.log(`Error: ${err}`);
    });
  }

  angular
    .module('cmdiy.colors', moduleDependencies)
    .controller('colorsController', colorsController);
})();
