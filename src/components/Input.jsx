import React from 'react';
import './../styles/inputComponent.scss';

const Input = ({
  label,
  id,
  type,
  placeholder,
  required,
  register,
  errors,
  isDirty,
  subtitle,
}) => {
  const rules = {
    name: {
      minLength: {
        value: 2,
        message: `Name should contain at least 2 characters`,
      },
      maxLength: {
        value: 60,
        message: `Name should not exceed 60 characters`,
      },
    },

    email: {
      minLength: {
        value: 2,
        message: 'Email should contain at least 2 characters',
      },
      maxLength: {
        value: 100,
        message: 'Email should not exceed 100 characters',
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email address',
      },
    },

    phone: {
      pattern: {
        value: /^[+]?380([0-9]{9})$/,
        message:
          'Invalid phone number. Number should start with code of Ukraine +380',
      },
    },
  };

  return (
    <div className={errors[id] ? 'error inputComponent' : 'inputComponent'}>
      <label className={isDirty ? 'labelVisibility' : 'hidden'} htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {
          required: `${label} is required`,
          ...rules[id],
        })}
        placeholder={placeholder}
      ></input>
      {errors[id] && <p className="error_message">{errors[id].message}</p>}
      {!errors[id] && subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Input;
