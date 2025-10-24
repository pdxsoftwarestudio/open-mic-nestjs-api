import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Participant } from 'src/participants/entities/participant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Event {
  @Field(() => Int, { description: 'Unique identifier for the event.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, {
    description: 'User who created the event.',
    nullable: true,
  })
  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  @Field(() => String, { description: 'Title of the event.' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Description of the event.' })
  @Column()
  description: string;

  @Field(() => String, { description: 'ISO date/time of the event.' })
  @Column()
  date: string;

  @Field(() => String, { description: 'Location of the event.' })
  @Column()
  location: string;

  @Field(() => [Participant], { description: 'Participants of the event.' })
  @OneToMany(() => Participant, (participant) => participant.event)
  participants: Participant[];
}
