# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.create!(family_name: "長澤", given_name: "まさみ", family_name_kana: "ナガサワ", given_name_kana: "マサミ", gender: 1, email: "test1@example.com",
                     password: "password", birthday: Date.new(2006, 6, 3), confirmed_at: Time.current)

User.create!(family_name: "山本", given_name: "耕史", family_name_kana: "ヤマモト", given_name_kana: "コウジ", gender: 0, email: "test2@example.com",
             password: "password", birthday: Date.new(2006, 10, 31), confirmed_at: Time.current)

User.create!(family_name: "柴咲", given_name: "コウ", family_name_kana: "シバサキ", given_name_kana: "コウ", gender: 1, email: "test3@example.com",
             password: "password", birthday: Date.new(2006, 6, 3), confirmed_at: Time.current)

User.create!(family_name: "香取", given_name: "慎吾", family_name_kana: "カトリ", given_name_kana: "シンゴ", gender: 0, email: "test4@example.com",
             password: "password", birthday: Date.new(2006, 10, 31), confirmed_at: Time.current)

User.create!(family_name: "久保", given_name: "建英", family_name_kana: "クボ", given_name_kana: "タケフサ", gender: 0, email: "test5@example.com",
             password: "password", birthday: Date.new(2006, 6, 3), confirmed_at: Time.current)

User.create!(family_name: "内野", given_name: "聖陽", family_name_kana: "ウチノ", given_name_kana: "セイヨウ", gender: 0, email: "test6@example.com",
             password: "password", birthday: Date.new(2006, 10, 31), confirmed_at: Time.current)

User.create!(family_name: "沢尻", given_name: "エリカ", family_name_kana: "サワジリ", given_name_kana: "エリカ", gender: 1, email: "test7@example.com",
             password: "password", birthday: Date.new(2006, 6, 3), confirmed_at: Time.current)

User.create!(family_name: "佐藤", given_name: "健", family_name_kana: "サトウ", given_name_kana: "タケル", gender: 0, email: "test8@example.com",
             password: "password", birthday: Date.new(2006, 10, 31), confirmed_at: Time.current)

User.create!(family_name: "新垣", given_name: "結衣", family_name_kana: "アラガキ", given_name_kana: "ユイ", gender: 1, email: "test9@example.com",
             password: "password", birthday: Date.new(2006, 6, 3), confirmed_at: Time.current)

User.create!(family_name: "丹沢", given_name: "敦", family_name_kana: "タンザワ", given_name_kana: "アツシ", gender: 0, email: "test10@example.com",
             password: "password", birthday: Date.new(2006, 10, 31), confirmed_at: Time.current)

Address.create!(postal_code: "438-8650", prefecture: Address::PREFECTURE_NAMES[21], city: "磐田市", address1: "富士見町4丁目9-5", user_id: 1)
Address.create!(postal_code: "112-2359", prefecture: Address::PREFECTURE_NAMES[15], city: "富山市", address1: "富山町4丁目9-5", user_id: 2)
Address.create!(postal_code: "238-1413", prefecture: Address::PREFECTURE_NAMES[12], city: "新宿区", address1: "歌舞伎町4丁目9-5", user_id: 3)
Address.create!(postal_code: "198-2250", prefecture: Address::PREFECTURE_NAMES[11], city: "西千葉市", address1: "流山町4丁目9-5", user_id: 4)
Address.create!(postal_code: "122-5421", prefecture: Address::PREFECTURE_NAMES[1], city: "札幌市", address1: "北区4丁目9-5", user_id: 5)
Address.create!(postal_code: "423-8650", prefecture: Address::PREFECTURE_NAMES[9], city: "前橋市", address1: "前橋町4丁目9-5", user_id: 6)
Address.create!(postal_code: "881-8110", prefecture: Address::PREFECTURE_NAMES[22], city: "磐田市", address1: "富士見町4丁目9-5", user_id: 7)
Address.create!(postal_code: "987-1230", prefecture: Address::PREFECTURE_NAMES[11], city: "西千葉市", address1: "流山町4丁目9-5", user_id: 8)
Address.create!(postal_code: "111-1150", prefecture: Address::PREFECTURE_NAMES[30], city: "鳥取市", address1: "鳥取町4丁目9-5", user_id: 9)
Address.create!(postal_code: "338-8950", prefecture: Address::PREFECTURE_NAMES[13], city: "横浜市", address1: "中央4丁目9-5", user_id: 10)

Telephone.create!(phone_number: "090-1224-2678", user_id: 1)
Telephone.create!(phone_number: "090-2214-1676", user_id: 2)
Telephone.create!(phone_number: "090-3294-6673", user_id: 3)
Telephone.create!(phone_number: "090-4284-7676", user_id: 4)
Telephone.create!(phone_number: "090-5264-9678", user_id: 5)
Telephone.create!(phone_number: "090-6254-0675", user_id: 6)
Telephone.create!(phone_number: "090-7214-3678", user_id: 7)
Telephone.create!(phone_number: "090-8224-4674", user_id: 8)
Telephone.create!(phone_number: "090-9234-6678", user_id: 9)
Telephone.create!(phone_number: "090-1334-5671", user_id: 10)

