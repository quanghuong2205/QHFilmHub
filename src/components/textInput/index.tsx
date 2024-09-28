'use client';
import { ChangeEvent, RefObject, useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import CircleX from '@/Icon/CircleX';
import debounce from '@/utils/debounce';
import { Rule, validate } from '@/helpers/validator.helder';
import { EVENT } from '@/constant/event.const';
import { listenEvent } from '@/utils/event';

interface TextInputProps {
  label: string;
  initalValue?: string;
  placeholder?: string;
  rules?: Omit<Rule, 'value' | 'field'>[];
  fieldName: string;
  onType: (value: string | undefined) => void;
  type?: 'text' | 'password';
}

function TextInput({
  label,
  placeholder,
  initalValue,
  onType,
  rules,
  fieldName,
  type = 'text',
}: TextInputProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState(initalValue ?? '');
  const [error, setError] = useState('');
  const isError = error !== '';

  const handleDebounceType = useMemo(
    () => debounce((value: string) => setText(value), 300, false),
    [],
  );

  /* Handle focus the input */
  const handleFocus = () => {
    if (text !== '') return;
    ref.current?.focus();
    setIsFocus(true);
  };

  /* Handle blur the input */
  const handleBlur = () => {
    /* Focus input */
    if (text === '' && !rules?.find((r) => r.rule === 'required')) {
      return setIsFocus(false);
    }

    /* Validate rules */
    const modifiedRules = rules?.map((rule): Rule => {
      return { ...rule, value: text, field: fieldName };
    });
    let result = modifiedRules ? validate(modifiedRules) : null;

    /* Validation failed */
    if (result) {
      setError(result.message);
      onType(undefined);
      return;
    }

    /* Validation succeded*/
    onType(text);
    setError('');
  };

  /* Handle typing on input */
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    handleDebounceType.cancel();
    handleDebounceType(e.target.value) as any;
  };

  /* Reset input state */
  useEffect(() => {
    if (!isError) return;

    /* Event handler */
    const event = listenEvent(EVENT.RESET_INPUT_STATE, () => {
      setError('');
      setIsFocus(false);
      setText('');
      onType('');
    });

    /* Remove after component unmounted */
    return event;
  });

  /* Clear autofill by browser */
  useEffect(() => {
    ref.current!.value = '';
  }, []);

  return (
    <div
      className={styles['wrap']}
      onClick={handleFocus}>
      <div
        className={classNames({
          [`${styles['inner']}`]: true,
          [`${styles['inner--focus']}`]: isFocus || text,
          [`${styles['inner--error']}`]: isError,
        })}>
        <div className={styles['top']}>
          <div className={styles['input']}>
            <input
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type={type}
              onChange={handleOnChange}
              id={id}
              placeholder={placeholder}
              autoComplete='off'
            />
          </div>
          <div className={styles['label']}>
            <label htmlFor={id}>{label}</label>
          </div>
        </div>
        {isError && (
          <div className={styles['error']}>
            <div className={styles['error-icon']}>
              <CircleX />
            </div>
            <span className={styles['error-text']}>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextInput;
