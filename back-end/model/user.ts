import { Chat } from "./chat";

export class User {
  private id?: number;
  private role?: string;
  private name: string;
  private firstName: string;
  private password: string;
  private chats?: Chat[] = []; 



  constructor(user : {id?: number, role?: string, name: string, firstName: string, password: string, chats?: Chat[]}) {
    this.validate(user);
    this.id = user.id;
    this.role = user.role;
    this.name = user.name;
    this.firstName = user.firstName;
    this.password = user.password;
    this.chats = user.chats || [];
  }

  public getId(): number|undefined {
    return this.id;
  }

  public getRole(): string|undefined {
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

  public getChats(): Chat[] {
    return this.chats || [];
  }

  public addChat(chat: Chat): void {
    this.chats?.push(chat);
  }
  


  equals(user: User): boolean {
    return this.id === user.getId() && this.name === user.getName() && this.firstName === user.getFirstName() && this.password === user.getPassword();
  }

  validate(user: {id?: number, role?: string, name: string, firstName: string, password: string}): void {

    if (!user.name || user.name === '') {
      throw new Error('User name is required');
    }
    if (!user.firstName || user.firstName === '') {
      throw new Error('User first name is required');
    }
    if (!user.password || user.password === '') {
      throw new Error('User password is required');
    }

  }



}