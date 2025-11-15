Giai đoạn 1: Khởi tạo & Planning 
Tạo project Jira/GitHub Project: backlog, sprint (8 tuần).

Tạo repository GitHub + branch model (main/dev/feature).

Mỗi người viết 1-2 trang tài liệu Confluence:

Giới thiệu hệ thống

Phân tích yêu cầu EV Renter

Phân tích yêu cầu Station Staff

Phân tích yêu cầu Admin

Non-functional requirements (bảo mật, hiệu năng, kiến trúc microservice).

Giai đoạn 2: Thiết kế hệ thống 
Cả nhóm: vẽ Use Case, ERD, kiến trúc microservice.

Confluence: mỗi người viết phần mô tả chi tiết 1 service (User Service, Vehicle Service, Rental Service, Payment Service, Admin Service).

GitHub: push bản thiết kế DB (SQL schema, migration).

Giai đoạn 3: Xây dựng Microservices 

Backend chia thành nhiều service, mỗi người code ít nhất 1 service:

User/Auth Service (đăng ký, xác thực renter & staff).

Vehicle Service (CRUD xe, trạng thái pin, tình trạng).

Rental Service (đặt xe, trả xe, hợp đồng).

Payment Service (thanh toán, cọc, hoàn cọc).

Admin Service (báo cáo, thống kê, quản lý nhân sự).

Mỗi người:

Code service của mình 
Viết API doc (Swagger/OpenAPI) → publish lên Confluence.

Đóng gói service bằng Docker.

Giai đoạn 4: Frontend & Tích hợp 
Toàn nhóm code chung UI (ReactJS hoặc Flutter).

Kết nối các service qua API Gateway.

Viết tài liệu hướng dẫn tích hợp trên Confluence.

Docker Compose để chạy toàn bộ hệ thống.

Giai đoạn 5: Kiểm thử & Triển khai 
Viết test case, chạy Postman/Newman.

Đảm bảo CI/CD pipeline trên GitHub Actions.

Viết báo cáo: đánh giá, kết luận, thống kê effort (số commit, số giờ).

Deploy Docker trên VPS/Cloud.

Demo cuối: mỗi người trình bày service mình làm + cùng test UI.


Jira: mỗi task ghi rõ ước lượng giờ 
GitHub: mỗi người phải có commit đều đặn.

Confluence: mỗi người có bài viết (tối thiểu 5–10 trang/người).

Cuối kỳ: export báo cáo từ Jira + GitHub để chứng minh effort
