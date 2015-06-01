angular.module('cmsApp')
    .provider('api', function() {
        'use strict';

        // Private variables
        var baseUrl = '';

        // Public API for configuration
        this.setBaseUrl = function(url) {
            baseUrl = url;
        };

        // Private constructor
        function Api($http, $location, $cookieStore, Base64) {
            var baseConfig = {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode($cookieStore.get('token') + ':'),
                    'Content-Type': 'application/json'
                }
            };

            this.getToken = function(username, password) {
                return $http.get(baseUrl + '/token', {
                    headers: {
                        'Authorization': 'Basic ' + Base64.encode(username + ':' + password)
                    }
                });
            };

            this.getWithToken = function() {
                return $http.get(baseUrl + $location.path(), baseConfig);
            };

            this.postWithToken = function(json) {
                return $http.post(baseUrl + $location.path(), json, baseConfig);
            };

            this.putWithToken = function(json) {
                return $http.put(baseUrl + $location.path(), json, baseConfig);
            };

            this.deleteWithToken = function() {
                return $http.delete(baseUrl + $location.path(), baseConfig);
            };
        }

        // Method for instantiating
        this.$get = function($http, $location, $cookieStore, Base64) {
            return new Api($http, $location, $cookieStore, Base64);
        };
    });