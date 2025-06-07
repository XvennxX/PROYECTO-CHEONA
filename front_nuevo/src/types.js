/**
 * @typedef {Object} Room
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} capacity
 * @property {number} price
 * @property {string[]} images
 * @property {string[]} amenities
 * @property {boolean} available
 */

/**
 * @typedef {Object} Testimonial
 * @property {number} id
 * @property {string} name
 * @property {string} date
 * @property {number} rating
 * @property {string} comment
 * @property {string} avatar
 */

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {string} image
 */

/**
 * @typedef {Object} DateRange
 * @property {Date} start
 * @property {Date} end
 */

/**
 * @typedef {Object} Availability
 * @property {DateRange[]} busy
 */

export {};