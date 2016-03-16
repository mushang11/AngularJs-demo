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

//权限控制
//1.UI 处理（根据当前用户的权限，判断页面上的一些内容是否显示）
//2.路由处理（当用户访问一个它没有权限访问的url,跳转到一个没有权限的错误提示界面）
//3.HTTP请求处理（当我们发送一个数据请求，如果返回的status是401或者403,则通常重定向到一个错误的页面提示）
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

//跨域请求访问
demo.config(function($httpProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.commom['X-Requested-With'];
})
