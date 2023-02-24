/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/form/form.tsx
 */
import React from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";

export interface FormProps extends StandardProps {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, ...props },
  ref
) {
  return <form ref={ref} className={classNames(className)} {...props} />;
});
