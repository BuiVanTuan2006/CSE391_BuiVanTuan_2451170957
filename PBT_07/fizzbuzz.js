// ==========================================
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// ==========================================
function classicFizzBuzz() {
    console.log("--- RUNNING CLASSIC FIZZBUZZ (1 - 100) ---");
    for (let i = 1; i <= 100; i++) {
        // Kiểm tra điều kiện ngặt nghèo nhất trước (chia hết cho cả 3 và 5)
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}


// ==========================================
// VERSION 2: CUSTOM FIZZBUZZ (MỞ RỘNG)
// ==========================================
function customFizzBuzz(n, rules) {
    console.log(`\n--- RUNNING CUSTOM FIZZBUZZ UP TO ${n} ---`);
    
    // Duyệt từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let resultStr = ""; // Chuỗi tích lũy các từ (Fizz, Buzz, Jazz,...)

        // Duyệt qua từng quy tắc (rule) có trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            const currentRule = rules[j];
            
            // Nếu số i chia hết cho divisor của rule hiện tại thì cộng dồn từ (word) vào chuỗi
            if (i % currentRule.divisor === 0) {
                resultStr += currentRule.word;
            }
        }

        // BIỆN PHÁP KIỂM TRA ĐẦU RA:
        // Nếu chuỗi resultStr vẫn rỗng (tức là không khớp với bất kỳ quy tắc nào), in ra chính số đó.
        // Ngược lại, nếu có khớp thì in ra chuỗi kết quả đã được cộng dồn.
        if (resultStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${resultStr}"`);
        }
    }
}


// ==========================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================

// 1. Chạy bản Classic (Bỏ comment dòng dưới để test từ 1-100)
// classicFizzBuzz();

// 2. Chạy bản Custom với bộ quy tắc 3, 5, 7
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);