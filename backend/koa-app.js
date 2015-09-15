var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var knex = require('./setup-knex.js');
var json = require('koa-json');
var cors = require('kcors');
var send = require('koa-send');
var koaBody = require('koa-body')();
var serve = require('koa-static');
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');

router.get('/student/list.json', function *(next) {
    var q = knex('TB_STUDENT').count('* as count');
    var totalCount = (yield q)[0].count;

    //q = knex.select('TB_STUDENT.id', 'TB_STUDENT.name', 'TB_IMAGE.id as image_id',
                        //'TB_STUDENT.extra as extra', 'TB_STUDENT.description as description',
                        //'TB_IMAGE.path as image_path', 'TB_IMAGE.created_at as image_created_at',
    //'TB_IMAGE.updated_at as image_updated_at').join('TB_IMAGE', 'TB_IMAGE.student_id', 'TB_STUDENT.id').from('TB_STUDENT');

    q = knex('TB_STUDENT').select('*');
    if (this.query.page && this.query.per_page) {
        var page = parseInt(this.query.page);
        var perPage = parseInt(this.query.per_page);
        q = q.offset((page - 1) * perPage).limit(perPage);
    }
    var data = yield q.map(function (row) {
        return {
            id: row.id,
            name: row.name,
            extra: row.extra,
            description: row.description,
        };
    });
    for (var i = 0; i < data.length; ++i) {
        var row = data[i];
        row.images = yield knex('TB_IMAGE').select('*').where('student_id', row.id);
    }
    this.body = {
        data: data,
        totalCount: totalCount,
    };
    yield next;
}).get('/object/:id', function *(next) {
    var q = knex('TB_STUDENT').select('*').where('id', this.params.id);
    this.body = (yield q.map(function (row) {
        return {
            id: row.id,
            name: row.name,
            extra: row.extra,
            description: row.description,
        };
    }))[0];
    this.body.images = yield knex('TB_IMAGE').select('*').where('student_id', this.body.id);
    yield next;
}).put('/object/:id', koaBody, function *(next) {
    console.log(this.request.body);
    yield knex('TB_STUDENT').where('TB_STUDENT.id', this.params.id).update(
        this.request.body
    );
    this.body = {};
    yield* next;
}).post('/upload', function *(next) {
    var parts = parse(this);
    var pathList = [];
    var part;
    while ((part = yield parts)) {
        var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
        part.pipe(stream);
        console.log('uploading %s -> %s', part.filename, stream.path);
        pathList.push(stream.path);
    }
    this.body = {
        paths: pathList
    };
    yield next;
}).get(/\/static\/(.*)/, function *(next) {
    yield send(this, this.params[0], { root: __dirname + '/static' });
});

var bunyan = require('bunyan');
// setup you logger instance
var logger = bunyan.createLogger({name: "myapp"});
var koaLogger = require('koa-bunyan');

app.use(json())
.use(router.routes())
.use(router.allowedMethods())
.use(cors())
.use(koaLogger(logger, {
    // which level you want to use for logging?
    // default is info
    level: 'info',
    // this is optional. Here you can provide request time in ms,
    // and all requests longer than specified time will have level 'warn'
    timeLimit: 100
}));


app.listen(process.env.PORT);
