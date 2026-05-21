// 1. Máy tạo ngẫu nhiên 1 số từ 1 đến 100
const targetNumber = Math.floor(Math.random() * 100) + 1;

// Khởi tạo các biến quản lý trạng thái trò chơi
const maxAttempts = 7;          // Giới hạn 7 lần đoán
let attempts = 0;               // Đếm số lần đoán hiện tại
let hasWon = false;             // Trạng thái thắng/thua
const guessedNumbers = [];      // Mảng lưu lại các số đã đoán để kiểm tra trùng

// Gửi lời chào đầu game
alert("Chào mừng bạn đến với game Đoán Số!\nMáy đã chọn ngẫu nhiên một số từ 1 đến 100. Bạn có tối đa 7 lượt đoán. Bắt đầu thôi!");

// Vòng lặp chính của trò chơi: chạy khi chưa hết lượt và chưa đoán trúng
while (attempts < maxAttempts && !hasWon) {
    let currentTurn = attempts + 1;
    
    // Hiện hộp thoại yêu cầu người dùng nhập số
    let input = prompt(`[Lượt ${currentTurn}/${maxAttempts}] Mời bạn nhập một số từ 1 đến 100:`);

    // Xử lý trường hợp người chơi bấm "Cancel" (Hủy bỏ cuộc chơi)
    if (input === null) {
        alert("Bạn đã hủy trò chơi. Hẹn gặp lại lần sau!");
        break;
    }

    // Chuyển chuỗi nhập vào thành số nguyên
    let guess = parseInt(input.trim(), 10);

    // --- BƯỚC VALIDATE INPUT (KIỂM TRA ĐẦU VÀO) ---
    // Kiểm tra xem có phải là số hợp lệ từ 1 đến 100 không
    if (Number.isNaN(guess) || guess < 1 || guess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập số nguyên trong khoảng từ 1 đến 100!");
        continue; // Bỏ qua lượt này, không tính vào số lần đoán, quay lại đầu vòng lặp
    }

    // Kiểm tra xem số này đã được đoán ở các lượt trước chưa
    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }

    if (isDuplicated) {
        alert(`Bạn đã đoán số ${guess} này rồi! Hãy thử một số khác.`);
        continue; // Trùng số cũ thì không tính lượt đoán, bắt nhập lại
    }

    // --- GHI NHẬN LƯỢT ĐOÁN HỢP LỆ ---
    attempts++; // Tăng số lần đoán hợp lệ lên 1
    guessedNumbers.push(guess); // Thêm số vừa đoán vào danh sách đã đoán

    // --- KIỂM TRA ĐÁP ÁN ---
    if (guess === targetNumber) {
        hasWon = true;
        alert(`Đúng rồi!\nChúc mừng bạn đã đoán trúng số ${targetNumber} sau ${attempts} lần đoán! 🎉`);
    } else if (guess < targetNumber) {
        alert("Số bạn đoán THẤP HƠN số của máy.");
    } else {
        alert("Số bạn đoán CAO HƠN số của máy.");
    }
}

// --- XỬ LÝ KHI KẾT THÚC GAME MÀ CHƯA THẮNG (HẾT LƯỢT) ---
if (!hasWon && attempts === maxAttempts) {
    alert(`Rất tiếc, bạn đã hết lượt đoán! 😢\nĐáp án chính xác là: ${targetNumber}.\nChúc bạn may mắn hơn ở lượt chơi sau!`);
}