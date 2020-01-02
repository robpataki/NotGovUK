import * as React from 'react';
import Checkboxes from './checkboxes';
import DateInput from './date-input';
import Input from './input';
import Radios from './radios';
import Select from './select';
import Textarea from './textarea';
import { className } from '../../helpers';

interface IOption {
  disabled?: boolean,
  label: string,
  value: string,
  selected: string
};

interface IFormField {
  /** Identifier for auto-completion */
  autoComplete?: string,
  /** Extra CSS classes to be applied */
  className?: string,
  /** Initial value of the field */
  defaultValue?: string,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: string,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Whether checkboxes and radios should be displayed on a single line on wide displays (inferred from number of options if not provided)*/
  inline?: boolean,
  /** Label */
  label: any,
  /** Whether multiple options can be selected */
  multiple?: boolean,
  /** HTML name */
  name: string,
  /** List of options to select from */
  options?: Array<IOption>,
  /** Initial number of lines of input on a text area or the size of a select */
  rows?: number,
  /** Whether checkboxes and radios should be small (inferred from number of options if not provided) */
  small?: boolean,
  /** Whether the browser should spellcheck the input */
  spellCheck?: boolean,
  /** Type of field (inferred if not provided) */
  type?: string,
};

export const FormField: React.SFC<IFormField> = props => {
  let inferredType;
  if (props.options) {
    if (props.options.length < 8) {
      inferredType = props.multiple ? 'checkboxes' : 'radios';
    } else {
      inferredType = 'select';
    }
  }
  else if (props.rows) {
    inferredType = 'textarea';
  } else {
    inferredType = 'text'
  }

  const type = props.type || inferredType;
  const processedProps = {
    ...props,
    className: className(props.error && 'error', props.className),
    id: props.id || props.name,
    inline: props.inline || (props.options && props.options.length <= 3),
    small: props.small || (props.options && props.options.length >= 6),
    spellcheck: (props.spellCheck !== null) && (props.spellCheck ? 'true' : 'false'),
    type: type === 'native-date' ? 'date' : type
  };

  return (
    type === 'checkboxes' ? Checkboxes(processedProps) :
    type === 'date' ? DateInput(processedProps) :
    type === 'radios' ? Radios(processedProps) :
    type === 'select' ? Select(processedProps) :
    type === 'textarea' ? Textarea(processedProps) :
    Input(processedProps)
  );
};

FormField.defaultProps = {
  autoComplete: null,
  className: null,
  defaultValue: null,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  inline: null,
  multiple: null,
  options: null,
  rows: null,
  small: null,
  spellCheck: null,
};

export default FormField;
