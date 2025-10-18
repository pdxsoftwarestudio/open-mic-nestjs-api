import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'Unique identifier for the user.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'First name of user.' })
  @Column()
  firstName: string;

  @Field(() => String, { description: 'Last name of user.' })
  @Column()
  lastName: string;

  @Field(() => [Event], { description: 'Events created by the user.' })
  @OneToMany(() => Event, (event) => event.creator)
  eventsCreated: Event[];
}
