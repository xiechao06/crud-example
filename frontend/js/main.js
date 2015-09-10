var AppRouter = Backbone.Router.extend({
    routes: {
        '': function () {
            this.navigate('list', {trigger: true});
        },
        'list': function () {
            var Students = Backbone.PageableCollection.extend({
                model: Student,
                url: 'http://127.0.0.1:8081/student/list.json'
            });
            new List({
                el: '#content',
                collection: new Students(),
            }).render();
        }
    },

});


$(document).ready(function () {
    var app = new AppRouter();
    Backbone.history.start();
});
