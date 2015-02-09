describe('googlePlus Module specs', function () {

  // mock global gapi object
  window.gapi = {
    auth: {
      authorize: jasmine.createSpy(),
      signOut: jasmine.createSpy()
    }
  };

  var googlePlus, GooglePlusProvider;

  beforeEach(function () {
    module('googleplus', function (_GooglePlusProvider_) {
      GooglePlusProvider = _GooglePlusProvider_;
      GooglePlusProvider.init({
        apiKey: 'daowpdmpomwa21o3no1in'
      });
    });

    inject(function (_GooglePlus_) {
      googlePlus = _GooglePlus_;
    });
  });

  it('should exist', function () {
    expect(!!GooglePlusProvider).toBeDefined();
  });

  describe('the provider api should provide', function () {

    it("a working login", inject(function ($q) {
      var responseType = GooglePlusProvider.getResponseType(),
        options = {
          client_id: GooglePlusProvider.getClientId(),
          scope: GooglePlusProvider.getScopes(),
          immediate: false
        };

      if (responseType !== null) {
        options.response_type = responseType;
      }

      expect(googlePlus.login().then).toEqual(jasmine.any(Function));

      expect(window.gapi.auth.authorize).toHaveBeenCalledWith(options, googlePlus.handleAuthResult);
    }));

    it("a working logout", inject(function ($q) {
      googlePlus.login();
      expect(googlePlus.logout());
      expect(window.gapi.auth.signOut).toHaveBeenCalled();
    }));

    it('appId as default value', function () {
      expect(GooglePlusProvider.getClientId()).toBe(null);
    });

    it('working getter / setter for appId', function () {
      GooglePlusProvider.setClientId('123456789101112');
      expect(GooglePlusProvider.getClientId()).toBe('123456789101112');
    });

    it('locale as default value', function () {
      expect(GooglePlusProvider.getApiKey()).toBe('daowpdmpomwa21o3no1in');
    });

    it('working getter / setter for locale', function () {
      GooglePlusProvider.setApiKey('g4ilu32b42iub34piu32b4liu23b4i23');
      expect(GooglePlusProvider.getApiKey()).toBe('g4ilu32b42iub34piu32b4liu23b4i23');
    });

    it('status as default value', function () {
      expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.login');
    });

    it('working getter / setter for status', function () {
      GooglePlusProvider.setScopes('https://www.googleapis.com/auth/plus.me');
      expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.me');
    });

    it('requestType as default value', function () {
      expect(GooglePlusProvider.getResponseType()).toBe(null);
    });

    it('working getter / setter for request type', function () {
      GooglePlusProvider.setResponseType('code');
      expect(GooglePlusProvider.getResponseType()).toBe('code');
    });

    it('responseUri as default value', function () {
      expect(GooglePlusProvider.getRedirectUri()).toBe('');
    });

    it('working getter / setter for response URI', function () {
      GooglePlusProvider.setRedirectUri('postmessage');
      expect(GooglePlusProvider.getRedirectUri()).toBe('postmessage');
    });

  });
});