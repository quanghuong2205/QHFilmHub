const messages = {
  required: (name: string) => `Please enter the ${name}`,
  isEmail: (name: string) => `Please enter an valid email`,
  isMinLen: (name: string, min: number) => `Your ${name} must contain ${min} characters at least`,
  isMaxLen: (name: string, max: number) => `Your ${name} must contain ${max} characters at most`,
  isMatch: (name: string) => `Your ${name} is not matched`,
};

const isEmpty = (value: string) => {
  return value === '';
};

const isEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isMinLen = (min: number, value: string) => {
  return value.length >= min;
};

const isMaxLen = (max: number, value: string) => {
  return value.length <= max;
};

const isMatch = (fieldA: string, fieldB: string) => {
  return fieldA === fieldB;
};

type RuleName = 'required' | 'isEmail' | 'isMinLen' | 'isMaxLen' | 'isMatch';

export interface Rule {
  rule: RuleName;
  field: string;
  value: any;
  minLen?: number;
  maxLen?: number;
  valueToMatch?: string;
}

interface ValidationResult {
  field: string;
  message: string;
}

export const validate = (rules: Rule[]): ValidationResult | null => {
  if (!rules || !rules.length) {
    return null;
  }

  for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];
    const { rule: ruleName, field, value } = rule;
    switch (ruleName) {
      case 'required': {
        if (isEmpty(value)) {
          return {
            message: messages.required(field),
            field,
          };
        }

        break;
      }

      case 'isEmail': {
        if (!isEmail(value)) {
          return {
            message: messages.isEmail(field),
            field,
          };
        }

        break;
      }

      case 'isMinLen': {
        if (!rule?.minLen) {
          throw new Error('Not provide min length to validate');
        }
        if (!isMinLen(rule.minLen, value)) {
          return {
            message: messages.isMinLen(field, rule.minLen),
            field,
          };
        }

        break;
      }

      case 'isMaxLen': {
        if (!rule?.maxLen) {
          throw new Error('Not provide max length to validate');
        }
        if (!isMinLen(rule.maxLen, value)) {
          return {
            message: messages.isMaxLen(field, rule.maxLen),
            field,
          };
        }

        break;
      }

      case 'isMatch': {
        if (!rule?.valueToMatch) {
          throw new Error(`Not provide value to compara with ${field}`);
        }
        if (!isMatch(value, rule.valueToMatch)) {
          return {
            message: messages.isMatch(field),
            field,
          };
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  return null;
};
