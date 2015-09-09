#!/usr/bin/env node
var shell = require('shelljs');

var q = require('q');

var knex = require('./setup-knex.js');

var initDB = function () {
    return q.fcall(function () {

        return knex.schema.createTable('TB_IMAGE', function (table) {
            table.increments();
            table.string('path');
            table.timestamps();
            table.integer('student_id').references('TB_STUDENT.id');
        });
    }).then(function () {
        return knex.schema.createTable('TB_STUDENT', function (table) {
            table.increments();
            table.string('name');
            table.enu('gender', ['Male', 'Female']);
        });
    });
};

module.exports = initDB;

if (require.main === module) {
    initDB().done(function () {
        knex.destroy();
    });
}
