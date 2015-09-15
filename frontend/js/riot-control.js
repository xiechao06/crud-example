;(function () {

var _RiotControlApi = ['on','one','off','trigger'];

RiotControl = {
  _stores: {},
  addStore: function(store, tag) {
      tag = tag || 'defaults';
      if (!_RiotControlApi.every(function (api) {
          return api != tag;
      })) {
          throw "tag " + _RiotControlApi.join(', ') + " couldn't be registered!";
      }
      this._stores[tag] = this._stores[tag] || [];
      this._stores[tag].push(store);
      RiotControl[tag] = {};
      _RiotControlApi.forEach(function (api) {
          RiotControl[tag][api] = applyAPI(api, this._stores[tag]);
      }.bind(this));
  }
};

var applyAPI = function (api, stores) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        stores.forEach(function(el) {
            el[api].apply(null, args);
        });
    };
};

_RiotControlApi.forEach(function(api) {
    RiotControl[api] = function() {
        var args = [].slice.call(arguments);
        var stores = [];
        for (var k in RiotControl._stores) {
            stores = stores.concat(RiotControl._stores[k]);
        }
        stores.forEach(function(store) {
            store[api].apply(null, args);
        });
    };

});

})();


