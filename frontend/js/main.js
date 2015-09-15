var students = new Students({
    perPage: 8,
});
RiotControl.addStore(students, 'student');
RiotControl.addStore(new Student(), 'student');

var listapp;
var objectapp;
$(document).ready(function () {
    var router = function (app) {
        switch (app) {
            case 'list': {
                listapp = listapp || riot.mount('#content', 'listapp');
                objectapp = null;
                var params = arguments[1];
                RiotControl.student.trigger('list.fetch', parseInt(params.page) || 1);
                break;
            }
            case 'object': {
                listapp = null;
                objectapp = objectapp || riot.mount('#content', 'objectapp');
                var id = parseInt(arguments[1]) || null;
                id && RiotControl.student.trigger('object.fetch', id);
                break;
            }
            default: {
                riot.route('list');
                break;
            }

        }
    };
    riot.route.parser(function(path) {
        path = path.split('?');
        var param = {};
        var page = path[0].split('/');
        var qs = path[1];
        var params = {};

        if (qs) {
            qs.split('&').forEach(function(v) {
                var c = v.split('=');
                params[c[0]] = c[1];
            });
        }

        page.push(params);
        console.log(page);
        return page;
    });

    riot.route(router);
    riot.route.exec(router);
});
