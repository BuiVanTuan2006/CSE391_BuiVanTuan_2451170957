Câu A1:
- static:
+ Vẫn chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Theo flow bình thường
+ Cuộn theo trang: Có
+ Use case: Layout mặc định

- relative:
+ Vẫn chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Vị trí gốc của chính nó
+ Cuộn theo trang: Có
+ Use case: Dịch nhẹ element, làm anchor cho absolute

- absolute:
+ Vẫn chiếm chỗ trong flow: Không
+ Tham chiếu vị trí: Ancestor có position gần nhất
+ Cuộn theo trang: Có
+ Use case: Badge, dropdown, tooltip

- fixed:
+ Vẫn chiếm chỗ trong flow: Không
+ Tham chiếu vị trí: Viewport
+ Cuộn theo trang: Không
+ Use case: Chat button, fixed header

- sticky:
+ Vẫn chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Viewport khi scroll đến ngưỡng
+ Cuộn theo trang: Sticky khi scroll
+ Use case: Sticky header, sticky sidebar

Khi nào absolute tham chiếu body?
- Khi không có ancestor nào có:
  position: relative / absolute / fixed / sticky
- Khi đó absolute sẽ bám theo body/html.

Khi nào absolute tham chiếu parent?
- Khi parent hoặc ancestor gần nhất có:
  position khác static
- Thường dùng nhất là:
  position: relative

Nearest positioned ancestor là gì?
- Là ancestor gần nhất có:
  position ≠ static
- Absolute sẽ dùng ancestor này làm gốc tọa độ để tính:
  top, right, bottom, left.
Câu A2: 
Trường hợp 1
.container {
    display: flex;
}

.item {
    flex: 1;
}
- 4 items sẽ nằm trên cùng 1 hàng
- Mỗi item có chiều rộng bằng nhau
Bố cục:
[ Item 1 ][ Item 2 ][ Item 3 ][ Item 4 ]
---
Trường hợp 2
.container {
    display: flex;
    flex-wrap: wrap;
}
.item {
    width: 45%;
    margin: 2.5%;
}
- 6 items
- Mỗi item chiếm khoảng 50% chiều ngang
- Mỗi hàng chứa 2 item
- Tổng cộng 3 hàng
Bố cục:
[ Item 1 ][ Item 2 ]

[ Item 3 ][ Item 4 ]

[ Item 5 ][ Item 6 ]
---
Trường hợp 3
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
- 3 items nằm trên cùng 1 hàng
- Item đầu sát trái
- Item cuối sát phải
- Item giữa nằm giữa
- Các item căn giữa theo chiều dọc
Bố cục:
[Item 1]                [Item 2]                [Item 3]
---
Trường hợp 4
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}
- Grid có 3 cột
- Cột 1 rộng 200px
- Cột 2 chiếm toàn bộ khoảng trống còn lại
- Cột 3 rộng 200px
- 3 items nằm trên 1 hàng
Bố cục:
[ 200px ][     1fr     ][ 200px ]
---
Trường hợp 5
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
- Grid có 3 cột bằng nhau
- 7 items
- Mỗi hàng chứa 3 item
- Tổng cộng 3 hàng
- Item cuối cùng nằm ở hàng 3 cột 1
Bố cục:
[ Item 1 ][ Item 2 ][ Item 3 ]

[ Item 4 ][ Item 5 ][ Item 6 ]

[ Item 7 ]
Câu C1:
1. Navigation bar ngang (logo + menu + buttons)
- Dùng: Flexbox
- Vì:
  Navbar là layout 1 chiều (ngang).
  Flexbox rất phù hợp để:
  - căn giữa
  - đẩy items sang 2 bên
  - spacing giữa các phần tử
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Dùng: Grid
- Vì:
  Đây là layout 2 chiều (hàng + cột).
  Grid giúp:
  - chia cột đều nhau
  - tự động xuống hàng
  - quản lý layout gallery dễ hơn Flexbox
3. Layout blog: main content + sidebar
- Dùng: Grid
- Vì:
  Layout có nhiều cột rõ ràng:
  - content
  - sidebar

  Grid phù hợp cho page layout tổng thể.
4. Footer với 4 cột thông tin
- Dùng: Grid hoặc Flexbox
- Tốt nhất: Grid
- Vì:
  Footer có nhiều cột đều nhau.
  Grid giúp:
  - chia 4 cột rõ ràng
  - dễ responsive
  - căn chỉnh đồng đều hơn
5. Card sản phẩm
(ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Dùng: Flexbox
- Vì:
  Bên trong card là layout 1 chiều theo cột.
  Flexbox với:
  flex-direction: column;
  và:
  margin-top: auto;
  giúp nút luôn nằm đáy card dù nội dung dài ngắn khác nhau.

Câu C2:
* Lỗi 1 — Cards không đều chiều cao
- Nguyên nhân
+ Các card có lượng nội dung khác nhau
+ Card không dùng Flexbox theo chiều dọc
+ Nút `.btn` nằm ngay sau nội dung nên bị nhảy lên/xuống

- Code sửa

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;

    margin-top: auto;
}
- Giải thích
flex-direction: column
giúp card sắp xếp theo cột
margin-top: auto
đẩy nút xuống đáy card
→ tất cả nút "Mua" thẳng hàng.

* Lỗi 2 — Item không nằm giữa màn hình
- Nguyên nhân
+Flexbox mặc định:
justify-content: flex-start
align-items: stretch
nên content dính góc trái trên.

- Code sửa
.hero {
    height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;
}

.hero-content {
    text-align: center;
}
- Giải thích
justify-content: center
căn giữa theo chiều ngang
align-items: center
căn giữa theo chiều dọc
→ content nằm chính giữa màn hình.

*Lỗi 3 — Sidebar bị co lại
- Nguyên nhân
+ Trong Flexbox:
items mặc định có:
flex-shrink: 1
nên sidebar bị co khi content quá dài.

Code sửa
.layout {
    display: flex;
}

.sidebar {
    width: 250px;

    flex-shrink: 0;
}

.content {
    flex: 1;
}
- Giải thích
flex-shrink: 0
ngăn sidebar bị co nhỏ
→ sidebar luôn giữ đúng 250px.