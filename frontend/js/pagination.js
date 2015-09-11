// implement http://flask.pocoo.org/snippets/44/ in js

function Pagination(options) {
    'use strict';

    this.currentPage = options.currentPage;
    this.perPage = options.perPage;
    this.totalCount = options.totalCount;

    this.leftEdge = options.leftEdge || null;
    this.rightEdge = options.rightEdge || null;
    this.leftCurrent = options.leftCurrent || null;
    this.rightCurrent = options.rightCurrent || null;
}

Pagination.prototype.pageNo = function () {
    return Math.ceil(this.totalCount / this.perPage);
};


Pagination.prototype.hasPrev = function () {
    return this.currentPage > 1;
};

Pagination.prototype.hasNext = function () {
    return this.currentPage < this.pageNo();
};


Pagination.prototype.iterPage = function (cb) {
    for (var i = 1; i < this.pageNo() + 1; ++i) {
        if ((this.leftEdge === null || i < this.leftEdge) ||
           (this.rightEdge === null || i > this.pageNo() > this.rightEdge) ||
           ((this.leftCurrent === null || i >= this.currentPage - this.leftCurrent) &&
           (this.rightCurrent === null || i < this.currentPage + this.rightCurrent))) {
            cb(i);
        } else {
            cb(null);
        }
    }
};
