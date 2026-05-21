Câu A1 — Viewport & Mobile-First

<meta name="viewport" content="width=device-width, initial-scale=1.0">

+ name="viewport": khai báo thiết lập viewport cho thiết bị di động.
+ width=device-width: chiều rộng viewport bằng chiều rộng thật của màn hình thiết bị.
+ initial-scale=1.0: mức zoom ban đầu là 100%.
- Nếu thiếu thẻ này:
+ iPhone sẽ giả định trang web rộng khoảng 980px như desktop.
+ Trình duyệt sẽ tự thu nhỏ toàn bộ trang để vừa màn hình.
-> Kết quả: chữ rất nhỏ, nút bấm khó nhấn, phải zoom để đọc, có thể bị scroll ngang.
* Mobile-First
Viết CSS mặc định cho mobile trước.
Sau đó dùng @media (min-width: ...) để mở rộng cho tablet và desktop.

Ví dụ:
.container {
    padding: 16px;
    font-size: 14px;
}
@media (min-width: 768px) {
    .container {
        padding: 32px;
        font-size: 18px;
    }
}
* Desktop-First
Viết CSS cho desktop trước.
Sau đó dùng @media (max-width: ...) để giảm xuống cho mobile.

Ví dụ:
.container {
    padding: 32px;
    font-size: 18px;
}

@media (max-width: 768px) {
    .container {
        padding: 16px;
        font-size: 14px;
    }
}
- Tại sao Mobile-First được khuyên dùng?
+ Mobile chiếm phần lớn traffic hiện nay
+ CSS gọn và tối ưu hơn cho thiết bị nhỏ
+ Giúp ưu tiên nội dung quan trọng trước
+ Google ưu tiên Mobile-First Indexing
+ Performance trên điện thoại tốt hơn

Câu A2:
* Các breakpoints chuẩn của Bootstrap
1. xs (Extra Small)
+ Kích thước: nhỏ hơn 576px
+ Thiết bị đại diện: điện thoại nhỏ
+ Ví dụ lưới sản phẩm: thường hiển thị 1 cột để dễ nhìn trên màn hình nhỏ.
2. sm (Small)
+ Kích thước: từ 576px trở lên
+ Thiết bị đại diện: điện thoại lớn
+ Ví dụ lưới sản phẩm: thường hiển thị 2 cột.
3. md (Medium)
+ Kích thước: từ 768px trở lên
+ Thiết bị đại diện: tablet
+ Ví dụ lưới sản phẩm: thường hiển thị 2 hoặc 3 cột.
4. lg (Large)
+ Kích thước: từ 992px trở lên
+ Thiết bị đại diện: laptop hoặc desktop nhỏ
+ Ví dụ lưới sản phẩm: thường hiển thị 3 hoặc 4 cột.
5. xl (Extra Large)
+ Kích thước: từ 1200px trở lên
+ Thiết bị đại diện: desktop lớn
+ Ví dụ lưới sản phẩm: thường hiển thị 4 cột.
6. xxl (Extra Extra Large)
+ Kích thước: từ 1400px trở lên
+ Thiết bị đại diện: màn hình rất lớn
+ Ví dụ lưới sản phẩm: thường hiển thị 5 hoặc 6 cột.
* Ví dụ Bootstrap Grid

<div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        Product
    </div>
</div>

Giải thích:

col-12: mobile hiển thị 1 cột
col-sm-6: màn hình ≥576px hiển thị 2 cột
col-md-4: màn hình ≥768px hiển thị 3 cột
col-lg-3: màn hình ≥992px hiển thị 4 cột

Câu A3:
Chiều rộng màn hình .container width
375px (iPhone SE)   100%               
600px               540px              
800px               720px              
1000px              960px              
1400px              1140px             


Câu A4:
1. Variables ($primary-color)
- Variables dùng để lưu giá trị và tái sử dụng - nhiều lần trong dự án.
- Khi đổi giá trị biến, tất cả nơi sử dụng sẽ tự cập nhật.
- Ví dụ:

$primary-color: #2563eb;
$radius: 12px;

.button {
    background: $primary-color;
    border-radius: $radius;
}
2. Nesting (CSS lồng nhau)
- SCSS cho phép viết CSS theo cấu trúc lồng nhau giống HTML.
- Ví dụ:

.navbar {
    background: black;

    .logo {
        color: white;
    }

    a {
        color: gray;

        &:hover {
            color: yellow;
        }
    }
}

Sau khi compile thành CSS:

.navbar {
    background: black;
}

.navbar .logo {
    color: white;
}

.navbar a {
    color: gray;
}

.navbar a:hover {
    color: yellow;
}
3. Mixins (@mixin, @include)
- Mixin giống như “hàm” trong SCSS, giúp tái sử dụng nhiều đoạn CSS.
- Ví dụ:
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include flex-center;
    height: 200px;
}

Compile thành:
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
4. @extend / Inheritance
- @extend dùng để kế thừa style từ class khác.
- Ví dụ:
.button {
    padding: 10px 20px;
    border-radius: 8px;
    color: white;
}

