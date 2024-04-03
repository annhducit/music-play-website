const indexRouter = require('./home');
const userAuthRouter = require('./userAuth');
const adminRouterFunction = require('./admin');

const usersRouter = require('./api/users');
const songsRouter = require('./api/songs');
const ratingsRouter = require('./api/ratings');
const commentsRouter = require('./api/comments');
const albumsRouter = require('./api/albums');
const categoriesRouter = require('./api/categories');
const adminRouter = require('./api/admin');
const playlistsRouter = require('./api/playlists');
const bookmarkRouter = require('./api/bookmarks');

function route(app) {
    // Page
    app.use('/', indexRouter);
    app.use('/', userAuthRouter);
    app.use('/', adminRouterFunction);

    // API
    app.use('/api/users', usersRouter);
    app.use('/api/songs', songsRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/albums', albumsRouter);
    app.use('/api/ratings', ratingsRouter);
    app.use('/api/comments', commentsRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/playlists', playlistsRouter);
    app.use("/api/bookmarks", bookmarkRouter);
}

module.exports = route;
