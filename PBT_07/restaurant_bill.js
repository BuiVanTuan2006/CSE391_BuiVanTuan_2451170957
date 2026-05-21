function inHoaDon(items, includeTip = false, customDate = null) {
    // 1. Lấy ngày hiện tại (hoặc dùng ngày giả lập để test)
    const currentDate = customDate ? new Date(customDate) : new Date();
    const isWednesday = currentDate.getDay() === 3; // 3 đại diện cho Wednesday

    // 2. Tính tổng tiền gốc của các món ăn
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].quantity;
    }

    // 3. Tính phần trăm giảm giá theo giá trị hóa đơn
    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent = 15; // Giảm 15% nếu bill > 1 triệu
    } else if (subtotal > 500000) {
        discountPercent = 10; // Giảm 10% nếu bill > 500k
    }

    // Nếu là Thứ Tư, cộng thêm 5% giảm giá
    if (isWednesday) {
        discountPercent += 5;
    }

    // Tính số tiền được giảm
    const discountAmount = (subtotal * discountPercent) / 100;
    const totalAfterDiscount = subtotal - discountAmount;

    // 4. Tính thuế VAT (8%) và Tip (5% nếu có) dựa trên số tiền sau giảm giá
    const vatAmount = totalAfterDiscount * 0.08;
    const tipAmount = includeTip ? totalAfterDiscount * 0.05 : 0;

    // 5. Tổng số tiền cuối cùng phải thanh toán
    const finalTotal = totalAfterDiscount + vatAmount + tipAmount;

    // --- HÀM TRỢ GIÚP ĐỊNH DẠNG CHUỖI ---
    // Định dạng số thành dạng "200.000đ"
    const formatMoney = (amount) => {
        return Math.round(amount).toLocaleString("vi-VN") + "đ";
    };

    // Chiều rộng cố định của ruột hóa đơn (không tính 2 biên dọc ║)
    const contentWidth = 38; 

    // --- TIẾN HÀNH IN HÓA ĐƠN ---
    console.log("╚" + "═".repeat(contentWidth + 2) + "╝");
    console.log("║" + "HÓA ĐƠN NHÀ HÀNG".padStart(contentWidth / 2 + 8).padEnd(contentWidth + 2) + "║");
    console.log("╠" + "═".repeat(contentWidth + 2) + "╣");

    // In từng món ăn
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lineNo = `${i + 1}. `;
        const name = item.name.padEnd(12);
        const qty = `x${item.quantity}`.padEnd(5);
        const singlePrice = `@${formatMoney(item.price)}`.padEnd(9);
        const itemTotal = `= ${formatMoney(item.price * item.quantity)}`;
        
        // Ghép dòng và căn đều khoảng trắng
        const leftPart = lineNo + name + qty + singlePrice;
        const completeLine = leftPart + itemTotal.padStart(contentWidth + 2 - leftPart.length);
        console.log(`║ ${completeLine} ║`);
    }

    console.log("╠" + "═".repeat(contentWidth + 2) + "╣");

    // Hàm phụ in các dòng tổng kết ở cuối hóa đơn
    const printSummaryLine = (label, value) => {
        const spaceCount = contentWidth + 2 - label.length - value.length;
        console.log(`║ ${label}${" ".repeat(spaceCount)}${value} ║`);
    };

    printSummaryLine("Tổng cộng:", formatMoney(subtotal));
    printSummaryLine(`Giảm giá (${discountPercent}%):`, formatMoney(discountAmount));
    printSummaryLine("VAT (8%):", formatMoney(vatAmount));
    printSummaryLine(`Tip (${includeTip ? "5%" : "0%"}):`, formatMoney(tipAmount));

    console.log("╠" + "═".repeat(contentWidth + 2) + "╣");
    printSummaryLine("THANH TOÁN:", formatMoney(finalTotal));
    console.log("╚" + "═".repeat(contentWidth + 2) + "╝");
}


// ==========================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================

// Menu test 1: Giống hệt ví dụ của đề bài (Tổng 200k, không đạt mốc giảm giá bill)
const cart1 = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

console.log("TEST 1: Ngày thường (Thứ Năm), có Tip");
inHoaDon(cart1, true, "2026-05-21"); // Ngày 21/05/2026 là Thứ Năm

console.log("\nTEST 2: Đúng ngày Thứ Tư (Wednesday), được giảm thêm 5%");
inHoaDon(cart1, true, "2026-05-20"); // Ngày 20/05/2026 là Thứ Tư


// Menu test 2: Hóa đơn khủng > 1 triệu để kích hoạt giảm giá 15%
const cart2 = [
    { name: "Lẩu cá hồi", price: 450000, quantity: 2 },
    { name: "Sashimi", price: 120000, quantity: 3 },
    { name: "Rượu sake", price: 150000, quantity: 1 }
];

console.log("\nTEST 3: Hóa đơn lớn (>1M) vào ngày Thứ Tư (15% bill + 5% ngày = 20%)");
inHoaDon(cart2, false, "2026-05-20");