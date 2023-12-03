import dayjs from 'dayjs';

export function calculateDaysInMonthRange(
  contractStartDate: string,
  contractEndDate: string,
): Record<string, number> {
  const start = dayjs(contractStartDate); // Bắt đầu từ đầu tháng
  const end = dayjs(contractEndDate);

  const daysInEachMonth: Record<string, number> = {};

  let currentMonth = start;

  while (currentMonth.isSame(end) || currentMonth.isBefore(end)) {
    const monthKey = currentMonth.format('YYYY-MM');
    // console.log(
    //   currentMonth.format('DD-MM-YYYY'),
    //   currentMonth.endOf('month').format('DD-MM-YYYY'),
    // );
    let endDay = currentMonth.endOf('month');
    if (currentMonth.endOf('month').isAfter(end)) {
      endDay = end;
    }

    const daysInMonth = endDay.diff(currentMonth, 'day') + 1; // Thay đổi ở đ
    // ây

    daysInEachMonth[monthKey] = Math.min(
      currentMonth.endOf('month').diff(currentMonth, 'day') + 1,
      daysInMonth,
    );
    currentMonth = currentMonth.startOf('month').add(1, 'month');
  }

  return daysInEachMonth;
}

// Example usage
const contractStartDate = '2023-01-15';
const contractEndDate = '2023-03-20';
const result = calculateDaysInMonthRange(contractStartDate, contractEndDate);

// Print the result
for (const month in result) {
  if (result.hasOwnProperty(month)) {
    console.log(`${month}: ${result[month]} ngày`);
  }
}
