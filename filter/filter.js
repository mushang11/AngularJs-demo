demo.filter('myFormat',['heal',function(heal){
  return function(x){
  return heal.myFunc(x);
  };
}]);
