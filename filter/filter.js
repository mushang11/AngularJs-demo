demo.filter('myFormat',['heal',function(heal){
  return function(x){
  return heal.myFunc(x);
  };
}]);

//  严格情境转义
demo.filter('changeShow',['$sce',function($sce){
  return functin(text){
    return $sce.trustAsHtml(text);
  }
}])
