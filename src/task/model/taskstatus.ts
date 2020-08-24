import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
