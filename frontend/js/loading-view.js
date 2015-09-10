var LoadingView = Backbone.View.extend({
    render: function () {
        this.update(function () {
            this.$el.html(this.template());
        });
        this.$el.html($('script.loader').html());
        return this;
    },
    update: function (cb) {
        throw "You must implement update method";
    }
});
