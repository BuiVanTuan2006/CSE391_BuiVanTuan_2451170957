# Câu A1 (5đ) — Sync vs Async

## Thứ tự output

```javascript
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

## Giải thích

### Bước 1: Chạy Sync Code

JavaScript thực thi toàn bộ code đồng bộ trong Call Stack trước:

```javascript
console.log("1 - Start");
```

Output:

```javascript
1 - Start
```

Tiếp theo:

```javascript
setTimeout(() => console.log("2 - Timeout 0ms"), 0);
```

Callback được đưa sang Web APIs và sau ít nhất 0ms sẽ được chuyển vào Macrotask Queue.

```javascript
Promise.resolve().then(() => console.log("3 - Promise"));
```

Callback được đưa vào Microtask Queue.

```javascript
console.log("4 - End");
```

Output:

```javascript
4 - End
```

```javascript
setTimeout(() => console.log("5 - Timeout 100ms"), 100);
```

Được đưa sang Web APIs, sau 100ms mới vào Macrotask Queue.

```javascript
Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```

Callback được đưa vào Microtask Queue.

Trạng thái lúc này:

**Microtask Queue**

```text
3 - Promise
6 - Promise 2
```

**Macrotask Queue**

```text
2 - Timeout 0ms
```

---

### Bước 2: Event Loop xử lý Microtask Queue

Microtask luôn được ưu tiên thực thi trước Macrotask.

Thực thi:

```javascript
3 - Promise
```

Sau đó:

```javascript
6 - Promise 2
```

Trong callback này có:

```javascript
setTimeout(() => console.log("7 - Nested timeout"), 0);
```

nên callback mới được thêm vào Macrotask Queue.

Lúc này:

**Macrotask Queue**

```text
2 - Timeout 0ms
7 - Nested timeout
```

---

### Bước 3: Event Loop xử lý Macrotask Queue

Thực thi lần lượt:

```javascript
2 - Timeout 0ms
```

sau đó:

```javascript
7 - Nested timeout
```

---

### Bước 4: Sau 100ms

Timeout cuối cùng đủ thời gian chờ:

```javascript
5 - Timeout 100ms
```

---

## Event Loop

Event Loop là cơ chế giúp JavaScript xử lý các tác vụ bất đồng bộ.

Quy trình hoạt động:

```text
1. Thực thi toàn bộ Sync Code
2. Thực thi hết Microtask Queue
3. Thực thi 1 Macrotask
4. Quay lại bước 2
```

---

## Microtask Queue

Chứa các tác vụ có độ ưu tiên cao:

```javascript
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
```

Ví dụ:

```javascript
Promise.resolve().then(() => console.log("Microtask"));
```

---

## Macrotask Queue

Chứa các tác vụ bất đồng bộ thông thường:

```javascript
setTimeout()
setInterval()
DOM Events
I/O Operations
```

Ví dụ:

```javascript
setTimeout(() => console.log("Macrotask"), 0);
```

---

## Kết luận

Thứ tự ưu tiên của JavaScript:

```text
Sync Code
    ↓
Microtask Queue
    ↓
