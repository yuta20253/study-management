# study-management

**使用技術:**

・Ruby 3.1.2

・Ruby on Rails 7.0.8.4

・MySQL 8.0.32

・Puma

・Docker/Docker Compose

・CircleCI/ CI/CD

・RSpec

・RuboCop

・Next.js 14.2.14 (Page Router)

・Jest

・ESlint


**機能一覧:**

・ユーザー登録、ログイン機能(devise)

・個人情報表示・更新機能

・Todo機能(kaminari)

  ⚪︎Todo作成機能
  
  ⚪︎Todo更新機能
  
  →StudyHourモデルが作成される
    
  ⚪︎Todo削除機能
  
  ⚪︎詳細表示機能
  
・学習時間管理機能

  ⚪︎計５種類のグラフを選択して表示できる機能(Todoの進捗が未完了以外の場合) 
  
  　⚪︎学習タイプ別グラフ（予習・授業・復習）
   
  　⚪︎学習時間比較グラフ(自分と他のユーザーの予習・授業・復習毎平均の実学習時間を比較)
   
　  ⚪︎科目別学習時間推移グラフ
   
  　⚪︎科目変更ボタン、表示期間変更ボタン(表示期間は「日別」か「週別」、「月別」に一度変更する必要あり) 、学習タイプ変更ボタンを押すと該当する学習内容のListが表示される

・大学一覧

  ⚪︎大学詳細表示機能
  
  ⚪︎検索機能(各種検索・都道府県検索)
  
  ⚪︎新規追加・登録解除機能
  
・フォロー機能

  ⚪︎他のユーザーをフォローする機能
  
  ⚪︎他のユーザーをフォロー解除する機能
  
  ⚪︎他のユーザーの学習状況を詳細表示する機能
  
・チャット機能

  ⚪︎ルーム作成機能
    
  ⚪︎メッセージ送信機能

**テスト:**

⚪︎単体テスト(model,form,service)

⚪︎機能テスト(request)

**Er図:**

⚪︎論理モデル
![logic](https://github.com/yuta20253/study-management/blob/main/logic.png?raw=true)


⚪︎物理モデル
![physics](https://github.com/yuta20253/study-management/blob/main/physics.png?raw=true)
