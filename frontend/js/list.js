var List = LoadingView.extend({
    template: function () {
        return _.template($('#list').html()).apply(_, arguments);
    },
    render: function () {
        var view = this;
        this.collection.on('request', function () {
            view.$el.html($('script.loader').html());
        });
        this.collection.on('reset', function (collection) {
            view.$el.html(view.template({
                students: collection.toJSON()
            }));
        });
        return this;
    }
});
