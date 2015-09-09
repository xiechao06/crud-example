var routes = {
    '/list': function () {
        React.render(
            React.createElement("div", {className: "commentBox"}, 
                "Hello, world! I am a CommentBox."
            ),
                document.getElementById('content'));
    }
};

var router = Router(routes);
router.init();
