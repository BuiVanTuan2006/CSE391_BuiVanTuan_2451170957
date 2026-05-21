function calculate(num1, operator, num2) {
    // 1. Kiểm tra input có phải là số hay không
    // Sử dụng typeof kết hợp với isNaN để chặn trường hợp NaN (vốn cũng có typeof là "number")
    if (typeof num1 !== "number" || typeof num2 !== "number" || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Kiểm tra lỗi chia cho số 0 (áp dụng cho cả chia lấy phần dư %)
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // 3. Thực hiện tính toán dựa trên operator
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2; // Phép mũ (ES6)
        default:
            // 4. Xử lý trường hợp toán tử không hợp lệ
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// --- BỘ KIỂM THỬ (TEST CASES) ---
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → Lỗi: Không thể chia cho 0
console.log(calculate(10, "^", 5));    // → Lỗi: Operator '^' không hợp lệ
console.log(calculate("abc", "+", 5)); // → Lỗi: Input không phải số
console.log(calculate(2, "**", 10));   // → 1024

// Test thêm một số trường hợp đặc biệt khác:
console.log(calculate(10, "%", 0));    // → Lỗi: Không thể chia cho 0
console.log(calculate(10, "+", NaN));  // → Lỗi: Input không phải số