function copyInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
  // return left instanceof right;
}

module.exports.copyInstanceof = copyInstanceof;
