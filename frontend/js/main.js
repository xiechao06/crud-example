var students = new Students({
    perPage: 8,
});
riotBus.register(students);
riotBus.register(new Student());

var listapp;
var objectapp;
$(document).ready(function () {
    var router = function (app) {
        switch (app) {
            case 'list': {
                listapp = listapp || riot.mount('#content', 'listapp');
                objectapp = null;
                var params = arguments[1];
                riotBus.trigger('list.fetch', parseInt(params.page) || 1);
                break;
            }
            case 'object': {
                listapp = null;
                objectapp = objectapp || riot.mount('#content', 'objectapp');
                var id = parseInt(arguments[1]) || null;
                id && riotBus.trigger('object.fetch', id);
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
        return page;
    });

    riot.route(router);
    riot.route.exec(router);
});
