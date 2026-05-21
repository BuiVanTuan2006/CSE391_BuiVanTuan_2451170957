function createCart() {
    // --- PRIVATE DATA (Dữ liệu ẩn, bảo mật bên trong Closure) ---
    let items = [];
    let currentDiscount = { code: "", type: "none", value: 0 };

    // --- HELPER FUNCTION (Hàm hỗ trợ định dạng tiền tệ nội bộ) ---
    const formatMoney = (amount) => {
        return Math.round(amount).toLocaleString("vi-VN") + "đ";
    };

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Sử dụng spread để copy object tránh thay đổi gốc và gán thêm thuộc tính quantity
                items.push({ ...product, quantity: quantity });
            }
        },
        
        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // 3. Cập nhật số lượng mới
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
        // 4. Tính tổng tiền (sau khi đã áp dụng mã giảm giá)
        getTotal() {
            // Tính tổng tiền gốc trước thuế/giảm giá
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Áp dụng tính toán giảm giá
            if (currentDiscount.type === "percentage") {
                return subtotal * (1 - currentDiscount.value / 100);
            } else if (currentDiscount.type === "fixed") {
                // Đảm bảo tổng tiền không bị âm nếu số tiền giảm lớn hơn giá trị đơn hàng
                return Math.max(0, subtotal - currentDiscount.value);
            }
            
            return subtotal;
        },
        
        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const cleanCode = code.toUpperCase().trim();
            switch (cleanCode) {
                case "SALE10":
                    currentDiscount = { code: cleanCode, type: "percentage", value: 10 };
                    console.log(`[Hệ thống]: Áp dụng thành công mã ${cleanCode} (Giảm 10%)`);
                    break;
                case "SALE20":
                    currentDiscount = { code: cleanCode, type: "percentage", value: 20 };
                    console.log(`[Hệ thống]: Áp dụng thành công mã ${cleanCode} (Giảm 20%)`);
                    break;
                case "FREESHIP":
                    currentDiscount = { code: cleanCode, type: "fixed", value: 30000 };
                    console.log(`[Hệ thống]: Áp dụng thành công mã ${cleanCode} (Giảm 30.000đ)`);
                    break;
                default:
                    console.log(`[Hệ thống] Lỗi: Mã giảm giá "${code}" không hợp lệ!`);
            }
        },
        
        // 6. In giỏ hàng dạng bảng được căn lề tự động
        printCart() {
            if (items.length === 0) {
                console.log("┌──────────────────────────────────────────────┐");
                console.log("│             Giỏ hàng của bạn rỗng!           │");
                console.log("└──────────────────────────────────────────────┘");
                return;
            }

            console.log("┌─────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm        │ SL │ Đơn giá       │ Tổng            │");
            console.log("├───┼─────────────────┼────┼───────────────┼─────────────────┤");

            const rawTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Duyệt in từng hàng mặt hàng
            items.forEach((item, index) => {
                const stt = String(index + 1).padEnd(2);
                const name = item.name.padEnd(15);
                const qty = String(item.quantity).padStart(2).padEnd(3);
                const singlePrice = item.price.toLocaleString("vi-VN").padStart(13);
                const lineTotal = (item.price * item.quantity).toLocaleString("vi-VN").padStart(15);
                
                console.log(`│ ${stt}│ ${name} │ ${qty}│ ${singlePrice} │ ${lineTotal} │`);
            });

            console.log("├─────────────────────────────────────────────────────────────┤");
            
            // In phần thông tin giảm giá nếu có
            if (currentDiscount.type !== "none") {
                let discountText = "";
                if (currentDiscount.type === "percentage") {
                    discountText = `-${currentDiscount.value}%`;
                } else {
                    discountText = `-${formatMoney(currentDiscount.value)}`;
                }
                const discountLine = `Mã giảm giá đã áp dụng (${currentDiscount.code}): ${discountText}`;
                console.log(`│ ${discountLine.padEnd(58)} │`);
                console.log("├─────────────────────────────────────────────────────────────┤");
            }

            // In dòng tổng tiền thanh toán cuối cùng
            const finalTotalStr = `Tổng thanh toán: ${formatMoney(this.getTotal())}`;
            console.log(`│ ${finalTotalStr.padStart(58)} │`);
            console.log("└─────────────────────────────────────────────────────────────┘");
        },
        
        // 7. Lấy tổng số lượng sản phẩm (tổng các trường quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        // 8. Xóa sạch toàn bộ giỏ hàng và reset code giảm giá
        clearCart() {
            items = [];
            currentDiscount = { code: "", type: "none", value: 0 };
            console.log("[Hệ thống]: Đã xóa sạch giỏ hàng.");
        }
    };
}


// ==========================================
// CHẠY BỘ KIỂM THỬ (TEST CASES)
// ==========================================
const cart = createCart();

// 1. Thực hiện thêm các mặt hàng vào giỏ
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng id 1 → Tăng số lượng lên thành 2

console.log("--- GIỎ HÀNG BAN ĐẦU ---");
cart.printCart();

// 2. Thử nghiệm áp dụng mã giảm giá 10%
cart.applyDiscount("SALE10");
console.log("\n--- GIỎ HÀNG SAU KHI GIẢM GIÁ ---");
cart.printCart();

// 3. Kiểm tra các hàm thống kê và xóa sửa
console.log("\n--- KIỂM TRA THÔNG TIN SỐ LƯỢNG ---");
console.log("Tổng số lượng item trong giỏ hàng hiện tại:", cart.getItemCount()); // Kỳ vọng ra: 4 (2 iPhone + 2 AirPods)

cart.removeItem(3); // Tiến hành xóa AirPods Pro (id: 3)
console.log("Số lượng sau khi xóa AirPods Pro:", cart.getItemCount()); // Kỳ vọng ra: 2 (chỉ còn 2 chiếc iPhone)

console.log("\n--- TRẠNG THÁI GIỎ HÀNG CUỐI CÙNG ---");
cart.printCart();