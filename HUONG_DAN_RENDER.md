# Triển khai Render — chỉ dùng DEMO với dữ liệu giả lập

1. Tạo kho GitHub riêng tư, đưa toàn bộ nội dung thư mục này lên kho (không đưa mật khẩu hay tệp *.sqlite3).
2. Trong Render chọn New > Blueprint, kết nối kho GitHub có tệp render.yaml.
3. Thiết lập ADMIN_PASSWORD mạnh trong cấu hình môi trường; SECRET_KEY được tự sinh.
4. Sau khi deploy mở địa chỉ *.onrender.com, đăng nhập admin.
5. Gói demo dùng SQLite trên ổ lưu trữ tạm thời của Render Free: **dữ liệu có thể bị mất khi redeploy/restart**. KHÔNG dùng để lưu dữ liệu báo cáo công vụ thực tế.
6. Trước khi sử dụng chính thức: chuyển sang PostgreSQL, hoàn thiện chống brute-force, phân quyền, sao lưu, kiểm thử bảo mật và đánh giá an toàn thông tin, đưa phần mềm qua quy trình phê duyệt của cơ quan.
7. Chức năng kiểm tra chính tả hiện chỉ là một số quy tắc đơn giản, chưa kiểm lỗi bằng AI.
