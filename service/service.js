demo.factory('permissions',function($rootScope){
  var permissionList;
  return{
    setPermissions: function(permissions){
      permissionList = permissions ;
      $rootScope.$broadcast('permissionsChange');
    }
  };
});