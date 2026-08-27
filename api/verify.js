// Vercel Serverless Function kiểm tra mật khẩu an toàn từ phía Server
// Mật khẩu có thể cài đặt qua Vercel Environment Variable "BIRTHDAY_PASSWORD"
// Mặc định là: 3008 (bạn có thể đổi trực tiếp dòng dưới hoặc tạo biến môi trường trên Vercel)

const DEFAULT_PASSWORD = process.env.BIRTHDAY_PASSWORD || "3008";

module.exports = async (req, res) => {
  // Đặt header CORS để gọi API nếu cần
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { password } = body || {};

    if (!password) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập mật khẩu" });
    }

    // So sánh mật khẩu nhập vào với mật khẩu hệ thống
    if (password === DEFAULT_PASSWORD) {
      return res.status(200).json({ 
        success: true, 
        message: "Đăng nhập thành công!",
        token: "session_" + Math.random().toString(36).substring(2)
      });
    } else {
      return res.status(401).json({ success: false, message: "Mật khẩu không đúng" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi xử lý server" });
  }
};
