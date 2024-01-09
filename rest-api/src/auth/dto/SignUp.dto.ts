import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EqualsField } from 'src/custom_validations/equals-field/equals-field.decorator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @EqualsField<SignUpDto>('password')
  password_confirmation: string;
}
