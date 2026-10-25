# Phần mềm Báo cáo công tác tư pháp — Sở Tư pháp tỉnh Gia Lai

## Tính năng
- Tài khoản đăng nhập theo phòng/đơn vị; quản trị Văn phòng Sở tổng hợp tất cả đơn vị.
- Giữ nguyên tiêu đề, thứ tự đầu mục của mẫu báo cáo tháng 10/2026 đã cung cấp (kể cả a, b, c, d, đ, e, g và 2 nội dung con TGPL).
- Màu xanh mục đã lưu; xám mục chưa báo cáo; trạng thái tách riêng cho từng phòng.
- Kiểm tra chính tả trước lưu: bộ quy tắc **giới hạn, chạy ngoại tuyến**; người nhập xác nhận, và chữ ký nội dung phía máy chủ bảo đảm nội dung thay đổi phải kiểm lại.
- SQLite lưu bền vững; khóa kỳ; xuất Word dựa trên tệp mẫu báo cáo tháng.
- Báo cáo năm: nhập và tổng hợp theo khung thử nghiệm; **chưa xuất Word năm** do chưa có mẫu chính thức.

## Cài đặt máy Windows hoặc Linux có Python 3.10+
1. Giải nén gói ZIP và mở terminal trong thư mục `bao_cao_tu_phap_gia_lai`.
2. Tạo môi trường: `python -m venv .venv`; Windows `.venv\\Scripts\\activate`; Linux `source .venv/bin/activate`.
3. `pip install -r requirements.txt`.
4. Thiết lập **trước lần chạy đầu**:
   - Windows PowerShell: `$env:ADMIN_PASSWORD='MatKhauDaiItNhat12KyTu!'; $env:SECRET_KEY='CHUOI_NGAU_NHIEN_DAI_KHONG_CHIA_SE'`
   - Linux: `export ADMIN_PASSWORD='MatKhauDaiItNhat12KyTu!' SECRET_KEY='CHUOI_NGAU_NHIEN_DAI_KHONG_CHIA_SE'`
   - Thay giá trị ví dụ bằng bí mật riêng mạnh; đặt `SECRET_KEY` cố định để phiên đăng nhập ổn định.
5. Khởi động nội bộ: `python app.py`, truy cập `http://127.0.0.1:8080`. Tài khoản `admin` và mật khẩu từ `ADMIN_PASSWORD`.
6. Vào Quản trị để cấp tài khoản cho từng phòng. Đổi mật khẩu tài khoản admin ngay.

## Truy cập qua mạng nội bộ (thử nghiệm có kiểm soát)
`waitress-serve --host=0.0.0.0 --port=8080 app:app`
Chỉ dùng qua mạng tin cậy; nếu truy cập Internet, **bắt buộc triển khai sau HTTPS reverse proxy**, thiết lập `HTTPS_ONLY=1`, tường lửa, giới hạn đăng nhập và cơ chế sao lưu.

## Dữ liệu & an toàn
- Tệp `reports.sqlite3` được tạo khi chạy. Sao lưu tệp bằng công cụ SQLite backup (hoặc tạm dừng ứng dụng rồi sao lưu cùng các file WAL nếu có).
- Không đưa báo cáo có dữ liệu mật lên Internet khi chưa được đánh giá, phân quyền, cấu hình và phê duyệt ATTT.
- Các biện pháp chống brute-force/rate-limit, nhật ký xem, phân quyền chi tiết theo đầu mục, phục hồi dự phòng, giám sát và kiểm thử bảo mật cần bổ sung **trước khi đưa vào môi trường sản xuất cơ quan**.
- Chức năng chính tả là bộ quy tắc giới hạn, **không được coi là AI kiểm chính tả toàn diện**; nếu cần AI, hãy kết nối dịch vụ đã được đơn vị phê duyệt và rà soát xử lý dữ liệu.
- Khi tạo báo cáo Word, phần mềm dựa vào mẫu tháng 10/2026; số báo cáo/ngày ký/người ký phải được Văn phòng Sở rà soát, hoàn thiện trước phát hành.
