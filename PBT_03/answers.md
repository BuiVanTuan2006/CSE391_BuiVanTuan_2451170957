Câu A1:
- Inline:
+ Ví dụ:
<p style ="color:red;font-size: 20px;">Xin chào</p>

+ Ưu điểm:Áp dụng nhanh,trực tiếp lên 1 phần tử,dùng để test hoặc override tạm thời
+ Nhược điểm:không tái sử dụng được, khó bảo trì,;àm cho html bị rối
+ Dùng khi debug nhanh hoặc override tạm thời(khẩn cấp)

- Internal:
+Ví dụ:
<head>
    <style>
        p{
            color:blue;
            font-size: 18px
        }
    </style>
</head>

+ Ưu điểm:dễ quản lý hơn inline, áp dụng cho toàn bộ trang
+ Nhược điểm: không dùng lại cho nhiều trang, file html sẽ nặng hơn
+ Dùng khi: trang đơn hoặc propotype/demo

- External:
+ ví dụ:
<head>
    <link rel="stylesheet" href="styles.css">
</head>

/* styles.css */
h1 { color: #2563eb; font-size: 32px; }

+ Ưu điểm:
Tái sử dụng nhiều trang,dễ bảo trì,browser cache load nhanh hơn,chuẩn product
+ Nhược điểm:
Cần thêm file riêng, phụ thuộc load file css
+ Dùng khi website thực tế, dự án nhiều trang
Câu hỏi thêm:Nếu cùng 1 element có cả 3 thì Inline thắng
Inline > Internal > External

- Giải thích:
+ CSS hoạt động theo Cascade + Specificity
+ Inline CSS nằm ngay trên element, độ ưu tiên cao nhất
+ Internal CSS nằm trong <style>, ưu tiên trung bình
+ External CSS → ưu tiên thấp hơn

Câu A2:
1. h1:
chọn tất cả thẻ h1
2. price:
chọn tất cả phần tử có class="price"
3. #app header:
Chọn mọi <header> nằm bên trong id="app"
4. nav a:first-child:
Chọn thẻ <a> là con đầu tiên trong nav
5. .product.featured h2:
Chọn <h2> nằm trong .product đồng thời có class featured
6. article > p:
Chọn p là con trực tiếp của article
7. a[href="/"]:
Chọn thẻ <a> có attribute href="/"
8. .top-bar.dark h1:
Chọn <h1> nằm trong phần tử có cả 2 class top-bar và dark
Câu A3:
- TH1:
+ Chiều rộng hiển thị:
=content + padding + border
= 400 + 40 + 10
= 450px
+ Không gian chiếm trên trang:
= rendered width + margin
= 450 + (10 × 2)
= 470px
- TH2:
+ Chiều rộng hiển thị: 400 px
+ Kích thước content thực tế:width - padding - border=400-40-10=350px
+ Không gian chiếm trên trang:
= 400 + margin (10 × 2)
= 420px
- TH3:
+ Khoảng cách thực tế:
= max(25, 40)
= 40px
+ Không phải 65px vì:
Do margin collapse:
Margin dọc giữa 2 block không cộng
Browser chỉ lấy giá trị lớn hơn
Hai margin “đè lên nhau” → lấy cái to nhất
- Nâng cao:
+ Khoảng cách:
= 40 + (-10)
= 30px
Quy tắc:
Nếu 1 dương + 1 âm → cộng lại
Nếu cả hai dương → lấy max
Nếu cả hai âm → lấy số âm lớn hơn (ít âm hơn)
Câu A4:
1. Tính specificity (a, b, c)
Rule A: (0, 0, 1)
Rule B: (0, 1, 0)
Rule C: (1, 0, 0)
Rule D:  (0, 1, 1)
2. 
Element:
<p class="price" id="main-price">
So sánh specificity:
A: (0,0,1)
B: (0,1,0)
D: (0,1,1)
C: (1,0,0) ← cao nhất

Element có màu đỏ

3. Nếu có inline CSS
<p class="price" id="main-price" style="color: orange;">
Inline CSS có độ ưu tiên cao nhất nên element có màu cam

4. Nếu Rule A có !important
p { color: black !important; }
!important ghi đè tất cả rule thường nên element có màu đen
Câu B1:
# Các loại selector đã sử dụng

1. Element selector
- body
- header
- table

2. Class selector
- .active

3. ID selector
- #about

4. Descendant selector
- nav ul li
- tbody tr

5. Pseudo-class selector
- nav a:hover
- tbody tr:nth-child(even)
- tbody tr:hover
Câu B2:
# Phần 1 — content-box vs border-box
- Hộp 1 (content-box)
Chiều rộng thực tế:
300 + 20 + 20 + 5 + 5 = 350px
=> DevTools hiển thị khoảng 350px.

- Hộp 2 (border-box)
Chiều rộng thực tế:
300px
Padding và border được tính bên trong width.
=> DevTools hiển thị khoảng 300px.

- Giải thích sự khác biệt

+ content-box:
  width chỉ tính phần content.
  Padding và border được cộng thêm vào kích thước cuối cùng.

+ border-box:
  width bao gồm content + padding + border.
  Kích thước cuối cùng luôn giữ nguyên theo width đã khai báo.
# Phần 2 — Layout 3 cột

### Không dùng border-box

Tổng chiều rộng thực tế:
- Sidebar:
  250 + 15 + 15 + 2 + 2 = 284px

- Content:
  500 + 20 + 20 + 2 + 2 = 544px

- Ads:
  250 + 15 + 15 + 2 + 2 = 284px

Tổng:
284 + 544 + 284 = 1112px
=> Layout bị tràn khỏi container 1000px.

### CÓ dùng border-box
Tổng chiều rộng:
250 + 500 + 250 = 1000px
Padding và border nằm bên trong width.
=> Layout vừa đúng container 1000px.
Câu B3:
## 10 Rules + Specificity Score
| Rule | Specificity |
|---|---|
| p | 0,0,1 |
| body p | 0,0,2 |
| .text | 0,1,0 |
| p.text | 0,1,1 |
| .text.highlight | 0,2,0 |
| body p.text | 0,1,2 |
| #demo | 1,0,0 |
| p#demo | 1,0,1 |
| #demo.highlight | 1,1,0 |
| p#demo.text.highlight | 1,2,1 |

## Element cuối cùng hiển thị màu gì?
Phần tử cuối cùng hiển thị màu:
gold

## Tại sao?
Rule:
p#demo.text.highlight
có specificity cao nhất:
1,2,1
Nó thắng tất cả các selector khác nên màu cuối cùng là gold.

## Nếu thay đổi thứ tự rules trong CSS file thì sao?

### Trường hợp specificity khác nhau
Kết quả KHÔNG đổi.
Ví dụ:
#demo.highlight
vẫn thắng:
.text.highlight
dù đặt ở đâu.

### Trường hợp specificity bằng nhau
Rule nằm dưới sẽ thắng.
Ví dụ:
.text {
    color: red;
}
.highlight {
    color: blue;
}

Nếu phần tử có cả 2 class:
class="text highlight"
thì màu cuối sẽ là blue vì rule .highlight nằm dưới.
Câu C1:
1. Tính chiều rộng thực tế (content-box)
- Sidebar
width: 300px
padding: 20px × 2 = 40px
border: 1px × 2 = 2px
->Rendered width = 300 + 40 + 2 = 342px
+ Content
width: 660px
padding: 30px × 2 = 60px
border: 1px × 2 = 2px
->Rendered width = 660 + 60 + 2 = 722px

 Tổng: 342 + 722 = 1064px

2. layout bị vỡ vì:
Container = 960px
Tổng = 1064px > 960px
Không đủ chỗ nên .content bị xuống dòng
+ Nguyên nhân:
width (content-box) không bao gồm padding + border

3. Cách sửa
- Cách 1: Dùng border-box
* {
    box-sizing: border-box;
}
.sidebar = 300px
.content = 660px
→ Tổng = 960px (vừa container)
- Cách 2: Không dùng border-box (tính lại width)
Sidebar:
300 - 40 - 2 = 258px
Content:
660 - 60 - 2 = 598px
.sidebar {
    width: 258px;
}
.content {
    width: 598px;
}
Câu C2:
1. “Sản phẩm A” (h2.title.highlight trong #featured)
font-size = 20px
Giải thích: .card .title { font-size: 20px; } áp trực tiếp lên h2 nên ghi đè các giá trị kế thừa từ body (16px) và .container (14px).
color = green
Giải thích: có 3 rule:
.card { color: blue; } (kế thừa),
#featured .title { color: red; } (specificity cao),
.highlight { color: green !important; }.
Do !important có ưu tiên cao nhất nên chọn green.
2. “Mô tả sản phẩm” (p trong card featured)
color = blue
Giải thích: .card p { color: inherit; } nên p lấy màu từ phần tử cha .card.
.card { color: blue; } ⇒ p có màu blue.
3. “Sản phẩm B” (h2.title)
font-size = 20px
Giải thích: .card .title { font-size: 20px; } áp trực tiếp.
color = blue
Giải thích: không có #featured, không có .highlight, nên h2 kế thừa màu từ .card { color: blue; }.
4. “Mô tả sản phẩm B” (p.highlight)
color = green
Giải thích: .card p { color: inherit; } → blue, nhưng .highlight { color: green !important; } ghi đè tất cả ⇒ green.