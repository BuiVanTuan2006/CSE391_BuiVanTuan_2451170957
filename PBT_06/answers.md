Câu A1:
1. Mobile `< 768px`

Áp dụng:

col-12

Layout:

[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]
Mỗi box chiếm toàn bộ chiều ngang
Hiển thị theo cột dọc
2. Tablet 768px - 991px

Áp dụng:

col-md-6

Layout:

[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]
Mỗi box chiếm 6/12 cột
Một hàng chứa 2 box
3. Desktop ≥ 992px

Áp dụng:

col-lg-3

Layout:

[ Box1 ][ Box2 ][ Box3 ][ Box4 ]
Mỗi box chiếm 3/12 cột
Một hàng chứa 4 box
Câu hỏi thêm
col-md-6 nghĩa là gì?
md = medium device (tablet trở lên)
6 = chiếm 6 trên tổng 12 cột của Bootstrap Grid

Vì Bootstrap dùng hệ 12 cột:

12 / 6 = 2

=> Một hàng sẽ có 2 box.

Tại sao không cần viết col-sm-12?

Bootstrap hoạt động theo nguyên tắc mobile-first.

Khi viết:

col-12

thì class này đã áp dụng cho mọi kích thước màn hình nhỏ trước.

Sau đó:

col-md-6
col-lg-3

sẽ ghi đè ở các kích thước lớn hơn.

Vì vậy không cần viết thêm:

col-sm-12

do col-12 đã đảm nhiệm vai trò đó.
Câu A2:

1. Giải thích class `d-none d-md-block`

d-none d-md-block

Bao gồm 2 class:

d-none
→ Ẩn element (display: none)
d-md-block
→ Từ màn hình md trở lên (≥ 768px) thì hiển thị dạng block
Kết quả hoạt động
Kích thước màn hình	Hiển thị
< 768px	Ẩn
≥ 768px	Hiện
Ví dụ
<div class="d-none d-md-block">
    Sidebar
</div>

Mobile: không thấy sidebar
Tablet/Desktop: sidebar xuất hiện
2. 5 spacing utilities và giải thích

Bootstrap spacing có dạng:

{property}{side}-{size}

Ví dụ:

mt-3
m = margin
t = top
3 = mức spacing
Một số spacing utilities phổ biến
Class	Ý nghĩa
mt-3	Margin top mức 3
mb-4	Margin bottom mức 4
ms-2	Margin left (start) mức 2
px-4	Padding trái + phải mức 4
py-5	Padding trên + dưới mức 5
p-3	Padding tất cả các phía mức 3
mx-auto	Căn giữa ngang bằng margin auto
mb-auto	Margin bottom tự động
Giải thích ví dụ
mt-3
<div class="mt-3"></div>

Tạo khoảng cách phía trên
px-4
<div class="px-4"></div>

Padding trái và phải
mb-auto
<div class="mb-auto"></div>

Margin bottom tự động
Thường dùng trong flexbox layout
3. Sự khác nhau giữa .container, .container-fluid, .container-md
Class	Đặc điểm
.container	Có chiều rộng cố định theo từng breakpoint
.container-fluid	Luôn full chiều ngang màn hình
.container-md	Full width ở mobile, fixed width từ md trở lên
.container
<div class="container"></div>

Responsive fixed width
Có khoảng trắng 2 bên
Rộng khác nhau theo breakpoint
.container-fluid
<div class="container-fluid"></div>

Chiếm 100% chiều ngang mọi màn hình
Không giới hạn width

Phù hợp:

Banner
Hero section
Full-width layout
.container-md
<div class="container-md"></div>

Mobile: full width
Từ md (≥768px) trở lên:
→ hoạt động giống .container

Câu C1 — Tùy biến Bootstrap

Đổi màu `$primary` sang `#E63946`

* Quy trình

1. Cài Bootstrap và Sass:


npm install bootstrap sass
Tạo file custom.scss
$primary: #E63946;


@import "../node_modules/bootstrap/scss/bootstrap";


Compile SCSS thành CSS:
sass custom.scss custom.css
Import custom.css vào HTML.

- không nên override trực tiếp

.btn-primary {
    background: red;
}

Vì:

Chỉ đổi .btn-primary
Không đổi các class khác như:
.bg-primary
.alert-primary
.text-primary
.border-primary
Dễ conflict và khó maintain
- Nên dùng SASS variables

Khi đổi:

$primary: #E63946;

Bootstrap sẽ tự cập nhật toàn bộ component liên quan theo cùng hệ màu.

→ Đồng bộ, dễ bảo trì, chuyên nghiệp hơn.

Câu C2 — So sánh

* CSS thuần

- Navbar responsive


.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #222;
}

.menu {
    display: flex;
    gap: 20px;
}

@media (max-width: 768px) {
    .menu {
        flex-direction: column;
    }
}
Product card
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
}

.card img {
    width: 100%;
}

.card button {
    padding: 10px;
    background: blue;
    color: white;
}

- So sánh với Bootstrap
Số dòng CSS cần viết
CSS thuần: phải tự viết layout, responsive, button, spacing...
Bootstrap: chủ yếu dùng class có sẵn nên viết ít CSS hơn nhiều.
- Thời gian phát triển
CSS thuần: lâu hơn vì phải tự code mọi thứ.
Bootstrap: nhanh hơn do có sẵn grid, card, navbar, utilities.
- Khả năng tùy biến
CSS thuần: tùy biến hoàn toàn theo ý muốn.
Bootstrap: nhanh nhưng dễ bị giống template Bootstrap mặc định nếu custom ít.
- Khi NÊN dùng Bootstrap
Làm landing page
Dashboard/admin
Prototype nhanh
Deadline ngắn
Cần responsive nhanh
- Khi KHÔNG NÊN dùng Bootstrap
Website có UI quá đặc biệt
Cần design riêng hoàn toàn
Muốn tối ưu CSS/performance
Project lớn có design system riêng