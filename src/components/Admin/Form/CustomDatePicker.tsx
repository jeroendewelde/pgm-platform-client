import React, { ReactElement, useState } from "react";
import Badge from "@mui/material/Badge";

import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import PickersDay from "@mui/lab/PickersDay";
import CalendarPickerSkeleton from "@mui/lab/CalendarPickerSkeleton";
import getDaysInMonth from "date-fns/getDaysInMonth";
import beLocale from "date-fns/locale/nl-BE";

// interface CustomDatePickerProps {
// 	props:
// }

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Date, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

// const initialValue = new Date();

// export default function CustomDatePicker({  children, ...props}: TextFieldProps): ReactElement {
export default function CustomDatePicker(props: any): ReactElement {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [value, setValue] = React.useState<Date | null>();

  // FOR FORMIK
  const {
    form: { setFieldValue },
    field: { name },
    children,
    helperText,
    label,
    value: valueProp,
  } = props;

  const fetchHighlightedDays = (date: Date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  const handleMonthChange = (date: Date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={beLocale}>
      <DatePicker
        label={label}
        value={valueProp ? valueProp : value}
        loading={isLoading}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue(name, newValue ? newValue : "");
        }}
        onMonthChange={handleMonthChange}
        renderInput={(params) => (
          <TextField helperText={helperText} {...params} />
        )}
        renderLoading={() => <CalendarPickerSkeleton />}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays.indexOf(day.getDate()) > 0;

          return (
            <Badge key={day.toString()} overlap="circular">
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
  );
}
