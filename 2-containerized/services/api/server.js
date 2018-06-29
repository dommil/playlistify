const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/artists', function *(next) {
  this.body = db.artists;
});

router.get('/api/artists/:artistId', function *(next) {
  const id = parseInt(this.params.artistId);
  this.body = db.artists.find((artist) => artist.id == id);
});

router.get('/api/albums', function *() {
  this.body = db.albums;
});

router.get('/api/albums/:albumId', function *() {
  const id = parseInt(this.params.albumId);
  this.body = db.albums.find((album) => album.id == id);
});

router.get('/api/songs/in-album/:albumId', function *() {
  const id = parseInt(this.params.albumId);
  this.body = db.songs.filter((song) => song.album == id);
});

router.get('/api/songs/by-artist/:artistId', function *() {
  const id = parseInt(this.params.artistId);
  this.body = db.songs.filter((song) => song.artist == id);
});

router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
