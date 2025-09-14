class apiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = { ...this.queryString };
        const excludeFields = ['page', 'limit', 'sort', 'fields'];
        excludeFields.forEach(field => delete queryStringObj[field]);
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const queryStringObjParsed = JSON.parse(queryStr);
        this.mongooseQuery = this.mongooseQuery.find(queryStringObjParsed);
        return this;
    }

    paginate() {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 10;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.search) {
            const query = this.queryString.search;
            if (modelName === 'Product') {
                this.mongooseQuery = this.mongooseQuery.find({
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } }
                    ]
                });
            } else if (modelName === 'Category') {
                this.mongooseQuery = this.mongooseQuery.find({
                    name: { $regex: query, $options: 'i' }
                });
            }
        }
        return this;
    }
}


module.exports = apiFeatures;