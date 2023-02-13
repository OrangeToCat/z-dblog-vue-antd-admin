import BaseVo from "../BaseVo";

/**
 * 继承自BaseVo
 */
class TypeConditionVO extends BaseVo{
    constructor(){
        super();
        this.pid;
        this.name;
        this.description;
        this.sort;
        this.available;
        this.icon;
    }
}

export default TypeConditionVO; 