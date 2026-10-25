# Tích hợp AI kiểm tra chính tả phía máy chủ — BẢN KIỂM THỬ

## 1. Cập nhật GitHub

Giữ nguyên cấu trúc thư mục `app.py`, `templates/`, `static/` ở root. Thay toàn bộ các tệp từ gói, bao gồm `app.py`, `templates/entry.html`, `static/app.js`, `requirements.txt`. Commit trên nhánh `main` để Render tự triển khai.

## 2. Biến môi trường (Render > Web service > Environment)

- `SECRET_KEY`: chuỗi bí mật đủ mạnh, **giữ nguyên** nếu đã thiết lập.
- `ADMIN_PASSWORD`: mật khẩu khởi tạo quản trị, không cung cấp trong chat.
- `HTTPS_ONLY=1`.
- `REQUIRE_AI_REVIEW=1` — khóa lưu khi không có AI hợp lệ.
- `AI_ENABLED=1` — chỉ bật sau khi cơ quan cho phép.
- `AI_SECURITY_APPROVED=1` — cờ xác nhận **đã có quyết định/phê duyệt từ người có thẩm quyền**, không phải bản thân phần mềm phê duyệt.
- `OPENAI_API_KEY`: khóa API tạo trong tài khoản OpenAI Platform, **chỉ lưu ở Environment của Render**, không ghi lên GitHub, không gửi qua chat hoặc đưa vào JavaScript.
- `AI_MODEL=gpt-4.1-mini` — có thể chọn mô hình khác hỗ trợ Responses API và JSON Schema, sau kiểm thử tương thích.

Nếu chưa được cơ quan phê duyệt, giữ `AI_ENABLED=0` hoặc không cung cấp API key; nút lưu sẽ bị khóa theo chế độ bắt buộc AI.

## 3. Quy trình sử dụng

Người nhập tự phân loại nội dung và xác nhận được phép gửi tới nhà cung cấp AI -> máy chủ kiểm tra từ/cụm từ nhạy cảm cơ bản -> gọi API bằng HTTPS với `store:false` -> hệ thống hiển thị vị trí, lỗi, đề xuất sửa -> người dùng chấp nhận/sửa rồi kiểm tra lại -> xác nhận -> lưu. AI không được tự sửa nội dung đã báo cáo và có thể nhầm; kiểm tra số liệu, căn cứ pháp lý do người dùng chịu trách nhiệm.

## 4. Các điều kiện cần phê duyệt ngoài phần mềm

- Thẩm định luồng dữ liệu gửi ra ngoài (địa điểm xử lý, chuyển dữ liệu qua biên giới, dữ liệu cá nhân, bí mật nhà nước, danh mục loại dữ liệu được phép gửi).
- Phê duyệt nhà cung cấp AI, hợp đồng/DPA, điều khoản lưu giữ và xử lý dữ liệu, cấu hình tổ chức và các lựa chọn lưu giữ phù hợp; `store:false` **không đồng nghĩa không có mọi hình thức lưu giữ/xử lý**.
- Tài khoản phân quyền, bảo vệ chống brute force, CSRF, logging tối thiểu, sao lưu, quản lý sự cố, kiểm thử thâm nhập và đánh giá ATTT theo cấp độ trước khi dùng dữ liệu công vụ.
- Bản demo còn dùng SQLite trên filesystem tạm thời của Render Free; **không dùng dữ liệu công vụ thật**, chuyển cơ sở dữ liệu Postgres bền vững và thử nghiệm phục hồi trước triển khai.
- Bộ lọc nhạy cảm chỉ là rào chắn hỗ trợ, không thể bảo đảm phát hiện tất cả thông tin mật/cá nhân. Hãy dùng dữ liệu giả lập trong giai đoạn thử nghiệm.

## 5. Kiểm tra nhanh

- Không cấu hình API: bấm Kiểm tra -> báo chưa đủ điều kiện, không lưu.
- Đã cấu hình: không tick xác nhận phân loại -> không gọi AI.
- Nội dung có `password: abc` hoặc `CCCD: 012345678901` -> chặn gửi AI.
- Nếu AI phản hồi lỗi/quá hạn -> không lưu.
- Nếu có đề xuất -> sửa và kiểm tra lại, không thể bấm Lưu trước.
- Nếu không còn đề xuất -> tick xác nhận và Lưu.

**Bản này chưa được kết nối API thực trên môi trường này; không có chứng cứ phê duyệt bảo mật hay đánh giá ATTT.**
