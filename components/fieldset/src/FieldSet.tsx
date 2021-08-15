import { FC, FieldsetHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/FieldSet.scss';

export type FieldSetProps = StandardProps & FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: ReactNode
};

export const FieldSet: FC<FieldSetProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  legend,
  ...attrs
}) => {
  const classes = classBuilder('govuk-fieldset', classBlock, classModifiers, className);

  return (
    <fieldset {...attrs} className={classes()}>
      <legend className={classes('legend')}>{legend}</legend>
      {children}
    </fieldset>
  );
};

Fieldset.displayName = 'Fieldset';

export default FieldSet;
