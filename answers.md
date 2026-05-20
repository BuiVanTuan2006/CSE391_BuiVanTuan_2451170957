Câu A1
1.
B1:Trình duyệt kiểm tra cache hỏi DNS Lookup tìm địa chỉ của máy chủ shopee.vn
B2:Thiết lập kết nối (TCP/IP) (và TLS Handshake để bảo mật HTTPS) giữa máy tính của bạn và server Shopee
B3:Trình duyệt gửi request(thường là GET /)kèm header(Host,User-Agent,Cookie..)đến server
B4:Server xử lý và trả HTTP Response gồm:HTML + CSS + JavaScript + status code(200 OK)
B5:Trình duyệt nhận các file(HTML, CSS, JS)và thực hiện quá trình Render để hiển thị giao diện hoàn chỉnh cho người dùng
2.
Trong Google Chrome, tab Network hiển thị:
1.Danh sách tất cả HTTP requests và responses giữa Client và Server
2.Status Code (200, 404, 500…) → kết quả phản hồi từ server
3.Thời gian tải của từng request và tổng thời gian load trang
4.Loại tài nguyên (HTML, CSS, JS, ảnh…)
5.Kích thước dữ liệu truyền tải
![alt text](screenshots/kichthuocdulieutruyentai.png)
![alt text](screenshots/kichthuocdulieutruyentai2.png)

Câu A2
Trang web bị SEO thấp vì không sử dụng Semantic HTML,dùng div cho mọi thứ, khiến Google không hiểu cấu trúc nội dung
Các lỗi semantic:
-không dùng <header> cho phần đầu.Google khong biết đây la phần đầu trang
-menu khong dùng <nav>. Sai semantic cho điều hướng 
-nội dung chính không dùng <main>. Không xác định được vùng content chính
-sản phẩm không dùng <article>
-tiêu đề không dùng heading(<h1>,<h2>).Google không biết đây là tiêu đề quan trọng
Câu A3
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
Câu A4
-Sự khác nhau giữa <thead>,<tbody>,<tfoot>
+<thead> chứa phần tiêu đề của bảng , gồm các<th>,xác định tên các cột
+<tbody> chứa dữ liệu chính của bảng, gồm nhiều hàng<tr> với các ô<td>
<tfoot>chứa phần tổng kết/kết luận
-Không nên dùng table để layout cho trang web vì:
+sai mục đính semantic
+khó semantic
+code phức tạp, khó bảo trì
+hiệu năng kém
Bài B3
Lỗi 1: Dòng 1
-<!DOCTYPE>sai
-thêm html:<!DOCTYPE html>
Lỗi 2:Dòng 2
-<html>không chuẩn semantic
-sửa:<html lang="vi">
Lỗi 3:Dòng 5,6
-<title>không đóng,sai cấu trúc
-sửa:
<title>Trang web</title>
<meta charset="UTF-8">
Lỗi 4:Dòng 8
-<h1>đóng sai
-sửa:
<h1>Welcome to ShopTLU</h1>
Lỗi 5:Dòng 12
-thẻ<a> đóng sai
-sửa:
<a href="home">Trang chủ</a>
Lỗi 6: Dòng 20
-<img>thiếu alt
-sửa:
<img src="iphone.jpg" alt="iphone 16 Pro">
Lỗi 7: Dòng 22
-sai thứ tự đóng thẻ<b>và<p>
-sửa:
<p>Giá: <b>25.990.000đ</b></p>
Lỗi 8: Dòng 40-42
-lỗi dùng thừa thẻ <main>, trong html chỉ có 1 thẻ main
-sửa:
<aside>
    <p>Sidebar content</p>
</aside>
Lỗi 9: Dòng 45
-chưa đóng thẻ<p>
-sửa:
<p>Copyright 2026</p>
Bài B4
1.
- <html>: phần tử gốc của trang web
- <head>: chứa metadata của trang
- <body>: chứa nội dung hiển thị
<div> thay cho <main> để chứa nội dung chính,không đúng semantic.
<div> thay cho <header>/<nav>không thể hiện rõ cấu trúc điều hướng.

![alt text](screenshots/semantic.png)
2. Table

- Không tìm thấy thẻ <table> trên trang.
- Trang sử dụng <div> và CSS để hiển thị dữ liệu thay vì bảng.

- Do đó:
Không có <thead>,không có <tbody>
3. Form

