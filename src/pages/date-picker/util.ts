import dayjs from "dayjs";

export type DateTimeData = {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

export const fieldUnitLocaleKeyMap: Record<keyof DateTimeData, string> = {
  year: "year",
  month: "month",
  date: "day",
  hour: "hour",
  minute: "minute",
  second: "second",
};

export const fieldsOrder: Array<keyof DateTimeData> = [
  "year",
  "month",
  "date",
  "hour",
  "minute",
  "second",
];

export function stringToData(
  value: string = null,
  format: string,
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  }
): DateTimeData {
  const day = value ? dayjs(value, format) : dayjs();
  return {
    year: day.year(),
    month: day.month() + 1,
    date: day.date(),
    hour: day.hour() - (day.hour() % (step?.hour || 1)),
    minute: day.minute() - (day.minute() % (step?.minute || 1)),
    second: day.second() - (day.second() % (step?.second || 1)),
  };
}

export function dataToString(data: DateTimeData, format?: string): string {
  let day = dayjs();
  fieldsOrder.forEach(field => {
    if (typeof data[field] === "number") {
      if (field === "month") {
        day = day.set(field, data[field] - 1);
      } else {
        day = day.set(field, data[field]);
      }
    }
  });
  return day.format(format);
}

type DateFieldMap = Record<keyof DateTimeData, boolean>;
type DateFieldRanges = Record<keyof DateTimeData, [number, number] | false>;

export function dataToIndexes(
  data: DateTimeData,
  ranges: DateFieldRanges,
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  }
) {
  const indexes: number[] = [];
  fieldsOrder
    .filter(field => ranges[field])
    .forEach((field, index) => {
      indexes[index] =
        Math.floor(data[field] / (step?.[field] || 1)) -
        Math.floor(ranges[field][0] / (step?.[field] || 1));
    });
  return indexes;
}

export function indexesToData(
  indexes: number[],
  ranges: DateFieldRanges,
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  }
): DateTimeData {
  const data: DateTimeData = {};
  fieldsOrder
    .filter(field => ranges[field])
    .forEach((field, index) => {
      data[field] =
        ranges[field][0] -
        (ranges[field][0] % (step?.[field] || 1)) +
        indexes[index] * (step?.[field] || 1);
    });
  return data;
}

export function adjustData(
  rawData: DateTimeData,
  format: string,
  start: string,
  end: string
): DateTimeData {
  const data = { ...rawData };
  fieldsOrder.forEach(field => {
    if (typeof data[field] === "number") {
      const range = getFieldRanges(data, format, start, end);
      if (data[field] < range[field][0]) {
        // eslint-disable-next-line prefer-destructuring
        data[field] = range[field][0];
      }
      if (data[field] > range[field][1]) {
        // eslint-disable-next-line prefer-destructuring
        data[field] = range[field][1];
      }
    }
  });
  return data;
}

function getFields(format: string): DateFieldMap {
  return {
    year: format.includes("Y"),
    month: format.includes("M"),
    date: format.includes("D"),
    hour: format.includes("H") || format.includes("h"),
    minute: format.includes("m"),
    second: format.includes("s"),
  };
}

export function getFieldRanges(
  data: DateTimeData,
  format: string,
  startStr: string,
  endStr: string
): DateFieldRanges {
  const start = startStr
    ? dayjs(startStr, format)
    : dayjs("1970-01-01 00:00:00", "YYYY-MM-DD HH:mm:ss");
  const end = endStr
    ? dayjs(endStr, format)
    : dayjs("2099-12-31 23:59:59", "YYYY-MM-DD HH:mm:ss");

  const fields = getFields(format);

  const ranges: DateFieldRanges = {
    year: false,
    month: false,
    date: false,
    hour: false,
    minute: false,
    second: false,
  };

  if (fields.year) {
    ranges.year = [start.year(), end.year()];
  }

  if (fields.month) {
    if (fields.year) {
      let min = 1;
      let max = 12;
      if (data.year === start.year()) {
        min = start.month() + 1;
      }
      if (data.year === end.year()) {
        max = end.month() + 1;
      }
      ranges.month = [min, max];
    } else {
      ranges.month = [start.month() + 1, end.month() + 1];
    }
  }

  if (fields.date) {
    if (fields.month) {
      let min = 1;
      let max = dayjs()
        .set("year", data.year)
        .set("month", data.month - 1)
        .daysInMonth();
      if (data.year === start.year() && data.month === start.month() + 1) {
        min = start.date();
      }
      if (data.year === end.year() && data.month === end.month() + 1) {
        max = end.date();
      }
      ranges.date = [min, max];
    } else {
      ranges.date = [start.date(), end.date()];
    }
  }

  if (fields.hour) {
    let min = 0;
    let max = 23;
    if (fields.date) {
      if (
        data.year === start.year() &&
        data.month === start.month() + 1 &&
        data.date === start.date()
      ) {
        min = start.hour();
      }
      if (
        data.year === end.year() &&
        data.month === end.month() + 1 &&
        data.date === end.date()
      ) {
        max = end.hour();
      }
      ranges.hour = [min, max];
    } else {
      ranges.hour = [start.hour(), end.hour()];
    }
  }

  if (fields.minute) {
    if (fields.hour) {
      let min = 0;
      let max = 59;
      if (
        (typeof data.year !== "number" || data.year === start.year()) &&
        (typeof data.month !== "number" || data.month === start.month() + 1) &&
        (typeof data.date !== "number" || data.date === start.date()) &&
        (typeof data.hour !== "number" || data.hour === start.hour())
      ) {
        min = start.minute();
      }
      if (
        (typeof data.year !== "number" || data.year === end.year()) &&
        (typeof data.month !== "number" || data.month === end.month() + 1) &&
        (typeof data.date !== "number" || data.date === end.date()) &&
        (typeof data.hour !== "number" || data.hour === end.hour())
      ) {
        max = end.minute();
      }
      ranges.minute = [min, max];
    } else {
      ranges.minute = [start.minute(), end.minute()];
    }
  }

  if (fields.second) {
    if (fields.minute) {
      let min = 0;
      let max = 59;
      if (
        data.year === start.year() &&
        data.month === start.month() + 1 &&
        data.date === start.date() &&
        data.hour === start.hour() &&
        data.minute === start.minute()
      ) {
        min = start.second();
      }
      if (
        data.year === end.year() &&
        data.month === end.month() + 1 &&
        data.date === end.date() &&
        data.hour === end.hour() &&
        data.minute === end.minute()
      ) {
        max = end.second();
      }
      ranges.second = [min, max];
    } else {
      ranges.second = [start.second(), end.second()];
    }
  }
  return ranges;
}
