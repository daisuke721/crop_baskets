# VPCのモジュール
module "vpc" {
  source = "./modules/vpc"

  name     = "crop-baskets"
  vpc_cidr = var.vpc_cidr
}
