Paginator = Backbone.View.extend({
    template: function () {
        return _.template($('script.pagination').html()).apply(_, arguments);
    },
    render: function () {
        var view = this;
        this.collection.on('reset', function () {
            function _Pagination() {
                Pagination.apply(this, arguments);
            }
            _Pagination.prototype = Object.create(Pagination.prototype);
            _Pagination.prototype.urlFor = function (page) {
                var query = url('?', url('hash')) || {};
                query.page = page;
                return '#list?' + _.pairs(query).map(function (pair) {
                    return pair.join('=');
                }).join('&');
            };
            view.$el.html(view.template({
                pagination: new _Pagination({
                    currentPage: this.state.currentPage,
                    totalCount: this.state.totalRecords,
                    perPage: this.state.perPage,
                }),
            }));
        });
        return this;
    },
});
