# ChatGptServiceクラスを作成し、OpenAI APIを使って、画像から作物情報を抽出
class ChatGptService
  # DBから作物名を動的に取得して文字列にする
  def allowed_crops
    @allowed_crops ||= Crop.distinct.pluck(:name).join(" / ")
  end

  # OpenAIクライアントを初期化する、initializeメソッドを作成
  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  end

  # image_url: 解析する画像のURL
  def analyze_crop_image(image_url)
    # プロンプトを作成
    prompt = <<~PROMPT
      ## 出品ガイドライン
      - 商品名は消費者が思わず買いたくなる 15〜50文字程度でのキャッチーな商品名を考えてください(例：『期間限定‼️』6ヶ月熟成、紅はるか🍠 しっとりとした食感と絶妙な甘さがたまりません！この機会にぜひ‼️)
      - 作物名は必ず次のリストの中から1つだけ選んでください
        #{allowed_crops}
      - 品種名は画像から考えられる候補を **2〜5件**、**半角カンマ(, )区切り** で必ず列挙してください
      - 空欄は禁止。画像から特定困難でも、該当作物で一般的な主要品種から**推測候補**を最低2件必ず提示してください
      - 作物と無関係な品種名は出さないでください
      - 産地は作物名に紐づく産地のうち一つ採用してください
      - 収穫日はファイル作成日を採用してください。不明な場合は「#{Time.zone.today.strftime('%Y-%m-%d')}」を出力してください
      - 価格は日本国内の直近の相場を参考に1kg単価形式で推定してください
      - 容量は初期値として1としてください(数字のみ)
      - 受け取り所は登録してある先頭のデータを使用してください
      - 商品説明は80〜150文字程度で、その作物の特徴・鮮度・おすすめの食べ方、こだわりや生産方法などPRを考えて提案してください（絵文字も活用し、段落を分けて見やすく）

      ## 画像からの品質判定ルール
      - 打撲・変色・黒斑・傷・裂け・腐れ、著しい形の乱れ、カビ、汁漏れ等が明瞭に見られる → **B品（訳あり）**
      - 上記が見られなければ **A品**
      - B品のときは、商品名に「【訳ありB品】」等を含め、説明の前半で前向きに“家庭用に最適/加工用におすすめ”等も明記し、難点を1〜2点だけ簡潔に記載

      ## 出力フォーマット（厳守：以下の行だけをこの順で出力）
      商品名: <商品名> # B品は「【訳ありB品】」等を含める
      作物名: <作物名>
      品種名: <品種候補をカンマ区切りで列挙(無ければ不明)>
      産地: <産地(作物に紐づく産地を参照)>
      収穫日: <YYYY-MM-DD>
      容量: <容量の初期値は1とする>
      価格: <1kgあたりの推定価格>
      等級: <A または B>
      状態: <B品のときの難点メモ。A品は秀品とする>
      受け取り所: <生産者が登録した先頭のデータを使用>
      商品説明: <80〜150文字の説明（B品は訳ありの前向き説明を含める）>
    PROMPT

    response = @client.chat(
      parameters: {
        model: "gpt-4o",
        messages: [
          {
            # ユーザーからのメッセージとしてAPIに送信
            role: "user",
            content: [
              {
                # テキスト形式のプロンプト
                type: "text",
                text: prompt
              },
              {
                # 画像URLを指定
                type: "image_url",
                image_url: { url: image_url }
              }
            ]
          }
        ],
        # 返答の最大トークン数(回答が長すぎないように上限を設定)
        max_tokens: 1000
      }
    )

    # APIのレスポンスから解答の本文を取り出す
    # choices[0].message.contentに回答が入っている
    content = response.dig("choices", 0, "message", "content")
    return { error: "no_response" } if content.blank?

    # レスポンスから作物名と品種名を正規表現で抽出
    {
      product_name: content[/商品名[:：]?\s*(.+)/, 1],
      name: content[/作物名[:：]?\s*(.+)/, 1],
      variety: content[/品種名[:：]?\s*(.+)/, 1],
      producing_area: content[/産地[:：]?\s*(.+)/, 1],
      harvest_day: content[/収穫日[:：]?\s*(.+)/, 1],
      capacity: content[/容量[:：]?\s*(.+)/, 1],
      price: content[/価格[:：]?\s*(.+)/, 1],
      grade: content[/等級[:：]?\s*([AB])/, 1],
      condition: content[/状態[:：]?\s*(.+)/, 1],
      receiving_point_name: content[/受け取り所[:：]?\s*(.+)/, 1],
      description: content[/商品説明[:：]?\s*(.+)/, 1],
      raw: content
    }
  end
end