Macrotask Queue
```

Vì vậy Promise luôn được thực thi trước các callback của `setTimeout`, kể cả khi thời gian chờ là `0ms`.

# Câu A2 (5đ) — Fetch API

## Giải thích từng dòng code

```javascript
async function getData() {
```

Khai báo một hàm bất đồng bộ (async function).

Từ khóa `async` cho phép sử dụng `await` bên trong hàm và đảm bảo hàm luôn trả về một Promise.

---

```javascript
try {
```

Bắt đầu khối xử lý lỗi.

Các lỗi phát sinh trong khối `try` sẽ được chuyển đến `catch`.

---

```javascript
const response = await fetch("https://api.example.com/data");
```

Gửi HTTP Request đến API.

`fetch()` không trả về dữ liệu ngay lập tức mà trả về một Promise chứa đối tượng Response.

Ví dụ:

```javascript
const promise = fetch(url);
```

`promise` có kiểu:

```javascript
Promise<Response>
```

Cần dùng `await` để đợi request hoàn thành:

```javascript
const response = await fetch(url);
```

Sau khi Promise resolve, biến `response` sẽ chứa đối tượng Response.

---

```javascript
if (!response.ok) {
```

Kiểm tra request có thành công hay không.

`response.ok` là thuộc tính boolean:

```javascript
response.ok === true
```

khi status nằm trong khoảng:

```text
200 - 299
```

Ngược lại:

```javascript
response.ok === false
```

khi status ngoài khoảng trên.

Ví dụ:

| Status Code | Ý nghĩa               |
| ----------- | --------------------- |
| 404         | Not Found             |
| 401         | Unauthorized          |
| 500         | Internal Server Error |

---

```javascript
throw new Error(`HTTP ${response.status}`);
```

Tự tạo một Error và ném vào hệ thống.

Ví dụ:

```javascript
HTTP 404
HTTP 500
```

Sau khi `throw`, chương trình nhảy ngay sang `catch`.

---

```javascript
const data = await response.json();
```

Chuyển dữ liệu từ Response sang JavaScript Object.

Ví dụ API trả về:

```json
{
  "name": "Tuan",
  "age": 20
}
```

Sau khi gọi:

```javascript
const data = await response.json();
```

Kết quả:

```javascript
{
  name: "Tuan",
  age: 20
}
```

---

### Tại sao cần await lần nữa?

`response.json()` cũng trả về Promise:

```javascript
Promise<any>
```

Việc đọc và parse JSON cần thời gian nên phải đợi hoàn thành:

```javascript
const data = await response.json();
```

Nếu không dùng await:

```javascript
const data = response.json();
```

thì:

```javascript
data
```

sẽ là:

```javascript
Promise { <pending> }
```

chứ chưa phải dữ liệu thực tế.

---

```javascript
return data;
```

Trả dữ liệu cho nơi gọi hàm.

Ví dụ:

```javascript
const result = await getData();
```

---

```javascript
} catch (error) {
```

Bắt các lỗi phát sinh trong khối `try`.

---

```javascript
console.error("Failed:", error.message);
```

In thông báo lỗi ra console.

Ví dụ:

```text
Failed: HTTP 404
Failed: Failed to fetch
```

---

```javascript
return null;
```

Trả về `null` khi có lỗi để chương trình không bị crash.

---

## await fetch(...) trả về gì?

`fetch(url)` trả về:

```javascript
Promise<Response>
```

Ví dụ:

```javascript
const result = fetch(url);
```

Kết quả:

```javascript
Promise { <pending> }
```

Sau khi:

```javascript
const response = await fetch(url);
```

thì:

```javascript
response
```

là một đối tượng Response chứa:

```javascript
response.status
response.ok
response.headers
response.json()
response.text()
```

---

## response.ok khi nào false?

`response.ok` là false khi status không nằm trong khoảng:

```text
200 - 299
```

Ví dụ:

```text
401 Unauthorized
404 Not Found
500 Internal Server Error
```

---

## response.json() tại sao cần await?

Vì:

```javascript
response.json()
```

trả về:

```javascript
Promise<any>
```

Quá trình đọc dữ liệu từ body và parse JSON là bất đồng bộ.

Do đó cần:

```javascript
const data = await response.json();
```

để nhận dữ liệu thật.

---

## try...catch bắt những lỗi gì?

### 1. Network Error

Ví dụ:

* Mất mạng
* DNS không tìm thấy server
* Server không phản hồi

```javascript
await fetch(url);
```

sẽ reject Promise.

Ví dụ lỗi:

```text
Failed to fetch
```

Lỗi này sẽ được catch.

---

### 2. HTTP Error (404, 500, ...)

Fetch KHÔNG tự động throw lỗi với 404 hoặc 500.

Ví dụ:

```javascript
const response = await fetch(url);
```

vẫn thành công.

Do đó phải tự kiểm tra:

```javascript
if (!response.ok) {
    throw new Error(...);
}
```

Sau khi throw, lỗi mới được catch.

---

### 3. JSON Parse Error

Ví dụ server trả:

```text
Hello World
```

nhưng code lại:

```javascript
await response.json();
```

JSON không hợp lệ nên:

```javascript
response.json()
```

sẽ throw lỗi.

Lỗi này cũng được catch.

---

## Kết luận

Quy trình hoạt động:

```text
fetch()
   ↓
Promise<Response>
   ↓
await
   ↓
Response
   ↓
Kiểm tra response.ok
   ↓
response.json()
   ↓
Promise<Data>
   ↓
await
   ↓
Data thực tế
```

Các lỗi được catch:

✔ Network Error

✔ Error do throw thủ công (404, 500, ...)

✔ JSON Parse Error

✘ Fetch không tự throw lỗi cho 404 hoặc 500

# Câu A3 (5đ) — Promise States

## Sơ đồ 3 trạng thái của Promise

```text
                Promise
                   |
                Pending
               /       \
              /         \
      resolve()       reject()
           |               |
           v               v
      Fulfilled       Rejected
```

Hoặc:

```text
Pending
   |
   | resolve(value)
   v
Fulfilled

Pending
   |
   | reject(error)
   v
Rejected
```

---

## Giải thích các trạng thái

### 1. Pending

Trạng thái ban đầu của Promise.

Promise đang thực hiện công việc nhưng chưa có kết quả.

Ví dụ:

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success");
    }, 2000);
});
```

Trong 2 giây đầu:

```text
Pending
```

---

### 2. Fulfilled

Promise hoàn thành thành công.

Ví dụ:

```javascript
resolve("Success");
```

Trạng thái:

```text
Fulfilled
```

Giá trị được truyền cho `.then()`.

```javascript
promise.then(result => {
    console.log(result);
});
```

Output:

```text
Success
```

---

### 3. Rejected

Promise thất bại.

Ví dụ:

```javascript
reject("Error");
```

Trạng thái:

```text
Rejected
```

Giá trị được truyền cho `.catch()`.

```javascript
promise.catch(error => {
    console.error(error);
});
```

Output:

```text
Error
```

---

## Lưu ý quan trọng

Promise chỉ chuyển trạng thái một lần duy nhất.

Ví dụ:

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Success");
    reject("Error");
});
```

Kết quả:

```text
Fulfilled
```

Lệnh `reject()` bị bỏ qua.

---

# Callback Hell là gì?

Callback Hell là tình trạng nhiều callback lồng nhau liên tiếp làm code:

* Khó đọc
* Khó bảo trì
* Khó debug
* Dễ phát sinh lỗi

Hình dạng code thường giống "tam giác chết" (Pyramid of Doom).

---

## Ví dụ Callback Hell 4 cấp

```javascript
loginUser(username, function(user) {

    getProfile(user.id, function(profile) {

        getOrders(profile.id, function(orders) {

            getOrderDetail(orders[0].id, function(detail) {

                console.log(detail);

            });

        });

    });

});
```

Nhìn trực quan:

```text
loginUser
 └─ getProfile
     └─ getOrders
         └─ getOrderDetail
```

Code bị thụt vào ngày càng sâu.

---

## Callback Hell thực tế

```javascript
setTimeout(() => {

    console.log("Step 1");

    setTimeout(() => {

        console.log("Step 2");

        setTimeout(() => {

            console.log("Step 3");

            setTimeout(() => {

                console.log("Step 4");

            }, 1000);

        }, 1000);

    }, 1000);

}, 1000);
```

Output:

```text
Step 1
Step 2
Step 3
Step 4
```

Nhưng code rất khó đọc.

---

# Refactor bằng Promise

```javascript
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

wait(1000)
    .then(() => {
        console.log("Step 1");
        return wait(1000);
    })
    .then(() => {
        console.log("Step 2");
        return wait(1000);
    })
    .then(() => {
        console.log("Step 3");
        return wait(1000);
    })
    .then(() => {
        console.log("Step 4");
    });
```

Code phẳng hơn nhưng vẫn hơi dài.

---

# Refactor bằng async/await

```javascript
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function run() {

    await wait(1000);
    console.log("Step 1");

    await wait(1000);
    console.log("Step 2");

    await wait(1000);
    console.log("Step 3");

    await wait(1000);
    console.log("Step 4");

}

run();
```

Output:

```text
Step 1
Step 2
Step 3
Step 4
```

---

## Tại sao async/await tốt hơn?

### Callback Hell

```javascript
a(function() {
    b(function() {
        c(function() {
            d(function() {

            });
        });
    });
});
```

Khó đọc và khó xử lý lỗi.

---

### Async/Await

```javascript
await a();
await b();
await c();
await d();
```

Ưu điểm:

* Dễ đọc như code đồng bộ
* Ít lồng nhau
* Dễ debug
* Dễ xử lý lỗi bằng try...catch

Ví dụ:

```javascript
try {
    await a();
    await b();
    await c();
} catch (error) {
    console.error(error);
}
```

---

# Kết luận

Promise có 3 trạng thái:

```text
Pending
   ├── resolve() → Fulfilled
   └── reject()  → Rejected
```

Callback Hell là hiện tượng nhiều callback lồng nhau gây khó đọc và khó bảo trì.

Giải pháp hiện đại:

```text
Callback
    ↓
Promise
    ↓
Async / Await
```

Trong JavaScript hiện nay, async/await là cách được ưu tiên sử dụng vì code ngắn gọn, rõ ràng và dễ bảo trì hơn.

# Câu C1 (10đ) — Error Handling Strategy

## 1. Network Errors (Mất mạng giữa chừng)

### Nguyên nhân

* Người dùng mất kết nối Internet
* WiFi bị ngắt
* DNS không phân giải được tên miền
* Server không thể truy cập

### Cách xử lý

* Hiển thị thông báo thân thiện cho người dùng
* Cho phép người dùng thử lại (Retry)
* Ghi log lỗi để debug
* Không làm ứng dụng bị crash

### Ví dụ

```javascript
try {
    const response = await fetch(url);
    const data = await response.json();
} catch (error) {
    alert("Mất kết nối mạng. Vui lòng thử lại.");
    console.error(error);
}
```

---

## 2. API Errors

API có thể phản hồi thành công về mặt kết nối nhưng trả về mã lỗi HTTP.

### 404 Not Found

Nguyên nhân:

* API endpoint không tồn tại
* Dữ liệu không tồn tại

Ví dụ:

```javascript
if (response.status === 404) {
    throw new Error("Không tìm thấy dữ liệu");
}
```

Thông báo:

```text
Không tìm thấy sản phẩm hoặc tài nguyên yêu cầu.
```

---

### 500 Internal Server Error

Nguyên nhân:

* Lỗi phía server

Ví dụ:

```javascript
if (response.status === 500) {
    throw new Error("Lỗi máy chủ");
}
```

Thông báo:

```text
Hệ thống đang bảo trì hoặc gặp sự cố.
Vui lòng thử lại sau.
```

---

### 429 Too Many Requests

Nguyên nhân:

* Gửi quá nhiều request trong thời gian ngắn
* Bị giới hạn API Rate Limit

Ví dụ:

```javascript
if (response.status === 429) {
    throw new Error("Too Many Requests");
}
```

Thông báo:

```text
Bạn đang thao tác quá nhanh.
Vui lòng thử lại sau vài giây.
```

---

### Xử lý tổng quát

```javascript
const response = await fetch(url);

if (!response.ok) {

    switch (response.status) {

        case 404:
            throw new Error("Not Found");

        case 429:
            throw new Error("Too Many Requests");

        case 500:
            throw new Error("Server Error");

        default:
            throw new Error(
                `HTTP ${response.status}`
            );
    }
}
```

---

# 3. Timeout (API chậm quá 10 giây)

### Mục tiêu

Nếu API phản hồi quá chậm:

```text
> 10 giây
```

thì tự động hủy request.

### Hàm fetchWithTimeout()

```javascript
async function fetchWithTimeout(
    url,
    ms = 10000
) {

    const controller =
        new AbortController();

    const timeoutId =
        setTimeout(() => {
            controller.abort();
        }, ms);

    try {

        const response =
            await fetch(url, {
                signal:
                    controller.signal
            });

        clearTimeout(timeoutId);

        return response;

    } catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            throw new Error(
                "Request Timeout"
            );
        }

        throw error;
    }
}
```

### Sử dụng

```javascript
try {

    const response =
        await fetchWithTimeout(
            "/api/products",
            10000
        );

} catch (error) {

    console.log(error.message);

}
```

---

# 4. Retry Logic

### Mục tiêu

Nếu xảy ra lỗi mạng:

```text
Network Error
```

thì tự động thử lại tối đa:

```text
3 lần
```

---

## Hàm fetchWithRetry()

```javascript
async function fetchWithRetry(
    url,
    maxRetries = 3
) {

    let attempt = 0;

    while (
        attempt <= maxRetries
    ) {

        try {

            const response =
                await fetch(url);

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return response;

        } catch (error) {

            attempt++;

            console.log(
                `Retry ${attempt}/${maxRetries}`
            );

            if (
                attempt >
                maxRetries
            ) {

                throw error;
            }
        }
    }
}
```

---

## Sử dụng

```javascript
try {

    const response =
        await fetchWithRetry(
            "/api/products",
            3
        );

    const data =
        await response.json();

    console.log(data);

} catch (error) {

    console.error(
        "Tất cả lần thử đều thất bại"
    );

}
```

---

# Retry Logic với Delay (Khuyến nghị)

Không nên retry liên tục.

Nên chờ một khoảng thời gian giữa các lần thử.

```javascript
function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

