<--angular file inits first-->
var demo = angular.module('demo',[]);
var demoPer = angular.module('demo',[]),permissionList;
demoPer.run (function(permissions){
  permissions.setPermissions(permissionList)
});

angular.element(document).ready(function  () {
 // body...
 $.get('/api/UserPermission',function(data){
     permissionList = data ;
     angular.bootstrap(document,['App']);
 });
});


demo.config(['routeProvider','$locationProvider','httpProvider',function($routeProvider,$locationProvider,$httpProvider){
$routeProvider.when("/index",{templateUrl:'',controller:'',pageTitle:''})
.when('/demo',{templateUrl:'',controller:'',pageTitle:''})
.other({'/noPrivilege'});
$locationProvider.html5Mode(true);
}
]);

demo.config($httpProvider){
 $httpProvider.responseInterceptors.push('securityInterceptor');
};

demo.provider('securityInterceptor',function(){
  this.$get = function($location,$q){
    return function(promise){
      return promise.then(null,function(response){
        if(response.status === 403 || response.status === 401){
          location.path('/noPrivilege');
        }
        return $q.reject(response);
      })
    }
  }
})


demo.run(['$rootScope','$location','$window','$http','$filter',function($rootScope,$location,$window,$http,$filter){
  // route changes successfully.
  $rootScope.$on('$routeChangeSuccess',function(next,current){
    if(current && current.$$route && current.$$route.pageTitle){
      // your own code...
    }
  });
  //route starts privilege limit
  $rootScope.$on('$routeChangeStart',function(scope,next,current){
    var permission = next.$route.permission;
    if(_.isString(permission) && !permissions.hasPermission(permission)){
      location.path('/noPrivilege');
    }
  });
  
  $rootScope.$on('$routeChangeError',function(){
    // route changes error!
  })
  
}]);

