var List = LoadingView.extend({
    template: function () {
        return _.template($('#list').html()).apply(_, arguments);
    },
    update: function (cb) {
        var that = this;
        this.collection.fetch({
            success: function (collection, models, options) {
                that.$el.html(that.template({
                    students: models,
                }));
            }
        });
    }
});
