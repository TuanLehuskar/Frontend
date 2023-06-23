const setToastToLocalStorage = (newToastMessage) => {
  // Lấy danh sách toast messages từ localStorage
  const storedToastMessages = localStorage.getItem("toastMessages");
  let updatedToastMessages = [];
  if (storedToastMessages) {
    updatedToastMessages = JSON.parse(storedToastMessages);
  }

  // Thêm toast message mới vào đầu danh sách
  updatedToastMessages.unshift(newToastMessage);

  // Giới hạn số lượng phần tử thành 10
  updatedToastMessages = updatedToastMessages.slice(0, 10);

  // Lưu trữ danh sách toast messages cập nhật vào localStorage
  localStorage.setItem("toastMessages", JSON.stringify(updatedToastMessages));
};

export { setToastToLocalStorage };
