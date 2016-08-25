(() => {
  const moduleDependencies = [];

  colorsController.$inject = ['$scope', 'colorFactory'];
  function colorsController ($scope, colorFactory) {
    const self = $scope;
    self.colors = [];
    self.filterColors = (searchText) => {
      searchText = searchText ? searchText.toLowerCase() : ''; // eslint-disable-line
      return self.colors.filter((color) => {
        const colorName = color.name.toLowerCase();
        return colorName.indexOf(searchText) !== -1;
      });
    };
    console.log(self.colors);
    self.selectColor = (color) => {
      console.log(`Color: ${color}`);
    };

    colorFactory.then((colors) => {
      self.colors = colors;
    }, (err) => {
      console.log(`Error: ${err}`);
    });
  }

  angular
    .module('cmdiy.colors', moduleDependencies)
    .controller('colorsController', colorsController);
})();
