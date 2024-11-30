
import { GroupChat as GroupChatPrisma,
  User as userPrisma

 } from '@prisma/client';
import { User } from './user';

export class GroupChat{
  private id?: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private users: User[] = [];

  constructor(groupchat: {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
    users?: User[];
  }){
    this.validate(groupchat);
    this.id = groupchat.id;
    this.name = groupchat.name;
    this.description = groupchat.description;
    this.createdAt = groupchat.createdAt;
    this.users = groupchat.users ?? [];
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getDescription(): string {
      return this.description;
  }

  public getCreatedAt(): Date {
      return this.createdAt;
  }

  public getName(): string {
    return this.name;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public addUser(user: User): void {
    this.users.push(user);
  }

  validate(groupchat: { id?: number; name: string; description: string; createdAt: Date }): void {
    if (!groupchat.createdAt) {
        throw new Error('GroupChat creation date is required');
    }
  }

  static from({
    id,
    name,
    description,
    createdAt,
    users
  }: GroupChatPrisma & { users: userPrisma[] }){
    return new GroupChat({
        id,
        name,
        description,
        createdAt,
        users: users.map((user) => User.from(user)),
    });
  }
}