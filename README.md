# tplobj [![Build Status][1]][2]

## Example

```javascript
var spawn = require("child_process").spawn;
var tplojb = require("tplobj")("${", "}");

var tpl = {
  command: "ffmpeg",
  args: [
    "-i", "${input}",
    "-vn",
    "-acodec", "${codec}",
    "${output}"
  ],
  options: {
    cwd: "${directory}"
  }
};

var obj = {
  input: "C:\\Users\\John\\Downloads\\My favorite music video.mkv",
  codec: "libmp3lame",
  output: "D:\\Music\\My favorite song.mp3",
  directory: "C:\\Users\\John\\AppData\\Local\\Temp"
};

var res = tplobj(tpl, obj);

var ffmpeg = spawn(res.command, res.args, res.options)
...
```

[1]: https://travis-ci.org/kohanyirobert/tplobj.svg?branch=master
[2]: https://github.com/kohanyirobert/tplobj
