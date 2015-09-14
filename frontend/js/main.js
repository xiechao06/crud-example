
$(document).ready(function () {
    var router = function (page, params) {
        switch (page) {
            case 'list': {
                RiotControl.addStore(new Students({
                    currentPage: params.page || 1,
                    perPage: 8,
                }));
                riot.mount('#content', 'listapp');
                RiotControl.trigger('fetch');
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
        var page = path[0];
        var qs = path[1];
        var params = {};

        if (qs) {
            qs.split('&').forEach(function(v) {
                var c = v.split('=');
                params[c[0]] = c[1];
            });
        }

        return [page, params];
    });

    riot.route(router);
    riot.route.exec(router);
});
