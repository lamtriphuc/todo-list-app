# Todo List App

Ứng dụng quản lý công việc (Todo List) được xây dựng bằng React, TypeScript, Vite, Tailwind CSS, và lưu dữ liệu bằng localStorage.

Ứng dụng cho phép người dùng thêm, sửa, xóa, tìm kiếm, lọc, sắp xếp và phân trang công việc. Dữ liệu được lưu trực tiếp trên trình duyệt thông qua localStorage, nên vẫn còn nguyên sau khi tải lại trang.

---

## Demo

🔗 Live: https://todo-list-app-henna-gamma.vercel.app/

---

## Tính năng

- Hiển thị danh sách công việc
- Thêm công việc mới bằng modal
- Chỉnh sửa công việc đã có
- Xóa công việc kèm modal xác nhận
- Đánh dấu hoàn thành / chưa hoàn thành
- Tìm kiếm công việc theo tiêu đề hoặc mô tả
- Lọc công việc theo trạng thái:
  - Tất cả
  - Chưa hoàn thành
  - Đã hoàn thành
- Hiển thị số lượng công việc ngay trong từng tab lọc
- Sắp xếp công việc theo:
  - Mới nhất
  - Cũ nhất
  - Tiêu đề A-Z
  - Tiêu đề Z-A
- Phân trang
- Lưu dữ liệu bằng localStorage
- Giữ nguyên trang hiện tại sau khi tải lại trình duyệt
- Tự động về trang 1 khi tìm kiếm, lọc, hoặc sắp xếp
- Giao diện responsive cho cả desktop và mobile
- Xử lý validate cơ bản và các trường hợp dữ liệu không hợp lệ

---

## Công nghệ sử dụng

- React 19
- TypeScript
- Vite
- Tailwind CSS
- localStorage
- Docker
- Nginx

---

## Yêu cầu môi trường

Đảm bảo máy đã cài:

```bash
Node.js >= 22
npm >= 10
```

---

## Hướng dẫn cài đặt và chạy

### Cách 1: Chạy trực tiếp bằng npm

```bash
# Clone repository
git clone https://github.com/lamtriphuc/todo-list-app.git
cd todo-list-app

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Truy cập ứng dụng tại:

```
http://localhost:5173
```

### Cách 2: Chạy bằng Docker Compose

```bash
# Clone repository
git clone https://github.com/lamtriphuc/todo-list-app.git
cd todo-list-app

# Khởi chạy bằng Docker Compose
docker compose up -d --build
```

Truy cập ứng dụng tại:

```
http://localhost:3000
```

Dừng container:

```bash
docker compose down
```

### Cách 3: Kéo image có sẵn từ Docker Hub
 
Không cần clone code hay cài Node.js — chỉ cần pull và chạy:
 
```bash
docker pull lamtriphuc2004/todo-app:v1
docker run -d -p 3000:80 --rm --name todo-app lamtriphuc2004/todo-app:v1
```
 
Truy cập ứng dụng tại:
 
```
http://localhost:3000
```
 
Dừng container (do dùng `--rm`, container sẽ tự động bị xóa sau khi dừng):
 
```bash
docker stop todo-app
```
 
---

## Các trường hợp dữ liệu không hợp lệ đã xử lý

- Tiêu đề công việc là bắt buộc, không được để rỗng hoặc chỉ chứa khoảng trắng (được trim trước khi validate).
- Giới hạn độ dài tối đa của tiêu đề để tránh tràn giao diện.
- Khoảng trắng thừa được trim trước khi lưu.
- Hiển thị empty state khi chưa có công việc nào, hoặc khi tìm kiếm/lọc không có kết quả.
- Tự động lùi về trang hợp lệ nếu trang hiện tại không còn item nào (ví dụ sau khi xóa hết item ở trang cuối).
- Tự động reset về trang 1 khi tìm kiếm, lọc, hoặc sắp xếp, tránh dừng ở trang trống.
- Thao tác xóa yêu cầu xác nhận qua modal để tránh mất dữ liệu ngoài ý muốn.
- Xử lý an toàn khi dữ liệu trong localStorage bị lỗi định dạng (ví dụ bị sửa tay hoặc JSON không hợp lệ), tự động fallback về danh sách rỗng thay vì làm crash ứng dụng.

---

## Ghi chú và giới hạn

- Phiên bản này chỉ dùng `localStorage` — chưa có backend hay database, nên dữ liệu chỉ giới hạn trong 1 trình duyệt/thiết bị.
- Nếu phát triển thêm, các bước tiếp theo có thể là:
  - Thêm backend (Node.js/Express/Spring Boot) kèm database thật (SQL/PostgreSQL) để đồng bộ dữ liệu đa thiết bị.
  - Bổ sung đầy đủ unit/integration test.
  - Thiết lập CI/CD để tự động build và push Docker image mỗi khi release.