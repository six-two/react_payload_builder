class HexBuilderStore {
    constructor() {
        this.elements = [];
        this.little_endian = true;
        this.next_id = 0
    }

    add() {
        this.elements.push({type: "", key: this.next_id, inner: {}});
        this.next_id += 1;
    }

    remove(index) {
        this.elements.remove(index);
    }

    update(index, new_value) {
        // TODO if new_value.inner == null then init with default values
        this.elements[index] = new_value;
    }
}

export default HexBuilderStore;
