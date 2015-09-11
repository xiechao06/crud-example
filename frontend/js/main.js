
var Students = Backbone.Collection.extend({
    model: Student,
    url:  function () {
        return 'http://127.0.0.1:8081/student/list.json?' + _.pairs(this.state).map(function (pair) {
            return {
                perPage: 'per_page',
                currentPage: 'page'
            }[pair[0]] + '=' + pair[1];
        }).join('&');
    },
    parse: function (response, options) {
        this.state.totalRecords = response.totalCount;
        return response.data;
    },
    fetch: function (options) {
        this.state = _.extend({
            perPage: 25,
            currentPage: 1,
        }, (options && options.state) || {});
        Backbone.Collection.prototype.fetch.apply(this, arguments);
    },
});

var students = new Students();
var list = new List({
    collection: students,
});
var paginator = new Paginator({
    collection: students,
});

var AppRouter = Backbone.Router.extend({
    execute: function(callback, args, name) {
        args.push(function (qs) {
            return qs? _.object(qs.split('&').map(function (param) {
                return param.split('=');
            })): {};
        }(args.pop()));
        callback.apply(this, args);
    },
    routes: {
        '': function () {
            this.navigate('list', {trigger: true});
        },
        'list': function (param) {
            $('#content').append(paginator.render().$el);
            $('#content').append(list.render().$el);
            // retrieve data
            students.fetch({
                reset: true,
                state: {
                    currentPage: parseInt(param.page) || 1,
                    perPage: 100,
                },
            });
        }
    },

});


$(document).ready(function () {
    var app = new AppRouter();
    Backbone.history.start();
});
