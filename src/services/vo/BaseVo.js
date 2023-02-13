class BaseVo {

    static DEFAULT_PAGE_SIZE = 10;

    constructor(){
        this.pageNumber = 1;
        this.pageSize = 0;
        this.pageStart = 0;
        this.orderField;
        this.orderDirection;
        this.keywords;
        this.startDate;
        this.endDate;
    }

    getPageSize(){
        return this.pageSize > 0 ? this.pageSize : BaseVo.DEFAULT_PAGE_SIZE;
    }

    getPageStart(){
        return this.pageNumber > 0 ? (this.pageNumber - 1) * this.getPageSize() : 0;
    }
}



export default BaseVo;