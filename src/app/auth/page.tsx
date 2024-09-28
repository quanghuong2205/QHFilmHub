'use client';
import styles from './styles.module.scss';
import TextInput from '@/components/textInput';
import Link from 'next/link';
import { useState } from 'react';
import Google from '@/Icon/Google';
import Facebook from '@/Icon/Facebook';
import SubmitButton from './submit-button';
import useAuthMode from './auth-mode.hook';

function Auth() {
  /* Controll Auth mode (sign-in or sign-up) */
  const { isSignIn, handleSwitchMode } = useAuthMode();

  /* Auth form infor */
  const [authInfor, setAuthInfor] = useState<IAuthForm>({
    email: '',
    password: '',
    name: '',
  });

  /* Hanlde typing on input */
  const handleType = (name: AuthField) => (value: string | undefined) => {
    if (authInfor[name] === value) return;
    setAuthInfor((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className={styles['form']}>
      <div className={styles['form-header']}>
        <h1>{isSignIn ? 'Sign in' : 'Sign up'}</h1>
      </div>

      <div className={styles['form-boxes']}>
        {!isSignIn && (
          <div className={styles['form-box']}>
            <TextInput
              label='Full name'
              onType={handleType('name')}
              fieldName='full name'
              rules={[{ rule: 'required' }]}
            />
          </div>
        )}

        <div className={styles['form-box']}>
          <TextInput
            label='Email or mobile number'
            onType={handleType('email')}
            fieldName='email'
            rules={[{ rule: 'required' }, { rule: 'isEmail' }]}
          />
        </div>

        <div className='box'>
          <TextInput
            label='Password'
            onType={handleType('password')}
            fieldName='password'
            type='password'
            rules={[
              { rule: 'required' },
              { rule: 'isMinLen', minLen: 8 },
              { rule: 'isMaxLen', maxLen: 8 },
            ]}
          />
        </div>

        {!isSignIn && (
          <div className='box'>
            <TextInput
              label='Re-enter passsword'
              onType={() => {}}
              fieldName='confirmed password'
              rules={[{ rule: 'required' }, { rule: 'isMatch', valueToMatch: authInfor.password }]}
            />
          </div>
        )}
      </div>

      <div className={styles['form-acts']}>
        <SubmitButton
          authInfor={authInfor}
          isSignIn={isSignIn}
        />
        {isSignIn && (
          <>
            <p>OR</p>
            <button className='btn outline-btn'>
              <Google />
              <span>Sign in with google</span>
            </button>
            <button className='btn outline-btn'>
              <Facebook />
              <span>Sign in with facebook</span>
            </button>
            <Link
              href='/'
              className={styles['form-link']}>
              Forgot password?
            </Link>
          </>
        )}
      </div>

      <div className={styles['form-footer']}>
        <div className={styles['form-guide']}>
          <span>{isSignIn ? 'New to QH?' : 'Already in QH?'}</span>
          <button
            onClick={handleSwitchMode}
            className={styles['form-link']}>
            {isSignIn ? 'Sign up now' : 'Sign in now'}
          </button>
        </div>

        <p className={styles['policy']}>
          This page is protected by Google reCAPTCHA to ensure you are not a bot.
        </p>
      </div>
    </div>
  );
}

export default Auth;
