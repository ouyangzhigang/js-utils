const fs = require('fs');

const rmdir = (dir) => {
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir);
    files.forEach((file) => {
      // fs.statSync(curPath).isDirectory()
      fs.unlinkSync(`${dir}/${file}`);
    })
    // fs.rmdirSync(dir);
  }
}
fs.readdirSync

module.exports = rmdir;