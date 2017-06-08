/* globals angular */

angular.module('contact', [
  'contact.main',
  'contact.about',
  'ui.router'
])
.config(function ($stateProvider, $locationProvider) {
  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
  $stateProvider
    .state('contact', {
      name: 'contact',
      url: '/contact/',
      views: {
        'contactHeaderView': {
          controller: 'HomeController',
          templateUrl: '../../assets/partials/contact/header.html'
        },
        'contactAboutView': {
          controller: 'AboutController',
          templateUrl: '../../assets/partials/contact/about.html'
        }
      }
    });
});
