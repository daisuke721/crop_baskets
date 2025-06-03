require 'rails_helper'

RSpec.describe Crop, type: :model do
  let(:crop) { build(:crop) }

  describe 'Cropモデルのバリデーションテスト' do
    it 'Cropが作成できること' do
      expect(crop).to be_valid
    end
  end
end
