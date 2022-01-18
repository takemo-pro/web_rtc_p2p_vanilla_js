# php8_base

### 起動

``` docker-compose up -d --build ```

### コンテナの操作

- phpコンテナに入る -> ``` docker-compose exec app bash ```
- dbコンテナに入る -> ``` docker-compose exec db bash ```

### デフォルト使用ポート

- php -> 非公開
- web -> localhost:9000
- db -> localhost:9001

### DBデフォルト設定

- user: phper
- password: secret
- root_password: secret
- db_name: laravel_local

### 設定ファイル

infra以下ディレクトリに 
php.ini, mysql.conf,default.conf
が配置してあるので必要に応じてそちらを編集してコンテナを再起動

### その他

- npmはphpコンテナに入れてあるがめちゃくちゃ重いので特にパッケージの更新等はローカルで動かすのがおすすめ
