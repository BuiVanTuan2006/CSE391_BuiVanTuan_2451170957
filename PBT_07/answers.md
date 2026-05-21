Câu A1
- Đoạn 1
+ Output:
undefined
+ Giải thích:
var được hoisting.
Biến x được đưa lên đầu scope và khởi tạo mặc định là undefined.
Thực tế JS hiểu gần giống:
var x;
console.log(x);
x = 5;

- Đoạn 2

+ Output:
ReferenceError
+ Giải thích:
let cũng được hoisting nhưng không được khởi tạo giá trị ngay.
Biến nằm trong Temporal Dead Zone (TDZ) từ đầu block đến dòng khai báo.
Truy cập trước khi khai báo sẽ lỗi.
- Đoạn 3
+ Output:
TypeError
+ Giải thích:
const không cho phép gán lại giá trị.
Dòng:
z = 20;
gây lỗi ngay nên console.log(z) không chạy.

- Đoạn 4

+ Output:
[1, 2, 3, 4]
+ Giải thích:
const không cho phép đổi tham chiếu:
arr = []

mới là sai.

Nhưng vẫn có thể thay đổi nội dung object/array.
- Đoạn 5

+ Output:
Trong block: 2
Ngoài block: 1
+ Giải thích:
let có block scope.
Biến a bên trong {} là biến khác với a bên ngoài.
- Các kết quả dễ gây bất ngờ
+ var truy cập trước khai báo không lỗi mà ra undefined.
+ let truy cập trước khai báo lại gây ReferenceError.
+ const vẫn sửa được phần tử trong array/object.
+ let trong block tạo biến riêng, không ảnh hưởng bên ngoài.

Câu A3
* Kết quả dự đoán
- 1.
console.log(typeof null);
+ Output:
"object"
+ Giải thích:
Đây là bug lịch sử của JavaScript.
null thực chất không phải object.
- 2.
console.log(typeof undefined);
+ Output:
"undefined"
- 3.
console.log(typeof NaN);
+ Output:
"number"
+ Giải thích:
NaN nghĩa là “Not a Number” nhưng kiểu dữ liệu vẫn là number.
- 4.
console.log("5" + 3);
+ Output:
"53"
+ Giải thích:
Toán tử + gặp string sẽ ưu tiên nối chuỗi.
3 bị ép kiểu thành "3".
- 5.
console.log("5" - 3);
+ Output:
2
+ Giải thích:
Toán tử - chỉ dùng cho số.
"5" bị ép thành number 5.
- 6.
console.log("5" * "3");
+ Output:
15
+ Giải thích:
Toán tử * ép cả hai thành number.
- 7.
console.log(true + true);
+ Output:
2
+ Giải thích:
true → 1
1 + 1 = 2
- 8.
console.log([] + []);
+ Output:
""
+ Giải thích:
Array rỗng chuyển thành chuỗi rỗng "".
"" + "" = ""
- 9.
console.log([] + {});
+ Output:
"[object Object]"
+ Giải thích:
[] → ""
{} → "[object Object]"
+ Kết quả:
"" + "[object Object]"
- 10.
console.log({} + []);
+ Output:
0
+ Giải thích:
Ở nhiều môi trường JS, {} đầu dòng bị hiểu là block code.
+ Còn lại:
+[]
[] → 0
nên kết quả là:
0
* Vì sao "5" + 3 và "5" - 3 khác nhau?
"5" + 3
- Toán tử + vừa:
+ cộng số
+ vừa nối chuỗi
- Khi có string, JS ưu tiên nối chuỗi.
"5" + 3
→ "5" + "3"
→ "53"
"5" - 3
Toán tử - chỉ dùng cho phép toán số học.
JS buộc phải ép "5" thành số.
"5" - 3
→ 5 - 3
→ 2

Câu A4

* TẤT CẢ giá trị Falsy trong JavaScript

- Các giá trị Falsy gồm:

+ false
+ 0
+ -0
+ 0n
+ ""
+ null
+ undefined
+ NaN
* Dự đoán kết quả:

if ("0") console.log("A");
- "0" là string có ký tự nên là Truthy.
- Kết quả:
A

if ("") console.log("B");
- Chuỗi rỗng là Falsy.
- Kết quả:
Không in

if ([]) console.log("C");
- Array rỗng vẫn là object.
Object luôn Truthy.
- Kết quả:
C

if ({}) console.log("D");
- Object rỗng là Truthy.
- Kết quả:
D

if (null) console.log("E");
- null là Falsy.
- Kết quả:
Không in

if (0) console.log("F");
- 0 là Falsy.
- Kết quả:
Không in

if (-1) console.log("G");
- Mọi số khác 0 đều Truthy.
- Kết quả:
G

if (" ") console.log("H");
- " " không phải chuỗi rỗng.
Có chứa ký tự space nên là Truthy.
- Kết quả:
H
* Kết quả cuối cùng sẽ in
A
C
D
G
H

Câu A5

Dưới đây là 3 cách trên sau khi được viết lại:

