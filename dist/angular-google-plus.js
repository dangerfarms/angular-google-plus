/*! angular-google-plus - v0.1.2 2015-02-09 */
/**
 * Options object available for module
 * options/services definition.
 * @type {Object}
 */
var options = {};

/**
 * googleplus module
 */
angular.module("googleplus", []).provider("GooglePlus", [ function() {
    /**
     * clientId
     * @type {Number}
     */
    options.clientId = null;
    this.setClientId = function(a) {
        options.clientId = a;
        return this;
    };
    this.getClientId = function() {
        return options.clientId;
    };
    /**
     * apiKey
     * @type {String}
     */
    options.apiKey = null;
    this.setApiKey = function(a) {
        options.apiKey = a;
        return this;
    };
    this.getApiKey = function() {
        return options.apiKey;
    };
    /**
     * Scopes
     * @default 'https://www.googleapis.com/auth/plus.login'
     * @type {Boolean}
     */
    options.scopes = "https://www.googleapis.com/auth/plus.login";
    this.setScopes = function(a) {
        options.scopes = a;
        return this;
    };
    this.getScopes = function() {
        return options.scopes;
    };
    /**
     * Response type
     * @default null
     * @type {String}
     */
    options.responseType = null;
    this.setResponseType = function(a) {
        options.responseType = a;
        return this;
    };
    this.getResponseType = function() {
        return options.responseType;
    };
    /**
     * Redirect URI
     * @default null
     * @type {String}
     */
    options.redirectUri = null;
    this.setredirectUri = function(a) {
        options.redirectUri = a;
        return this;
    };
    this.getredirectUri = function() {
        return options.redirectUri;
    };
    /**
     * Init Google Plus API
     */
    this.init = function(a) {
        angular.extend(options, a);
    };
    /**
     * This defines the Google Plus Service on run.
     */
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, b, c) {
        /**
       * Define a deferred instance that will implement asynchronous calls
       * @type {Object}
       */
        var d;
        /**
       * NgGooglePlus Class
       * @type {Class}
       */
        var e = function() {};
        e.prototype.login = function() {
            d = a.defer();
            var b = {
                client_id: options.clientId,
                scope: options.scopes,
                immediate: false
            };
            if (options.responseType !== null) {
                b.response_type = options.responseType;
            }
            if (options.redirectUri !== null) {
                b.redirect_uri = options.redirectUri;
            }
            gapi.auth.authorize(b, this.handleAuthResult);
            return d.promise;
        };
        e.prototype.checkAuth = function() {
            var a = {
                client_id: options.clientId,
                scope: options.scopes,
                immediate: true
            };
            if (options.responseType !== null) {
                a.response_type = options.responseType;
            }
            if (options.redirectUri !== null) {
                a.redirect_uri = options.redirectUri;
            }
            gapi.auth.authorize(a, this.handleAuthResult);
        };
        e.prototype.handleClientLoad = function() {
            gapi.client.setApiKey(options.apiKey);
            gapi.auth.init(function() {});
            c(this.checkAuth, 1);
        };
        e.prototype.handleAuthResult = function(a) {
            if (a && !a.error) {
                d.resolve(a);
                b.$apply();
            } else {
                d.reject("error");
            }
        };
        e.prototype.getUser = function() {
            var c = a.defer();
            gapi.client.load("oauth2", "v2", function() {
                gapi.client.oauth2.userinfo.get().execute(function(a) {
                    c.resolve(a);
                    b.$apply();
                });
            });
            return c.promise;
        };
        e.prototype.getToken = function() {
            return gapi.auth.getToken();
        };
        e.prototype.setToken = function(a) {
            return gapi.auth.setToken(a);
        };
        e.prototype.logout = function() {
            gapi.auth.signOut();
            return d.promise;
        };
        return new e();
    } ];
} ]).run([ function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://apis.google.com/js/client.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
} ]);