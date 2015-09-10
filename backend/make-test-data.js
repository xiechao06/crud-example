#!/usr/bin/env node
var shell = require('shelljs');
var fs = require('fs');
var q = require('q');
var _ = require('underscore');
var chance = require('chance')();
var glob = require('glob');
var path = require('path');

var knex = require('./setup-knex.js');

var initDB = require('./init-db.js');

q.fcall(initDB).then(function (images) {
    console.log('create students');
    var studentsRows = _(32).times(function (n) {
        return {
            name: chance.name(),
            gender: chance.gender(),
            extra: chance.paragraph(),
            description: chance.paragraph(),
        };
    });
    return knex.insert(studentsRows).into('TB_STUDENT');
}).then(function () {
    return q.nfcall(fs.stat, './static/images');
}).catch(function (error) {
    if (error && error.code === 'ENOENT') {
        console.log('create directory');
        shell.mkdir('-p', './static/images');
        _(32).times(function (n) {
            var url = 'http://placehold.it/640x640/' + chance.color({ format: 'hex' }).substr(1) + '/' + chance.color({ format: 'hex' }).substr('1')  + '.jpg';
            shell.exec('wget ' + url + ' -O ./static/images/' + chance.word() + '.jpg');
        });
    }
    throw error;
}).then(function () {
    return q.all([q.nfcall(glob, './static/images/*.jpg', {}), knex.select().from('TB_STUDENT')]);
}).then(function (args) {
    var images = args[0];
    var students = args[1];
    var records = _.zip(images, students).map(function (pair) {
        var image = pair[0];
        var student = pair[1];
        return {
            path: '/static/images/' + path.basename(image),
            created_at: new Date(),
            student_id: student.id,
        };
    });
    return knex.insert(records).into('TB_IMAGE');
}).catch(function (err) {
    console.log(err.stack);
}).done(function () {
    knex.destroy();
});
