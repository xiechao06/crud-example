function Students(options) {
    riot.observable(this);

    this.state = {};
    this.state.perPage = options.perPage || 8;

    this.on('list.fetch', function (currentPage) {
        var self = this;
        self.trigger('list.loading');
        self.state.currentPage = currentPage;
        $.getJSON('http://127.0.0.1:8081/student/list.json?page=' + self.state.currentPage + '&per_page=' + self.state.perPage).done(function (data) {
            console.log(data);
            self.data = data;
            self.state.totalCount = data.totalCount;
            self.trigger('list.fetched', self);
        });
    });
    return this;
}
