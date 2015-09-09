var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var knex = require('./setup-knex.js');
var json = require('koa-json');


router.get('/students/list.json', function *(next) {
    this.body = yield knex.select('TB_STUDENT.id', 'TB_STUDENT.name', 'TB_IMAGE.id as image_id', 
                                 'TB_IMAGE.path as image_path', 'TB_IMAGE.created_at as image_created_at',
                                 'TB_IMAGE.updated_at as image_updated_at').join('TB_IMAGE').from('TB_STUDENT').map(function (row) {
        return {
            id: row.id,
            name: row.name,
            image: {
                id: row.image_id,
                path: row.image_path,
                created_at: row.image_created_at,
                updated_at: row.updated_at
            }
        };
    });
    yield next;
});

app.use(json()).use(router.routes()).use(router.allowedMethods());

app.listen(8080);
