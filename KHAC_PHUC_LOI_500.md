# Khắc phục lỗi 500 /login trên Render

Lỗi xác nhận trong Render logs: `jinja2.exceptions.TemplateNotFound: login.html`.

Repo đang triển khai: https://github.com/binhdinhstp/stp, branch `main`.

Trong repository, đặt các tệp và thư mục tại **gốc repository** (không tạo thêm thư mục bao ngoài):

```
app.py
requirements.txt
render.yaml
mau_bao_cao_thang.docx
templates/
  base.html
  login.html
  index.html
  entry.html
  admin.html
  report.html
  password.html
static/
  style.css
  app.js
```

Hướng dẫn:
1. Giải nén gói sửa lỗi.
2. Tại GitHub repository `binhdinhstp/stp` > Add file > Upload files, tải `templates` và `static` cùng toàn bộ tệp ở gốc (giữ cấu trúc). Khi dùng giao diện GitHub, có thể kéo các thư mục từ máy tính vào khu vực tải lên để giữ đường dẫn.
3. Commit changes vào nhánh `main`. Render được cấu hình auto deploy khi có commit mới.
4. Chờ trang Render hiển thị deploy thành công rồi kiểm tra `/login`.
5. Không tải các tệp `.env`, cơ sở dữ liệu `*.sqlite3`, hoặc mật khẩu lên GitHub.

Lưu ý: Bản demo dùng SQLite trên ổ đĩa không bền vững của dịch vụ free; chỉ nhập dữ liệu giả lập.
