import React, { useContext, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import successImage from './../assets/success-image.svg';

import './../styles/form.scss';
import { UserContext } from '../context/UserContext';
import { truncateText } from '../utils';

const Form = () => {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoName, setPhotoName] = useState('');

  const { fetchNewUserById } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      photo: '',
    },
  });

  useEffect(() => {
    axios.get(`/positions`).then(({ data }) => {
      setPosition(data.positions);
    });
  }, []);

  const photoValues = getValues('photo');

  useEffect(() => {
    if (photoValues[0]) {
      setPhotoName(truncateText(photoValues[0].name, 25));
    }
  }, [photoValues]);

  const formData = watch();
  const areSomeFieldEmpty = Object.values(formData).some(
    (value) => value === ''
  );

  const onSubmit = async (data) => {
    const res = await axios.get('/token');
    const token = res.data.token;

    if (!token) {
      return toast.error('Something went wrong with fetch token');
    }

    const formData = new FormData();
    formData.append(
      'position_id',
      position.find(({ name }) => name === data.position).id
    );
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', data.photo[0]);

    setIsLoading(true);

    axios
      .post('/users', formData, {
        headers: {
          Token: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        fetchNewUserById(data.user_id);
        setSuccess(true);
        toast.success(data.message);
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (success) {
    return (
      <div className="success">
        <h2>User successfully registered</h2>
        <img src={successImage} alt="success fetch"></img>
      </div>
    );
  }

  return (
    <div className="form_component" id="signUp">
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Working with POST request</h2>
        <Input
          id="name"
          type={'text'}
          label="Name"
          register={register}
          errors={errors}
          placeholder={'Your name'}
          isDirty={dirtyFields.name}
        />
        <Input
          id="email"
          type={'text'}
          label="Email"
          register={register}
          errors={errors}
          placeholder={'Email'}
          isDirty={dirtyFields.email}
        />
        <Input
          id="phone"
          type={'text'}
          label="Phone"
          register={register}
          errors={errors}
          placeholder={'Phone'}
          subtitle={'+38 (XXX) XXX - XX - XX'}
          isDirty={dirtyFields.phone}
        />

        <div className="select_position">
          <h3>Select your position</h3>
          {position ? (
            position.map(({ name, id }) => (
              <div key={id}>
                <input
                  type="radio"
                  id={name}
                  name="position"
                  value={name}
                  {...register('position', {
                    required: `Position is required`,
                  })}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))
          ) : (
            <Loader />
          )}
          {errors.position && (
            <p style={{ color: 'red' }}>{errors.position.message}</p>
          )}
        </div>

        <label
          className={photoName ? 'photoUploaded uploadPhoto' : '  uploadPhoto'}
        >
          <span>Upload</span>
          <input
            type="file"
            style={{ display: 'none' }}
            {...register('photo', {
              required: `Photo is required`,
            })}
          />
          {photoName || 'Upload your photo'}
        </label>
        {errors.position && (
          <p style={{ color: 'red', marginTop: '-45px' }}>
            {errors.photo.message}
          </p>
        )}

        <div className="button-container">
          <Button
            disabled={areSomeFieldEmpty}
            type={'submit'}
            title={'Sign up'}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
