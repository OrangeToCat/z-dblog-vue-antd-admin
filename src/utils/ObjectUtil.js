
/**
 * 把origin中与target的同名的属性赋值给target
 * 这里应该有个递归，如果属性是对象，则应当递归赋值
 * 
 * @param {Object} origin
 * @param {Object} target
 */
function override(target, origin) {
    for (var prop in origin) {
        if (typeof (origin[prop]) !== "function"
            && prop in target
            && classOf(target[prop]) === classOf(origin[prop])) {
            if (classOf(origin[prop]) == "Object") {
                override(target[prop], origin[prop]);
            }
            else {
                target[prop] = origin[prop];
            }
        }
    }
}


function classOf(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";

    return Object.prototype.toString.call(o).slice(8, -1);
}

/**
 * 
 * @param {Object | Array} data 
 * @param {string} oldName 旧的属性名称
 * @param {string} newName 新的属性名称
 * @param {boolean} isDeleteOldName 是否删除旧的属性
 */
function keyReName(data, oldName, newName, isDeleteOldName = false) {
    if (classOf(data) == "Object") {
        keyReNameForObject(data, oldName, newName, isDeleteOldName)
    } else if (classOf(data) == "Array") {
        for (var item in data) {
            keyReNameForObject(data[item], oldName, newName, isDeleteOldName)
        }
    }
}

function keyReNameForObject(data, oldName, newName, isDeleteOldName = false) {

    if (classOf(data) !== "Object") {
        throw new Error("第一个参数data应该是一个Object！");
    }

    data[newName] = data[oldName];
    if (isDeleteOldName) {
        delete data[oldName];
    }
}


export {
    override,
    classOf,
    keyReName,
}