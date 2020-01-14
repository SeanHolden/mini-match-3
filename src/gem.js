class Gem {
  constructor(type) {
    this.type = type;
  }

  pop() {
    this.type = BLANK;
  }

  isBlank() {
    return this.type === BLANK;
  }
}

export const BLANK = 0;

export default Gem;
