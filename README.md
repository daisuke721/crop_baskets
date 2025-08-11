# Crop Baskets
![コンセプト](/documents/コンセプト.png)

「Crop Baskets」は生産者が育てた農作物を自由な価格で出品・販売でき、受け取りポイントを設定することで、消費者へ直接の受け渡しや無人販売が可能になります。

---

### 🌐プロダクトURL
https://www.cropbaskets.jp/

**テストユーザー**
- メールアドレス:test@example.com
- パスワード:password

---

### 🌱サービスへの想い
農業生産法人で勤務していた際、生産者が丹精込めて育てた農作物が「品質が悪い」という理由だけで廃棄される場面を目の当たりにしました。
しかし、その「品質が悪い」という基準は市場や外見の評価に過ぎず、実際には味や安全性に問題のない作物も多く存在します。

「この作物を必要としてくれる消費者は必ずいるはず」

「生産者が直接販売できる場があれば、適正な価格で届けられるのではないか」

そう考え、品質や規格にとらわれず、生産者と消費者を直接つなぐプラットフォーム の必要性を強く感じました。
さらに、消費者が直接受け取りに行くことで、地元特産物の消費促進や、生産者とのつながりが生まれ、地域全体への貢献にもつながると考えました。

この課題を解決したいという思いから、「Crop Baskets」を開発しました。

---
### 🚀機能一覧
- 生産者のログイン、ログアウト機能
- 商品作物の出品、編集、削除機能
- AIによる画像解析、出品フォームへの自動入力
- 受け取りポイントの登録、削除機能
- カート内に登録、削除機能

---

### ⚙️使用技術
**Frontend**
- Next.js 15.1.6
- React 19
  - ESLint
  - Prettier
  - Axios
- TailWind CSS

**Backend**
- Ruby 3.2.2
- Ruby on Rails 7.2.2
  - RuboCop
  - RSpec
  - Devise JWT
  - Active Storage
  - Serializer

**インフラ**
- MySQL 8.0.30
- Nginx
- Puma
- Docker/Docker Compose
- AWS
  - VPC/EC2/RDS/Route53/ALB/S3/ACM

**API**
- OpenAI API
- Google Maps API

**CI/CD**
- Vercel
- GitHub Actions

---

### 📝ER図
![ER図](/documents/ER図.png)

---

### 🔧インフラ構成図
![インフラ構成図](/documents/インフラ図.png)
