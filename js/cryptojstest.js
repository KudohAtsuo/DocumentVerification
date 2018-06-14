

var hash = CryptoJS.SHA256("password");

document.write(hash);

// 共通鍵暗号化（テキスト）
var enctext = CryptoJS.AES.encrypt("my message", "secret key");

console.log(enctext.toString());


// 共通鍵復号化（テキスト）
var decrypted = CryptoJS.AES.decrypt(enctext.toString(), "secret key");
var dectext = decrypted.toString(CryptoJS.enc.Utf8);

console.log(dectext);
