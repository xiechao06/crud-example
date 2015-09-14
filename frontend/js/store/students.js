function Students(options) {
    riot.observable(this);

    this.state = {};
    this.state.currentPage = options.currentPage || 1;
    this.state.perPage = options.perPage || 8;

    this.on('fetch', function () {
        var self = this;
        self.trigger('loading');
        $.getJSON('http://127.0.0.1:8081/student/list.json?page=' + self.state.currentPage + '&per_page=' + self.state.perPage).done(function (data) {
            self.data = data;
            self.state.totalCount = data.totalCount;
            self.trigger('fetched', self);
        });
    });
    return this;
}
