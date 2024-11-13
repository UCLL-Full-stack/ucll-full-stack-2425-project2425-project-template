
import { GroupChat as GroupChatPrisma } from '@prisma/client';

export class GroupChat{
  private id?: number;
  private name: string;
  private description: string;
  private createdAt: Date;

  constructor(groupchat: {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
  }){
    this.validate(groupchat);
    this.id = groupchat.id;
    this.name = groupchat.name;
    this.description = groupchat.description;
    this.createdAt = groupchat.createdAt;
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
  }: GroupChatPrisma) {
    return new GroupChat({
        id,
        name,
        description,
        createdAt,
    });
  }
}