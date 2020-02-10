function setValue(key, value){
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
}

function getValue(key){
    return JSON.parse(localStorage.getItem(key))
}


export {setValue, getValue};