async function fetchWithRetry(
    url,
    maxRetries = 3
) {

    for (
        let i = 0;
        i <= maxRetries;
        i++
    ) {

        try {

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error();
            }

            return response;

        } catch (error) {

            if (i === maxRetries) {
                throw error;
            }

            await sleep(1000);
        }
    }
}
```

---

# Chiến lược xử lý lỗi cho E-Commerce App

| Loại lỗi              | Cách xử lý                               |
| --------------------- | ---------------------------------------- |
| Network Error         | Hiện thông báo mất mạng, cho phép Retry  |
| 404 Not Found         | Thông báo không tìm thấy dữ liệu         |
| 500 Server Error      | Thông báo hệ thống đang bảo trì          |
| 429 Too Many Requests | Yêu cầu người dùng thử lại sau           |
| Timeout > 10s         | Hủy request bằng AbortController         |
| Network Failure       | Retry tối đa 3 lần                       |
| Tất cả lỗi            | Ghi log và hiển thị thông báo thân thiện |

---

# Kết luận

Một ứng dụng E-Commerce tốt cần:

1. Bắt lỗi bằng `try...catch`
2. Kiểm tra HTTP Status Code
3. Hỗ trợ Timeout bằng `AbortController`
4. Retry khi gặp lỗi mạng
5. Hiển thị thông báo rõ ràng cho người dùng
6. Không để ứng dụng bị crash khi API gặp sự cố

Nhờ đó trải nghiệm người dùng sẽ ổn định hơn và hệ thống có khả năng chịu lỗi tốt hơn.

# Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

## Bảng so sánh

| Method               | Khi nào resolve?                                     | Khi nào reject?             | Use case                            |
| -------------------- | ---------------------------------------------------- | --------------------------- | ----------------------------------- |
| Promise.all()        | Tất cả Promise thành công                            | Chỉ cần 1 Promise lỗi       | Các dữ liệu bắt buộc phải có đầy đủ |
| Promise.allSettled() | Tất cả Promise hoàn thành (thành công hoặc thất bại) | Không reject                | Dashboard, nhiều API độc lập        |
| Promise.race()       | Promise đầu tiên hoàn thành                          | Promise đầu tiên bị reject  | Timeout, lấy kết quả nhanh nhất     |
| Promise.any()        | Promise đầu tiên thành công                          | Tất cả Promise đều thất bại | Fallback server/CDN                 |

---

# 1. Promise.all()

## Cơ chế

```text
Promise 1 ✓
Promise 2 ✓
Promise 3 ✓
      ↓
