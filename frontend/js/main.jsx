var routes = {
    '/list': function () {
        React.render(
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>,
                document.getElementById('content'));
    }
};

var router = Router(routes);
router.init();
