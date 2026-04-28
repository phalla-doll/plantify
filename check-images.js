const https = require('https');
const ids = ['photo-1416879598553-3375806e2ea8', 'photo-1512428813834-c702c7702b78', 'photo-1509423350716-97f9360b4e09', 'photo-1456015509951-e12456ee7fcc'];
ids.forEach(p => {
  https.get('https://images.unsplash.com/' + p, r => console.log(p, r.statusCode));
});
