import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'Unique identifier for the user.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false, description: 'Email of user.' })
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Field(() => [Event], { description: 'Events created by the user.' })
  @OneToMany(() => Event, (event) => event.creator)
  eventsCreated: Event[];
}