JavaScript
// Cách 1: Cực kỳ gọn gàng khi chèn biến vào văn bản
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2: Giúp đường dẫn API dễ đọc, không bị rối mắt bởi các dấu cộng
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3: Viết chuỗi nhiều dòng (Multi-line) tự nhiên, không cần nối chuỗi hay escape dấu nháy kép
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

Câu C1

Danh sách 6 lỗi tìm thấy
- Lỗi 1: Sai toán tử gán thay vì toán tử so sánh
+ Vị trí: if (giaSauGiam = 0)

+ Giải thích: Dấu = là toán tử gán, biến giaSauGiam sẽ bị ghi đè giá trị thành 0. Biểu thức if (0) luôn được coi là falsy, khiến khối lệnh bên trong không bao giờ chạy, đồng thời làm hàm luôn trả về 0 sai lệch nếu điều kiện này vô tình được kích hoạt.

+ Cách sửa: Đổi sang toán tử so sánh nghiêm ngặt ===.

JavaScript

if (giaSauGiam === 0)
- Lỗi 2: Lỗi thiếu kiểm tra kiểu dữ liệu đầu vào (Data Type)
+ Vị trí: const gia = tinhGiaGiamGia("100000", 20)

+ Giải thích: Tham số giaBan bị truyền vào dưới dạng một chuỗi "100000". Dù JavaScript có cơ chế ép kiểu tự động khi thực hiện phép nhân/chia, việc tính toán trực tiếp trên chuỗi là một bad practice dễ sinh lỗi logic nếu thực hiện phép cộng (chuỗi sẽ bị nối thay vì cộng số). Hàm cần kiểm tra dữ liệu nghiêm ngặt hoặc ép kiểu an toàn.

+ Cách sửa: Thêm bước validate đầu vào giống như bạn đã làm ở các bài tập trước:

JavaScript


    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        return "Lỗi: Đầu vào phải là số";
    }

- Lỗi 3: Thiếu dấu chấm phẩy (Semicolon) mặc định
+ Vị trí: Cuối các câu lệnh `return` và `console.log`.
+ Giải thích: Mặc dù JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI), việc bỏ trống dễ gây lỗi khi gộp code hoặc tối ưu hóa (minify) mã nguồn.
+ Cách sửa: Thêm dấu `;` vào cuối mỗi câu lệnh.
- Lỗi 4: Biến không được khai báo an toàn
+ Vị trí: `var giamGia = giaBan * phanTramGiam / 100`
+ Giải thích: Sử dụng `var` có cơ chế *hoisting* (đưa phần khai báo lên đầu hàm) và không có phạm vi khối block scope. Nên thay thế bằng `const` vì giá trị này không bị tái gán trong hàm.
+ Cách sửa: Đổi `var` thành `const`.

- Lỗi 5 (Lỗi ẩn): Vấn đề Closure và Scope của `var` trong vòng lặp `setTimeout`
+   Vị trí: 
    
javascript

    for (var i = 0; i < 5; i++) {
        setTimeout(function() { console.log("Item " + i) }, 1000)
    }

+ Hiện tượng lỗi: Sau 1 giây, màn hình console sẽ in ra 5 dòng **"Item 5"** thay vì từ 0 đến 4.
+ Giải thích tại sao: 
    *   Từ khóa `var` không có *block scope* (phạm vi khối) mà có *function scope*. Trong trường hợp này, `var i` thuộc phạm vi toàn cục hoặc phạm vi hàm bao ngoài nó. Do đó, cả 5 vòng lặp đều dùng chung **một bản sao duy nhất** của biến `i`.
    *   Hàm `setTimeout` là một tác vụ bất đồng bộ. Nó xếp lịch để chạy sau 1000ms. Trong lúc chờ 1000ms trôi qua, vòng lặp `for` đã chạy xong từ lâu và biến `i` lúc này đã tăng lên đến `5`.
    *   Khi hết 1 giây, cả 5 hàm callback đồng loạt kích hoạt, chúng cùng nhìn vào biến `i` chung (lúc này đang có giá trị là 5) và in ra "Item 5".
+   Cách sửa bằng `let`: Thay `var i` bằng `let i`. Từ khóa `let` có *block scope*. Cứ mỗi lượt lặp, JavaScript lại tạo ra một **biến `i` hoàn toàn mới** nằm trong scope riêng biệt của lượt lặp đó và giữ nguyên giá trị tại thời điểm tạo. Hàm `setTimeout` sẽ "đóng gói" (closure) giá trị `i` riêng của lượt đó lại, cho ra kết quả đúng từ 0 đến 4.

- Lỗi 6: Không chặn xử lý tiếp khi dữ liệu không hợp lệ
+ Vị trí: Lời gọi hàm `tinhGiaGiamGia(50000, 110)`
+   Giải thích: Khi truyền vào `110%`, hàm trả về chuỗi `"Phần trăm giảm không hợp lệ"`. Nhưng ở dòng tiếp theo, mã nguồn vẫn tiếp tục in ra: `"Giá: Phần trăm giảm không hợp lệ"`. Đoạn code gọi hàm chưa có cơ chế kiểm tra xem kết quả trả về là một chuỗi báo lỗi hay là số tiền thực tế.
+ Cách sửa: Kiểm tra kiểu dữ liệu của kết quả trước khi in.
