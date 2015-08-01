module.exports = function(left, right) {
  left = left || "${";
  right = right || "}";
  return function(tpl, obj) {
    var str = JSON.stringify(tpl);
    for (var key in obj) {
      var arg = JSON.stringify(obj[key]);
      arg = arg.slice(1, arg.length - 1);
      str = str.split(left + key + right).join(arg);
    }
    return JSON.parse(str);
  };
};
