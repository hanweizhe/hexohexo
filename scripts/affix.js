var spawn = require('child_process').exec;


hexo.on('new', function(data){
  spawn('start  "E:\ruanjian\markdown\MarkdownPad2.exe" ' + data.path);
});