- action: không hiển thị (xử lý bằng JavaScript)
- method: không hiển thị

Các input:
- type="text": nhập email/số điện thoại/tên đăng nhập
- type="password": nhập mật khẩu
- button/submit: nút đăng nhập
![alt text](screenshots/form.png)
Câu C2
Ý kiến “chỉ dùng <div> cho mọi thứ” có thể tiện lúc đầu nhưng không tối ưu về lâu dài. Về SEO, các công cụ tìm kiếm dựa vào semantic HTML như <header>, <main>, <article>, <nav> để hiểu cấu trúc và nội dung trang; nếu toàn bộ là <div>, crawler khó phân biệt đâu là nội dung chính, đâu là menu, dẫn đến xếp hạng kém hơn. Về accessibility, các công cụ hỗ trợ như screen reader cần các thẻ semantic để đọc và điều hướng cho người khiếm thị; ví dụ khi gặp <nav> hoặc <main>, chúng sẽ thông báo rõ ràng khu vực chức năng, còn <div> thì không mang ý nghĩa này. Một ví dụ cụ thể: trong trang blog, mỗi bài viết đặt trong <article> giúp cả Google lẫn screen reader nhận diện đó là nội dung độc lập, dễ index và truy cập hơn. Tuy nhiên, <div> vẫn phù hợp khi dùng làm container cho layout (grid, flexbox) hoặc nhóm các phần tử không có ý nghĩa nội dung riêng. Vì vậy, semantic HTML không phải “tốn thời gian” mà là cách viết code chuẩn, giúp website tốt hơn cho cả máy tìm kiếm và người dùng.
Câu C1
<!DOCTYPE html> <!-- Khai báo HTML5 -->
<html lang="vi"> <!-- html: phần tử gốc, xác định ngôn ngữ -->
<head> <!-- head: chứa metadata -->
    <meta charset="UTF-8"> <!-- charset: hỗ trợ tiếng Việt -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- responsive -->
    <title>Chi tiết sản phẩm</title> <!-- tiêu đề trang -->
</head>

<body> <!-- body: nội dung hiển thị -->

    <header> <!-- header: phần đầu trang -->
        <nav> <!-- nav: menu điều hướng -->
            <ul> <!-- ul: danh sách menu -->
                <li><a href="#">...</a></li> <!-- link -->
                <li><a href="#">...</a></li>
                <li><a href="#">...</a></li>
            </ul>
        </nav>
    </header>

    <nav aria-label="breadcrumb"> <!-- nav: breadcrumb là điều hướng -->
        <ol> <!-- ol: có thứ tự -->
            <li><a href="#">...</a></li>
            <li><a href="#">...</a></li>
            <li>...</li>
        </ol>
    </nav>

    <main> <!-- main: nội dung chính -->

        <section> <!-- section: khối sản phẩm -->

            <article> <!-- article: phần ảnh sản phẩm -->
                <figure> <!-- figure: nhóm media -->
                    <img src="#" alt="..."> <!-- ảnh -->
                    <figcaption>...</figcaption> <!-- chú thích -->
                </figure>
                <figure><img src="#" alt="..."></figure>
                <figure><img src="#" alt="..."></figure>
                <figure><img src="#" alt="..."></figure>
                <figure><img src="#" alt="..."></figure>
            </article>

            <article> <!-- article: thông tin sản phẩm -->
                <h1>...</h1> <!-- tên sản phẩm -->
                <p><strong>...</strong></p> <!-- giá -->
                <p>...</p> <!-- đánh giá -->
                <p>...</p> <!-- mô tả -->
            </article>

        </section>

        <section> <!-- section: bảng thông số -->
            <table> <!-- table: dữ liệu dạng bảng -->
                <thead> <!-- tiêu đề -->
                    <tr>
                        <th>...</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody> <!-- dữ liệu -->
                    <tr>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section> <!-- section: đánh giá -->
            <article> <!-- mỗi comment -->
                <p>...</p>
            </article>
            <article>
                <p>...</p>
            </article>
        </section>

    </main>

    <aside> <!-- aside: sản phẩm tương tự -->
        <article>
            <p>...</p>
        </article>
        <article>
            <p>...</p>
        </article>
    </aside>

    <footer> <!-- footer: cuối trang -->
        <p>...</p>
    </footer>

</body>
</html>