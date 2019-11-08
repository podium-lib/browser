export default class Queue {
    constructor(maxLength = 10) {
        this.maxSize = maxLength;
        this.array = [];
    }

    push(item) {
        // If we are out of room, get rid of the oldest element
        if (this.array.length >= this.maxSize) {
            this.array.pop();
        }
        this.array.unshift(item);
    }

    peek() {
        return this.array[0];
    }

    toArray() {
        return this.array.slice();
    }
}
