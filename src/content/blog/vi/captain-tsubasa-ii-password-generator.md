---
title: "Captain Tsubasa II Password Generator: Tuổi thơ được làm lại bằng AI"
description: Công cụ tạo password chạy ngay trên trình duyệt cho game NES/Famicom Captain Tsubasa Vol. II - Super Striker, được xây dựng lại với sự hỗ trợ của AI từ một thuật toán có sẵn.
publishDate: 2026-10-11T09:00:00+07:00
tags: [captain-tsubasa, retro-games, ai]
ogImage: /images/captain-tsubasa.jpg
---

<img src="/images/captain-tsubasa.jpg" alt="Màn hình tiêu đề và các cảnh trong game Captain Tsubasa Vol. II - Super Striker" class="zoomable" />

Nếu lớn lên vào những năm 90, rất có thể **Captain Tsubasa Vol. II: Super Striker** (キャプテン翼II スーパーストライカー) đã là một phần tuổi thơ của bạn. Game ra mắt trên Famicom/NES do Tecmo phát hành năm 1990, dựa trên bộ manga nổi tiếng của Yoichi Takahashi. Nó biến bóng đá thành một trò chơi căng thẳng theo từng lệnh: chọn một chiêu, tiêu hao guts, rồi hy vọng người hùng của bạn tung được Drive Shot hay Cyclone trước khi thủ môn kịp cản phá.

Với thế hệ millennial, đó không chỉ là một trò chơi. Đó là băng game cắm vào chiếc máy mượn của bạn, là câu chuyện bằng tiếng Nhật mà ta không đọc được, và là người bạn ngồi bên cạnh cùng mày mò từng nút bấm một.

## Màn hình password

Game không có pin lưu. Muốn chơi tiếp lần sau, bạn phải ghi lại một **password gồm 18 ký tự** là các chữ kana của Nhật rồi nhập vào màn hình nhập mã. Password đó lưu lại mọi thứ: vòng đấu bạn đã đến, level và kinh nghiệm của các cầu thủ, các cú sút đặc biệt, và cả guts của Misugi.

Ngày ấy, password hoặc là chép từ tạp chí, hoặc là mất luôn. Ngày nay ta có thể tự tạo password cho riêng mình.

## Công cụ

Tôi làm một công cụ tạo password để bạn có thể bắt đầu từ **bất kỳ vòng đấu nào**, với **level cầu thủ tùy ý**:

[**Mở Captain Tsubasa II Password Generator**](/toys/captain-tsubasa-ii-super-striker.html)

<img src="/images/captain-tsubasa-password-generator.png" alt="Captain Tsubasa II password generator" class="size-75 zoomable" />

Bạn có thể làm gì với nó:

- **Chọn vòng đấu.** Cả 33 vòng đấu chính thức đều được liệt kê cùng đối thủ, từ Fluminense ở vòng mở màn đến Brazil ở vòng chung kết World Cup.
- **Tinh chỉnh từng nhóm cầu thủ.** Đặt Level và Exp cho từng nhóm trong mười nhóm. Các cầu thủ hiển thị thay đổi theo vòng đấu hiện tại: São Paulo, Nankatsu hoặc Nhật Bản.
- **Mở khóa khả năng.** Bật hoặc tắt Cyclone Shot, Drive Overhead Shot, và việc guts của Misugi có thấp hơn 100 hay không.
- **Thử vận may.** *Random match* tạo ngẫu nhiên toàn bộ thiết lập, với level cầu thủ phù hợp với vòng đấu đã chọn. Hai lựa chọn khác mở rộng phạm vi: không cân bằng, mỗi nhóm có một level ngẫu nhiên riêng nằm giữa mức khó và mức dễ của vòng đấu, cộng thêm 3 level ở mỗi đầu; hoặc ngẫu nhiên hoàn toàn, mỗi level được chọn ở bất kỳ đâu từ mức hợp lý thấp nhất đến cao nhất của vòng đấu.
- **Theo dõi ngay trong game.** Password cập nhật khi bạn gõ, còn *Game input screen* tô sáng đúng phím cần bấm tiếp theo. Dùng `<` và `>` để lần lượt đi qua cả 18 ký tự.
- **Đổi ngôn ngữ.** Màn hình nhập mã có thể hiển thị theo kana tiếng Nhật hoặc theo bộ ký tự của bản tiếng Anh.

Mọi thứ chạy ngay trong trình duyệt của bạn, không cần cài đặt gì và không gửi dữ liệu đi đâu cả.

## Làm lại với AI

Tôi không phải người nghĩ ra thuật toán. Nó đến từ [password generator của cah4e3](https://cah4e3.shedevr.org.ru/cheatsbase_passg.php#249), còn chi tiết thuật toán được ghi công cho Gennadiy_Master. Công cụ đó đã phục vụ cộng đồng rất tốt, nhưng giao diện của nó đã lỗi thời.

Với sự hỗ trợ của AI, tôi xây dựng lại chính thuật toán đó bằng HTML, CSS và JavaScript thuần, với giao diện gọn gàng và hiện đại hơn: nút tăng giảm và thanh trượt thay cho các ô nhập thô, bàn phím nhập được tô sáng, tooltip giải thích từng tùy chọn, và bố cục dùng tốt trên điện thoại.

Bên trong, password đóng gói level, kinh nghiệm, vòng đấu, các cờ và một seed 6 bit thành 18 giá trị 6 bit. Sau đó nó cộng thêm checksum, xáo trộn các giá trị bằng một bảng thay thế, rồi dịch từng giá trị theo một độ lệch tăng dần. Seed không ảnh hưởng gì trong game, nhưng đổi seed sẽ cho bạn một password khác mà vẫn hợp lệ với cùng một thiết lập.

Giờ thì hãy lấy emulator của bạn (hoặc chiếc máy Famiclone cũ ấy), chọn vòng đấu, và ghi vài bàn cho đỡ nhớ.

> **Lưu ý:** Bạn có thể chơi game này trực tuyến tại <https://www.retrogames.cc/nes-games/c/index.html>.
