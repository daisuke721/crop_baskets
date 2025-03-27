variable "aws_region" {
  description = "デプロイ先のAWSリージョン"
  type        = string
  default     = "ap-northeast-1"
}

variable "aws_profile" {
  description = "AWS CLIのプロファイル名"
  type        = string
}

variable "vpc_cidr" {
  type        = string
  description = "VPCのCIDRブロック"
}
