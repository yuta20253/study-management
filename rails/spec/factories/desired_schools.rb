FactoryBot.define do
  factory :desired_school do
    university { "東京" }
    faculty { "法" }
    department { "法律" }
    deviation_value { 70.0 }
    location { "東京都文京区本郷7－3－1" }
    region { "関東・甲信越" }
    undergraduate_system { "法・政治" }
    department_system { "法" }
    code { 10002 }
    faculty_of_code { 10056 }
    explanation {
      "司法・行政・立法という、人々に直接関わる重大な現象を多種多様な角度から学ぶ。法学総合・法律プロフェッション・政治の3類が置かれ、希望に応じていずれかに所属する。演習は、少人数で特定の課題などを報告、討論する形になっている。法律家を養成するというだけではなく、進路は多岐に広がっている。"
    }
    capacity { "100" }
    division { "国立" }
  end
end
