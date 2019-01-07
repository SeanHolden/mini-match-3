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
}

const main = schema => {
    const game = new Grid(schema);
    return game.current;
}

export default main
