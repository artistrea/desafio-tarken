import {
  registerDecorator,
  ValidatorConstraint,
  type ValidationOptions,
  type ValidatorConstraintInterface,
  type ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'EqualsField' })
@Injectable()
export class EqualsFieldConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [otherPropName] = args.constraints;
    return args.object[otherPropName] === value;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} need to be equal`;
  }
}

export function EqualsField<T>(
  property: keyof T,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: EqualsFieldConstraint,
    });
  };
}
