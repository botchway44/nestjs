import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../model/taskstatus';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStates = [
    TaskStatus.OPEN,
    TaskStatus.CLOSED,
    TaskStatus.PENDING,
  ];
  transform(value: any): void {
    value = value.toUpperCase();

    if (this.isValidState(value)) return value;
    else
      throw new BadRequestException(`Value of status ${value} is not defined`);
  }

  private isValidState(status: any) {
    const idx = this.allowedStates.indexOf(status);

    return idx !== -1;
  }
}
