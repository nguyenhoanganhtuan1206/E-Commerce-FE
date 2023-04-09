import { format, parseISO } from "date-fns";

export const formatDateTime = (data) => {
  const pattern = "MMMM d, yyyy kk:mm:ss";
  const dateNew = parseISO(data);

  return format(dateNew, pattern);
};
