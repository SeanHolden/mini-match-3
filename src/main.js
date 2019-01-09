class Gem {
    constructor(type) {
        this.type = type
    }
}

class Grid  {
    constructor(schema) {
        this.schema = schema
        this.current = this.create()
    }

    create() {
        return this.schema.map(column => column.map(type => new Gem(type)))
    }

    swap(gem) {
        return new Swap(gem);
    }
}

class Swap  {
    constructor(gem) {
        this.gem = gem;
    }

    with(gem2) {
        // swap gem1 with gem2 here
        // alter Grid current state
    }
}

const main = schema => {
    const game = new Grid(schema);
    return game.current;
}

export default {
    main,
    Grid
}
