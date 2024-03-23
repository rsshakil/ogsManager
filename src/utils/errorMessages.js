export const errorMessages = {
    E_SYSTEM_01:
        "システムエラーが発生しました。システム管理者に連絡してください", //A system error has occurred. Contact your system administrator
    W_LOGIN_01: "ID、パスワードを確認してください", //Please check your ID and password
    W_LOGIN_02: "認証コードを確認してください", //Please check the verification code
    W_PASSWORD_01: "現在のパスワードを確認してください", //Please check your current password
    W_PASSWORD_02: "新しいパスワードは8文字以上で半角英大小・数字のうち、それぞれ1文字以上を含む必要があります", //The new password must be at least 8 characters and must contain at least 1 character each of half-width English, large and small, and numbers.
    W_PASSWORD_03: "新しいパスワードと新しいパスワード（確認）が一致していません", //The new password and the new password (confirmation) do not match
    W_PASSWORD_04: "パスワードは過去3回に使用したものと同じパスワードを設定できません", //The password cannot be the same as the one used the last 3 times
    W_PASSWORD_05: "初期パスワードは8文字以上で半角英大小・数字のうち、それぞれ1文字以上を含む必要があります", //The initial password must be at least 8 characters and must contain at least 1 character each of half-width English, large and small, and numbers
    W_PASSWORD_06: "初期パスワードと初期パスワード（確認）が一致していません", //Initial password and initial password (confirmation) do not match
    W_PASSWORD_07: "現在のパスワードが正しくありません", //The password cannot be the same as the one used the last 3 times
    W_PASSWORD_08: (variable) => `${variable}は8文字以上の半角英数字である必要があります`, // must be 8 or more single-byte alphanumeric characters
    W_ACCOUNT_01: "入力されたアカウントIDは既に存在します", //The account ID you entered already exists
    W_DATE_01: `選択した日時を確認してください`, // Please confirm the date and time you have selected
    W_EMAIL_01: "有効なメールアドレスを入力してください", //Please enter a valid email address
    W_REQUIRED_01: (placeholder) => `${placeholder}を入力してください`, //Please enter
    W_REQUIRED_02: (placeholder) => `${placeholder}を選択してください`, //Please enter
    W_GTE_01: (placeholder, character) => `${placeholder}は${character}文字以上で入力してください`, // Please enter at least characters
    W_NOTFOUND_01: "対象のレコードが存在しませんでした ", //The target record did not exist
    W_BETWEEN_01: (variable, min, max) => ` ${variable}は${min}文字以上${max}文字以下で入力してください`, //Enter {variable} with $ {min} characters or more and $ {max} characters or less.
    W_ALPHANUMERIC_01: (variable) => `${variable}は半角英数字のみで入力してください`, //Please enter $ {variable} in half-width alphanumeric characters only
    W_NUMERIC_01: "入力した数値を確認してください", //Check the number you entered
    W_INTEGER_01: (variable) => `${variable}は整数で入力してください`,//Please enter ${variable} as an integer
    W_EXISTS_01: (variable) => `入力された${variable}は既に存在します`,
    W_URL_01: (variable) => `${variable}URLを確認してください`,
    W_ZIPCODE_01: (variable) => `${variable}郵便番号を確認してください`,
    W_TELNO_01: (variable) => `${variable}電話番号を確認してください`,
    W_CHECK: (variable) => `${variable}を確認してください`,
    W_TIME_01: "選択した時間を確認してください", //Please confirm the time you have selected
    W_FILE_01: "ファイル形式を確認してください",
    W_FILE_02: (variable) => `ファイルサイズは${variable}以内にしてください`,
    W_BROADCAST_01: "一斉送信対象者を選択してください",
    E_DOMAIN_01: "ドメインURLにはホストゾーンに存在するドメインを指定してください",
    E_CREATE_01: "他のAPPで利用しているドメインを指定できません",
    E_DELETE_01: "システムエラーが発生しました。システム管理者に連絡してください",
    E_DELETE_02: "すでに削除されています",
    E_DELETE_03: "イベントで利用しているため削除できません",
    E_DELETE_04: "イベントで利用しているため削除できません",
    E_DELETE_05: "イベントで利用しているため削除できません",
    E_DELETE_06: "イベントで利用しているため削除できません",
    E_DELETE_07: "イベントで利用しているため削除できません",
    E_DELETE_08: "イベントで利用しているため削除できません",
    E_DELETE_09: "APPで利用しているため削除できません",
    E_DELETE_10: "アカウントで利用しているため削除できません",
    E_DELETE_11: "バス路線で利用しているため削除できません",
    E_DELETE_12: "イベント実施日で利用しているため削除できません",
    E_DELETE_13: "イベント施設で利用しているため削除できません",
    E_UPDATE_01: "システムエラーが発生しました。システム管理者に連絡してください",
    E_UPDATE_02: "すでに削除されています",
    E_UPDATE_03: "APPで利用しているため変更できません",
    E_UPDATE_04: "他のAPPで利用しているドメインを指定できません",
    E_INPROGRESS_01: "以前の処理が実行中です。時間をおいてから再度お試しください",
    E_UPDATE_05: "既にイベント開催中のため日程を解除できません。",
    E_UPDATE_06: "更新に失敗しました。ページを開き直してから再編集してください。",
    E_ITEM_01: "アイテムを選択してください",
    E_ITEM_02: "同時選択グループを確認してください",
    E_EVENT_01: "開催枠設定を見直してください",
    E_BLANKTIME_01: "開催枠には必ず時間を設定してください",
    E_SAMETIME_01: "開催枠には異なる時間を設定してください",
    E_CAL_ERROR_01: "開始日と終了日が不正なデータがあります",

    E_DUPLICATE: "初期選択アイテムと選択不可アイテムを確認してください",
    E_ALL_UNSELECTED: "選択不可アイテムを確認してください",
};
