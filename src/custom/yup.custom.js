import * as Yup from 'yup';

//カスタマイズを記述
Yup.addMethod(Yup.string, 'katakana', function(message) {
    return this.test('katakana', message, function(value) {
        if (value == null || value === '') return true;
        return value.match(/^[ァ-ヶー　 ]+$/);
    });
});


export default Yup;


