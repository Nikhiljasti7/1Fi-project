// Vercel entry point. Vercel's Node.js runtime calls whatever this file exports
// as a (req, res) handler — an Express app's signature matches that directly,
// so we just re-export it. No app.listen() happens in this codepath (see server.js).
module.exports = require('../server');
