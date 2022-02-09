export const loadFile = (file) => new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function () {
        if(reader.result)
        resolve(reader.result)
        else reject(reader)
    };
    reader.readAsDataURL(file);
})
