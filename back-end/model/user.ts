export class User {
  private id?: number;
  private role: string;
  private name: string;
  private firstName: string;
  private password: string;
  // private chat: string;



  constructor(user : {id?: number, role: string, name: string, firstName: string, password: string}) {
    this.validate(user);
    this.id = user.id;
    this.role = user.role;
    this.name = user.name;
    this.firstName = user.firstName;
    this.password = user.password;
    // this.chat = user.chat;
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


  equals(user: User): boolean {
    return this.id === user.getId() && this.role === user.getRole() && this.name === user.getName() && this.firstName === user.getFirstName() && this.password === user.getPassword();
  }

  validate(user: {id?: number, role: string, name: string, firstName: string, password: string}): void {
    if (!user.role || user.role === '') {
      throw new Error('User role is required');
    }
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