class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1a Filtering
    //127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&price[lte]=1500 good filtering route
    const queryObj = { ...this.queryString }; //create a new object through destructuring
    const excludedFields = ["page", "sort", "limit", "fields"]; //exclude these fields from the query object
    excludedFields.forEach((el) => delete queryObj[el]);

    //1b. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //let query = Tour.find(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);

      //127.0.0.1:3000/api/v1/tours?sort=-price
      //127.0.0.1:3000/api/v1/tours?sort=-price -ratingsAverage
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);

      //127.0.0.1:3000/api/v1/tours?fields=name difficulty duration price
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('This Page does not exist');
    //   }
    // }
    return this;
  }
}

module.exports = APIFeatures;
