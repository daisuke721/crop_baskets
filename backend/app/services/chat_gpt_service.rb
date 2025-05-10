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
      - 品種名は画像では認識しづらいと思うので、分からなければ空欄でOKです。分かる場合のみ記載してください
      - 価格は日本国内の直近の相場を参考に1kg単価形式で推定してください
      - 商品説明は80〜150文字程度で、その作物の特徴・鮮度・おすすめの食べ方、こだわりや生産方法などPRを考えて提案してください(文だけではなく絵文字も活用し、段落を分け見やすいように、また見る人が購入したいと思えるようにプレゼンしてください)

      ## 出力フォーマット(厳守)
      商品名: <商品名>
      作物名: <作物名>
      価格: <価格>
      商品説明: <説明>
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
      price: content[/価格[:：]?\s*(.+)/, 1],
      description: content[/商品説明[:：]?\s*(.+)/, 1],
      raw: content
    }
  end
end
