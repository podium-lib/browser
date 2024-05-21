export default class Queue {
    constructor(maxLength = 10) {
        this.maxSize = maxLength;
        this.array = [];
    }

    /**
     * @template T
     * @param {T} item
     */
    push(item) {
        // If we are out of room, get rid of the oldest element
        if (this.array.length >= this.maxSize) {
            this.array.pop();
        }
        this.array.unshift(item);
    }

    /**
     * @template T
     * @returns {T}
     */
    peek() {
        return this.array[0];
    }

    /**
     * @template T
     * @returns {T[]}
     */
    toArray() {
        return this.array.slice();
    }
}
