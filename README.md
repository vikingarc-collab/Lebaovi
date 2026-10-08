# Vikcom – Website công ty (vikcom.vn)

Website giới thiệu công ty Vikcom – tư vấn giải pháp vận hành nền tảng thương mại điện tử Global, 10+ năm kinh nghiệm POD.

- Trang tĩnh: `index.html`, `css/`, `js/`, `assets/`
- `server.js`: server Node không phụ thuộc thư viện, chạy trên `$PORT` (dùng cho Railway)

## Chạy thử local

```bash
npm start   # http://localhost:3000
```

## Deploy lên Railway

1. Vào https://railway.app → **New Project** → **Deploy from GitHub repo** → chọn repo này và branch cần deploy.
2. Railway tự nhận diện Node.js và chạy `npm start`. Không cần biến môi trường.
3. Vào service → **Settings → Networking** → **Generate Domain** để có link `*.up.railway.app` chạy thử.
4. Cũng trong **Networking** → **Custom Domain** → thêm `vikcom.vn` và `www.vikcom.vn`. Railway sẽ hiển thị bản ghi DNS (CNAME + TXT xác minh) cần tạo.

## Trỏ domain tại Mắt Bão (manage.matbao.net)

Vào **Tên miền → vikcom.vn → Quản lý DNS** và thêm đúng các bản ghi Railway hiển thị, thường là:

| Loại  | Host                 | Giá trị                          |
|-------|----------------------|----------------------------------|
| CNAME | `www`                | `xxxx.up.railway.app` (Railway cấp) |
| CNAME | `@`                  | `xxxx.up.railway.app` (Railway cấp) |
| TXT   | `_railway-verify...` | (chuỗi xác minh Railway cấp)     |

> Nếu DNS Mắt Bão không cho đặt CNAME ở `@` (domain gốc), hãy chuyển nameserver sang Cloudflare (miễn phí, hỗ trợ CNAME flattening) rồi tạo bản ghi ở đó, hoặc dùng tính năng chuyển hướng (URL forwarding) `vikcom.vn` → `https://www.vikcom.vn`.
> Xoá các bản ghi A/CNAME cũ trùng host trước khi thêm. DNS có thể mất từ vài phút đến vài giờ để cập nhật; Railway tự cấp SSL khi xác minh xong.

## Cần cập nhật trước khi chạy chính thức

Tìm và thay các thông tin tạm trong `index.html`:
- Địa chỉ văn phòng: `[Cập nhật địa chỉ văn phòng]`
- Hotline: `+84 (0) xxx xxx xxx` và `tel:+84000000000`
- Email liên hệ (mặc định `contact@vikcom.vn`, cũng có trong `js/main.js`)
- Các con số thống kê (100+ đối tác, 8+ nền tảng) nếu cần chính xác hơn
