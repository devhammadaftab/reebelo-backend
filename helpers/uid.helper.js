const uid = function (key) {
  return (
    key + "-" + Date.now().toString(36) + Math.random().toString(36).substr(2)
  );
};

module.exports.uid = uid;
