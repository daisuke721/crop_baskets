variable "name" {
  description = "リソース名のプレフィックス"
  type        = string
}

variable "vpc_cidr" {
  description = "VPCに割り当てるCIDRブロック"
  type        = string
}
