const questionnaireDummyData = [
    {
        "question": "Q1. 協会けんぽがご家族向けに健診を実施していることを知っていましたか？",
        "items": [
            { "text": "知っていた", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "知らなかった", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] }
        ]
    },
    {
        "question": "Q2. 今回、予約した理由",
        "items": [
            { "text": "場所が便利", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "予約手続きが届いたから", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] },
            { "text": "健診を受けようと思っていたから", "id": "", "name": "item", "type": "checkbox", "value": "3", "readonly": false, "checked": false, "p": [] },
            { "text": "無料で受診できるから", "id": "", "name": "item", "type": "checkbox", "value": "4", "readonly": false, "checked": false, "p": [] },
            { "text": "ヘルスチェック（ストレスチェックなど）を受けたかったから", "id": "5", "name": "item", "type": "checkbox", "value": "", "readonly": false, "checked": false, "p": [] }
        ]
    },
    {
        "question": "Q3. お送りしたお手紙は、わかりやすかったですか？",
        "items": [
            { "text": "わかりやすかった", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "どちらでもない", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] },
            { "text": "わかりづらかった", "id": "", "name": "item", "type": "checkbox", "value": "3", "readonly": false, "checked": false, "p": [] }
        ],
        "reason": "「わかりづらかった」を選択された方はその理由を教えてください。【任意】"
    },
    {
        "question": "Q4. インターネットの予約ページはわかりやすかったですか？",
        "items": [
            { "text": "わかりやすかった", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "どちらでもない", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] },
            { "text": "わかりづらかった", "id": "", "name": "item", "type": "checkbox", "value": "3", "readonly": false, "checked": false, "p": [] }
        ],
        "reason": "「わかりづらかった」を選択された方はその理由を教えてください。【任意】"
    },
    {
        "question": "Q5. 来年、ヘルスチェックの見直しを行いますが受けてみたいものはありますか？",
        "items": [
            { "text": "骨健度測定", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "血管年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] },
            { "text": "ストレスチェック", "id": "", "name": "item", "type": "checkbox", "value": "3", "readonly": false, "checked": false, "p": [] },
            { "text": "肌年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "4", "readonly": false, "checked": false, "p": [] },
            { "text": "自律神経測定", "id": "", "name": "item", "type": "checkbox", "value": "5", "readonly": false, "checked": false, "p": [] },
            { "text": "脳年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "6", "readonly": false, "checked": false, "p": [] },
            { "text": "身体の加齢度測定", "id": "", "name": "item", "type": "checkbox", "value": "7", "readonly": false, "checked": false, "p": [] },
            { "text": "姿勢分析・歩行姿勢測定", "id": "", "name": "item", "type": "checkbox", "value": "8", "readonly": false, "checked": false, "p": [] },
            { "text": "健康相談", "id": "", "name": "item", "type": "checkbox", "value": "9", "readonly": false, "checked": false, "p": [] },
            { "text": "その他【任意】", "id": "", "name": "item", "type": "checkbox", "value": "10", "readonly": false, "checked": false, "p": [] }
        ]
    },
    {
        "question": "Q5. 来年、ヘルスチェックの見直しを行いますが受けてみたいものはありますか？",
        "items": [
            { "text": "骨健度測定", "id": "", "name": "item", "type": "checkbox", "value": "1", "readonly": false, "checked": false, "p": [] },
            { "text": "血管年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "2", "readonly": false, "checked": false, "p": [] },
            { "text": "ストレスチェック", "id": "", "name": "item", "type": "checkbox", "value": "3", "readonly": false, "checked": false, "p": [] },
            { "text": "肌年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "4", "readonly": false, "checked": false, "p": [] },
            { "text": "自律神経測定", "id": "", "name": "item", "type": "checkbox", "value": "5", "readonly": false, "checked": false, "p": [] },
            { "text": "脳年齢測定", "id": "", "name": "item", "type": "checkbox", "value": "6", "readonly": false, "checked": false, "p": [] },
            { "text": "身体の加齢度測定", "id": "", "name": "item", "type": "checkbox", "value": "7", "readonly": false, "checked": false, "p": [] },
            { "text": "姿勢分析・歩行姿勢測定", "id": "", "name": "item", "type": "checkbox", "value": "8", "readonly": false, "checked": false, "p": [] },
            { "text": "健康相談", "id": "", "name": "item", "type": "checkbox", "value": "9", "readonly": false, "checked": false, "p": [] },
            { "text": "その他【任意】", "id": "", "name": "item", "type": "checkbox", "value": "10", "readonly": false, "checked": false, "p": [] }
        ],
        "reason": "最後にご意見・ご要望などがございましたらご自由にご入力ください。【任意】"
    }
];

export default questionnaireDummyData;
