import { format, differenceInDays } from "date-fns";

function parsedTime(val) {
  const date = new Date(val);
  const today = new Date();

  // const isTodayDay = isToday(date);
  const diff = differenceInDays(today, date);

  let res = "";

  if (!diff) {
    res = `Today ${format(date, "HH:mm")}`;
  } else if (diff < 5) {
    res = `${diff} days ago`;
  } else {
    res = format(date, "MM:dd:yyyy HH:mm");
  }

  return res;
}

export default parsedTime;
