# スレッド数(最小・最大の指定)
max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

# Dockerコンテナ内のPumaがlistenするポート番号
port ENV.fetch("RAILS_PORT") { 3000 }

# 実行環境
environment ENV.fetch("RAILS_ENV") { "production" }

# PIDファイル(プロセスIDを格納、再起動時の重複防止)
pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }

# ワーカー数(プロセス数)、EC2のCPUコア数に合わせて調整
workers ENV.fetch("WEB_CONCURRENCY") { 2 }

# ワーカー間でアプリをプリロードして、メモリ効率向上
preload_app!

plugin :tmp_restart
