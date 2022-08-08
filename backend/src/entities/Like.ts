import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Post } from './Post';
import { User } from './User';

@Entity('likes')
class Like {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  post_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { Like };