Resolve
```

Chỉ cần một Promise lỗi:

```text
Promise 1 ✓
Promise 2 ✗
Promise 3 ✓
      ↓
Reject ngay
```

---

## Scenario thực tế: Trang Product Detail

Để hiển thị sản phẩm cần:

* Thông tin sản phẩm
* Đánh giá
* Tồn kho

Thiếu một phần thì không thể render đầy đủ.

```javascript
async function loadProduct(id) {

    const [
        product,
        reviews,
        inventory
    ] = await Promise.all([

        fetch(`/api/products/${id}`)
            .then(r => r.json()),

        fetch(`/api/products/${id}/reviews`)
            .then(r => r.json()),

        fetch(`/api/products/${id}/inventory`)
            .then(r => r.json())

    ]);

    return {
        product,
        reviews,
        inventory
    };
}
```

### Vì sao dùng Promise.all?

Tất cả dữ liệu đều bắt buộc.

Nếu inventory lỗi thì không thể hiển thị chính xác sản phẩm.

---

# 2. Promise.allSettled()

## Cơ chế

```text
API 1 ✓
API 2 ✗
API 3 ✓
     ↓
Resolve
```

Không reject.

Luôn trả về kết quả của tất cả Promise.

---

## Scenario thực tế: Dashboard

Dashboard gồm:

* Weather Widget
* News Widget
* User Widget

Nếu News API lỗi thì Weather vẫn phải hiển thị.

```javascript
async function loadDashboard() {

    const results =
        await Promise.allSettled([

            fetch("/api/weather")
                .then(r => r.json()),

            fetch("/api/news")
                .then(r => r.json()),

            fetch("/api/users")
                .then(r => r.json())

        ]);

    results.forEach(result => {

        if (
            result.status ===
            "fulfilled"
        ) {

            console.log(
                result.value
            );

        } else {

            console.error(
                result.reason
            );
        }
    });
}
```

### Vì sao dùng allSettled?

Một API lỗi không ảnh hưởng API khác.

---

# 3. Promise.race()

## Cơ chế

```text
Promise A (2s)
Promise B (5s)
Promise C (8s)