.button-primary {
    @extend .button;
    background: blue;
}

Compile thành:

.button,
.button-primary {
    padding: 10px 20px;
    border-radius: 8px;
    color: white;
}

.button-primary {
    background: blue;
}


* Trình duyệt KHÔNG đọc được file .scss vì:
Trình duyệt chỉ hiểu:

HTML
CSS
JavaScript

+ SCSS là ngôn ngữ mở rộng của CSS nên browser không đọc trực tiếp được.

+ SCSS cần được compile thành CSS trước khi chạy trên trình duyệt.

* Cần bước gì để chuyển SCSS → CSS?

Cần dùng Sass Compiler để compile.
Ví dụ:

VS Code extension: Live Sass Compiler
Vite
Webpack
Node.js Sass

Ví dụ lệnh:
npx sass styles.scss styles.css

Kết quả:
styles.scss → code SCSS
styles.css → file CSS browser đọc được
Câu B3:
# SCSS Compile Commands

## Install Sass
npm install -g sass

## Compile SCSS to CSS
sass scss/style.scss css/style.css

## Watch Mode
sass --watch scss/style.scss:css/style.css
Câu C1:
* Phân tích Mobile
- Navigation
+ Sidebar bị ẩn
+ Có hamburger ☰
+ Thanh search thu nhỏ
+ Bottom navigation xuất hiện
- Grid content
+ 1cột video
- Elements bị ẩn
+ Sidebar đầy đủ
+ Một số menu text
+ Categories dài
- Font size
+ Nhỏ hơn desktop
+ Tiêu đề video ngắn hơn


* Phân tích Tablet
- Navigation
+ Sidebar mini xuất hiện
+ Search bar dài hơn
+ Hamburger vẫn còn
- Grid content
+ 2 cột video
- Elements bị ẩn
+ Một số menu phụ
+ Sidebar chưa full
- Font size
+ Lớn hơn mobile

* Phân tích Desktop
- Navigation
+ Sidebar đầy đủ
+ Menu mở hoàn toàn
+ Search bar lớn
- Grid content
+ 3 cột video
- Elements bị ẩn
+ Hầu như không bị ẩn
- Font size
+ Lớn nhất
+ Khoảng cách rộng hơn

Câu C2 — Responsive Strategy for Restaurant Booking Website
 1. Mobile Wireframe (375px)
┌────────────────────┐
│ LOGO     ☎ Hotline │
├────────────────────┤
│                    │
│    HERO IMAGE      │
│                    │
├────────────────────┤
│   FOOD IMAGE 1     │
├────────────────────┤
│   FOOD IMAGE 2     │
├────────────────────┤
│   FOOD IMAGE 3     │
├────────────────────┤
│   FOOD IMAGE 4     │
├────────────────────┤
│   FOOD IMAGE 5     │
├────────────────────┤
│   FOOD IMAGE 6     │
├────────────────────┤
│                    │
│   BOOKING FORM     │
│                    │
├────────────────────┤
│    GOOGLE MAP      │
├────────────────────┤
│      FOOTER        │
└────────────────────┘
Mobile Analysis
Navigation is simplified.
Sidebar is hidden.
Food gallery uses 1 column.
Booking form is placed below food images.
Google Maps is smaller for mobile screens.
Font size is smaller than desktop.
2. Tablet Wireframe (768px)
┌──────────────────────────────────┐
│ LOGO           Hotline           │
├──────────────────────────────────┤
│                                  │
│            HERO IMAGE            │
│                                  │
├──────────────────────────────────┤
│ FOOD 1       │      FOOD 2       │
├──────────────┼───────────────────┤
│ FOOD 3       │      FOOD 4       │
├──────────────┼───────────────────┤
│ FOOD 5       │      FOOD 6       │
├──────────────────────────────────┤
│                                  │
│         BOOKING FORM             │
│                                  │
├──────────────────────────────────┤
│          GOOGLE MAP              │
├──────────────────────────────────┤
│            FOOTER                │
└──────────────────────────────────┘
Tablet Analysis
Food gallery changes to 2 columns.
Booking form remains below gallery.
Google Maps stays full width.
Navigation becomes wider.
Font size increases slightly.
3. Desktop Wireframe (1440px)
┌──────────────────────────────────────────────────────┐
│ LOGO             MENU             ☎ Hotline          │
├──────────────────────────────────────────────────────┤
│                                                      │
│                    HERO IMAGE                        │
│                                                      │
├───────────────────────┬──────────────────────────────┤
│                       │                              │
│     FOOD GALLERY      │       BOOKING FORM          │
│      (3 COLUMNS)      │                              │
│                       │                              │
├───────────────────────┴──────────────────────────────┤
│                    GOOGLE MAP                        │
├──────────────────────────────────────────────────────┤
│                      FOOTER                          │
└──────────────────────────────────────────────────────┘
Desktop Analysis
Layout uses 2 columns.
Food gallery uses 3 columns.
Booking form appears beside gallery.
Full navigation menu is displayed.
Larger spacing and font sizes are used.
No sidebar is needed.