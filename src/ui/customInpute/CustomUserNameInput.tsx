/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import scss from './Style.module.scss';

interface TypeProps {
  placeholder: string;
  registerName: string;
  register: any;
}

const CustomUserNameInput: FC<TypeProps> = ({
  placeholder,
  registerName,
  register
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={scss.user_name_input}
      {...register(registerName)}
    />
  );
};

export default CustomUserNameInput;
