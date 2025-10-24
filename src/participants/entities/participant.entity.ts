import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'A participant tied to a specific event' })
@Entity()
export class Participant {
  @Field(() => Int, { description: 'Unique identifier for the participant.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Name of the participant.' })
  @Column()
  name: string;

  @Field(() => Event, { description: 'The event the participant belongs to.' })
  @ManyToOne(() => Event, (event) => event.id)
  event: Event;
}
