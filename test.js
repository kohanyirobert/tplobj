var assert = require("assert");

(function() {
  var tplobj = require("./tplobj");
  assert.strictEqual("function", typeof tplobj);
}());

(function() {
  var tplobj = require("./tplobj")("${", "}");
  assert.throws(function() {tplobj();}, SyntaxError);
  assert.throws(function() {tplobj(undefined, undefined);}, SyntaxError);
}());

(function() {
  var tpl = {a: "${a}"};
  var obj = {a: "a"};
  var exp = {a: "${a}"};
  assert.deepEqual(exp, require("./tplobj")()(tpl, obj));
  assert.deepEqual(exp, require("./tplobj")(undefined, undefined)(tpl, obj));
  assert.deepEqual(exp, require("./tplobj")(null, null)(tpl, obj));
  assert.deepEqual(exp, require("./tplobj")("{{", "}}")(tpl, obj));
  assert.deepEqual(exp, require("./tplobj")("<%=", "%>")(tpl, obj));
}());

(function() {
  var tplobj = require("./tplobj")("${", "}");
  var tpl = {a: "${a}"};
  var exp = {a: "${a}"};
  assert.deepEqual(exp, tplobj(tpl));
  assert.deepEqual(exp, tplobj(tpl, undefined));
  assert.deepEqual(exp, tplobj(tpl, null));
  assert.deepEqual(exp, tplobj(tpl, {}));
  assert.deepEqual(exp, tplobj(tpl, {b: "b"}));
}());

(function() {
  var tplobj = require("./tplobj")("${", "}");
  var tpl = {a: "${a}", b: "{{b}}", c: "<%=c%>"};
  var obj = {a: "a"};
  var exp = {a: "a", b: "{{b}}", c: "<%=c%>"};
  var res = tplobj(tpl, obj);
  assert.deepEqual(exp, res);
}());

(function() {
  var tplojb = require("./tplobj")("${", "}");

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

  var exp = {
    command: "ffmpeg",
    args: [
      "-i", "C:\\Users\\John\\Downloads\\My favorite music video.mkv",
      "-vn",
      "-acodec", "libmp3lame",
      "D:\\Music\\My favorite song.mp3"
    ],
    options: {
      cwd: "C:\\Users\\John\\AppData\\Local\\Temp"
    }
  };

  var res = tplojb(tpl, obj);

  assert.deepEqual(exp, res);
})();

[["${", "}"], "{{", "}}", "<%=", "%>"].forEach(function(pair) {
  var left = pair[0];
  var right = pair[1];

  var tplobj = require("./tplobj")(left, right);
  (function() {
    var tpl = {
      arg1: left + "arg1" + right,
      arg2: [
        left + "arg2" + right
      ]
    };

    var obj = {
      arg1: "foo\\bar",
      arg2: "bar\\foo"
    };

    var exp = {
      arg1: "foo\\bar",
      arg2: [
        "bar\\foo"
      ]
    };

    var res = tplobj(tpl, obj);

    assert.deepEqual(exp, res);
  })();
});

console.log("OK");
