import { Module } from '@nestjs/common';
import { EqualsFieldConstraint } from './equals-field/equals-field.decorator';

@Module({
  providers: [EqualsFieldConstraint],
})
export class CustomValidationsModule {}
