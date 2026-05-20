Câu A1:
type="email" → Ô nhập text → Check có @ → Đăng ký tài khoản
type="password" → Ô nhập ẩn ký tự → Không validate sẵn → Đăng nhập
type="number" → Ô nhập số + nút tăng giảm → Giới hạn min/max → Số lượng sản phẩm
type="tel" → Ô nhập số → Dùng pattern → SĐT khách hàng
type="url" → Ô nhập link → Check định dạng URL → Link shop
type="date" → Chọn ngày (calendar) → Format ngày hợp lệ → Ngày giao hàng
type="radio" → Nút tròn chọn 1 → Chỉ chọn 1 → Phương thức thanh toán
type="checkbox" → Ô tick vuông → Chọn nhiều → Đồng ý điều khoản
type="file" → Nút upload → Giới hạn loại file → Upload ảnh
type="range" → Thanh kéo → Giới hạn min/max → Lọc giá
Câu A2:
Trường hợp 1
Không submit được → Vì required mà để trống → trình duyệt báo “Please fill out this field”

Trường hợp 2
Không submit được → Vì type="email" nhưng "abc" không đúng format email → báo sai định dạng

Trường hợp 3
Không submit được → Vì 15 > max=10 → vi phạm giới hạn → báo “value must be ≤ 10”

Trường hợp 4
Không submit được → Vì pattern [0-9]{10} yêu cầu đúng 10 chữ số → "abc123" không khớp

Trường hợp 5
Không submit được → Vì minlength=8 nhưng chỉ nhập "123" (3 ký tự) → báo thiếu độ dài
Câu A3:
1.
- <label for="email"> quan trọng vì 
+ Screen reader sẽ đọc: “Email, edit text” ,user biết phải nhập gì
+ for="email" ↔ id="email" : tạo liên kết rõ ràng
+ Click vào chữ “Email” : focus vào input,dễ dùng hơn
- Nếu không có label:
Screen reader chỉ đọc “edit text” sẽ không hiểu mục đích

2.
-dùng <fieldset> + <legend> khi có nhiều input liên quan cùng 1 nhóm
-Ví dụ: chọn giới tính

<fieldset>
  <legend>Giới tính</legend>

  <input type="radio" id="nam" name="gender">
  <label for="nam">Nam</label>

  <input type="radio" id="nu" name="gender">
  <label for="nu">Nữ</label>
</fieldset>

3.
- aria-label dùng khi không có label hiển thị
- không dùng aria-label khi đã có <label>
+ Bị trùng thông tin
+ Screen reader có thể bỏ label thật → chỉ đọc aria
+ Làm mất semantic chuẩn của HTML
Câu A4:

1. 
- loading="lazy" = chỉ tải ảnh khi gần xuất hiện trên màn hình
- nó cải thiện:
+ tăng tốc load trang ban đầu
+ giảm băng thông (không tải ảnh dưới màn hình ngay)
+ cải thiện UX & performance (LCP tốt hơn)
- không nên dùng khi
+ ảnh above-the-fold (hiển thị ngay khi mở trang)
+ ảnh quan trọng như banner, hero, sản phẩm chính
Vì lazy load có thể làm ảnh hiện chậm hơn

2.
- <video> cần nhiều <source> vì:
+ do trình duyệt hỗ trợ codec khác nhau
+ Chrome, Edge đều hỗ trợ tốt webm, mp4,
Safari ưu tiên mp4
+ nhiều <source> browser chọn format phù hợp nên video luôn chạy được
- 3 format video phổ biến:mp4, webm, ogg
3. alt trên <img> dùng để mô tả ảnh và Screen reader hiện khi ảnh lỗi,SEO (Google hiểu nội dung ảnh)
- Các trường hợp:
+ iphone 16
<img src="iphone16.jpg" alt="iPhone 16 màu đen, mặt trước và sau">

+ ảnh trang trí
<img src="decor.png" alt="ảnh trang trí">

+ biểu đồ doanh thu Q1/2026
<img src="chart.png" alt="Biểu đồ doanh thu quý 1 năm 2026">
Câu A5:
Cách 1: chỉ dùng <img>

+ để chỉ hiển thị hình ảnh, mô tả mà không có caption
+ ảnh đơn giản, không cần giải thích gì thêm
Cách 2: dùng <figure>+<figcaption>
+ <figure> dùng để nhóm nội dung ảnh
+ <figcaption> dùng để chú thích hiển thị cho người dùng
+ có ý nghĩa semantic hơn
+ Screen reader đọc cả alt+caption hiểu đầy đủ hơn
Câu C1:

Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility.
Sửa: <label for="full-name">Tên:</label> <input type="text" id="full-name" name="full-name" required>

Lỗi 2: Dòng 4 — Input "Email" thiếu thuộc tính name và nhãn mô tả cho thiết bị đọc màn hình.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 3: Dòng 6 & 7 — Các trường mật khẩu thiếu thuộc tính name và nhãn, gây khó khăn cho việc quản lý dữ liệu khi gửi form.
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" placeholder="Mật khẩu" required>
<label for="confirm-password">Nhập lại mật khẩu:</label> <input type="password" id="confirm-password" name="confirm-password" placeholder="Nhập lại mật khẩu" required>

Lỗi 4: Dòng 9 — Input "Phone" dùng type text và thiếu id/name.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">

Lỗi 5: Dòng 11 — Thẻ <select> không có nhãn mô tả và tên định danh dữ liệu.
Sửa: <label for="city">Thành phố:</label>
<select id="city" name="city">
  <option value="hanoi">Hà Nội</option>
  <option value="hcm">TP.HCM</option>
</select>

Lỗi 6: Dòng 16 — Thẻ <label> điều khoản thiếu checkbox điều khiển, người dùng không có chỗ để tích chọn.
Sửa: <label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>

Lỗi 7: Toàn bộ form — Các thẻ <input> nằm rời rạc, khó định dạng và thiếu cấu trúc nhóm.
Sửa: Nên bao bọc mỗi cặp Label/Input vào một thẻ <div> hoặc sử dụng <fieldset> để bố cục rõ ràng hơn.
Câu C2:
1. Pattern Regex
CMND/CCCD (12 số): ^[0-9]{12}$

Số tài khoản (10-15 số): ^[0-9]{10,15}$

2. HTML5 không đủ an toàn. Vì HTML5 chỉ nằm ở phía người dùng, dễ dàng bị vượt qua bằng cách dùng Developer Tools (F12) để xóa code validation hoặc gửi request trực tiếp qua Postman/cURL mà không cần trình duyệt.

3. 3 loại Validation phải dùng JavaScript
So sánh các trường: Kiểm tra "Nhập lại PIN" có khớp với "PIN" ban đầu không.
Kiểm tra bất đồng bộ (Async): Gọi API kiểm tra Email/Số điện thoại đã tồn tại trong hệ thống chưa.
Ràng buộc phụ thuộc: Chỉ hiện hoặc bắt buộc nhập ô B nếu ô A đã được chọn.

4. 2 rủi ro bảo mật khi thiếu Backend Validation
Hỏng dữ liệu (Data Integrity): Kẻ xấu có thể gửi dữ liệu sai định dạng (chữ thay vì số, số âm) gây lỗi hệ thống nghiêm trọng.
Tấn công xâm nhập: Dễ bị khai thác các lỗ hổng SQL Injection hoặc XSS, dẫn đến mất dữ liệu hoặc lộ thông tin tài khoản ngân hàng.