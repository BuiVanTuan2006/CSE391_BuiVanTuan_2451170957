const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- KHỞI TẠO CÁC BIẾN ĐỂ LƯU TRỮ THỐNG KÊ ---
// Thống kê xếp loại
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

// Tìm thủ khoa / á khoa (Khởi tạo bằng phần tử đầu tiên để so sánh)
let highestStudent = null;
let lowestStudent = null;

// Tổng điểm các môn để tính trung bình cả lớp
let totalMath = 0, totalPhysics = 0, totalCs = 0;

// Biến phục vụ tính điểm theo giới tính (Bonus)
let totalMaleGPA = 0, countMale = 0;
let totalFemaleGPA = 0, countFemale = 0;


// --- BƯỚC 1 & 2 & 3: XỬ LÝ TỪNG SINH VIÊN VÀ IN BẢNG ---
console.log("| STT | Tên     | TB   | Xếp loại    |");
console.log("|-----|---------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const s = students[i];

    // 1. Tính điểm trung bình (làm tròn đến 1 chữ số thập phân)
    let gpa = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    gpa = Math.round(gpa * 10) / 10; // Cách làm tròn chuẩn trong JS

    // 2. Xếp loại
    let rank = "";
    if (gpa >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (gpa >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (gpa >= 5.0) {
        rank = "Trung bình";
        countTB++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    // 3. In dòng kết quả (Sử dụng padEnd để căn lề bảng cho đẹp mắt)
    const stt = (i + 1).toString().padEnd(3);
    const name = s.name.padEnd(8);
    const gpaStr = gpa.toFixed(1).padEnd(5);
    console.log(`| ${stt} | ${name} | ${gpaStr} | ${rank.padEnd(11)} |`);

    // --- TÍCH HỢP TÍNH TOÁN CHO CÁC CÂU TIẾP THEO ---
    // 5. Tìm thủ khoa, á khoa
    if (highestStudent === null || gpa > highestStudent.gpa) {
        highestStudent = { name: s.name, gpa: gpa };
    }
    if (lowestStudent === null || gpa < lowestStudent.gpa) {
        lowestStudent = { name: s.name, gpa: gpa };
    }

    // 6. Cộng dồn điểm môn học
    totalMath += s.math;
    totalPhysics += s.physics;
    totalCs += s.cs;

    // 7. Thống kê theo giới tính
    if (s.gender === "M") {
        totalMaleGPA += gpa;
        countMale++;
    } else if (s.gender === "F") {
        totalFemaleGPA += gpa;
        countFemale++;
    }
}

console.log("---------------------------------------\n");

// --- BƯỚC 4: IN SỐ LƯỢNG XẾP LOẠI ---
console.log("4. Thống kê xếp loại:");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV\n`);

// --- BƯỚC 5: IN THỦ KHOA / Á KHOA ---
console.log("5. Thủ khoa và Á khoa:");
console.log(`- SV có điểm TB cao nhất: ${highestStudent.name} (${highestStudent.gpa})`);
console.log(`- SV có điểm TB thấp nhất: ${lowestStudent.name} (${lowestStudent.gpa})\n`);

// --- BƯỚC 6: TÍNH ĐIỂM TRUNG BÌNH MÔN CỦA CẢ LỚP ---
const totalStudents = students.length;
const avgMath = (totalMath / totalStudents).toFixed(2);
const avgPhysics = (totalPhysics / totalStudents).toFixed(2);
const avgCs = (totalCs / totalStudents).toFixed(2);

console.log("6. Điểm trung bình toàn lớp theo từng môn:");
console.log(`- Toán (Math): ${avgMath}`);
console.log(`- Vật lý (Physics): ${avgPhysics}`);
console.log(`- Tin học (CS): ${avgCs}\n`);

// --- BƯỚC 7: BONUS - TÍNH THEO GIỚI TÍNH ---
const avgMale = countMale > 0 ? (totalMaleGPA / countMale).toFixed(2) : 0;
const avgFemale = countFemale > 0 ? (totalFemaleGPA / countFemale).toFixed(2) : 0;

console.log("7. (Bonus) Điểm trung bình theo giới tính:");
console.log(`- Nam (M): ${avgMale} (Tổng số: ${countMale} SV)`);
console.log(`- Nữ (F): ${avgFemale} (Tổng số: ${countFemale} SV)`);