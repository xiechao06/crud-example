function Student() {
    riot.observable(this);

    var self = this;
    this.on('object.fetch', function (id) {
        riotBus.trigger('object.loading');
        $.getJSON('http://127.0.0.1:8081/object/' + id).done(function (data) {
            self.data = data;
            riotBus.trigger('object.fetched', self);
        });
    });
}
