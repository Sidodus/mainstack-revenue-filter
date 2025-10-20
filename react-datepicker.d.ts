declare module "react-datepicker" {
  // Minimal typing to satisfy TypeScript; adjust/extend if you need stricter types.
  import * as React from "react";
  type DateValue = Date | null;
  interface ReactDatePickerProps extends React.ComponentProps<"input"> {
    selected?: DateValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (date: DateValue, event?: React.SyntheticEvent<any>) => void;
    startDate?: DateValue;
    endDate?: DateValue;
    selectsStart?: boolean;
    selectsEnd?: boolean;
    placeholderText?: string;
    // ...other props are allowed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  const DatePicker: React.ComponentType<ReactDatePickerProps>;
  export default DatePicker;
}
