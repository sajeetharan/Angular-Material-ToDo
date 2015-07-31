
var app = angular.module("todos", ["ngStorage","ngMaterial",'ngMdIcons',]);

app.controller("TaskCtrl",function($scope,$mdDialog, $localStorage,$mdDialog) {

	var imagePath = 'https://material.angularjs.org/latest/img/list/60.jpeg?0';

  

  if (typeof $localStorage.itemList == 'undefined')$localStorage.itemList = "[]";


  $scope.todos = JSON.parse($localStorage.itemList);
  console.log(JSON.stringify($scope.todos));
    $scope.editIndex = 0;

	$scope.add = function() {
		var item = {
			face : imagePath,
			des: $scope.taskDes,
			state: 0,
			date: Date()

		};

		$scope.todos.push(item);
    $scope.updateLocal($scope.todos);
    console.log(JSON.stringify($scope.todos));
	};

	$scope.removeItem = function(index){
        $scope.todos.splice(index, 1);
        $scope.updateLocal($scope.todos);
    };

    $scope.editItem = function(index,event){
        $scope.editIndex = index;
        $scope.showAdvanced(event);
        //$scope.updateLocal();
    };

    $scope.showAdvanced = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'views/edit_item.html',
	      targetEvent: ev,
	    })
	    .then(function(answer) {
        console.log('todos:'+JSON.stringify($scope.todos));
	      $scope.todos[$scope.editIndex].des = answer;
        $scope.updateLocal($scope.todos);
	    }, function() {
	      //$scope.alert = 'You cancelled the dialog.';
	    });
	  };

    $scope.updateLocal = function(items){
      //$localStorage.itemList = "[]";
        $localStorage.itemList = JSON.stringify(items);      
    };
	

});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.edit = function(content) {
  	console.log("task:"+content);
    $mdDialog.hide(content);
  };
}

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