↓

A thắng
```

Promise đầu tiên hoàn thành quyết định kết quả.

---

## Scenario thực tế: Timeout Request

Nếu API phản hồi quá 10 giây:

```text
Hủy request
```

```javascript
function timeout(ms) {

    return new Promise(
        (_, reject) => {

            setTimeout(() => {

                reject(
                    new Error(
                        "Request Timeout"
                    )
                );

            }, ms);
        }
    );
}

async function getData() {

    const response =
        await Promise.race([

            fetch("/api/products"),

            timeout(10000)

        ]);

    return response.json();
}
```

### Vì sao dùng race?

Ai hoàn thành trước sẽ thắng:

* API trả dữ liệu
* Timeout kích hoạt

---

# 4. Promise.any()

## Cơ chế

```text
Server A ✗
Server B ✗
Server C ✓

↓

Resolve từ C
```

Chỉ cần một Promise thành công.

---

## Reject khi nào?

Chỉ reject nếu:

```text
A ✗
B ✗
C ✗
```

Tất cả đều thất bại.

---

## Scenario thực tế: CDN Fallback

Một hình ảnh có thể nằm trên nhiều CDN.

```javascript
async function loadImage() {

    const image =
        await Promise.any([

            fetch(
                "https://cdn1.com/banner.jpg"
            ),

            fetch(
                "https://cdn2.com/banner.jpg"
            ),

            fetch(
                "https://cdn3.com/banner.jpg"
            )

        ]);

    return image;
}
```

### Vì sao dùng any?

Không quan tâm CDN nào thành công.

Chỉ cần lấy được ảnh.

---

# So sánh trực quan

## Promise.all()

```text
A ✓
B ✓
C ✓
 ↓
Success

A ✓
B ✗
C ✓
 ↓
Fail
```

---

## Promise.allSettled()

```text
A ✓
B ✗
C ✓
 ↓
Success
```

Kết quả chứa trạng thái từng Promise.

---

## Promise.race()

```text
A (2s)
B (5s)
C (8s)

↓

A thắng
```

---

## Promise.any()

```text
A ✗
B ✗
C ✓

↓

Success từ C
```

---

# Kết luận

### Promise.all()

Dùng khi:

```text
Tất cả dữ liệu đều bắt buộc
```

Ví dụ:

* Product Detail
* Checkout
* User Profile

---

### Promise.allSettled()

Dùng khi:

```text
Các API độc lập với nhau
```

Ví dụ:

* Dashboard
* Trang tổng hợp dữ liệu

---

### Promise.race()

Dùng khi:

```text
Quan tâm kết quả đầu tiên
```

Ví dụ:

* Timeout API
* Chọn server phản hồi nhanh nhất

---

### Promise.any()

Dùng khi:

```text
Chỉ cần một Promise thành công
```

Ví dụ:

* CDN Fallback
* Mirror Server
* Backup API

