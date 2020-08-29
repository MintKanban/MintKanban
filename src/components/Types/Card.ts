export default class Card {
  name: string = "(TODO)"
  description?: string
  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}