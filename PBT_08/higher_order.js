// ==========================================
// 1. pipe() — Nối chuỗi các hàm xử lý tuần tự
// ==========================================
function pipe(...fns) {
    // Trả về một hàm nhận tham số đầu vào ban đầu
    return function(initialValue) {
        // Sử dụng reduce để luân chuyển kết quả qua từng hàm từ trái sang phải
        return fns.reduce((currentValue, currentFn) => {
            return currentFn(currentValue);
        }, initialValue);
    };
}


// ==========================================
// 2. memoize() — Caching kết quả tính toán tốn kém
// ==========================================
function memoize(fn) {
    // Khởi tạo một object đóng vai trò làm kho lưu trữ bộ nhớ đệm (cache)
    const cache = {};

    return function(...args) {
        // Chuyển mảng các đối số (arguments) thành một chuỗi JSON độc bản để làm Key
        const key = JSON.stringify(args);

        // Nếu Key này đã từng được tính toán, lấy ngay từ cache trả về
        if (key in cache) {
            return cache[key];
        }

        // Nếu chưa có, thực thi hàm gốc, lưu kết quả vào cache rồi trả về
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}


// ==========================================
// 3. debounce() — Trì hoãn thực thi đến khi hành động dừng lại
// ==========================================
function debounce(fn, delay) {
    let timeoutId = null;

    return function(...args) {
        // Mỗi lần hàm này được gọi, lập tức hủy bỏ lịch hẹn của lượt gọi ngay trước đó
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập một lịch hẹn mới tinh sau khoảng thời gian `delay`
        timeoutId = setTimeout(() => {
            fn.apply(this, args); // Đảm bảo giữ đúng ngữ cảnh `this` và truyền đủ tham số
        }, delay);
    };
}


// ==========================================
// 4. retry() — Tự động thực thi lại hàm nếu gặp lỗi
// ==========================================
async function retry(fn, maxAttempts = 3) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            attempts++;
            // Thử thực hiện hàm gốc (sử dụng await vì đây thường là tác vụ bất đồng bộ)
            return await fn();
        } catch (error) {
            // Nếu đã vượt quá giới hạn số lần thử lại cho phép, ném ra lỗi cuối cùng
            if (attempts >= maxAttempts) {
                throw new Error(`[Thất bại hoàn toàn] Đã thử lại ${maxAttempts} lần nhưng vẫn lỗi. Chi tiết: ${error.message}`);
            }
            console.log(`[Cảnh báo] Lượt thử ${attempts} thất bại. Đang chuẩn bị thử lại...`);
        }
    }
}


// ============================================================================
// --- BỘ KIỂM THỬ KẾT QUẢ (TEST CASES) ---
// ============================================================================

// --- TEST FUNCTION 1: pipe ---
console.log("=== TEST 1: PIPE FUNCTION ===");
const processPipe = pipe(
    x => x * 2,         // 5 → 10
    x => x + 10,        // 10 → 20
    x => x.toString(),  // 20 → "20"
    x => "Kết quả: " + x
);
console.log(processPipe(5)); // → "Kết quả: 20"


// --- TEST FUNCTION 2: memoize ---
console.log("\n=== TEST 2: MEMOIZE FUNCTION ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán từ đầu...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(100000)); // Lần 1: In ra "Đang tính toán từ đầu..." -> 4999950000
console.log(expensiveCalc(100000)); // Lần 2: Lấy từ cache ngay lập tức, KHÔNG in chữ "Đang tính..."
console.log(expensiveCalc(500));    // Tham số mới: In ra "Đang tính toán từ đầu..."


// --- TEST FUNCTION 3: debounce ---
console.log("\n=== TEST 3: DEBOUNCE FUNCTION ===");
const search = debounce((query) => {
    console.log("-> Đang kích hoạt API Tìm Kiếm:", query);
}, 300);

// Mô phỏng hành động người dùng gõ phím liên tục vào ô Input ô tìm kiếm
search("a");
search("an");
search("and"); // Chỉ có lần gọi cuối cùng này mới được thực thi sau khi người dùng ngừng gõ 300ms


// --- TEST FUNCTION 4: retry ---
console.log("\n=== TEST 4: RETRY FUNCTION ===");
// Giả lập một hàm gọi API có tỷ lệ lỗi ngẫu nhiên cao
let apiCallCount = 0;
const unstableApiCall = async () => {
    apiCallCount++;
    if (apiCallCount < 3) {
        throw new Error("Lỗi mất kết nối mạng Gateway!");
    }
    return "Dữ liệu API tải thành công! 🎉";
};

// Chạy thử hàm retry bọc ngoài tác vụ bất ổn định trên
(async () => {
    try {
        const data = await retry(unstableApiCall, 4);
        console.log("Kết quả nhận được từ retry:", data);
    } catch (err) {
        console.error(err.message);
    }
})();