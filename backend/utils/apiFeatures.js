const { Op } = require("sequelize");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filters the query based on query parameters
   * @returns {APIFeatures} - The instance for chaining
   */
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle search parameter separately if it exists
    if (this.queryString.search) {
      this.query = this.query.where({
        [Op.or]: [
          { name: { [Op.like]: `%${this.queryString.search}%` } },
          { email: { [Op.like]: `%${this.queryString.search}%` } },
          { address: { [Op.like]: `%${this.queryString.search}%` } },
        ],
      });
    }

    // Advanced filtering
    let where = {};
    for (const key in queryObj) {
      if (queryObj.hasOwnProperty(key)) {
        // Handle range queries (e.g., rating[gte]=3)
        if (typeof queryObj[key] === "object") {
          const operators = {
            gte: Op.gte,
            gt: Op.gt,
            lte: Op.lte,
            lt: Op.lt,
            ne: Op.ne,
          };

          for (const op in queryObj[key]) {
            if (operators[op]) {
              where[key] = where[key] || {};
              where[key][operators[op]] = queryObj[key][op];
            }
          }
        } else {
          // Exact match
          where[key] = queryObj[key];
        }
      }
    }

    if (Object.keys(where).length > 0) {
      this.query = this.query.where(where);
    }

    return this;
  }

  /**
   * Sorts the query results
   * @returns {APIFeatures} - The instance for chaining
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").map((item) => {
        if (item.startsWith("-")) {
          return [item.substring(1), "DESC"];
        }
        return [item, "ASC"];
      });
      this.query = this.query.order(sortBy);
    } else {
      // Default sorting
      this.query = this.query.order([["createdAt", "DESC"]]);
    }

    return this;
  }

  /**
   * Limits the fields returned in the query
   * @returns {APIFeatures} - The instance for chaining
   */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",");
      this.query = this.query.attributes(fields);
    }

    return this;
  }

  /**
   * Adds pagination to the query
   * @returns {APIFeatures} - The instance for chaining
   */
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const offset = (page - 1) * limit;

    this.query = this.query.limit(limit).offset(offset);

    return this;
  }

  /**
   * Executes the query and returns the results
   * @returns {Promise<object>} - The query results
   */
  async execute() {
    return await this.query;
  }
}

module.exports = APIFeatures;
