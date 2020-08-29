export default class CardData {
  title: string = "(TODO)"
  description?: string
  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description;
  }
}