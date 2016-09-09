exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isGenerator = isGenerator;
exports.isArray = isArray;
function isObject(v) {
    return Object == v.constructor;
}
function isPromise(v) {
    return typeof v.then == 'function';
}
function isGenerator(v) {
    return typeof v.next == 'function' && typeof v.throw == 'function';
}

function isArray (v) {
    return  v 
            && typeof v === 'object'  //{} [] null
            && typeof v.length === 'number'   //[]
            && typeof v.splice === 'function'  //[]
            && !(v.propertyIsEnumerable('length')); // length 不可枚举
}