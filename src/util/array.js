const array = {
	/**
	 * Converts the elements of an array to a consecutive concatenated string.
	 *
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {String} seperator, A seperator to seperate the elements.
	 * @param {Number} from, The index where to begin with the stringification.
	 * @param {Number} to, The index where to end with the stringification.
	 * @param {Boolean} first, Apply the seperator at the beginning of the strings.
	 *
	 * @return {String} - The concatenated string consisting of all array-elements.
	 */
	toString: (array, seperator = '', from = 0, to = null, first = false) => {
		const end = to === null ? array.length : to;
		let string = first ? seperator : ''; // Prepends the seperator if first is true
		array.forEach((element, i) => {
			if (i < from || i > end) return;
			/* Only appends seperator if element is the second to last */
			string += element + (i < end ? seperator : '');
		});
		return string;
	},

	/**
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {*} seperator, A string seperator to seperate the elements.
	 */
	fromString: (string, seperator = '', regex = '') => {
		return string.split(seperator);
	},

	/**
	 * Converts an object into an array by using the keys as elements
	 * and the order as the index.
	 *
	 * @param {Object} object The object that is supposed to be converted.
	 */
	fromObject: object => {
		return Object.keys(object).map(key => {
			return key;
		});
	},

	/**
	 * @param {Array} array,
	 */
	toObject: array => {
		let obj;
		array.forEach(element => {
			obj[element] = null;
		});
		return obj;
	},

	/**
	 * @param {Number} n,
	 * @param {Number} min,
	 * @param {Number} max,
	 * @param {Number} float,
	 */
	random: (n = 100, min = 0, max = 100, float = false) => {
		return new Array(n).fill(0).map(i => {
			let rand = Math.random() * max + min;
			return float ? rand : Math.floor(rand);
		});
	}
};

export default array;
