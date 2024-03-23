import { defaultMessages } from "./default";

const commonErrorJa = defaultMessages.ja;

export const ja = {
    320: "イプシロンのシステムからカード会社への通信ができない状況です。",
    330: "イプシロンのシステムからWebMoneyの決済サーバへの通信ができない状態です",
    331: "WebMoneyの決済サーバーから送られる決済結果通知をイプシロンのシステムが正常に受け取れませんでした。",
    501: "データベースの更新に失敗しました。",
    502: commonErrorJa,
    503: commonErrorJa,
    585: "大変込み合っております。しばらく時間をあけて再度お試しください。",
    601: commonErrorJa,
    602: commonErrorJa,
    603: commonErrorJa,
    604: "指定されたオーダー番号が既に登録されています。",
    606: "指定されたユーザーIDが登録されていません。",
    607: commonErrorJa,
    702: "セキュリティコード未設定",
    830: "実売上処理可能な期限を過ぎています。",
    904: "すでにお支払い済みもしくは、このURLが無効になっています。",
    908: commonErrorJa,
    909: commonErrorJa,
    910: commonErrorJa,
    911: "登録しようとしているユーザーIDは既に登録済みです。",
    971: "ネットワークの接続エラーが発生しました。再度操作の実施をお願いいたします。",
    C01: "イプシロンのシステムからカード会社への通信ができない状況です。",
    "C** 注1": "通信エラーが発生しました。再度操作の実施をお願いいたします。",
    "G ** 注1": "カード会社よりカード決済の承認が拒否された状況です。",
    "K ** 注1": "入力されたカード情報に異常があります。",
    502: commonErrorJa,
    602: commonErrorJa,
    608: commonErrorJa,
    609: commonErrorJa,
    610: commonErrorJa,
    611: commonErrorJa,
    612: commonErrorJa,
    614: "オーダー番号が不正です。",
    615: "3DS処理での決済情報が取得できませんでした",
    616: "対象取引は決済が完了しています。",
    617: commonErrorJa,
    618: "有効期限(年)「expire_y」の値が2010以上2099以下以外が設定されています",
    619: "有効期限(月)「expire_m」の値が1~12以外が設定されています。",
    620: "支払い方法「card_st_code」の値が10:一括、61:リボ、80:分割以外の値が設定されています",
    621: "分割回数「pay_time」の値が不正です。3、5、6、10、12、15、18、20、24のみ設定可能。",
    623: "3DSの結果が取得できません",
    625: "3DSの結果が登録できません",
    626: "対象店舗が3DS必須店舗のため3DS未登録のクレジットカードでは決済できません。",
    627: "3DSの認証に失敗しました",
    628: "3DSは携帯電話では利用できません。",
    712: "契約上リボ・分割は利用できません。",
    801: "対象のユーザーは登録されていません",
    802: "対象のユーザは利用不可能です",
    810: "オーダー番号「order_number」の取引はありません。",
    811: commonErrorJa,
    813: commonErrorJa,
    814: commonErrorJa,
    815: commonErrorJa,
    816: "対象の取引が確認出来ません。",
    817: commonErrorJa,
    818: commonErrorJa,
    819: "オーソリ処理でエラーとなりました",
    999: "対象の取引のステータスは異常です。",
    E00: "システムエラーが発生しました。お問合せください。",
    E00000001: "システムエラーが発生しました。お問合せください。",
    E00000002: "システムエラーが発生しました。お問合せください。",
    E00000003: "システムエラーが発生しました。お問合せください。",
    E00000010: "システムエラーが発生しました。お問合せください。",
    E01: "システムエラーが発生しました。お問合せください。",
    E01010001: "ショップIDが指定されていません。",
    E01010008: "ショップIDに半角英数字以外の文字が含まれているか、13文字を超えています。",
    E01010010: "ショップIDが一致しません。",
    E01020001: "ショップパスワードが指定されていません。",
    E01020008: "ショップパスワードに半角英数字以外の文字が含まれているか、10文字を超えています。",
    E01030002: "指定されたIDとパスワードのショップが存在しません。",
    E01030061: "強制返品はご利用できません。",
    E01040001: "オーダーIDが指定されていません。",
    E01040003: "オーダーIDが最大文字数を超えています。",
    E01040010: "すでにオーダーIDが存在しています。",
    E01040013: "オーダーIDに半角英数字と'－'以外の文字が含まれています。",
    E01050001: "処理区分が指定されていません。",
    E01050002: "指定された処理区分は定義されていません。",
    E01050004: "指定した処理区分の処理は実行できません。",
    E01060001: "利用金額が指定されていません。",
    E01060005: "利用金額が最大桁数を超えています。",
    E01060006: "利用金額に数字以外の文字が含まれています。",
    E01060010: "取引の利用金額と指定した利用金額が一致していません。",
    E01060011: "利用金額が有効な範囲を超えています。",
    E01060021: "取引の利用金額と指定した利用金額が一致していません。",
    E01070005: "税送料が最大桁数を超えています。",
    E01070006: "税送料に数字以外の文字が含まれています。",
    E01080007: "3Dセキュア使用フラグに0,1,2以外の値が指定されています。",
    E01080010: "3Dセキュア使用フラグ（TdFlag）の指定が、3Dセキュアの契約と一致していません。※3DS1.0契約なしで3DS1.0利用。3DS1.0契約で3DS2.0利用など。",
    E01080101: "3DS必須店舗または、3DS必須タイプにて3DS必須の指定にも関わらず3Dセキュア使用フラグがOFFになっています。",
    E01090001: "取引IDが指定されていません。",
    E01090008: "取引IDの書式が正しくありません。",
    E01100001: "取引パスワードが指定されていません。",
    E01100008: "取引パスワードの書式が正しくありません。",
    E01110002: "指定されたIDとパスワードの取引が存在しません。",
    E01110010: "指定された取引は決済が完了していません。",
    E01130012: "カード会社略称が最大バイト数を超えています。",
    E01160001: "ボーナス分割回数が指定されていません。",
    E01160007: "ボーナス分割回数に数字以外の文字が含まれています。",
    E01160010: "ボーナス分割回数に'２'以外を指定しています。",
    E01170001: "カード番号が指定されていません。",
    E01170003: "カード番号が最大文字数を超えています。",
    E01170006: "カード番号に数字以外の文字が含まれています。",
    E01170011: "カード番号が10桁～16桁の範囲ではありません。",
    E01180001: "有効期限が指定されていません。",
    E01180003: "有効期限が4桁ではありません。",
    E01180006: "有効期限に数字以外の文字が含まれています。",
    E01180008: "有効期限の書式が正しくありません。",
    E01180011: "有効期限の書式が正しくありません。",
    E01190001: "サイトIDが指定されていません。",
    E01190008: "サイトIDの書式が正しくありません。",
    E01200001: "サイトパスワードが指定されていません。",
    E01200007: "サイトIDが正しくありません。",
    E01200008: "サイトパスワードの書式が正しくありません。",
    E01210002: "指定されたIDとパスワードのサイトが存在しません。",
    E01220001: "会員IDが指定されていません。",
    E01220005: "会員IDが最大桁数を超えています。",
    E01220008: "会員IDの書式が正しくありません。",
    E01220010: "会員IDとカード番号が一致しています。",
    E01220012: "会員IDの長さが正しくありません。",
    E01230001: "カード登録連番が指定されていません。",
    E01230006: "カード登録連番に数字以外の文字が含まれています。",
    E01230009: "カード登録連番が最大登録可能数を超えています。",
    E01240002: "指定されたカードが存在しません。",
    E01240012: "指定された会員IDがファイル内で重複しています(※洗替時)",
    E01250008: "カードパスワードの書式が正しくありません。",
    E01250010: "カードパスワードが一致しません。",
    E01260001: "支払方法が指定されていません。",
    E01260002: "指定された支払方法が存在しません。",
    E01260010: "指定されたカード番号または支払方法が正しくありません。",
    E01270001: "支払回数が指定されていません。",
    E01270005: "支払回数が最大桁数を超えています。",
    E01270006: "支払回数の数字以外の文字が含まれています。",
    E01270010: "指定された支払回数はご利用できません。",
    E01290001: "HTTP_ACCEPTが指定されていません。",
    E01300001: "HTTP_USER_AGENTが指定されていません。",
    E01310001: "使用端末に0,1以外の値が指定されています。",
    E01320012: "加盟店自由項目1の値が最大バイト数を超えています。",
    E01320013: "加盟店自由項目1の値に利用できない文字が含まれています。",
    E01330012: "加盟店自由項目2の値が最大バイト数を超えています。",
    E01330013: "加盟店自由項目2の値に利用できない文字が含まれています。",
    E01340012: "加盟店自由項目3の値が最大バイト数を超えています。",
    E01340013: "加盟店自由項目3の値に利用できない文字が含まれています。",
    E01350001: "MDが指定されていません。",
    E01350008: "MDの書式が正しくありません。",
    E01360001: "PaResが指定されていません。",
    E01370008: "3Dセキュア表示店舗名の書式が正しくありません。",
    E01370012: "3Dセキュア表示店舗名の値が最大バイト数を超えています。",
    E01390002: "指定されたサイトIDと会員IDの会員が存在しません。",
    E01390010: "指定されたサイトIDと会員IDの会員がすでに存在しています。",
    E01400007: "加盟店自由項目返却フラグに0,1以外の値が指定されています。",
    E01410010: "該当取引は操作禁止状態です。",
    E01420010: "仮売上有効期間を超えています。",
    E01430010: "会員名とカード番号が一致しています。",
    E01430012: "会員名の値が最大バイト数を超えています。",
    E01440008: "洗替・継続課金フラグの書式が正しくありません。",
    E01450008: "商品コードの書式が正しくありません。",
    E01460008: "セキュリティコードの書式が正しくありません。",
    E01470008: "カード登録連番モードの書式が正しくありません。",
    E01480008: "名義人の書式が正しくありません。",
    E01480011: "名義人の最大文字数を超えています。",
    E01490005: "利用金額・税送料の合計値が有効な範囲を超えています。",
    E01500001: "ショップ情報文字列が設定されていません。",
    E01500005: "ショップ情報文字列の文字数が間違っています。",
    E01500012: "ショップ情報文字列が他の項目と矛盾しています。",
    E01510001: "購買情報文字列が設定されていません。",
    E01510005: "購買情報文字列の文字数が間違っています。",
    E01510010: "利用日の書式が正しくありません。",
    E01510011: "利用日の値が指定可能範囲外です。",
    E01510012: "購買情報文字列が他の項目と矛盾しています。",
    E01520002: "お客様利用端末情報に無効な値が設定されています。",
    E01530001: "決済結果戻り先URLが設定されていません。",
    E01530005: "決済結果戻り先URLが最大文字数を超えています。",
    E01540005: "決済キャンセル時URLが最大文字数を超えています。",
    E01550001: "日時情報文字列が設定されていません。",
    E01550005: "日時情報文字列の文字数が間違っています。",
    E01550006: "日時情報文字列に無効な文字が含まれます。",
    E01590005: "商品コードが最大桁数を超えています。",
    E01590006: "商品コードに無効な文字が含まれます。",
    E01600001: "会員情報チェック文字列が設定されていません。",
    E01600005: "会員情報チェック文字列が最大文字数を超えています。",
    E01600012: "会員情報チェック文字列が他の項目と矛盾しています。",
    E01610005: "リトライ回数が0～99の範囲外です。",
    E01610006: "リトライ回数に数字以外が設定されています。",
    E01620005: "セッションタイムアウト値が0～9999の範囲外です。",
    E01620006: "セッションタイムアウト値に数字以外が設定されています。",
    E01630010: "取引後カード登録時、取引の会員IDとパラメータの会員IDが一致しません。",
    E01640010: "取引後カード登録時、取引のサイトIDとパラメータのサイトIDが一致しません。",
    E01650012: "指定されたショップは、指定されたサイトに属していません。",
    E01660013: "言語パラメータにサポートされない値が設定されています。",
    E01670013: "出力エンコーディングにサポートされない値が設定されています。",
    E01700001: "項目数が誤っています。",
    E01710001: "取引区分(継続課金)が設定されていません。",
    E01710002: "指定された取引区分が存在しません。",
    E01730001: "ボーナス金額が指定されていません。",
    E01730005: "ボーナス金額が最大桁数を超えています。",
    E01730006: "商品コードが'0000990'ではありません。",
    E01730007: "ボーナス金額に数字以外の文字が含まれています。",
    E01740001: "端末処理通番が指定されていません。",
    E01740005: "端末処理通番が最大桁数を超えています。",
    E01740007: "端末処理通番に数字以外の文字が含まれています。",
    E01750001: "利用日が指定されていません。",
    E01750008: "利用日の書式が正しくありません。",
    E01770002: "区分が不正です。",
    E01780002: "有効性チェック有無が不正です。",
    E01790007: "チェック実施日が不正です。",
    E01790011: "チェック実施日が最大桁数を超えています。",
    E01800001: "暗証番号が未入力です。",
    E01800008: "暗証番号の書式が正しくありません。",
    E01800010: "暗証番号は利用できません。",
    E01800050: "暗証番号が不正です。(0000は使用できません)",
    E01810001: "磁気ストライプ区分が不正です。",
    E01810008: "磁気ストライプ区分が不正です。",
    E01820001: "磁気ストライプ情報が不正です。",
    E01820003: "磁気ストライプ情報が不正です。",
    E01820008: "磁気ストライプ情報が不正です。",
    E01840010: "必要な入力パラメータが指定されていません。",
    E01850008: "更新区分の書式が正しくありません。",
    E01860008: "カード番号マスクフラグの書式が正しくありません。",
    E01870008: "トークンタイプの書式が正しくありません。",
    E01880001: "登録済み会員IDが指定されていません。",
    E01880002: "指定されたサイトIDと登録済み会員IDの会員が存在しません。",
    E01880008: "登録済み会員IDの書式が正しくありません。",
    E01890001: "登録済みカード登録連番が指定されていません。",
    E01890002: "指定された登録済みカードが存在しません。",
    E01890006: "登録済みカード登録連番に数字以外の文字が含まれています。",
    E01890009: "カード登録連番が最大登録可能数を超えています。",
    E01910008: "サイト設定のマスクレベル利用有無に0,1以外の値が指定されています。",
    E01920008: "検索タイプの書式が正しくありません。",
    E01950008: "3DS2.0未対応時取り扱いの書式が正しくありません。",
    E01960008: "会員最終更新日の書式が正しくありません。",
    E01970008: "会員作成日の書式が正しくありません。",
    E01980008: "会員パスワード変更日の書式が正しくありません。",
    E01990005: "過去6ヶ月間の購入回数が最大桁数を超えています。",
    E01990006: "過去6ヶ月間の購入回数に数字以外の文字が含まれています。",
    E01999998: "項目1「フォーマットバージョン」に'001'が指定されていません。",
    E01A00008: "カード登録日の書式が正しくありません。",
    E01A10005: "過去24時間のカード追加の試行回数が最大桁数を超えています。",
    E01A10006: "過去24時間のカード追加の試行回数に数字以外の文字が含まれています。",
    E01A20008: "配送先住所の初回使用日の書式が正しくありません。",
    E01A30008: "カード会員名と配送先名の一致/不一致の書式が正しくありません。",
    E01A40008: "カード会員の不審行為情報の書式が正しくありません。",
    E01A50005: "過去24時間の取引回数が最大桁数を超えています。",
    E01A50006: "過去24時間の取引回数に数字以外の文字が含まれています。",
    E01A60005: "前年の取引回数が最大桁数を超えています。",
    E01A60006: "前年の取引回数に数字以外の文字が含まれています。",
    E01A70012: "ログイン証跡が最大バイト数を超えています。",
    E01A80008: "ログイン方法の書式が正しくありません。",
    E01A90008: "ログイン日時の書式が正しくありません。",
    E01B00008: "請求先住所と配送先住所の一致/不一致の書式が正しくありません。",
    E01B10005: "請求先住所の都市が最大桁数を超えています。",
    E01B20002: "請求先住所の国番号が存在しません。",
    E01B20005: "請求先住所の国番号が3桁ではありません。",
    E01B30005: "請求先住所の区域部分の１行目が最大桁数を超えています。",
    E01B40005: "請求先住所の区域部分の２行目が最大桁数を超えています。",
    E01B50005: "請求先住所の区域部分の３行目が最大桁数を超えています。",
    E01B60005: "請求先住所の郵便番号が最大桁数を超えています。",
    E01B70005: "請求先住所の州または都道府県番号が最大桁数を超えています。",
    E01B70008: "請求先住所の州または都道府県番号の書式が正しくありません。",
    E01B70010: "請求先住所の州または都道府県番号を指定する場合は請求先住所の国番号を省略できません。",
    E01B80005: "カード会員のメールアドレスが最大桁数を超えています。",
    E01B80008: "カード会員のメールアドレスの書式が正しくありません。",
    E01B90005: "自宅電話の国コードが最大桁数を超えています。",
    E01C00005: "自宅電話番号が最大桁数を超えています。",
    E01C00006: "自宅電話番号に数字以外の文字が含まれています。",
    E01C10005: "携帯電話の国コードが最大桁数を超えています。",
    E01C20005: "携帯電話番号が最大桁数を超えています。",
    E01C20006: "携帯電話番号に数字以外の文字が含まれています。",
    E01C30005: "職場電話の国コードが最大桁数を超えています。",
    E01C40005: "職場電話番号が最大桁数を超えています。",
    E01C40006: "職場電話番号に数字以外の文字が含まれています。",
    E01C50005: "配送先住所の都市が最大桁数を超えています。",
    E01C60002: "配送先住所の国番号が存在しません。",
    E01C60005: "配送先住所の国番号が3桁ではありません。",
    E01C70005: "配送先住所の区域部分の１行目が最大桁数を超えています。",
    E01C80005: "配送先住所の区域部分の２行目が最大桁数を超えています。",
    E01C90005: "配送先住所の区域部分の３行目が最大桁数を超えています。",
    E01D00005: "配送先住所の郵便番号が最大桁数を超えています。",
    E01D10005: "配送先住所の州または都道府県番号の書式が正しくありません。",
    E01D10008: "配送先住所の州または都道府県番号が最大桁数を超えています。",
    E01D10010: "配送先住所の州または都道府県番号を指定する場合は配送先住所の国番号を省略できません。",
    E01D20005: "納品先電子メールアドレスが最大桁数を超えています。",
    E01D20008: "納品先電子メールアドレスの書式が正しくありません。",
    E01D30008: "商品納品時間枠の書式が正しくありません。",
    E01D40005: "プリペイドカードまたはギフトカードの総購入金額が最大桁数を超えています。",
    E01D40006: "プリペイドカードまたはギフトカードの総購入金額に数字以外の文字が含まれています。",
    E01D50005: "購入されたプリペイドカードまたはギフトカードの総数が最大桁数を超えています。",
    E01D50006: "購入されたプリペイドカードまたはギフトカードの総数に数字以外の文字が含まれています。",
    E01D60005: "購入されたプリペイドカードまたはギフトカードの通貨コードが3桁ではありません。",
    E01D70008: "商品の発売予定日の書式が正しくありません。",
    E01D80008: "商品の販売時期情報の書式が正しくありません。",
    E01D90008: "商品の注文情報の書式が正しくありません。",
    E01E00008: "取引の出荷方法の書式が正しくありません。",
    E01E10008: "継続課金の期限の書式が正しくありません。",
    E01E20005: "継続課金の課金最小間隔日数が最大桁数を超えています。",
    E01E20006: "継続課金の課金最小間隔日数に数字以外の文字が含まれています。",
    E01E30001: "加盟店戻りURLが指定されていません。",
    E01E30005: "加盟店戻りURLが最大桁数を超えています。",
    E01E30008: "加盟店戻りURLの書式が正しくありません。",
    E01E50001: "認証状態が指定されていません。",
    E01E50004: "認証状態が不正のため実行できません。",
    E01E50008: "認証状態の書式が正しくありません。",
    E01E70001: "自宅電話番号の指定が正しくありません。自宅電話の国コード/自宅電話番号のいずれかの省略はできません。",
    E01E80001: "携帯電話番号の指定が正しくありません。携帯電話の国コード/携帯電話番号のいずれかの省略はできません。",
    E01E90001: "職場電話番号の指定が正しくありません。職場電話の国コード/職場電話番号のいずれかの省略はできません。",
    E01EA0007: "コールバック方法に1,2以外の値が指定されています。",
    E01EA0010: "コールバック方法に1,2以外の値が指定されています。",
    E01EB0001: "3DS2.0認証パラメータが指定されていません。",
    E01EB0005: "3DS2.0認証パラメータが最大桁数を超えています。",
    E01EB0010: "3DS2.0認証パラメータが不正です。",
    E01EC0002: "指定された3DSSDKインタフェースは定義されていません。",
    E01EE0001: "アプリIDが指定されていません。",
    E01EE0008: "アプリIDの書式が正しくありません。",
    E01EF0001: "3DS2.0暗号化データが指定されていません。",
    E01EF0005: "3DS2.0暗号化データが最大桁数を超えています。",
    E01EG0001: "3DS2.0JWSが指定されていません。",
    E01EG0008: "3DS2.0JWSの書式が正しくありません。",
    E01EV0001: "最大タイムアウトが指定されていません。",
    E01EV0008: "最大タイムアウトの書式が正しくありません。",
    E01EV0006: "最大タイムアウトに数字以外の文字が含まれています。",
    E01EW0001: "リファレンス番号が指定されていません。",
    E01EW0005: "リファレンス番号が最大桁数を超えています。",
    E01EX0001: "SDK取引IDが指定されていません。",
    E01EX0008: "SDK取引IDの書式が正しくありません。",
    E01EY0007: "モバイルアプリモードの指定が正しくありません。",
    E01EZ0008: "3DS必須タイプの書式が正しくありません。",
    M01: "このカードは利用できません。",
    M01039013: "加盟店自由項目1に不正な文字が含まれています。",
    M01040013: "加盟店自由項目2に不正な文字が含まれています。",
    M01041013: "加盟店自由項目3に不正な文字が含まれています。",
    E11: "このカードは利用できません。",
    E11010001: "この取引はすでに決済が終了しています",
    E11010002: "この取引は決済が終了していませんので、変更する事ができません",
    E11010003: "この取引は指定処理区分処理を行う事ができません",
    E11010004: "指定された取引のコールバック方法またはモバイルアプリモードが不正です",
    E11010010: "180日超えの取引のため、処理を行う事ができません",
    E11010099: "このカードはご利用になれません",
    E11010100: "このカードはご利用になれません",
    E11010999: "このカードは利用できません。",
    E11310001: "この取引はリンク決済を実行できません",
    E11310002: "この取引はリンク決済を実行できません",
    E11310003: "この取引はリンク決済を実行できません",
    E11310004: "この取引はリンク決済を実行できません",
    E11310005: "すでにカードを登録している会員は、取引後カード登録を実行できません",
    E21: "このカードは利用できません。",
    E21030001: "3Dセキュア認証に失敗しました。もう一度、購入画面からやり直して下さい",
    E21030007: "3Dセキュア認証に失敗しました。もう一度、購入画面からやり直して下さい",
    E21030201: "このカードでは取引をする事ができません。3Dセキュア認証に対応したカードをお使い下さい",
    E21030202: "このカードでは取引をする事ができません。3Dセキュア認証に対応したカードをお使い下さい",
    E21040001: "3DS1.0はサポートを終了しましたが、サポート終了後の取り扱いが設定されていないため、取引を中止しました。",
    E21040002: "3DS1.0はサポートを終了したためご利用になれません。",
    E31: "このカードは利用できません。",
    E41: "カード番号に誤りがあります。再度確認して入力してください",
    E61: "このカードは利用できません。",
    E61010001: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E61010002: "ご利用できないカードをご利用になったもしくはカード番号が誤っております",
    E61010003: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E61020001: "指定の決済方法は利用停止になっています",
    E61030001: "ご契約内容エラー/現在のご契約では、ご利用になれません",
    E61040001: "現在のご契約では、カード番号を指定した決済処理は許可されていません",
    E82: "実行中にエラーが発生しました。処理は開始されませんでした",
    E90: "現在処理を行っているのでもうしばらくお待ちください",
    E91: "このカードは利用できません。",
    E91099996: "システムの内部エラーです。発生時刻や呼び出しパラメータをご確認のうえ、お問い合わせください",
    E91099997: "リクエストされたAPIは存在しません。URLをお確かめ下さい",
    E91019999: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E91020001: "通信タイムアウトが発生しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E91029998: "決済処理に失敗しました。該当のお取引について、店舗までお問い合わせください",
    E91029999: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E91060001: "システムの内部エラーです。発生時刻や呼び出しパラメータをご確認のうえ、お問い合わせください",
    E91099999: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください",
    E92: "このカードは利用できません。",
    E92000001: "只今、大変込み合っていますので、しばらく時間をあけて再度決済を行ってください",
    E92000002: "只今、大変込み合っていますので、しばらく時間をあけて再度決済を行ってください",
    EX1: "このカードは利用できません。",
    EX1000301: "決済処理に失敗しました。もう一度カード番号を入力してください",
    EX1000302: "決済処理に失敗しました。もう一度カード番号を入力してください",
    EX1000303: "決済処理に失敗しました。もう一度カード番号を入力してください",
    EX1000304: "決済処理に失敗しました。もう一度カード番号を入力してください",
    M01: "このカードは利用できません。",
    M01039013: "加盟店自由項目1に不正な文字が含まれています",
    M01040013: "加盟店自由項目2に不正な文字が含まれています",
    M01041013: "加盟店自由項目3に不正な文字が含まれています",
    C01: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C03: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C12: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C13: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C14: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C15: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C33: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C50: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C51: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C53: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C54: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C55: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C56: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C57: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C58: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C60: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C70: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C71: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C72: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C73: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C74: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C75: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C76: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C77: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    C78: "決済処理に失敗しました。申し訳ございませんが、しばらく時間をあけて購入画面からやり直してください。",
    G02: "カード残高が不足しているために、決済を完了する事ができませんでした。",
    G03: "カード限度額を超えているために、決済を完了する事ができませんでした。",
    G04: "カード残高が不足しているために、決済を完了する事ができませんでした。",
    G05: "カード限度額を超えているために、決済を完了する事ができませんでした。",
    G06: "デビットカードで口座の残高が不足しています。",
    G07: "カード限度額を超えているために、決済を完了する事ができませんでした。",
    // ex　ユーザーが次のアクションを特定できない時
    //
    //以下の方法をお試しください。
    //※カード会社へ連絡いただき、エラー原因を解消後、再度決済をお試しください。
    //※時間をおいて、再度決済をお試しください。
    //※利用可能な別のカードで、再度決済をお試しください。
    G12: "このカードでは取引をする事ができません。",
    G22: "このカードでは取引をする事ができません。",
    G30: "このカードでは取引をする事ができません。",
    G42: "暗証番号が誤っていた為に、決済を完了する事ができませんでした。",
    G43: "暗証番号が誤っていた為に、決済を完了する事ができませんでした。",
    G44: "セキュリティーコードが誤っていた為に、決済を完了する事ができませんでした。",
    G45: "セキュリティーコードが入力されていない為に、決済を完了する事ができませんでした。",
    G54: "このカードでは取引をする事ができません。",
    G55: "カード限度額を超えているために、決済を完了する事ができませんでした。",
    G56: "このカードでは取引をする事ができません。",
    G60: "このカードでは取引をする事ができません。",
    G61: "このカードでは取引をする事ができません。",
    G65: "カード番号に誤りがあるために、決済を完了する事ができませんでした。",
    G67: "商品コードに誤りがあるために、決済を完了する事ができませんでした。",
    G68: "金額に誤りがあるために、決済を完了する事ができませんでした。",
    G69: "税送料に誤りがあるために、決済を完了する事ができませんでした。",
    G70: "ボーナス回数に誤りがあるために、決済を完了する事ができませんでした。",
    G71: "ボーナス月に誤りがあるために、決済を完了する事ができませんでした。",
    G72: "ボーナス額に誤りがあるために、決済を完了する事ができませんでした。",
    G73: "支払開始月に誤りがあるために、決済を完了する事ができませんでした。",
    G74: "分割回数に誤りがあるために、決済を完了する事ができませんでした。",
    G75: "分割金額に誤りがあるために、決済を完了する事ができませんでした。",
    G76: "初回金額に誤りがあるために、決済を完了する事ができませんでした。",
    G77: "業務区分に誤りがあるために、決済を完了する事ができませんでした。",
    G78: "支払区分に誤りがあるために、決済を完了する事ができませんでした。",
    G79: "照会区分に誤りがあるために、決済を完了する事ができませんでした。",
    G80: "取消区分に誤りがあるために、決済を完了する事ができませんでした。",
    G81: "取消取扱区分に誤りがあるために、決済を完了する事ができませんでした。",
    G83: "有効期限に誤りがあるために、決済を完了する事ができませんでした。",
    G84: "このカードでは取引をする事ができません。",
    G85: "利用口座が使用できなかったために、決済を完了する事ができませんでした。",
    G91: "システム障害のために、決済を完了する事ができませんでした。",
    G92: "このカードでは取引をする事ができません。",
    G95: "このカードでは取引をする事ができません。",
    G96: "このカードでは取引をする事ができません。",
    G97: "このカードでは取引をする事ができません。",
    G98: "このカードでは取引をする事ができません。",
    G99: "このカードでは取引をする事ができません。",
}

export default ja;