Câu A1

- Dưới đây là 3 cách trên sau khi được viết lại:

JavaScript

+ Cách 1: Cực kỳ gọn gàng khi chèn biến vào văn bản
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

+ Cách 2: Giúp đường dẫn API dễ đọc, không bị rối mắt bởi các dấu cộng
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

+ Cách 3: Viết chuỗi nhiều dòng (Multi-line) tự nhiên, không cần nối chuỗi hay escape dấu nháy kép
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

- Ba điểm cộng lớn nhất khi chuyển sang Template Literals:
+ Giữ nguyên định dạng: Bạn có thể xuống dòng thoải mái (như ở Cách 3), định dạng trong mã nguồn thế nào thì chuỗi kết quả sẽ ra y như vậy.

+ Không cần escape dấu nháy: Bạn có thể dùng thoải mái dấu nháy đơn ' hoặc nháy kép " bên trong cặp backtick mà không sợ bị lỗi cú pháp.

+ Cú pháp ${biến}: Giúp phân tách rõ ràng đâu là chữ viết static (cố định) và đâu là giá trị động của biến.

Câu A2

* Dự đoán 
Output
- Đoạn 1:

JavaScriptconsole.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
- Đoạn 2 (Sau 200ms):

Plaintextvar: 3
var: 3
var: 3
let: 0
let: 1
let: 2

(Lưu ý về mặt thời gian: 3 dòng var: sẽ xuất hiện đồng thời sau 100ms đầu tiên, sau đó 100ms nữa tức tổng cộng 200ms thì 3 dòng let: mới xuất hiện).

Giải thích chi tiết cơ chế hoạt động
1. Tại sao Đoạn 1 hoạt động như vậy? (Ứng dụng của Closure)
+ Hàm counter() tạo ra một biến cục bộ let count = 0 và trả về một Object chứa 3 phương thức.
+ Bản chất ở đây là cả 3 hàm mũi tên (increment, decrement, getCount) đều được sinh ra bên trong môi trường của hàm counter(). Vì thế, chúng tạo thành một Closure (Hàm bao đóng) — chúng "đóng gói" và ghi nhớ scope nơi chúng sinh ra, từ đó dùng chung một tham chiếu đến cùng một biến count duy nhất nằm trong bộ nhớ.
+ c.increment() đầu tiên: Thực hiện toán tử ++count (tăng lên 1 rồi trả về giá trị mới) $\rightarrow$ count thành 1, in ra 1.
+ Các lần gọi tiếp theo liên tục thay đổi trực tiếp lên biến count dùng chung đó, dẫn tới kết quả tích lũy: tăng lên 2, tăng lên 3, giảm về 2, và hàm getCount() trả về giá trị hiện tại là 2.
2. Tại sao var và let cho kết quả khác nhau trong setTimeout?
- Sự khác biệt cốt lõi nằm ở hai yếu tố: Phạm vi của biến (Scope) và Cơ chế bất đồng bộ (Asynchronous Event Loop).
- Trường hợp của var:
+ Scope: var không có block scope (phạm vi khối nhọn {}), nó chỉ có function scope hoặc global scope. Do đó, biến i trong vòng lặp này là một biến đơn nhất, dùng chung cho toàn bộ các lượt lặp.
+ Quá trình chạy: Vòng lặp for là tác vụ đồng bộ (synchronous) nên nó sẽ chạy hết tốc lực trong chưa đầy 1ms. Biến i tăng từ 0 $\rightarrow$ 1 $\rightarrow$ 2 $\rightarrow$ 3 (khi i = 3, điều kiện i < 3 sai, vòng lặp dừng).
+ Trong lúc đó, 3 hàm setTimeout là tác vụ bất đồng bộ, chúng bị đẩy vào hàng đợi và phải đợi ít nhất 100ms mới được kích hoạt.
+ Khi hết 100ms, cả 3 callback đồng loạt chạy. Chúng cùng nhìn vào biến i dùng chung duy nhất (lúc này đã mang giá trị bằng 3) $\rightarrow$ In ra ba dòng var: 3.
- Trường hợp của let:
+ Scope: let có tính chất block scope. Trong cấu trúc vòng lặp for (let j = 0; ... ), JavaScript có một cơ chế đặc biệt: Với mỗi lượt lặp, một biến j hoàn toàn mới sẽ được khởi tạo trong bộ nhớ, tách biệt hoàn toàn với lượt lặp trước đó.
+ Quá trình chạy:
+ Ở lượt lặp 1 ($j = 0$), hàm setTimeout đầu tiên "chụp" lại và ghi nhớ (Closure) biến $j$ thứ nhất có giá trị $0$.
+ Ở lượt lặp 2 ($j = 1$), hàm setTimeout thứ hai ghi nhớ biến $j$ thứ hai có giá trị $1$.
+ Ở lượt lặp 3 ($j = 2$), hàm setTimeout thứ ba ghi nhớ biến $j$ thứ ba có giá trị $2$.
+ Khi hết 200ms, cả 3 hàm callback lần lượt thực thi. Do mỗi hàm giữ một tham chiếu đến một bản sao biến j riêng biệt tại thời điểm nó được tạo ra, chúng in ra chính xác các giá trị tương ứng: let: 0, let: 1, let: 2.

Câu A3

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const tripled = nums.map(n => n * 3);

// 3. Tính tổng tất cả (0 là giá trị khởi tạo ban đầu cho biến tích lũy acc)
const total = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm số đầu tiên > 7
const firstGreaterThanSeven = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số nào > 10 không
const hasGreaterThanTen = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ các số đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng mà KHÔNG mutate (không làm thay đổi) mảng gốc
const reversed = [...nums].reverse(); // Hoặc dùng phương thức ES2023 mới: nums.toReversed()

Câu A4
- Dự đoán Output
+ Phần 1: Destructuring

console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan

console.log(specs);                    // Lỗi: ReferenceError: specs is not defined
+ Phần 2: Spread

console.log(updated.price);            // 23990000

console.log(updated.sale);             // true

console.log(product.price);            // 25990000 (gốc KHÔNG đổi)
+ Phần 3: Spread gotcha

console.log(product.specs.ram);        // 16 (Gốc BỊ ĐỔI theo!)

Câu C1

const processOrders = (orders) => 
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.price); // Đã sửa lỗi logic: b.finalTotal - a.finalTotal
        
Câu C2