subjects = ["英語", "現代文", "古文", "漢文", "数学", "日本史", "世界史", "政治経済", "地理", "物理", "化学", "生物", "地学"]

100.times do |i|
  rand_hours = rand(50)
  subject_num = rand(13)
  Todo.create!(subject: subjects[subject_num], title: "テストタイトル1-#{i}", description: "テスト説明1-#{i}", progress: :incomplete, study_type: :preparation, scheduled_study_time: rand_hours, total_hour: 0, due_date: Date.new(2025, 10, 31),
               importance: :medium, star_rating: 5, user: user1)
  Todo.create!(subject: subjects[subject_num], title: "テストタイトル2-#{i}", description: "テスト説明2-#{i}", progress: :incomplete, study_type: :lesson, scheduled_study_time: rand_hours, total_hour: 0, due_date: Date.new(2025, 11, 30),
               importance: :low, star_rating: 1, user: user1)
  Todo.create!(subject: subjects[subject_num], title: "テストタイトル3-#{i}", description: "テスト説明3-#{i}", progress: :incomplete, study_type: :review, scheduled_study_time: rand_hours, total_hour: 0, due_date: Date.new(2025, 12, 31),
               importance: :high, star_rating: 3, user: user1)
end

order_school1 = DesiredSchool.create!(division: "国立", faculty_of_code: 10055, code: 10002, region: "関東", undergraduate_system: "法・政治", department_system: "法", university: "東京", faculty: "法", department: "法学総合", deviation_value: 70.0, capacity: "100",
                                      location: "東京都文京区本郷7－3－1", explanation: "司法・行政・立法という、人々に直接関わる重大な現象を多種多様な角度から学ぶ。法学総合・法律プロフェッション・政治の3類が置かれ、希望に応じていずれかに所属する。演習は、少人数で特定の課題などを報告、討論する形になっている。法律家を養成するというだけではなく、進路は多岐に広がっている。")
order_school2 = DesiredSchool.create!(division: "国立", faculty_of_code: 10058, code: 10002, region: "関東", undergraduate_system: "医・歯・薬・保健", department_system: "医", university: "東京", faculty: "医", department: "医", deviation_value: 70.0, capacity: "110",
                                      location: "東京都文京区本郷7－3－1", explanation: "医師・医学研究者の養成を目的に、特に医師のなかでも研究医の養成を大きな目標とする。基礎医学、社会医学、臨床医学の各分野で新しい発見をし、世界に情報発信できる人材をめざす。")
order_school3 = DesiredSchool.create!(division: "国立", faculty_of_code: 10060, code: 10002, region: "関東", undergraduate_system: "工", department_system: "デザイン工・他", university: "東京", faculty: "工", department: "社会基盤", deviation_value: 70.0, capacity: "40",
                                      location: "東京都文京区本郷7－3－1", explanation: "16学科を設置し、多様な創造性の育成を重視した教育と研究を行う。専門性を深化させる講義だけでなく、自ら取り組む設計演習や課題解決型プロジェクト演習、インターンシップ、卒業研究などで創造性を養えるようにサポート。世界を舞台に活躍できる人材をめざし、講義・演習、最先端の研究、多数の派遣・受入プログラムを用意している。")

order_school4 = DesiredSchool.create!(division: "国立", faculty_of_code: 10076, code: 10002, region: "関東", undergraduate_system: "文・人文", department_system: "文化・教養", university: "東京", faculty: "文", department: "人文", deviation_value: 70.0, capacity: "350",
                                      location: "東京都文京区本郷7－3－1", explanation: "27ある専修課程のいずれかに所属し、「人間とは何か」について考察する。3、4年次を対象として外国語教育に重点を置き、英独仏露のほか、イタリア語、ポルトガル語、ペルシャ語、ラテン語などが学べる。また、オリジナルの言語で書かれたテキストを読む力を養うために「原典」を読む授業や、「古典」を読む授業を多く開講している。")
order_school5 = DesiredSchool.create!(division: "国立", faculty_of_code: 10077, code: 10002, region: "関東", undergraduate_system: "理", department_system: "数学・数理情報", university: "東京", faculty: "理", department: "数学", deviation_value: 70.0, capacity: "44",
                                      location: "東京都文京区本郷7－3－1", explanation: "数学、物理、化学、生物などの伝統的な理学分野から、地球惑星環境学、生物情報科学などの学際領域までをカバーする10学科で研究を行う。自然との対話を通して、自然界に働く原理や法則を探究する。現在、学部卒業生の9割以上が大学院へ進学している。実際の研究を通じて、より高度な専門知識を身につけ、大学などの研究者をはじめ社会の様々な分野での活躍をめざす。")
user1.desired_schools << order_school1
user1.desired_schools << order_school2
user1.desired_schools << order_school3
user1.desired_schools << order_school4
user1.desired_schools << order_school5
