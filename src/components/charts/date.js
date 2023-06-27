const today = new Date();

// Tạo mảng chứa 7 ngày trước đó
const sevenDaysAgo = [];
for (let i = 6; i >= 0; i--) {
  const day = new Date(today);
  day.setDate(today.getDate() - i);

  // Lấy thông tin ngày, tháng, năm
  const date = day.getDate();
  const month = day.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = day.getFullYear();

  // Tạo chuỗi ngày tháng năm
  const dateString = `${date}/${month}/${year}`;

  sevenDaysAgo.push(dateString);
}

export default sevenDaysAgo;
