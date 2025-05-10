class Api::V1::SimpleListingsController < ApplicationController
  # ActiveStorageでアップロードしたファイルのURLを取得
  include Rails.application.routes.url_helpers

  def create
    # リクエストに画像が含まれていない場合はエラーを返す
    if params[:image].blank?
      return render json: { error: '画像がありません' }, status: :bad_request
    end

    # 画像が存在する場合、ActiveStorageで一時的に画像保存(S3)
    # create_and_upload!メソッドで一度にblob作成とアップロードを行う
    blob = ActiveStorage::Blob.create_and_upload!(
      # 画像ファイルの中身
      io: params[:image].tempfile,
      # 元のファイル名
      filename: params[:image].original_filename,
      # コンテンツタイプ
      content_type: params[:image].content_type
    )

    # 保存した画像の公開URL(署名付き)を取得(production環境ではS3URLになる)
    # rails_blob_url: ActiveStorageのblobから署名付きURLを生成し、only_path: false にてフルパスURLで取得
    image_url = blob.send(:service).url(
      blob.key,
      filename: blob.filename,
      content_type: blob.content_type,
      expires_in: 1.hour,
      disposition: 'inline'
    )

    # 確認用のログ
    Rails.logger.info "S3 image_url: #{image_url}"

    # ChatGPTに画像を送り、作物情報を抽出
    service = ChatGptService.new
    crop_info = service.analyze_crop_image(image_url)

    render json: crop_info, status: :ok

  # 例外処理、何らかのエラーが起きた場合はここでキャッチ
  rescue => e
    Rails.logger.error(e.message)
    render json: { error: '解析中にエラーが発生しました' }, status: :internal_server_error
  end
end
