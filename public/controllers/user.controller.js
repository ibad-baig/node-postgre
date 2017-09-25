'use strict';

angular.module('userApp')
  .controller('UserController', ['$scope', '$http', function ($scope, $http) {
    $scope.addingUser = false;
    $scope.user = {};
    $scope.users = [];
    // $scope.users = [
    //   { id: 1, name: 'Ibad', email: 'ibad.baig@tenpearls.com', isEditable: false },
    //   { id: 2, name: 'Zia', email: 'ziauddin@tenpearls.com', isEditable: false },
    //   { id: 3, name: 'Saif', email: 'saif@tenpearls.com', isEditable: false },
    //   { id: 4, name: 'Yasir', email: 'yasir@tenpearls.com', isEditable: false },
    //   { id: 5, name: 'Zaheer', email: 'zaheer@tenpearls.com', isEditable: false },
    //   { id: 6, name: 'Tayyab', email: 'tayab@tenpearls.com', isEditable: false },
    //   { id: 7, name: 'Sharjeel', email: 'sharjeel@tenpearls.com', isEditable: false },
    //   { id: 8, name: 'Asad', email: 'asad@tenpearls.com', isEditable: false },
    //   { id: 9, name: 'Ajay', email: 'ajay@tenpearls.com', isEditable: false },
    //   { id: 10, name: 'Ali', email: 'ali@tenpearls.com', isEditable: false },
    //   { id: 11, name: 'Zeeshan', email: 'zeeshan@tenpearls.com', isEditable: false },
    //   { id: 12, name: 'Umair', email: 'umair@tenpearls.com', isEditable: false },
    //   { id: 13, name: 'Kashif', email: 'Kashif@tenpearls.com', isEditable: false }
    // ];

    $scope.load = function() {
      $http.get('/users', { headers: { 'Content-Type': 'application/json' }})
      .then(users => {
        $scope.users = users.data;
      })
      .catch(err => {
        console.log(err);
      });
    }

    $scope.add = function() {
      $scope.user = {};
      $scope.addingUser = true;
    }

    $scope.create = function () {
      // $scope.users.push({
      //   id: getMaxId(), name: this.user.name, email: this.user.email, isEditable: false
      // });

      $http.post('/users', { username: $scope.user.username, email: $scope.user.email })
        .then(() => {
          $scope.addingUser = false;
          $scope.load();
        })
        .catch(err => {
          console.log(err);
        });
      
    }

    $scope.edit = function (user) {
      $scope.users.find(x => x.id === user.id).isEditable = true;
    }

    $scope.update = function (user) {
      // let userToUpdate = $scope.users.find(x => x.id === user.id);
      // userToUpdate.name = user.name;
      // userToUpdate.email = user.email;

      $http.put(`/users/${user.id}`, { username: user.username, email: user.email })
        .then(() => {
          user.isEditable = false;
          $scope.load();
        });

      
    }

    $scope.delete = function (userId) {
      // const atIndex = $scope.users.find(x => x.id === userId);
      // $scope.users.splice(atIndex, 1);

      $http.delete(`users/${userId}`)
        .then(() => {
          $scope.load();
        });
    }

    $scope.cancel = function(userId) {
      $scope.users.find(x => x.id === userId).isEditable = false;
    }

    function getMaxId() {
      return ($scope.users[$scope.users.length - 1].id + 1);
    }
  }]);
