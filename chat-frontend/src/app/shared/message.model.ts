export class Message {
  constructor(
    public id: string,
    public author: string,
    public message: string,
    public datetime: string,
  ) {}
}

export interface MessageData {
  author: string,
  message: string,
}
