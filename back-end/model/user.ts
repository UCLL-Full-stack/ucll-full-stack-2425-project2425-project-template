export class User {
  private id?: number;
  private role: string;
  private name: string;
  private firstName: string;
  private password: string;
  private chat: string;



  constructor(user : {id?: number, role: string, name: string, firstName: string, password: string, chat: string}) {
    this.id = user.id;
    this.role = user.role;
    this.name = user.name;
    this.firstName = user.firstName;
    this.password = user.password;
    this.chat = user.chat;
  }

  public getId(): number|undefined {
    return this.id;
  }

  public getRole(): string {
    return this.role;
  }

  public getName(): string {
    return this.name;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getPassword(): string {
    return this.password;
  }
  public addChat(chat: string): void {
    this.chat = chat;
  }

  equals(user: User): boolean {
    return this.id === user.getId() && this.role === user.getRole() && this.name === user.getName() && this.firstName === user.getFirstName() && this.password === user.getPassword();
  }



}